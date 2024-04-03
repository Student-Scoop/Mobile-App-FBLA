import { Image, StyleSheet } from 'react-native';

interface AvatarProps {
	size?: number;
	override?: boolean;
	avatar?: string | null;
}

export default function Avatar({ size, avatar }: AvatarProps) {
	function profilePicture() {
		if (avatar) return { uri: avatar };

		return require('../assets/images/default-avatar.png');
	}

	return (
		<Image
			style={{ width: size, height: size, ...styles.avatar }}
			source={profilePicture()}
		/>
	);
}

const styles = StyleSheet.create({
	avatar: {
		borderRadius: 1000,
		overflow: 'hidden',
		borderColor: '#36D38D',
		borderWidth: 2
	}
});
