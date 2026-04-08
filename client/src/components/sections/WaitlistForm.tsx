import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";

const profileOptions = [
  { value: "patient", label: "Paciente" },
  { value: "doctor", label: "Médico(a)" },
  { value: "other", label: "Outro" },
] as const;

export default function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState<"patient" | "doctor" | "other" | "">("");
  const [submitted, setSubmitted] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  const joinMutation = trpc.waitlist.join.useMutation({
    onSuccess: (data) => {
      setSubmitted(true);
      setAlreadyRegistered(data.alreadyRegistered);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    joinMutation.mutate({ name, email, profile });
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/80 backdrop-blur-sm border border-emma-primary/20 rounded-2xl p-6 text-center shadow-sm"
      >
        <div className="w-12 h-12 bg-emma-secondary rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6 text-emma-primary" />
        </div>
        <h3 className="font-bold text-emma-text text-lg mb-1">
          {alreadyRegistered ? "Você já está na lista!" : "Você está na lista! 🎉"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {alreadyRegistered
            ? "Seu e-mail já estava cadastrado. Avisaremos assim que o app estiver disponível."
            : "Avisaremos você assim que o app estiver disponível para download."}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white/80 backdrop-blur-sm border border-emma-primary/20 rounded-2xl p-6 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-emma-secondary rounded-full flex items-center justify-center">
          <Bell className="w-4 h-4 text-emma-primary" />
        </div>
        <div>
          <p className="text-sm font-bold text-emma-text">Lista de Espera</p>
          <p className="text-xs text-muted-foreground">Seja um dos primeiros a usar o Emma</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="wl-name" className="text-xs font-medium text-emma-text">Nome</Label>
            <Input
              id="wl-name"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              className="h-9 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="wl-email" className="text-xs font-medium text-emma-text">E-mail</Label>
            <Input
              id="wl-email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-9 text-sm"
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-xs font-medium text-emma-text">Perfil</Label>
          <div className="flex gap-2">
            {profileOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setProfile(opt.value)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  profile === opt.value
                    ? "bg-emma-primary text-white border-emma-primary"
                    : "bg-white text-muted-foreground border-border hover:border-emma-primary/50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          disabled={!profile || joinMutation.isPending}
          className="w-full bg-emma-primary hover:bg-emma-primary/90 text-white h-9 text-sm rounded-xl"
        >
          {joinMutation.isPending ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Enviando...</>
          ) : (
            "Quero ser avisado(a)"
          )}
        </Button>

        {joinMutation.isError && (
          <p className="text-xs text-red-500 text-center">
            Erro ao cadastrar. Tente novamente.
          </p>
        )}

        <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
          Seus dados são protegidos pela LGPD e não serão compartilhados.
        </p>
      </form>
    </motion.div>
  );
}
