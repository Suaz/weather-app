import {FontAwesome5} from '@expo/vector-icons';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, Text, TextInput, TouchableHighlight, View} from "react-native";
import MapView, {Marker} from 'react-native-maps';
import {useDispatch, useSelector} from "react-redux";
import CustomMarker from "../../components/CustomMarker";
import {addCity, clearHistory, clearMessage, findCityWeather} from "../../store/appStatusReducer";

export default () => {
	const dispatch          = useDispatch();
	const findCity          = (q) => {
		if (q || query.length > 0) {
			dispatch(findCityWeather(q ? q : query));
			setQuery('');
		}
	};
	const textRef           = useRef(null);
	const mapRef            = useRef(null);
	const [query, setQuery] = useState('');
	const history           = useSelector(store => store.app.history);
	const current           = useSelector(store => store.app.currentCity);
	const loading           = useSelector(store => store.app.loading);
	const message           = useSelector(store => store.app.message);
	const [focus, setFocus] = useState(false);
	
	useEffect(() => {
		if (message.length > 0) {
			Alert.alert(
				'Alert',
				message,
				[
					{
						text   : 'ok',
						onPress: () => dispatch(clearMessage())
					}
				],
				{cancelable: false}
			);
		}
	}, [message]);
	
	useEffect(() => {
		if (current.name)
			mapRef.current.animateCamera({
				center  : {
					latitude : current.latitude,
					longitude: current.longitude,
				}, pitch: 2, heading: 0, altitude: 200, zoom: 14
			}, 500);
	}, [current]);
	
	return (
		<View style={{flex: 1}}>
			<MapView ref={mapRef} style={{flex: 1}}>
				{
					current.name &&
					<Marker
						coordinate={{
							latitude : current.latitude,
							longitude: current.longitude,
						}}
					>
						<CustomMarker name={current.name}/>
					</Marker>
				}
			</MapView>
			
			<View style={{position: 'absolute', top: 0, left: 0, right: 0, padding: 8, flexDirection: 'column'}}>
				<View style={{
					backgroundColor: 'white',
					padding        : 8,
					borderRadius   : 4,
					flex           : 1,
					flexDirection  : 'row',
					justifyContent : 'center',
					alignItems     : 'center',
					elevation      : 3
				}}>
					<TextInput style={{flex: 1}}
										 ref={textRef}
										 placeholder={'buscar...'}
										 onChangeText={text => setQuery(text)}
										 onBlur={() => {
											 setFocus(false);
											 findCity();
										 }}
										 value={query}
										 onFocus={() => setFocus(true)}
					/>
					<FontAwesome5 name={loading ? "clock" : "search"} size={14} style={{padding: 4}}/>
				</View>
				{
					focus && history.length > 0 &&
					<View style={{padding: 8, backgroundColor: '#ffffff', borderRadius: 4}}>
						{
							history.map((item, index) => (
								<TouchableHighlight
									key={index}
									style={{padding: 8,}}
									onPress={() => {
										findCity(item);
										textRef.current.blur();
									}}
								>
									<Text key={index}>{item}</Text>
								</TouchableHighlight>
							))
						}
						<View style={{backgroundColor: '#dcdcdc', height: 1, marginVertical: 4}}/>
						<TouchableHighlight
							style={{padding: 8,}}
							onPress={() => {
								dispatch(clearHistory());
							}}
						>
							<Text>Limpiar historial</Text>
						</TouchableHighlight>
					</View>
				}
			
			</View>
			< View style={{position: 'absolute', bottom: 0, padding: 16, flex: 1, flexDirection: 'row'}}>
				{!focus && current.name &&
				 <CityDetail city={current}
										 type={'full'}
										 onSavePress={() => dispatch(addCity(current.name))}
				 />}
			</View>
		</View>
	);
}
