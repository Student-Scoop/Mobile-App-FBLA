import BottomBar from './BottomBar';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import SearchScreen from '../screens/Search';
import ProfileScreen from '../screens/Profile';
import NotificationScreen from '../screens/Notifications';

import ViewProfile from '../screens/ViewProfile';
import EditProfile from '../screens/user/EditProfile';
import EditPortfolio from '../screens/user/EditPortfolio';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export function MainNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="General">
			<Stack.Screen name="General" component={BottomNavigator} />
			<Stack.Screen name="ViewProfile" component={ViewProfile} />
			<Stack.Screen name="EditProfile" component={EditProfile} />
			<Stack.Screen name="EditPortfolio" component={EditPortfolio} />
		</Stack.Navigator>
	);
}

export function BottomNavigator() {
	return (
		<Tabs.Navigator
			initialRouteName="Home"
			screenOptions={{ headerShown: false }}
			tabBar={(props) => <BottomBar {...props} />}>
			<Tabs.Screen name="Home" component={HomeScreen} />
			<Tabs.Screen name="Search" component={SearchScreen} />
			<Tabs.Screen name="Profile" component={ProfileScreen} />
			<Tabs.Screen name="Feed" component={NotificationScreen} />
		</Tabs.Navigator>
	);
}
