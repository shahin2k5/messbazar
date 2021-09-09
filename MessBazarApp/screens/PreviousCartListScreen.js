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

class PreviousCartListScreen extends Component {
	
	constructor(props) {
		super(props);
		let cart_id = this.props.route.params.cart_id;
		 this.state = {
			  device_id: DeviceInfo.getUniqueId(),
			  cart_id: cart_id,
			  cartList: [], 
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
			   const cart_id = this.state.cart_id;
			   const response = await fetch(api.apiUrl+"getcartlistbycartid/"+cart_id);
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
				   
				   this.setState({
					   cartList:data.data
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
		
		this.updateToCart(this.state.product)
	}	
	
	downQnty=(product)=>{
		product.product_qnty = product.product_qnty-1
		product.subtotal_price = product.product_qnty*product.final_sale_price
		this.setState({
			product_qnty:this.state.product_qnty-1
		})
		this.updateToCart(this.state.product)
	}
	
	upPcs=(product)=>{
		product.product_pcs = product.product_pcs+1
		product.subtotal_price = product.product_qnty*product.final_sale_price
		this.setState({
			product_pcs:this.state.product_pcs-1
		})
		this.updateToCart(this.state.product)
	}	
	
	downPcs=(product)=>{
	 
		product.product_pcs = product.product_pcs-1
		product.subtotal_price = product.product_qnty*product.final_sale_price
		this.setState({
			product_pcs:this.state.product_pcs-1
		})
		this.updateToCart(this.state.product)
	}
 
	updateToCart=(product)=>{
		//console.log(product);
		  product = {
			  ...product,
			  device_id: this.state.device_id
		  };
		 
		  fetch(api.apiUrl+"cartupdate",{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify(product)
			  }).then(response=>response.json()).then(data=>{
				  console.log('cart add success data: ', data);
				  this.showToast("Product added to cart list!");
				//this.props.navigation.navigate('ShoppingCart',{device_id:this.state.uniqueId});
			  }).catch(error=>{
				  console.log('error: ', error);
			  }); 
		 
	}
   
	onPressOpenProductDetails=(productid)=>{
		this.props.navigation.navigate('Stack',{screen:'ProductDetails',params:{product:productid}});
	}
	
		
	renderShoppingCart=()=>{
		 
		return this.state.cartList.cart_item && this.state.cartList.cart_item.map((cartitem, index)=>{
			
		
			return(
			
				<Row key={index} style={{borderBottomWidth:1,borderColor:'#ccc',backgroundColor:'#ffd',paddingTop:5,paddingBottom:5}} >
				
					<Col size={10} style={{justifyContent:'center'}}>
						 
					</Col>
					 
				
				
					<Col size={17} style={{justifyContent:'center'}}>
						 <TouchableOpacity onPress={()=>this.onPressOpenProductDetails(cartitem.product)}>
							<Image source={{uri:api.apiBaseUrl+cartitem.product.image}} style={{height:40,width:40,marginLeft:5}}/>
						</TouchableOpacity>
					</Col>
					
					<Col size={83}>
						<Row>
							<Col size={90}>
								<TouchableOpacity onPress={()=>this.onPressOpenProductDetails(cartitem.product)}>
									<Text style={{fontSize:17,color:'brown',fontWeight:'bold'}}>
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
									 
									
									<Col  size={15} >
										{	 
											(<Text style={{color:'#109D9D'}}>৳{cartitem.subtotal_price}</Text>)
										}
									</Col>
								</Row>
								<Row></Row>
								
								{(cartitem.product.show_pcs_box)?
								(<Row style={{marginTop:10,marginBottom:5}}>
									<Col size={2}  style={{justifyContent:'center',borderWidth:1,borderRadius:20,backgroundColor:'#afe'}}>
										<Text style={{textAlign:'center'}}>
										<Icon name="remove" style={{fontSize:18}}/>
										</Text>
									</Col>
									<Col size={5} style={{justifyContent:'center',borderWidth:1,borderRadius:20,backgroundColor:'#fcc'}}>
										<Text style={{textAlign:'center'}}>
											 {cartitem.product_pcs?cartitem.product_pcs:0} Pcs 
										</Text>
									</Col> 
									<Col size={2}  style={{justifyContent:'center',borderWidth:1,borderRadius:20,backgroundColor:'#afe'}}>
										<Text style={{textAlign:'center'}}>
										<Icon name="add"  style={{fontSize:18}}/>
										</Text>
									</Col>
								</Row>):(<Text></Text>)}
								
								<Row></Row>
								<Row></Row>
							</Col>
							 
					
							<Col size={47} style={{justifyContent:'center'}}>
							
								<Row>
									<Col style={{justifyContent:'center'}}>
										
									</Col>
									<Col style={{justifyContent:'center'}}>
										<Text style={{textAlign:'center',borderWidth:1,paddingTop:5,paddingBottom:5,borderColor:'#444',color:'#444',marginLeft:3}}>{cartitem.product_qnty?cartitem.product_qnty:cartitem.product_qnty=1}</Text>
									</Col>
									<Col style={{justifyContent:'center'}}>
										 
									</Col>
								</Row>
							</Col>
				
							 
						</Row>
					</Col>
					
				
				</Row>
				 
		
		

		);
		});
		
		    

	}
	

  openPreviousCart=()=>{
		this.props.navigation.navigate('PreviousCart');
  }
	
  onPressOpenLoginCart=()=>{
		 
		this.props.navigation.navigate('LoginCart',{device_id:this.state.device_id});
  }
  
  showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };
  
  openCartDetailsPrepare=(cart_id)=>{
	   //this.props.navigation.navigate('Stack',{screen:'PrepareCartList',params:{cart_id}});
	     product = {
			  cart_id:cart_id,
			  device_id: this.state.device_id
		  };
		 
		  fetch(api.apiUrl+"cartaddprepare",{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify(product)
			  }).then(response=>response.json()).then(data=>{
				  console.log('cart add success data: ', data);
				  this.props.getCartList(data.data)
				  this.showToast("Previous cart is added to cart list!");
				  this.props.navigation.navigate('PrepareCartList',{cart_id:this.props.cartList.id});
			  }).catch(error=>{
				  console.log('error: ', error);
			  }); 
   }
   
   
	  
	  
  render() {
    return (
      <Container>
			<HeaderScreen navigation={this.props.navigation} title={"আগের বাজার লিস্ট"} />
			<Content style={styles.contentBar}>
				<Grid>
					{this.state.cartList.cart_item?this.renderShoppingCart():(
						<Row style={{marginTop:100}}>
							<Col style={{justifyContent:'center'}}>
								
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
						  	<Button style={{backgroundColor:'#93FC87'}} onPress={()=>{this.props.navigation.navigate('PreviousCart')}}>
							  <Icon name="arrow-back"  style={{color:'#333'}}/>
							  <Text>পেছনে</Text>
							</Button>
							
							<Button  style={{backgroundColor:'#93FC87'}}>
							  <Text>TOTAL</Text>
							  <Text>৳{this.totalSalePrice()[2]}</Text>
							</Button>
							<Button  style={{backgroundColor:'#93FC87'}}>
							  <Icon name="basket" style={{color:'#333'}} onPress={()=>{this.openCartDetailsPrepare(this.state.cart_id)}} />
							  <Text>লিস্ট তৈরী</Text>
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
	}, 
	productTitle:{
		fontWeight:'bold',
		color:'brown',
		fontSize:18
	},
	 
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviousCartListScreen);