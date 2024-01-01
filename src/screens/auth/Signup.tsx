import React, { useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignupScreen() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');


	return (
		<SafeAreaView>
			<ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container}>
				<View style={styles.introContainer} >
					<Image style={styles.logo} source={require('../../assets/images/logo-transparent.png')} />
					<Text style={styles.brandHeader}>Student Scoop</Text>
					<Text style={styles.tagline}>Create account and get started</Text>
				</View>

				<View style={styles.loginFormContainer}>
					<Input placeholder="Username" value={username} onChangeText={setUsername} />
					<Input placeholder="Name" value={name} onChangeText={setName} />
					<Input placeholder="Email" value={email} onChangeText={setEmail} />
					<Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} />

					<Button title="Create Account" type="primary" onPress={() => { console.log("Handle Login") }} />
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
		margin: 14,
		height: "100%",
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