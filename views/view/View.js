import React, {useEffect, useRef} from 'react';
import {Alert, View} from "react-native";
import MapView, {Marker} from 'react-native-maps';
import {useDispatch, useSelector} from "react-redux";
import CityDetail from "../../components/CityDetail";
import CustomMarker from "../../components/CustomMarker";
import {clearMessage, removeCity} from "../../store/appStatusReducer";


export default ({navigation, route}) => {
	const {currentCity} = route.params;
	const mapRef        = useRef(null);
	const dispatch      = useDispatch();
	const message       = useSelector(store => store.app.message);
	
	useEffect(() => {
		if (message.length > 0) {
			Alert.alert(
				'Alert',
				message,
				[
					{
						text   : 'ok',
						onPress: () => {
							dispatch(clearMessage());
							navigation.goBack();
						}
					}
				],
				{cancelable: false}
			);
		}
	}, [message]);
	
	return (
		<View style={{flex: 1}}>
			<MapView ref={mapRef}
							 style={{flex: 1}}
							 initialCamera={{
								 center  : {
									 latitude : currentCity.latitude,
									 longitude: currentCity.longitude,
								 }, pitch: 2, heading: 0, altitude: 200, zoom: 14
							 }}>
				<Marker
					coordinate={{
						latitude : currentCity.latitude,
						longitude: currentCity.longitude,
					}}
				>
					<CustomMarker name={currentCity.name}/>
				</Marker>
			</MapView>
			
			<View style={{position: 'absolute', bottom: 0, padding: 16, flex: 1, flexDirection: 'row'}}>
				<CityDetail
					city={currentCity}
					type={'full'}
					onDeletePress={() => {
						dispatch(removeCity(currentCity.name));
					}}/>
			</View>
		</View>
	);
}
