import React, {Component, SFC} from 'react';
import {IReservation} from '../gql/types';
import {
	TouchableOpacity,
	View,
	Text,
	StyleSheet,
	ImageBackground
} from 'react-native';
import {parseScopedString} from '../util/search-scope';

interface IReservationListItem {
	reservation: IReservation;
}

const hotelImages = [
	'http://apparelmagazine.co.nz/hotelmagazine/wp-content/uploads/sites/4/2016/02/HH_frontentrance1_746x420_FitToBoxSmallDimension_Center.jpg',
	'https://www3.hilton.com/resources/media/hi/AUSCVHH/en_US/img/shared/full_page_image_gallery/main/HH_exteriornight1_1270x560_FitToBoxSmallDimension_LowerCenter.jpg',
	'https://www.theinquirer.net/w-images/896e0450-a82e-4f95-bb0e-1c2ff327b6ce/0/hiltonhotelinbucharest-580x358.jpeg',
	'https://i1.wp.com/thepointsguy.com/wp-content/uploads/2019/08/HILTON-BUENA-VISTA-PALACE-POOL.jpg?fit=1024%2C1024px&ssl=1',
	'https://www.traveldatadaily.com/wp-content/uploads/2017/01/HiltonSchipholFacade_HR.jpg'
];

const getRandomHotelImage = () => {
	return hotelImages[Math.floor(Math.random() * hotelImages.length)];
};

class ReservationListItem extends Component<IReservationListItem> {
	public hotelImage = getRandomHotelImage();

	public render() {
		const {reservation} = this.props;

		return (
			<TouchableOpacity>
				<ImageBackground
					style={styles.imageBackground}
					resizeMode="cover"
					blurRadius={1}
					source={{
						uri: this.hotelImage
					}}
				>
					<View style={styles.itemContainer}>
						<Text style={styles.reservationText} numberOfLines={1}>
							{parseScopedString(reservation.name)}
						</Text>
						<Text style={styles.hotelText} numberOfLines={1}>
							{reservation.hotelName}
						</Text>
						<Text style={styles.dateText} numberOfLines={1}>
							{`${reservation.arrivalDate} - ${
								reservation.departureDate
							}`}
						</Text>
					</View>
				</ImageBackground>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	itemContainer: {
		paddingTop: 5,
		paddingBottom: 20,
		paddingLeft: 10,
		paddingRight: 10,
		justifyContent: 'flex-end',
		borderRadius: 1,
		height: 120
	},
	imageBackground: {
		height: 120,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 5,
		marginBottom: 5
	},
	reservationText: {
		fontSize: 26,
		color: 'white',
		textShadowColor: 'black',
		textShadowOffset: {width: 2, height: 2},
		textShadowRadius: 2
	},
	hotelText: {
		fontSize: 14,
		color: 'lightgray',
		textShadowColor: 'black',
		textShadowOffset: {width: 2, height: 2},
		textShadowRadius: 2
	},
	dateText: {
		textShadowColor: 'black',
		textShadowOffset: {width: 2, height: 2},
		textShadowRadius: 2,
		color: 'lightgray'
	}
});

export {ReservationListItem};
