export interface Machine {
  id: string;
  name: string;
  model: string;
  status: 'Operando' | 'Parada' | 'Manutenção' | 'Ociosa';
  hours: number;
  lastMaintenance: string;
  lastMaintenanceType?: string;
}

export interface Order {
  id: string;
  part: string;
  quantity: number;
  operator: string;
  machine: string;
  progress: number;
  status: 'Concluída' | 'Em Progresso' | 'Pendente' | 'Cancelado';
}

export interface Maintenance {
  id: string;
  machine: string;
  type: 'Preventiva' | 'Corretiva' | 'Preditiva';
  date: string;
  technician: string;
  description: string;
  criticality: 'Alta' | 'Média' | 'Baixa';
  status: 'Pendente' | 'Agendada' | 'Concluída';
}

export interface User {
  id: string;
  name: string;
  role: 'Admin' | 'Técnico' | 'Operador' | 'Inativo';
  email: string;
}

// Stores extra data for users who have the 'Operador' role
export interface OperatorDetail {
  userId: string;
  efficiency: number;
  machines: string[];
}

// Combined interface for the UI
export interface Operator extends User {
  shift: 'Manhã' | 'Tarde' | 'Noite';
  efficiency: number;
  machines: string[];
}

export interface Part {
  code: string;
  name: string;
  material: string;
  stock: number;
}

export interface Occurrence {
  id: string;
  title: string;
  machine: string;
  date: string;
  priority: 'Alta' | 'Média' | 'Baixa';
  description: string;
  status: 'Aberta' | 'Em Análise' | 'Resolvida';
}