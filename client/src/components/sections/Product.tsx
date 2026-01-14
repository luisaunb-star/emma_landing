import { motion } from "framer-motion";
import { Eye, Mic, Activity, MousePointer2, Gamepad2 } from "lucide-react";

const features = [
  {
    icon: <Eye className="w-8 h-8 text-emma-primary" />,
    title: "Rastreamento Ocular",
    description: "Analisa movimentos sacádicos e estabilidade ocular através da câmera frontal para detectar sinais neurológicos sutis.",
    color: "bg-purple-50"
  },
  {
    icon: <Mic className="w-8 h-8 text-emma-primary" />,
    title: "Análise de Fala",
    description: "Detecta disartria e fadiga vocal usando o microfone, identificando padrões imperceptíveis ao ouvido humano.",
    color: "bg-blue-50"
  },
  {
    icon: <Activity className="w-8 h-8 text-emma-primary" />,
    title: "Marcha e Equilíbrio",
    description: "Utiliza acelerômetro e giroscópio para medir estabilidade e padrões de movimento com precisão clínica.",
    color: "bg-green-50"
  },
  {
    icon: <MousePointer2 className="w-8 h-8 text-emma-primary" />,
    title: "Destreza Motora",
    description: "Avalia função motora fina e cognitiva através de interações de toque e tempo de reação na tela.",
    color: "bg-orange-50"
  }
];

export default function Product() {
  return (
    <section id="product" className="py-24 bg-white relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emma-primary font-bold tracking-wider uppercase text-sm mb-2 block">Nossa Tecnologia</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-emma-text mb-6">
            Biomarcadores Digitais <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emma-primary to-indigo-600">Gamificados</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Transformamos sensores padrão de smartphones em ferramentas de avaliação neurológica precisas, tudo através de uma experiência engajadora.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 rounded-3xl border border-border hover:border-emma-primary/30 hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-emma-text mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 bg-emma-bg rounded-[3rem] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-12 border border-border/50">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emma-gold/20 text-yellow-700 text-sm font-bold">
              <Gamepad2 className="w-4 h-4" />
              Gamificação Científica
            </div>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-emma-text">
              Monitoramento que não parece exame
            </h3>
            <p className="text-lg text-muted-foreground">
              Nossos jogos são validados cientificamente para coletar dados clínicos enquanto o paciente se diverte. Isso garante alta aderência e dados contínuos de qualidade superior.
            </p>
            <ul className="space-y-4 pt-4">
              {[
                "Engajamento diário voluntário",
                "Redução da ansiedade de testes clínicos",
                "Feedback imediato e positivo para o paciente"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emma-success flex items-center justify-center text-green-800 text-xs font-bold">✓</div>
                  <span className="text-emma-text font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 relative w-full max-w-md lg:max-w-full">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-emma-primary/20 to-emma-secondary/20 relative overflow-hidden flex items-center justify-center">
              {/* Abstract Game Visualization */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 opacity-20">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-sm"></div>
                ))}
              </div>
              
              <div className="relative z-10 bg-white p-6 rounded-2xl shadow-2xl max-w-xs w-full transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-muted-foreground">DESAFIO DIÁRIO</span>
                  <span className="text-xs font-bold text-emma-primary bg-emma-secondary px-2 py-1 rounded-md">Nível 5</span>
                </div>
                <div className="h-32 bg-gray-100 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute w-8 h-8 bg-emma-gold rounded-full shadow-lg animate-bounce" style={{ left: '40%', top: '30%' }}></div>
                  <div className="absolute w-16 h-2 bg-emma-text rounded-full bottom-4 left-1/4"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Pontuação</p>
                    <p className="text-xl font-bold text-emma-text">2,450</p>
                  </div>
                  <button className="bg-emma-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-emma-primary/90">
                    Jogar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
