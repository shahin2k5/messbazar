import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TouchableOpacity, ToastAndroid  } from 'react-native';
import { Container, Header, Footer, FooterTab, Button, Content, Item, Input, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import HeaderScreen from './HeaderScreen';
import * as api from '../services/apiService';
import { connect } from 'react-redux'
import DeviceInfo from 'react-native-device-info';
import * as actions from '../services/actions/actions'
import AsyncStorage from '@react-native-async-storage/async-storage';

function mapStateToProps(state){
	return {
		cartList:state.cartReducer.cartList,
		productList: state.productReducer.homepageProductList,
	}
}


function mapDispatchToProps(dispatch){
	return { 
			getCartList:data=>dispatch(actions.getCartList(data)),
	}
}


class SubCategoryScreen extends Component {
	
	 constructor(props) {
		super(props);
		 this.state = {
			  subcategoryList: [], // list is empty in the beginning
			  error: false,
			  uniqueId : DeviceInfo.getUniqueId(),
			  productList: this.props.productList,
			  total_final_price:0
		   };
		isMount = false;
	  }
	  
	 componentDidMount(){
		 this.isMount = true
		  this.getSubCategoryList();
		}	  
		
	componentDidUpdate(){
		  this.isMount= true
		  //this.getSubCategoryList();
		}
		
 
		
	getSubCategoryList = async () => {
       try { 
	   
			   const cartListTmp = await this.props.cartList;  
  
			   //const totalPrice = this.sumTotal(cartListTmp,'final_sale_price');
			   const totalPrice = await this.sumTotal(cartListTmp,'sub_total');
			   //await this.props.getCartTotalPrice(totalPrice);
			  
				this.setState({
				//productList: data.product_list,
				  total_final_price:totalPrice
			   });	
				
					
			   const catid = this.props.route.params.category?this.props.route.params.category:0;
			   const response = await fetch(api.apiUrl+"subcategory/list/"+catid);
			   if (response.ok) {
				   const data = await response.json();
				   // console.log('response data: ',data);
				   if(this.isMount){
					    this.setState({
						   subcategoryList:data
					   })
				   }
				  		   
			   } else { this.setState({ error: true }) }
		   } catch (e) { 
				console.log('error: ',e);
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
		console.log('step one: ....',product)
		product.product_qnty = product.product_qnty +1;
		const totalCart = this.state.total_final_price+product.final_sale_price;
		this.setState({
			total_final_price:totalCart
		})
		let cartItems = this.props.cartList;
		//let cartItems = await this.getCartData();
		console.log('step two: ....',product)
	 
		let cartTmp =  cartItems;
		let cartIndex = cartTmp.findIndex(cart=>{
			if(cart.product_id==product.id){
				return true;
			}
		});
		if(cartIndex<0){
			cartTmp.push({
							"product_id": product.id, 
							"product_qnty": 1, 
							"product_pcs": 0, 
							"final_sale_price": product.final_sale_price,
							"sub_total": product.final_sale_price
						});
		}else{
			cartTmp[cartIndex].product_qnty = cartTmp[cartIndex].product_qnty +1 
			cartTmp[cartIndex].sub_total = cartTmp[cartIndex].sub_total +product.final_sale_price 
		}
		console.log('step three: ....',product)
		
 		
		this.showToast();
		console.log('step four: ....',product)
		this.props.getCartList(cartTmp)
		this.storeCartData(cartTmp);
		
		// console.log(
		  // cartTmp.reduce((a, b) => a[0] + b[0], 0)
		// )
		 
		//await this.props.getCartTotalPrice(totalCart);
		return true;
		
		// //console.log(product);
		// product.product_qnty = product.product_qnty+1
		// this.setState({
			 // product_qnty:this.state.product_qnty+1
		// })
		// this.addToCart(product);
	}	
	
	downQnty=async(product)=>{
			console.log(product)
		if(product.product_qnty<1){
		  return 0
		}
		product.product_qnty = product.product_qnty -1;
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
			
			  }).catch(error=>{
				console.log('error: ', error);
			}); 
		 
	}
	
	showToast = () => {
    ToastAndroid.show("Product added to cart successfully !", ToastAndroid.SHORT);
  };
   

	renderCategory=()=>{
		// return this.state.subcategoryList.map((subcategory, index)=>{
			 
			// return(
				// <TouchableOpacity key={index} size={32} style={{width:'26%',marginVertical:10,marginHorizontal:10}} onPress={()=>this.onPressOpen(subcategory.id)} >
					// <ImageBackground source={{uri:api.apiBaseUrl+subcategory.image}} style={styles.btnBackground}>
						// <Text style={{
							// fontSize:15,
							// fontWeight:'bold',
							// marginTop:85,
							// paddingBottom:0,
							// }}>{subcategory.category_title}</Text>
					// </ImageBackground>
				// </TouchableOpacity>
			 
			// );
		// });
		
		return this.state.subcategoryList && this.state.subcategoryList.map((subcategory, index)=>{
			 
			return(
				<TouchableOpacity key={index} style={{width:'30%',margin:5,padding:7,justifyContent:'center'}} onPress={()=>this.onPressOpen(subcategory.id)} >
					<View style={{paddingTop:10,paddingBottom:10,justifyContent:'center',textAlign:'center',width:'100%',backgroundColor:'#a6Fcc6',borderRadius:20,elevation:9,justifyContent:'center'}} >
						<Image source={{uri:api.apiBaseUrl+subcategory.image}}  style={styles.btnIcon}/>
						
						<Text style={{textAlign:'center',fontWeight:'bold'}}>{subcategory.category_title?subcategory.category_title.substr(0,13):''}</Text>
					</View>
				</TouchableOpacity>
			 
			);
		});
	}

	onPressOpenProductDetails=(product)=>{
		this.props.navigation.navigate('Stack',{screen:'ProductDetails',params:{product:product}});
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
						
						<Col size={83}>
							<Row>
								<Col size={90}>
									<TouchableOpacity onPress={()=>this.onPressOpenProductDetails(product)}>
										<Text style={{fontSize:16,fontWeight:'bold',color:'brown'}}>
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
											{product.product_qnty?(<Icon name="remove" onPress={()=>{this.downQnty(product)}} 
												style={styles.lblItemAttrPcsIcon,{marginLeft:'auto',marginRight:3,fontWeight:'bold',borderWidth:1,textAlign:'center',borderRadius:40,fontSize:16,backgroundColor:'#F1F1F1',borderColor:'red',margin:3,height:30,width:30,paddingTop:7,color:'red'}}/>):(<Text></Text>)}			
										</Col>
										<Col style={{justifyContent:'center'}}>
											{product.product_qnty?(<Text style={{textAlign:'center',borderWidth:1,paddingTop:5,paddingBottom:5,borderColor:'#444',color:'#444'}}>{product.product_qnty}</Text>):(<Text></Text>)}						
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
	
	
  
	
 onPressOpen=(subcategoryID)=>{
	  this.props.navigation.navigate('ProductList',{subcategory:subcategoryID});
  }
  
  render() {
    return (
      <Container>
			<HeaderScreen navigation={this.props.navigation} total_price={this.state.total_final_price?this.state.total_final_price:'0.00'}  title={"সাব ক্যাটাগরি"} />
			<Content>
				<Grid>
					<Row style={styles.btnContainer}>
						{this.state.subcategoryList?
								 (this.renderCategory())
							:
								(<Text style={{textAlign:'center',color:'#000'}}>No Sub category was found!</Text>)
						}
					</Row>
					
					<Row>
						<Col><Text style={{borderBottomWidth:1,paddingBottom:5,paddingLeft:5}}>আপনার পছন্দের কিছু পণ্য </Text></Col>
					</Row>
					{this.renderProduct()} 
					
				</Grid>
				   
			</Content>
			
				<Footer style={{
				backgroundColor:'#93FC87'}}>
				 
						  <FooterTab>
							<Button style={{backgroundColor:'#93FC87'}} onPress={()=>{this.props.navigation.navigate('Home')}}>
								<Icon name="home"  style={{color:'#333'}}/>
							  <Text>
								হোম
							  </Text>
							</Button>
							
							
							<Button onPress={()=>{this.props.navigation.navigate("Stack",{screen:'ShoppingCart',params:{device_id:this.state.uniqueId}})}} style={{backgroundColor:'#009933',color:'#fff'}}>
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
	 btnBackgroundTop: { 
		width: '95%',
		height: 60,
		justifyContent:'center',
		textAlign: "center",
		alignItems:'center',
		
	  },  
	  btnTextTop:{
		  height:20,
		  width:100,
		  marginTop:-7,
		  marginLeft:5
	  },
	  
	  btnBackground: { 
		width: '100%',
		height: 110,
		textAlign: "center",
		alignItems:'center',
		 
	  }, 
	  btnText: { 
		width: '60%',
		height: 30,
		marginTop:-10,
		resizeMode:'cover'
	  },
	    btnIcon: { 
		width: 35,
		height: 35,
		marginLeft:'30%',
		marginTop:0
	  },
	   button:{
		width:'27%',
		marginLeft:7,
		marginRight:7,
	  },
	  btnContainer:{
		  flexWrap:'wrap',
		  flexDirection:'row',
		  paddingLeft:15
	  },
	  btnTitle:{
		  fontSize:15,
		  fontWeight:'bold'
	  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryScreen);