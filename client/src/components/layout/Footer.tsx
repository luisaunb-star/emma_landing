import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="col-span-1 md:col-span-1">
            <Link href="/">
              <a className="flex items-center gap-2 mb-4 group">
                <div className="relative w-8 h-8 flex items-center justify-center bg-emma-primary/10 rounded-lg">
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-5 h-5 text-emma-primary"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    <path d="M12 5 9.04 11a2.4 2.4 0 0 0 0 2L12 19l2.96-6a2.4 2.4 0 0 0 0-2L12 5Z" />
                  </svg>
                </div>
                <span className="font-heading font-bold text-xl text-emma-text">Emma</span>
              </a>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Transformando o monitoramento da Esclerose Múltipla com biomarcadores digitais e cuidado proativo.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-emma-text mb-4">Produto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#product" className="hover:text-emma-primary transition-colors">Como funciona</a></li>
              <li><a href="#product" className="hover:text-emma-primary transition-colors">Biomarcadores</a></li>
              <li><a href="#patients" className="hover:text-emma-primary transition-colors">Para Pacientes</a></li>
              <li><a href="#doctors" className="hover:text-emma-primary transition-colors">Para Médicos</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-emma-text mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#team" className="hover:text-emma-primary transition-colors">Sobre nós</a></li>
              <li><a href="#" className="hover:text-emma-primary transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-emma-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-emma-primary transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-emma-text mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-emma-primary transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-emma-primary transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-emma-primary transition-colors">Compliance</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Emma Health. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            {/* Social Icons Placeholders */}
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-emma-primary/10 hover:text-emma-primary transition-colors cursor-pointer">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-emma-primary/10 hover:text-emma-primary transition-colors cursor-pointer">
              <span className="sr-only">Instagram</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.047 1.407-.06 4.123-.06h.08zm-1.634 5.337a5.338 5.338 0 110 10.676 5.338 5.338 0 010-10.676zm0 1.927a3.411 3.411 0 100 6.822 3.411 3.411 0 000-6.822zm5.293-3.412a1.283 1.283 0 110 2.566 1.283 1.283 0 010-2.566z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
