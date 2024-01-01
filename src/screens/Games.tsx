import { StyleSheet } from "react-native";
import ComingSoon from "../components/ComingSoon";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GamesScreen() {
	return (
		<SafeAreaView style={styles.gameContainer}>
			<ComingSoon />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	gameContainer: {
		flex: 1,
		margin: 24,
	}
});