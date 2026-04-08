import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029611998/fSBNxnDPk5rBKrBA4jebhD/emma_logo_purple_8bea79aa.png";

export default function Logo({ className, showText = true, textClassName }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative w-16 h-16 flex items-center justify-center">
        <img
          src={LOGO_URL}
          alt="Emma logo"
          className="w-full h-full object-contain"
        />
      </div>
      {showText && (
        <span className={cn("font-heading font-bold text-5xl text-emma-text", textClassName)}>
          Emma
        </span>
      )}
    </div>
  );
}
