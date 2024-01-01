import React from 'react';
import { colors } from '../util/color';
import { Text, StyleSheet, ViewStyle, Pressable } from 'react-native';

interface Props {
	title: string;
	type: string;
	onPress: () => void;
}

export default function Button({ title, type, onPress }: Props) {
	let color, borderColor, textColor: string;

	switch (type) {
		case 'primary':
			color = colors.buttonPrimary;
			textColor = colors.buttonPrimaryText;
			borderColor = colors.buttonPrimaryBorder
			break;
		case 'dark':
			color = colors.buttonDark;
			textColor = colors.buttonDarkText;
			borderColor = colors.buttonDarkBorder
			break;
		default:
			color = colors.buttonPrimary;
			textColor = colors.buttonPrimaryText;
			borderColor = colors.buttonPrimaryBorder
			break;
	}

	return (
		<Pressable style={{
			...styles.button, backgroundColor: color, borderColor: borderColor
		}} onPress={onPress}>
			<Text style={{ ...styles.buttonText, color: textColor }}>{title}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 24,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 3,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		borderWidth: 3,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: 'bold',
		textTransform: 'uppercase',
	},
});
