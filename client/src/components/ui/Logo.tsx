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
          className="w-full h-full text-emma-primary"
        >
          {/* Coração estilizado formando o contorno */}
          <path 
            d="M50 88C50 88 12 65 12 38C12 22 25 12 38 12C45 12 50 16 50 16C50 16 55 12 62 12C75 12 88 22 88 38C88 65 50 88 50 88Z" 
            stroke="currentColor" 
            strokeWidth="6" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-emma-gold"
          />
          
          {/* Cérebro estilizado dentro do coração */}
          <path 
            d="M35 35C35 30 38 28 42 28C46 28 48 32 48 36C48 40 45 42 42 44" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeLinecap="round"
            className="text-emma-primary"
          />
          <path 
            d="M65 35C65 30 62 28 58 28C54 28 52 32 52 36C52 40 55 42 58 44" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeLinecap="round"
            className="text-emma-primary"
          />
          <path 
            d="M30 45C28 42 26 48 28 52C30 56 34 54 36 52" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeLinecap="round"
            className="text-emma-primary"
          />
          <path 
            d="M70 45C72 42 74 48 72 52C70 56 66 54 64 52" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeLinecap="round"
            className="text-emma-primary"
          />
          {/* Linha de batimento cardíaco conectando */}
          <path 
            d="M38 60H42L45 52L50 65L55 55L58 60H62" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-emma-primary"
          />
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
