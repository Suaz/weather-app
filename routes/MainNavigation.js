import {createStackNavigator} from "@react-navigation/stack";
import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {setData} from "../store/appStatusReducer";
import {getCities, getHistory} from "../utils/StorageUtils";
import Main from "../views/main/Main";
import Search from "../views/search/Search";
import View from "../views/view/View";

const Stack = createStackNavigator();

const MainStack = () => {
	const dispatch = useDispatch();
	
	useEffect(() => {
		const action = async () => {
			const history = await getHistory();
			const cities  = await getCities();
			dispatch(setData({history, cities}));
		};
		action();
	}, []);
	
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home"
										options={{title: "Weather App", headerStyle: {elevation: 0,}}}
										component={Main}
			/>
			<Stack.Screen name="Search"
										options={{title: "Find a city", headerStyle: {elevation: 0,}}}
										component={Search}
			/>
			<Stack.Screen name="View"
										options={{title: "City details", headerStyle: {elevation: 0,}}}
										component={View}
			/>
		</Stack.Navigator>
	);
};

export default MainStack;
