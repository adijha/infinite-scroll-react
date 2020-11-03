import { IMAGE_DATA } from "./dataAction";
import { combineReducers } from "redux";

const imagesReducer = (state = [], action) => {
	let _state;
	switch (action.type) {
		case `${IMAGE_DATA.GET}_FULFILLED`:
			// let previous_data = state
			console.log(state, "state");
			console.log(action.payload, "payload");
			_state = [...state, ...action.payload];

			return _state;
		default:
			return state;
	}
};

const allReducers = combineReducers({
	images: imagesReducer,
});

export default allReducers;
