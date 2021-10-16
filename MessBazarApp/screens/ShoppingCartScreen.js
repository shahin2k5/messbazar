import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, 
		 TouchableOpacity, TextInput, ToastAndroid  } from 'react-native';
import { Container, Header, Content, Button, Footer, FooterTab, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NumericInput from 'react-native-numeric-input'
import HeaderScreen from './HeaderScreen';
import * as api from '../services/apiService';
import DeviceInfo from 'react-native-device-info';
import { connect, dispatch } from 'react-redux' 
import * as actions from '../services/actions/actions'

function mapStateToProps(state){
	return {
		homepageProductList: state.productReducer.homepageProductList,
		cartList:state.cartReducer.cartList,
		user:state.userReducer.user
	}
}

function mapDispatchToProps(dispatch){
	return{
		getCartList:data=>dispatch(actions.getCartList(data))	
	}
	
}


class ShoppingCartScreen extends Component {
	
	constructor(props) {
		super(props);
		let uniqueId = DeviceInfo.getUniqueId();
		 this.state = {
			  device_id: uniqueId,
			  cartList: '', 
			  cartListProduct: "", 
			  productList: '',			  
			  error: false,
			  totalSalePrice:0,
			  totalDiscountPrice:0,
			  totalFinalSalePrice:0,
			  product_qnty:'0',
			  product_pcs:'0',
		   };
		let totalPrice;
		let isMount = false
 
		  
	  }

	 componentDidMount(){
		  isMount = true
		  this.getCurrentCartList();
		  this.cartProductFnd();		
		}	
	 componentWillUnMount(){
		  isMount = false
		}	  
		
	componentDidUpdate(){
		  //this.getCurrentCartList();
		}
		
		
	getCurrentCartList = async () => {
       try { 
				const cartListTmp = await this.getCartData();
				const total_sale = await this.sumTotal(cartListTmp,'sub_total');
				await this.setState({
					   total_final_price: total_sale,
					   cartList:cartListTmp,
					  
				   })	
					   
			   const device_id = this.state.device_id;
			   // const response = await fetch(api.apiUrl+"getcurrentcartlist/"+device_id);
			   // if (response.ok) {
				   // const data = await response.json();
				 
				await this.props.getCartList(cartListTmp);	
								   
				   
			   // } else { this.setState({ error: true }) }
		   } catch (e) { 
				console.log('error: ',e);
			}
	  }
	 

	totalSalePrice=()=> {
		   
		  let totalSalePr = 0; 
		  let totalDiscountPr = 0; 
		  let totalFinalPr = 0; 
		   this.state.cartList.cart_item && this.state.cartList.cart_item.map((cart,index)=>{
			   totalSalePr+=cart.sale_price;
			   totalDiscountPr+=cart.discount;
			   totalFinalPr+=cart.subtotal_price;
		   })
		  
		  return [totalSalePr,totalDiscountPr,totalFinalPr];
		}
		
	sumTotal=(data,field)=>{
				let total=0;
				data.length && data.map(list=>{
					total =  total + Number(list[field])
				})
				return total;
	}	
	
	removeCartItem=async(cartitemid)=>{
		if(cartitemid){
			let cartList = await this.props.cartList
			let total_sale = 0
			let cartListTmp = cartList.filter(cart=>{
				if(cart.product_id!=cartitemid){
					total_sale = total_sale + cart.sub_total
					return true
				}
			});
			
			cartList = cartListTmp
			console.log('delete cart::::',cartList)
			
			 
			//const total_sale = await this.sumTotal(cartList, 'sub_total');
			
			 await this.setState({
					 cartList:cartList,
					 total_final_price:total_sale
				 });
			await this.props.getCartList(cartList)
			await this.storeCartData(cartList);
			
			// try { 
			   // const device_id = this.state.device_id;
			   // const response = await fetch(api.apiUrl+"cartremove/"+cartitemid);
			   // if (response.ok) {
				   // const data = await response.json();
				   
				  // this.props.getCartList(data.data)
				  // this.setState({
					  // cartList: this.props.cartList
				  // })
				// this.showToast("Cart item deleted successfully!");
			   // } else { this.setState({ error: true }) }
		   // } catch (e) { 
				// console.log('error: ',e);
			// }
		}
	}
	
	sumTotal=(data,field)=>{
		let total=0;
		data.length && data.map(list=>{
			total =  total + Number(list[field])
		})
		return total;
	}
  
  	getCartData = async () => {
	  try {
		const jsonValue = await AsyncStorage.getItem('@cart_key')
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	  } catch(e) {
		console.log(e)
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
		//console.log(product)
		product.product_qnty = product.product_qnty +1;
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
			cartTmp.push({
							"product_id": product.id, 
							"product_qnty": 1, 
							"final_sale_price": product.final_sale_price,
							"sub_total": product.final_sale_price
						});
		}else{
			cartTmp[cartIndex].product_qnty = cartTmp[cartIndex].product_qnty +1 
			cartTmp[cartIndex].sub_total = cartTmp[cartIndex].sub_total +product.final_sale_price 
		}
		
		const totalCart = this.state.total_final_price+product.final_sale_price;
		
		this.setState({
			total_final_price:totalCart
		})
		console.log('product index:::', cartTmp);
		
		this.showToast();
		this.props.getCartList(cartTmp)
		await this.storeCartData(cartTmp);
		
		return true;
		
		// this.updateToCart(product)
	}	
	
	downQnty=async(product)=>{
		
		console.log(product)
		if(product.product_qnty<1){
		  return 0
		}
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
		
		this.showToast("Cart updated");
		this.props.getCartList(cartTmp)
		await this.storeCartData(cartTmp);
		
		return true;
		// product.product_qnty = product.product_qnty-1
		// product.subtotal_price = product.product_qnty*product.final_sale_price
		// this.setState({
			// product_qnty:this.state.product_qnty-1
		// })
		
		// if(product.product_qnty<1){
			// this.removeCartItem(product.id);
			// return 0
		// }
		// this.updateToCart(product)
	}
	
	upPcs=(product)=>{
		product.product_pcs = product.product_pcs+1
		product.subtotal_price = product.product_qnty*product.final_sale_price
		this.setState({
			product_pcs:this.state.product_pcs+1
		})
		this.updateToCart(product)
	}	
	
	downPcs=(product)=>{
		if(product.product_pcs<1){
			return 0
		}
		product.product_pcs = product.product_pcs-1
		product.subtotal_price = product.product_qnty*product.final_sale_price
		this.setState({
			product_pcs:this.state.product_pcs-1
		})
		this.updateToCart(product)
	}
 
	updateToCart=(product)=>{
		
		  product = {
			  ...product,
			  device_id: this.state.uniqueId
		  };
		  //console.log(product);
		  fetch(api.apiUrl+"cartupdate",{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify(product)
			  }).then(response=>response.json()).then(data=>{
				  
				  console.log('update cart shoppings:::::::===========', data);
				  
				  this.props.getCartList(data.data)
				  this.setState({
					  cartList: this.props.cartList
				  })
				   
				  this.showToast("Product added to cart list!");
				//this.props.navigation.navigate('ShoppingCart',{device_id:this.state.uniqueId});
			  }).catch(error=>{
				  console.log('error: ', error);
			  }); 
		 
	}
   
	cartProductFnd=async()=>{
			let cartList = await this.props.cartList
			let productList = await this.props.homepageProductList
			
			// if(cartList){
				// let cartProduct =  cartList.cart_item.map(cart=>{
					// let protmp =  productList.filter(pro=>{
						// if(pro.product_id==cart.id){
							// return true
						// }
					// });
					// cart= {...cart,product : protmp}
					// return cart;
					
				// });
				
			
				// console.log('shoppig page common product:::::',this.state.cartListProduct);
				// //return cartProduct;
			// }
			
				 await this.setState({
					 cartList:cartList,
					 productList:productList,
					 totalFinalSalePrice:cartList.total_final_price
				 });

	}
	
	fndProduct=(proid)=>{
		let prodList =  this.props.homepageProductList
		return prodList.filter(prod=>{
			if(prod.id==proid){
				return true;
			}
		})
	}
		
	renderShoppingCart=()=>{

		return this.state.cartList && this.state.cartList.map((cartitem, index)=>{
			const product = this.fndProduct(cartitem.product_id)[0];
			return(<Row key={index} style={{borderBottomWidth:1,borderColor:'#ccc',backgroundColor:'#efe',paddingTop:5,paddingBottom:5}} >
					
						<Col size={10} style={{justifyContent:'center'}}>
							<TouchableOpacity onPress={()=>this.removeCartItem(cartitem.product_id)} style={{justifyContent:'center',textAlign:'center',borderRadius:50,height:25,width:25,backgroundColor:'#d9a',marginLeft:5}} >
								<Icon name="close" color="#c2a" style={{justifyContent:'center',fontSize:15,textAlign:'center'}}  />
							</TouchableOpacity>
						</Col>
						 
						<Col size={17} style={{justifyContent:'center'}}>
							<TouchableOpacity onPress={()=>this.onPressOpenProductDetails(product)}>
								<Image source={{uri:api.apiBaseUrl+product.image}} style={{height:40,width:40,marginLeft:5}}/>
							</TouchableOpacity>
						</Col>
						
						<Col size={83}>
							<Row>
								<Col size={90}>
									<TouchableOpacity onPress={()=>this.onPressOpenProductDetails(product)}>
										<Text style={{fontSize:17}}>
										{product.product_title} </Text>
									</TouchableOpacity>
								</Col>
								<Col size={15}>
									<Text  style={{color:'#666'}}>{product.unit_type}</Text>
								</Col>
							</Row>
							<Row>
								<Col size={55}>
									<Row >
										 
										
										<Col  size={15} >
											{	 
												(<Text style={{color:'#109D9D'}}>৳{product.final_sale_price}</Text>)
											}
										</Col>
									</Row>
									<Row><Text>{''}</Text></Row>
									
									{(product.show_pcs_box)?
									(<Row style={{marginTop:10,marginBottom:5}}>
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
											<Icon name="remove" onPress={()=>{this.downQnty(product)}} style={styles.lblItemAttrPcsIcon,{marginLeft:'auto',marginRight:1,fontWeight:'bold',borderWidth:1,textAlign:'center',borderRadius:40,fontSize:16,backgroundColor:'#F1F1F1',borderColor:'red',margin:3,height:30,width:30,paddingTop:7,color:'red'}}/>
										</Col>
										<Col style={{justifyContent:'center'}}>
											<Text style={{textAlign:'center',borderWidth:1,paddingTop:5,paddingBottom:5,borderColor:'#444',color:'#444',marginLeft:3}}>{cartitem.product_qnty?cartitem.product_qnty:cartitem.product_qnty=1}</Text>
										</Col>
										<Col style={{justifyContent:'center'}}>
											<Icon name="add" 
												onPress={()=>{this.upQnty(product)}} 
												style={{
													fontWeight:'bold',
													borderWidth:1,
													textAlign:'center',
													borderRadius:40,
													fontSize:16,
													backgroundColor:'#F1F1F1',
													borderColor:'red',
													margin:3,
													height:30,
													width:30,
													paddingTop:7,
													color:'red'}}/>
										</Col>
									</Row>
								</Col>
								 
							</Row>
						</Col>
						
					
					</Row>);
		});
	}
	

	onPressOpenProductDetails=(productid)=>{
		this.props.navigation.navigate('Stack',{screen:'ProductDetails',params:{product:productid}});
	}
	
	onPressOpenLoginCart=()=>{
			if(this.state.cartList){
				if(this.props.user && this.props.user.id){
					this.props.navigation.navigate('CartConfirmed',{});
				}else{
					this.props.navigation.navigate('LoginCart',{device_id:this.state.uniqueID});
				}
				
			}else{
				this.showToast('কার্টে কোন পণ্য যুক্ত করা নেই')
			}
			
	}
  
  openPreviousCart=()=>{
		this.props.navigation.navigate('PreviousCart');
  }
  
  showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };
	  
	  
  render() {
    return (
      <Container>
			<HeaderScreen navigation={this.props.navigation} total_price={this.state.total_final_price?this.state.total_final_price:'0.00'}   title={"বাজার লিস্ট"} />
			<Content style={styles.contentBar}>
				<Grid>
					{this.state.cartList?this.renderShoppingCart():(<Row style={{marginTop:150,backgroundColor:'#efa'}}>
							<Col style={{justifyContent:'center'}}>
								<Icon name="basket" style={{alignSelf:'center',color:'coral'}}/>
								<Text style={{textAlign:'center',color:'coral',fontSize:25}}>কার্টে কোন পণ্য যুক্ত করা নেই!</Text>
							</Col>
						</Row>)}
				</Grid>
	 
			</Content>
			
			<Footer style={{backgroundColor:'#93FC87'}}>
				 
						  <FooterTab>
						  
							<Button style={{backgroundColor:'#93FC87'}} onPress={()=>{this.props.navigation.navigate('Home')}}>
								<Icon name="home"  style={{color:'#333'}}/>
							  <Text>
								হোম
							  </Text>
							</Button>
							
							<Button style={{backgroundColor:'#93FC87'}} onPress={()=>{this.openPreviousCart()}}>
								<Icon name="calendar"  style={{color:'#333'}}/>
							  <Text>
								আগের বাজার
							  </Text>
							 
							</Button>
							
							
							
							<Button onPress={()=>{this.onPressOpenLoginCart()}} style={{backgroundColor:'#009933',color:'#fff'}}>
							  <Icon name="basket"/>
							  <Text  style={{color:'#fff'}}>অর্ডার করুন</Text>
							</Button>
						  </FooterTab>
			</Footer>
		
      </Container>
    );
  }
}

const styles = StyleSheet.create({
	bgTxt:{
		backgroundColor:'#ddd',
		padding:5,
		textAlign:'center',
		width:'100%'
	},
	productItemImage:{
		width:'90%',
		justifyContent:'center'
	},
	btnCheckout:{
		marginBottom:10,
		color:'#fff',
		paddingLeft:20,
		paddingRight:20
	},
	rowLine:{
		paddingLeft:5,
		paddingRight:5,
		paddingTop:10,
		paddingBottom:10,
		borderTopWidth:1,
		backgroundColor:'#eee'
	},
	rowLineTwo:{
		paddingLeft:5,
		paddingRight:5,
		marginTop:-5,
		paddingBottom:10,
		backgroundColor:'#eee'
	},
	cellLabel:{
		justifyContent:'center',
		textAlign:'center'
	},
	lineNumbox:{
		paddingRight:12,
		justifyContent:'center'
	}
	 
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartScreen);