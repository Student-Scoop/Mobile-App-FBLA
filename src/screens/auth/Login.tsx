import React from 'react';
import { User } from '../../types/user';
import { safe } from '../../util/errors';
import { colors } from '../../util/ui/color';
import useUserStore from '../../store/user';
import Toast from 'react-native-simple-toast';
import * as SecureStore from 'expo-secure-store';
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import {
	useForm,
	FormProvider,
	SubmitHandler,
	SubmitErrorHandler
} from 'react-hook-form';

import {
	GoogleSignin,
	statusCodes,
	User as GoogleUser
} from '@react-native-google-signin/google-signin';

import Logos from '../../assets/svg/Logos';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextLinearGradient from '../../components/TextGradient';

import { AxiosError } from 'axios';
import { client, DefaultResponse } from '../../api/';
import { type LoginPayload, login, loginGoogle } from '../../api/auth';

export default function LoginScreen() {
	const userState = useUserStore();
	const navigation = useNavigation<any>();
	const { ...methods } = useForm<LoginPayload>();

	const { mutateAsync: doLogin } = useMutation<
		DefaultResponse<User>,
		AxiosError,
		LoginPayload
	>({
		mutationFn: login,
		mutationKey: ['auth/login'],
		onSuccess: async (response) => {
			client.defaults.headers.common['Authorization'] =
				`Bearer ${response.data?.token}`;

			await SecureStore.setItemAsync('token', response?.data?.token as string);

			userState.toggleAuthenticated();
			userState.setUser(response.data);
		},
		onError: (error) => {
			console.log('Login error:', error);
			Toast.show('Could not log in', Toast.SHORT);
		}
	});

	const { mutateAsync: doGoogleLogin } = useMutation<
		DefaultResponse<User>,
		AxiosError,
		string
	>({
		mutationFn: loginGoogle,
		mutationKey: ['auth/google'],
		onSuccess: async (response) => {
			client.defaults.headers.common['Authorization'] =
				`Bearer ${response.data?.token}`;

			await SecureStore.setItemAsync('token', response?.data?.token as string);

			userState.toggleAuthenticated();
			userState.setUser(response.data);
		},
		onError: (error) => {
			console.log('Google log in error:', error);
			Toast.show('Could not log in with Google', Toast.SHORT);
		}
	});

	const onSubmit: SubmitHandler<LoginPayload> = (data: LoginPayload) =>
		doLogin({ email: data.email, password: data.password });

	const onError: SubmitErrorHandler<LoginPayload> = (errors, _) => {
		Toast.show(
			errors.email?.message || errors.password?.message || 'Unknown error',
			Toast.SHORT
		);
	};

	async function loginWithGoogle() {
		await GoogleSignin.hasPlayServices();
		const googleUserInfo = await safe(GoogleSignin.signIn());
		if (googleUserInfo.error) {
			switch (googleUserInfo.error) {
				case statusCodes.SIGN_IN_CANCELLED:
					return Toast.show('Login Cancelled', Toast.SHORT);
				case statusCodes.IN_PROGRESS:
					return Toast.show('Google log in already in progress', Toast.SHORT);
				case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
					return Toast.show('Play service not available', Toast.SHORT);
				default:
					console.log(JSON.stringify(googleUserInfo.error));
					return Toast.show(
						'Unexpected error when logging in with Google',
						Toast.SHORT
					);
			}
		}

		const userInfo = googleUserInfo.data as GoogleUser;

		await doGoogleLogin(userInfo.idToken as string);
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.introContainer}>
				<Text style={styles.loginHeading}>
					<TextLinearGradient
						style={styles.loginHeading}
						colors={colors.gradient}>
						Welcome
					</TextLinearGradient>
					back!
				</Text>
				<Image
					style={styles.loginGreenCharacter}
					source={require('../../assets/images/characters/green.png')}
				/>
			</View>

			<View style={styles.loginFormContainer}>
				<FormProvider {...methods}>
					<FormInput
						name="email"
						label="email"
						placeholder="Email"
						icon="mail"
						rules={{ required: 'Email is required!' }}
					/>
					<FormInput
						name="password"
						label="Password"
						placeholder="Password"
						icon="padlock"
						secureTextEntry
						rules={{ required: 'Password is required!' }}
					/>
				</FormProvider>
				<Button
					title="Log In"
					type="primary"
					fullWidth={true}
					onPress={methods.handleSubmit(onSubmit, onError)}
				/>
			</View>

			<View style={styles.loginAlternateContainer}>
				<Text style={styles.loginAlternateText}>or</Text>
				<View style={styles.loginAlternateOptions}>
					<Pressable
						style={styles.loginAlternateGoogleButton}
						onPress={loginWithGoogle}>
						<View style={styles.loginAlternateGoogleButtonContent}>
							<Logos name="google" />
							<Text style={styles.loginAlternateGoogleButtonText}>
								Sign in with Google
							</Text>
						</View>
					</Pressable>
				</View>
			</View>

			<View style={styles.dontHaveAccountContainer}>
				<Text style={styles.dontHaveAccountText}>Dont have an account?</Text>

				<Pressable onPress={() => navigation.navigate('Signup')}>
					<Text style={styles.dontHaveAccountTextHighlighted}>Create One!</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		alignItems: 'center',
		height: '100%',
		position: 'relative',
		margin: 24
	},
	introContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100%',
		height: '40%',
		gap: 5
	},
	loginHeading: {
		fontFamily: 'euclid-bold',
		fontSize: 64,
		color: colors.primaryTextColor
	},
	loginFormContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
		width: '100%'
	},
	loginControls: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		gap: 10
	},
	loginAlternateContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		marginTop: 20,
		gap: 20
	},
	loginAlternateText: {
		fontFamily: 'euclid-regular',
		fontSize: 14,
		color: colors.secondaryTextColor
	},
	loginAlternateOptions: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		gap: 10
	},
	loginAlternateGoogleButton: {
		backgroundColor: '#fff',
		paddingVertical: 12,
		paddingHorizontal: 28,
		borderWidth: 2,
		borderColor: '#f7f7f7',
		borderRadius: 64
	},
	loginAlternateGoogleButtonContent: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10
	},
	loginAlternateGoogleButtonIcon: {
		width: 20,
		height: 20
	},
	loginAlternateGoogleButtonText: {
		fontFamily: 'euclid-medium',
		fontSize: 14,
		color: '#1F1F1F'
	},
	loginGreenCharacter: {
		position: 'absolute',
		right: -170,
		bottom: -150,
		transform: [{ rotate: '-25deg' }]
	},
	dontHaveAccountContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		marginTop: 20,
		gap: 5
	},
	dontHaveAccountText: {
		fontFamily: 'euclid-regular',
		fontSize: 14,
		color: colors.secondaryTextColor
	},
	dontHaveAccountTextHighlighted: {
		fontFamily: 'euclid-medium',
		fontSize: 14,
		color: colors.green
	}
});
