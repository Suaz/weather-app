import {FontAwesome5} from '@expo/vector-icons';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import CityDetail from "../../components/CityDetail";
import {beforeGetCityModel, getCityData} from "../../store/appStatusReducer";


const styles = StyleSheet.create({
	container: {
		flex   : 1,
		padding: 8
	},
});

export default ({navigation}) => {
	const dispatch     = useDispatch();
	const cities       = useSelector(store => store.app.cities);
	const citiesModels = useSelector(store => store.app.citiesModels);
	
	useEffect(() => {
		dispatch(beforeGetCityModel());
		cities.forEach((item) => {
			console.log(item);
			dispatch(getCityData(item));
		});
	}, [cities]);
	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<View style={{padding: 16}}>
					<TouchableHighlight
						onPress={() => navigation.push('Search')}
						style={{padding: 8, borderRadius: 32}}
						underlayColor={'#dddddd'}
					>
						<FontAwesome5 name={'plus'} size={12}/>
					</TouchableHighlight>
				</View>
			),
		});
	}, [navigation]);
	return (
		<View style={styles.container}>
			
			{
				cities.length > 0
				? (
					<FlatList
						data={citiesModels}
						keyExtractor={(city, index) => index.toString()}
						renderItem={(city) => {
							return (
								<TouchableHighlight onPress={() => navigation.push('View', {currentCity: city.item})}>
									<CityDetail
										city={city.item}
										type={'small'}
									/>
								</TouchableHighlight>
							);
						}}
					/>
				)
				: (
					<View style={{
						padding: 24, flexDirection: 'row',
						justifyContent            : 'space-between',
						alignItems                : 'center',
						backgroundColor           : '#ffffff',
						borderRadius              : 4,
						borderWidth               : 2,
						borderColor               : '#999999',
						borderStyle               : 'dashed'
					}}>
						<Text style={{fontSize: 18, color: '#999999'}}>Agrega ciudades a tu lista</Text>
						<FontAwesome5 name={'arrow-up'} size={12} color={'#999999'}/>
					</View>
				)
			}
		
		</View>
	);
}
