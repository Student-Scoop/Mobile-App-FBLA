import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const items = [
	{
		id: 2,
		avatar: 'https://pbs.twimg.com/profile_images/1455707950341890051/flRfKMOq_400x400.jpg',
		user: 'Nacho'
	},
	{
		id: 3,
		avatar: 'https://pbs.twimg.com/profile_images/557940120184041473/bFyXy8Pu_400x400.jpeg',
		user: 'Rich'
	},
	{
		id: 4,
		avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
		user: 'Taylor'
	},
	{
		id: 5,
		avatar: 'https://pbs.twimg.com/profile_images/1262107495037796359/N_HoUfGz_400x400.jpg',
		user: 'Galen'
	},
	{
		id: 6,
		avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
		user: 'Scott'
	},
	{
		id: 7,
		avatar: 'https://pbs.twimg.com/profile_images/1266007237874647044/-JqTQ_14_400x400.jpg',
		user: 'Ildiko'
	},
	{
		id: 8,
		avatar: 'https://pbs.twimg.com/profile_images/1323356199945859072/oJM0cDPb_400x400.png',
		user: 'Joel'
	},
	{
		id: 9,
		avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
		user: 'Emir'
	},
	{
		id: 10,
		avatar: 'https://pbs.twimg.com/profile_images/958997253892419586/Jb6NPqEa_400x400.jpg',
		user: 'Selman'
	}
]

export default function SuggestedUsers() {
	return (
		<View style={styles.container}>
			<View style={styles.suggestedTopContainer}>
				<Text style={styles.suggestedTitle}>Suggested for you</Text>
				<Text style={{ color: "#4ade80", fontWeight: 'bold' }}>View All</Text>
			</View>

			<ScrollView
				showsHorizontalScrollIndicator={false}
				horizontal={true}
			>
				{items.map((item, key) => (
					<View key={key} style={styles.story}>
						<LinearGradient
							colors={['#f19bff', '#66d3cc', '#6df895']}
							style={styles.avatarParent}
						>
							<Image
								style={styles.avatar}
								source={{
									uri: item.avatar
								}}
							/>
						</LinearGradient>
					</View>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingLeft: 0,
		paddingRight: 0,
	},
	suggestedTopContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 15,
	},
	suggestedTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		fontFamily: 'poppins-bold',
		textAlign: "center",
	},
	story: {
		width: 68,
		marginRight: 45,
		position: 'relative'
	},
	avatarParent: {
		width: 98,
		height: 98,
		borderRadius: 64,
		padding: 2,
	},
	avatar: {
		width: 94,
		height: 94,
		borderWidth: 2,
		borderColor: '#fff',
		borderRadius: 64
	}
});