import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";

import HomeScreen from '../screens/Home';
import SearchScreen from '../screens/Search';
import GamesScreen from "../screens/Games";
import MessagingScreen from "../screens/Messaging";
import ProfileScreen from '../screens/Profile';

import { Home, Search, Gamepad2, UserCircle, MessageSquareMore } from 'lucide-react-native';

const Tabs = AnimatedTabBarNavigator();

export default function MainNavigator() {
	return (
		<Tabs.Navigator
			tabBarOptions={{
				activeTintColor: "#a1a1a1",
				activeBackgroundColor: "#e3e3e3",
			}}

			appearance={{
				floating: false,
				shadow: true,
				tabBarBackground: '#f7f7f7',
			}}
		>
			<Tabs.Screen
				name="Home"
				component={HomeScreen}
				options={{ tabBarIcon: () => (<Home color='#a1a1a1' />) }}
			/>
			<Tabs.Screen
				name="Search"
				component={SearchScreen}
				options={{ tabBarIcon: () => (<Search color='#a1a1a1' />) }}
			/>
			<Tabs.Screen
				name="Games"
				component={GamesScreen}
				options={{ tabBarIcon: () => (<Gamepad2 color='#a1a1a1' />) }}
			/>
			<Tabs.Screen
				name="Messages"
				component={MessagingScreen}
				options={{ tabBarIcon: () => (<MessageSquareMore color='#a1a1a1' />) }}
			/>
			<Tabs.Screen
				name="Profile"
				component={ProfileScreen}
				options={{ tabBarIcon: () => (<UserCircle color='#a1a1a1' />) }}
			/>
		</Tabs.Navigator>
	);
}