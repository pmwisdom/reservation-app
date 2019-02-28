import React, {Component, PureComponent, SFC} from 'react';
import {View, Button} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';
import {MutationFn, Mutation} from 'react-apollo';
import {createReservationMutation} from '../gql/reservations';
import {ICreateReservationInput, IReservation} from '../gql/types';
import {formatScopedString} from '../util/search-scope';

interface IMutationProps {
	createReservation: MutationFn<
		{createReservation: IReservation},
		ICreateReservationInput
	>;
}

interface ICreateReservationProps extends NavigationScreenProps<any> {}

class CreateReservationView extends PureComponent<
	ICreateReservationProps & IMutationProps
> {
	static navigationOptions = ({navigation}) => ({
		headerRight: (
			<Button title="Save" onPress={navigation.getParam('handleSave')} />
		)
	});

	componentDidMount() {
		const {navigation} = this.props;
		navigation.setParams({handleSave: this.handleSave});
	}

	public render() {
		return (
			<View>
				<Button title="Save" onPress={this.handleSave} />
			</View>
		);
	}

	private handleSave = () => {
		const {navigation, createReservation} = this.props;

		createReservation({
			variables: {
				data: {
					name: formatScopedString('hello'),
					hotelName: 'hilton2',
					arrivalDate: '',
					departureDate: ''
				}
			}
		});

		navigation.goBack();
	};
}

const CreateReservation: SFC<ICreateReservationProps> = props => {
	return (
		<Mutation mutation={createReservationMutation}>
			{mutation => (
				<CreateReservationView
					createReservation={mutation}
					{...props}
				/>
			)}
		</Mutation>
	);
};

export {CreateReservation};
