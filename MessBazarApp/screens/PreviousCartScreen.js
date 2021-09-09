import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TouchableOpacity, TextInput, ToastAndroid  } from 'react-native';
import { Container, Header, Content, Button, Footer, FooterTab } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Icon } from 'react-native-elements';
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

class PreviousCartScreen extends Component {
	
	constructor(props) {
		super(props);
		let uniqueId = DeviceInfo.getUniqueId();
		 this.state = {
			  device_id: uniqueId,
			  cartList: [], 
			  error: false,
			  totalSalePrice:0,
			  totalDiscountPrice:0,
			  totalFinalSalePrice:0,
			  product_qnty:'0',
			  product_pcs:'0',
		   };
		let totalPrice;
		  
	  }

	 componentDidMount(){
		  this.getPreviousCartList();
		}	  
		
	componentDidUpdate(){
		  //this.getCurrentCartList();
		}
		
		
	getPreviousCartList = async () => {
       try { 
			   const device_id = this.state.device_id;
			   const response = await fetch(api.apiUrl+"getpreviouscartlist/"+device_id);
			   if (response.ok) {
				   const data = await response.json();
				   console.log('previous cart: ',data);
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
 
	 
   
   openCartDetails=(cart_id)=>{
	   this.props.navigation.navigate('PreviousCartList',{cart_id});
   }
   
   openCartDetailsPrepare=(cart_id)=>{
	   //this.props.navigation.navigate('Stack',{screen:'PrepareCartList',params:{cart_id}});
	     product = {
			  cart_id:cart_id,
			  device_id: this.state.uniqueId
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
   
		
	renderShoppingCart=()=>{
		 
		return this.state.cartList && this.state.cartList.map((cartitem, index)=>{
			
			return(
			
					<Row key={index} style={{borderBottomWidth:1,borderColor:'#ccc',backgroundColor:'#efe',padding:5,paddingBottom:5,paddingLeft:10}}>
						
						<Col size={5} style={{justifyContent:'center'}}>
							<Text>{cartitem.id}</Text>
						</Col>
						
						<Col size={20} style={{justifyContent:'center'}}>
							<Text>{new Date(cartitem.created_at).toLocaleDateString('en-GB', {year: "long"})}</Text>
						</Col>
						
						<Col size={10} style={{justifyContent:'center'}}>
							<Text>{cartitem.product_qnty}</Text>
						</Col>
						
						<Col size={15} style={{justifyContent:'center'}}>
							<Text>{cartitem.total_final_price}</Text>
						</Col>
						
						<Col size={20} style={{justifyContent:'center'}}>
							<Text>{cartitem.cart_status.substr(0,10)}</Text>
						</Col>
						
						<Col size={10}>
							<Text style={{fontSize:20}}>
								<Icon name="list"  color={'chocolate'} onPress={()=>{this.openCartDetails(cartitem.id)}} />
							</Text>
						</Col>
						
						
					
					</Row>
					 
			
			

			);
		});
		
		    

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
			<HeaderScreen navigation={this.props.navigation} title={"আগের বাজার"} />
			<Content style={styles.contentBar}>
				<Grid>
				
					<Row  style={{borderBottomWidth:1,borderColor:'#ccc',backgroundColor:'lime',padding:5,paddingBottom:5,paddingLeft:10}}>
						
						<Col size={10} style={{justifyContent:'center'}}>
							<Text>Cart ID</Text>
						</Col>
						
						<Col size={20} style={{justifyContent:'center'}}>
							<Text style={{textAlign:'center'}}>Date</Text>
						</Col>
						
						<Col size={10} style={{justifyContent:'center'}}>
							<Text>Qnty</Text>
						</Col>
						
						<Col size={15} style={{justifyContent:'center'}}>
							<Text>Amount</Text>
						</Col>
						
						<Col size={20} style={{justifyContent:'center'}}>
							<Text>Status</Text>
						</Col>
						
						<Col size={10}>
							<Text style={{justifyContent:'center'}}>
								Details
							</Text>
						</Col>
						
					
					</Row>
					
					{this.state.cartList?this.renderShoppingCart():(
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
							<Button style={{backgroundColor:'#93FC87'}} onPress={()=>{this.props.navigation.navigate('Home')}}>
								<Icon name="home"  style={{color:'#333'}}/>
								  <Text>
									হোম
								  </Text>
							 
							</Button>
							
							<Button  style={{backgroundColor:'#93FC87'}}>
							  <Text></Text>
							  <Text> </Text>
							</Button>
							<Button onPress={()=>{}} style={{backgroundColor:'#009933',color:'#fff'}}>
							  
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

export default connect(mapStateToProps, mapDispatchToProps)(PreviousCartScreen);