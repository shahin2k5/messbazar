import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TouchableOpacity, TextInput, ToastAndroid  } from 'react-native';
import { Container, Header, Content, Button, Footer, FooterTab } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Icon } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input'
import HeaderScreen from './HeaderScreen';
import * as api from '../services/apiService';
import DeviceInfo from 'react-native-device-info';

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
		console.log(product);
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
				  // console.log('cart add success data: ', data);
				  this.showToast("Product added to cart list!");
				//this.props.navigation.navigate('ShoppingCart',{device_id:this.state.uniqueId});
			  },error=>{
				  console.log('error: ', error);
			  }); 
		 
	}
   
   
		
	renderShoppingCart=()=>{
		 
		return this.state.cartList.cart_item && this.state.cartList.cart_item.map((cartitem, index)=>{
			
			return(
			
					<Row key={index} style={{borderBottomWidth:1,borderColor:'#ccc',backgroundColor:'#efe',paddingTop:5,paddingBottom:5}}>
					
						<Col size={10} style={{justifyContent:'center'}}>
							<TouchableOpacity onPress={()=>this.removeCartItem(cartitem.id)} style={{justifyContent:'center',textAlign:'center',borderRadius:50,height:25,width:25,backgroundColor:'#d9a',marginLeft:5}} >
								<Icon name="remove" color="#c2a" style={{justifyContent:'center',fontSize:15,textAlign:'center'}}  />
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
									<TouchableOpacity onPress={()=>this.onPressOpen(cartitem.id)}>
										<Text style={styles.productTitle}>
										{cartitem.product.product_title} </Text>
									</TouchableOpacity>
								</Col>
								<Col size={15}>
									<Text  style={{color:'#666'}}>{cartitem.unit_type}</Text>
								</Col>
							</Row>
							<Row>
								<Col size={55}>
									<Row >
										<Col  size={10} >
											{	cartitem.discount>0?
												(<Text style={{textDecorationLine: 'line-through'}}>৳{cartitem.sale_price}</Text>):
												(<Text style={{color:'#109D9D'}}>৳{cartitem.final_sale_price}</Text>)}
										</Col>
										
										<Col  size={10} >
											{	cartitem.discount?
												(<Text style={{color:'#109D9D'}}>৳{cartitem.final_sale_price}</Text>):
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
												 {cartitem.product_pcs?cartitem.product_pcs:0} Pcs 
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
											<Icon name="remove" onPress={()=>{this.downQnty(cartitem)}} style={styles.lblItemAttrPcsIcon,{fontWeight:'bold',borderWidth:1,textAlign:'center',borderRadius:40,fontSize:16,backgroundColor:'#F1F1F1',borderColor:'red',margin:3,height:30,width:30,paddingTop:7,color:'red'}}/>
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
		 
		this.props.navigation.navigate('LoginCart',{device_id:this.state.uniqueID});
  }
  
  showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };
	  
	  
  render() {
    return (
      <Container>
			<HeaderScreen navigation={this.props.navigation} title={"আগের বাজার লিস্ট"} />
			<Content style={styles.contentBar}>
				<Grid>
					{this.state.cartList.cart_item?this.renderShoppingCart():(
						<Row style={{marginTop:100}}>
							<Col style={{justifyContent:'center'}}>
								<Icon name="remove-shopping-cart"/>
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
							  <Text>৳{this.totalSalePrice()[2]}</Text>
							</Button>
							<Button  style={{backgroundColor:'#009933',color:'#fff'}}>
							  <Text  style={{color:'#fff'}}></Text>
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

export default PreviousCartListScreen;