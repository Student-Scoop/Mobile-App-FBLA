import { Text, StyleSheet } from "react-native";
import ComingSoon from "../components/ComingSoon";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MessagingScreen() {
	return (
		<SafeAreaView style={styles.messagingContainer}>
			<ComingSoon />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	messagingContainer: {
		flex: 1,
		margin: 24,
	}
});