import { create } from 'zustand';

interface User {
  id: number;
  email: string;
  nickname: string;
  updatedAt: string;
  createdAt: string;
  image: string | null;
  teamId: string | null;
}

interface UserState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: User) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  setUser: (user) => set({ user }),
  setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
  clearUser: () => set({ user: null, accessToken: null, refreshToken: null }),
}));
