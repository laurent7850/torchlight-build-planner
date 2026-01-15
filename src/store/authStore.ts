import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  register: (username: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  addBuildToUser: (buildId: string) => void;
  removeBuildFromUser: (buildId: string) => void;
  likeBuild: (buildId: string) => void;
  unlikeBuild: (buildId: string) => void;
  clearError: () => void;
}

// Simulated user database (in real app, this would be on the server)
const USERS_STORAGE_KEY = 'torchlight-users';

const getStoredUsers = (): { [email: string]: { user: User; password: string } } => {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
};

const saveUsers = (users: { [email: string]: { user: User; password: string } }) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      register: async (username: string, email: string, password: string) => {
        set({ isLoading: true, error: null });

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const users = getStoredUsers();

        if (users[email]) {
          set({ isLoading: false, error: 'An account with this email already exists' });
          return false;
        }

        if (username.length < 3) {
          set({ isLoading: false, error: 'Username must be at least 3 characters' });
          return false;
        }

        if (password.length < 6) {
          set({ isLoading: false, error: 'Password must be at least 6 characters' });
          return false;
        }

        const newUser: User = {
          id: uuidv4(),
          username,
          email,
          builds: [],
          likedBuilds: [],
          createdAt: new Date(),
        };

        users[email] = { user: newUser, password };
        saveUsers(users);

        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        return true;
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const users = getStoredUsers();
        const userData = users[email];

        if (!userData) {
          set({ isLoading: false, error: 'No account found with this email' });
          return false;
        }

        if (userData.password !== password) {
          set({ isLoading: false, error: 'Incorrect password' });
          return false;
        }

        set({
          user: userData.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        return true;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      updateProfile: (updates: Partial<User>) => {
        const state = get();
        if (!state.user) return;

        const updatedUser = { ...state.user, ...updates };

        // Update in storage
        const users = getStoredUsers();
        if (users[state.user.email]) {
          users[state.user.email].user = updatedUser;
          saveUsers(users);
        }

        set({ user: updatedUser });
      },

      addBuildToUser: (buildId: string) => {
        const state = get();
        if (!state.user) return;
        if (state.user.builds.includes(buildId)) return;

        const updatedUser = {
          ...state.user,
          builds: [...state.user.builds, buildId],
        };

        const users = getStoredUsers();
        if (users[state.user.email]) {
          users[state.user.email].user = updatedUser;
          saveUsers(users);
        }

        set({ user: updatedUser });
      },

      removeBuildFromUser: (buildId: string) => {
        const state = get();
        if (!state.user) return;

        const updatedUser = {
          ...state.user,
          builds: state.user.builds.filter(id => id !== buildId),
        };

        const users = getStoredUsers();
        if (users[state.user.email]) {
          users[state.user.email].user = updatedUser;
          saveUsers(users);
        }

        set({ user: updatedUser });
      },

      likeBuild: (buildId: string) => {
        const state = get();
        if (!state.user) return;
        if (state.user.likedBuilds.includes(buildId)) return;

        const updatedUser = {
          ...state.user,
          likedBuilds: [...state.user.likedBuilds, buildId],
        };

        const users = getStoredUsers();
        if (users[state.user.email]) {
          users[state.user.email].user = updatedUser;
          saveUsers(users);
        }

        set({ user: updatedUser });
      },

      unlikeBuild: (buildId: string) => {
        const state = get();
        if (!state.user) return;

        const updatedUser = {
          ...state.user,
          likedBuilds: state.user.likedBuilds.filter(id => id !== buildId),
        };

        const users = getStoredUsers();
        if (users[state.user.email]) {
          users[state.user.email].user = updatedUser;
          saveUsers(users);
        }

        set({ user: updatedUser });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'torchlight-auth',
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
