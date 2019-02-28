import React, {PureComponent} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

const styles = StyleSheet.create({
	loadingContainer: {
		display: 'flex',
		alignSelf: 'stretch',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

class Loading extends PureComponent<{loading: boolean}> {
	public render() {
		const {loading, children} = this.props;
		if (loading) {
			return (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size={'large'} />
				</View>
			);
		}

		return children;
	}
}

export {Loading};
