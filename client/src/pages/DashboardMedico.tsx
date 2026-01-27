import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { mockPatients, Patient, AlertLevel } from "@/data/mockPatients";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Logo from "@/components/ui/Logo";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts";
import {
  LogOut,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Eye,
  Mic,
  Activity,
  FileText,
  Calendar,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardMedico() {
  const [, setLocation] = useLocation();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [newConduta, setNewConduta] = useState("");
  const [medicoName, setMedicoName] = useState("");

  useEffect(() => {
    // Verificar autenticação
    const isAuth = localStorage.getItem("emma_medico_auth");
    const name = localStorage.getItem("emma_medico_name") || "Médico";
    
    if (!isAuth) {
      setLocation("/login-medico");
      return;
    }

    setMedicoName(name);

    // Selecionar primeiro paciente por padrão
    if (mockPatients.length > 0 && !selectedPatient) {
      setSelectedPatient(mockPatients[0]);
    }
  }, [setLocation, selectedPatient]);

  const handleLogout = () => {
    localStorage.removeItem("emma_medico_auth");
    localStorage.removeItem("emma_medico_name");
    setLocation("/login-medico");
  };

  const handleSaveConduta = () => {
    if (!newConduta.trim() || !selectedPatient) return;

    // Simular salvamento (em produção, seria uma chamada à API)
    const newEntry = {
      date: new Date().toISOString().split("T")[0],
      medico: medicoName,
      texto: newConduta,
    };

    // Atualizar localmente
    selectedPatient.condutas.unshift(newEntry);
    setNewConduta("");
    alert("Conduta registrada com sucesso!");
  };

  const getAlertColor = (level: AlertLevel) => {
    switch (level) {
      case "green":
        return "bg-green-100 text-green-800 border-green-300";
      case "yellow":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "red":
        return "bg-red-100 text-red-800 border-red-300";
    }
  };

  const getAlertIcon = (level: AlertLevel) => {
    switch (level) {
      case "green":
        return <TrendingUp className="w-4 h-4" />;
      case "yellow":
        return <AlertTriangle className="w-4 h-4" />;
      case "red":
        return <TrendingDown className="w-4 h-4" />;
    }
  };

  const getAlertText = (level: AlertLevel) => {
    switch (level) {
      case "green":
        return "Estável";
      case "yellow":
        return "Atenção";
      case "red":
        return "Urgente";
    }
  };

  if (!selectedPatient) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  // Preparar dados para gráficos
  const cognitiveMotorData = selectedPatient.biomarcadores.sdmt.map((sdmt, index) => ({
    date: sdmt.date,
    SDMT: sdmt.value,
    "9-Hole Peg (s)": selectedPatient.biomarcadores.nineHolePeg[index]?.value || null,
  }));

  const edssData = selectedPatient.biomarcadores.edssHistory.map((edss) => ({
    date: edss.date,
    EDSS: edss.value,
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
              <h1 className="text-lg font-bold text-emma-text">Portal do Médico</h1>
              <p className="text-sm text-muted-foreground">{medicoName}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar: Lista de Pacientes */}
          <div className="lg:col-span-3">
            <Card className="h-auto lg:h-[calc(100vh-180px)]">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Pacientes</CardTitle>
                <CardDescription>Clique para visualizar detalhes</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-auto lg:h-[calc(100vh-280px)] px-4 pb-4">
                  <div className="space-y-2">
                    {mockPatients.map((patient) => (
                      <button
                        key={patient.id}
                        onClick={() => setSelectedPatient(patient)}
                        className={cn(
                          "w-full text-left p-3 rounded-lg border-2 transition-all hover:shadow-md",
                          selectedPatient?.id === patient.id
                            ? "border-emma-primary bg-purple-50"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        )}
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm text-emma-text truncate">
                                {patient.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {patient.age} anos
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className={cn("gap-1 text-xs shrink-0", getAlertColor(patient.alertLevel))}
                            >
                              {getAlertIcon(patient.alertLevel)}
                              <span className="hidden sm:inline">{getAlertText(patient.alertLevel)}</span>
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="font-medium">EDSS:</span>
                            <span>{patient.edss}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Content: Gráficos e Biomarcadores */}
          <div className="lg:col-span-9 space-y-6">
            {/* Informações do Paciente */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl">{selectedPatient.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {selectedPatient.age} anos • {selectedPatient.diagnosis}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn("gap-2 text-sm px-3 py-1", getAlertColor(selectedPatient.alertLevel))}
                  >
                    {getAlertIcon(selectedPatient.alertLevel)}
                    {getAlertText(selectedPatient.alertLevel)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-muted-foreground">EDSS Atual</p>
                    <p className="text-3xl font-bold text-emma-primary mt-1">
                      {selectedPatient.edss}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Última Avaliação</p>
                    <p className="text-lg font-semibold text-emma-text mt-1">
                      {new Date(selectedPatient.lastUpdate).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Condutas Registradas</p>
                    <p className="text-3xl font-bold text-emma-text mt-1">
                      {selectedPatient.condutas.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gráficos Separados */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico 1: Testes Cognitivos/Motores */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Activity className="w-5 h-5 text-emma-primary" />
                    Testes Cognitivos e Motores
                  </CardTitle>
                  <CardDescription className="flex items-start gap-2">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <span className="text-xs">
                      SDMT: símbolos corretos (45-65 normal). 9-Hole Peg: tempo em segundos (18-22s normal, menor é melhor).
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={cognitiveMotorData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      <Line
                        type="monotone"
                        dataKey="SDMT"
                        stroke="#9370DB"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="9-Hole Peg (s)"
                        stroke="#FFD700"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Gráfico 2: EDSS */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <TrendingUp className="w-5 h-5 text-emma-primary" />
                    Escala EDSS
                  </CardTitle>
                  <CardDescription className="flex items-start gap-2">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <span className="text-xs">
                      Expanded Disability Status Scale (0-10). Valores maiores indicam maior comprometimento funcional.
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={edssData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                      <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      <Line
                        type="monotone"
                        dataKey="EDSS"
                        stroke="#FF6B6B"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Painéis de Biomarcadores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Eye-Tracking */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Eye className="w-4 h-4 text-emma-primary" />
                    Eye-Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Latência Sacádica</p>
                    <p className="text-2xl font-bold text-emma-text">
                      {selectedPatient.biomarcadores.eyeTracking.latenciaSacadica} ms
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Normal: 150-200 ms
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-xs text-muted-foreground">Estabilidade de Fixação</p>
                    <p className="text-2xl font-bold text-emma-text">
                      {selectedPatient.biomarcadores.eyeTracking.estabilidadeFixacao}%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Normal: &gt;90%
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Vocal */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Mic className="w-4 h-4 text-emma-primary" />
                    Análise Vocal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Jitter</p>
                    <p className="text-2xl font-bold text-emma-text">
                      {selectedPatient.biomarcadores.vocal.jitter}%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Normal: &lt;1.0%
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-xs text-muted-foreground">Shimmer</p>
                    <p className="text-2xl font-bold text-emma-text">
                      {selectedPatient.biomarcadores.vocal.shimmer}%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Normal: &lt;3.5%
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Motor */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emma-primary" />
                    Motor
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Equilíbrio</p>
                    <p className="text-2xl font-bold text-emma-text">
                      {selectedPatient.biomarcadores.motor.equilibrio}/100
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Normal: &gt;80
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-xs text-muted-foreground">Velocidade de Marcha</p>
                    <p className="text-2xl font-bold text-emma-text">
                      {selectedPatient.biomarcadores.motor.marcha} m/s
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Normal: &gt;1.2 m/s
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Condutas Clínicas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emma-primary" />
                  Condutas Clínicas
                </CardTitle>
                <CardDescription>
                  Registre ajustes na medicação e decisões terapêuticas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Textarea
                    placeholder="Digite a conduta clínica aqui..."
                    value={newConduta}
                    onChange={(e) => setNewConduta(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button
                    onClick={handleSaveConduta}
                    className="bg-emma-primary hover:bg-emma-primary/90"
                    disabled={!newConduta.trim()}
                  >
                    Salvar Conduta
                  </Button>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-emma-text">Histórico de Condutas</h4>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-3 pr-4">
                      {selectedPatient.condutas.map((conduta, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <p className="text-xs font-semibold text-emma-primary">
                              {conduta.medico}
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(conduta.date).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                          <p className="text-sm text-emma-text whitespace-pre-wrap">
                            {conduta.texto}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
