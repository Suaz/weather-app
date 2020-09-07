import React from "react";
import {Text, View} from "react-native";

export default ({name}) => (
	<View style={{
		paddingHorizontal: 12,
		paddingVertical  : 4,
		backgroundColor  : 'white',
		borderRadius     : 16,
		border           : '#333333',
		borderWidth      : 2,
	}}>
		<Text style={{margin: 4}}>{name}</Text>
	</View>
)
