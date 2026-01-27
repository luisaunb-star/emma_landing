import { motion } from "framer-motion";
import { Linkedin, Award, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const team = [
  {
    name: "Ricardo Bezerra",
    role: "Expertise Clínica",
    desc: "Foco na aplicação médica e validação científica.",
    linkedin: "https://www.linkedin.com/in/ricardoavilab/"
  },
  {
    name: "Gabriela Queiroz",
    role: "Expertise Clínica",
    desc: "Especialista em neurologia e cuidado ao paciente.",
    linkedin: "https://www.linkedin.com/in/maria-gabriela-carneiro-queiroz-b32989265/"
  },
  {
    name: "Heitor Reis",
    role: "Tecnologia & IA",
    desc: "Desenvolvimento de algoritmos e biotecnologia.",
    linkedin: "https://www.linkedin.com/in/heitor-gbr/"
  },
  {
    name: "Yasmim Pinheiro",
    role: "Tecnologia & IA",
    desc: "Engenharia de software e análise de dados.",
    linkedin: "https://www.linkedin.com/in/yasmin-pinheiro-54b86514a/"
  },
  {
    name: "Luisa Guimarães",
    role: "Estratégia & Negócios",
    desc: "Visão empreendedora e modelo B2B2C.",
    linkedin: "https://www.linkedin.com/in/luisa-veras-de-sandes-guimar%C3%A3es-85820086/"
  },
  {
    name: "Filipe Zanovello",
    role: "Expertise Clínica",
    desc: "Especialista em neurologia e validação científica.",
    linkedin: "https://www.linkedin.com/in/filipezanovello/"
  },
  {
    name: "Isabela Medeiros",
    role: "Design & UX",
    desc: "Design de produto e experiência do usuário.",
    linkedin: "#"
  },
  {
    name: "João Pedro Nardari",
    role: "Médico e IA",
    desc: "Medicina e Inteligência Artificial aplicada à saúde.",
    linkedin: "https://www.linkedin.com/in/jpnardari/"
  }
];

const partners = [
  { name: "Inova HC", desc: "Incubação e Validação Clínica" },
  { name: "Harvard Health Systems", desc: "Vencedores Hackathon 2025" },
  { name: "Centelha", desc: "Programa de Fomento" }
];

export default function Team() {
  return (
    <section id="team" className="py-24 bg-emma-bg relative">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emma-primary font-bold tracking-wider uppercase text-sm mb-2 block">Quem Somos</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-emma-text mb-6">
            Ciência e Tecnologia <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emma-primary to-indigo-600">Unidas pela Vida</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Nossa equipe multidisciplinar une expertise clínica, inteligência artificial e visão de negócios para transformar a saúde digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-all text-center group"
            >
              <div className="w-20 h-20 mx-auto bg-emma-secondary rounded-full mb-4 flex items-center justify-center text-2xl font-bold text-emma-primary group-hover:bg-emma-primary group-hover:text-white transition-colors">
                {member.name.charAt(0)}
              </div>
              <h3 className="font-bold text-emma-text mb-1">{member.name}</h3>
              <p className="text-xs font-bold text-emma-primary uppercase tracking-wide mb-3">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.desc}</p>
              <div className="mt-4 flex justify-center">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emma-primary transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-border shadow-sm">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-heading font-bold text-emma-text mb-2">Reconhecimento e Parcerias</h3>
            <p className="text-muted-foreground">Validado pelas principais instituições de saúde e inovação.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 bg-emma-bg rounded-2xl flex items-center justify-center mb-4 text-emma-text">
                  {index === 0 ? <Building2 className="w-8 h-8" /> : <Award className="w-8 h-8" />}
                </div>
                <h4 className="font-bold text-lg text-emma-text mb-1">{partner.name}</h4>
                <p className="text-sm text-muted-foreground">{partner.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 text-center bg-gradient-to-r from-emma-primary to-indigo-700 rounded-3xl p-12 md:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
            <div className="absolute top-[-50%] right-[-10%] w-[600px] h-[600px] bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-heading font-bold">Pronto para transformar o monitoramento da EM?</h2>
            <p className="text-lg text-white/90">
              Junte-se a nós nessa jornada de inovação e cuidado. Seja você paciente, médico ou parceiro farmacêutico.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-emma-primary hover:bg-gray-100 text-lg h-14 px-8 rounded-xl font-bold shadow-lg">
                Entrar em Contato
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg h-14 px-8 rounded-xl">
                Baixar Apresentação
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
