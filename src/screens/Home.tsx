import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bell, Calendar } from "lucide-react-native";

import SuggestedUsers from "../components/home/SuggestedUsers";
import ChallengeBox from "../components/home/ChallengeBox";

export default function HomeScreen() {
	return (
		<SafeAreaView style={styles.homeContainer}>
			<View style={styles.topContainer}>
				<View>
					<Image source={{
						uri: "https://avatars.githubusercontent.com/u/107738730?v=4"
					}} style={styles.avatar} />

				</View>

				<View style={styles.rightContainer}>
					<View style={styles.tokens}>
						<Image style={styles.coinGraphic} source={require('../assets/images/vectors/coin.png')} />
						<Text style={styles.tokenText}>12,975</Text>
					</View>
					<Pressable style={styles.notificationButton}>
						<Bell color="#a1a1a1" />
					</Pressable>
				</View>
			</View>

			<ChallengeBox />

			<SuggestedUsers />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	homeContainer: {
		flex: 1,
		gap: 20,
		margin: 14,
		flexDirection: "column",
	},
	topContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	rightContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 10
	},
	avatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
		borderColor: "#4ade80",
		borderWidth: 2,
	},
	coinGraphic: {
		width: 24,
		height: 24,
		resizeMode: 'contain',
	},
	tokens: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 8,
		paddingTop: 12,
		paddingBottom: 12,
		paddingLeft: 14,
		paddingRight: 14,
		borderRadius: 24,
		backgroundColor: "#86efac",
	},
	tokenText: {
		fontSize: 14,
		fontWeight: 'bold',
		fontFamily: 'poppins-bold',
		color: "#dcfce8"
	},
	notificationButton: {
		padding: 12,
		borderRadius: 24,
		backgroundColor: "#fff",
		borderWidth: 2,
		borderColor: "#f7f7f7",
	}
});