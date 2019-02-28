import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {symbol} from 'prop-types';

const styles = StyleSheet.create({
	container: {
		height: 140,
		alignSelf: 'stretch',
		backgroundColor: 'lightgray',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column'
	},
	text: {
		textAlign: 'center',
		paddingTop: 10,
		paddingBottom: 10
	}
});

export const EmptyList = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Sure is lonely in here.</Text>
			<Text style={styles.text}>
				{'Create a New Reservation by clicking "Create" ' +
					'in the upper right hand corner'}
			</Text>
		</View>
	);
};
