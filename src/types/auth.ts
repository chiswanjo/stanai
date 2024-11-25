export interface User {
  id: string;
  email: string;
  name: string;
  credits: number;
  plan: 'free' | 'premium';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

export interface CreditsState {
  credits: number;
  useCredits: (amount: number) => Promise<boolean>;
  addCredits: (amount: number) => void;
}