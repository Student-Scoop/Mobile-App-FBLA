import Icons from '../assets/Icons';
import { colors } from '../util/ui/color';
import { View, StyleSheet, TextInput, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
	icon?: string;
}

export default function PlainTextInput(props: Props) {
	const { ...inputProps } = props;

	function TextInputIcon() {
		if (!props.icon) return null;

		return (
			<View style={styles.textInputIcon}>
				<Icons label={props.icon} size={24} />
			</View>
		);
	}

	return (
		<View style={styles.textInputContainer}>
			<TextInputIcon />

			<TextInput
				style={[
					styles.textInput,
					{
						paddingLeft: props.icon ? 15 : 30
					}
				]}
				onChangeText={props.onChangeText}
				onBlur={props.onBlur}
				value={props.value}
				placeholderTextColor={colors.inputColor}
				{...inputProps}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	textInputContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 70,
		borderWidth: 1,
		marginBottom: 16,
		borderColor: colors.inputBg,
		backgroundColor: colors.inputBg,
		borderRadius: 64
	},
	textInputIcon: {
		paddingLeft: 25
	},
	textInput: {
		flex: 1,
		height: 70,
		fontSize: 16,
		color: colors.inputColor,
		fontFamily: 'euclid-medium'
	}
});
