# Guia de Integração: Chatbot Emma com IA Real

Este guia explica como transformar a interface de chat estática da Emma em um assistente inteligente real, capaz de aprender com documentos e responder perguntas de pacientes de forma natural.

## Visão Geral da Arquitetura

Para criar um chatbot que "aprende", utilizaremos uma arquitetura RAG (Retrieval-Augmented Generation).

1.  **Frontend (React):** A interface de chat que já criamos.
2.  **Middleware (n8n):** Plataforma de automação que recebe a mensagem, busca informações e consulta a IA.
3.  **Cérebro (OpenAI/Anthropic):** O modelo de linguagem (LLM) que gera a resposta.
4.  **Memória (Vector Database):** Onde armazenamos os PDFs da Emma para que a IA possa consultá-los.

---

## Passo 1: Configurando o "Cérebro" (n8n)

O n8n é uma ferramenta visual de automação. Você pode usá-lo na nuvem ou instalar localmente.

### Fluxo Recomendado no n8n:

1.  **Webhook Trigger:** Crie um nó "Webhook" (método POST) para receber as mensagens do site.
    *   Entrada esperada: `{ "message": "Olá, o que é a Emma?", "sessionId": "xyz" }`
2.  **Vector Store (Memória):** Use um nó como "Pinecone" ou "Supabase Vector" para buscar contextos relevantes.
    *   *Antes disso, você precisará fazer um fluxo separado apenas para "ingerir" os PDFs da Emma e salvá-los nesse banco de dados.*
3.  **AI Agent (Cérebro):** Use o nó "AI Agent" ou "OpenAI Chat Model".
    *   Conecte o resultado da busca (passo 2) como "Contexto".
    *   Defina o System Prompt: *"Você é a Emma, uma assistente empática para pacientes com Esclerose Múltipla. Use o contexto fornecido para responder. Se não souber, diga que não sabe e sugira falar com um médico."*
4.  **Response:** Retorne a resposta gerada para o Webhook.

---

## Passo 2: Conectando o Frontend

No arquivo `client/src/pages/Chat.tsx`, você precisará substituir a simulação `setTimeout` por uma chamada real à API do seu n8n.

### Exemplo de Código para Integração:

```typescript
const handleSendMessage = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!inputValue.trim()) return;

  // 1. Adiciona mensagem do usuário na tela
  const userMsg = { id: Date.now(), sender: "user", text: inputValue };
  setMessages(prev => [...prev, userMsg]);
  setInputValue("");
  setIsLoading(true); // Adicione um estado de loading

  try {
    // 2. Envia para o n8n (Substitua pela URL do seu Webhook)
    const response = await fetch('https://seu-n8n.com/webhook/emma-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        message: inputValue,
        sessionId: "session-123" // Gerar ID único por usuário
      })
    });

    const data = await response.json();

    // 3. Adiciona resposta da IA na tela
    const botMsg = { 
      id: Date.now() + 1, 
      sender: "bot", 
      text: data.output // Ou o campo que você definiu no n8n
    };
    setMessages(prev => [...prev, botMsg]);

  } catch (error) {
    console.error("Erro ao falar com Emma:", error);
    // Adicionar mensagem de erro na tela
  } finally {
    setIsLoading(false);
  }
};
```

## Passo 3: Ensinando a IA (RAG)

Para que a Emma "aprenda" sobre o projeto:

1.  No n8n, crie um fluxo de **Ingestão de Documentos**.
2.  Use um nó para ler os PDFs (Pitch, HelloTomorrow, etc.).
3.  Use um nó "Text Splitter" para dividir o texto em pedaços menores.
4.  Use um nó "Embeddings" (OpenAI) para converter texto em números.
5.  Salve no seu Vector Database (Pinecone/Supabase).

Agora, toda vez que alguém perguntar "Como funciona o monitoramento?", a IA buscará nesses documentos a resposta exata antes de responder.

## Recursos Recomendados

*   **n8n (Automação):** [n8n.io](https://n8n.io)
*   **Pinecone (Memória Vetorial):** [pinecone.io](https://www.pinecone.io)
*   **OpenAI API (Cérebro):** [platform.openai.com](https://platform.openai.com)
