import React, {SFC} from 'react';
import {FlatList} from 'react-native';
import {IReservation} from '../gql/types';
import {ReservationListItem} from './reservation-list-item';
import {EmptyList} from './empty-list';

export interface IReservationList {
	reservations: IReservation[];
	onRequestMore: () => void;
}

const ReservationsList: SFC<IReservationList> = ({
	reservations,
	onRequestMore
}) => {
	return (
		<FlatList
			style={{
				alignSelf: 'stretch',
				flexGrow: 1,
				flex: 1
			}}
			data={reservations}
			onEndReached={onRequestMore}
			ListEmptyComponent={EmptyList}
			renderItem={({item}) => (
				<ReservationListItem reservation={item} key={item.id} />
			)}
		/>
	);
};

ReservationsList.defaultProps = {
	reservations: []
};

export {ReservationsList};
