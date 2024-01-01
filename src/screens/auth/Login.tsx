import React, { useState } from "react";
import { useAuth } from '../../context/AuthContext';
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
	const { onLogin } = useAuth();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		const result = await onLogin!(username, password);
		if (result) {
			console.log(result)
		}
	};

	return (
		<SafeAreaView>
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.introContainer} >
					<Image style={styles.logo} source={require('../../assets/images/logo-transparent.png')} />
					<Text style={styles.brandHeader}>Student Scoop</Text>
					<Text style={styles.tagline}>Login to your account</Text>
				</View>

				<View style={styles.loginFormContainer}>
					<Input placeholder="Username" value={username} onChangeText={setUsername} />
					<Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} />

					<Button title="Login" type="primary" onPress={() => handleLogin()} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		height: "100%",
		margin: 16
	},
	introContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		width: 150,
		height: 150,
		resizeMode: 'contain',
	},
	brandHeader: {
		fontFamily: 'poppins-bold',
		fontSize: 32,
		color: '#000',
		backgroundColor: 'transparent'
	},
	tagline: {
		fontFamily: 'poppins-regular',
		fontSize: 18,
		color: '#c7c7c7',
	},
	loginFormContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	}
});