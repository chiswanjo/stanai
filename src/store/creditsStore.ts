import { create } from 'zustand';
import { CreditsState } from '../types/auth';
import { useAuthStore } from './authStore';

export const useCreditsStore = create<CreditsState>((set, get) => ({
  credits: 100,

  useCredits: async (amount: number) => {
    const currentCredits = get().credits;
    if (currentCredits >= amount) {
      set({ credits: currentCredits - amount });
      return true;
    }
    return false;
  },

  addCredits: (amount: number) => {
    set({ credits: get().credits + amount });
  }
}));