import React, {SFC} from 'react';
import {FlatList} from 'react-native';
import {IReservation} from '../gql/types';
import {ReservationListItem} from './reservation-list-item';

export interface IReservationList {
	reservations: IReservation[];
}

const ReservationsList: SFC<IReservationList> = ({reservations}) => {
	return (
		<FlatList
			data={reservations}
			renderItem={({item}) => (
				<ReservationListItem reservation={item} key={item.id} />
			)}
		/>
	);
};

export {ReservationsList};
