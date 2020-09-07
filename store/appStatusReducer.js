import {createSlice} from '@reduxjs/toolkit';
import {setCities, setHistory} from "../utils/StorageUtils";
import {URL_WEATHER} from "../utils/url";
import {apiCallBegin} from "./api";

const slice    = createSlice(
	{
		name        : 'appStatus',
		initialState: {
			loading     : false,
			cities      : [], //cities names
			citiesModels: [], //cities data
			history     : [],
			currentCity : {},
			message     : '',
		},
		reducers    : {
			setData           : (state, action) => {
				state.history = action.payload.history;
				state.cities  = action.payload.cities;
			},
			addCity           : (state, action) => {
				state.message = 'Guardado exitosamente';
				state.cities.push(action.payload);
				const runAction = async (cities) => {
					await setCities(cities);
				};
				runAction(state.cities);
			},
			removeCity        : (state, action) => {
				state.message = 'Ciudad removida';
				state.cities  = state.cities.filter(city => city !== action.payload);
				console.log(state);
				const runAction = async (cities) => {
					await setCities(cities);
				};
				runAction(state.cities);
			},
			beforeGetCityModel: (state, action) => {
				state.citiesModels = [];
			},
			addCityModel      : (state, action) => {
				state.citiesModels.push({
					name          : action.payload.name,
					temperature   : action.payload.main.temp,
					temperatureMax: action.payload.main.temp_max,
					temperatureMin: action.payload.main.temp_min,
					humidity      : action.payload.main.humidity,
					pressure      : action.payload.main.pressure,
					latitude      : action.payload.coord.lat,
					longitude     : action.payload.coord.lon,
				});
			},
			clearHistory      : (state, action) => {
				state.history   = [];
				const runAction = async () => {
					await setHistory([]);
				};
				runAction(state.cities);
			},
			onFindCityStart   : (state, action) => {
				state.loading = true;
			},
			onFindCitySuccess : (state, action) => {
				state.currentCity = {
					name          : action.payload.name,
					temperature   : action.payload.main.temp,
					temperatureMax: action.payload.main.temp_max,
					temperatureMin: action.payload.main.temp_min,
					humidity      : action.payload.main.humidity,
					pressure      : action.payload.main.pressure,
					latitude      : action.payload.coord.lat,
					longitude     : action.payload.coord.lon,
				};
				state.history     = state.history.filter((currentCity) => currentCity !== action.payload.name);
				state.history.push(action.payload.name);
				if (state.history.length > 5) state.history.shift();
				
				// saving on local storage
				const runAction = async (history) => {
					await setHistory(history);
				};
				runAction(state.history);
				state.loading = false;
			},
			onFindCityFail    : (state, action) => {
				state.loading = false;
			},
			clearMessage      : (state, action) => {
				state.message = '';
			}
		}
	}
);
export const {
							 setData,
							 addCity,
							 removeCity,
							 addCityModel,
							 beforeGetCityModel,
							 onFindCityStart,
							 onFindCitySuccess,
							 onFindCityFail,
							 clearHistory,
							 clearMessage,
						 } = slice.actions;

export const findCityWeather = (query) => (dispatch, getState) => {
	console.log('dispatching');
	dispatch(
		apiCallBegin({
			url      : URL_WEATHER(query),
			onStart  : onFindCityStart.type,
			onSuccess: onFindCitySuccess.type,
			onFail   : onFindCityFail.type,
			method   : "get",
		})
	);
};

export const getCityData = (city) => (dispatch, getState) => {
	console.log('dispatching city data');
	dispatch(
		apiCallBegin({
			url      : URL_WEATHER(city),
			// onStart  : onFindCityStart.type,
			onSuccess: addCityModel.type,
			onFail   : onFindCityFail.type,
			method   : "get",
		})
	);
};

export default slice.reducer;
