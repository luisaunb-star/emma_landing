# Guia de Integração: Chatbot Emma com Claude (Anthropic)

Este guia explica como conectar o chatbot da Emma à API do Claude (Anthropic), conhecida por sua alta capacidade de raciocínio e empatia, ideal para contextos de saúde.

## Pré-requisitos

1.  Uma conta na [Anthropic Console](https://console.anthropic.com/).
2.  Uma chave de API (`ANTHROPIC_API_KEY`).
3.  Créditos na conta (o Claude não tem plano gratuito de API).

---

## Passo 1: Configurando o Backend (Node.js)

Você precisará adicionar a biblioteca da Anthropic e criar uma rota no seu servidor.

**1. Instale a biblioteca:**
```bash
npm install @anthropic-ai/sdk
```

**2. Adicione a rota no `server/index.ts`:**

```typescript
import Anthropic from '@anthropic-ai/sdk';

// Inicializa o cliente (certifique-se de ter a variável de ambiente configurada)
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, 
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620", // Modelo mais inteligente e rápido
      max_tokens: 1024,
      system: "Você é a Emma, uma assistente virtual empática e acolhedora para pacientes com Esclerose Múltipla. Seu objetivo é oferecer suporte emocional, tirar dúvidas sobre o aplicativo e explicar sobre biomarcadores de forma simples. Nunca dê diagnósticos médicos. Sempre sugira procurar um médico em caso de sintomas novos.",
      messages: [
        { role: "user", content: message }
      ],
    });

    // O Claude retorna o texto dentro de content[0].text
    const responseText = msg.content[0].text;
    
    res.json({ output: responseText });
  } catch (error) {
    console.error("Erro na API do Claude:", error);
    res.status(500).json({ error: "Desculpe, estou com dificuldade para pensar agora." });
  }
});
```

---

## Passo 2: Configurando o Frontend (React)

No arquivo `client/src/pages/Chat.tsx`, a função `handleSendMessage` deve chamar essa rota.

```typescript
const handleSendMessage = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!inputValue.trim()) return;

  // Adiciona mensagem do usuário na tela
  const userMsg = { id: Date.now(), sender: "user", text: inputValue };
  setMessages(prev => [...prev, userMsg]);
  setInputValue("");
  setIsLoading(true);

  try {
    // Chama sua API local
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: inputValue })
    });

    const data = await response.json();

    // Adiciona resposta da Emma
    const botMsg = { 
      id: Date.now() + 1, 
      sender: "bot", 
      text: data.output 
    };
    setMessages(prev => [...prev, botMsg]);

  } catch (error) {
    console.error("Erro:", error);
    // Tratamento de erro visual
  } finally {
    setIsLoading(false);
  }
};
```

## Dicas para o "System Prompt"

O segredo de uma boa "Emma" está no System Prompt (a instrução inicial).

*   **Tom de voz:** "Seja calorosa, use emojis ocasionalmente, mas mantenha o profissionalismo."
*   **Segurança:** "Se o usuário mencionar emergência, suicídio ou dor extrema, forneça imediatamente números de emergência e instrua ir ao hospital."
*   **Conhecimento:** Você pode colar no System Prompt um resumo do que é a Emma (biomarcadores, gamificação, etc.) para que ela saiba responder sobre o produto.
