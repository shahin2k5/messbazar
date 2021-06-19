import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Input, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';


class ProductListScreen extends Component {
	
	constructor(props) {
		super(props);
		 this.state = {
			  subcatid: this.props.route.params.subcategory,
			  productList: [], 
			  error: false
		   };
		console.log(this.props.route.params.subcategory);
		  
	  }
	  
	 componentDidMount(){
		  this.getProductList();
		}	  
		
	componentDidUpdate(){
		  this.getProductList();
		}
		
		
	getProductList = async () => {
       try { 
			   const subcatid = this.state.subcatid;
			   const response = await fetch("http://127.0.0.1:8000/api/product/list/"+subcatid);
			   if (response.ok) {
				   const data = await response.json();
				   //console.log('response data: ',data);
				   this.setState({
					   productList:data
				   })		   
			   } else { this.setState({ error: true }) }
		   } catch (e) { 
				console.log('error: ',e);
			}
	  }

	renderProduct=()=>{
		return this.state.productList.map((product, index)=>{
			var icon = product.image;
			return(
				<Row key={index} style={styles.itemList}>
						<Col size={25}>
							<TouchableOpacity onPress={()=>this.onPressOpen(product.id)}>
								<Image source={require('../assets/images/ProductDetailsScreen/cow_meat.png')} style={styles.productItemImage}/>
							</TouchableOpacity>
						</Col>
						
						<Col size={70}>
							<Row>
								<Col size={70}>
									<TouchableOpacity onPress={()=>this.onPressOpen(product.id)}>
										<Text style={styles.productTitle}>{product.product_title}</Text>
									</TouchableOpacity>
								</Col>
								
							</Row>
							<Row>
								
								<Col>
									<Text style={styles.lblItemAttr}>Price</Text>
								</Col>
								<Col>
									<Text  style={styles.lblItemAttr}>৳{product.product_sale_price}</Text>
								</Col>
								
								 
								 
							</Row>
						</Col>
						
						<Col size={15}>
							<Row>
								<Col style={styles.btnAddImage}>
									<Image source={require('../assets/images/ProductDetailsScreen/plus.png')} style={styles.imgBtnControl}/>
								</Col>
							</Row>
							 
							 
						</Col>
					</Row>
					
			);
		});
	}
	
	  onPressOpen=(productid)=>{
		  this.props.navigation.navigate('ProductDetails',{productid:productid});
	  }
	  
	 
  render() {
    return (
      <Container>
			<Header />
			<Content style={styles.contentBar}>
				<Grid>
				
					{this.renderProduct()}
					
				</Grid>
				   
			</Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
	contentBar:{
		padding:20
	},
	itemList:{
		marginBottom:5,
		borderBottomWidth:1,
		borderColor:'#ccc'
	},
	productItemImage:{
		width:75,
		height:75,
		borderWidth:1,
		borderColor:'gray',
		padding:5,
		marginBottom:10,
		marginTop:5,
		padding:5
	},
	imgBtnControl:{
		marginTop:15,
		height:30,
		width:30
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
		fontSize:20,
		fontWeight:'bold',
		color:'coral'
	},
	btnAddImage:{
		justifyContent:'center'
	},
	lblItemAttr:{
		color:'green',
		fontSize:18
	}
});

export default ProductListScreen;