# Tarefas de Personalização - Chatbot Emma

## Integração Claude (Concluído)
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

## Personalização e LGPD (Concluído)
- [x] **System Prompt Robusto:**
    - [x] Atualizar `server/routers.ts` com System Prompt detalhado baseado nos PDFs da Emma.
    - [x] Incluir informações sobre biomarcadores digitais, gamificação e proposta de valor.
    - [x] Adicionar regras claras sobre limites (não diagnosticar, sempre sugerir médico).

- [x] **Captura de Nome:**
    - [x] Modificar `Chat.tsx` para perguntar o nome do usuário na primeira interação.
    - [x] Armazenar nome no localStorage (apenas no navegador, não no servidor).
    - [x] Enviar nome como contexto em cada mensagem para o Claude.

- [x] **Aviso de LGPD:**
    - [x] Adicionar disclaimer na interface do chat informando que dados não são armazenados.
    - [x] Incluir mensagem de privacidade na primeira interação da Emma.


## Ajuste Final - Time
- [x] Atualizar descrição do Filipe Zanovello para perfil clínico (similar ao Ricardo)
