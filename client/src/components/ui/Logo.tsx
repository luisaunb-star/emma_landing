import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

export default function Logo({ className, showText = true, textClassName }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative w-10 h-10 flex items-center justify-center">
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Coração (Contorno Externo) */}
          <path 
            d="M50 85C50 85 15 60 15 35C15 20 28 10 40 10C47 10 50 15 50 15C50 15 53 10 60 10C72 10 85 20 85 35C85 60 50 85 50 85Z" 
            stroke="#FFD700" 
            strokeWidth="6" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
          
          {/* Cérebro (Lado Esquerdo - Roxo) */}
          <path 
            d="M50 20C45 20 30 22 30 35C30 45 40 50 50 50" 
            stroke="#9370DB" 
            strokeWidth="5" 
            strokeLinecap="round"
            fill="none"
          />
          <path 
            d="M35 35C35 30 38 28 42 28" 
            stroke="#9370DB" 
            strokeWidth="4" 
            strokeLinecap="round"
          />
          
          {/* Cérebro (Lado Direito - Roxo) */}
          <path 
            d="M50 20C55 20 70 22 70 35C70 45 60 50 50 50" 
            stroke="#9370DB" 
            strokeWidth="5" 
            strokeLinecap="round"
            fill="none"
          />
          <path 
            d="M65 35C65 30 62 28 58 28" 
            stroke="#9370DB" 
            strokeWidth="4" 
            strokeLinecap="round"
          />
          
          {/* Conexão Neural (Centro) */}
          <circle cx="50" cy="35" r="3" fill="#4B0082" />
          <path d="M50 50V65" stroke="#4B0082" strokeWidth="3" strokeDasharray="4 4" />
          
        </svg>
      </div>
      {showText && (
        <span className={cn("font-heading font-bold text-2xl text-emma-text", textClassName)}>
          Emma
        </span>
      )}
    </div>
  );
}
