# Dashboard Médico - Emma

## Fase 1: Autenticação
- [x] Adicionar botão "Login Médico" no header (Navbar.tsx)
- [x] Criar página de login (`/login-medico`)
- [x] Implementar lógica de autenticação simples (credenciais de teste)
- [x] Criar rota protegida para o dashboard

## Fase 2: Estrutura do Dashboard
- [x] Criar layout principal do dashboard (`/dashboard-medico`)
- [x] Implementar sidebar com lista de pacientes
- [x] Adicionar sistema de alertas coloridos (verde/amarelo/vermelho)

## Fase 3: Gráficos e Biomarcadores
- [x] Criar gráfico longitudinal central (SDMT, 9-Hole Peg, EDSS)
- [x] Implementar painel de Eye-tracking (latência sacádica, estabilidade)
- [x] Adicionar painel Vocal/Motor (jitter/shimmer, equilíbrio/marcha)

## Fase 4: Condutas Clínicas
- [x] Criar campo de input para registro de condutas
- [x] Adicionar histórico de condutas por paciente
- [x] Implementar salvamento de dados (localStorage ou banco)

## Fase 5: Finalização
- [x] Testar fluxo completo (login → dashboard → seleção de paciente)
- [x] Adicionar dados mockados realistas
- [x] Documentar credenciais de teste


## Correções de Layout e Gráficos
- [x] Corrigir overflow no painel de pacientes (ScrollArea)
- [x] Ajustar responsividade da lista de pacientes (badges visíveis em todas as resoluções)
- [x] Separar gráficos: SDMT + 9-Hole Peg em um, EDSS em outro
- [x] Adicionar legendas explicativas sobre as escalas dos testes


## Correções Adicionais - Dashboard
- [x] Corrigir overflow persistente nos badges do painel de pacientes (telas amplas)
- [x] Implementar gráfico dual axis (SDMT no eixo esquerdo, 9-Hole Peg no eixo direito)

## Correção Final - Overflow Vertical
- [x] Corrigir overflow vertical do painel de pacientes (conteúdo estourando para baixo do card)
