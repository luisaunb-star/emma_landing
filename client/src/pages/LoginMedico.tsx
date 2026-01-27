import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/ui/Logo";
import { Lock, User, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginMedico() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Credenciais de teste
  const TEST_CREDENTIALS = {
    email: "medico@emma.com.br",
    password: "emma2025"
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simular delay de autenticação
    setTimeout(() => {
      if (email === TEST_CREDENTIALS.email && password === TEST_CREDENTIALS.password) {
        // Salvar token de autenticação (localStorage)
        localStorage.setItem("emma_medico_auth", "true");
        localStorage.setItem("emma_medico_name", "Dr. Ricardo Ávila");
        setLocation("/dashboard-medico");
      } else {
        setError("Email ou senha incorretos. Tente: medico@emma.com.br / emma2025");
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-purple-100">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-bold text-emma-text">
            Portal do Médico
          </CardTitle>
          <CardDescription className="text-base">
            Acesse o dashboard de monitoramento de pacientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-emma-text">
                Email
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-emma-text">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-emma-primary hover:bg-emma-primary/90 text-white h-11"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>

            <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
              <p className="text-sm font-semibold text-emma-text mb-2">
                🧪 Credenciais de Teste:
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                Email: medico@emma.com.br<br />
                Senha: emma2025
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
