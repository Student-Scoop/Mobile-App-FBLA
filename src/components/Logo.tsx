import { Image } from 'react-native';

interface LogoProps {
	size?: number;
}

export default function Logo(props: LogoProps) {
	return (
		<Image
			source={require('../assets/images/logo.png')}
			style={{ width: props.size || 100, height: props.size || 100 }}
		/>
	);
}
