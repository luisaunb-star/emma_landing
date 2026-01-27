export type AlertLevel = "green" | "yellow" | "red";

export interface BiomarcadorData {
  date: string;
  value: number;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
  edss: number;
  alertLevel: AlertLevel;
  lastUpdate: string;
  biomarcadores: {
    sdmt: BiomarcadorData[];
    nineHolePeg: BiomarcadorData[];
    edssHistory: BiomarcadorData[];
    eyeTracking: {
      latenciaSacadica: number; // ms
      estabilidadeFixacao: number; // %
    };
    vocal: {
      jitter: number; // %
      shimmer: number; // %
    };
    motor: {
      equilibrio: number; // score 0-100
      marcha: number; // velocidade m/s
    };
  };
  condutas: {
    date: string;
    medico: string;
    texto: string;
  }[];
}

export const mockPatients: Patient[] = [
  {
    id: "p001",
    name: "Ana Silva",
    age: 34,
    diagnosis: "EMRR (Esclerose Múltipla Remitente-Recorrente)",
    edss: 2.0,
    alertLevel: "green",
    lastUpdate: "2025-01-26",
    biomarcadores: {
      sdmt: [
        { date: "2024-10-01", value: 52 },
        { date: "2024-11-01", value: 54 },
        { date: "2024-12-01", value: 53 },
        { date: "2025-01-01", value: 55 },
        { date: "2025-01-26", value: 56 },
      ],
      nineHolePeg: [
        { date: "2024-10-01", value: 22.3 },
        { date: "2024-11-01", value: 21.8 },
        { date: "2024-12-01", value: 22.0 },
        { date: "2025-01-01", value: 21.5 },
        { date: "2025-01-26", value: 21.2 },
      ],
      edssHistory: [
        { date: "2024-10-01", value: 2.0 },
        { date: "2024-12-01", value: 2.0 },
        { date: "2025-01-26", value: 2.0 },
      ],
      eyeTracking: {
        latenciaSacadica: 185,
        estabilidadeFixacao: 92,
      },
      vocal: {
        jitter: 0.8,
        shimmer: 3.2,
      },
      motor: {
        equilibrio: 88,
        marcha: 1.35,
      },
    },
    condutas: [
      {
        date: "2025-01-15",
        medico: "Dr. Ricardo Ávila",
        texto: "Paciente estável. Manter Interferon Beta 1a. Retorno em 3 meses.",
      },
    ],
  },
  {
    id: "p002",
    name: "Carlos Mendes",
    age: 42,
    diagnosis: "EMSP (Esclerose Múltipla Secundária Progressiva)",
    edss: 4.5,
    alertLevel: "yellow",
    lastUpdate: "2025-01-25",
    biomarcadores: {
      sdmt: [
        { date: "2024-10-01", value: 38 },
        { date: "2024-11-01", value: 36 },
        { date: "2024-12-01", value: 35 },
        { date: "2025-01-01", value: 33 },
        { date: "2025-01-25", value: 31 },
      ],
      nineHolePeg: [
        { date: "2024-10-01", value: 28.5 },
        { date: "2024-11-01", value: 29.2 },
        { date: "2024-12-01", value: 30.1 },
        { date: "2025-01-01", value: 31.3 },
        { date: "2025-01-25", value: 32.8 },
      ],
      edssHistory: [
        { date: "2024-10-01", value: 4.0 },
        { date: "2024-12-01", value: 4.5 },
        { date: "2025-01-25", value: 4.5 },
      ],
      eyeTracking: {
        latenciaSacadica: 245,
        estabilidadeFixacao: 78,
      },
      vocal: {
        jitter: 1.8,
        shimmer: 5.6,
      },
      motor: {
        equilibrio: 65,
        marcha: 0.92,
      },
    },
    condutas: [
      {
        date: "2025-01-10",
        medico: "Dr. Ricardo Ávila",
        texto: "Piora progressiva detectada. Avaliar troca para Ocrelizumabe. Solicitar RM de controle.",
      },
    ],
  },
  {
    id: "p003",
    name: "Beatriz Costa",
    age: 29,
    diagnosis: "EMRR (Esclerose Múltipla Remitente-Recorrente)",
    edss: 3.0,
    alertLevel: "red",
    lastUpdate: "2025-01-27",
    biomarcadores: {
      sdmt: [
        { date: "2024-10-01", value: 48 },
        { date: "2024-11-01", value: 46 },
        { date: "2024-12-01", value: 42 },
        { date: "2025-01-01", value: 38 },
        { date: "2025-01-27", value: 34 },
      ],
      nineHolePeg: [
        { date: "2024-10-01", value: 24.2 },
        { date: "2024-11-01", value: 26.5 },
        { date: "2024-12-01", value: 28.9 },
        { date: "2025-01-01", value: 31.2 },
        { date: "2025-01-27", value: 34.5 },
      ],
      edssHistory: [
        { date: "2024-10-01", value: 2.5 },
        { date: "2024-12-01", value: 2.5 },
        { date: "2025-01-27", value: 3.0 },
      ],
      eyeTracking: {
        latenciaSacadica: 298,
        estabilidadeFixacao: 68,
      },
      vocal: {
        jitter: 2.4,
        shimmer: 7.1,
      },
      motor: {
        equilibrio: 58,
        marcha: 0.78,
      },
    },
    condutas: [
      {
        date: "2025-01-20",
        medico: "Dr. Ricardo Ávila",
        texto: "⚠️ ALERTA: Piora acentuada em 7 dias. Janela de oportunidade identificada. Iniciar pulsoterapia com metilprednisolona 1g/dia por 5 dias. Agendar consulta presencial urgente.",
      },
    ],
  },
  {
    id: "p004",
    name: "Daniel Oliveira",
    age: 51,
    diagnosis: "EMPP (Esclerose Múltipla Primária Progressiva)",
    edss: 6.0,
    alertLevel: "yellow",
    lastUpdate: "2025-01-24",
    biomarcadores: {
      sdmt: [
        { date: "2024-10-01", value: 28 },
        { date: "2024-11-01", value: 27 },
        { date: "2024-12-01", value: 26 },
        { date: "2025-01-01", value: 25 },
        { date: "2025-01-24", value: 24 },
      ],
      nineHolePeg: [
        { date: "2024-10-01", value: 38.2 },
        { date: "2024-11-01", value: 39.1 },
        { date: "2024-12-01", value: 40.5 },
        { date: "2025-01-01", value: 41.8 },
        { date: "2025-01-24", value: 43.2 },
      ],
      edssHistory: [
        { date: "2024-10-01", value: 6.0 },
        { date: "2024-12-01", value: 6.0 },
        { date: "2025-01-24", value: 6.0 },
      ],
      eyeTracking: {
        latenciaSacadica: 325,
        estabilidadeFixacao: 62,
      },
      vocal: {
        jitter: 3.1,
        shimmer: 8.4,
      },
      motor: {
        equilibrio: 48,
        marcha: 0.65,
      },
    },
    condutas: [
      {
        date: "2025-01-05",
        medico: "Dr. Ricardo Ávila",
        texto: "Progressão lenta esperada. Manter Ocrelizumabe. Fisioterapia 3x/semana. Avaliar necessidade de bengala.",
      },
    ],
  },
  {
    id: "p005",
    name: "Fernanda Rocha",
    age: 38,
    diagnosis: "EMRR (Esclerose Múltipla Remitente-Recorrente)",
    edss: 1.5,
    alertLevel: "green",
    lastUpdate: "2025-01-26",
    biomarcadores: {
      sdmt: [
        { date: "2024-10-01", value: 58 },
        { date: "2024-11-01", value: 59 },
        { date: "2024-12-01", value: 60 },
        { date: "2025-01-01", value: 61 },
        { date: "2025-01-26", value: 62 },
      ],
      nineHolePeg: [
        { date: "2024-10-01", value: 20.5 },
        { date: "2024-11-01", value: 20.2 },
        { date: "2024-12-01", value: 19.8 },
        { date: "2025-01-01", value: 19.5 },
        { date: "2025-01-26", value: 19.2 },
      ],
      edssHistory: [
        { date: "2024-10-01", value: 1.5 },
        { date: "2024-12-01", value: 1.5 },
        { date: "2025-01-26", value: 1.5 },
      ],
      eyeTracking: {
        latenciaSacadica: 172,
        estabilidadeFixacao: 95,
      },
      vocal: {
        jitter: 0.6,
        shimmer: 2.8,
      },
      motor: {
        equilibrio: 92,
        marcha: 1.42,
      },
    },
    condutas: [
      {
        date: "2025-01-12",
        medico: "Dr. Ricardo Ávila",
        texto: "Excelente resposta ao Natalizumabe. Paciente assintomática. Manter tratamento atual. Retorno em 4 meses.",
      },
    ],
  },
];
