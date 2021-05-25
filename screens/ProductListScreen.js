import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground  } from 'react-native';
import { Container, Header, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class ProductListScreen extends Component {
  render() {
    return (
      <Container>
			<Header />
			<Content>
				<Grid>
					<Row>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/product.png')} style={styles.btnTextTop}/>
						</Col>
						<Col>
							<Text>চিনিগুড়া চাল</Text>
							<Text>৳৫৫</Text>
						</Col>
						<Col>
						</Col>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/plus.png')} style={styles.btnTextTop}/>
						</Col>
					</Row>
					
					<Row>
						 
						<Col>
							<Image source={require('../assets/images/CategoryScreen/apnar-category.png')}/>
							<Image source={require('../assets/images/CategoryScreen/Line-9.png')}/>
						</Col>
					</Row>
					
					<Row>
						<Col>
							<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-6.png')} style={styles.btnBackground}>
								<Image source={require('../assets/images/CategoryScreen/rondhon-icon.png')} style={styles.btnText}/>
								<Image source={require('../assets/images/CategoryScreen/rondhon.png')} style={styles.btnText}/>
							</ImageBackground>
						</Col>
						<Col>
							<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-6.png')} style={styles.btnBackground}>
								<Image source={require('../assets/images/CategoryScreen/mach-mangso-icon.png')} style={styles.btnIcon}/>
								<Image source={require('../assets/images/CategoryScreen/mach-mangso.png')} style={styles.btnText}/>
							</ImageBackground>
						</Col>
					</Row>
					<Row>
						<Col>
							<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-6.png')} style={styles.btnBackground}>
								<Image source={require('../assets/images/CategoryScreen/fol-sobji-icon.png')} style={styles.btnIcon}/>
								<Image source={require('../assets/images/CategoryScreen/fol-sobji.png')} style={styles.btnText}/>
							</ImageBackground>
						</Col>
						<Col>
							<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-6.png')} style={styles.btnBackground}>
								<Image source={require('../assets/images/CategoryScreen/paniyo-icon.png')} style={styles.btnIcon}/>
								<Image source={require('../assets/images/CategoryScreen/paniyo.png')} style={styles.btnText}/>
							</ImageBackground>
						</Col>
					</Row>
					<Row>
						<Col>
							<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-6.png')} style={styles.btnBackground}>
								<Image source={require('../assets/images/CategoryScreen/gorer-soronjam-icon.png')} style={styles.btnIcon}/>
								<Image source={require('../assets/images/CategoryScreen/gorer-soronjam.png')} style={styles.btnText}/>
							</ImageBackground>
						</Col>
						<Col>
							<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-6.png')} style={styles.btnBackground}>
								<Image source={require('../assets/images/CategoryScreen/office-ponno-icon.png')} style={styles.btnIcon}/>
								<Image source={require('../assets/images/CategoryScreen/office-ponno.png')} style={styles.btnText}/>
							</ImageBackground>
						</Col>
					</Row>
					
					<Row>
						<Col>
							<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-6.png')} style={styles.btnBackground}>
								<Image source={require('../assets/images/CategoryScreen/sastho-icon.png')} style={styles.btnIcon}/>
								<Image source={require('../assets/images/CategoryScreen/sastho.png')} style={styles.btnText}/>
							</ImageBackground>
						</Col>
						<Col>
							<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-6.png')} style={styles.btnBackground}>
								<Image source={require('../assets/images/CategoryScreen/sondhorjo-bordhon-icon.png')} style={styles.btnIcon}/>
								<Image source={require('../assets/images/CategoryScreen/sondhorjo-bordhon.png')} style={styles.btnText}/>
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
	 btnBackgroundTop: { 
		width: '100%',
		height: 40,
		justifyContent:'center',
		textAlign: "center",
	  },  
	  btnTextTop:{
		  height:20,
		  width:105,
		  marginTop:-7
	  },
	  btnBackground: { 
		width: '100%',
		height: 150,
		justifyContent:'center',
		textAlign: "center",
		alignItems:'center',
		 
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
	  }
});

export default ProductListScreen;