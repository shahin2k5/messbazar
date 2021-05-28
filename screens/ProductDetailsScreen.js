import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TextInput, TouchableOpacity  } from 'react-native';
import { Container, Header, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class ProductDetailsScreen extends Component {
	
	onPressOpen=(screenName)=>{
		this.props.navigation.navigate(screenName);
	}
  render() {
    return (
      <Container>
			
			<Content style={styles.maincontent}>
				<Grid>
					<Row>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/arrow-left.png')} style={styles.btnBackgroundTop}/>
						</Col>
						<Col>
						 
						</Col>
					</Row>
					
					<Row>
						 
						<Col>
							<Row>
								
								<Col><Image source={require('../assets/images/CategoryScreen/apnar-category.png')}/></Col>
								
								<Col></Col>
								<Col></Col>
								<Col><Image source={require('../assets/images/ProductDetailsScreen/search.png')} style={styles.btnBackgroundTop}/></Col>
							</Row>
							<Image source={require('../assets/images/CategoryScreen/Line-9.png')}/>
						</Col>
					</Row>
					
					<Row>
						<Col>
							<ImageBackground source={require('../assets/images/ProductDetailsScreen/product-bg.png')} style={styles.productBackground}>
								<Image source={require('../assets/images/ProductDetailsScreen/product.png')} style={styles.productImage}/>
							</ImageBackground>
						</Col>
						 
					</Row>
					
					<Row>
						<Col>
							
								<Text style={styles.productname}>Mnicat Rice</Text>
								 
								<Image source={require('../assets/images/ProductDetailsScreen/price.png')} style={styles.productprice}/>
							 
							
						</Col>
						<Col>
								<TextInput style={styles.textinput}/>
						</Col>
						<Col style={{textAlign:'right'}}>
							<TouchableOpacity onPress={()=>this.onPressOpen('CartConfirm')}>
								<Image source={require('../assets/images/ProductDetailsScreen/plus.png')} style={styles.productImage}/>
							</TouchableOpacity>
						</Col>
						
					</Row>
					
					<Row>
						<Col>
							
							 	<Text>
									নাজিরশাইল: মানসম্মত চালের মধ্যে নাজিরশাইল অন্যতম। এই চালের বিশেষগুন হল ধান অর্ধসিদ্ধ করে চাল তৈরি করা হয়। দিনাজপুরের কৃষক হতে সংগৃহীত উন্নত মানের ধান থেকে অত্যাধুনিক স্বয়ংক্রিয় মেশিনে তৈরি ও বাছাইকৃত নাজিরশাইল চাল। চাল গুলি দেখতে যেমন সুন্দর তেমনি পুষ্টিকর ও স্বাদে  অনন্য। তাই আপনার দৈনিক খাবারের তালিকায় যোগ করতে পারেন চাল আড়ৎ’ দিনাজপুর এর নাজিরশাইল চাল।
								</Text>
						 
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
	  productname:{
		  fontSize:18,
		  color:'coral',
		  fontWeight:'bold'
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
	  }
});

export default ProductDetailsScreen;