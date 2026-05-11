import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { sendWaitlistEmail, sendContactEmail } from "./_core/email";
import { getDb } from "./db";
import { waitlist, contactMessages } from "../drizzle/schema";
import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Lista de espera
  waitlist: router({
    join: publicProcedure
      .input(z.object({
        name: z.string().min(2),
        email: z.string().email(),
        profile: z.enum(["patient", "doctor", "other"]),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        // Verifica se e-mail já existe
        const { eq } = await import("drizzle-orm");
        const existing = await db.select().from(waitlist).where(eq(waitlist.email, input.email)).limit(1);
        if (existing.length > 0) {
          return { success: true, alreadyRegistered: true };
        }

        await db.insert(waitlist).values({
          name: input.name,
          email: input.email,
          profile: input.profile,
        });

        const profileLabel = input.profile === "patient" ? "Paciente" : input.profile === "doctor" ? "Médico" : "Outro";
        await notifyOwner({
          title: `✨ Nova inscrição na lista de espera`,
          content: `Nome: ${input.name}\nEmail: ${input.email}\nPerfil: ${profileLabel}`,
        }).catch(() => {});

        // Envia e-mail via Resend para contato@emmadigital.care
        const emailSent = await sendWaitlistEmail({
          name: input.name,
          email: input.email,
          profile: profileLabel,
          source: "form",
        });
        if (!emailSent) {
          console.error('[Waitlist] Falha ao enviar e-mail via Resend para', input.email);
        }

        return { success: true, alreadyRegistered: false };
      }),
  }),

  // Formulário de contato
  contact: router({
    send: publicProcedure
      .input(z.object({
        name: z.string().min(2),
        email: z.string().email(),
        profile: z.string().optional(),
        subject: z.string().optional(),
        message: z.string().min(10),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        await db.insert(contactMessages).values({
          name: input.name,
          email: input.email,
          profile: input.profile ?? null,
          subject: input.subject ?? null,
          message: input.message,
        });

        const profileLabel = input.profile === "patient" ? "Paciente" : input.profile === "doctor" ? "Médico" : input.profile === "pharma" ? "Empresa Farmacêutica" : "Outro";
        await notifyOwner({
          title: `📧 Nova mensagem de contato: ${input.subject || "(sem assunto)"}`,
          content: `Nome: ${input.name}\nEmail: ${input.email}\nPerfil: ${profileLabel}\nAssunto: ${input.subject || "-"}\n\nMensagem:\n${input.message}`,
        }).catch(() => {});

        // Envia e-mail via Resend para contato@emmadigital.care
        const emailSent = await sendContactEmail({
          name: input.name,
          email: input.email,
          subject: input.subject || "(sem assunto)",
          message: input.message,
        });
        if (!emailSent) {
          console.error('[Contact] Falha ao enviar e-mail via Resend para contato@emmadigital.care');
        }

        return { success: true };
      }),
  }),

  // Chatbot Emma com Claude
  chat: router({
    // Salvar na lista de espera via chatbot
    joinWaitlistFromChat: publicProcedure
      .input(z.object({
        name: z.string().min(2),
        email: z.string().email(),
        profile: z.enum(["patient", "doctor", "other"]).default("other"),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        const { eq } = await import("drizzle-orm");
        const existing = await db.select().from(waitlist).where(eq(waitlist.email, input.email)).limit(1);
        if (existing.length > 0) {
          return { success: true, alreadyRegistered: true };
        }

        await db.insert(waitlist).values({
          name: input.name,
          email: input.email,
          profile: input.profile,
        });

        const profileLabel = input.profile === "patient" ? "Paciente" : input.profile === "doctor" ? "Médico" : "Outro";
        await notifyOwner({
          title: `✨ Nova inscrição na lista de espera (via chatbot)`,
          content: `Nome: ${input.name}\nEmail: ${input.email}\nPerfil: ${profileLabel}`,
        }).catch(() => {});

        // Envia e-mail via Resend para contato@emmadigital.care
        const emailSent = await sendWaitlistEmail({
          name: input.name,
          email: input.email,
          profile: profileLabel,
          source: "chatbot",
        });
        if (!emailSent) {
          console.error('[Waitlist/Chat] Falha ao enviar e-mail via Resend para', input.email);
        }

        return { success: true, alreadyRegistered: false };
      }),

    sendMessage: publicProcedure
      .input(z.object({ 
        message: z.string(),
        userName: z.string().optional(),
        conversationHistory: z.array(z.object({
          role: z.enum(['user', 'assistant']),
          content: z.string(),
        })).optional(),
      }))
      .mutation(async ({ input }) => {
        const apiKey = process.env.ANTHROPIC_API_KEY;
        
        if (!apiKey) {
          throw new Error('ANTHROPIC_API_KEY não configurada. Por favor, adicione sua chave nas configurações.');
        }

        const anthropic = new Anthropic({ apiKey });

        // Contexto de nome do usuário
        const userContext = input.userName 
          ? `O usuário se apresentou como "${input.userName}". Use esse nome de forma natural e calorosa nas respostas.`
          : "O usuário ainda não informou o nome. Na primeira oportunidade natural, pergunte como pode chamá-lo(a).";

        // Monta histórico de conversa para contexto
        const history = (input.conversationHistory || []).map(m => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        }));

        // Adiciona mensagem atual
        const messages = [...history, { role: 'user' as const, content: input.message }];

        try {
          const response = await anthropic.messages.create({
            model: 'claude-sonnet-4-5-20250929',
            max_tokens: 1024,
            system: `Você é a Emma, uma assistente virtual empática e acolhedora especializada em doenças neurológicas.

## Sua Missão
Você representa a plataforma Emma, uma healthtech que oferece monitoramento contínuo e objetivo de doenças neurológicas através de biomarcadores digitais coletados via jogos gamificados no celular.

## STATUS ATUAL DO APP (MUITO IMPORTANTE)
❌ O aplicativo Emma **NÃO está disponível para download** ainda. Está em fase de validação clínica.
✅ Existe uma **lista de espera** para quem quiser ser um dos primeiros a usar o app quando lançar.

**NUNCA** diga que o app está disponível, que pode ser baixado, que está na App Store/Google Play, ou que tem configurações para ativar. Isso seria incorreto.

## Fluxo para Lista de Espera
Se o usuário demonstrar interesse em usar o app, ser notificado do lançamento, ou entrar na lista de espera:
1. Explique que o app ainda não está disponível mas há uma lista de espera
2. Pergunte o nome completo (se ainda não souber)
3. Pergunte o e-mail
4. Pergunte o perfil: paciente, médico ou outro
5. Quando tiver nome + e-mail + perfil, responda EXATAMENTE neste formato JSON (sem mais nada além do JSON):
{"action":"JOIN_WAITLIST","name":"<nome>","email":"<email>","profile":"<patient|doctor|other>"}

## Sobre Doenças Neurológicas
- Doenças crônicas que afetam milhões de pessoas no mundo
- O monitoramento tradicional é reativo: consultas a cada 3-6 meses, exames caros, diários manuais subjetivos
- A Emma traz monitoramento proativo, contínuo e baseado em dados objetivos

## Como a Emma Funciona

### Para Pacientes:
1. **App Móvel Gamificado:** Jogos divertidos de 10-15 minutos por dia que coletam dados de saúde
2. **4 Biomarcadores Digitais:**
   - **Eye-Tracking:** Movimentos oculares e estabilidade visual
   - **Análise de Fala:** Detecta disartria e fadiga vocal
   - **Marcha e Equilíbrio:** Usa sensores do celular
   - **Destreza e Tempo de Reação:** Função motora fina e cognitiva
3. **Gratuito para pacientes**

### Para Médicos:
- Dashboard web com dados estruturados dos pacientes
- Identificação precoce de padrões de progressão

## Validação Científica
- Incubada no Inova HC (Hospital das Clínicas - USP)
- Vencedora do Hackathon Harvard Health Systems Innovation Lab 2025 (edição Brasil)
- Em processo de validação clínica

## Tom de Voz
- Empático, acolhedor, simples e claro
- Evite jargões médicos complexos
- Use emojis sutis (❤️, 🌟, 💪)

## Limites Médicos (NUNCA VIOLE)
- ❌ NUNCA dê diagnósticos médicos
- ❌ NUNCA recomende medicamentos
- ✅ SEMPRE sugira procurar médico para sintomas novos ou emergências
- Emergências: "Procure atendimento imediato ou ligue para o SAMU (192)"
- Crise emocional: "Ligue para o CVV (188) ou SAMU (192)"

## Privacidade (LGPD)
- Esta conversa NÃO é armazenada em nossos servidores
- Dados permanecem apenas no navegador do usuário

## Contexto do Usuário
${userContext}

## Estilo de Resposta
- Breve e objetiva (2-4 parágrafos no máximo)
- Faça perguntas abertas para entender as necessidades
- Personalize com o nome quando souber`,
            messages,
          });

          const textContent = response.content.find(block => block.type === 'text');
          const output = textContent?.text || 'Desculpe, não consegui processar sua mensagem.';
          
          // Verifica se é uma ação de lista de espera
          const trimmed = output.trim();
          if (trimmed.startsWith('{"action":"JOIN_WAITLIST"')) {
            try {
              const action = JSON.parse(trimmed);
              return { output: '__WAITLIST__', waitlistData: action };
            } catch {
              // Se não parsear, retorna como texto normal
            }
          }
          
          return { output, waitlistData: null };
        } catch (error: any) {
          console.error('Erro ao chamar Claude:', error);
          throw new Error('Desculpe, estou com dificuldade para responder agora. Tente novamente em instantes.');
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;

