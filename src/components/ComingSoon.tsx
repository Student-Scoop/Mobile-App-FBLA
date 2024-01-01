import { View, Text, StyleSheet, Image } from "react-native";

export default function ComingSoon() {
	return (
		<View style={styles.comingSoonContainer}>
			<View style={styles.comingSoonWrapper}>
				<Image style={styles.comingSoonGraphic} source={require("../assets/images/3d/tools.png")} />
				<View>
					<Text style={styles.comingSoonTitle}>Coming Soon</Text>
					<Text style={styles.comingSoonDescription}>This feature is currently being worked on! Check back later!</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	comingSoonContainer: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
	},
	comingSoonWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 40,
		borderRadius: 14,
		margin: 16,
		gap: 20,
		backgroundColor: "#4ade80"
	},
	comingSoonGraphic: {
		width: 64,
		height: 64,
		resizeMode: "contain",
		backgroundColor: "#86efac",
		borderRadius: 14,
		padding: 40,
	},
	comingSoonTitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#fff",
		fontFamily: "poppins-bold",
	},
	comingSoonDescription: {
		fontSize: 14,
		color: "#fff",
		fontFamily: "poppins-regular",
	}
});
