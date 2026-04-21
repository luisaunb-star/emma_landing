import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowLeft, Send, Paperclip, Mic, Loader2, Shield, Bot, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import ReactMarkdown from "react-markdown";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

type ConversationEntry = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const [userName, setUserName] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Olá! Eu sou a Emma, sua assistente virtual especializada em doenças neurológicas. 🌟\n\nPara te ajudar melhor, como posso te chamar?",
    },
  ]);
  const [conversationHistory, setConversationHistory] = useState<ConversationEntry[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(true);
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessageMutation = trpc.chat.sendMessage.useMutation();
  const joinWaitlistMutation = trpc.chat.joinWaitlistFromChat.useMutation();

  // Carregar nome do localStorage ao iniciar
  useEffect(() => {
    const savedName = localStorage.getItem("emma_user_name");
    if (savedName) {
      setUserName(savedName);
      setMessages([
        {
          id: 1,
          sender: "bot",
          text: `Olá novamente, ${savedName}! 🌟\n\nComo posso ajudar você hoje?`,
        },
      ]);
    }
  }, []);

  // Scroll automático para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addBotMessage = (text: string) => {
    const msg: Message = { id: Date.now() + 1, sender: "bot", text };
    setMessages((prev) => [...prev, msg]);
    return msg;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || sendMessageMutation.isPending) return;

    const currentMessage = inputValue.trim();

    // Se ainda não temos o nome, trata a primeira resposta como nome
    if (!userName) {
      const name = currentMessage;
      setUserName(name);
      localStorage.setItem("emma_user_name", name);

      const userMsg: Message = { id: Date.now(), sender: "user", text: currentMessage };
      setMessages((prev) => [...prev, userMsg]);
      setInputValue("");

      // Atualiza histórico
      const newHistory: ConversationEntry[] = [
        ...conversationHistory,
        { role: "user", content: currentMessage },
      ];
      setConversationHistory(newHistory);

      // Chama o backend com o nome já definido
      try {
        const response = await sendMessageMutation.mutateAsync({
          message: currentMessage,
          userName: name,
          conversationHistory: newHistory.slice(0, -1), // histórico sem a mensagem atual
        });

        const botText = response.output;
        addBotMessage(botText);
        setConversationHistory((prev) => [
          ...prev,
          { role: "assistant", content: botText },
        ]);
      } catch {
        addBotMessage(`Prazer em conhecer você, ${name}! ❤️\n\nEstou aqui para te ajudar a entender melhor a plataforma Emma e esclarecer dúvidas sobre doenças neurológicas. O que você gostaria de saber?`);
      }
      return;
    }

    // Mensagem normal
    const userMsg: Message = { id: Date.now(), sender: "user", text: currentMessage };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    const newHistory: ConversationEntry[] = [
      ...conversationHistory,
      { role: "user", content: currentMessage },
    ];

    try {
      const response = await sendMessageMutation.mutateAsync({
        message: currentMessage,
        userName: userName || undefined,
        conversationHistory: conversationHistory,
      });

      // Verifica se é ação de lista de espera
      if (response.output === "__WAITLIST__" && response.waitlistData) {
        const { name, email, profile } = response.waitlistData as {
          name: string;
          email: string;
          profile: "patient" | "doctor" | "other";
        };

        try {
          const result = await joinWaitlistMutation.mutateAsync({ name, email, profile });
          if (result.alreadyRegistered) {
            const botMsg = addBotMessage(
              `${userName}, seu e-mail já está na nossa lista de espera! 🌟\n\nAssim que o app estiver disponível, você será um dos primeiros a saber. Posso ajudar com mais alguma coisa?`
            );
            setConversationHistory([...newHistory, { role: "assistant", content: botMsg.text }]);
          } else {
            setWaitlistSuccess(true);
            const botMsg = addBotMessage(
              `Perfeito, ${name}! ✅\n\nVocê foi adicionado(a) à nossa lista de espera com sucesso! Assim que o app Emma estiver disponível, você será um dos primeiros a receber o acesso.\n\nPosso ajudar com mais alguma coisa?`
            );
            setConversationHistory([...newHistory, { role: "assistant", content: botMsg.text }]);
          }
        } catch {
          const botMsg = addBotMessage(
            `Desculpe, tive um problema ao salvar seu cadastro. Você pode se inscrever diretamente na nossa página inicial! 😊`
          );
          setConversationHistory([...newHistory, { role: "assistant", content: botMsg.text }]);
        }
        return;
      }

      const botMsg = addBotMessage(response.output);
      setConversationHistory([...newHistory, { role: "assistant", content: response.output }]);
    } catch (error: any) {
      const errorMsg = addBotMessage(
        error.message || "Desculpe, ocorreu um erro. Tente novamente."
      );
      setConversationHistory([...newHistory, { role: "assistant", content: errorMsg.text }]);
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
              <div className="w-10 h-10 rounded-full bg-emma-primary/10 flex items-center justify-center border border-emma-primary/20">
                <Bot className="w-6 h-6 text-emma-primary" />
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

      {/* Banner de sucesso lista de espera */}
      {waitlistSuccess && (
        <div className="bg-green-50 border-b border-green-200 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            <p className="text-xs text-green-800">
              <strong>Cadastro confirmado!</strong> Você está na lista de espera do app Emma.
            </p>
          </div>
        </div>
      )}

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <div className="text-center text-xs text-muted-foreground my-4">
          <span>Hoje, {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
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
              {msg.sender === "bot" ? (
                <div className="text-sm leading-relaxed prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0 prose-strong:text-emma-text prose-headings:text-emma-text">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              )}
            </div>
          </div>
        ))}

        {(sendMessageMutation.isPending || joinWaitlistMutation.isPending) && (
          <div className="flex justify-start">
            <div className="max-w-[80%] md:max-w-[60%] p-4 rounded-2xl shadow-sm bg-white text-emma-text border border-border rounded-tl-none">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-emma-primary" />
                <span className="text-sm text-muted-foreground">Emma está pensando...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <footer className="bg-white border-t border-border p-4 sticky bottom-0">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2 bg-emma-bg p-2 rounded-full border border-border focus-within:border-emma-primary/50 focus-within:ring-2 focus-within:ring-emma-primary/10 transition-all"
          >
            <Button type="button" variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-emma-primary">
              <Paperclip className="w-5 h-5" />
            </Button>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={!userName ? "Digite seu nome..." : "Digite sua mensagem..."}
              className="border-0 bg-transparent shadow-none focus-visible:ring-0 px-2"
              disabled={sendMessageMutation.isPending || joinWaitlistMutation.isPending}
            />
            <Button type="button" variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-emma-primary">
              <Mic className="w-5 h-5" />
            </Button>
            <Button
              type="submit"
              size="icon"
              className="rounded-full bg-emma-primary hover:bg-emma-primary/90 text-white w-10 h-10 shrink-0"
              disabled={!inputValue.trim() || sendMessageMutation.isPending || joinWaitlistMutation.isPending}
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
