import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TouchableOpacity  } from 'react-native';
import { Container, Header, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import AsyncStorage from '@react-native-async-storage/async-storage'

class ShoppingCartScreen extends Component {
	
	
  onPressOpen=()=>{
		let cartProducts = AsyncStorage.getItem('@cartItems');
		console.log('cart products: ',JSON.parse(cartProducts));
		//this.props.navigation.navigate('ProductDetails',{productid:productid});
  }
	  
	  
  render() {
    return (
      <Container>
			<Header/>
			<Content style={styles.contentBar}>
				<Grid>
					<Row style={{marginTop:10}}>
						<Col size={7} style={{justifyContent:'center'}}>
							<Image source={require('../assets/images/ProductDetailsScreen/plus.png')} style={styles.imgBtnControl}/>
						</Col>
						<Col size={10}>
							<TouchableOpacity onPress={()=>this.onPressOpen()}>
							<Image source={require('../assets/images/ProductDetailsScreen/cow_meat.png')} style={styles.productItemImage}/>
							</TouchableOpacity>
						</Col>
						<Col  size={50}>
							<Text style={styles.bgTxt}>চিনিগুড়া চাল</Text>
						</Col>	
						<Col size={15}>
							<Text style={styles.bgTxt}>১ কেজি</Text>	
						</Col>	
						
						<Col size={10}>
							<Text style={styles.bgTxt}>৳৫৫</Text>	
						</Col>
				 
						<Col size={10} style={{justifyContent:'center'}}>
							<Image source={require('../assets/images/ProductDetailsScreen/plus.png')} style={styles.imgBtnControl}/>
						</Col>
					</Row>
		 					
				</Grid>
				   
			</Content>
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
		width:'90%'
	}
	 
});

export default ShoppingCartScreen;