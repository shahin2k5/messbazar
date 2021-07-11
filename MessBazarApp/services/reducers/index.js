import { combineReducers } from 'redux'
import * as types from '../actions/action-types'
import cartReducer from './cartReducer'
import categoryReducer from './categoryReducer'
import productReducer from './productReducer'
import userReducer from './userReducer'

 

const rootReducer=combineReducers({
	cartReducer, 
	categoryReducer,
	productReducer,	
	userReducer 
});
 

export default rootReducer;