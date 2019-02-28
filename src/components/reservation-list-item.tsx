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
				<Text>{`Reservation: ${parseScopedString(
					reservation.name
				)}`}</Text>
				<Text>{`Hotel: ${reservation.hotelName}`}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	itemContainer: {
		height: 80
	}
});

export {ReservationListItem};
