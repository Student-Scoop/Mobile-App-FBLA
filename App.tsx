
import * as Font from 'expo-font';
import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Navigator from './src/navigation/Navigator';
import AuthProvider from './src/context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import React, {
	useState,
	useEffect,
	useCallback
} from 'react';


SplashScreen.preventAutoHideAsync();

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);

	useEffect(() => {
		async function prepare() {
			try {
				await SplashScreen.preventAutoHideAsync();

				await Font.loadAsync({
					'poppins-regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
					'poppins-bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
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

	if (!appIsReady) {
		return null;
	}

	return (
		<AuthProvider>
			<SafeAreaProvider style={styles.container} onLayout={onLayoutRootView}>
				<Navigator />
			</SafeAreaProvider>
		</AuthProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
});