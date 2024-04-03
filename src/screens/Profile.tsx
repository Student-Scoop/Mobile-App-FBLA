import axios from 'axios';
import { User } from '../types/user';
import SvgIcon from '../assets/Icons';
import { colors } from '../util/ui/color';
import useUserStore from '../store/user';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, StyleSheet, Pressable, Share } from 'react-native';

export default function ProfileScreen() {
	const userState = useUserStore();
	const navigation = useNavigation<any>();

	console.log(userState.user);

	function shareProfile() {
		const profileUrl = `https://studentscoop.io/user/${userState?.user?.username}`;

		Share.share({
			message: `👀 Check out my Student portfolio!\n${profileUrl}`,
			url: profileUrl
		});
	}

	function hasPortfolio(): boolean {
		const portfolioKeys = [
			'schoolName',
			'schoolLocation',
			'graduationYear',
			'degree',
			'major',
			'clubs',
			'sports'
		];

		for (let key of portfolioKeys) {
			if (
				userState.user[key as keyof User] === null ||
				userState.user[key as keyof User] === ''
			)
				return false;
		}

		return true;
	}

	async function logout() {
		await SecureStore.deleteItemAsync('token');

		axios.defaults.headers.common['Authorization'] = '';

		userState.toggleAuthenticated();
		userState.removeUser();
	}

	return (
		<SafeAreaView style={styles.profileContainer}>
			<View style={styles.profileHeaderContainer}>
				<View style={styles.profileHeaderWrapper}>
					<Avatar size={84} avatar={userState?.user?.avatar} />
					<View style={styles.profileIntroduction}>
						<Text style={styles.profileName}>{userState?.user?.name}</Text>
						<Text style={styles.profileUsername}>
							@{userState?.user?.username}
						</Text>
						<View style={styles.profileFollowStats}>
							<Text>Following: {userState?.user?.following}</Text>
							<Text>Followers: {userState?.user?.followers}</Text>
						</View>
					</View>
				</View>
				<View style={styles.profileControlsContainer}>
					<Button title="Share" type="primary" onPress={shareProfile} />
					<Button
						title="Edit Profile"
						type="dark"
						onPress={() => navigation.navigate('EditProfile')}
					/>
				</View>
			</View>
			<View style={styles.portfolioContainer}>
				<View style={styles.portfolioHeadingContainer}>
					<Text style={styles.portfolioTitle}>Academics</Text>
					<Pressable onPress={() => navigation.navigate('EditPortfolio')}>
						<SvgIcon label="pencil" size={24} />
					</Pressable>
				</View>
				<View style={styles.portfolioSeperator} />
				<View style={styles.portfolioStatsContainer}>
					{userState?.user?.schoolName && (
						<Text style={styles.portfolioStatTitle}>
							School:{' '}
							<Text style={styles.portfolioStat}>
								{userState?.user?.schoolName}
							</Text>
						</Text>
					)}

					{userState?.user?.schoolLocation && (
						<Text style={styles.portfolioStatTitle}>
							School Location:{' '}
							<Text style={styles.portfolioStat}>
								{userState?.user?.schoolLocation}
							</Text>
						</Text>
					)}

					{userState?.user?.graduationYear && (
						<Text style={styles.portfolioStatTitle}>
							Graduation Year:{' '}
							<Text style={styles.portfolioStat}>
								{userState?.user?.graduationYear}
							</Text>
						</Text>
					)}

					{userState?.user?.degree && (
						<Text style={styles.portfolioStatTitle}>
							Degree Goal:{' '}
							<Text style={styles.portfolioStat}>
								{userState?.user?.degree}
							</Text>
						</Text>
					)}

					{userState?.user?.major && (
						<Text style={styles.portfolioStatTitle}>
							Major:{' '}
							<Text style={styles.portfolioStat}>{userState?.user?.major}</Text>
						</Text>
					)}

					{userState?.user?.clubs && (
						<Text style={styles.portfolioStatTitle}>
							Clubs:{' '}
							<Text style={styles.portfolioStat}>{userState?.user?.clubs}</Text>
						</Text>
					)}

					{userState?.user?.sports && (
						<Text style={styles.portfolioStatTitle}>
							Sports:{' '}
							<Text style={styles.portfolioStat}>
								{userState?.user?.sports}
							</Text>
						</Text>
					)}

					{!hasPortfolio() && (
						<Text style={styles.portfolioStatTitle}>No portfolio yet.</Text>
					)}
				</View>
			</View>
			<Button type="dark" title="Logout" onPress={logout} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	profileContainer: {
		position: 'relative',
		margin: 24,
		gap: 20,
		flexDirection: 'column'
	},
	profileHeaderContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		gap: 20,
		paddingTop: 20
	},
	profileHeaderWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 20
	},
	profileControlsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		gap: 10
	},
	profileIntroduction: {
		flexDirection: 'column',
		justifyContent: 'center',
		gap: 2
	},
	profileName: {
		fontSize: 28,
		color: colors.primaryTextColor,
		fontFamily: 'euclid-bold'
	},
	profileUsername: {
		fontSize: 14,
		color: colors.secondaryTextColor,
		fontFamily: 'euclid-semibold'
	},
	profileFollowStats: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		gap: 8
	},
	portfolioContainer: {
		borderColor: '#f7f7f7',
		borderWidth: 2,
		borderRadius: 24,
		padding: 20
	},
	portfolioHeadingContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	portfolioTitle: {
		fontSize: 18,
		color: colors.secondaryTextColor,
		fontFamily: 'euclid-bold'
	},
	portfolioSeperator: {
		width: '100%',
		borderWidth: 1,
		marginVertical: 15,
		borderColor: '#f7f7f7'
	},
	portfolioStatsContainer: {
		flexDirection: 'column',
		gap: 10
	},
	portfolioStatTitle: {
		fontSize: 14,
		color: colors.secondaryTextColor,
		fontFamily: 'euclid-bold'
	},
	portfolioStat: {
		fontSize: 14,
		color: colors.secondaryTextColor,
		fontFamily: 'euclid-regular'
	}
});
