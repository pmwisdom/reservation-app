import gql from 'graphql-tag';

export const reservationsQuery = gql`
	query reservations(
		$first: Int
		$after: String
		$where: ReservationWhereInput
	) {
		reservations(first: $first, after: $after, where: $where) {
			id
			name
			hotelName
			arrivalDate
			departureDate
		}
	}
`;

export const createReservationMutation = gql`
	mutation createReservation($data: ReservationCreateInput!) {
		createReservation(data: $data) {
			id
			name
			hotelName
			arrivalDate
			departureDate
		}
	}
`;
