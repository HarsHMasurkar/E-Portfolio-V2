/**
 * Zustand Global State Store
 * Manages active section, portfolio data, and UI state
 */

import { create } from 'zustand';

export const usePortfolioStore = create((set, get) => ({
  // ─── Active Section (which overlay is open) ─────────────────────────────────
  activeSection: null,
  setActiveSection: (section) => {
    // Toggle off if same section clicked again
    if (get().activeSection === section) {
      set({ activeSection: null });
    } else {
      set({ activeSection: section });
      // Play click sound
      get().playSound('click');
    }
  },
  closeSection: () => set({ activeSection: null }),

  // ─── Portfolio Data ──────────────────────────────────────────────────────────
  projects: [],
  skills: [],
  profile: null,
  loading: {
    projects: false,
    skills: false,
    profile: false,
  },
  errors: {},

  setProjects: (projects) => set({ projects }),
  setSkills: (skills) => set({ skills }),
  setProfile: (profile) => set({ profile }),
  setLoading: (key, value) => set((state) => ({
    loading: { ...state.loading, [key]: value }
  })),
  setError: (key, value) => set((state) => ({
    errors: { ...state.errors, [key]: value }
  })),

  // ─── 3D Scene State ──────────────────────────────────────────────────────────
  sceneLoaded: false,
  setSceneLoaded: (loaded) => set({ sceneLoaded: loaded }),

  cameraTarget: null,
  setCameraTarget: (target) => set({ cameraTarget: target }),

  // ─── Sound State ─────────────────────────────────────────────────────────────
  soundEnabled: true,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

  // Sound player using Web Audio API (no external files needed)
  playSound: (type) => {
    if (!get().soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      if (type === 'click') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
      } else if (type === 'hover') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(660, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.08);
      } else if (type === 'success') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523, ctx.currentTime);
        oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.4);
      }
    } catch (e) {
      // Ignore audio errors silently
    }
  },

  // ─── Contact Form State ───────────────────────────────────────────────────────
  contactSubmitting: false,
  setContactSubmitting: (v) => set({ contactSubmitting: v }),
}));
