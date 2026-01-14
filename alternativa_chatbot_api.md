# Alternativa: Chatbot Emma com API Direta (Sem n8n)

Se você prefere não usar o n8n, é possível criar uma API própria dentro do projeto para conectar o frontend diretamente à OpenAI (ou Anthropic). Isso mantém tudo em um único lugar.

## Como Funciona

Em vez de enviar a mensagem para o n8n, o frontend envia para uma rota da sua própria API (ex: `/api/chat`). Essa rota, por sua vez, conversa com a OpenAI e devolve a resposta.

### Vantagens
*   **Menos ferramentas:** Tudo fica no seu código.
*   **Controle total:** Você define exatamente como o prompt funciona.
*   **Custo:** Você paga apenas pelo uso da API da OpenAI, sem custos de plataforma de automação.

---

## Passo a Passo para Implementação

### 1. Backend (Node.js/Express)

Você precisará criar uma rota no seu servidor (`server/index.ts` ou similar) para processar o chat.

**Instale a biblioteca da OpenAI:**
```bash
npm install openai
```

**Código do Servidor (Exemplo):**

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Sua chave da OpenAI
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "Você é a Emma, uma assistente empática para pacientes com Esclerose Múltipla." },
        { role: "user", content: message }
      ],
      model: "gpt-4o-mini",
    });

    res.json({ output: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Erro ao processar mensagem" });
  }
});
```

### 2. Frontend (React)

No arquivo `Chat.tsx`, aponte a chamada para a sua nova rota local.

```typescript
const response = await fetch('/api/chat', { // Rota local
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: inputValue })
});
```

### 3. RAG (Memória com Documentos)

Para fazer a IA "ler" os PDFs sem o n8n, você precisará de um pouco mais de código no backend:
1.  Usar uma biblioteca como `langchain` para ler os PDFs.
2.  Salvar os textos em um banco vetorial (como Pinecone ou até um arquivo local para testes).
3.  Antes de chamar a OpenAI, buscar os trechos relevantes e incluí-los no "system prompt".

*Essa abordagem exige mais programação, mas oferece total liberdade.*
