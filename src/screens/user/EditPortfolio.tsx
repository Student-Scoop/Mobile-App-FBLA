import axios from 'axios';
import useUserStore from '../../store/user';
import Button from '../../components/Button';
import Toast from 'react-native-simple-toast';
import FormInput from '../../components/FormInput';
import { BACKEND_API_URL } from '../../constants/config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import {
	useForm,
	FormProvider,
	SubmitHandler,
	SubmitErrorHandler
} from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { type User } from '../../types/user';
import { DefaultResponse } from '../../api/';
import { type UpdatePayload, update } from '../../api/users/update';

type PortfolioInput = {
	schoolName: string;
	schoolLocation: string;
	graduationYear: string;
	degree: string;
	major: string;
	gpa: string;
	gradeLevel: string;
	clubs: string;
	sports: string;
};

export default function EditPortfolio() {
	const userState = useUserStore();
	const { ...methods } = useForm<PortfolioInput>({
		defaultValues: {
			schoolName: userState.user?.schoolName || '',
			schoolLocation: userState.user?.schoolLocation || '',
			graduationYear: userState.user?.graduationYear || '',
			degree: userState.user?.degree || '',
			major: userState.user?.major || '',
			clubs: userState.user?.clubs || '',
			sports: userState.user?.sports || ''
		}
	});

	const { mutateAsync: doUpdatePortfolio } = useMutation<
		DefaultResponse<User>,
		AxiosError,
		UpdatePayload
	>({
		mutationFn: update,
		mutationKey: ['users/@me/update'],
		onSuccess: (response) => {
			userState.modifyUser({
				schoolName: response.data.schoolName,
				schoolLocation: response.data.schoolLocation,
				graduationYear: response.data.graduationYear,
				degree: response.data.degree,
				major: response.data.major,
				clubs: response.data.clubs,
				sports: response.data.sports
			});

			Toast.show('Portfolio saved', Toast.SHORT);
		},
		onError: (error) => {
			console.log('Portfolio update error:', error);
			Toast.show('Could not save portfolio', Toast.SHORT);
		}
	});

	const onSubmit: SubmitHandler<PortfolioInput> = async (
		data: PortfolioInput
	) => {
		let payload = {} as UpdatePayload;

		for (let key in data) {
			if (data[key as keyof PortfolioInput] !== '')
				payload[key as keyof UpdatePayload] = data[key as keyof PortfolioInput];
		}

		await doUpdatePortfolio(payload);
	};

	const onError: SubmitErrorHandler<PortfolioInput> = (errors, _) => {
		Toast.show(
			errors.schoolName?.message ||
				errors.schoolLocation?.message ||
				errors.graduationYear?.message ||
				errors.degree?.message ||
				errors.major?.message ||
				'Unknown error',
			Toast.LONG
		);
	};

	return (
		<SafeAreaView>
			<ScrollView contentContainerStyle={styles.editPortfolioContainer}>
				<FormProvider {...methods}>
					<Text style={styles.sectionTitle}>General Info</Text>
					<FormInput
						name="schoolName"
						label="School Name"
						placeholder="School Name"
					/>
					<FormInput
						name="schoolLocation"
						label="School Location"
						placeholder="School Location"
					/>
					<FormInput
						name="graduationYear"
						label="Graduation Year"
						placeholder="Graduation Year"
					/>
					<FormInput name="degree" label="Degree" placeholder="Degree" />
					<FormInput name="major" label="Major" placeholder="Major" />
					<Text style={styles.sectionTitle}>Clubs</Text>
					<FormInput name="clubs" label="Clubs" placeholder="Clubs" />
					<Text style={styles.sectionTitle}>Sports</Text>
					<FormInput name="sports" label="Sports" placeholder="Sports" />
				</FormProvider>
				<View style={styles.editProfileControls}>
					<Button
						title="Save"
						type="primary"
						fullWidth={true}
						onPress={methods.handleSubmit(onSubmit, onError)}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	editPortfolioContainer: {
		margin: 24,
		position: 'relative',
		flexDirection: 'column',
		justifyContent: 'space-evenly'
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
		fontFamily: 'euclid-bold'
	}
});
