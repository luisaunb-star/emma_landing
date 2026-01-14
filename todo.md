# Tarefas de Implementação - Integração Claude

- [x] **Upgrade do Projeto:**
    - [x] Adicionar feature `web-db-user` para habilitar backend e segredos.

- [x] **Backend (Server):**
    - [x] Instalar `@anthropic-ai/sdk`.
    - [x] Criar rota `/api/chat` no `server/routes.ts` (ou similar).
    - [x] Implementar lógica de chamada ao Claude com System Prompt otimizado para a Emma.

- [x] **Frontend (Client):**
    - [x] Atualizar `Chat.tsx` para fazer POST na rota `/api/chat`.
    - [x] Adicionar feedback visual de "Emma digitando...".

- [x] **Documentação:**
    - [x] Criar guia simples: "Como ativar o Chat" (explicando onde colar a chave no painel Secrets).
