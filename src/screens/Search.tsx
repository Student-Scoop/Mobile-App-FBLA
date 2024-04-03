import Avatar from '../components/Avatar';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import PlainTextInput from '../components/PlainTextInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { type SearchResponse, search } from '../api/relationship';

export default function SearchScreen() {
	const navigation = useNavigation<any>();
	const [users, setUsers] = useState<SearchResponse[]>([]);
	const [searchInput, setSearchInput] = useState<string>('');

	const { data: searchResponse, isSuccess: isSearchSuccess } = useQuery({
		queryKey: ['relationship/query', searchInput],
		queryFn: () => search(searchInput),
		enabled: Boolean(searchInput)
	});

	useEffect(() => {
		if (isSearchSuccess) setUsers(searchResponse.data);
	}, [searchResponse]);

	return (
		<SafeAreaView style={styles.searchContainer}>
			<View>
				<PlainTextInput
					placeholder="Search for users"
					value={searchInput}
					onChangeText={(e) => setSearchInput(e)}
				/>
			</View>

			{users ? (
				<ScrollView contentContainerStyle={styles.enterSearchContainer}>
					{users.map((user: SearchResponse, id) => (
						<Pressable
							style={styles.searchResult}
							onPress={() =>
								navigation.navigate('ViewProfile', { userId: user.userId })
							}
							key={id}>
							<Avatar size={48} avatar={user!.avatar} />
							<View style={styles.userSearchInfo}>
								<Text style={styles.userSearchInfoName}>{user!.name}</Text>
								<Text style={styles.userSearchInfoUsername}>
									{user!.username}
								</Text>
							</View>
						</Pressable>
					))}
				</ScrollView>
			) : (
				<View style={styles.enterSearchContainer}>
					<Text>Enter a search term to find users!</Text>
				</View>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	searchContainer: {
		flex: 1,
		margin: 14
	},
	enterSearchContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height: '100%'
	},
	searchResult: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		backgroundColor: '#fff',
		padding: 10,
		margin: 10,
		gap: 20
	},
	userSearchInfo: {
		flexDirection: 'column',
		justifyContent: 'center'
	},
	userSearchInfoName: {
		fontSize: 18,
		color: '#000',
		fontFamily: 'euclid-bold'
	},
	userSearchInfoUsername: {
		fontSize: 14,
		color: '#6b7280',
		fontFamily: 'euclid-regular'
	}
});
