export type CriticalityLevel = "critical" | "attention" | "stable" | "excellent";
export type ContactType = "phone" | "whatsapp" | "email" | "visit";

export interface PSPContact {
  date: string;
  type: ContactType;
  responsible: string;
  notes: string;
  outcome: string;
}

export interface AdverseEvent {
  id: string;
  patientId: string;
  date: string;
  severity: "mild" | "moderate" | "severe";
  description: string;
  resolved: boolean;
}

export interface PharmaPatient {
  id: string;
  name: string;
  age: number;
  gender: "M" | "F";
  diagnosis: string;
  medication: string;
  startDate: string;
  adherenceRate: number; // 0-100%
  dailyEngagement: number; // 0-100%
  criticalityLevel: CriticalityLevel;
  lastTestDate: string;
  biomarcadores: {
    sdmt: number;
    nineHolePeg: number;
    edss: number;
    eyeTracking: number; // latência sacádica
    vocal: number; // jitter
    motor: number; // equilíbrio
  };
  trends: {
    sdmt: "improving" | "stable" | "declining";
    nineHolePeg: "improving" | "stable" | "declining";
    edss: "improving" | "stable" | "declining";
  };
  pspContacts: PSPContact[];
  adverseEvents: AdverseEvent[];
}

export interface CohortKPIs {
  totalPatients: number;
  adherenceRate: number; // média
  dailyEngagement: number; // média
  criticalPatients: number;
  attentionPatients: number;
  stablePatients: number;
  excellentPatients: number;
  adverseEventsTotal: number;
  adverseEventsUnresolved: number;
}

export interface AggregatedBiomarkers {
  sdmt: {
    mean: number;
    median: number;
    distribution: { range: string; count: number }[];
  };
  nineHolePeg: {
    mean: number;
    median: number;
    distribution: { range: string; count: number }[];
  };
  edss: {
    mean: number;
    median: number;
    distribution: { range: string; count: number }[];
  };
  eyeTracking: {
    mean: number;
    median: number;
  };
  vocal: {
    mean: number;
    median: number;
  };
  motor: {
    mean: number;
    median: number;
  };
}

export const mockPharmaPatients: PharmaPatient[] = [
  {
    id: "pp001",
    name: "Maria Santos",
    age: 32,
    gender: "F",
    diagnosis: "EMRR",
    medication: "Natalizumabe",
    startDate: "2024-03-15",
    adherenceRate: 45,
    dailyEngagement: 28,
    criticalityLevel: "critical",
    lastTestDate: "2025-01-27",
    biomarcadores: {
      sdmt: 32,
      nineHolePeg: 35.8,
      edss: 3.5,
      eyeTracking: 312,
      vocal: 2.8,
      motor: 54,
    },
    trends: {
      sdmt: "declining",
      nineHolePeg: "declining",
      edss: "declining",
    },
    pspContacts: [
      {
        date: "2025-01-20",
        type: "phone",
        responsible: "Ana Paula - PSP",
        notes: "Paciente relatou dificuldades financeiras para transporte até o centro de infusão. Faltou nas últimas 2 aplicações.",
        outcome: "Agendado transporte gratuito para próxima infusão (30/01)",
      },
    ],
    adverseEvents: [
      {
        id: "ae001",
        patientId: "pp001",
        date: "2025-01-15",
        severity: "moderate",
        description: "Cefaleia intensa pós-infusão, duração 48h",
        resolved: true,
      },
    ],
  },
  {
    id: "pp002",
    name: "João Ferreira",
    age: 45,
    gender: "M",
    diagnosis: "EMSP",
    medication: "Ocrelizumabe",
    startDate: "2023-08-10",
    adherenceRate: 72,
    dailyEngagement: 58,
    criticalityLevel: "attention",
    lastTestDate: "2025-01-25",
    biomarcadores: {
      sdmt: 36,
      nineHolePeg: 30.2,
      edss: 4.5,
      eyeTracking: 258,
      vocal: 1.9,
      motor: 68,
    },
    trends: {
      sdmt: "stable",
      nineHolePeg: "declining",
      edss: "stable",
    },
    pspContacts: [
      {
        date: "2025-01-18",
        type: "whatsapp",
        responsible: "Carlos - PSP",
        notes: "Paciente engajado, mas relata fadiga excessiva que dificulta realização dos testes diários.",
        outcome: "Orientado sobre importância do monitoramento. Sugerido horário alternativo (manhã).",
      },
      {
        date: "2024-12-10",
        type: "phone",
        responsible: "Carlos - PSP",
        notes: "Check-in de rotina. Paciente satisfeito com tratamento.",
        outcome: "Sem pendências.",
      },
    ],
    adverseEvents: [],
  },
  {
    id: "pp003",
    name: "Carla Mendes",
    age: 28,
    gender: "F",
    diagnosis: "EMRR",
    medication: "Natalizumabe",
    startDate: "2024-06-20",
    adherenceRate: 95,
    dailyEngagement: 88,
    criticalityLevel: "excellent",
    lastTestDate: "2025-01-26",
    biomarcadores: {
      sdmt: 58,
      nineHolePeg: 20.1,
      edss: 1.5,
      eyeTracking: 178,
      vocal: 0.7,
      motor: 90,
    },
    trends: {
      sdmt: "improving",
      nineHolePeg: "improving",
      edss: "stable",
    },
    pspContacts: [
      {
        date: "2025-01-10",
        type: "email",
        responsible: "Ana Paula - PSP",
        notes: "Paciente enviou depoimento positivo sobre melhora na qualidade de vida. Solicitou informações sobre grupo de apoio.",
        outcome: "Encaminhada para grupo de apoio online. Depoimento registrado para materiais educativos.",
      },
    ],
    adverseEvents: [],
  },
  {
    id: "pp004",
    name: "Roberto Lima",
    age: 52,
    gender: "M",
    diagnosis: "EMPP",
    medication: "Ocrelizumabe",
    startDate: "2023-01-05",
    adherenceRate: 88,
    dailyEngagement: 75,
    criticalityLevel: "stable",
    lastTestDate: "2025-01-24",
    biomarcadores: {
      sdmt: 42,
      nineHolePeg: 26.5,
      edss: 5.0,
      eyeTracking: 225,
      vocal: 1.5,
      motor: 72,
    },
    trends: {
      sdmt: "stable",
      nineHolePeg: "stable",
      edss: "stable",
    },
    pspContacts: [
      {
        date: "2025-01-05",
        type: "visit",
        responsible: "Carlos - PSP",
        notes: "Visita domiciliar. Paciente com boa adesão, mas apresenta dúvidas sobre progressão da doença.",
        outcome: "Orientado sobre expectativas realistas. Encaminhado para acompanhamento psicológico.",
      },
    ],
    adverseEvents: [
      {
        id: "ae002",
        patientId: "pp004",
        date: "2024-12-20",
        severity: "mild",
        description: "Reação no local da infusão (eritema leve)",
        resolved: true,
      },
    ],
  },
  {
    id: "pp005",
    name: "Juliana Costa",
    age: 36,
    gender: "F",
    diagnosis: "EMRR",
    medication: "Natalizumabe",
    startDate: "2024-09-12",
    adherenceRate: 58,
    dailyEngagement: 42,
    criticalityLevel: "attention",
    lastTestDate: "2025-01-23",
    biomarcadores: {
      sdmt: 44,
      nineHolePeg: 27.8,
      edss: 2.5,
      eyeTracking: 242,
      vocal: 1.6,
      motor: 76,
    },
    trends: {
      sdmt: "declining",
      nineHolePeg: "stable",
      edss: "stable",
    },
    pspContacts: [
      {
        date: "2025-01-15",
        type: "whatsapp",
        responsible: "Ana Paula - PSP",
        notes: "Paciente relata esquecimento frequente dos testes. Baixo engajamento com gamificação.",
        outcome: "Configurado lembrete diário via WhatsApp. Sugerido horário fixo (20h).",
      },
    ],
    adverseEvents: [],
  },
  {
    id: "pp006",
    name: "Pedro Alves",
    age: 41,
    gender: "M",
    diagnosis: "EMRR",
    medication: "Ocrelizumabe",
    startDate: "2024-02-28",
    adherenceRate: 92,
    dailyEngagement: 82,
    criticalityLevel: "stable",
    lastTestDate: "2025-01-26",
    biomarcadores: {
      sdmt: 50,
      nineHolePeg: 23.2,
      edss: 2.0,
      eyeTracking: 195,
      vocal: 1.1,
      motor: 84,
    },
    trends: {
      sdmt: "stable",
      nineHolePeg: "improving",
      edss: "stable",
    },
    pspContacts: [
      {
        date: "2024-12-20",
        type: "phone",
        responsible: "Carlos - PSP",
        notes: "Check-in de fim de ano. Paciente satisfeito e engajado.",
        outcome: "Sem pendências. Próximo contato em março/2025.",
      },
    ],
    adverseEvents: [],
  },
];

export const mockCohortKPIs: CohortKPIs = {
  totalPatients: 6,
  adherenceRate: 75.0,
  dailyEngagement: 62.2,
  criticalPatients: 1,
  attentionPatients: 2,
  stablePatients: 2,
  excellentPatients: 1,
  adverseEventsTotal: 3,
  adverseEventsUnresolved: 0,
};

export const mockAggregatedBiomarkers: AggregatedBiomarkers = {
  sdmt: {
    mean: 43.7,
    median: 43.0,
    distribution: [
      { range: "0-30", count: 1 },
      { range: "31-45", count: 3 },
      { range: "46-60", count: 2 },
      { range: "61+", count: 0 },
    ],
  },
  nineHolePeg: {
    mean: 27.3,
    median: 26.9,
    distribution: [
      { range: "15-20", count: 1 },
      { range: "21-25", count: 2 },
      { range: "26-30", count: 2 },
      { range: "31+", count: 1 },
    ],
  },
  edss: {
    mean: 3.2,
    median: 3.0,
    distribution: [
      { range: "0-2", count: 2 },
      { range: "2.5-4", count: 2 },
      { range: "4.5-6", count: 2 },
      { range: "6.5+", count: 0 },
    ],
  },
  eyeTracking: {
    mean: 235.0,
    median: 233.5,
  },
  vocal: {
    mean: 1.6,
    median: 1.55,
  },
  motor: {
    mean: 74.0,
    median: 74.0,
  },
};
