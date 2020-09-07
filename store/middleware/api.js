import axios from "axios";
import {apiCallBegin} from "../api";

const api = (store) => (next) => async (action) => {
	if (action.type !== apiCallBegin.type) return next(action);
	next(action);
	const {url, method, data, headers, onStart, onSuccess, onError} = action.payload;
	
	if (onStart) store.dispatch({type: onStart});
	
	try {
		const response = await axios.request({
			baseURL: url,
			method,
			data,
		});
		
		if (onSuccess) store.dispatch({type: onSuccess, payload: response.data});
	} catch (error) {
		
		if (onError) store.dispatch({type: onError, payload: error.response.data});
		if (error.response) {
			/*
			 * The request was made and the server responded with a
			 * status code that falls out of the range of 2xx
			 */
			console.log("-----------ERROR.RESPONSE----------");
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
		} else if (error.request) {
			/*
			 * The request was made but no response was received, `error.request`
			 * is an instance of XMLHttpRequest in the browser and an instance
			 * of http.ClientRequest in Node.js
			 */
			console.log("-----------ERROR.REQUEST----------");
			console.log(error.request);
		} else {
			// Something happened in setting up the request and triggered an Error
			console.log("-----------ERROR.MESSAGE----------");
			console.log("Error", error.message);
		}
		console.log("-----------ERROR.CONFIG----------");
		console.log(error.config);
	}
};
export default api;
