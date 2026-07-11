import { create } from 'zustand';

interface AppState {
  isBooting: boolean;
  isRecruiterMode: boolean;
  isTerminalOpen: boolean;
  finishBooting: () => void;
  toggleRecruiterMode: () => void;
  toggleTerminal: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isBooting: true, // Start with booting sequence
  isRecruiterMode: false,
  isTerminalOpen: false,
  finishBooting: () => set({ isBooting: false }),
  toggleRecruiterMode: () => set((state) => ({ isRecruiterMode: !state.isRecruiterMode })),
  toggleTerminal: () => set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),
}));
