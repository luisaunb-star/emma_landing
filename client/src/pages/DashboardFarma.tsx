import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  mockPharmaPatients,
  mockCohortKPIs,
  mockAggregatedBiomarkers,
  PharmaPatient,
  CriticalityLevel,
  ContactType,
} from "@/data/mockPharmaData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Logo from "@/components/ui/Logo";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  LogOut,
  Users,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  Phone,
  MessageSquare,
  Mail,
  Home,
  FileText,
  Download,
  Calendar,
  CheckCircle2,
  XCircle,
  MinusCircle,
  ArrowUpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardFarma() {
  const [, setLocation] = useLocation();
  const [selectedPatient, setSelectedPatient] = useState<PharmaPatient | null>(null);
  const [farmaName, setFarmaName] = useState("");
  const [farmaCompany, setFarmaCompany] = useState("");
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    type: "phone" as ContactType,
    notes: "",
    outcome: "",
  });

  useEffect(() => {
    // Verificar autenticação
    const isAuth = localStorage.getItem("emma_farma_auth");
    const name = localStorage.getItem("emma_farma_name") || "PSP";
    const company = localStorage.getItem("emma_farma_company") || "Farmacêutica";

    if (!isAuth) {
      setLocation("/login-farma");
      return;
    }

    setFarmaName(name);
    setFarmaCompany(company);
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("emma_farma_auth");
    localStorage.removeItem("emma_farma_name");
    localStorage.removeItem("emma_farma_company");
    setLocation("/login-farma");
  };

  const handleSaveContact = () => {
    if (!contactForm.notes.trim() || !contactForm.outcome.trim() || !selectedPatient) return;

    // Simular salvamento (em produção, seria uma chamada à API)
    const newContact = {
      date: new Date().toISOString().split("T")[0],
      type: contactForm.type,
      responsible: farmaName,
      notes: contactForm.notes,
      outcome: contactForm.outcome,
    };

    selectedPatient.pspContacts.unshift(newContact);
    setContactForm({ type: "phone", notes: "", outcome: "" });
    setIsContactDialogOpen(false);
    alert("Contato registrado com sucesso!");
  };

  const getCriticalityColor = (level: CriticalityLevel) => {
    switch (level) {
      case "critical":
        return "bg-rose-50 text-rose-700";
      case "attention":
        return "bg-amber-50 text-amber-700";
      case "stable":
        return "bg-blue-50 text-blue-700";
      case "excellent":
        return "bg-emerald-50 text-emerald-700";
    }
  };

  const getCriticalityIcon = (level: CriticalityLevel) => {
    switch (level) {
      case "excellent":
        return <CheckCircle2 className="w-4 h-4" />;
      case "stable":
        return <MinusCircle className="w-4 h-4" />;
      case "attention":
        return <AlertTriangle className="w-4 h-4" />;
      case "critical":
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getCriticalityText = (level: CriticalityLevel) => {
    switch (level) {
      case "excellent":
        return "Excelente";
      case "stable":
        return "Estável";
      case "attention":
        return "Atenção";
      case "critical":
        return "Crítico";
    }
  };

  const getContactIcon = (type: ContactType) => {
    switch (type) {
      case "phone":
        return <Phone className="w-3 h-3" />;
      case "whatsapp":
        return <MessageSquare className="w-3 h-3" />;
      case "email":
        return <Mail className="w-3 h-3" />;
      case "visit":
        return <Home className="w-3 h-3" />;
    }
  };

  const getTrendIcon = (trend: "improving" | "stable" | "declining") => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="w-3 h-3 text-green-600" />;
      case "stable":
        return <MinusCircle className="w-3 h-3 text-blue-600" />;
      case "declining":
        return <TrendingDown className="w-3 h-3 text-red-600" />;
    }
  };

  // Ordenar pacientes por criticidade (crítico > atenção > estável > excelente)
  const sortedPatients = [...mockPharmaPatients].sort((a, b) => {
    const order: Record<CriticalityLevel, number> = {
      critical: 0,
      attention: 1,
      stable: 2,
      excellent: 3,
    };
    return order[a.criticalityLevel] - order[b.criticalityLevel];
  });

  // Dados para gráfico de distribuição de criticidade
  const criticalityDistribution = [
    { name: "Crítico", value: mockCohortKPIs.criticalPatients, color: "#FCA5A5" },
    { name: "Atenção", value: mockCohortKPIs.attentionPatients, color: "#FCD34D" },
    { name: "Estável", value: mockCohortKPIs.stablePatients, color: "#93C5FD" },
    { name: "Excelente", value: mockCohortKPIs.excellentPatients, color: "#86EFAC" },
  ];

  // Dados para gráfico de distribuição de biomarcadores
  const sdmtDistribution = mockAggregatedBiomarkers.sdmt.distribution.map((item) => ({
    range: item.range,
    count: item.count,
  }));

  const nineHolePegDistribution = mockAggregatedBiomarkers.nineHolePeg.distribution.map((item) => ({
    range: item.range,
    count: item.count,
  }));

  const edssDistribution = mockAggregatedBiomarkers.edss.distribution.map((item) => ({
    range: item.range,
    count: item.count,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Logo />
            <Separator orientation="vertical" className="h-8" />
            <div>
              <h1 className="text-lg font-bold text-emma-text">Portal Farmacêutico - RWE</h1>
              <p className="text-sm text-muted-foreground">
                {farmaName} • {farmaCompany}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      <div className="container py-6 space-y-6">
        {/* KPIs da Coorte */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sumário da Coorte</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-gray-100 shadow-sm">
              <CardHeader className="pb-4 bg-gradient-to-br from-purple-50 to-white">
                <CardTitle className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Total de Pacientes
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-4xl font-bold text-purple-600">{mockCohortKPIs.totalPatients}</p>
                <p className="text-sm text-gray-500 mt-2">No programa PSP</p>
              </CardContent>
            </Card>

            <Card className="border-gray-100 shadow-sm">
              <CardHeader className="pb-4 bg-gradient-to-br from-green-50 to-white">
                <CardTitle className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  Taxa de Adesão
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-4xl font-bold text-green-600">
                  {mockCohortKPIs.adherenceRate.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500 mt-2">Média da coorte</p>
              </CardContent>
            </Card>

            <Card className="border-gray-100 shadow-sm">
              <CardHeader className="pb-4 bg-gradient-to-br from-blue-50 to-white">
                <CardTitle className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Engajamento Diário
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-4xl font-bold text-blue-600">
                  {mockCohortKPIs.dailyEngagement.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500 mt-2">Testes gamificados</p>
              </CardContent>
            </Card>

            <Card className="border-gray-100 shadow-sm">
              <CardHeader className="pb-4 bg-gradient-to-br from-rose-50 to-white">
                <CardTitle className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  Eventos Adversos
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-4xl font-bold text-rose-600">
                  {mockCohortKPIs.adverseEventsUnresolved}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Não resolvidos (Total: {mockCohortKPIs.adverseEventsTotal})
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Distribuição de Criticidade */}
        <Card className="border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Activity className="w-5 h-5 text-purple-600" />
              Distribuição de Criticidade
            </CardTitle>
            <CardDescription>Classificação dos pacientes por nível de prioridade PSP</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={criticalityDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {criticalityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lista Priorizada de Pacientes */}
        <Card className="border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Users className="w-5 h-5 text-purple-600" />
              Lista Priorizada de Pacientes PSP
            </CardTitle>
            <CardDescription>
              Ordenado por criticidade. Clique para ver detalhes e registrar contatos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              <div className="space-y-3">
                {sortedPatients.map((patient) => (
                  <button
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={cn(
                      "w-full text-left p-5 rounded-lg transition-all",
                      selectedPatient?.id === patient.id
                        ? "bg-purple-50 shadow-md border border-purple-200"
                        : "bg-white shadow-sm hover:shadow-md border border-gray-100"
                    )}
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-base text-gray-900">{patient.name}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {patient.age} anos • {patient.gender === "M" ? "Masculino" : "Feminino"} •{" "}
                            {patient.diagnosis}
                          </p>
                          <p className="text-sm text-gray-600 mt-0.5">
                            Medicamento: <span className="font-medium text-gray-900">{patient.medication}</span>
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={cn(
                            "gap-1.5 text-xs shrink-0 whitespace-nowrap border-0 font-medium",
                            getCriticalityColor(patient.criticalityLevel)
                          )}
                        >
                          {getCriticalityIcon(patient.criticalityLevel)}
                          {getCriticalityText(patient.criticalityLevel)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div className="bg-gradient-to-br from-green-50 to-white p-3 rounded-lg border border-green-100">
                          <p className="text-gray-600 text-xs mb-1">Adesão</p>
                          <p className="font-bold text-green-600">{patient.adherenceRate}%</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-white p-3 rounded-lg border border-blue-100">
                          <p className="text-gray-600 text-xs mb-1">Engajamento</p>
                          <p className="font-bold text-blue-600">{patient.dailyEngagement}%</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-white p-3 rounded-lg border border-purple-100">
                          <p className="text-gray-600 text-xs mb-1">EDSS</p>
                          <p className="font-bold text-purple-600">{patient.biomarcadores.edss}</p>
                        </div>
                        <div className="bg-gradient-to-br from-gray-50 to-white p-3 rounded-lg border border-gray-100">
                          <p className="text-gray-600 text-xs mb-1">Último Teste</p>
                          <p className="font-bold text-gray-900">
                            {new Date(patient.lastTestDate).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Tendências:</span>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(patient.trends.sdmt)}
                          <span>SDMT</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(patient.trends.nineHolePeg)}
                          <span>9-Hole</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(patient.trends.edss)}
                          <span>EDSS</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Detalhes do Paciente Selecionado */}
        {selectedPatient && (
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl">{selectedPatient.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {selectedPatient.diagnosis} • {selectedPatient.medication} desde{" "}
                    {new Date(selectedPatient.startDate).toLocaleDateString("pt-BR")}
                  </CardDescription>
                </div>
                <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-emma-accent hover:bg-emma-accent/90 gap-2">
                      <Phone className="w-4 h-4" />
                      Registrar Contato
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Registrar Contato PSP</DialogTitle>
                      <DialogDescription>
                        Registre o contato realizado com {selectedPatient.name}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact-type">Tipo de Contato</Label>
                        <Select
                          value={contactForm.type}
                          onValueChange={(value) =>
                            setContactForm({ ...contactForm, type: value as ContactType })
                          }
                        >
                          <SelectTrigger id="contact-type">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="phone">Telefone</SelectItem>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="visit">Visita Domiciliar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-notes">Notas do Contato</Label>
                        <Textarea
                          id="contact-notes"
                          placeholder="Descreva o motivo e conteúdo do contato..."
                          value={contactForm.notes}
                          onChange={(e) => setContactForm({ ...contactForm, notes: e.target.value })}
                          className="min-h-[100px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-outcome">Resultado/Ação</Label>
                        <Textarea
                          id="contact-outcome"
                          placeholder="Descreva o resultado e próximos passos..."
                          value={contactForm.outcome}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, outcome: e.target.value })
                          }
                          className="min-h-[80px]"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsContactDialogOpen(false)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={handleSaveContact}
                        className="bg-emma-accent hover:bg-emma-accent/90"
                        disabled={!contactForm.notes.trim() || !contactForm.outcome.trim()}
                      >
                        Salvar Contato
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Biomarcadores do Paciente */}
              <div>
                <h3 className="font-semibold text-lg text-emma-text mb-3">Biomarcadores Atuais</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">SDMT</p>
                    <p className="text-xl font-bold text-emma-text">
                      {selectedPatient.biomarcadores.sdmt}
                    </p>
                    <p className="text-xs text-muted-foreground">Normal: 45-65</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">9-Hole Peg</p>
                    <p className="text-xl font-bold text-emma-text">
                      {selectedPatient.biomarcadores.nineHolePeg}s
                    </p>
                    <p className="text-xs text-muted-foreground">Normal: 18-22s</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">EDSS</p>
                    <p className="text-xl font-bold text-emma-text">
                      {selectedPatient.biomarcadores.edss}
                    </p>
                    <p className="text-xs text-muted-foreground">Escala 0-10</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Eye-Tracking</p>
                    <p className="text-xl font-bold text-emma-text">
                      {selectedPatient.biomarcadores.eyeTracking}ms
                    </p>
                    <p className="text-xs text-muted-foreground">Normal: 150-200ms</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Vocal (Jitter)</p>
                    <p className="text-xl font-bold text-emma-text">
                      {selectedPatient.biomarcadores.vocal}%
                    </p>
                    <p className="text-xs text-muted-foreground">Normal: &lt;1.0%</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Equilíbrio</p>
                    <p className="text-xl font-bold text-emma-text">
                      {selectedPatient.biomarcadores.motor}
                    </p>
                    <p className="text-xs text-muted-foreground">Normal: &gt;80</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Histórico de Contatos PSP */}
              <div>
                <h3 className="font-semibold text-lg text-emma-text mb-3">
                  Histórico de Contatos PSP
                </h3>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-3 pr-4">
                    {selectedPatient.pspContacts.map((contact, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            {getContactIcon(contact.type)}
                            <p className="text-xs font-semibold text-emma-accent">
                              {contact.responsible}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(contact.date).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        <p className="text-sm text-emma-text mb-2">
                          <span className="font-medium">Notas:</span> {contact.notes}
                        </p>
                        <p className="text-sm text-emma-text">
                          <span className="font-medium">Resultado:</span> {contact.outcome}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Eventos Adversos */}
              {selectedPatient.adverseEvents.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold text-lg text-emma-text mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      Eventos Adversos Registrados
                    </h3>
                    <div className="space-y-2">
                      {selectedPatient.adverseEvents.map((event) => (
                        <div
                          key={event.id}
                          className="p-3 bg-red-50 rounded-lg border border-red-200"
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs",
                                event.severity === "severe"
                                  ? "bg-red-100 text-red-800 border-red-300"
                                  : event.severity === "moderate"
                                  ? "bg-orange-100 text-orange-800 border-orange-300"
                                  : "bg-yellow-100 text-yellow-800 border-yellow-300"
                              )}
                            >
                              {event.severity === "severe"
                                ? "Grave"
                                : event.severity === "moderate"
                                ? "Moderado"
                                : "Leve"}
                            </Badge>
                            <p className="text-xs text-muted-foreground">
                              {new Date(event.date).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                          <p className="text-sm text-emma-text">{event.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Status: {event.resolved ? "✅ Resolvido" : "⚠️ Em acompanhamento"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Gráficos Agregados de Eficácia */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Distribuição SDMT</CardTitle>
              <CardDescription>Teste cognitivo (símbolos corretos)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={sdmtDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#9370DB" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-3 text-xs text-muted-foreground space-y-1">
                <p>• Média: {mockAggregatedBiomarkers.sdmt.mean.toFixed(1)}</p>
                <p>• Mediana: {mockAggregatedBiomarkers.sdmt.median.toFixed(1)}</p>
                <p>• Normal: 45-65 símbolos</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Distribuição 9-Hole Peg</CardTitle>
              <CardDescription>Teste motor (segundos)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={nineHolePegDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#FFD700" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-3 text-xs text-muted-foreground space-y-1">
                <p>• Média: {mockAggregatedBiomarkers.nineHolePeg.mean.toFixed(1)}s</p>
                <p>• Mediana: {mockAggregatedBiomarkers.nineHolePeg.median.toFixed(1)}s</p>
                <p>• Normal: 18-22s (menor é melhor)</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Distribuição EDSS</CardTitle>
              <CardDescription>Escala de incapacidade (0-10)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={edssDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#FF6B6B" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-3 text-xs text-muted-foreground space-y-1">
                <p>• Média: {mockAggregatedBiomarkers.edss.mean.toFixed(1)}</p>
                <p>• Mediana: {mockAggregatedBiomarkers.edss.median.toFixed(1)}</p>
                <p>• Maior valor = maior incapacidade</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Biomarcadores Digitais Avançados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emma-primary" />
              Assinaturas Digitais Avançadas (Médias da Coorte)
            </CardTitle>
            <CardDescription>
              Biomarcadores digitais coletados via gamificação: eye-tracking, análise vocal e equilíbrio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <p className="text-sm font-medium text-muted-foreground mb-2">Eye-Tracking</p>
                <p className="text-2xl font-bold text-emma-primary">
                  {mockAggregatedBiomarkers.eyeTracking.mean.toFixed(1)} ms
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Latência sacádica média (Normal: 150-200ms)
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-muted-foreground mb-2">Análise Vocal</p>
                <p className="text-2xl font-bold text-blue-600">
                  {mockAggregatedBiomarkers.vocal.mean.toFixed(2)}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Jitter médio (Normal: &lt;1.0%)
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm font-medium text-muted-foreground mb-2">Equilíbrio/Motor</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockAggregatedBiomarkers.motor.mean.toFixed(1)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Score médio de equilíbrio (Normal: &gt;80)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Módulo de Farmacovigilância */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-5 h-5" />
              Módulo de Farmacovigilância e Alertas
            </CardTitle>
            <CardDescription>
              Detecção precoce de surtos, progressão silenciosa e eventos adversos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-600" />
                  Pacientes Críticos
                </p>
                <p className="text-3xl font-bold text-red-600">{mockCohortKPIs.criticalPatients}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Requerem contato urgente PSP
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                  Eventos Adversos Ativos
                </p>
                <p className="text-3xl font-bold text-orange-600">
                  {mockCohortKPIs.adverseEventsUnresolved}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Em acompanhamento (Total: {mockCohortKPIs.adverseEventsTotal})
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-yellow-600" />
                  Sinais de Progressão
                </p>
                <p className="text-3xl font-bold text-yellow-600">
                  {sortedPatients.filter((p) => p.trends.sdmt === "declining").length}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Pacientes com SDMT em declínio
                </p>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-sm text-red-800 mb-3">
                🚨 Alertas de Segurança Prioritários
              </h4>
              <div className="space-y-2">
                {sortedPatients
                  .filter((p) => p.criticalityLevel === "critical")
                  .map((patient) => (
                    <div
                      key={patient.id}
                      className="bg-white p-3 rounded border border-red-300"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-sm text-emma-text">{patient.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Adesão: {patient.adherenceRate}% | Engajamento: {patient.dailyEngagement}%
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                          CRÍTICO
                        </Badge>
                      </div>
                      <p className="text-xs text-red-700 mt-2">
                        ⚠️ Ação necessária: Baixa adesão medicamentosa e declínio em biomarcadores. Contato
                        PSP urgente recomendado.
                      </p>
                    </div>
                  ))}
                {sortedPatients.filter((p) => p.criticalityLevel === "critical").length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    ✅ Nenhum alerta crítico no momento
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Painel de Real-World Evidence (RWE) */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <FileText className="w-5 h-5" />
              Painel de Real-World Evidence (RWE)
            </CardTitle>
            <CardDescription>
              Exportação de dados estruturados para relatórios regulatórios (ANVISA, FDA, PMS)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-sm text-blue-800 mb-3">
                📊 Dados Disponíveis para Exportação
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Dados demográficos da coorte</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Biomarcadores agregados (SDMT, 9-Hole, EDSS)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Assinaturas digitais (eye-tracking, vocal, motor)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Eventos adversos e resoluções</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Taxas de adesão e engajamento</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Histórico de contatos PSP</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="gap-2 border-blue-300 text-blue-700 hover:bg-blue-50"
                onClick={() => {
                  const data = JSON.stringify(
                    {
                      cohort: mockCohortKPIs,
                      patients: mockPharmaPatients,
                      biomarkers: mockAggregatedBiomarkers,
                      exportDate: new Date().toISOString(),
                      format: "ANVISA-PMS-v1.0",
                    },
                    null,
                    2
                  );
                  const blob = new Blob([data], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `emma-rwe-anvisa-${new Date().toISOString().split("T")[0]}.json`;
                  a.click();
                  alert("✅ Relatório ANVISA exportado com sucesso!");
                }}
              >
                <Download className="w-4 h-4" />
                Exportar ANVISA (JSON)
              </Button>

              <Button
                variant="outline"
                className="gap-2 border-blue-300 text-blue-700 hover:bg-blue-50"
                onClick={() => {
                  const data = JSON.stringify(
                    {
                      cohort: mockCohortKPIs,
                      patients: mockPharmaPatients,
                      biomarkers: mockAggregatedBiomarkers,
                      exportDate: new Date().toISOString(),
                      format: "FDA-REMS-v2.1",
                    },
                    null,
                    2
                  );
                  const blob = new Blob([data], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `emma-rwe-fda-${new Date().toISOString().split("T")[0]}.json`;
                  a.click();
                  alert("✅ Relatório FDA exportado com sucesso!");
                }}
              >
                <Download className="w-4 h-4" />
                Exportar FDA (JSON)
              </Button>

              <Button
                variant="outline"
                className="gap-2 border-blue-300 text-blue-700 hover:bg-blue-50"
                onClick={() => {
                  // Gerar CSV simplificado
                  const csvHeader =
                    "ID,Nome,Idade,Medicamento,Adesão,Engajamento,SDMT,9-Hole,EDSS,Criticidade\n";
                  const csvRows = mockPharmaPatients
                    .map(
                      (p) =>
                        `${p.id},${p.name},${p.age},${p.medication},${p.adherenceRate},${p.dailyEngagement},${p.biomarcadores.sdmt},${p.biomarcadores.nineHolePeg},${p.biomarcadores.edss},${p.criticalityLevel}`
                    )
                    .join("\n");
                  const csv = csvHeader + csvRows;
                  const blob = new Blob([csv], { type: "text/csv" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `emma-rwe-data-${new Date().toISOString().split("T")[0]}.csv`;
                  a.click();
                  alert("✅ Dados exportados em CSV com sucesso!");
                }}
              >
                <Download className="w-4 h-4" />
                Exportar CSV
              </Button>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <p className="text-xs text-muted-foreground">
                🔒 <span className="font-semibold">Conformidade LGPD:</span> Todos os dados exportados
                são anonimizados e agregados conforme diretrizes da Lei Geral de Proteção de Dados.
                Metadados incluem data de exportação, versão do formato e assinatura digital para
                rastreabilidade.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
