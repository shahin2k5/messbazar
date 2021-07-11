import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TouchableOpacity, TextInput, ToastAndroid  } from 'react-native';
import { Container, Header, Content, Button, Footer, FooterTab, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
 
import NumericInput from 'react-native-numeric-input'
import HeaderScreen from './HeaderScreen';
import * as api from '../services/apiService';
import DeviceInfo from 'react-native-device-info';
import { connect, dispatch } from 'react-redux' 
import * as actions from '../services/actions/actions'

function mapStateToProps(state){
	return {
		cartList:state.cartReducer.cartList
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
		let uniqueId = this.props.route.params.device_id?
		               this.props.route.params.device_id:DeviceInfo.getUniqueId();
		 this.state = {
			  device_id: uniqueId,
			  cartList: this.props.cartList, 
			  
			  error: false,
			  totalSalePrice:0,
			  totalDiscountPrice:0,
			  totalFinalSalePrice:0,
			  product_qnty:'0',
			  product_pcs:'0',
		   };
		let totalPrice;
		//console.log('productid: ',this.props.route.params.productid);
		  
	  }

	 componentDidMount(){
		  this.getCurrentCartList();
		}	  
		
	componentDidUpdate(){
		  //this.getCurrentCartList();
		}
		
		
	getCurrentCartList = async () => {
       try { 
			   const device_id = this.state.device_id;
			   const response = await fetch(api.apiUrl+"getcurrentcartlist/"+device_id);
			   if (response.ok) {
				   const data = await response.json();
				    
				   this.setState({
					   cartList:data
				   })		   
			   } else { this.setState({ error: true }) }
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
		
	removeCartItem=async(cartitemid)=>{
		if(cartitemid){
			try { 
			   const device_id = this.state.device_id;
			   const response = await fetch(api.apiUrl+"cartremove/"+cartitemid);
			   if (response.ok) {
				   const data = await response.json();
				   
				  this.props.getCartList(data.data)
				  this.setState({
					  cartList: this.props.cartList
				  })
				this.showToast("Cart item deleted successfully!");
			   } else { this.setState({ error: true }) }
		   } catch (e) { 
				console.log('error: ',e);
			}
		}
	}
	
	
	upQnty=(product)=>{
		
		product.product_qnty = product.product_qnty+1
		product.subtotal_price = product.product_qnty*product.final_sale_price
		this.setState({
			 product_qnty:this.state.product_qnty+1
		})
		
		this.updateToCart(product)
	}	
	
	downQnty=(product)=>{
		product.product_qnty = product.product_qnty-1
		product.subtotal_price = product.product_qnty*product.final_sale_price
		this.setState({
			product_qnty:this.state.product_qnty-1
		})
		this.updateToCart(product)
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
		console.log(product);
		product.product_pcs = product.product_pcs-1
		product.subtotal_price = product.product_qnty*product.final_sale_price
		this.setState({
			product_pcs:this.state.product_pcs-1
		})
		this.updateToCart(product)
	}
 
	updateToCart=(product)=>{
		//console.log(product);
		  product = {
			  ...product,
			  device_id: this.state.uniqueId
		  };
		 
		  fetch(api.apiUrl+"cartupdate",{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify(product)
			  }).then(response=>response.json()).then(data=>{
				  
				  console.log('update cart shopping:::::::', data);
				  
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
   
   
		
	renderShoppingCart=()=>{
		 
		return this.state.cartList.cart_item && this.state.cartList.cart_item.map((cartitem, index)=>{
			
			return(
			
					<Row key={index} style={{borderBottomWidth:1,borderColor:'#ccc',backgroundColor:'#efe',paddingTop:5,paddingBottom:5}}>
					
						<Col size={10} style={{justifyContent:'center'}}>
							<TouchableOpacity onPress={()=>this.removeCartItem(cartitem.id)} style={{justifyContent:'center',textAlign:'center',borderRadius:50,height:25,width:25,backgroundColor:'#d9a',marginLeft:5}} >
								<Icon name="close" color="#c2a" style={{justifyContent:'center',fontSize:15,textAlign:'center'}}  />
							</TouchableOpacity>
						</Col>
						 
					
					
						<Col size={17} style={{justifyContent:'center'}}>
							<TouchableOpacity onPress={()=>this.onPressOpen(cartitem.id)}>
								<Image source={{uri:api.apiBaseUrl+cartitem.product.image}} style={{height:40,width:40,marginLeft:5}}/>
							</TouchableOpacity>
						</Col>
						
						<Col size={83}>
							<Row>
								<Col size={90}>
									<TouchableOpacity onPress={()=>this.onPressOpenProductDetails(cartitem.product_id)}>
										<Text style={{fontSize:17}}>
										{cartitem.product.product_title} </Text>
									</TouchableOpacity>
								</Col>
								<Col size={15}>
									<Text  style={{color:'#666'}}>{cartitem.product.unit_type}</Text>
								</Col>
							</Row>
							<Row>
								<Col size={55}>
									<Row >
										<Col  size={10} >
											{	cartitem.discount>0?
												(<Text style={{textDecorationLine: 'line-through',color:'red'}}>৳{cartitem.sale_price}</Text>):
												(<Text style={{color:'#109D9D'}}>৳{cartitem.final_sale_price}</Text>)}
										</Col>
										
										<Col  size={10} >
											{	cartitem.discount?
												(<Text style={{color:'#109D9D'}}>৳{cartitem.subtotal_price}</Text>):
												(<Text style={{color:'#109D9D'}}></Text>)}
										</Col>
									</Row>
									<Row></Row>
									
									{(cartitem.product.show_pcs_box)?
									(<Row >
										<Col size={5}  style={{justifyContent:'center'}}>
											<Icon name="remove" onPress={()=>{this.downPcs(cartitem)}} style={{fontSize:18}}/>
										</Col>
										<Col size={8} style={{justifyContent:'center'}}>
											<Text>
												 {cartitem.product_pcs?cartitem.product_pcs:0} Pic 
											</Text>
										</Col> 
										<Col size={10}  style={{justifyContent:'center'}}>
											<Icon name="add" onPress={()=>{this.upPcs(cartitem)}} style={{fontSize:18}}/>
										</Col>
									</Row>):(<Text></Text>)}
									
									<Row></Row>
									<Row></Row>
								</Col>
								 
						
								<Col size={47} style={{justifyContent:'center'}}>
								
									<Row>
										<Col style={{justifyContent:'center'}}>
											<Icon name="remove" onPress={()=>{this.downQnty(cartitem)}} style={styles.lblItemAttrPcsIcon,{marginLeft:'auto',marginRight:1,fontWeight:'bold',borderWidth:1,textAlign:'center',borderRadius:40,fontSize:16,backgroundColor:'#F1F1F1',borderColor:'red',margin:3,height:30,width:30,paddingTop:7,color:'red'}}/>
										</Col>
										<Col style={{justifyContent:'center'}}>
											<Text style={{textAlign:'center',borderWidth:1,paddingTop:5,paddingBottom:5,borderColor:'#444',color:'#444',marginLeft:3}}>{cartitem.product_qnty?cartitem.product_qnty:cartitem.product_qnty=1}</Text>
										</Col>
										<Col style={{justifyContent:'center'}}>
											<Icon name="add" 
												onPress={()=>{this.upQnty(cartitem)}} 
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
								{/****<Col size={20}>
									<Row></Row>
									<Row></Row>
									<Row></Row>
									<Row>
									<Icon name="cart" 
											onPress={()=>{this.updateToCart(cartitem)}} 
											style={{
												fontWeight:'bold',
												borderWidth:1,
												textAlign:'center',
												borderRadius:40,
												fontSize:16,
												backgroundColor:'green',
												borderColor:'green',
												margin:3,
												height:30,
												width:30,
												paddingTop:7,
									color:'#fff'}}/>
									</Row>
								</Col>***/}
								 
							</Row>
						</Col>
						
					
					</Row>
					 
			
			

			);
		});
		
		    

	}
	

	onPressOpenProductDetails=(productid)=>{
			this.props.navigation.navigate('ProductDetails',{productid});
	}
	
	onPressOpenLoginCart=()=>{
			 
			this.props.navigation.navigate('LoginCart',{device_id:this.state.uniqueID});
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
			<HeaderScreen navigation={this.props.navigation} total_price={this.props.cartList?this.props.cartList.total_final_price:'0.00'}   title={"বাজার/কার্ট লিস্ট"} />
			<Content style={styles.contentBar}>
				<Grid>
					{this.state.cartList?this.renderShoppingCart():(
						<Row style={{marginTop:100}}>
							<Col style={{justifyContent:'center'}}>
								<Icon name="basket" style={{alignSelf:'center',color:'coral'}}/>
								<Text style={{textAlign:'center',color:'coral',fontSize:25}}>Cart is empty!</Text>
							</Col>
						</Row>
					)}		
				</Grid>
	 
			</Content>
			
			<Footer style={{
				backgroundColor:'#93FC87'
			}}>
				 
						  <FooterTab>
							<Button style={{backgroundColor:'#93FC87'}} onPress={()=>{this.openPreviousCart()}}>
								<Icon name="arrow-back"  style={{color:'#333'}}/>
							  <Text>
								আগের তালিকা
							  </Text>
							 
							</Button>
							
							<Button  style={{backgroundColor:'#93FC87'}}>
							  <Text>TOTAL</Text>
							  <Text>৳.{this.props.cartList?this.props.cartList.total_final_price:0.00}</Text>
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