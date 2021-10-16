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

export function getCartItem(payload){
	return {
		type: types.GET_CART_ITEM,	
		payload
	}
}

export function getCartTotalPrice(payload){
	return {
		type: types.GET_CART_TOTAL_PRICE,	
		payload
	}
}

export function getBigopti(payload){
	return {
		type: types.GET_BIGOPTI,	
		payload
	}
}

export function getOffer(payload){
	return {
		type: types.GET_OFFER,	
		payload
	}
}

export function getCoupon(payload){
	return {
		type: types.GET_COUPON,	
		payload
	}
}

export function getSettings(payload){
	return {
		type: types.GET_SETTINGS,	
		payload
	}
}

