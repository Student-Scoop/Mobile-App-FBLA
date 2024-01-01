import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/Input";

export default function SearchScreen() {
	const [search, setSearch] = useState<string>('');

	return (
		<SafeAreaView style={styles.searchContainer}>
			<View>
				<Input placeholder="Search" value={search} onChangeText={(text) => setSearch(text)} />
			</View>

			{/*{search.length === 0 && (
				<View style={styles.enterSearchContainer}>
					<Text>Suggested Users</Text>
				</View>
			)}*/}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	searchContainer: {
		flex: 1,
		margin: 14,
	},
	enterSearchContainer: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: "100%"
	}
});