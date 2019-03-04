import {createStackNavigator, createAppContainer} from 'react-navigation';
import {Reservations} from './views/reservations';
import {CreateReservation} from './views/create-reservation';

export enum Routes {
	'reservations' = 'reservations',
	'createReservation' = 'createReservation'
}

const defaultConfig = {
	defaultNavigationOptions: {
		headerStyle: {backgroundColor: '#104c97', color: 'white'},
		headerTitleStyle: {color: 'white'},
		headerBackTitleStyle: {color: 'white'},
		headerTintColor: 'white'
	}
};

const MainNavigator = createStackNavigator(
	{
		[Routes.reservations]: {screen: Reservations},
		[Routes.createReservation]: {screen: CreateReservation}
	},
	defaultConfig
);

export const AppNavigator = createAppContainer(MainNavigator);
