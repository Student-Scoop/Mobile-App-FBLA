import { useEffect } from 'react';
import AuthNavigator from './Auth';
import { MainNavigator } from './Main';
import { Platform } from 'react-native';
import useUserStore from '../store/user';
import { colors } from '../util/ui/color';
import { PROJECT_ID } from '../constants/config';
import * as Notifications from 'expo-notifications';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { me } from '../api/users';
import { AxiosError } from 'axios';
import { type DefaultResponse } from '../api/';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
	updateNotificationId,
	type UpdateNotificationPayload
} from '../api/users/notifications';

const NavigationTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: colors.backgroundPrimary
	}
};

export default function Navigator() {
	const userState = useUserStore();
	const { isSuccess: meIsSuccess, data: meData } = useQuery({
		queryKey: ['me'],
		queryFn: me,
		enabled: userState.authenticated
	});

	const { mutateAsync: doUpdateNotificationId } = useMutation<
		DefaultResponse<void>,
		AxiosError,
		UpdateNotificationPayload
	>({
		mutationFn: updateNotificationId,
		mutationKey: ['users/@me/update-notification-id']
	});

	useEffect(() => {
		if (userState.authenticated) {
			const subscription = Notifications.addNotificationReceivedListener(
				(notification) =>
					console.log('notification', notification.request.content.data)
			);

			const subscriptionResponse =
				Notifications.addNotificationResponseReceivedListener((response) =>
					console.log('response', response.actionIdentifier)
				);

			Notifications.getNotificationCategoriesAsync().then((e) =>
				console.log(e)
			);

			return () => {
				subscription.remove();
				subscriptionResponse.remove();
			};
		}
	}, []);

	useEffect(() => {
		if (userState.authenticated) {
			async function registerForPushNotificationsAsync() {
				try {
					let token;

					const { status: existingStatus } =
						await Notifications.getPermissionsAsync();

					let finalStatus = existingStatus;
					if (existingStatus !== 'granted') {
						const { status } = await Notifications.requestPermissionsAsync();
						finalStatus = status;
					}

					if (finalStatus !== 'granted')
						alert('Permission for notifications not granted');

					token = await Notifications.getExpoPushTokenAsync({
						projectId: PROJECT_ID
					});

					if (Platform.OS === 'android') {
						Notifications.setNotificationChannelAsync('default', {
							name: 'default',
							importance: Notifications.AndroidImportance.MAX,
							vibrationPattern: [0, 250, 250],
							lightColor: '#8FFF1FC0'
						});
					}

					return token;
				} catch (e) {
					console.log(e);
				}
			}

			registerForPushNotificationsAsync()
				.then(async (e) => {
					await doUpdateNotificationId({
						notificationId: e?.data ? e.data : ''
					});
				})
				.catch((e) => {
					console.log(e);
				});

			Notifications.dismissAllNotificationsAsync()
				.then((e) => {
					console.log(e);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}, []);

	useEffect(() => {
		if (meIsSuccess) userState.setUser(meData.data);
	}, [meData]);

	return (
		<NavigationContainer theme={NavigationTheme}>
			{userState.authenticated && <MainNavigator />}
			{!userState.authenticated && <AuthNavigator />}
		</NavigationContainer>
	);
}
