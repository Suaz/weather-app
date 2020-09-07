import React from "react";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding        : 16,
		marginBottom   : 8,
		borderRadius   : 8,
		elevation      : 2,
		flex           : 1
	}
});

export default ({city, type, onSavePress, onDeletePress}) => (
	<View style={styles.container}>
		<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
			<View>
				<Text style={{fontSize: 24}}>{city.name}</Text>
				{
					type === 'full' && <>
						<Text style={{fontSize: 18}}>Humedad: {city.humidity}</Text>
						<Text style={{fontSize: 18}}>Presion: {city.pressure}</Text>
					</>
				}
			</View>
			
			<View style={{alignItems: 'flex-end'}}>
				<Text style={{fontSize: 48}}>{parseInt(city.temperature)}°</Text>
				{
					type === 'full' &&
					<View style={{flexDirection: 'row'}}>
						<Text style={{fontSize: 18}}>{parseInt(city.temperatureMin)}°</Text>
						<Text style={{fontSize: 18, marginHorizontal: 4}}>|</Text>
						<Text style={{fontSize: 18}}>{parseInt(city.temperatureMax)}°</Text>
					</View>
				}
			
			</View>
		</View>
		{
			type === 'full' && (onSavePress || onDeletePress) &&
			<View>
				<View style={{height: 1, backgroundColor: '#bbbbbb', marginVertical: 8}}/>
				{
					onSavePress &&
					<TouchableHighlight
						style={{
							padding        : 12,
							justifyContent : 'center',
							alignItems     : 'center',
							backgroundColor: '#0092dd',
							borderRadius   : 4,
							marginVertical : 4,
						}}
						underlayColor={'#58c1ff'}
						onPress={onSavePress}
					>
						<Text style={{color: 'white'}}>GUARDAR</Text>
					</TouchableHighlight>
				}
				{
					onDeletePress &&
					<TouchableHighlight
						style={{
							padding        : 12,
							justifyContent : 'center',
							alignItems     : 'center',
							backgroundColor: '#b7001d',
							borderRadius   : 4,
							marginVertical : 4
						}}
						underlayColor={'#ff4f56'}
						onPress={onDeletePress}
					>
						<Text style={{color: 'white'}}>ELIMINAR</Text>
					</TouchableHighlight>
				}
			
			</View>
		}
	
	</View>
)
