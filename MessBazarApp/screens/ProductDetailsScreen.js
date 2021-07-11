import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TextInput, TouchableOpacity  } from 'react-native';
import { Container, Header, Footer, FooterTab, Content,Button, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as api from '../services/apiService';
import HeaderScreen from './HeaderScreen';
import DeviceInfo from 'react-native-device-info';
import NumericInput from 'react-native-numeric-input'

class ProductDetailsScreen extends Component {
	
	constructor(props) {
		super(props);
		 this.state = {
			  productid: this.props.route.params.productid,
			  productDetails: [], 
			  error: false,
			  uniqueId : DeviceInfo.getUniqueId(),
			  productImg:api.apiBaseUrl+"assets/images/products/product.png",
			  product_qnty:0,
			  product_pcs:0
		   };
		//console.log('productid: ',this.props.route.params.productid);
		  
	  }
	  
	 componentDidMount(){
		  this.getProductDetails();
		}	  
		
	componentDidUpdate(){
		  this.getProductDetails();
		}
		
		
	getProductDetails = async () => {
       try { 
			   const productid = this.state.productid;
			   const response = await fetch(api.apiUrl+"productdetails/"+productid);
			   if (response.ok) {
				   const data = await response.json();
				    
				   this.setState({
					   productDetails:data
				   })		   
			   } else { this.setState({ error: true }) }
		   } catch (e) { 
				console.log('error: ',e);
			}
	  }
	  
	  addToCart = async () => {
       try { 
			   const response = await fetch(api.apiUrl+"cartadd",{product_id:5});
			   if (response.ok) {
				   const data = await response.json();
				   console.log('response data: ',data);
				   this.setState({
					   categoryList:data
				   })		   
			   } else { this.setState({ error: true }) }
		   } catch (e) { 
				console.log('error: ',e);
			}
	  }


	
	  onPressCartAdd=(product)=>{
		   product = {
			  ...product,
			  device_id: this.state.uniqueId,
			  product_qnty:this.state.product_qnty
		  };
		  console.log(product);
		  fetch(api.apiUrl+"cartadd",{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify(product)
			  }).then(response=>response.json()).then(data=>{
				  console.log('success data: ', data);
				  this.props.navigation.navigate('ShoppingCart',{device_id:this.state.uniqueId});
			  },error=>{
				  console.log('error: ', error);
			  }); 
	  }
	  
	  updateProductQnty=(value)=>{
		  
		  console.log('updateProductQnty',value);
		  console.log('state updateProductQnty',this.state.product_qnty);
	  }
	  
	  
	  	
	upQnty=(product)=>{
		//console.log(product);
		product.product_qnty = product.product_qnty+1
		this.setState({
			 product_qnty:this.state.product_qnty+1
		})
		this.addToCart(product);
	}	
	
	downQnty=(product)=>{
		//console.log(product);
		product.product_qnty = product.product_qnty-1
		this.setState({
			product_qnty:this.state.product_qnty-1
		})
		this.addToCart(product);
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
		product.product_pcs = product.product_pcs-1
		this.setState({
			product_pcs:this.state.product_pcs-1
		})
	}
 
 
	  
	  
  render() {
    return (
      <Container>
			<HeaderScreen navigation={this.props.navigation} title={"পণ্যের বিবরণ"} />
			<Content style={styles.maincontent}>
				<Grid>
					 
					<Row>
						<Col size={10} style={{justifyContent:'center'}}>
							<Image source={require('../assets/images/ProductDetailsScreen/arrow-left.png')} style={styles.btnArrowTop}/>
						</Col>
						 
						<Col size={75}>
							 <Image source={require('../assets/images/CategoryScreen/apnar-category.png')}/>
							<Image source={require('../assets/images/CategoryScreen/Line-9.png')}/>
						</Col>
						<Col size={15}  style={{justifyContent:'center'}}>
							<Image source={require('../assets/images/ProductDetailsScreen/search.png')} style={styles.btnSearchTop}/>
						</Col>
					</Row>
					
					<Row>
						<Col>
							<ImageBackground source={require('../assets/images/ProductDetailsScreen/product-bg.png')} style={styles.productBackground}>
								<Image source={{uri:`${api.apiBaseUrl}assets/images/products/product.png`}} style={styles.productImage}/>
							</ImageBackground>
						</Col>
						 
					</Row>
					
					<Row>
						<Col size={90}>
							
								<Text style={styles.productname}>{this.state.productDetails.product_title}</Text>
								
								<Text style={styles.price}>৳{this.state.productDetails.sale_price}</Text>
							
						</Col>
						 
						
						
					</Row>
					
					<Row style={{height:130}}>
						<Col>
							 	<Text>{this.state.productDetails.short_description}</Text>
						 
						</Col>
						 
					</Row>
					
					
					 {(this.state.productDetails.show_pcs_box)?
						(<Row >
							<Col size={5}  style={{justifyContent:'center'}}>
								<Icon name="remove" onPress={()=>{this.downPcs(this.state.productDetails)}} style={{fontSize:20}}/>
							</Col>
							<Col size={12} style={{justifyContent:'center'}}>
								<Text style={{fontSize:20,textAlign:'center'}}>
									 {this.state.productDetails.product_pcs?this.state.productDetails.product_pcs:0} Pcs 
								</Text>
							</Col> 
							<Col size={10}  style={{justifyContent:'center'}}>
								<Icon name="add" onPress={()=>{this.upPcs(this.state.productDetails)}} style={{fontSize:20}}/>
							</Col>
							<Col size={40}></Col>
						</Row>):(<Text></Text>)}
						
					
					<Row>
						<Col>
							
							<ImageBackground source={require('../assets/images/ProductDetailsScreen/elipse.png')} style={styles.productPageLogoBackground}>
								
							 
								<Row>
									<Col size={20}>
									<NumericInput value={this.state.product_qnty} onChange={value =>{this.setState({product_qnty:value})}} />
									</Col>
									<Col size={40}>
											<Button onPress={()=>this.onPressCartAdd(this.state.productDetails)} style={{paddingLeft:20,paddingRight:20,height:45,backgroundColor:'#FF5733'}}>
												<Icon name="cart"/>
												<Text>CART</Text>
											</Button>
									</Col>
								</Row>
								
								
							</ImageBackground>
						</Col>
						 
					</Row>
					 
					
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
							  <Text>৳</Text>
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
		height: 150,
		justifyContent:'center',
		textAlign: "center",
		alignItems:'center',
		marginTop:20,
		marginBottom:20
		 
	  }, 
	 productImage: { 
		width: '60%',
		height: 120
		 
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
	  }
});

export default ProductDetailsScreen;