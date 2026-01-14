import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Send, Paperclip, Mic, Loader2, Shield } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";

export default function Chat() {
  const [userName, setUserName] = useState<string | null>(null);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: "bot", 
      text: "Olá! Eu sou a Emma, sua assistente virtual especializada em Esclerose Múltipla. 🌟\n\nPara te ajudar melhor, como posso te chamar?" 
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(true);

  const sendMessageMutation = trpc.chat.sendMessage.useMutation();

  // Carregar nome do localStorage ao iniciar
  useEffect(() => {
    const savedName = localStorage.getItem('emma_user_name');
    if (savedName) {
      setUserName(savedName);
      setMessages([
        { 
          id: 1, 
          sender: "bot", 
          text: `Olá novamente, ${savedName}! 🌟\n\nComo posso ajudar você hoje com o monitoramento da sua saúde?` 
        }
      ]);
    }
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || sendMessageMutation.isPending) return;

    // Se ainda não temos o nome e a mensagem parece ser um nome (curta, sem pontuação)
    if (!userName && inputValue.trim().split(' ').length <= 3 && !/[.!?]/.test(inputValue)) {
      const name = inputValue.trim();
      setUserName(name);
      localStorage.setItem('emma_user_name', name);
      
      const userMsg = { id: Date.now(), sender: "user", text: inputValue };
      setMessages(prev => [...prev, userMsg]);
      setInputValue("");

      // Resposta de boas-vindas personalizada
      setTimeout(() => {
        const welcomeMsg = { 
          id: Date.now() + 1, 
          sender: "bot", 
          text: `Prazer em conhecer você, ${name}! ❤️\n\nEstou aqui para te ajudar a entender melhor a plataforma Emma e esclarecer dúvidas sobre Esclerose Múltipla. O que você gostaria de saber?` 
        };
        setMessages(prev => [...prev, welcomeMsg]);
      }, 500);
      return;
    }

    // Adiciona mensagem do usuário
    const newUserMsg = { id: Date.now(), sender: "user", text: inputValue };
    setMessages(prev => [...prev, newUserMsg]);
    const currentMessage = inputValue;
    setInputValue("");

    try {
      // Chama a API do Claude via tRPC
      const response = await sendMessageMutation.mutateAsync({
        message: currentMessage,
        userName: userName || undefined,
      });

      // Adiciona resposta da Emma
      const botResponse = { 
        id: Date.now() + 1, 
        sender: "bot", 
        text: response.output
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error: any) {
      // Adiciona mensagem de erro
      const errorMsg = { 
        id: Date.now() + 1, 
        sender: "bot", 
        text: error.message || "Desculpe, ocorreu um erro. Tente novamente."
      };
      setMessages(prev => [...prev, errorMsg]);
    }
  };

  return (
    <div className="min-h-screen bg-emma-bg flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-border py-4 px-6 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/">
            <div className="cursor-pointer">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-emma-secondary/50">
                <ArrowLeft className="w-5 h-5 text-emma-text" />
              </Button>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white overflow-hidden border border-emma-primary/20">
                <img src="/images/emma-avatar.png" alt="Emma" className="w-full h-full object-cover" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <h1 className="font-bold text-emma-text text-sm">Emma Assistant</h1>
              <p className="text-xs text-muted-foreground">
                {sendMessageMutation.isPending ? "Digitando..." : "Online agora"}
              </p>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
          Ajuda
        </Button>
      </header>

      {/* Aviso de Privacidade (LGPD) */}
      {showPrivacyNotice && (
        <div className="bg-emma-card/50 border-b border-border px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-start gap-3">
            <Shield className="w-5 h-5 text-emma-primary shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-emma-text leading-relaxed">
                <strong>Sua privacidade é importante.</strong> Esta conversa não é armazenada em nossos servidores. 
                Seus dados permanecem apenas no seu navegador e respeitamos a LGPD.
              </p>
            </div>
            <button 
              onClick={() => setShowPrivacyNotice(false)}
              className="text-xs text-muted-foreground hover:text-emma-text"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <div className="text-center text-xs text-muted-foreground my-4">
          <span>Hoje, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-[80%] md:max-w-[60%] p-4 rounded-2xl shadow-sm ${
                msg.sender === "user" 
                  ? "bg-emma-primary text-white rounded-tr-none" 
                  : "bg-white text-emma-text border border-border rounded-tl-none"
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}

        {sendMessageMutation.isPending && (
          <div className="flex justify-start">
            <div className="max-w-[80%] md:max-w-[60%] p-4 rounded-2xl shadow-sm bg-white text-emma-text border border-border rounded-tl-none">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-emma-primary" />
                <span className="text-sm text-muted-foreground">Emma está pensando...</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Input Area */}
      <footer className="bg-white border-t border-border p-4 sticky bottom-0">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2 bg-emma-bg p-2 rounded-full border border-border focus-within:border-emma-primary/50 focus-within:ring-2 focus-within:ring-emma-primary/10 transition-all">
            <Button type="button" variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-emma-primary">
              <Paperclip className="w-5 h-5" />
            </Button>
            <Input 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={!userName ? "Digite seu nome..." : "Digite sua mensagem..."} 
              className="border-0 bg-transparent shadow-none focus-visible:ring-0 px-2"
              disabled={sendMessageMutation.isPending}
            />
            <Button type="button" variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-emma-primary">
              <Mic className="w-5 h-5" />
            </Button>
            <Button 
              type="submit" 
              size="icon" 
              className="rounded-full bg-emma-primary hover:bg-emma-primary/90 text-white w-10 h-10 shrink-0"
              disabled={!inputValue.trim() || sendMessageMutation.isPending}
            >
              <Send className="w-4 h-4 ml-0.5" />
            </Button>
          </form>
          <p className="text-center text-[10px] text-muted-foreground mt-2">
            A Emma é uma assistente virtual e não substitui aconselhamento médico profissional.
          </p>
        </div>
      </footer>
    </div>
  );
}
