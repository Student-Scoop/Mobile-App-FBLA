import axios from 'axios';
import { User } from '../types/user';
import useUserStore from '../store/user';
import { colors } from '../util/ui/color';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import Toast from 'react-native-simple-toast';
import { BACKEND_API_URL } from '../constants/config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, StyleSheet } from 'react-native';

import { AxiosError } from 'axios';
import { getUser } from '../api/users';
import { DefaultResponse } from '../api';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
	FollowChangeRespose,
	FollowPayload,
	follow
} from '../api/relationship';

interface ViewProfileProps {
	route: any;
}

export default function ViewProfile({ route }: ViewProfileProps) {
	const { userId } = route.params;
	const userState = useUserStore();
	const [userProfile, setUserProfile] = useState<User>({} as User);

	const { mutateAsync: doFollow } = useMutation<
		DefaultResponse<FollowChangeRespose>,
		AxiosError,
		FollowPayload
	>({
		mutationKey: ['follow'],
		mutationFn: follow,
		onSuccess: (response) => {
			console.log(response);
			userState.modifyUser({
				following: response.data.me.followingCount,
				followers: response.data.me.followersCount
			});
		}
	});

	const { data: userProfileData, isSuccess: userProfileIsSuccess } = useQuery({
		queryKey: ['user', userId],
		queryFn: () => getUser(userId)
	});

	useEffect(() => {
		if (userProfileIsSuccess) setUserProfile(userProfileData.data);
	}, [userProfileData]);

	function hasPortfolio(): boolean {
		const portfolioKeys = [
			'schoolName',
			'schoolLocation',
			'graduationYear',
			'degree',
			'major',
			'clubs',
			'sports'
		];

		for (let key of portfolioKeys) {
			if (
				userProfile[key as keyof User] === null ||
				userProfile[key as keyof User] === ''
			)
				return false;
		}

		return true;
	}

	return (
		<SafeAreaView style={styles.profileContainer}>
			<View style={styles.profileHeaderContainer}>
				<View style={styles.profileHeaderWrapper}>
					<Avatar size={84} avatar={userProfile?.avatar} />
					<View style={styles.profileIntroduction}>
						<Text style={styles.profileName}>{userProfile?.name}</Text>
						<Text style={styles.profileUsername}>@{userProfile?.username}</Text>
						<View style={styles.profileFollowStats}>
							<Text>Following: {userProfile?.following?.toString()}</Text>
							<Text>Followers: {userProfile?.followers?.toString()}</Text>
						</View>
					</View>
				</View>
				<View style={styles.profileControlsContainer}>
					<Button
						title="Follow"
						type="primary"
						onPress={() => doFollow({ userId: userProfile.userId })}
					/>
				</View>
			</View>
			<View style={styles.portfolioContainer}>
				<View style={styles.portfolioHeadingContainer}>
					<Text style={styles.portfolioTitle}>Academics</Text>
				</View>
				<View style={styles.portfolioSeperator} />
				<View style={styles.portfolioStatsContainer}>
					{userProfile?.schoolName && (
						<Text style={styles.portfolioStatTitle}>
							School:{' '}
							<Text style={styles.portfolioStat}>
								{userProfile?.schoolName}
							</Text>
						</Text>
					)}

					{userProfile?.schoolLocation && (
						<Text style={styles.portfolioStatTitle}>
							School Location:{' '}
							<Text style={styles.portfolioStat}>
								{userProfile?.schoolLocation}
							</Text>
						</Text>
					)}

					{userProfile?.graduationYear && (
						<Text style={styles.portfolioStatTitle}>
							Graduation Year:{' '}
							<Text style={styles.portfolioStat}>
								{userProfile?.graduationYear}
							</Text>
						</Text>
					)}

					{userProfile?.degree && (
						<Text style={styles.portfolioStatTitle}>
							Degree Goal:{' '}
							<Text style={styles.portfolioStat}>{userProfile?.degree}</Text>
						</Text>
					)}

					{userProfile?.major && (
						<Text style={styles.portfolioStatTitle}>
							Major:{' '}
							<Text style={styles.portfolioStat}>{userProfile?.major}</Text>
						</Text>
					)}

					{userProfile?.clubs && (
						<Text style={styles.portfolioStatTitle}>
							Clubs:{' '}
							<Text style={styles.portfolioStat}>{userProfile?.clubs}</Text>
						</Text>
					)}

					{userProfile?.sports && (
						<Text style={styles.portfolioStatTitle}>
							Sports:{' '}
							<Text style={styles.portfolioStat}>{userProfile?.sports}</Text>
						</Text>
					)}

					{!hasPortfolio() && (
						<Text style={styles.portfolioStatTitle}>
							{userProfile?.name} has no portfolio yet.
						</Text>
					)}
				</View>
			</View>
			<View style={styles.profileControlsContainer}></View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	profileContainer: {
		position: 'relative',
		margin: 24,
		gap: 20,
		flexDirection: 'column'
	},
	profileHeaderContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		gap: 20,
		paddingTop: 20
	},
	profileHeaderWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 20
	},
	profileControlsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		gap: 20
	},
	profileIntroduction: {
		flexDirection: 'column',
		justifyContent: 'center',
		gap: 2
	},
	profileName: {
		fontSize: 28,
		color: colors.primaryTextColor,
		fontFamily: 'euclid-bold'
	},
	profileUsername: {
		fontSize: 14,
		color: colors.secondaryTextColor,
		fontFamily: 'euclid-semibold'
	},
	profileFollowStats: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		gap: 8
	},
	portfolioContainer: {
		borderColor: '#f7f7f7',
		borderWidth: 2,
		borderRadius: 24,
		padding: 20
	},
	portfolioHeadingContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	portfolioTitle: {
		fontSize: 18,
		color: colors.secondaryTextColor,
		fontFamily: 'euclid-bold'
	},
	portfolioSeperator: {
		width: '100%',
		borderWidth: 1,
		marginVertical: 15,
		borderColor: '#f7f7f7'
	},
	portfolioStatsContainer: {
		flexDirection: 'column',
		gap: 10
	},
	portfolioStatTitle: {
		fontSize: 14,
		color: colors.secondaryTextColor,
		fontFamily: 'euclid-bold'
	},
	portfolioStat: {
		fontSize: 14,
		color: colors.secondaryTextColor,
		fontFamily: 'euclid-regular'
	}
});
