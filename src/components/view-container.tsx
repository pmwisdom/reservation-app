import React, {SFC} from 'react';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
	viewContainer: {
		backgroundColor: '#ECFEE8',
		flex: 1,
		alignSelf: 'stretch'
	}
});

const ViewContainer: SFC = ({children}) => {
	return <View style={styles.viewContainer}>{children}</View>;
};

export {ViewContainer};
