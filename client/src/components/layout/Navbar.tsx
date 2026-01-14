import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, MessageCircle, Bot } from "lucide-react";
import Logo from "@/components/ui/Logo";
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
    { name: "Para Pacientes", href: "#patients" },
    { name: "Para Médicos", href: "#doctors" },
    { name: "Para Farmacêuticas", href: "#pharma" },
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
          <div className="flex items-center gap-2 group cursor-pointer">
            <Logo />
          </div>
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
            <div className="cursor-pointer">
              <Button className="bg-emma-primary hover:bg-emma-primary/90 text-white rounded-full pl-2 pr-6 gap-3 h-12">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border-2 border-white/50">
                  <Bot className="w-5 h-5 text-emma-primary" />
                </div>
                Falar com Emma
              </Button>
            </div>
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
            <Button className="w-full bg-emma-primary hover:bg-emma-primary/90 text-white rounded-xl gap-3 mt-2 h-12 justify-start pl-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border-2 border-white/50">
                <Bot className="w-5 h-5 text-emma-primary" />
              </div>
              Falar com Emma
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
