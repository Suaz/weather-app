import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import MainNavigation from "./routes/MainNavigation";
import configureStore from "./store/configureStore";

export default function App() {
	const store = configureStore();
	
	return (
		<Provider store={store}>
			<NavigationContainer>
				<MainNavigation/>
			</NavigationContainer>
		</Provider>
	);
}

