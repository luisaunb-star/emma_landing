import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, ShieldCheck, HeartPulse, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Benefits() {
  return (
    <>
      {/* Section for Doctors & Pharma */}
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
                <div className="glass-card p-8 rounded-3xl border border-white/40 shadow-xl relative z-10 bg-white/60">
                  <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-4">
                    <div className="w-12 h-12 rounded-xl bg-emma-primary/10 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-emma-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-emma-text">Dashboard Clínico</h3>
                      <p className="text-xs text-muted-foreground">Análise de Progressão em Tempo Real</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-emma-primary rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Aderência ao Tratamento</span>
                      <span className="font-bold text-emma-text">92%</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 bg-gray-50 rounded-lg border border-gray-100 flex flex-col items-center justify-center gap-1">
                          <div className="w-8 h-1 bg-emma-secondary rounded-full"></div>
                          <div className="w-4 h-1 bg-gray-200 rounded-full"></div>
                        </div>
                      ))}
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
              <span className="text-emma-primary font-bold tracking-wider uppercase text-sm">Para Médicos e Farmacêuticas</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-emma-text">
                Decisões baseadas em <br />
                <span className="text-emma-primary">Evidências do Mundo Real (RWE)</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Supere as limitações das consultas esporádicas. Obtenha dados contínuos e estruturados para monitorar a progressão da doença e eficácia do tratamento.
              </p>
              
              <div className="space-y-4 pt-4">
                {[
                  { title: "Monitoramento Proativo", desc: "Identifique janelas terapêuticas ótimas antes que os sintomas piorem." },
                  { title: "Redução de Custos", desc: "Diminua em até 50% os custos de pesquisa de farmacovigilância." },
                  { title: "Dados Objetivos", desc: "Substitua relatos subjetivos por métricas fisiológicas precisas." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1">
                      <ShieldCheck className="w-6 h-6 text-emma-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-emma-text">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
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
              <span className="text-emma-success font-bold tracking-wider uppercase text-sm">Para Pacientes</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-emma-text">
                O cuidado que se adapta <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emma-success to-teal-600">a você</span>
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
                  <div key={i} className="flex items-center gap-3 bg-emma-bg p-4 rounded-xl border border-border/50">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-emma-success shadow-sm">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium text-emma-text">{item.text}</span>
                  </div>
                ))}
              </div>
              
              <Button className="mt-6 btn-success text-emma-text font-bold">
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
              <div className="absolute inset-0 bg-gradient-to-tr from-emma-success/20 to-transparent rounded-full blur-3xl transform translate-x-10 translate-y-10"></div>
              
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
                  <div className="bg-emma-primary p-6 rounded-3xl shadow-lg border border-emma-primary transform hover:-translate-y-2 transition-transform duration-300 text-white">
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
    </>
  );
}
