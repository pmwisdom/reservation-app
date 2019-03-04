import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {client} from './client';
import {AppNavigator} from './navigator';

export default class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<AppNavigator />
			</ApolloProvider>
		);
	}
}
