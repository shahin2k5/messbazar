import * as types from './action-types'

 

export function userLogin(payload){
	//console.log('userLogin payload: ', payload)
	return {
		type: types.GET_USER_LOGIN,	
		payload
	}
}

export function getCategoryList(payload){
	 
	return {
		type: types.GET_CATEGORIES,	
		payload
	}
}

export function getHomepageProductList(payload){
	return {
		type: types.GET_HOMEPAGE_PRODUCTS,	
		payload
	}
}

export function getCartList(payload){
	return {
		type: types.GET_CARTS,	
		payload
	}
}

