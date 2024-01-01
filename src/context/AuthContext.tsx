import axios from 'axios';
import { ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { BACKEND_API_URL } from '../constants/config';

import {
	createContext,
	useContext,
	useEffect,
	useState
} from 'react';

interface AuthProps {
	authState?: { token: string | null; authenticated: boolean | null };
	onSignup?: (username: string, email: string, name: string, password: string) => Promise<any>;
	onLogin?: (username: string, password: string) => Promise<any>;
	onLogout?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
	const [authState, setAuthState] = useState<{
		token: string | null;
		authenticated: boolean | null
	}>({
		token: null,
		authenticated: null
	});

	useEffect(() => {
		async function loadToken() {
			const token = await SecureStore.getItemAsync('token');

			if (token) {
				setAuthState({
					token: token,
					authenticated: true
				});

				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			}
		}

		loadToken();
	}, []);

	async function login(username: string, password: string) {
		try {
			const response = await axios.post(`${BACKEND_API_URL}/auth/login`, {
				username,
				password
			});

			const responseData = response.data;

			await SecureStore.setItemAsync('token', responseData.data.token);

			setAuthState({
				token: responseData.data.token,
				authenticated: true
			});

			return response.data;
		} catch (e) {
			console.warn(e);
		}

		axios.defaults.headers.common['Authorization'] = `Bearer ${authState.token}`;
	}

	async function signup(username: string, email: string, name: string, password: string) {
		try {
			const response = await axios.post(`${BACKEND_API_URL}/auth/register`, {
				username,
				email,
				name,
				password
			});

			const { token } = response.data;

			await SecureStore.setItemAsync('token', token);

			setAuthState({
				token: token,
				authenticated: true
			});

			return response.data;
		} catch (e) {
			console.warn(e);
		}
	}

	async function logout() {
		await SecureStore.deleteItemAsync('token');

		axios.defaults.headers.common['Authorization'] = '';

		setAuthState({
			token: null,
			authenticated: false
		});
	}

	const value = {
		authState,
		onSignup: signup,
		onLogin: login,
		onLogout: logout,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	)
}