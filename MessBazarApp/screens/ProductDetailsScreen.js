import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TextInput, TouchableOpacity  } from 'react-native';
import { Container, Header, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {apiUrl} from '../services/apiService';
import HeaderScreen from './HeaderScreen';
import AsyncStorage from '@react-native-async-storage/async-storage'
class ProductDetailsScreen extends Component {
	
	constructor(props) {
		super(props);
		 this.state = {
			  productid: this.props.route.params.productid,
			  productDetails: [], 
			  error: false
		   };
		console.log('productid: ',this.props.route.params.productid);
		  
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
			   const response = await fetch(apiUrl+"productdetails/"+productid);
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

	
	  onPressOpen=(product)=>{
		  AsyncStorage.setItem('@cartItems',JSON.stringify(product));
		  this.props.navigation.navigate('ShoppingCart',{productid:product.id});
	  }
	  
  render() {
    return (
      <Container>
			<HeaderScreen />
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
								<Image source={{uri:`http://127.0.0.1:8000/assets/images/products/product.png`}} style={styles.productImage}/>
							</ImageBackground>
						</Col>
						 
					</Row>
					
					<Row>
						<Col size={90}>
							
								<Text style={styles.productname}>{this.state.productDetails.product_title}</Text>
								
								<Text style={styles.price}>৳{this.state.productDetails.sale_price}</Text>
							
						</Col>
						 
						<Col size={10}>
							<TouchableOpacity onPress={()=>this.onPressOpen(this.state.productDetails)}>
								<Image source={require('../assets/images/ProductDetailsScreen/plus.png')} style={styles.btnProductAdd}/>
							</TouchableOpacity>
						</Col>
						
					</Row>
					
					<Row>
						<Col>
							
							 	<Text>{this.state.productDetails.short_description}</Text>
						 
						</Col>
						 
					</Row>
					
					<Row>
						<Col>
							
							<ImageBackground source={require('../assets/images/ProductDetailsScreen/elipse.png')} style={styles.productPageLogoBackground}>
								 
								<Image source={require('../assets/images/ProductDetailsScreen/logo.png')} style={styles.productPageLogo}/>
							</ImageBackground>
						</Col>
						 
					</Row>
					 
					
				</Grid>
				   
			</Content>
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
		height: 250,
		justifyContent:'center',
		textAlign: "center",
		alignItems:'center',
		marginTop:20,
		marginBottom:20
		 
	  }, 
	 productImage: { 
		 
		 
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
		  marginLeft:'55%',
		  width:'90%'
	  },
	  productPageLogo:{
		  marginTop:30,
		  marginLeft:35,
		  marginRight:15,
	  },
	  btnProductAdd:{
		  height:30,
		  width:30
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