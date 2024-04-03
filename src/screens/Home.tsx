import Logo from '../components/Logo';
import { colors } from '../util/ui/color';
import Avatar from '../components/Avatar';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';

import useUserStore from '../store/user';

export default function HomeScreen() {
	const userState = useUserStore();
	const navigation = useNavigation<any>();

	return (
		<SafeAreaView style={styles.homeContainer}>
			<View style={styles.topContainer}>
				<Logo size={52} />
				<Pressable onPress={() => navigation.navigate('Profile')}>
					<Avatar size={54} avatar={userState?.user?.avatar} />
				</Pressable>
			</View>
			<View style={styles.betaNoticeContainer}>
				<View style={styles.betaNoticeTopContainer}>
					<Text style={styles.betaNoticeTitle}>
						Welcome, {userState?.user?.username}!
					</Text>
					<Text style={styles.betaNoticeDescription}>
						Student Scoop is in early beta stages and things may change
						unexpectedly without notice. Check back regularly for exciting new
						features!
					</Text>
				</View>
				<View style={styles.betaNoticeBottomContainer}>
					<Image
						style={styles.betaNoticePinkCharacter}
						source={require('../assets/images/characters/pink.png')}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	homeContainer: {
		position: 'relative',
		margin: 24,
		flexDirection: 'column'
	},
	topContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 20
	},
	greeting: {
		fontFamily: 'euclid-regular',
		fontSize: 16,
		letterSpacing: 0.2,
		color: colors.secondaryTextColor
	},
	boldGreeting: {
		fontFamily: 'euclid-medium',
		color: colors.primaryTextColor
	},
	logo: {
		width: 24,
		height: 24
	},
	betaNoticeContainer: {
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		borderColor: '#f7f7f7',
		borderWidth: 2,
		marginTop: 24,
		borderRadius: 24,
		height: 400,
		backgroundColor: colors.paleGreen
	},
	betaNoticeTopContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
		height: '55%'
	},
	betaNoticeBottomContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		gap: 10,
		height: '45%',
		width: '100%',
		overflow: 'hidden'
	},
	betaNoticeTitle: {
		fontFamily: 'euclid-bold',
		fontSize: 24,
		color: colors.primaryTextColor
	},
	betaNoticeDescription: {
		fontFamily: 'euclid-regular',
		fontSize: 16,
		textAlign: 'center',
		marginHorizontal: 20,
		color: colors.secondaryTextColor
	},
	betaNoticePinkCharacter: {
		zIndex: 1,
		bottom: -150,
		position: 'absolute'
	}
});
