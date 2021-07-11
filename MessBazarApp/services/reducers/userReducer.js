import * as types from '../actions/action-types'

const initialState = {
	user:[]
}

const userReducer=(state=initialState, actions)=>{
	
	switch(actions.type){
		case (types.GET_USER_LOGIN):
			return {
				...state,
				user:actions.payload
			}
		default:
			return state;
	}
}

export default userReducer;