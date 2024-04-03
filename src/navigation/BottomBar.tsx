import { colors } from '../util/ui/color';
import * as Haptics from 'expo-haptics';
import NavigationIcon from './NavigationIcon';
import { View, Pressable, StyleSheet, Text } from 'react-native';

const BottomBar = ({ state, descriptors, navigation }: any) => {
	function getMainColor(route: string): string {
		switch (route) {
			case 'Home':
				return colors.bottomBarHomeIconActivePrimary;
			case 'Search':
				return colors.bottomBarSearchIconActivePrimary;
			case 'Profile':
				return colors.bottomBarProfileIconActivePrimary;
			case 'Feed':
				return colors.bottomBarFeedIconActivePrimary;
			default:
				return colors.bottomBarHomeIconActivePrimary;
		}
	}

	return (
		<View style={styles.mainContainer}>
			{state.routes.map((route: any, index: number) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
							? options.title
							: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key
					});

					Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

					if (!isFocused && !event.defaultPrevented)
						navigation.navigate(route.name);
				};

				return (
					<View key={index} style={styles.mainItemContainer}>
						<Pressable onPress={onPress}>
							<View style={styles.iconHolder}>
								<NavigationIcon route={label} isFocused={isFocused} />
								<Text
									style={{
										color: isFocused ? getMainColor(label) : '#928e95',
										...styles.iconLabel
									}}>
									{label}
								</Text>
							</View>
						</Pressable>
					</View>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flexDirection: 'row',
		position: 'absolute',
		bottom: 0,
		backgroundColor: colors.bottomBarBackground,
		borderTopWidth: 1,
		borderTopColor: '#f7f7f7',
		paddingVertical: 10
	},
	mainItemContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 10
	},
	iconHolder: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 5
	},
	iconLabel: {
		fontFamily: 'euclid-semibold',
		fontSize: 12
	}
});

export default BottomBar;
