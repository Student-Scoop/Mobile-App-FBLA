import { NavigationContainer } from "@react-navigation/native";

import MainNavigator from "./Main";
import AuthNavigator from "./Auth";

import { useAuth } from "../context/AuthContext";

export default function Navigator() {
	const { authState } = useAuth();

	return (
		<NavigationContainer>
			{authState?.authenticated && <MainNavigator />}
			{!authState?.authenticated && <AuthNavigator />}
		</NavigationContainer>
	);
}