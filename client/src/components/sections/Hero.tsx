import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Smartphone, Brain } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-b from-white to-emma-bg">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emma-secondary/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-emma-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emma-secondary/50 border border-emma-primary/10 text-emma-text text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emma-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emma-primary"></span>
            </span>
            Inovação em Saúde Digital
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold leading-tight text-emma-text">
            Monitoramento preciso, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emma-primary to-emma-text">cuidado humano.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
            Monitoramento contínuo e objetivo da Esclerose Múltipla por meio de biomarcadores digitais e gamificação. Transformando o cuidado reativo em proativo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="btn-primary text-base md:text-lg h-12 md:h-14 px-6 md:px-8"
              onClick={() => document.getElementById('patients')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Para Pacientes
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              className="text-base md:text-lg h-12 md:h-14 px-6 md:px-8 border-emma-primary/20 text-emma-text hover:bg-emma-secondary/50"
              onClick={() => document.getElementById('doctors')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Para Médicos
            </Button>
            <Button 
              variant="outline" 
              className="text-base md:text-lg h-12 md:h-14 px-6 md:px-8 border-emma-primary/20 text-emma-text hover:bg-emma-secondary/50"
              onClick={() => document.getElementById('pharma')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Para Farmacêuticas
            </Button>
          </div>

          <div className="pt-8 flex items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emma-primary" />
              <span>Biomarcadores Digitais</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-emma-primary" />
              <span>IA Preditiva</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emma-primary" />
              <span>App Gamificado</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative z-10 glass-card p-6 md:p-8 w-full max-w-[320px] md:max-w-sm mx-auto lg:mx-0 rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-emma-gold rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDuration: '3s' }}>
              <span className="font-bold text-emma-text text-xs text-center leading-tight">Jornada<br/>Gamificada</span>
            </div>
            
            {/* Mockup Content Placeholder - Will be replaced by generated image or better CSS art */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-[9/16] shadow-inner border border-gray-200 relative">
               {/* Header do App */}
               <div className="bg-white p-4 flex justify-between items-center shadow-sm">
                 <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-emma-secondary flex items-center justify-center text-emma-primary font-bold">E</div>
                   <span className="font-bold text-emma-text">Olá, Ana</span>
                 </div>
                 <div className="w-8 h-8 rounded-full bg-emma-gold/20 flex items-center justify-center text-emma-gold font-bold">
                   🏆
                 </div>
               </div>
               
               {/* Conteúdo do App */}
               <div className="p-4 space-y-4">
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                   <h3 className="font-bold text-emma-text text-sm mb-2">Sua Jornada Diária</h3>
                   <div className="flex gap-2">
                     <div className="flex-1 bg-emma-secondary/30 p-2 rounded-lg text-center">
                       <div className="w-8 h-8 mx-auto bg-white rounded-full flex items-center justify-center mb-1 text-emma-primary">👁️</div>
                       <span className="text-[10px] font-medium text-muted-foreground">Visão</span>
                     </div>
                     <div className="flex-1 bg-emma-secondary/30 p-2 rounded-lg text-center border border-emma-primary/30 relative overflow-hidden">
                       <div className="absolute inset-0 bg-emma-primary/5"></div>
                       <div className="w-8 h-8 mx-auto bg-emma-primary text-white rounded-full flex items-center justify-center mb-1">🗣️</div>
                       <span className="text-[10px] font-bold text-emma-text">Fala</span>
                     </div>
                     <div className="flex-1 bg-emma-secondary/30 p-2 rounded-lg text-center">
                       <div className="w-8 h-8 mx-auto bg-white rounded-full flex items-center justify-center mb-1 text-emma-primary">⚖️</div>
                       <span className="text-[10px] font-medium text-muted-foreground">Equilíbrio</span>
                     </div>
                   </div>
                 </div>
                 
                 <div className="bg-gradient-to-r from-emma-primary to-indigo-600 p-4 rounded-xl shadow-md text-white">
                   <h3 className="font-bold text-sm mb-1">Desafio de Voz</h3>
                   <p className="text-xs opacity-90 mb-3">Leia a frase em voz alta para ganhar pontos.</p>
                   <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 rounded-lg text-xs font-bold transition-colors">
                     Começar Agora
                   </button>
                 </div>
                 
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                   <div className="flex justify-between items-end mb-2">
                     <h3 className="font-bold text-emma-text text-sm">Seu Progresso</h3>
                     <span className="text-xs text-emma-success font-bold">+12% essa semana</span>
                   </div>
                   <div className="h-24 flex items-end gap-1 justify-between px-1">
                     {[40, 65, 45, 80, 55, 70, 85].map((h, i) => (
                       <div key={i} className="w-full bg-emma-secondary rounded-t-sm relative group">
                         <div 
                           className="absolute bottom-0 left-0 right-0 bg-emma-primary rounded-t-sm transition-all duration-1000"
                           style={{ height: `${h}%` }}
                         ></div>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-1/2 -left-12 glass-card p-3 flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s' }}>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Estabilidade</p>
              <p className="text-sm font-bold text-emma-text">98% Normal</p>
            </div>
          </div>
          
          <div className="absolute bottom-10 -right-4 glass-card p-3 flex items-center gap-3 animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Cognição</p>
              <p className="text-sm font-bold text-emma-text">Estável</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
