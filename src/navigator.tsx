import {createStackNavigator, createAppContainer} from 'react-navigation';
import {Reservations} from './views/reservations';
import {CreateReservation} from './views/create-reservation';

export enum Routes {
	'reservations' = 'reservations',
	'createReservation' = 'createReservation'
}

const MainNavigator = createStackNavigator({
	[Routes.reservations]: {screen: Reservations},
	[Routes.createReservation]: {screen: CreateReservation}
});

export const AppNavigator = createAppContainer(MainNavigator);
