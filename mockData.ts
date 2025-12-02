import { Machine, Order, Maintenance, User, OperatorDetail, Part, Occurrence } from './types';

export const machines: Machine[] = [
  { id: 'CNC-001', name: 'Torno CNC-A01', model: 'Siemens Sinumerik 840D', status: 'Operando', hours: 12450, lastMaintenance: '15/07/2024' },
  { id: 'CNC-002', name: 'Fresadora V-25', model: 'Fanuc Series 31i', status: 'Parada', hours: 8920, lastMaintenance: '02/06/2024' },
  { id: 'CNC-003', name: 'Centro de Usinagem H-10', model: 'Heidenhain TNC 640', status: 'Manutenção', hours: 21150, lastMaintenance: '28/07/2024' },
  { id: 'CNC-004', name: 'Retificadora P-05', model: 'Mitsubishi M80', status: 'Operando', hours: 5600, lastMaintenance: '11/05/2024' },
  { id: 'CNC-005', name: 'Corte a Laser F-50', model: 'Mazak SmoothX', status: 'Ociosa', hours: 15300, lastMaintenance: '19/07/2024' },
];

export const orders: Order[] = [
  { id: 'OP-10531', part: 'Eixo Principal XT-500', quantity: 1500, operator: 'Carlos Silva', machine: 'Torno CNC-03', progress: 75, status: 'Em Progresso' },
  { id: 'OP-10532', part: 'Flange de Aço Inox 316', quantity: 500, operator: 'Ana Pereira', machine: 'Fresadora B-12', progress: 100, status: 'Concluída' },
  { id: 'OP-10533', part: 'Carcaça de Alumínio K-9', quantity: 80, operator: 'Mariana Costa', machine: 'Injetora PLAST-01', progress: 20, status: 'Cancelado' },
  { id: 'OP-10534', part: 'Engrenagem M2-Z24', quantity: 2000, operator: 'Rafael Souza', machine: 'Centro de Usinagem V3', progress: 0, status: 'Pendente' },
];

export const maintenanceList: Maintenance[] = [
  { id: '#MP-0851', machine: 'Prensa Hidráulica PH-250T', type: 'Preventiva', date: '25/07/2024', technician: 'Equipe Alfa', description: 'Troca de óleo', criticality: 'Alta', status: 'Agendada' },
  { id: '#MP-0852', machine: 'Centro de Usinagem CNC-V3', type: 'Preventiva', date: '28/07/2024', technician: 'Equipe Beta', description: 'Calibração', criticality: 'Média', status: 'Agendada' },
  { id: '#MP-0853', machine: 'Robô de Solda RS-MIG-04', type: 'Preventiva', date: '02/08/2024', technician: 'Equipe Gama', description: 'Limpeza bico', criticality: 'Baixa', status: 'Pendente' },
];

export const users: User[] = [
  { id: '1', name: 'Admin User', role: 'Admin', email: 'admin@precisium.com' },
  { id: '2', name: 'Carlos Pereira', role: 'Técnico', email: 'carlos.pereira@precisium.com' },
  { id: '3', name: 'Beatriz Costa', role: 'Operador', email: 'beatriz.costa@precisium.com' },
  { id: '4', name: 'João Santos', role: 'Operador', email: 'joao.santos@precisium.com' },
];

// Stores specific data for users who are operators. 
// If a user isn't here, they get default values (100% efficiency, no machines).
export const operatorDetails: OperatorDetail[] = [
  { userId: '3', efficiency: 95, machines: [] },
  { userId: '4', efficiency: 88, machines: [] }
];

export const parts: Part[] = [
  { code: 'PFC-001', name: 'Eixo de Transmissão Principal', material: 'Aço Inox 304', stock: 12500 },
  { code: 'PFC-002', name: 'Engrenagem Helicoidal M2', material: 'Alumínio 6061', stock: 8780 },
];

export const occurrences: Occurrence[] = [
  { id: '#7451', title: 'Vazamento de óleo no setor B', machine: 'Prensa Hidráulica PH-02', date: '24/07/2024 10:30', priority: 'Alta', description: 'Falha na vedação do cilindro principal.', status: 'Aberta' },
  { id: '#7450', title: 'Parada inesperada da esteira', machine: 'Esteira ET-05', date: '24/07/2024 08:15', priority: 'Alta', description: 'Motor apresentou ruído incomum.', status: 'Em Análise' },
];