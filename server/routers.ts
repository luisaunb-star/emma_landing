import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
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

  // Chatbot Emma com Claude
  chat: router({
    sendMessage: publicProcedure
      .input(z.object({ message: z.string() }))
      .mutation(async ({ input }) => {
        const apiKey = process.env.ANTHROPIC_API_KEY;
        
        if (!apiKey) {
          throw new Error('ANTHROPIC_API_KEY não configurada. Por favor, adicione sua chave nas configurações.');
        }

        const anthropic = new Anthropic({ apiKey });

        try {
          const response = await anthropic.messages.create({
            model: 'claude-sonnet-4-5-20250929',
            max_tokens: 1024,
            system: `Você é a Emma, uma assistente virtual empática e acolhedora especializada em Esclerose Múltipla. 

Seu papel:
- Oferecer suporte emocional e informativo a pacientes com Esclerose Múltipla
- Explicar de forma simples como funcionam os biomarcadores digitais (eye-tracking, análise de fala, marcha, destreza)
- Esclarecer dúvidas sobre o aplicativo Emma e a jornada gamificada
- Sempre manter um tom caloroso, empático e profissional

Regras importantes:
- NUNCA dê diagnósticos médicos ou substitua consultas médicas
- Se o usuário mencionar sintomas novos ou emergências, SEMPRE sugira procurar um médico imediatamente
- Se o usuário mencionar pensamentos suicidas ou crise emocional grave, forneça números de emergência (CVV 188, SAMU 192)
- Seja breve e objetiva, mas sem perder a empatia

Sobre a Emma:
- Plataforma de monitoramento contínuo da Esclerose Múltipla
- Usa biomarcadores digitais validados cientificamente
- Gamificação para engajar pacientes no autocuidado
- Gera dados (RWE) para médicos e farmacêuticas tomarem melhores decisões`,
            messages: [{ role: 'user', content: input.message }],
          });

          const textContent = response.content.find(block => block.type === 'text');
          return { output: textContent?.text || 'Desculpe, não consegui processar sua mensagem.' };
        } catch (error: any) {
          console.error('Erro ao chamar Claude:', error);
          throw new Error('Desculpe, estou com dificuldade para responder agora. Tente novamente em instantes.');
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
