import { Text, Image, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
	return (
		<SafeAreaView style={styles.profileContainer}>
			<View style={styles.profileHeaderContainer}>
				<Image style={styles.profileAvatar} source={{
					uri: "https://avatars.githubusercontent.com/u/107738730?v=4"
				}} />
				<View style={
					styles.profileIntroduction
				}>
					<Text style={styles.profileName}>Bryan Lawless</Text>
					<Text style={styles.profileUsername}>@lawless.bryan</Text>
					<Text style={styles.profileUsername}>Joined 1/1/2024</Text>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	profileContainer: {
		flex: 1,
		margin: 14,
	},
	profileHeaderContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	profileAvatar: {
		width: 124,
		height: 124,
		borderRadius: 100,
		borderColor: "#4ade80",
		borderWidth: 2,
	},
	profileIntroduction: {
		flexDirection: "column",
		justifyContent: "center",
		gap: 2,
	},
	profileName: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#000",
		fontFamily: "poppins-bold",
	},
	profileUsername: {
		fontSize: 14,
		color: "#d6d6d6",
		fontFamily: "poppins-regular",
	}
});