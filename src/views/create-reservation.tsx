import React, {Component, PureComponent, SFC} from 'react';
import {View, Button, TextInput, Picker} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';
import {MutationFn, Mutation} from 'react-apollo';
import {createReservationMutation} from '../gql/reservations';
import {
	ICreateReservationInput,
	IReservation,
	IReservationInput
} from '../gql/types';
import {formatScopedString} from '../util/search-scope';

const hotelOptions = [
	{
		value: 'hilton-seattle',
		label: 'Hilton Seattle'
	},
	{
		value: 'hilton-vancouver',
		label: 'Hilton Vancouver'
	},
	{
		value: 'hilton-texas',
		label: 'Hilton Texas'
	}
];

interface IMutationProps {
	createReservation: MutationFn<
		{createReservation: IReservation},
		ICreateReservationInput
	>;
}

interface ICreateReservationProps extends NavigationScreenProps<any> {}

class CreateReservationView extends Component<
	ICreateReservationProps & IMutationProps,
	Partial<IReservationInput>
> {
	static navigationOptions = ({navigation}) => ({
		headerRight: (
			<Button title="Save" onPress={navigation.getParam('handleSave')} />
		)
	});

	public state = {
		name: '',
		hotelName: '',
		arrivalDate: '',
		departureDate: ''
	};

	componentDidMount() {
		const {navigation} = this.props;
		navigation.setParams({handleSave: this.handleSave});
	}

	public handleChange = (name: string, value: string) => {
		this.setState({
			[name]: value
		});
	};

	public handleNameChange = (value: string) => {
		this.handleChange('name', value);
	};

	public handleArrivalDateChange = (value: string) => {
		this.handleChange('arrivalDate', value);
	};

	public handleDepartureDateChange = (value: string) => {
		this.handleChange('departureDate', value);
	};

	public handleHotelChange = (value: string) => {
		this.handleChange('hotelName', value);
	};

	public render() {
		return (
			<View>
				<TextInput
					style={{height: 40, borderColor: 'gray', borderWidth: 1}}
					onChangeText={this.handleNameChange}
					value={this.state.name}
					placeholder={'Your Name'}
				/>
				<TextInput
					style={{height: 40, borderColor: 'gray', borderWidth: 1}}
					onChangeText={this.handleHotelChange}
					value={this.state.hotelName}
					placeholder={'Hotel Name'}
				/>
				{/* <Picker
					selectedValue={this.state.hotelName}
					style={{height: 50, width: 100}}
					onValueChange={this.handleHotelChange}
					mode={'dropdown'}
				>
					{hotelOptions.map(({value, label}) => (
						<Picker.Item label={label} value={value} />
					))}
				</Picker> */}
				<TextInput
					style={{height: 40, borderColor: 'gray', borderWidth: 1}}
					onChangeText={this.handleArrivalDateChange}
					value={this.state.arrivalDate}
					placeholder={'Arrival Date'}
				/>
				<TextInput
					style={{height: 40, borderColor: 'gray', borderWidth: 1}}
					onChangeText={this.handleDepartureDateChange}
					value={this.state.departureDate}
					placeholder={'Departure Date'}
				/>
				<Button title="Save" onPress={this.handleSave} />
			</View>
		);
	}

	private handleSave = () => {
		const {navigation, createReservation} = this.props;
		const {name, ...rest} = this.state;

		try {
			createReservation({
				variables: {
					data: {
						name: formatScopedString(name),
						...rest
					}
				}
			});

			navigation.goBack();
		} catch (err) {
			console.error('Error', err);
		}
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
