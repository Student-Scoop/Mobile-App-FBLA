import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface Props {
	placeholder: string;
	value: string;
	onChangeText: (text: string) => void;
	secureTextEntry?: boolean;
}

export default function Input({ placeholder, value, onChangeText, secureTextEntry = false }: Props) {
	return (
		<TextInput
			style={styles.input}
			placeholder={placeholder}
			placeholderTextColor={'#808080'}
			value={value}
			onChangeText={onChangeText}
			secureTextEntry={secureTextEntry}
		/>
	);
};

const styles = StyleSheet.create({
	input: {
		width: '100%',
		height: 70,
		borderWidth: 1,
		marginBottom: 16,
		paddingLeft: 22,
		borderColor: '#e3e1e1',
		backgroundColor: '#e3e1e1',
		borderRadius: 12,
		fontSize: 16,
		color: '#b5b3b3',
	},
});
