import React from 'react';
import SvgIcon from '../assets/Icons';
import { View } from 'react-native';
import { colors } from '../util/ui/color';

interface NavigationIconProps {
	route: string;
	isFocused: boolean;
}

export default function NavigationIcon({
	route,
	isFocused
}: NavigationIconProps) {
	const renderIcon = (route: string, isFocues: boolean) => {
		switch (route) {
			case 'Home':
				return isFocues ? (
					<SvgIcon
						label="home"
						size={25}
						primaryColor={colors.bottomBarHomeIconActivePrimary}
						secondaryColor={colors.bottomBarHomeIconActiveSecondary}
					/>
				) : (
					<SvgIcon label="home" size={25} />
				);
			case 'Search':
				return isFocues ? (
					<SvgIcon
						label="search"
						size={25}
						primaryColor={colors.bottomBarSearchIconActivePrimary}
						secondaryColor={colors.bottomBarSearchIconActiveSecondary}
					/>
				) : (
					<SvgIcon label="search" size={25} />
				);
			case 'Profile':
				return isFocues ? (
					<SvgIcon
						label="profile"
						size={25}
						primaryColor={colors.bottomBarProfileIconActivePrimary}
						secondaryColor={colors.bottomBarProfileIconActiveSecondary}
					/>
				) : (
					<SvgIcon label="profile" size={25} />
				);
			case 'Feed':
				return isFocues ? (
					<SvgIcon
						label="bell"
						size={25}
						primaryColor={colors.bottomBarFeedIconActivePrimary}
						secondaryColor={colors.bottomBarFeedIconActiveSecondary}
					/>
				) : (
					<SvgIcon label="bell" size={25} />
				);
			default:
				break;
		}
	};

	return <View>{renderIcon(route, isFocused)}</View>;
}
