import React, { createContext, useContext, useState, useEffect } from 'react';
import { machines as initialMachines, orders as initialOrders, maintenanceList as initialMaintenance, users as initialUsers, operatorDetails as initialOpDetails, parts as initialParts, occurrences as initialOccurrences } from '../mockData';
import { Machine, Order, Maintenance, User, Operator, OperatorDetail, Part, Occurrence } from '../types';

interface AppContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  machines: Machine[];
  addMachine: (machine: Machine) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  maintenanceList: Maintenance[];
  addMaintenance: (maintenance: Maintenance) => void;
  markMaintenanceCompleted: (id: string) => void;
  users: User[];
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  // Operator logic
  getOperators: () => Operator[];
  updateOperatorMachines: (userId: string, machines: string[]) => void;
  parts: Part[];
  addPart: (part: Part) => void;
  updatePart: (part: Part) => void;
  deletePart: (code: string) => void;
  occurrences: Occurrence[];
  addOccurrence: (occurrence: Occurrence) => void;
  resolveOccurrence: (id: string) => void;
  factoryData: { name: string; cnpj: string; code: string; address: string };
  updateFactoryData: (data: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [machines, setMachines] = useState<Machine[]>(initialMachines);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [maintenanceList, setMaintenanceList] = useState<Maintenance[]>(initialMaintenance);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [opDetails, setOpDetails] = useState<OperatorDetail[]>(initialOpDetails);

  const [parts, setParts] = useState<Part[]>(initialParts);
  const [occurrences, setOccurrences] = useState<Occurrence[]>(initialOccurrences);
  const [factoryData, setFactoryData] = useState({
    name: "Unidade Matriz Precisium",
    cnpj: "00.123.456/0001-78",
    code: "PRSM-BR-01",
    address: "Rua da Indústria, 123 - Distrito Industrial, Joinville/SC"
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const addMachine = (machine: Machine) => setMachines([...machines, machine]);
  const addOrder = (order: Order) => setOrders([...orders, order]);

  const addMaintenance = (item: Maintenance) => setMaintenanceList([...maintenanceList, item]);
  const markMaintenanceCompleted = (id: string) => {
    const maintenance = maintenanceList.find(m => m.id === id);
    if (maintenance) {
      // Update maintenance status
      setMaintenanceList(maintenanceList.map(m => m.id === id ? { ...m, status: 'Concluída' } : m));

      // Update machine's last maintenance date and type
      const today = new Date();
      const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

      setMachines(prevMachines =>
        prevMachines.map(machine =>
          machine.name === maintenance.machine
            ? { ...machine, lastMaintenance: formattedDate, lastMaintenanceType: maintenance.type }
            : machine
        )
      );
    }
  };

  const addUser = (user: User) => setUsers(prev => [...prev, user]);
  const updateUser = (updatedUser: User) => setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  const deleteUser = (id: string) => {
    // Ensuring deletion propagates
    setUsers(prevUsers => prevUsers.filter(u => u.id !== id));
    // Also cleanup operator details if exists
    setOpDetails(prevDetails => prevDetails.filter(d => d.userId !== id));
  };

  // Dynamic getter for operators
  const getOperators = (): Operator[] => {
    return users
      .filter(u => u.role === 'Operador')
      .map(u => {
        const details = opDetails.find(d => d.userId === u.id);
        return {
          ...u,
          shift: 'Manhã', // Default shift, could be added to User model if needed
          efficiency: details ? details.efficiency : 100, // Default 100%
          machines: details ? details.machines : [] // Default empty
        };
      });
  };

  const updateOperatorMachines = (userId: string, machines: string[]) => {
    setOpDetails(prev => {
      const existing = prev.find(d => d.userId === userId);
      if (existing) {
        return prev.map(d => d.userId === userId ? { ...d, machines } : d);
      } else {
        return [...prev, { userId, efficiency: 100, machines }];
      }
    });
  };

  const addPart = (part: Part) => setParts([...parts, part]);
  const updatePart = (updatedPart: Part) => setParts(parts.map(p => p.code === updatedPart.code ? updatedPart : p));
  const deletePart = (code: string) => setParts(parts.filter(p => p.code !== code));

  const addOccurrence = (occurrence: Occurrence) => setOccurrences([occurrence, ...occurrences]);
  const resolveOccurrence = (id: string) => {
    setOccurrences(occurrences.map(o => o.id === id ? { ...o, status: 'Resolvida' } : o));
  };

  const updateFactoryData = (data: any) => setFactoryData(data);

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      machines, addMachine,
      orders, addOrder,
      maintenanceList, addMaintenance, markMaintenanceCompleted,
      users, addUser, updateUser, deleteUser,
      getOperators, updateOperatorMachines,
      parts, addPart, updatePart, deletePart,
      occurrences, addOccurrence, resolveOccurrence,
      factoryData, updateFactoryData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};