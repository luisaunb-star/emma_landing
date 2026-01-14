import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Produto", href: "#product" },
    { name: "Para Médicos", href: "#doctors" },
    { name: "Para Pacientes", href: "#patients" },
    { name: "Time", href: "#team" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (location !== "/") return; // Se não estiver na home, deixa o link funcionar normalmente (navegação)
    
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 flex items-center justify-center bg-emma-primary/10 rounded-xl group-hover:bg-emma-primary/20 transition-colors">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-6 h-6 text-emma-primary"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                <path d="M12 5 9.04 11a2.4 2.4 0 0 0 0 2L12 19l2.96-6a2.4 2.4 0 0 0 0-2L12 5Z" />
              </svg>
            </div>
            <span className="font-heading font-bold text-2xl text-emma-text">Emma</span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-emma-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Link href="/chat">
            <Button className="bg-emma-primary hover:bg-emma-primary/90 text-white rounded-full px-6 gap-2">
              <MessageCircle className="w-4 h-4" />
              Falar com Emma
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-emma-text"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-border p-4 md:hidden flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-base font-medium text-foreground py-2 border-b border-border/50 last:border-0"
            >
              {link.name}
            </a>
          ))}
          <Link href="/chat">
            <Button className="w-full bg-emma-primary hover:bg-emma-primary/90 text-white rounded-xl gap-2 mt-2">
              <MessageCircle className="w-4 h-4" />
              Falar com Emma
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
