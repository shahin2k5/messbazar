import * as types from '../actions/action-types'

const initialState = {
	cartList: [],
	cartItems: [],
	cartTotalPrice: '',
	// cartMainData:[],
	// cartProductCount:0,
	// cartTotalSalePrice:0,
	// cartTotalDiscountPrice:0,
	// cartTotalFinalSalePrice:5,
}

const cartReducer=(state=initialState, actions)=>{
	
	switch(actions.type){
		case types.GET_CARTS:
			return {
				cartList:actions.payload
			};
			
		case types.GET_CART_ITEM:
			return {
				...state,
				cartItems:actions.payload
			};
			
			case types.GET_CART_TOTAL_PRICE:
			return {
				...state,
				cartTotalPrice:actions.payload
			};
		
		case actions.type==types.GET_CART_PRODUCT_COUNT:
			return {
				...state,
				cartProductCount:state.cartProductCount.push(actions.payload)
			};
			
		case actions.type==types.GET_CART_TOTAL_SALE_PRICE:
			return {
				...state,
				cartTotalSalePrice:state.cartTotalSalePrice.push(actions.payload)
			};
			
		case actions.type==types.GET_CART_TOTAL_DISCOUNT_PRICE:
			return {
				...state,
				cartTotalDiscountPrice:state.cartTotalDiscountPrice.push(actions.payload)
			};
			
		case actions.type==types.GET_CART_TOTAL_FINAL_SALE_PRICE:
			return {
				...state,
				cartTotalFinalSalePrice:state.cartTotalFinalSalePrice.push(actions.payload)
			};
			
		default:
			return state;
	}
}

export default cartReducer;