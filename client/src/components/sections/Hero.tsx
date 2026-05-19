import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Smartphone, Brain } from "lucide-react";
import WaitlistForm from "@/components/sections/WaitlistForm";

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
            Monitoramento contínuo e objetivo de doenças neurológicas por meio de biomarcadores digitais e gamificação. Transformando o cuidado reativo em proativo.
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

          </div>

          <WaitlistForm />

          <div className="pt-4 flex items-center gap-8 text-sm text-muted-foreground">
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
            
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663029611998/fSBNxnDPk5rBKrBA4jebhD/emma-app_edd2d308.jpeg"
              alt="App Emma Digital"
              className="rounded-2xl w-full object-cover shadow-inner border border-gray-200"
            />
          </div>
          
          {/* Floating Elements */}
        </motion.div>
      </div>
    </section>
  );
}
