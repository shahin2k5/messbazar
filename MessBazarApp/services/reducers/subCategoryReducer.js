import * as types from '../actions/action-types'

const initialState = {
	categoryList: [],
	categoryCount:5
}

const categoryReducer=(state=initialState, actions)=>{
	switch(actions.type){
		case actions.type==types.GET_CATEGORIES:
			return {
				...state,
				categoryList:state.categoryList.push(actions.payload)
			}
		default:
			return state;
	}
}

export default categoryReducer;