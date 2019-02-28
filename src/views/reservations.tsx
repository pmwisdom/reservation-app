import React from 'react';
import {Button} from 'react-native';
import {reservationsQuery} from '../gql/reservations';
import {ReservationsList} from '../components/reservations-list';
import {IReservationsResponse, IFilterableQueryInput} from '../gql/types';
import {Query} from 'react-apollo';
import {NavigationScreenProp} from 'react-navigation';
import {Routes} from '../navigator';
import {SEARCH_SCOPE} from '../util/search-scope';

const Reservations = () => {
	return (
		<Query<IReservationsResponse, IFilterableQueryInput>
			query={reservationsQuery}
			variables={{
				first: 20,
				where: {
					name_contains: SEARCH_SCOPE
				}
			}}
		>
			{({data}) => (
				<ReservationsList
					reservations={(data && data.reservations) || []}
				/>
			)}
		</Query>
	);
};

Reservations.navigationOptions = ({
	navigation
}: {
	navigation: NavigationScreenProp<any>;
}) => ({
	title: 'Reservations',
	headerRight: (
		<Button
			title="Create"
			onPress={() => navigation.navigate(Routes.createReservation)}
		/>
	)
});

export {Reservations};
