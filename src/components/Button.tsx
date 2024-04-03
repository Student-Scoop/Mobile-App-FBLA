import React from 'react';
import { colors } from '../util/ui/color';
import { Text, StyleSheet, ViewStyle, Pressable } from 'react-native';

interface Props {
	title?: string;
	type: string;
	icon?: JSX.Element;
	fullWidth?: boolean;
	onPress: () => void;
}

export default function Button({
	title,
	type,
	icon,
	fullWidth,
	onPress
}: Props) {
	let color, borderColor, textColor: string;

	switch (type) {
		case 'primary':
			color = colors.buttonPrimary;
			textColor = colors.buttonPrimaryText;
			borderColor = colors.buttonPrimaryBorder;
			break;
		case 'dark':
			color = colors.buttonDark;
			textColor = colors.buttonDarkText;
			borderColor = colors.buttonDarkBorder;
			break;
		case 'google':
			color = '#DB4437';
			borderColor = '#DB4437';
			textColor = colors.buttonPrimaryText;
			break;
		default:
			color = colors.buttonPrimary;
			textColor = colors.buttonPrimaryText;
			borderColor = colors.buttonPrimaryBorder;
			break;
	}

	return (
		<Pressable
			style={{
				...styles.button,
				backgroundColor: color,
				borderColor: borderColor,
				width: fullWidth ? '100%' : 'auto',
				gap: title?.length ? 8 : 0
			}}
			onPress={onPress}>
			{icon}
			{title?.length ? (
				<Text style={{ ...styles.buttonText, color: textColor }}>{title}</Text>
			) : null}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 28,
		paddingVertical: 18,
		paddingHorizontal: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 3,
		shadowColor: '#36D38D',
		shadowOffset: { width: 4, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		borderWidth: 3
	},
	buttonText: {
		fontSize: 17,
		fontFamily: 'euclid-semibold'
	}
});
