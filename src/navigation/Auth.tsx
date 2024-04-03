import { createStackNavigator } from '@react-navigation/stack';

import AuthScreen from '../screens/auth/Auth';
import LoginScreen from '../screens/auth/Login';
import SignupScreen from '../screens/auth/Signup';

const Stack = createStackNavigator();

export default function AuthNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="/">
			<Stack.Screen name="/" component={AuthScreen} />
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Signup" component={SignupScreen} />
		</Stack.Navigator>
	);
}
