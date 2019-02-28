import React, {Component, SFC} from 'react';
import {IReservation} from '../gql/types';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {parseScopedString} from '../util/search-scope';

interface IReservationListItem {
	reservation: IReservation;
}

const ReservationListItem: SFC<IReservationListItem> = ({reservation}) => {
	return (
		<TouchableOpacity>
			<View style={styles.itemContainer}>
				<Text style={styles.reservationText} numberOfLines={1}>
					{parseScopedString(reservation.name)}
				</Text>
				<Text style={styles.hotelText} numberOfLines={1}>
					{reservation.hotelName}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	itemContainer: {
		height: 120,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 5,
		marginBottom: 5,
		paddingTop: 5,
		paddingBottom: 20,
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: 'gray',
		justifyContent: 'flex-end',
		borderRadius: 1
	},
	reservationText: {
		fontSize: 26,
		color: 'white'
	},
	hotelText: {
		fontSize: 14,
		color: 'lightgray'
	}
});

export {ReservationListItem};
