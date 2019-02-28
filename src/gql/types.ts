export interface INode {
	id: string;
}

export interface IReservation extends INode, IReservationInput {}

export interface IReservationInput {
	name: string;
	hotelName: string;
	arrivalDate: string;
	departureDate: string;
}

export interface IReservationsResponse {
	reservations: IReservation[];
}

export interface IFilterableQueryInput {
	first?: number;
	after?: string;
	where?: {
		name_contains?: string;
	};
}

export interface ICreateReservationInput {
	data: IReservationInput;
}
