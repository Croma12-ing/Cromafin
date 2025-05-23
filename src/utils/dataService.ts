
// Data structure types
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
}

export interface LoanApplication {
  id: number;
  userId: number;
  loanType: string;
  loanAmount: string;
  panCard: string;
  aadhaarCard: string;
  mobileNumber: string;
  photoName?: string;
  qrCode: string;
  status: 'waiting' | 'approved' | 'rejected';
  submittedAt: string;
}

// Main data structure
export interface AppData {
  users: User[];
  loanApplications: LoanApplication[];
}

// Initialize data from localStorage
const initializeData = (): AppData => {
  try {
    // Try to load existing data
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const loanApplications = JSON.parse(localStorage.getItem('loanApplications') || '[]');
    
    return { users, loanApplications };
  } catch (e) {
    console.error('Error loading data from localStorage:', e);
    return { users: [], loanApplications: [] };
  }
};

// Save all data to localStorage
const saveData = (data: AppData): void => {
  try {
    localStorage.setItem('users', JSON.stringify(data.users));
    localStorage.setItem('loanApplications', JSON.stringify(data.loanApplications));
    
    // Export as JSON file for download (only in development)
    if (process.env.NODE_ENV !== 'production') {
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'cromafin-data.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  } catch (e) {
    console.error('Error saving data:', e);
  }
};

// User operations
export const addUser = (user: Omit<User, 'id' | 'createdAt'>): User => {
  const data = initializeData();
  const newUser: User = {
    ...user,
    id: Date.now(),
    createdAt: new Date().toISOString()
  };
  
  data.users.push(newUser);
  saveData(data);
  return newUser;
};

export const getUsers = (): User[] => {
  const data = initializeData();
  return data.users;
};

export const getUserById = (id: number): User | undefined => {
  const data = initializeData();
  return data.users.find(u => u.id === id);
};

// Loan application operations
export const addLoanApplication = (application: Omit<LoanApplication, 'id' | 'submittedAt' | 'status'>): LoanApplication => {
  const data = initializeData();
  const newApplication: LoanApplication = {
    ...application,
    id: Date.now(),
    status: 'waiting',
    submittedAt: new Date().toISOString()
  };
  
  data.loanApplications.push(newApplication);
  saveData(data);
  return newApplication;
};

export const getLoanApplications = (): LoanApplication[] => {
  const data = initializeData();
  return data.loanApplications;
};

export const getLoanApplicationsByUserId = (userId: number): LoanApplication[] => {
  const data = initializeData();
  return data.loanApplications.filter(a => a.userId === userId);
};

// Export full data (useful for system backups, import/export)
export const exportAllData = (): AppData => {
  return initializeData();
};

export const importAllData = (data: AppData): void => {
  saveData(data);
};
