export const apiUrl = "http://127.0.0.1:8000/api/";
export const apiBaseUrl = "http://127.0.0.1:8000/";
//export const apiUrl = "https://messbazar.hostvelly.com/public/api/";
//export const apiBaseUrl = "https://messbazar.hostvelly.com/public/";

export const getCategoryAll=()=>{
	fetch(apiUrl+'category/list').then(response=>response.json()).then(data=>{
		console.log(data);
		return data;
	}).catch(error=>{
		console.log(error);
	})
}
 