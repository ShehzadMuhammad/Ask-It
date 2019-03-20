import { GET_POSTS, DELETE_POST, ADD_POST, POSTS_LOADING } from '../actions/types';
const initialState = {
	postItems: [],
	loading: false
}

export default function(state = initialState, action){
	switch(action.type){
		case GET_POSTS:
			return {
				...state,
				postItems: action.payload,
				loading: false
			};
		case ADD_POST:
			return {
				...state,
				postItems: [action.payload, ...state.postItems]
			};
		case DELETE_POST:
			return {
				...state,
				postItems: state.postItems.filter(post => post._id !== action.payload)
			};
		case POSTS_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;	
	}
}