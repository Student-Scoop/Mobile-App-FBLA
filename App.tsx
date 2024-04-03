import 'react-native-gesture-handler';
import useUserStore from './src/store/user';

import * as Font from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';

import APIProvider from './src/api/common/provider';
import Navigator from './src/navigation/Navigator';
import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
	GoogleSignin,
	ConfigureParams
} from '@react-native-google-signin/google-signin';
import { client } from './src/api';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false
	})
});

GoogleSignin.configure({
	scopes: ['profile', 'email'],
	webClientId:
		'294317333146-31btmvp1ltu2pl9jm3lg6gtn9uk0dp3c.apps.googleusercontent.com',
	androidClientId:
		'294317333146-e1t6m7g4vhal2q5ak56cbovd18c0fuah.apps.googleusercontent.com'
} as ConfigureParams);

SplashScreen.preventAutoHideAsync();

export default function App() {
	const userState = useUserStore();
	const [appIsReady, setAppIsReady] = useState(false);

	useEffect(() => {
		async function loadToken() {
			const token = await SecureStore.getItemAsync('token');
			if (token) {
				userState.toggleAuthenticated();
				client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			}
		}

		loadToken();
	}, []);

	useEffect(() => {
		async function prepare() {
			try {
				await Font.loadAsync({
					'euclid-bold-italic': require('./src/assets/fonts/euclid-bold-italic.ttf'),
					'euclid-bold': require('./src/assets/fonts/euclid-bold.ttf'),
					'euclid-italic': require('./src/assets/fonts/euclid-italic.ttf'),
					'euclid-light-italic': require('./src/assets/fonts/euclid-light-italic.ttf'),
					'euclid-light': require('./src/assets/fonts/euclid-light.ttf'),
					'euclid-medium-italic': require('./src/assets/fonts/euclid-medium-italic.ttf'),
					'euclid-medium': require('./src/assets/fonts/euclid-medium.ttf'),
					'euclid-regular': require('./src/assets/fonts/euclid-regular.ttf'),
					'euclid-semibold-italic': require('./src/assets/fonts/euclid-semibold-italic.ttf'),
					'euclid-semibold': require('./src/assets/fonts/euclid-semibold.ttf'),
					'caveat-regular': require('./src/assets/fonts/caveat-regular.ttf'),
					'caveat-bold': require('./src/assets/fonts/caveat-bold.ttf')
				});
			} catch (e) {
				console.warn(e);
			} finally {
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) await SplashScreen.hideAsync();
	}, [appIsReady]);

	if (!appIsReady) return null;

	return (
		<APIProvider>
			<SafeAreaProvider onLayout={onLayoutRootView}>
				<Navigator />
			</SafeAreaProvider>
		</APIProvider>
	);
}
