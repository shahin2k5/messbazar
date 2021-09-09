import AsyncStorage from '@react-native-async-storage/async-storage';
 //export const apiUrl = "http://127.0.0.1:8000/api/";
 //export const apiBaseUrl = "http://127.0.0.1:8000/";
export const apiUrl = "https://messbazar.hostvelly.com/public/api/";
export const apiBaseUrl = "https://messbazar.hostvelly.com/public/";

	export const getUserData = async () => {
	  try {
		const jsonValue = await AsyncStorage.getItem('@user_key')
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	  } catch(e) {
		console.log(e)
	  }
	}
	
	export const storeUserData = async (value) => {
	  try {
		const jsonValue = JSON.stringify(value)
		await AsyncStorage.setItem('@user_key', jsonValue)
		return jsonValue;
	  } catch (e) {
		console.log(e)
	  }
	}