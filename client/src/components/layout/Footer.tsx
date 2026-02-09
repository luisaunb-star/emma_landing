import { Link } from "wouter";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-10">
          <div className="col-span-1 md:col-span-1">
            <Link href="/">
              <div className="flex items-center gap-2 mb-4 group cursor-pointer">
                <Logo className="w-8 h-8" textClassName="text-xl" />
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Transformando o monitoramento da Esclerose Múltipla com biomarcadores digitais e cuidado proativo.
            </p>
          </div>
          
          <div className="col-span-1 md:col-span-1">
            <h4 className="font-bold text-emma-text mb-4">Produto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#product" className="hover:text-emma-primary transition-colors">Como funciona</a></li>
              <li><a href="#product" className="hover:text-emma-primary transition-colors">Biomarcadores</a></li>
              <li><a href="#patients" className="hover:text-emma-primary transition-colors">Para Pacientes</a></li>
              <li><a href="#doctors" className="hover:text-emma-primary transition-colors">Para Médicos</a></li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-1">
            <h4 className="font-bold text-emma-text mb-4">Empresas</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/corporativo" className="hover:text-emma-primary transition-colors">Emma Corporativo</Link></li>
              <li><Link href="/corporativo#rwe" className="hover:text-emma-primary transition-colors">Real-World Evidence</Link></li>
              <li><Link href="/corporativo#psp" className="hover:text-emma-primary transition-colors">Patient Support Program</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-1">
            <h4 className="font-bold text-emma-text mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:contato@emma.health" className="hover:text-emma-primary transition-colors">contato@emma.health</a></li>
              <li>
                <a 
                  href="https://www.linkedin.com/company/emma-digital-biomarkers/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emma-primary transition-colors flex items-center gap-2"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Emma Health. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-muted-foreground">Privacidade</span>
            <span className="text-xs text-muted-foreground">Termos</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
