import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, ShieldCheck, HeartPulse, Clock, Users, Database, Microscope, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Benefits() {
  return (
    <>
      {/* Section for Patients */}
      <section id="patients" className="py-24 bg-white relative overflow-hidden">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 space-y-6"
            >
              <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm">Para Pacientes</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-emma-text">
                O cuidado que se adapta <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">a você</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Empodere-se com uma ferramenta que entende sua jornada. Monitore sua saúde de forma divertida, sem sair de casa.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {[
                  { icon: <HeartPulse className="w-5 h-5" />, text: "Autoconhecimento diário sobre sua saúde" },
                  { icon: <Clock className="w-5 h-5" />, text: "Testes rápidos de 5 minutos" },
                  { icon: <Users className="w-5 h-5" />, text: "Conexão direta com seu médico" },
                  { icon: <ShieldCheck className="w-5 h-5" />, text: "Privacidade total dos seus dados" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium text-emma-text">{item.text}</span>
                  </div>
                ))}
              </div>
              
              <Button className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                Quero fazer parte
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-transparent rounded-full blur-3xl transform translate-x-10 translate-y-10"></div>
              
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-12">
                  <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 mb-4">
                      <span className="text-2xl">😊</span>
                    </div>
                    <h4 className="font-bold text-emma-text">Bem-estar</h4>
                    <p className="text-xs text-muted-foreground mt-1">Registre como você se sente hoje</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500 mb-4">
                      <span className="text-2xl">💊</span>
                    </div>
                    <h4 className="font-bold text-emma-text">Lembretes</h4>
                    <p className="text-xs text-muted-foreground mt-1">Nunca perca uma medicação</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-500 mb-4">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <h4 className="font-bold text-emma-text">Conquistas</h4>
                    <p className="text-xs text-muted-foreground mt-1">Ganhe badges por se cuidar</p>
                  </div>
                  <div className="bg-emerald-600 p-6 rounded-3xl shadow-lg border border-emerald-500 transform hover:-translate-y-2 transition-transform duration-300 text-white">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-4">
                      <span className="text-2xl">📈</span>
                    </div>
                    <h4 className="font-bold">Relatórios</h4>
                    <p className="text-xs text-white/80 mt-1">Visualize sua evolução mensal</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section for Doctors */}
      <section id="doctors" className="py-24 bg-emma-bg relative">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 order-2 lg:order-1"
            >
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-emma-primary/10 rounded-full blur-3xl"></div>
                <div className="glass-card p-6 rounded-3xl border border-white/40 shadow-xl relative z-10 bg-white/80 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">JP</div>
                      <div>
                        <h3 className="font-bold text-emma-text text-sm">João Pereira</h3>
                        <p className="text-[10px] text-muted-foreground">ID: 8492 • Esclerose Múltipla Recorrente-Remitente</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full">Estável</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <p className="text-[10px] text-muted-foreground mb-1">Velocidade de Marcha</p>
                      <div className="flex items-end gap-2">
                        <span className="text-lg font-bold text-emma-text">1.2 m/s</span>
                        <span className="text-[10px] text-green-600 font-bold mb-1">↑ 2%</span>
                      </div>
                      <div className="h-1 bg-gray-200 rounded-full mt-2 overflow-hidden">
                        <div className="h-full w-[80%] bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <p className="text-[10px] text-muted-foreground mb-1">Estabilidade Vocal</p>
                      <div className="flex items-end gap-2">
                        <span className="text-lg font-bold text-emma-text">98.5%</span>
                        <span className="text-[10px] text-gray-400 font-bold mb-1">-</span>
                      </div>
                      <div className="h-1 bg-gray-200 rounded-full mt-2 overflow-hidden">
                        <div className="h-full w-[98%] bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-bold text-emma-text">Alertas Recentes</p>
                    <div className="flex items-start gap-2 bg-yellow-50 p-2 rounded-lg border border-yellow-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5"></div>
                      <div>
                        <p className="text-[10px] font-bold text-yellow-800">Fadiga Reportada</p>
                        <p className="text-[10px] text-yellow-700">Paciente relatou aumento de fadiga nos últimos 3 dias.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 order-1 lg:order-2 space-y-6"
            >
              <span className="text-emma-primary font-bold tracking-wider uppercase text-sm">Para Médicos</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-emma-text">
                Decisões Clínicas com <br />
                <span className="text-emma-primary">Precisão de Dados</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Supere as limitações das consultas esporádicas. Obtenha dados contínuos e estruturados para monitorar a progressão da doença e eficácia do tratamento.
              </p>
              
              <div className="space-y-4 pt-4">
                {[
                  { title: "Monitoramento Remoto", desc: "Acompanhe a evolução do paciente entre consultas." },
                  { title: "Alertas Precoces", desc: "Identifique surtos ou progressão silenciosa rapidamente." },
                  { title: "Relatórios Detalhados", desc: "Histórico completo de biomarcadores para embasar condutas." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1">
                      <FileText className="w-5 h-5 text-emma-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-emma-text text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="mt-6 btn-primary">
                Solicitar Demo do Dashboard
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section for Pharma */}
      <section id="pharma" className="py-24 bg-white relative">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 space-y-6"
            >
              <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Para Farmacêuticas</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-emma-text">
                Evidências do Mundo Real <br />
                <span className="text-indigo-600">(RWE) em Escala</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Acelere pesquisas clínicas e obtenha insights valiosos sobre a jornada do paciente com dados anonimizados e estruturados.
              </p>
              
              <div className="space-y-4 pt-4">
                {[
                  { title: "Farmacovigilância Ativa", desc: "Monitoramento contínuo de segurança e eficácia pós-mercado." },
                  { title: "Recrutamento Otimizado", desc: "Identifique candidatos ideais para estudos clínicos com precisão." },
                  { title: "Redução de Custos", desc: "Diminua custos operacionais de estudos com coleta digital de dados." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1">
                      <Database className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-emma-text text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white">
                Falar com Especialista
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <div className="relative">
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-100 rounded-full blur-3xl"></div>
                <div className="glass-card p-6 rounded-3xl border border-indigo-100 shadow-xl relative z-10 bg-white">
                  <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <Microscope className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-emma-text text-sm">Estudo Clínico: Fase IV</h3>
                        <p className="text-[10px] text-muted-foreground">Protocolo: EM-2025-RWE • N=1,500</p>
                      </div>
                    </div>
                    <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded-full">Em Andamento</span>
                  </div>
                  
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-muted-foreground">Aderência Global</span>
                        <span className="font-bold text-emma-text">94.2%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full w-[94.2%] bg-indigo-600 rounded-full"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-gray-50 p-3 rounded-xl text-center border border-gray-100">
                        <p className="text-[10px] text-muted-foreground mb-1">Retenção</p>
                        <p className="text-lg font-bold text-emma-text">98%</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-xl text-center border border-gray-100">
                        <p className="text-[10px] text-muted-foreground mb-1">Data Points</p>
                        <p className="text-lg font-bold text-emma-text">2.5M</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-xl text-center border border-gray-100">
                        <p className="text-[10px] text-muted-foreground mb-1">Sites</p>
                        <p className="text-lg font-bold text-emma-text">12</p>
                      </div>
                    </div>

                    <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100">
                      <p className="text-[10px] font-bold text-indigo-800 mb-2">Distribuição Demográfica</p>
                      <div className="flex items-end gap-1 h-12 justify-between px-2">
                        {[30, 50, 70, 40, 60, 80, 45].map((h, i) => (
                          <div key={i} className="w-full bg-indigo-200 rounded-t-sm relative group">
                            <div 
                              className="absolute bottom-0 left-0 right-0 bg-indigo-500 rounded-t-sm"
                              style={{ height: `${h}%` }}
                            ></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
