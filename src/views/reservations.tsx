import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {reservationsQuery} from '../gql/reservations';
import {ReservationsList} from '../components/reservations-list';
import {IReservationsResponse, IFilterableQueryInput} from '../gql/types';
import {Query} from 'react-apollo';
import {NavigationScreenProp} from 'react-navigation';
import {Routes} from '../navigator';
import {SEARCH_SCOPE} from '../util/search-scope';
import {Loading} from '../components/loading';
import {ViewContainer} from '../components/view-container';

// Keep our page size minimal so that we receive the quickest response
const PAGE_SIZE = 10;

const Reservations = () => {
	return (
		<ViewContainer>
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
				{({data, fetchMore, loading}) => {
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
							updateQuery: (
								previousResult,
								{fetchMoreResult}
							) => {
								if (
									!fetchMoreResult ||
									fetchMoreResult.reservations.length === 0
								) {
									return previousResult;
								}
								return {
									reservations: [
										...previousResult.reservations,
										...fetchMoreResult.reservations
									]
								};
							}
						});
					};

					// We only want to show the loader if this is the first time
					// were entering the screen because fetchMore causes loading
					// to be true and we don't want to show it when we fetch more items to the
					// end of the list
					const reallyLoading = !reservations && loading;

					return (
						<Loading loading={reallyLoading}>
							<ReservationsList
								reservations={reservations || []}
								onRequestMore={handleEndReached}
							/>
						</Loading>
					);
				}}
			</Query>
		</ViewContainer>
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
			color={'white'}
			onPress={() => navigation.navigate(Routes.createReservation)}
		/>
	)
});

export {Reservations};
