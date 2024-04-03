import { create } from 'zustand';
import { User } from '../types/user';

interface UserState {
	user: User;
	authenticated: boolean;
	setAvatar: (url: string) => void;
	setUser: (user: User) => void;
	modifyUser: (user: Partial<User>) => void;
	toggleAuthenticated: () => void;
	removeUser: () => void;
}

const useUserStore = create<UserState>()((set) => ({
	user: {} as User,
	authenticated: false,
	setAvatar: (url: string) =>
		set((state) => ({ user: { ...state.user, avatar: url } })),
	setUser: (user: User) => set({ user: user }),
	modifyUser: (user: Partial<User>) =>
		set((state) => ({ user: { ...state.user, ...user } })),
	toggleAuthenticated: () =>
		set((state) => ({ authenticated: !state.authenticated })),
	removeUser: () => set({ user: {} as User })
}));

export default useUserStore;
