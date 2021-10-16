import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TouchableOpacity, ToastAndroid } from 'react-native';
import { Container, Header, Footer, FooterTab, Content, Button, Input, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import HeaderScreen from './HeaderScreen';
import DeviceInfo from 'react-native-device-info';
import * as api from '../services/apiService';
import { connect, dispatch } from 'react-redux'
import * as actions from '../services/actions/actions'
import AsyncStorage from '@react-native-async-storage/async-storage';

function mapStateToProps(state){
	return {
		cartList:state.cartReducer.cartList
	}
}

function mapDispatchToProps(dispatch){
	return { 
			getCartList:data=>dispatch(actions.getCartList(data))
	}
}


class ProductListScreen extends Component {
	
	constructor(props) {
		super(props);
		 this.state = {
			  subcatid: this.props.route.params.subcategory?this.props.route.params.subcategory:'all',
			  productList: [], 
			  error: false,
			  uniqueId : DeviceInfo.getUniqueId(),
			  product_id:'',
			  product_qnty:0,
			  product_pcs:0,
			  total_price:0,
			  total_final_price:0
		   };
		  
	  }
	  
	 componentDidMount(){
		  this.getProductList();
		}	  
		
	componentDidUpdate(){
		  //this.getProductList();
		}
		
		
	getProductList = async () => {
       try { 
			   const cartListTmp = await this.props.cartList;  
			   const totalPrice = await this.sumTotal(cartListTmp,'sub_total');
			  
				this.setState({
				  total_final_price:totalPrice
			   });	
			   
			   const subcatid = this.state.subcatid;
			   const response = await fetch(api.apiUrl+"product/list/"+subcatid);
			   if (response.ok) {
				   const data = await response.json();
				   //console.log('ProductList response data: ',data);
				   this.setState({
					   productList:data
				   })		   
			   } else { this.setState({ error: true }) }
		   } catch (e) { 
				console.log('error: ',e);
			}
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
										<Text style={styles.productTitle}>
										{product.product_title}</Text>
									</TouchableOpacity>
								</Col>
								<Col size={15}>
									<Text  style={{color:'#666'}}>{product.unit_type}</Text>
								</Col>
							</Row>
							<Row>
								<Col size={70}>
									<Row >
										 <Col  size={10} >
											{	product.discount>0?
												(<Text style={{textDecorationLine: 'line-through'}}>৳{product.sale_price}</Text>):
												(<Text style={{color:'#109D9D'}}>৳{product.final_sale_price}</Text>)}
										</Col>
										
										<Col  size={10} >
											{	product.discount?
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
											{product.product_qnty?(<Text style={{textAlign:'center',borderWidth:1,paddingTop:5,paddingBottom:5,borderColor:'#444',color:'#444'}}>{product.product_qnty?product.product_qnty:product.product_qnty=0}</Text>):(<Text></Text>)}						
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
			product_pcs:this.state.product_pcs-1
		})
	 
	}	
	
	downPcs=(product)=>{
		//console.log(product);
		if(product.product_pcs<1){
			return 0
		}
		product.product_pcs = product.product_pcs-1
		this.setState({
			product_pcs:this.state.product_pcs-1
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
				  console.log('cart add success data: ', data);
				  this.props.getCartList(data.data)
				  let total_price = this.state.total_price + product.final_sale_price;
				  this.setState({total_price});
				  this.showToast();
				//this.props.navigation.navigate('ShoppingCart',{device_id:this.state.uniqueId});
			  },error=>{
				  //console.log('error: ', error);
			  }); 
		 
	}
	
	showToast = () => {
		ToastAndroid.show("Product added to cart successfully !", ToastAndroid.SHORT);
	};	
  
	
	  onPressOpenProductDetails=(productid)=>{
		  this.props.navigation.navigate('ProductDetails',{product:productid});
	  }
	  
	  onPressCartAdd=(product)=>{
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
				  this.props.navigation.navigate('ShoppingCart',{device_id:this.state.uniqueId});
			  },error=>{
				  //console.log('error: ', error);
			  }); 
	  }
	  
	  
	 
  render() {
    return (
      <Container>
			<HeaderScreen navigation={this.props.navigation} total_price={this.state.total_final_price?this.state.total_final_price:'0.00'}  title={"পণ্যের তালিকা"} />
			<Content style={styles.contentBar}>
				<Grid>
				
					{this.state.productList.length>0?this.renderProduct():(
						<Row>
							<Col style={{justifyContent:'center',marginTop:100}}>
								<Text style={{justifyContent:'center',textAlign:'center'}}>No products are available</Text>
							</Col>
						</Row>
					)}
					
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
							
							<Button  style={{backgroundColor:'#93FC87'}}>
							  <Text></Text>
							  <Text></Text>
							</Button>
							<Button onPress={()=>{this.props.navigation.navigate('Stack',{screen:'ShoppingCart',params:{device_id:this.state.uniqueId}})}} style={{backgroundColor:'#009933',color:'#fff'}}>
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
	contentBar:{
		padding:10
	},
	itemList:{
		marginBottom:5,
		borderBottomWidth:1,
		borderColor:'#ccc'
	},
	productItemImage:{
		width:45,
		height:45,
		borderWidth:1,
		borderColor:'gray',
		padding:5,
		marginBottom:10,
		marginTop:5,
		padding:5
	},
	imgBtnControl:{
		marginTop:25,
		height:20,
		width:20
	},
	btnAddCart:{
		width:'100%',
		justifyContent:'center',
		color:'#fff'
	},
	btnAddCartTitle:{
		color:'#fff',
		fontWeight:'bold',
		fontSize:17
	},
	productTitle:{
		fontSize:18,
		fontWeight:'bold',
		color:'coral'
	},
	btnAddImage:{
		justifyContent:'center',
		textAlign:'center'
	},
	lblItemAttr:{
		color:'green',
		fontSize:18
	},
	lblItemAttrPcs:{
		fontSize:15,
		textAlign:'center'
	},	
	lblItemAttrPcsIcon:{
		fontSize:18,
		textAlign:'center'
	}
});

export default connect(mapStateToProps,mapDispatchToProps)(ProductListScreen);