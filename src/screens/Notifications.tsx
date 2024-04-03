import useUserStore from '../store/user';
import { colors } from '../util/ui/color';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationScreen() {
	const userState = useUserStore();

	return (
		<SafeAreaView style={styles.feedContainer}>
			<View style={styles.notificationContainer}>
				<Text style={styles.notificationTitle}>Welcome to your feed!</Text>
				<Text style={styles.notificationTime}>
					{new Date(userState.user.createdAt).toDateString()}
				</Text>
				<Text style={styles.notifificationDescription}>
					This is your personalized feed. Here you can view all of your
					notifications, plus scholarship opportunities and educational
					resources.{' '}
				</Text>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	feedContainer: {
		margin: 24,
		position: 'relative',
		flexDirection: 'column',
		gap: 10,
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	notificationContainer: {
		flexDirection: 'column',
		backgroundColor: '#fff',
		padding: 20,
		borderColor: '#f7f7f7',
		borderWidth: 2,
		gap: 10,
		width: '100%',
		borderRadius: 24
	},
	notificationTitle: {
		fontFamily: 'euclid-bold',
		fontSize: 16
	},
	notificationTime: {
		fontFamily: 'euclid-italic',
		fontSize: 12,
		color: colors.secondaryTextColor
	},
	notifificationDescription: {
		fontFamily: 'euclid-regular',
		fontSize: 14,
		color: colors.primaryTextColor
	}
});
