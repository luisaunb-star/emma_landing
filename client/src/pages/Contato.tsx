import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, User, Building2, Stethoscope, MessageSquare, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { trpc } from "@/lib/trpc";

export default function Contato() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const sendMutation = trpc.contact.send.useMutation({
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMutation.mutate({ name, email, profile: profile || undefined, subject: subject || undefined, message });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-emma-text mb-4">
              Entre em Contato
            </h1>
            <p className="text-lg text-muted-foreground">
              Estamos aqui para ajudar. Escolha a melhor forma de falar conosco.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Formulário de Contato */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle>Envie sua Mensagem</CardTitle>
                  <CardDescription>
                    Preencha o formulário abaixo e retornaremos em até 24 horas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                      <div className="w-16 h-16 bg-emma-secondary rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-emma-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-emma-text">Mensagem enviada!</h3>
                      <p className="text-muted-foreground max-w-sm">
                        Recebemos sua mensagem e retornaremos em até 24 horas no e-mail <strong>{email}</strong>.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-2 border-emma-primary text-emma-primary"
                        onClick={() => {
                          setSubmitted(false);
                          setName(""); setEmail(""); setProfile(""); setSubject(""); setMessage("");
                        }}
                      >
                        Enviar outra mensagem
                      </Button>
                    </div>
                  ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome Completo</Label>
                          <Input
                            id="name"
                            placeholder="Seu nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            minLength={2}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="profile">Perfil</Label>
                        <Select value={profile} onValueChange={setProfile}>
                          <SelectTrigger id="profile">
                            <SelectValue placeholder="Selecione seu perfil" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="patient">Paciente</SelectItem>
                            <SelectItem value="doctor">Médico</SelectItem>
                            <SelectItem value="pharma">Empresa Farmacêutica</SelectItem>
                            <SelectItem value="other">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Assunto</Label>
                        <Input
                          id="subject"
                          placeholder="Como podemos ajudar?"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Mensagem</Label>
                        <Textarea
                          id="message"
                          placeholder="Descreva sua dúvida ou solicitação..."
                          rows={6}
                          className="resize-none"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          minLength={10}
                        />
                      </div>

                      {sendMutation.isError && (
                        <p className="text-sm text-red-500">
                          Erro ao enviar mensagem. Por favor, tente novamente.
                        </p>
                      )}

                      <Button
                        type="submit"
                        disabled={sendMutation.isPending}
                        className="w-full bg-emma-primary hover:bg-emma-primary/90 text-white gap-2"
                      >
                        {sendMutation.isPending ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</>
                        ) : (
                          <><Send className="w-4 h-4" /> Enviar Mensagem</>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Informações de Contato */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Contato Geral */}
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">Contato Geral</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-emma-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-slate-900">Email</div>
                      <a href="mailto:contato@emmadigital.care" className="text-sm text-emma-primary hover:underline">
                        contato@emmadigital.care
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-emma-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-slate-900">Localização</div>
                      <p className="text-sm text-slate-600">
                        São Paulo, SP<br />
                        Brasil
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contatos Segmentados */}
              <Card className="border-slate-200 bg-gradient-to-br from-emerald-50 to-teal-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="w-5 h-5 text-emerald-600" />
                    Para Pacientes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-700 mb-3">
                    Dúvidas sobre o app, cadastro ou uso da plataforma
                  </p>
                  <a href="mailto:contato@emmadigital.care" className="text-sm font-medium text-emerald-600 hover:underline">
                    contato@emmadigital.care
                  </a>
                </CardContent>
              </Card>

              <Card className="border-slate-200 bg-gradient-to-br from-purple-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-purple-600" />
                    Para Médicos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-700 mb-3">
                    Demonstrações, integrações e suporte técnico
                  </p>
                  <a href="mailto:contato@emmadigital.care" className="text-sm font-medium text-purple-600 hover:underline">
                    contato@emmadigital.care
                  </a>
                </CardContent>
              </Card>

              <Card className="border-slate-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    Para Empresas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-700 mb-3">
                    Parcerias, RWE e Programas de Suporte ao Paciente
                  </p>
                  <a href="mailto:contato@emmadigital.care" className="text-sm font-medium text-blue-600 hover:underline">
                    contato@emmadigital.care
                  </a>
                </CardContent>
              </Card>

              {/* Redes Sociais */}
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">Redes Sociais</CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href="https://www.linkedin.com/company/emma-digital-biomarkers/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-emma-primary hover:underline"
                  >
                    <MessageSquare className="w-4 h-4" />
                    LinkedIn
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
