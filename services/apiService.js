export const apiUrl = "http://127.0.0.1:8000/api/";

export const getCategoryAll=()=>{
	fetch(apiUrl+'category/list').then(response=>response.json()).then(data=>{
		console.log(data);
		return data;
	}).catch(error=>{
		console.log(error);
	})
}
export const categories = [
	{id:'1',title:'Ad One',image:'../assets/images/advertise-1-1.jpg'},
	{id:'2',title:'Ad two',image:'../assets/images/advertise-1-2.jpg'},
	{id:'3',title:'Ad three',image:'../assets/images/advertise-1-3.jpg'},
	{id:'4',title:'Ad four',image:'../assets/images/advertise-1-1.jpg'},
	{id:'5',title:'Ad five',image:'../assets/images/advertise-1-1.jpg'},
	{id:'6',title:'Ad six',image:'../assets/images/advertise-1-1.jpg'},
	{id:'7',title:'Ad seven',image:'../assets/images/advertise-1-1.jpg'},
	{id:'8',title:'Ad eight',image:'../assets/images/advertise-1-1.jpg'},
];