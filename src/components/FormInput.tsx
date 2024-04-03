import React from 'react';
import PlainTextInput from './PlainTextInput';
import { TextInputProps as RNTextInputProps } from 'react-native';

import {
	useController,
	useFormContext,
	UseControllerProps
} from 'react-hook-form';

interface TextInputProps extends RNTextInputProps, UseControllerProps {
	label?: string;
	icon?: string;
	defaultValue?: string;
}

function ControlledInput(props: TextInputProps) {
	const { name, label, icon, rules, defaultValue, ...inputProps } = props;

	const { field } = useController({ name, rules, defaultValue });

	return (
		<PlainTextInput
			onChangeText={field.onChange}
			onBlur={field.onBlur}
			value={field.value}
			icon={icon}
			{...inputProps}
		/>
	);
}

export default function TextInput(props: TextInputProps) {
	const { name } = props;

	const formContext = useFormContext();

	if (!formContext || !name) {
		const msg = !formContext
			? 'TextInput must be wrapped by the FormProvider'
			: 'Name must be defined';
		console.error(msg);
		return null;
	}

	return <ControlledInput {...props} />;
}
