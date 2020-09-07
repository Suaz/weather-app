import AsyncStorage from '@react-native-community/async-storage';

const INDEX_HISTORY = 'history';
const INDEX_CITY    = 'cities';

/*
 *
 * Cities saved by searching
 *
 * */

export const getHistory = async () => {
	try {
		let history = await AsyncStorage.getItem(INDEX_HISTORY);
		if (history === null) history = JSON.stringify([]);
		return JSON.parse(history);
	} catch (e) {
		// saving error
	}
};
export const setHistory = async (cities) => {
	try {
		await AsyncStorage.setItem(INDEX_HISTORY, JSON.stringify(cities));
	} catch (e) {
		// saving error
	}
};

/*
 *
 * Cities saved by user
 *
 * */

export const getCities = async () => {
	try {
		let cities = await AsyncStorage.getItem(INDEX_CITY);
		if (cities === null) cities = JSON.stringify([]);
		return JSON.parse(cities);
	} catch (e) {
		// saving error
	}
};
export const setCities = async (cities) => {
	console.log(cities);
	try {
		await AsyncStorage.setItem(INDEX_CITY, JSON.stringify(cities));
	} catch (e) {
		// saving error
	}
};
