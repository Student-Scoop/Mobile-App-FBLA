import { colors } from '../../util/ui/color';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextLinearGradient from '../../components/TextGradient';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

export default function AuthScreen() {
	const navigation = useNavigation<any>();

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.topContainer}>
				<View style={{ ...styles.textWrapper, width: '100%' }}>
					<Text style={styles.tagline}>Ready to build an</Text>
					<Text style={{ ...styles.introHeading, fontSize: 50 }}>
						Amazing school
					</Text>
					<View style={{ width: '100%', position: 'absolute', top: 65 }}>
						<TextLinearGradient
							style={{
								fontSize: 70,
								textAlign: 'center',
								fontFamily: 'caveat-bold'
							}}
							colors={colors.gradient}>
							community?
						</TextLinearGradient>
					</View>
				</View>
			</View>
			<View style={styles.bottomContainer}>
				<Image
					style={styles.tanCharacter}
					source={require('../../assets/images/characters/tan-with-cap.png')}
				/>
				<Image
					style={styles.cyanCharacter}
					source={require('../../assets/images/characters/cyan.png')}
				/>
				<Image
					style={styles.blackCharacter}
					source={require('../../assets/images/characters/black.png')}
				/>
				<Image
					style={styles.greenCharacter}
					source={require('../../assets/images/characters/green.png')}
				/>
				<Image
					style={styles.pinkCharacter}
					source={require('../../assets/images/characters/pink.png')}
				/>
				<Pressable
					style={styles.letsGoButton}
					onPress={() => navigation.navigate('Login')}>
					<LinearGradient
						start={[0, 0.5]}
						end={[1, 0.5]}
						colors={colors.gradientReversed}
						style={styles.letsGoButtonGradient}>
						<View style={styles.letsGoButtonInner}>
							<Text style={styles.letsGoButtonText}>Lets Go!</Text>
						</View>
					</LinearGradient>
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
		backgroundColor: colors.paleGreen
	},
	topContainer: {
		width: '100%',
		height: '30%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	bottomContainer: {
		width: '100%',
		height: '70%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	tanCharacter: {
		top: 15,
		left: -30,
		position: 'absolute',
		transform: [{ rotate: '10deg' }]
	},
	cyanCharacter: {
		position: 'absolute',
		transform: [{ rotate: '20deg' }],
		bottom: 50,
		left: 0
	},
	blackCharacter: {
		position: 'absolute',
		top: 75,
		left: 160
	},
	greenCharacter: {
		position: 'absolute',
		bottom: -30,
		right: -10,
		transform: [{ rotate: '-10deg' }]
	},
	pinkCharacter: {
		position: 'absolute',
		bottom: -50,
		left: -50,
		transform: [{ rotate: '1deg' }]
	},
	textWrapper: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	introHeading: {
		fontFamily: 'euclid-bold',
		fontSize: 42,
		color: colors.primaryTextColor,
		textAlign: 'center'
	},
	tagline: {
		fontFamily: 'caveat-bold',
		fontSize: 28,
		color: colors.primaryTextColor,
		textAlign: 'center',
		width: 380
	},
	letsGoButton: {
		borderRadius: 64,
		width: '100%',
		marginVertical: 20,
		paddingHorizontal: 40
	},
	letsGoButtonGradient: {
		borderRadius: 64
	},
	letsGoButtonInner: {
		margin: 3,
		borderRadius: 64,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 26,
		paddingHorizontal: 32,
		elevation: 0.3
	},
	letsGoButtonText: {
		fontSize: 16,
		textAlign: 'center',
		fontFamily: 'euclid-semibold',
		letterSpacing: 0.4,
		color: colors.primaryTextColor
	}
});
