import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TextInput, TouchableOpacity,ToastAndroid  } from 'react-native';
import { Container, Header, Footer, FooterTab, Content,Button, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as api from '../services/apiService';
import HeaderScreen from './HeaderScreen';
import DeviceInfo from 'react-native-device-info';
import { connect, dispatch } from 'react-redux'
import * as actions from '../services/actions/actions'
import AsyncStorage from '@react-native-async-storage/async-storage';

function mapStateToProps(state){
	//console.log(' map state cartList',state.cartReducer.cartList);
	return {
		cartList:state.cartReducer.cartList,
		productList: state.productReducer.homepageProductList,
	}
}

function mapDispatchToProps(dispatch){
	return {
		getCartList:data=>dispatch(actions.getCartList(data))
	}
}

class ProductDetailsScreen extends Component {
	
	constructor(props) {
		super(props);
		 this.state = {
			  productid: this.props.route.params.product.id,
			  productDetails: this.props.route.params.product, 
			  error: false,
			  uniqueId : DeviceInfo.getUniqueId(),
			  productImg:api.apiBaseUrl+"assets/images/products/product.png",
			  product_qnty:0,
			  product_pcs:0,
			  productList: this.props.productList,
		   };
		//console.log('productid: ',this.props.route.params.productid);
		  
	  }
	  
	 componentDidMount=()=>{
		  this.getProductDetails();
		}	

	componentDidAppear = () => {
		console.log('did appear....')
		//this.getProductDetails();
	 }
			
		
	componentDidUpdate(){
		  //this.getProductDetails();
		}
		
		
	getProductDetails = async () => {
		
		 const cartListTmp = await this.props.cartList;  
			   const totalPrice = await this.sumTotal(cartListTmp,'sub_total');
			  
				this.setState({
				  total_final_price:totalPrice
			   });	
			   
       // try { 
			   // const productid = this.state.productid;
			   // const response = await fetch(api.apiUrl+"productdetails/"+productid+"/"+this.state.uniqueId);
			   // if (response.ok) {
				   // const data = await response.json();
				   // this.props.getCartList(data.carts)
				   // this.setState({
					   // productDetails:data.products
				   // })		   
			   // } else { this.setState({ error: true }) }
		   // } catch (e) { 
				// console.log('error: ',e);
			// }
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
	
	onPressCartAdd=(product)=>{
	 
		if(product.product_qnty<1){
			return 0;
		} 
		
	 
		
		  product = {
			  ...product,
			  device_id: this.state.uniqueId,
			  product_qnty:product.product_qnty
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
				  //console.log('cart add success data: ', data.data);
				  this.props.getCartList(data.data)
				  this.setState({cartList:this.props.cartList})
				  this.showToast();
				this.props.navigation.navigate('ShoppingCart',{device_id:this.state.uniqueId});
			  }).catch(error=>{
				  console.log('error: ', error);
			  }); 
		 
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
	}	
	
	downQnty=async(product)=>{
		 
		console.log(product)
		if(product.product_qnty<1){
		  return 0
		}
		product.product_qnty = product.product_qnty - 1
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
		this.props.getCartList(cartTmp)
		await this.storeCartData(cartTmp);
		
		return true;
		// //console.log(product);
		// if(product.product_qnty<1){
			// return 0
		// }
		// product.product_qnty = product.product_qnty-1
		// this.setState({
			// product_qnty:this.state.product_qnty-1
		// })
		// this.addToCart(product);
	}
	
	upPcs=(product)=>{
		//console.log(product);
		product.product_pcs = product.product_pcs+1
		this.setState({
			product_pcs:this.state.product_pcs+1,
			// productDetails:{
				// ...this.state.productDetails, 
				// product_pcs:this.state.product_pcs
			// }
		})
	 
	}	
	
	downPcs=(product)=>{
		if(product.product_pcs<1){
			return 0
		}
		//console.log(product);
		product.product_pcs = product.product_pcs-1
		this.setState({
			product_pcs:this.state.product_pcs-1,
			// productDetails:{
				// ...this.state.productDetails, 
				// product_pcs:this.state.product_pcs
			// }
		})
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
				  console.log('cart add success data: ', data.data);
				  this.props.getCartList(data.data)
				  this.setState({cartList:this.props.cartList})
				  this.showToast();
				//this.props.navigation.navigate('ShoppingCart',{device_id:this.state.uniqueId});
			  }).catch(error=>{
				  console.log('error: ', error);
			  }); 
		 
	}
	
	showToast = () => {
    ToastAndroid.show("Product added to cart successfully !", ToastAndroid.SHORT);
  };
   
   
	
	openPreviousCart=()=>{
		this.props.navigation.navigate('PreviousCart');
	}
	
	onPressOpenLoginCart=()=>{
			 
			this.props.navigation.navigate('LoginCart',{device_id:this.state.uniqueID});
	}
	
	onPressOpenProductDetails=(product)=>{
		this.setState({productDetails:product});
		//this.props.navigation.navigate('Stack',{screen:'ProductDetails',params:{product:product}});
	}


	renderCartList=(product)=>{
		product.product_qnty = 0
		const cartList = this.props.cartList
		
		 cartList.filter(cart=>{
			 
			if(product.id==cart.product_id)
			{
				product.product_qnty = cart.product_qnty;
				//return cart.product_qnty; 
			}  
		})
	}
	
 
	 renderProduct=()=>{
			return this.state.productList.map((product, index)=>{
				 
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
								<Text>{this.renderCartList(product)}</Text>
							</Col>
							<Col size={83}>
								<Row>
									<Col size={90}>
										<TouchableOpacity onPress={()=>this.onPressOpenProductDetails(product)}>
											<Text style={{fontSize:18,color:'#6E2C00',fontWeight:'bold'}}>
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
											<Col  size={10}>
												{	product.discount>0?
													(<Text style={{textDecorationLine: 'line-through'}}>৳{product.sale_price}</Text>):
													(<Text style={{color:'#109D9D'}}>৳{product.final_sale_price}</Text>)}
											</Col>
											
											<Col  size={10} >
												{	product.discount>0?
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
												{product.product_qnty?(<Icon name="remove" onPress={()=>{this.downQnty(product)}} 
													style={styles.lblItemAttrPcsIcon,{marginLeft:'auto',marginRight:3,fontWeight:'bold',borderWidth:1,textAlign:'center',borderRadius:40,fontSize:16,backgroundColor:'#F1F1F1',borderColor:'red',margin:3,height:30,width:30,paddingTop:7,color:'red'}}/>):(<Text></Text>)}			
											</Col>
											<Col style={{justifyContent:'center'}}>
												{product.product_qnty?(<Text style={{textAlign:'center',borderWidth:1,paddingTop:5,paddingBottom:5,borderColor:'#444',color:'#444',backgroundColor:'#fa9'}}>{product.product_qnty?product.product_qnty:product.product_qnty=0}</Text>):(<Text></Text>)}						
											</Col>
											<Col style={{justifyContent:'center'}}>
												<Icon name="add" onPress={()=>{this.upQnty(product)}} style={styles.lblItemAttrPcsIcon,{fontWeight:'bold',borderWidth:1,textAlign:'center',borderRadius:40,fontSize:16,backgroundColor:'#F1F1F1',borderColor:'red',margin:3,height:30,width:30,paddingTop:7,color:'red'}}/>
											</Col>
										</Row>
									</Col>
									 
									 
								</Row>
							</Col>
							
						
						</Row>
						
				);
			});
		}
	  
	  
  render() {
    return (
      <Container>
			<HeaderScreen navigation={this.props.navigation}  total_price={this.state.total_final_price?this.state.total_final_price:'0.00'} title={"পণ্যের বিবরণ"} />
			<Content style={styles.maincontent}>
				<Grid>
					 
				
					
					<Row>
						<Col>
							<ImageBackground source={require('../assets/images/ProductDetailsScreen/product-bg.png')} style={styles.productBackground}>
								<Image source={{uri:`${api.apiBaseUrl}${this.state.productDetails.image}`}} style={styles.productImage}/>
							</ImageBackground>
						</Col>
						 
					</Row>
					
					<Row>
						<Col size={90}>
							
								<Text style={styles.productname}>{this.state.productDetails.product_title}</Text>
								
							<Row>
								<Col size={35}>
								
									{	this.state.productDetails.discount>0?
													(<Text style={styles.priceDiscount}>৳{this.state.productDetails.sale_price}</Text>):
													(<Text style={styles.price}>৳{this.state.productDetails.final_sale_price}</Text>)}

								</Col>
								<Col size={35}><Text style={styles.price}>৳{this.state.productDetails.final_sale_price}</Text></Col>
									{}
									<Col size={30} style={{justifyContent:'center'}}>
										<Row>
											<Col style={{justifyContent:'center'}}>
												<Icon name="remove" onPress={()=>{this.downQnty(this.state.productDetails)}} 
													style={styles.lblItemAttrPcsIcon,{marginLeft:'auto',marginRight:3,fontWeight:'bold',borderWidth:1,textAlign:'center',borderRadius:40,fontSize:16,backgroundColor:'#F1F1F1',borderColor:'red',margin:3,height:30,width:30,paddingTop:7,color:'red'}}/>
											</Col>
											<Col style={{justifyContent:'center'}}>
												<Text style={{textAlign:'center',borderWidth:1,paddingTop:5,paddingBottom:5,borderColor:'#444',color:'#444'}}>{this.state.productDetails.product_qnty?this.state.productDetails.product_qnty:this.state.productDetails.product_qnty=0}</Text>
											</Col>
											<Col style={{justifyContent:'center'}}>
												<Icon name="add" onPress={()=>{this.upQnty(this.state.productDetails)}} style={styles.lblItemAttrPcsIcon,{fontWeight:'bold',borderWidth:1,textAlign:'center',borderRadius:40,fontSize:16,backgroundColor:'#F1F1F1',borderColor:'red',margin:3,height:30,width:30,paddingTop:7,color:'red'}}/>
											</Col>
										</Row>
									</Col>
									{}
							</Row>
							
						</Col>
						 
						
						
					</Row>
					
					<Row style={{height:130}}>
						<Col>
							 	<Text>{this.state.productDetails.short_description}</Text>
						 
						</Col>
						 
					</Row>
					
					
					 {(this.state.productDetails.show_pcs_box)?
						(<Row style={{paddingLeft:15}}>
							<Col size={10}  style={{justifyContent:'center'}}>
								<Icon name="remove" onPress={()=>{this.downPcs(this.state.productDetails)}} style={{
									fontSize:20,
									borderRadius:50,
									backgroundColor:'#eae',
									borderWidth:1,
									textAlign:'center',
									fontWeight:'bold'
									}}/>
							</Col>
							<Col size={12} style={{justifyContent:'center'}}>
								<Text style={{fontSize:20,textAlign:'center',borderRadius:20,borderWidth:1,backgroundColor:'#f8a'}}>
									 {this.state.productDetails.product_pcs?this.state.productDetails.product_pcs:0} Pcs 
								</Text>
							</Col> 
							<Col size={10}  style={{justifyContent:'center'}}>
								<Icon name="add" onPress={()=>{this.upPcs(this.state.productDetails)}} style={{fontSize:20,
									borderRadius:50,
									backgroundColor:'#eae',
									borderWidth:1,
									textAlign:'center',
									fontWeight:'bold'}}/>
							</Col>
							<Col size={40}></Col>
						</Row>):(<Text></Text>)}
						
					
					<Row>
						<Col>
							
							<ImageBackground source={require('../assets/images/ProductDetailsScreen/elipse.png')} style={styles.productPageLogoBackground}>
								
							 
								<Row  style={{height:45}}>
									 
									<Col size={40} style={{justifyContent:'center'}}>
											<Button onPress={()=>this.onPressCartAdd(this.state.productDetails)} style={{paddingLeft:20,paddingRight:20,height:45,backgroundColor:'#FF5733',borderRadius:20}}>
												<Icon name="cart"/>
												<Text style={{color:'#fff'}}>CART</Text>
											</Button>
									</Col>
								</Row>
								
								
							</ImageBackground>
						</Col>
						 
					</Row>
					
					<Row style={{marginTop:10,borderBottomWidth:1}}>
						<Col size={7} style={{justifyContent:'center'}}><Icon name="list"/></Col>
						<Col size={93} style={{justifyContent:'center',fontSize:15}}>
							<Text style={{justifyContent:'center',fontSize:15}}>পছন্দের আরও কিছু পণ্য</Text>
						</Col>
					</Row>
					 
					{this.renderProduct()} 
					
				</Grid>
				   
			</Content>
			
				<Footer style={{
				backgroundColor:'#93FC87'
			}}>
				 
						  <FooterTab>
							<Button style={{backgroundColor:'#93FC87'}} onPress={()=>{this.props.navigation.navigate('Home')}}>
								<Icon name="home"  style={{color:'#333'}}/>
							  <Text>
								হোম
							  </Text>
							 
							</Button>
							
							<Button  onPress={()=>{this.props.navigation.navigate('Category')}} style={{backgroundColor:'#93FC87'}}>
							  <Icon name="list" style={{color:'#333'}}/>
							  <Text>ক্যাটাগরি</Text>
							</Button>
							
							<Button onPress={()=>{this.onPressOpenLoginCart()}} style={{backgroundColor:'#009933',color:'#fff'}}>
							  <Icon name="basket"/>
							  <Text  style={{color:'#fff'}}>শপিং</Text>
							</Button>
						  </FooterTab>
			</Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
	maincontent:{
		padding:15
	},
	 btnBackgroundTop: { 
		width: 20,
		height: 20,
		marginTop:15,
		marginLeft:15
	  },  
	  btnTextTop:{
		  height:20,
		  width:105,
		  marginTop:-7
	  },
	  productBackground: { 
		width: '100%',
		height: 180,
		justifyContent:'center',
		textAlign: "center",
		alignItems:'center',
		marginTop:20,
		marginBottom:20
		 
	  }, 
	 productImage: { 
		width: '100%',
		height: 200
		 
	  },
	  btnText: { 
		width: '60%',
		height: 25,
		marginTop:10,
		resizeMode:'cover'
	  },
	    btnIcon: { 
		width: 45,
		height: 45,
		marginLeft:'13%',
		marginTop:-15
	  },
	 
	  textinput:{
		  backgroundColor:'#ddd'
	  },
	  productPageLogoBackground:{
		  marginTop:10,
		  marginLeft:5,
		  width:'100%',
		  height:100
	  },
	  productPageLogo:{
		  marginTop:30,
		  marginLeft:35,
		  marginRight:15,
	  },
	  btnProductAdd:{
		  height:20,
		  width:20
	  },
	  productname:{
		  color:'darkgreen',
		  fontSize:20,
		  fontWeight:'bold'
	  },
	  price:{
		  color:'coral',
		  fontSize:17,
		  fontWeight:'bold'
	  }, 
	  priceDiscount:{
		  color:'coral',
		  fontSize:17,
		  fontWeight:'bold',
		  textDecorationLine: 'line-through'
	  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsScreen);