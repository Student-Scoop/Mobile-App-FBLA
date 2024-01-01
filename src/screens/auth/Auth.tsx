import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

export default function AuthScreen() {
	const navigation = useNavigation<any>();

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.introContainer} >
				<Image style={styles.logo} source={require('../../assets/images/logo-transparent.png')} />
				<Text style={styles.brandHeader}>Student Scoop</Text>
				<Text style={styles.tagline}>Showcase & improve your academics</Text>
			</View>

			<View style={styles.buttonContainer}>
				<Button title="Get Started" type="primary" onPress={() => navigation.navigate('Signup')} />
				<Button title="I already have an account" type="dark" onPress={() => navigation.navigate('Login')} />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: "100%",
		padding: 24,
	},
	introContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonContainer: {
		gap: 16,
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-end'
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
		textAlign: 'center',
	}
});