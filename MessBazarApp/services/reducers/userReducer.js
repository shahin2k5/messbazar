import * as types from '../actions/action-types'

const initialState = {
	user:[],
	bigopti: [],
	offer: [],
	coupon: [],
	settings: [],
}

const userReducer=(state=initialState, actions)=>{
	
	switch(actions.type){
		case (types.GET_USER_LOGIN):
			return {
				...state,
				user:actions.payload
			}
		case (types.GET_BIGOPTI):
			return {
				...state,
				bigopti:actions.payload
			}
		case (types.GET_OFFER):
			return {
				...state,
				offer:actions.payload
			}
		case (types.GET_COUPON):
			return {
				...state,
				coupon:actions.payload
			}
		case (types.GET_SETTINGS):
			return {
				...state,
				settings:actions.payload
			}
		default:
			return state;
	}
}

export default userReducer;