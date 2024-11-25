import { create } from 'zustand';
import { AuthState, User } from '../types/auth';

// Simulated user data - In production, this would come from your backend
const MOCK_USER: User = {
  id: '1',
  email: 'demo@stanai.com',
  name: 'Demo User',
  credits: 100,
  plan: 'free'
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password) {
      set({ user: MOCK_USER, isAuthenticated: true });
    } else {
      throw new Error('Invalid credentials');
    }
  },

  register: async (email: string, password: string, name: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password && name) {
      const newUser: User = { ...MOCK_USER, email, name };
      set({ user: newUser, isAuthenticated: true });
    } else {
      throw new Error('Invalid registration data');
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  }
}));