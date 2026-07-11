import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: number;
}

interface ChatState {
  isOpen: boolean;
  messages: Message[];
  setIsOpen: (isOpen: boolean) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
}

const initialMessage: Message = {
  id: 'init_1',
  role: 'ai',
  content: "👋 Hi! I'm Aman's AI Assistant.\n\nI can answer questions about:\n- **Projects**\n- **Skills**\n- **Education**\n- **Experience**\n- **Resume**\n- **Certifications**\n- **Contact Information**",
  timestamp: Date.now(),
};

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      isOpen: false,
      messages: [initialMessage],
      setIsOpen: (isOpen) => set({ isOpen }),
      addMessage: (msg) =>
        set((state) => ({
          messages: [
            ...state.messages,
            { ...msg, id: Math.random().toString(36).substr(2, 9), timestamp: Date.now() },
          ],
        })),
      clearHistory: () => set({ messages: [initialMessage] }),
    }),
    {
      name: 'portfolio-chat-storage', // unique name for localStorage
      partialize: (state) => ({ messages: state.messages }), // only persist messages
    }
  )
);
