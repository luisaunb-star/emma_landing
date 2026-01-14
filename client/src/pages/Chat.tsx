import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Send, Paperclip, Mic } from "lucide-react";
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
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-emma-secondary/50">
              <ArrowLeft className="w-5 h-5 text-emma-text" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-emma-primary/10 flex items-center justify-center border border-emma-primary/20">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-6 h-6 text-emma-primary"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  <path d="M12 5 9.04 11a2.4 2.4 0 0 0 0 2L12 19l2.96-6a2.4 2.4 0 0 0 0-2L12 5Z" />
                </svg>
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
