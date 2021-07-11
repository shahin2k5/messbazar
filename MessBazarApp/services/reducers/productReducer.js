import * as types from '../actions/action-types'

const initialState = {
	productList: [],
	homepageProductList: [],
	categoryCount:5
}

const productReducer=(state=initialState, actions)=>{
	switch(actions.type){
		case types.GET_HOMEPAGE_PRODUCTS:
			return {
				...state,
				homepageProductList:actions.payload
			}
			
		 
		default:
			return state;
	}
}

export default productReducer;