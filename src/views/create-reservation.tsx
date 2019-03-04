import React, {Component, PureComponent, SFC} from 'react';
import {View, Button, TextInput, StyleSheet, Dimensions} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';
import {MutationFn, Mutation} from 'react-apollo';
import {createReservationMutation} from '../gql/reservations';
import {
	ICreateReservationInput,
	IReservation,
	IReservationInput
} from '../gql/types';
import {formatScopedString} from '../util/search-scope';
import DatePicker from 'react-native-datepicker';
import {ViewContainer} from '../components/view-container';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
	datesContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignSelf: 'stretch'
	},
	datePicker: {
		alignSelf: 'stretch',
		width: width / 2
	}
});

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
		headerStyle: {backgroundColor: '#104c97', color: 'white'},
		headerTitleStyle: {color: 'white'},
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
			<ViewContainer>
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
				<View style={styles.datesContainer}>
					<DatePicker
						placeholder={'Arrival Date'}
						style={styles.datePicker}
						date={this.state.arrivalDate}
						mode="date"
						onDateChange={this.handleArrivalDateChange}
						iconComponent={<View />}
						confirmBtnText={'Save'}
						cancelBtnText={'Cancel'}
					/>
					<DatePicker
						placeholder={'Departure Date'}
						style={styles.datePicker}
						date={this.state.departureDate}
						mode="date"
						onDateChange={this.handleDepartureDateChange}
						iconComponent={<View />}
						confirmBtnText={'Save'}
						cancelBtnText={'Cancel'}
					/>
				</View>
				<Button title="Save" onPress={this.handleSave} />
			</ViewContainer>
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
				},
				refetchQueries: () => ['reservations']
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
