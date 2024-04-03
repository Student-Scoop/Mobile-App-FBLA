import React from 'react';
import { User } from '../../types/user';
import { safe } from '../../util/errors';
import { colors } from '../../util/ui/color';
import useUserStore from '../../store/user';
import Toast from 'react-native-simple-toast';
import * as SecureStore from 'expo-secure-store';
import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import {
	useForm,
	FormProvider,
	SubmitHandler,
	SubmitErrorHandler
} from 'react-hook-form';

import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextLinearGradient from '../../components/TextGradient';

import { AxiosError } from 'axios';
import { client, DefaultResponse } from '../../api/';
import { type SignupPayload, signup } from '../../api/auth';

export default function SignupScreen() {
	const userState = useUserStore();
	const navigation = useNavigation<any>();
	const { ...methods } = useForm<SignupPayload>();
	const { mutateAsync: doSignup } = useMutation<
		DefaultResponse<User>,
		AxiosError,
		SignupPayload
	>({
		mutationFn: signup,
		mutationKey: ['auth/signup'],
		onSuccess: async (response) => {
			client.defaults.headers.common['Authorization'] =
				`Bearer ${response.data?.token}`;

			await SecureStore.setItemAsync('token', response?.data?.token as string);

			userState.toggleAuthenticated();
			userState.setUser(response.data);
		},
		onError: (error) => {
			console.log('Signup error:', error);
			Toast.show('Could not signup', Toast.SHORT);
		}
	});

	const onSubmit: SubmitHandler<SignupPayload> = (data: SignupPayload) =>
		doSignup({
			username: data.username,
			email: data.email,
			name: data.name,
			password: data.password
		});

	const onError: SubmitErrorHandler<SignupPayload> = (errors, _) => {
		Toast.show(
			errors.username?.message || errors.password?.message || 'Unknown error',
			Toast.SHORT
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.introContainer}>
				<Text style={styles.signUpHeading}>
					<TextLinearGradient
						style={styles.signUpHeading}
						colors={colors.gradient}>
						Create
					</TextLinearGradient>
					Account
				</Text>
				<Image
					style={styles.signupTanCharacter}
					source={require('../../assets/images/characters/tan.png')}
				/>
			</View>

			<View style={styles.signupFormContainer}>
				<FormProvider {...methods}>
					<FormInput
						name="username"
						placeholder="Username"
						icon="at"
						rules={{ required: 'Username is required!' }}
					/>
					<FormInput
						name="email"
						placeholder="Email"
						icon="mail"
						rules={{ required: 'Email is required!' }}
					/>
					<FormInput
						name="name"
						placeholder="Name"
						icon="user"
						rules={{ required: 'Name is required!' }}
					/>
					<FormInput
						name="password"
						placeholder="Password"
						icon="padlock"
						secureTextEntry
						rules={{ required: 'Password is required!' }}
					/>
				</FormProvider>
				<Text style={styles.agreementText}>
					By signing up, you agree to our Terms of Service and Privacy Policy.
				</Text>
				<Button
					title="Sign Up"
					type="primary"
					fullWidth={true}
					onPress={methods.handleSubmit(onSubmit, onError)}
				/>
			</View>
			<View style={styles.haveAccountContainer}>
				<Text style={styles.haveAccountText}>Already have an account?</Text>
				<Pressable onPress={() => navigation.navigate('Login')}>
					<Text style={styles.haveAccountTextHighlighted}>Login</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		alignItems: 'center',
		margin: 24,
		height: '100%'
	},
	introContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100%',
		height: '30%',
		gap: 5
	},
	introTextContainer: {
		flexDirection: 'column'
	},
	signUpHeading: {
		fontFamily: 'euclid-bold',
		fontSize: 64,
		textAlign: 'left',
		color: colors.primaryTextColor
	},
	signupFormContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%'
	},
	signupTanCharacter: {
		position: 'absolute',
		right: -120,
		bottom: -150,
		zIndex: -1,
		transform: [{ rotate: '-10deg' }, { scaleX: -1 }]
	},
	agreementText: {
		fontFamily: 'euclid-regular',
		fontSize: 14,
		marginBottom: 15,
		marginHorizontal: 10,
		textAlign: 'center',
		color: colors.secondaryTextColor
	},
	haveAccountContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		marginTop: 20,
		gap: 5
	},
	haveAccountText: {
		fontFamily: 'euclid-regular',
		fontSize: 14,
		color: colors.secondaryTextColor
	},
	haveAccountTextHighlighted: {
		fontFamily: 'euclid-medium',
		fontSize: 14,
		color: colors.green
	}
});
