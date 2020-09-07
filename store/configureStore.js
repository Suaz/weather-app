import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {combineReducers} from "redux";
import appStatusReducer from "./appStatusReducer";

import api from "./middleware/api";

const reducers = combineReducers({
	app: appStatusReducer,
});

export default () => {
	return configureStore({
		reducer   : reducers,
		middleware: [...getDefaultMiddleware(), api]
	});
};
