import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Bot, User, Building2, ChevronDown } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (location !== "/") return;
    
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const handleDropdownClick = (href: string) => {
    if (location !== "/") {
      window.location.href = `/${href}`;
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="#product"
            onClick={(e) => scrollToSection(e, "#product")}
            className="text-sm font-medium text-muted-foreground hover:text-emma-primary transition-colors"
          >
            Produto
          </a>

          {/* Dropdown Soluções */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-emma-primary transition-colors outline-none">
              Soluções
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem
                onClick={() => handleDropdownClick("#patients")}
                className="cursor-pointer"
              >
                Para Pacientes
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDropdownClick("#doctors")}
                className="cursor-pointer"
              >
                Para Médicos
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDropdownClick("#pharma")}
                className="cursor-pointer"
              >
                Para Farmacêuticas
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <a
            href="#team"
            onClick={(e) => scrollToSection(e, "#team")}
            className="text-sm font-medium text-muted-foreground hover:text-emma-primary transition-colors"
          >
            Time
          </a>

          {/* Dropdown Login */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-emma-primary text-emma-primary hover:bg-emma-primary/10 gap-1"
              >
                <User className="w-4 h-4" />
                Login
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/login-medico" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Login Médico
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/login-farma" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Login Farmacêutica
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
          className="lg:hidden p-2 text-emma-text"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-border p-4 lg:hidden flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-5">
          <a
            href="#product"
            onClick={(e) => scrollToSection(e, "#product")}
            className="text-base font-medium text-foreground py-2 border-b border-border/50"
          >
            Produto
          </a>
          
          <div className="border-b border-border/50 pb-2">
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Soluções</p>
            <a
              href="#patients"
              onClick={(e) => scrollToSection(e, "#patients")}
              className="text-base font-medium text-foreground py-2 pl-3 block"
            >
              Para Pacientes
            </a>
            <a
              href="#doctors"
              onClick={(e) => scrollToSection(e, "#doctors")}
              className="text-base font-medium text-foreground py-2 pl-3 block"
            >
              Para Médicos
            </a>
            <a
              href="#pharma"
              onClick={(e) => scrollToSection(e, "#pharma")}
              className="text-base font-medium text-foreground py-2 pl-3 block"
            >
              Para Farmacêuticas
            </a>
          </div>

          <a
            href="#team"
            onClick={(e) => scrollToSection(e, "#team")}
            className="text-base font-medium text-foreground py-2 border-b border-border/50"
          >
            Time
          </a>

          <div className="border-b border-border/50 pb-2">
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Login</p>
            <Link href="/login-medico">
              <Button variant="outline" className="w-full border-emma-primary text-emma-primary hover:bg-emma-primary/10 gap-2 mb-2">
                <User className="w-4 h-4" />
                Login Médico
              </Button>
            </Link>
            <Link href="/login-farma">
              <Button variant="outline" className="w-full border-emma-accent text-emma-accent hover:bg-emma-accent/10 gap-2">
                <Building2 className="w-4 h-4" />
                Login Farmacêutica
              </Button>
            </Link>
          </div>

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
