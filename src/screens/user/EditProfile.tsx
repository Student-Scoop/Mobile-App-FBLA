import mime from 'mime';
import axios from 'axios';
import useUserStore from '../../store/user';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import Toast from 'react-native-simple-toast';
import * as ImagePicker from 'expo-image-picker';
import FormInput from '../../components/FormInput';
import { useNavigation } from '@react-navigation/native';
import { BACKEND_API_URL } from '../../constants/config';
import { generateRandomString } from '../../util/helpers';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, StyleSheet, View, Text } from 'react-native';

import {
	useForm,
	FormProvider,
	SubmitHandler,
	SubmitErrorHandler
} from 'react-hook-form';

import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { DefaultResponse } from '../../api/';
import { type User } from '../../types/user';
import { removeAvatar } from '../../api/users';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
	type UpdatePayload,
	type ChangeAvatarResponse,
	update,
	updateAvatar
} from '../../api/users/update';

type ProfileInput = {
	username: string;
	name: string;
	password: string;
	confirmPassword: string;
};

export default function EditPortfolio() {
	const userState = useUserStore();
	const navigation = useNavigation<any>();
	const { ...methods } = useForm<ProfileInput>({
		defaultValues: {
			username: userState.user?.username || '',
			name: userState.user?.name || '',
			password: '',
			confirmPassword: ''
		}
	});

	const { mutateAsync: doUpdateAvatar } = useMutation<
		DefaultResponse<ChangeAvatarResponse>,
		AxiosError,
		FormData
	>({
		mutationFn: updateAvatar,
		mutationKey: ['users/@me/update-avatar'],
		onSuccess: (response) => {
			console.log(response);
			userState.setAvatar(response.data.avatar);
		},
		onError: (error) => {
			console.log('Avatar update error:', error);
			Toast.show('Could not update avatar', Toast.SHORT);
		}
	});

	const { mutateAsync: doUpdateProfile } = useMutation<
		DefaultResponse<User>,
		AxiosError,
		UpdatePayload
	>({
		mutationFn: update,
		mutationKey: ['users/@me/update'],
		onSuccess: (response) => {
			userState.modifyUser({
				username: response.data.username,
				name: response.data.name
			});

			Toast.show('Profile saved', Toast.SHORT);
		},
		onError: (error) => {
			console.log('Profile update error:', error);
			Toast.show('Could not save profile', Toast.SHORT);
		}
	});

	const {
		refetch: removeAvatarRefetch,
		data: removeAvatarData,
		isSuccess: removeAvatarIsSuccess,
		isError: removeAvatarIsError
	} = useQuery<DefaultResponse<ChangeAvatarResponse>>({
		queryKey: ['users/@me/remove-avatar'],
		queryFn: removeAvatar,
		enabled: false
	});

	useEffect(() => {
		console.log('Remove avatar data:', removeAvatarData?.data.avatar);
		console.log(removeAvatarData);
		Toast.show('Avatar removed', Toast.SHORT);
	}, [removeAvatarData?.data?.avatar]);

	const onSubmit: SubmitHandler<ProfileInput> = async (data: ProfileInput) => {
		let payload = {} as UpdatePayload;

		for (let key in data) {
			if (data[key as keyof ProfileInput] !== '')
				payload[key as keyof UpdatePayload] = data[key as keyof ProfileInput];
		}

		await doUpdateProfile(payload);
	};

	const onError: SubmitErrorHandler<ProfileInput> = (errors, _) => {
		Toast.show(
			errors.username?.message || errors.password?.message || 'Unknown error',
			Toast.LONG
		);
	};

	function getFormData(image: ImagePicker.ImagePickerAsset): FormData {
		const data = new FormData() as FormData & {
			append: (key: string, value: any) => void;
		};

		const fileExtension = image.uri.substring(image.uri.lastIndexOf('.') + 1);

		data.append('image', {
			uri: image.uri,
			name: `${generateRandomString(32)}.${fileExtension}`,
			type: mime.getType(fileExtension)
		});

		return data;
	}

	async function pickImage() {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			selectionLimit: 1,
			aspect: [1, 1],
			quality: 1
		});

		if (!result.canceled && result.assets.length > 0)
			await doUpdateAvatar(getFormData(result.assets[0]));
	}

	return (
		<SafeAreaView style={styles.editProfileContainer}>
			<View style={styles.avatarContainer}>
				<View style={styles.avatarContentContainer}>
					<Avatar size={128} avatar={userState?.user?.avatar} />
					<View style={styles.avatarControlContainer}>
						<Pressable style={styles.avatarControlButton} onPress={pickImage}>
							<Text>Change Avatar</Text>
						</Pressable>
						<Pressable
							style={styles.avatarControlButton}
							onPress={() => removeAvatarRefetch()}>
							<Text>Remove Avatar</Text>
						</Pressable>
					</View>
				</View>
			</View>
			<View>
				<FormProvider {...methods}>
					<Text style={styles.sectionTitle}>General Info</Text>
					<FormInput name="username" label="username" placeholder="Username" />
					<FormInput name="name" label="name" placeholder="Name" />
					<Text style={styles.sectionTitle}>Change Password</Text>
					<FormInput
						name="password"
						label="Password"
						placeholder="Password"
						secureTextEntry
					/>
					<FormInput
						name="confirmPassword"
						label="Confirm Password"
						placeholder="Confirm Password"
						secureTextEntry
					/>
				</FormProvider>
				<View style={styles.editProfileControls}>
					<Button
						title="Save"
						type="primary"
						fullWidth={true}
						onPress={methods.handleSubmit(onSubmit, onError)}
					/>
					<Button
						title="Edit Portfolio"
						type="dark"
						fullWidth={true}
						onPress={() => {
							navigation.navigate('EditPortfolio');
						}}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	editProfileContainer: {
		gap: 20,
		margin: 24,
		position: 'relative',
		flexDirection: 'column'
	},
	avatarContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	avatarContentContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10
	},
	avatarControlContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10
	},
	avatarControlButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 24,
		backgroundColor: '#fff',
		borderWidth: 2,
		borderColor: '#f7f7f7'
	},
	editProfileControls: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#000',
		marginBottom: 10,
		fontFamily: 'poppins-bold'
	}
});
