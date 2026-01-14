import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Send, Paperclip, Mic } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Olá! Sou a Emma. Como posso ajudar você hoje com o monitoramento da sua saúde?" }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Adiciona mensagem do usuário
    const newUserMsg = { id: Date.now(), sender: "user", text: inputValue };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue("");

    // Simula resposta do bot (placeholder para integração n8n)
    setTimeout(() => {
      const botResponse = { 
        id: Date.now() + 1, 
        sender: "bot", 
        text: "Obrigada pela mensagem! Esta é uma interface de demonstração. Para integrar com um agente real via n8n, você pode conectar a API aqui." 
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
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
              <p className="text-xs text-muted-foreground">Online agora</p>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
          Ajuda
        </Button>
      </header>

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
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
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
              placeholder="Digite sua mensagem..." 
              className="border-0 bg-transparent shadow-none focus-visible:ring-0 px-2"
            />
            <Button type="button" variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-emma-primary">
              <Mic className="w-5 h-5" />
            </Button>
            <Button type="submit" size="icon" className="rounded-full bg-emma-primary hover:bg-emma-primary/90 text-white w-10 h-10 shrink-0">
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
