import { colors } from '../../util/ui/color';
import { View, Text, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

export default function ChallengeBox() {
	return (
		<View>
			<View style={styles.challengeWrapper}>
				<View style={styles.challengeInfo}>
					<Text style={styles.challengeInfoText}>
						Challenge: Complete your portolfio & profile!
					</Text>
					<Text style={styles.challengeInfoTimeText}>3 days left</Text>
				</View>
				<View>
					<CircularProgress
						value={75}
						activeStrokeWidth={15}
						inActiveStrokeWidth={15}
						progressValueColor={colors.primaryTextColor}
						progressValueFontSize={18}
						activeStrokeColor={'#36d38d'}
						activeStrokeSecondaryColor={'#4e6dd1'}
						inActiveStrokeColor={'#0a131a'}
						valueSuffix="%"
						progressValueStyle={{
							fontFamily: 'euclid-semibold'
						}}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	challengeWrapper: {
		width: '100%',
		backgroundColor: '#fff',
		borderRadius: 24,
		//paddingLeft: 24,
		//paddingRight: 24,
		elevation: 5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 160
	},
	colorWrapper: {
		backgroundColor: colors.green
	},
	challengeInfo: {
		width: '50%',
		textAlign: 'left',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		height: '100%'
	},
	challengeInfoText: {
		color: colors.primaryTextColor,
		fontSize: 17,
		fontFamily: 'euclid-bold'
	},
	challengeInfoTimeText: {
		color: colors.secondaryTextColor,
		fontSize: 12,
		fontFamily: 'euclid-regular'
	},
	challengeDescription: {
		fontSize: 14,
		fontFamily: 'poppins-regular',
		color: '#fff',
		textAlign: 'center'
	}
});
