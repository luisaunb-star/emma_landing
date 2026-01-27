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

## Dashboard Farmacêutico - Real-World Evidence (RWE)

### Fase 1: Autenticação
- [x] Adicionar botão "Login Farmacêutica" no header (Navbar.tsx)
- [x] Criar página de login farmacêutico (`/login-farma`)
- [x] Implementar lógica de autenticação (credenciais: farma@emma.com.br / emma2025)
- [x] Criar rota protegida para dashboard farmacêutico (`/dashboard-farma`)

### Fase 2: Dados Mockados
- [x] Criar arquivo de dados mockados para coorte farmacêutica
- [x] Incluir dados agregados de biomarcadores
- [x] Adicionar histórico de contatos PSP por paciente
- [x] Criar dados de alertas de farmacovigilância

### Fase 3: KPIs e Sumário da Coorte
- [x] Implementar cards de KPIs (total pacientes, adesão, engajamento)
- [x] Criar visualização de tendências temporais dos KPIs
- [x] Adicionar filtros por período e medicamento

### Fase 4: Lista Priorizada de Pacientes PSP
- [x] Criar tabela de pacientes ordenada por criticidade
- [x] Implementar sistema de registro de contatos (telefone/WhatsApp)
- [x] Adicionar modal para registrar detalhes do contato
- [x] Mostrar histórico de interações PSP por paciente

### Fase 5: Monitoramento de Eficácia
- [x] Gráficos agregados de SDMT e 9-Hole Peg (distribuição da coorte)
- [x] Gráficos de biomarcadores digitais (eye-tracking, vocal, motor)
- [x] Comparação com valores de referência normais
- [x] Visualização de evolução temporal agregada

### Fase 6: Módulo de Farmacovigilância
- [x] Painel de alertas de surtos/progressão silenciosa
- [x] Sistema de detecção de eventos adversos
- [x] Dashboard de sinais de segurança
- [x] Funcionalidade de triagem e priorização de casos

### Fase 7: Painel RWE e Exportação
- [x] Interface de seleção de dados para exportação
- [x] Geração de relatórios estruturados (JSON/CSV)
- [x] Templates para ANVISA e FDA
- [x] Documentação de metadados e conformidade LGPD

## Simplificação do Menu Superior
- [x] Reduzir itens do menu de 7 para 4 + CTA
- [x] Criar dropdown "Soluções" (Para Pacientes, Para Médicos, Para Farmacêuticas)
- [x] Criar dropdown "Login" (Login Médico, Login Farmacêutica)
- [x] Manter itens: Produto, Time, Falar com Emma

## Correção de Dados do Time
- [x] Corrigir nome: João Paulo → João Pedro Nardari
- [x] Atualizar áreas de atuação: Médico + IA
