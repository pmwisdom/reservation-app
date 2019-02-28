import React from 'react';
import {Button} from 'react-native';
import {reservationsQuery} from '../gql/reservations';
import {ReservationsList} from '../components/reservations-list';
import {IReservationsResponse, IFilterableQueryInput} from '../gql/types';
import {Query} from 'react-apollo';
import {NavigationScreenProp} from 'react-navigation';
import {Routes} from '../navigator';
import {SEARCH_SCOPE} from '../util/search-scope';

const PAGE_SIZE = 5;

const Reservations = () => {
	return (
		<Query<IReservationsResponse, IFilterableQueryInput>
			query={reservationsQuery}
			notifyOnNetworkStatusChange
			variables={{
				first: PAGE_SIZE,
				where: {
					name_contains: SEARCH_SCOPE
				}
			}}
		>
			{({data, fetchMore}) => {
				const reservations = data && data.reservations;
				const handleEndReached = () => {
					fetchMore({
						query: reservationsQuery,
						variables: {
							first: PAGE_SIZE,
							after:
								reservations &&
								reservations[reservations.length - 1].id,
							where: {
								name_contains: SEARCH_SCOPE
							}
						},
						updateQuery: (previousResult, {fetchMoreResult}) => {
							// Don't do anything if there weren't any new items
							if (
								!fetchMoreResult ||
								fetchMoreResult.reservations.length === 0
							) {
								return previousResult;
							}
							return {
								// Append the new feed results to the old one
								reservations: [
									...previousResult.reservations,
									...fetchMoreResult.reservations
								]
							};
						}
					});
				};

				return (
					<ReservationsList
						reservations={(data && data.reservations) || []}
						onRequestMore={handleEndReached}
					/>
				);
			}}
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
