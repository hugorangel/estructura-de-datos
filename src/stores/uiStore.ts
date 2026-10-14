import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SupportedLanguage, PlaybackMode } from '@/core/interfaces';

interface UIStore {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  selectedLanguage: SupportedLanguage;
  setSelectedLanguage: (lang: SupportedLanguage) => void;
  preferredMode: PlaybackMode;
  setPreferredMode: (mode: PlaybackMode) => void;
  preferredSpeed: number;
  setPreferredSpeed: (speed: number) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

      sidebarCollapsed: false,
      toggleSidebar: () =>
        set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

      selectedLanguage: 'typescript',
      setSelectedLanguage: (lang) => set({ selectedLanguage: lang }),

      preferredMode: 'auto',
      setPreferredMode: (mode) => set({ preferredMode: mode }),

      preferredSpeed: 1,
      setPreferredSpeed: (speed) => set({ preferredSpeed: speed }),
    }),
    { name: 'ds-visualizer-ui' }
  )
);
