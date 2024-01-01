import { View, Text, StyleSheet, Image } from 'react-native';

export default function ChallengeBox() {
	return (
		<View>
			<View style={styles.challengeWrapper}>
				<Image style={styles.challengeGraphic} source={require('../../assets/images/3d/puzzle.png')} />
				<View style={styles.challengeTitleProgressWrapper}>
					<Text style={styles.challengeTitle}>New Challenge!</Text>
					<Text style={styles.challengeDescription}>Complete your profile and be selected to win!</Text>
				</View>
			</View>
			<View style={styles.challengeDetails}>
				<View style={styles.challengeDetail}>
					<Text style={styles.detailText}>Today, 10:20 PM</Text>
				</View>
				<View style={styles.challengeDetail}>
					<Text style={styles.detailText}>500 tokens</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	challengeWrapper: {
		width: "100%",
		backgroundColor: "#4ade80",
		borderRadius: 14,
		paddingLeft: 24,
		paddingRight: 24,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		elevation: 5,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	challengeGraphic: {
		width: 164,
		height: 164,
		resizeMode: 'contain',
	},
	challengeTitleProgressWrapper: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		flexShrink: 1,
	},
	challengeTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		fontFamily: 'poppins-bold',
		color: "#fff",
		textAlign: "center",
	},
	challengeDescription: {
		fontSize: 14,
		fontFamily: 'poppins-regular',
		color: "#fff",
		textAlign: "center",
	},
	challengeDetails: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#f7f7f7",
		marginTop: -14,
		paddingTop: 34,
		paddingBottom: 20,
		padding: 18,
		zIndex: -1,
		borderBottomRightRadius: 14,
		borderBottomLeftRadius: 14,
	},
	challengeDetail: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 6,
	},
	detailText: {
		fontFamily: 'poppins-regular',
		color: "#a1a1a1",
	}
});