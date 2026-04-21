import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  textClassName?: string;
  size?: "sm" | "md" | "lg";
}

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029611998/fSBNxnDPk5rBKrBA4jebhD/emma_logo_no_ecg_5be551c2.png";

export default function Logo({ className, showText = true, textClassName, size = "lg" }: LogoProps) {
  const sizeClasses = {
    sm: { img: "w-8 h-8", text: "text-xl" },
    md: { img: "w-10 h-10", text: "text-2xl" },
    lg: { img: "w-16 h-16", text: "text-5xl" },
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("relative flex items-center justify-center", sizeClasses[size].img)}>
        <img
          src={LOGO_URL}
          alt="Emma logo"
          className="w-full h-full object-contain"
        />
      </div>
      {showText && (
        <span className={cn("font-heading font-bold text-emma-text", sizeClasses[size].text, textClassName)}>
          Emma
        </span>
      )}
    </div>
  );
}
