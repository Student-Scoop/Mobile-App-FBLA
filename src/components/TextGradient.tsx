import { TextProps, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

export default function TextLinearGradient({
	colors,
	...rest
}: TextProps & { colors: string[] }) {
	return (
		<MaskedView maskElement={<Text {...rest} />}>
			<LinearGradient
				colors={colors}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}>
				<Text {...rest} style={[rest.style, { opacity: 0 }]} />
			</LinearGradient>
		</MaskedView>
	);
}
