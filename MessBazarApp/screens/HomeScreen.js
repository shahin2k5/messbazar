import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, DrawerLayoutAndroid,
		TouchableOpacity, ToastAndroid, TextInput  } from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Select, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SubCategoryScreen from './SubCategoryScreen';
import * as api from '../services/apiService';
import HeaderScreen from './HeaderScreen';
import { connect, dispatch } from 'react-redux' 
import SelectDropdown from 'react-native-select-dropdown'
import DeviceInfo from 'react-native-device-info';
import * as actions from '../services/actions/actions'
 
function mapStateToProps(state){

	return {
		//cartItems: state.cartReducer.cartItems,
		cartList: state.cartReducer.cartList,
		cartTotalPrice: state.cartReducer.cartTotalPrice,
		categoryList: state.categoryReducer.categoryList,
		homepageProductList: state.productReducer.homepageProductList,
		
		//categoryCount: state.categoryReducer.categoryCount,
		user: state.userReducer.user,
		//bigopti: state.userReducer.bigopti,
		//offer: state.userReducer.offer,
		//coupon: state.userReducer.coupon,
		//settings: state.userReducer.settings,
		//cartTotalFinalSalePrice:state.cartReducer.cartTotalFinalSalePrice
	}
}

function mapDispatchToProps(dispatch){
	return { 
			getCategoryList:data=>dispatch(actions.getCategoryList(data)),
			getHomepageProductLists:data=>dispatch(actions.getHomepageProductList(data)),
			getCartList:data=>dispatch(actions.getCartList(data)),
			getCartTotalPrice:data=>dispatch(actions.getCartTotalPrice(data)),
			getCartItem:data=>dispatch(actions.getCartItem(data)),
			// getBigopti:data=>dispatch(actions.getBigopti(data)),
			// getOffer:data=>dispatch(actions.getOffer(data)),
			// getCoupon:data=>dispatch(actions.getCoupon(data)),
			// getSettings:data=>dispatch(actions.getSettings(data)),
			userLogin:data=>dispatch(actions.userLogin(data))
	}
}

const productType = ["হট প্রোডাক্ট", "নতুন প্রোডাক্ট", "অফার প্রোডাক্ট","প্রোডাক্টস..."]


class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.drawer = React.createRef();
		let cateList = this.props.categoryList
		const prodList = this.props.homepageProductList

		this.state = {
			  productList: prodList,
			  categoryList: cateList,  
			  categoryListTmp: cateList,  
			  cartList: this.props.cartList,  
			  error: false,
			  product_id:'',
			  product_qnty:'0',
			  product_pcs:'0',
			  uniqueId : DeviceInfo.getUniqueId(),
			  mounted:false,
			  visible:true,
			  total_final_price:0,
		   };
	  }
	  
	componentDidMount(){
		const totalPrice = this.sumTotal(this.props.cartList,'sub_total');
		this.setState({
		  total_final_price:totalPrice
	   });	
		console.log('we are here...',totalPrice);
		  this.getCategoryrList(); 
		console.log('we are here...80::::',totalPrice);  
		  // api.getUserData().then(user=>{
			// console.log('home screen user 78::::',user)
			// this.props.userLogin(user)
		
		// }).catch(error=>console.log('homescreen-85::',error))
		
		}
	
	componentDidUpdate(){
		// if(!this.state.mounted){
			// const totalPrice = this.sumTotal(this.props.cartList,'sub_total');
			// this.setState({
			  // total_final_price:totalPrice,
			  // mounted:true
		   // });				
		// }

	   
		// if(!this.state.mounted && this.props.cartList && this.props.cartList.cart_item){
			// this.setState({
				// mounted:true,
				// cartList: this.props.cartList.cart_item?Object.entries(this.props.cartList.cart_item):[],  
			// })
		// } 

		
	}
	getCategoryrList=async()=> {
       try { 
	   //console.log(api.apiUrl+"category/list");
	   
				// const cartListTmp = await this.getCartData();  
				// if(cartListTmp){
					// const totalPrice = await this.sumTotal(cartListTmp,'sub_total');
					// this.setState({
					  // total_final_price:totalPrice
					// });	
					
					// if(cartListTmp){
						// await this.props.getCartList(cartListTmp);
					// }
				// }
			   
			  
			   fetch(api.apiUrl+"homepage/123").then(data=>data.json()).then(response=>{
				   //console.log('homescreen-123:-',response)
				   const data = response;
				   if(data.product_list){
					   //console.log('homepage response datas-130: ',data.product_list);
					   this.props.getHomepageProductLists(data.product_list);
				   }
				   if(data.category_list){
					   this.props.getCategoryList(data.category_list);
					   console.log('homescreen product list-134::',data.category_list);
				   }	   
				  
  			 
				   // this.props.getBigopti(data.bigopti);
				   // this.props.getOffer(data.offer);
				   // this.props.getCoupon(data.coupon);
				   //this.props.getSettings(data.settings);
				   //const totalPrice = this.sumTotal(cartListTmp,'final_sale_price');
				   
				   //await this.props.getCartTotalPrice(totalPrice);
				   
				}).catch(e=>{
						console.log('error-144: ',e)
						if(e.TypeError=="Network request failed"){
							this.showToast('Internet Connection Has Problem');
						}
					});
			   
			   
		   } catch (e) { 
				console.log('error-151: ',e);
			}
	  }
	  
 
	sumTotal=(data,field)=>{
		let total=0;
		data.map(list=>{
			total =  total + Number(list[field])
		})
		return total;
	}

	renderCategory=()=>{
		//console.log('render category: ', this.props.categoryList);
		return this.props.categoryList && this.props.categoryList.slice(0, 5).map((category, index)=>{
			 
			return(
				<TouchableOpacity key={index} style={{width:'30%',margin:5}} onPress={()=>this.onPressOpen(category.id)} >
					<View style={styles.btnBackground,{textAlign:'center',width:'100%',backgroundColor:'#a6Fcc6',borderRadius:20,elevation:9,justifyContent:'center'}} >
						<Image source={{uri:(api.apiBaseUrl)+category.image}} style={styles.btnIcon}/>
						
						<Text style={styles.btnTitle}>{category.category_title?category.category_title.substr(0,10):''}</Text>
					</View>
				</TouchableOpacity>
			 
			);
		});
	}
  
  onPressOpen=(categoryID)=>{
	  
		  //this.props.navigation.navigate('Stack',{screen:'ProductList',params:{subcategory:1}})
		  this.props.navigation.navigate('Stack',{screen:'SubCategory',params:{category:categoryID}});
	  
  }
  
   onPressOpenProductDetails=(product)=>{
		  this.props.navigation.navigate('Stack',{screen:'ProductDetails',params:{product:product}});
	  }
  
  searchCategory=(txt)=>{
	let categoryList =  this.state.categoryListTmp;
	let categoryListTmp =  [];
	let txtSearch = txt?txt.toLowerCase():'';
	if(txt){
		categoryListTmp = categoryList.filter(category=>category.category_title.toLowerCase().indexOf(txt)==0);
		//console.log(categoryList)
		this.setState({categoryList:categoryListTmp})	
	}else{
		this.setState({categoryList:this.state.categoryListTmp})	
	}
	
  }
  
   searchProduct=(txt)=>{
	let productList =  this.state.productList;
	 
	let productListTmp =  [];
	let txtSearch = txt?txt.toLowerCase():'';
	if(txt){
		productListTmp = productList.filter(product=>product.product_title.toLowerCase().indexOf(txt)==0);
		 
		this.setState({productList:productListTmp})	
	}else{
		this.setState({productList:this.props.homepageProductList})	
	}
	
  }
  
  
    
   filterHomepageProduct=async(txt)=>{
	let productList =  await this.props.homepageProductList;
	 
	let productListTmp =  [];
	let txtSearch = '';
	if(txt==0){
		productListTmp = productList.filter(product=>product.hot_product==1);
		 
		this.setState({productList:productListTmp})	
	}else if(txt==1){
		productListTmp = productList.filter(product=>product.new_arrival==1);
		 
		this.setState({productList:productListTmp})	
	}else if(txt==2){
		productListTmp = productList.filter(product=>product.discount_product==1);
		 
		this.setState({productList:productListTmp})	
	}else{
		this.setState({productList:this.props.homepageProductList})	
	}
	
  }
  
  
  
  	getCartData = async () => {
	  try {
		const jsonValue = await AsyncStorage.getItem('@cart_key')
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	  } catch(e) {
		console.log('No cart data found::::-',e)
	  }
	}
	
	storeCartData = async (value) => {
	  try {
		const jsonValue = JSON.stringify(value)
		await AsyncStorage.setItem('@cart_key', jsonValue)
		return jsonValue;
	  } catch (e) {
		console.log(e)
	  }
	}
	
  
	 upQnty=async(product)=>{
		console.log('step one: ....',product)
		product.product_qnty = product.product_qnty +1;
		const totalCart = this.state.total_final_price+product.final_sale_price;
		this.setState({
			total_final_price:totalCart
		})
		//let cartItems = await this.props.cartList;
		//let cartItems = await this.getCartData();
		console.log('step two: ....',product)
	 
		 
		return true;
		
	}	
	
	downQnty=async(product)=>{
		console.log(product)
		if(product.product_qnty<1){
		  return 0
		}
		product.product_qnty = product.product_qnty - 1;
		//console.log(product)
		let cartItems = await this.props.cartList;
		
		let productFnd = false
		let cartTmp = [];
		cartTmp = cartItems;
		
		let cartIndex = cartTmp.findIndex(cart=>{
			if(cart.product_id==product.id){
				return true;
			}
		});
		if(cartIndex<0){
			 
		}else{
			if(cartTmp[cartIndex].product_qnty==1){
				cartTmp.splice(cartIndex,1);
			}else{
				cartTmp[cartIndex].product_qnty = cartTmp[cartIndex].product_qnty -1 
				cartTmp[cartIndex].sub_total = cartTmp[cartIndex].sub_total - product.final_sale_price 
			}
		}
		
		const totalCart = this.state.total_final_price-product.final_sale_price;
		
		this.setState({
			total_final_price:totalCart
		})
		console.log('product index:::', cartTmp);
		
		this.showToast();
		 
		await this.storeCartData(cartTmp);
		
		return true;
	}
	
	upPcs=(product)=>{
		//console.log(product);
		product.product_pcs = product.product_pcs+1
		this.setState({
			product_pcs:this.state.product_pcs-1
		})
	 
	}	
	
	downPcs=(product)=>{
		product.product_pcs = product.product_pcs-1
		this.setState({
			product_pcs:this.state.product_pcs-1
		})
		//RNRestart.Restart();

	}
 
	addToCart=(product)=>{
		
		  product = {
			  ...product,
			  device_id: this.state.uniqueId
		  };
		  
		  //console.log(product);
		 
		  fetch(api.apiUrl+"cartadd",{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify(product)
			  }).then(response=>response.json()).then(data=>{
				  //console.log('cart add success data: ', data);
				  this.props.getCartList(data.data)
				  this.setState({cartList:Object.entries(this.props.cartList.cart_item)})
				  this.showToast();
				//this.props.navigation.navigate('ShoppingCart',{device_id:this.state.uniqueId});
			  }).catch(error=>{
				  console.log('error: ', error);
			  }); 
		 
	}
	
	showToast = () => {
		ToastAndroid.show("Product added to cart successfully !", ToastAndroid.SHORT);
	};
	
	renderCartList=(product)=>{
		// product.product_qnty = 0
		// const cartList = this.props.cartList
		
		// if(cartList.length){
			// console.log('cart list 1:::',cartList.length)
		// }else{
			// console.log('cart list 0:::',cartList.length)
		// }
		
		// if(cartList){
			 // cartList.filter(cart=>{
				 
				// if(product.id==cart.product_id)
				// {
					// product.product_qnty = cart.product_qnty;
					// return true
					// //return cart.product_qnty; 
				// }  
			// })
		// }
		return true;
	}
	
	cartListTmp=async()=>{
		let cartList = await this.props.cartList
		let productList = this.state.productList
		if(cartList){
			let cartProduct =  cartList.map(cart=>{
				let protmp =  productList.filter(pro=>{
					if(pro.product_id==cart.id){
						return true
					}
				});
				return protmp;
				
			});
			console.log('homepage common product:::::',cartProduct);
		}
		
	}
	getData = async () => {
	  try {
		const jsonValue = await AsyncStorage.getItem('@user')
		console.log('HomeScreen 290 getData::::::',jsonValue);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	  } catch(e) {
		console.log(e)
	  }
	}
	
  	renderProduct=()=>{
 
		return this.props.homepageProductList.map((product, index)=>{
			
			return(
				<Row key={index} style={{borderBottomWidth:1,borderColor:'#ccc',backgroundColor:'#efe',paddingTop:5,paddingBottom:5}}>
						<Col size={17} style={{justifyContent:'center'}}>
							<TouchableOpacity onPress={()=>this.onPressOpenProductDetails(product)}>
								<Image source={{uri:api.apiBaseUrl+product.image}} style={{
									height:45,
									width:45,
									marginLeft:5
								}}/>
							</TouchableOpacity>
						</Col>
						
						<Col size={2}>
							<Text>{}</Text>
						</Col>
						
						<Col size={83}>
							<Row>
								<Col size={90}>
									<TouchableOpacity onPress={()=>this.onPressOpenProductDetails(product)}>
										<Text style={styles.productTitle}>
										{product.product_title}</Text>
									</TouchableOpacity> 
								</Col>
								<Col size={15}>
									<Text  style={{color:'#666'}}>{product.unit_type}</Text>
								</Col>
							</Row>
							<Row>
								<Col size={55}>
									<Row >
										<Col  size={5} >
											{product.discount>0?
												(<Text style={{textDecorationLine: 'line-through'}}>৳{product.sale_price}</Text>):
												(<Text style={{color:'#109D9D'}}>৳{product.final_sale_price}</Text>)}
										</Col>
										
										<Col  size={10} >
											{product.discount>0?
												(<Text style={{color:'#109D9D'}}>৳{product.final_sale_price}</Text>):
												(<Text style={{color:'#109D9D'}}></Text>)}
										</Col>
									</Row>
									<Row></Row>
									{(product.show_pcs_box)?
									(<Row style={{marginTop:10}}>
										<Col size={2}  style={{justifyContent:'center',borderWidth:1,borderRadius:20,backgroundColor:'#afe'}}>
											<Text style={{textAlign:'center'}}>
											<Icon name="remove" onPress={()=>{this.downPcs(product)}} style={{fontSize:18}}/>
											</Text>
										</Col>
										<Col size={5} style={{justifyContent:'center',borderWidth:1,borderRadius:20,backgroundColor:'#fcc'}}>
											<Text style={{textAlign:'center'}}>
												 {product.product_pcs?product.product_pcs:0} Pcs 
											</Text>
										</Col> 
										<Col size={2}  style={{justifyContent:'center',borderWidth:1,borderRadius:20,backgroundColor:'#afe'}}>
											<Text style={{textAlign:'center'}}>
											<Icon name="add" onPress={()=>{this.upPcs(product)}} style={{fontSize:18}}/>
											</Text>
										</Col>
									</Row>):(<Text></Text>)}
									<Row></Row>
									<Row></Row>
								</Col>
								 
						
								<Col size={47} style={{justifyContent:'center'}}>
									<Row>
										<Col style={{justifyContent:'center'}}>
											{product.product_qnty?(<TouchableOpacity onPress={()=>{this.downQnty(product)}} ><Icon name="remove" onPress={()=>{this.downQnty(product)}} 
												style={styles.lblItemAttrPcsIcon,{marginLeft:'auto',marginRight:3,fontWeight:'bold',borderWidth:1,textAlign:'center',borderRadius:40,fontSize:16,backgroundColor:'#F1F1F1',borderColor:'red',margin:3,height:30,width:30,paddingTop:7,color:'red'}}/></TouchableOpacity>):(<Text></Text>)}			
										</Col>
										<Col style={{justifyContent:'center'}}>
												{product.product_qnty?
												(<Text style={{textAlign:'center',
												borderWidth:1,
												paddingTop:5,
												paddingBottom:5,
												borderColor:'#444',
												color:'#444'}}>
												{product.product_qnty}
											</Text>):(<Text></Text>)}						
										</Col>
										<Col style={{justifyContent:'center'}}>
											<TouchableOpacity onPress={()=>this.upQnty(product)} >
												<Icon name="add" onPress={()=>{this.upQnty(product)}} style={styles.lblItemAttrPcsIcon,{fontWeight:'bold',borderWidth:1,textAlign:'center',borderRadius:40,fontSize:16,backgroundColor:'#F1F1F1',borderColor:'red',margin:3,height:30,width:30,paddingTop:7,color:'red'}}/>
											</TouchableOpacity>
										</Col>
									</Row>
								</Col>	 
							</Row>
						</Col>					
					</Row>
					
			);
		});
	}
	
	
  
  render=()=>{
	
    return (
		<Container>
		  <HeaderScreen navigation={this.props.navigation} total_price={this.state.total_final_price} title={"মেস বাজার"} />
		  <Content>
				<Grid>
					<Row style={{marginTop:5,marginBottom:5}}>
						<Col style={{justifyContent:'center'}}>
							<Image source={{uri:`${api.apiBaseUrl}assets/images/mobile/logo.png`}} style={{height:40,width:'50%',marginHorizontal:10}}/>
						</Col>
						<Col style={{justifyContent:'center'}}>
						
						</Col>
						<Col style={{justifyContent:'center'}}>
										<Col>
											 <Item style={{marginLeft:10}}>
												<TextInput ref={"txtSearch"} placeholder="প্রোডাক্ট খুঁজুন" onChangeText={txt=>this.searchProduct(txt)} style={{fontSize:13}}/>
												<Icon type={"FontAwesome"} onPress={()=>{this.refs.txtSearch.focus()}} active name='search' />
											</Item>
										
										</Col>
						</Col>
					</Row>
					<Row>
						<Col>
						 <Image source={{uri:`${api.apiBaseUrl}assets/images/mobile/slider-01.jpeg`}} style={{height:150,width:'100%',borderRadius:10}}/> 
						</Col>
					</Row>
					 
					<Row style={{borderBottomWidth:.5,borderColor:'#ccc'}}>
						<Col style={{margin:5}} size={90}>
						<Text style={{textAlign:'left',marginLeft:10,color:'brown',fontSize:15,fontWeight:'bold'}}>
								ক্যাটাগরি নির্বাচন করুন
							</Text>
						</Col>
						
					</Row>
					<View style={{flex:1, flexDirection:'row',flexWrap:'wrap',justifyContent:'center',marginTop:5,marginLeft:5}}>
						{this.renderCategory()}
					</View>
					
					<Row>
					 
					<Col size={12} style={{justifyContent:'center',marginLeft:10,backgroundColor:'#84D652',borderRadius:25,paddingHorizontal:10,marginVertical:7,elevation:2,height:35}}>
							<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Stack',{screen:'Category'})}} style={{flexDirection:'row',justifyContent:'center'}}>
								<Text style={{textAlign:'center'}}>
									আরও ক্যাটাগরি
								</Text>
								<Icon type="FontAwesome" name="th-large" style={{fontSize:20,color:'#555',marginLeft:5}}/>
							</TouchableOpacity>
					</Col>
					<Col size={5}>
					
					</Col>
					<Col size={10} style={{justifyContent:'center',textAlign:'right',backgroundColor:'',borderRadius:30,height:35,marginTop:8,flexDirection:'row'}}>	 
						<SelectDropdown
						data={productType}
						onSelect={(selectedItem, index) => {
							//console.log(selectedItem, index)
							this.filterHomepageProduct(index)
						}}
						buttonTextAfterSelection={(selectedItem, index) => {
							// text represented after item is selected
							// if data array is an array of objects then return selectedItem.property to render after item is selected
							return selectedItem
						}}
						rowTextForSelection={(item, index) => {
							// text represented for each item in dropdown
							// if data array is an array of objects then return item.property to represent item in dropdown
							return item
						}}
						
						buttonStyle={{backgroundColor:'',borderRadius:30,height:35,width:'100%'}}
						buttonTextStyle={{fontSize:14}}
						defaultValueByIndex='3'
					/>
						<Icon name="chevron-down" style={{marginLeft:-40}}/>	
					</Col>
					 
					</Row>
					{this.renderProduct()}
				</Grid>
				   
			</Content>
		 
		</Container>
    );
  }
}

const styles = StyleSheet.create({
	 btnBackgroundTop: { 
		width: '100%',
		height: 40,
		justifyContent:'center',
		textAlign: "center",
	  },  
	  btnTextTop:{
		  height:20,
		  width:105,
		  marginTop:-7,
		  marginLeft:30
	  },
	  productTitle:{
		  fontWeight:'bold',
		  color:'#6E2C00',
		  fontSize:18
	  },
	  btnBackground: { 
		width: '100%',
		height: 150,
		justifyContent:'center',
		textAlign: "center",
		alignItems:'center',
		 
	  }, 
	  btnText: { 
		width: 80,
		height: 25,
		marginTop:10,
		resizeMode:'cover',
		marginBottom:10
	  },
	    btnIcon: { 
		width: 30,
		height: 30,
		marginLeft:'35%',
		marginTop:10
	  },
	   container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 16
	  },
	  navigationContainer: {
		backgroundColor: "#ecf0f1"
	  },
	  paragraph: {
		padding: 16,
		fontSize: 15,
		textAlign: "center"
	  },
	  button:{
		 margin:5,
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
		 
	  },
	  btnContainer:{
		justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
	  },
	  btnTitle:{
		  fontSize:14,
		  textAlign:'center',
		  marginBottom:6,
		  flexGrow: 1,
        flex: 1,
		flexDirection:'row'
		  
	  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen); 
