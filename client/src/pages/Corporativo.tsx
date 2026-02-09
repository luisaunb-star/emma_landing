import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Building2, Database, Shield, TrendingUp, Users, FileText, 
  AlertTriangle, CheckCircle2, BarChart3, Clock, Download, 
  Phone, Mail, Calendar, MessageSquare, ArrowRight, Lock,
  Activity, Eye, Mic, Footprints, Brain, Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Logo from "@/components/ui/Logo";

export default function Corporativo() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header Corporativo */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm py-4">
        <div className="container flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 group cursor-pointer">
              <Logo />
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/">
              <a className="text-sm font-medium text-muted-foreground hover:text-emma-primary transition-colors">
                Voltar ao Site
              </a>
            </Link>
            <Link href="/login-farma">
              <Button variant="outline" className="border-emma-primary text-emma-primary hover:bg-emma-primary/10 gap-2">
                <Building2 className="w-4 h-4" />
                Login Farmacêutica
              </Button>
            </Link>
            <Link href="/contato">
              <Button className="bg-emma-primary hover:bg-emma-primary/90 text-white">
                Falar com Especialista
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Institucional */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 opacity-60"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <Badge variant="outline" className="border-emma-primary text-emma-primary px-4 py-1">
              Emma Corporativo
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-slate-900 leading-tight">
              Transforme Dados em{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                Evidências Acionáveis
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Plataforma enterprise de Real-World Evidence (RWE) e Patient Support Programs (PSP) 
              para indústria farmacêutica. Dados estruturados, compliance regulatório e insights em tempo real.
            </p>
            
            <div className="flex flex-col items-center gap-6 pt-6">
              <Button size="lg" className="bg-emma-primary hover:bg-emma-primary/90 text-white gap-2">
                Agendar Demonstração
                <ArrowRight className="w-4 h-4" />
              </Button>
              
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="text-sm text-slate-600 font-medium">Conheça nossas soluções:</span>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => document.getElementById('rwe')?.scrollIntoView({ behavior: 'smooth' })}>
                  <Database className="w-4 h-4" />
                  Real-World Evidence
                </Button>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => document.getElementById('psp')?.scrollIntoView({ behavior: 'smooth' })}>
                  <Users className="w-4 h-4" />
                  Programa de Suporte ao Paciente
                </Button>
              </div>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-12">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium">Conformidade LGPD</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Lock className="w-5 h-5 text-green-600" />
                <span className="font-medium">ISO 27001</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Proposta A: Real-World Evidence (RWE) */}
      <section id="rwe" className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-heading font-bold text-slate-900 mb-4">
              Real-World Evidence (RWE)
            </h2>
            <p className="text-lg text-slate-600">
              Evidências do mundo real para farmacovigilância, medical affairs e market access. 
              Dados agregados e anonimizados com compliance regulatório total.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Benefícios RWE */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-6">
                {[
                  {
                    icon: <Activity className="w-6 h-6" />,
                    title: "Monitoramento de Eficácia em Larga Escala",
                    desc: "Acompanhe a progressão da doença através de biomarcadores digitais validados (EDSS, SDMT, 9-Hole Peg Test) em coortes de milhares de pacientes."
                  },
                  {
                    icon: <AlertTriangle className="w-6 h-6" />,
                    title: "Farmacovigilância Ativa e Integrada",
                    desc: "Detecção precoce de eventos adversos através de múltiplas fontes: relatos médicos, registros PSP e biomarcadores digitais. Alertas automáticos para sinais de segurança."
                  },
                  {
                    icon: <BarChart3 className="w-6 h-6" />,
                    title: "Assinaturas Digitais Avançadas",
                    desc: "Biomarcadores inovadores: latência sacádica (eye-tracking), padrões de fala, métricas de equilíbrio e marcha. Detecção de progressão silenciosa."
                  }
                ].map((item, i) => (
                  <Card key={i} className="border-slate-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                          {item.icon}
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-bold text-slate-900">{item.title}</h3>
                          <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* CTA RWE */}
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-6">
                  <h4 className="font-bold text-slate-900 mb-2">Casos de Uso Principais</h4>
                  <ul className="space-y-2 text-sm text-slate-700 mb-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span>Estudos de vigilância pós-mercado (Phase IV)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span>Análises de risco-benefício para órgãos reguladores</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span>Comparações head-to-head entre medicamentos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span>Identificação de subgrupos respondedores</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Solicitar Acesso ao Dashboard RWE
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Dashboard RWE Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-24"
            >
              <Card className="border-slate-200 shadow-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Dashboard RWE</CardTitle>
                      <CardDescription className="text-blue-100">
                        Coorte: Natalizumabe • N=1,247
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      Dados Anonimizados
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* KPIs Agregados */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <div className="text-xs text-slate-600 mb-1">Adesão Média</div>
                      <div className="text-2xl font-bold text-slate-900">94.2%</div>
                      <div className="text-xs text-green-600 font-medium">↑ 2.1% vs. trimestre anterior</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <div className="text-xs text-slate-600 mb-1">Eventos Adversos</div>
                      <div className="text-2xl font-bold text-slate-900">23</div>
                      <div className="text-xs text-slate-600">18 leves, 4 moderados, 1 grave</div>
                    </div>
                  </div>

                  {/* Gráfico de Eficácia Agregada */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-slate-900">Distribuição de EDSS (n=1,247)</h4>
                    <div className="space-y-2">
                      {[
                        { range: "0-2.5 (Estável)", percent: 45, color: "bg-green-500" },
                        { range: "3.0-4.5 (Moderado)", percent: 35, color: "bg-yellow-500" },
                        { range: "5.0-6.5 (Avançado)", percent: 15, color: "bg-orange-500" },
                        { range: "7.0+ (Severo)", percent: 5, color: "bg-red-500" }
                      ].map((item, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-700">{item.range}</span>
                            <span className="font-medium text-slate-900">{item.percent}%</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Alertas de Farmacovigilância */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-slate-900">Alertas Recentes de Segurança</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 bg-red-50 p-3 rounded-lg border border-red-200">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                        <div className="text-xs">
                          <div className="font-bold text-red-900">Evento Adverso Grave</div>
                          <div className="text-red-700">Paciente #1089 • Reação infusional severa • Reportado há 2h</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" />
                        <div className="text-xs">
                          <div className="font-bold text-yellow-900">Progressão Silenciosa Detectada</div>
                          <div className="text-yellow-700">5 pacientes • Piora em biomarcadores digitais • Sem surtos clínicos</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Exportação */}
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="w-4 h-4" />
                    Exportar Relatório
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Proposta B: Patient Support Program (PSP) */}
      <section id="psp" className="py-24 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-heading font-bold text-slate-900 mb-4">
              Patient Support Program (PSP)
            </h2>
            <p className="text-lg text-slate-600">
              Acompanhamento direto de pacientes que optaram por participar do programa de suporte. 
              Dados identificados com consentimento explícito (LGPD).
            </p>
            
            {/* Disclaimer LGPD Destacado */}
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mt-8 text-left">
              <div className="flex items-start gap-3">
                <Lock className="w-6 h-6 text-purple-600 shrink-0 mt-1" />
                <div className="space-y-2">
                  <h4 className="font-bold text-purple-900">Conformidade LGPD e Consentimento Explícito</h4>
                  <p className="text-sm text-purple-800 leading-relaxed">
                    Todos os dados identificados requerem <strong>opt-in explícito</strong> do paciente. 
                    O paciente pode revogar o consentimento a qualquer momento através do app. 
                    Dados são criptografados em repouso e em trânsito (AES-256). 
                    Acesso restrito apenas à equipe PSP autorizada com auditoria completa de acessos.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Benefícios PSP */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-6">
                {[
                  {
                    icon: <Target className="w-6 h-6" />,
                    title: "Lista Priorizada por Criticidade",
                    desc: "Pacientes ordenados automaticamente por nível de risco (crítico/atenção/estável) baseado em biomarcadores, adesão medicamentosa e engajamento com a plataforma."
                  },
                  {
                    icon: <Phone className="w-6 h-6" />,
                    title: "Registro de Contatos Multicanal",
                    desc: "Sistema integrado para registrar interações via telefone, WhatsApp, email ou visita presencial. Histórico completo de cada contato com timestamps e notas."
                  },
                  {
                    icon: <Clock className="w-6 h-6" />,
                    title: "Alertas de Adesão em Tempo Real",
                    desc: "Notificações automáticas quando pacientes apresentam queda na adesão medicamentosa ou no engajamento com testes diários. Intervenção proativa."
                  },
                  {
                    icon: <TrendingUp className="w-6 h-6" />,
                    title: "ROI Mensurável",
                    desc: "Métricas de impacto do PSP: taxa de retenção, melhoria na adesão pós-contato, redução de hospitalizações. Relatórios executivos mensais."
                  }
                ].map((item, i) => (
                  <Card key={i} className="border-slate-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                          {item.icon}
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-bold text-slate-900">{item.title}</h3>
                          <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>


            </motion.div>

            {/* Dashboard PSP Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-24"
            >
              <Card className="border-slate-200 shadow-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Dashboard PSP</CardTitle>
                      <CardDescription className="text-purple-100">
                        Programa: Natalizumabe Support • 247 pacientes ativos
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      Dados Identificados
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* KPIs PSP */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                      <div className="text-xs text-slate-600 mb-1">Críticos</div>
                      <div className="text-xl font-bold text-red-600">12</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                      <div className="text-xs text-slate-600 mb-1">Atenção</div>
                      <div className="text-xl font-bold text-yellow-600">35</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                      <div className="text-xs text-slate-600 mb-1">Estável</div>
                      <div className="text-xl font-bold text-green-600">200</div>
                    </div>
                  </div>

                  {/* Lista Priorizada */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-slate-900">Pacientes Prioritários</h4>
                    <div className="space-y-2">
                      {[
                        { name: "Maria Silva", age: 34, status: "Crítico", adherence: 45, engagement: 30, lastContact: "Há 15 dias" },
                        { name: "João Santos", age: 42, status: "Atenção", adherence: 72, engagement: 65, lastContact: "Há 7 dias" },
                        { name: "Ana Costa", age: 29, status: "Atenção", adherence: 68, engagement: 58, lastContact: "Há 10 dias" }
                      ].map((patient, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-bold text-slate-900 text-sm">{patient.name}</div>
                              <div className="text-xs text-slate-600">{patient.age} anos • Último contato: {patient.lastContact}</div>
                            </div>
                            <Badge variant={patient.status === "Crítico" ? "destructive" : "secondary"} className="text-xs">
                              {patient.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-slate-600">Adesão:</span>
                              <span className={`ml-1 font-medium ${patient.adherence < 60 ? 'text-red-600' : patient.adherence < 80 ? 'text-yellow-600' : 'text-green-600'}`}>
                                {patient.adherence}%
                              </span>
                            </div>
                            <div>
                              <span className="text-slate-600">Engajamento:</span>
                              <span className={`ml-1 font-medium ${patient.engagement < 60 ? 'text-red-600' : patient.engagement < 80 ? 'text-yellow-600' : 'text-green-600'}`}>
                                {patient.engagement}%
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline" className="flex-1 text-xs h-8">
                              <Phone className="w-3 h-3 mr-1" />
                              Ligar
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 text-xs h-8">
                              <MessageSquare className="w-3 h-3 mr-1" />
                              WhatsApp
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Histórico de Contatos */}
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <h4 className="text-xs font-bold text-purple-900">Contatos Realizados Hoje</h4>
                    </div>
                    <div className="text-2xl font-bold text-purple-900">18</div>
                    <div className="text-xs text-purple-700">Meta mensal: 450 (67% concluído)</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Seção de Contato Corporativo */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-slate-200 shadow-xl">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl">Pronto para Transformar seus Dados em Evidências?</CardTitle>
                <CardDescription className="text-base mt-2">
                  Agende uma demonstração personalizada com nosso time de especialistas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-slate-200 bg-slate-50">
                    <CardContent className="p-6 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emma-primary/10 flex items-center justify-center mx-auto">
                        <Mail className="w-6 h-6 text-emma-primary" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm mb-1">Email Corporativo</div>
                        <a href="mailto:corporativo@emma.health" className="text-sm text-emma-primary hover:underline">
                          corporativo@emma.health
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200 bg-slate-50">
                    <CardContent className="p-6 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emma-primary/10 flex items-center justify-center mx-auto">
                        <Phone className="w-6 h-6 text-emma-primary" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm mb-1">Telefone</div>
                        <a href="tel:+551133334444" className="text-sm text-emma-primary hover:underline">
                          +55 (11) 3333-4444
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200 bg-slate-50">
                    <CardContent className="p-6 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emma-primary/10 flex items-center justify-center mx-auto">
                        <Calendar className="w-6 h-6 text-emma-primary" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm mb-1">Agendar Reunião</div>
                        <Link href="/contato">
                          <span className="text-sm text-emma-primary hover:underline cursor-pointer">
                            Calendário online
                          </span>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center pt-6">
                  <Link href="/contato">
                    <Button size="lg" className="bg-emma-primary hover:bg-emma-primary/90 text-white gap-2">
                      Falar com Especialista
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer Corporativo */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Logo className="mb-4" />
              <p className="text-sm text-slate-400 leading-relaxed">
                Transformando dados de saúde em evidências acionáveis para a indústria farmacêutica.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Soluções</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#rwe" className="hover:text-white transition-colors">Real-World Evidence</a></li>
                <li><a href="#psp" className="hover:text-white transition-colors">Patient Support Program</a></li>
                <li><Link href="/" className="hover:text-white transition-colors">Site Principal</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Recursos</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Whitepapers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Casos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentação API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Contato</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="mailto:corporativo@emma.health" className="hover:text-white transition-colors">corporativo@emma.health</a></li>
                <li><a href="tel:+551133334444" className="hover:text-white transition-colors">+55 (11) 3333-4444</a></li>
                <li><Link href="/contato" className="hover:text-white transition-colors">Fale Conosco</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Emma Health. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-xs text-slate-500">
              <span>Privacidade</span>
              <span>Termos de Uso</span>
              <span>LGPD</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
