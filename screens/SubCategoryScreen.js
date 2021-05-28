import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TouchableOpacity  } from 'react-native';
import { Container, Header, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class SubCategoryScreen extends Component {
	
	  onPressOpen=(screenName)=>{
		  this.props.navigation.navigate(screenName);
	  }
  
  render() {
    return (
      <Container>
			 
			<Content>
				<Grid>
					<Row>
						<Col></Col>
						<Col>
							<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-28.png')} style={styles.btnBackgroundTop}>
								<Image source={require('../assets/images/CategoryScreen/bazar-talika.png')} style={styles.btnTextTop}/>
							</ImageBackground>
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
							<TouchableOpacity style={styles.button} onPress={()=>this.onPressOpen('ProductList')} >
								<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-6.png')} style={styles.btnBackground}>
									<Image source={require('../assets/images/CategoryScreen/rondhon-icon.png')} style={styles.btnText}/>
									<Image source={require('../assets/images/CategoryScreen/rondhon.png')} style={styles.btnText}/>
								</ImageBackground>
							</TouchableOpacity>
						</Col>
						<Col>
							<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-6.png')} style={styles.btnBackground}>
								<Image source={require('../assets/images/CategoryScreen/mach-mangso-icon.png')} style={styles.btnIcon}/>
								<Image source={require('../assets/images/CategoryScreen/mach-mangso.png')} style={styles.btnText}/>
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
						<Col>
							<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-6.png')} style={styles.btnBackground}>
								<Image source={require('../assets/images/CategoryScreen/fol-sobji-icon.png')} style={styles.btnIcon}/>
								<Image source={require('../assets/images/CategoryScreen/fol-sobji.png')} style={styles.btnText}/>
							</ImageBackground>
						</Col>
					</Row>
					<Row>
						<Col>
							<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-6.png')} style={styles.btnBackground}>
								<Image source={require('../assets/images/CategoryScreen/office-ponno-icon.png')} style={styles.btnIcon}/>
								<Image source={require('../assets/images/CategoryScreen/office-ponno.png')} style={styles.btnText}/>
							</ImageBackground>
						</Col>
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
						<Col>
							<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-6.png')} style={styles.btnBackground}>
								<Image source={require('../assets/images/CategoryScreen/sastho-icon.png')} style={styles.btnIcon}/>
								<Image source={require('../assets/images/CategoryScreen/sastho.png')} style={styles.btnText}/>
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
		height: 50,
		justifyContent:'center',
		textAlign: "center",
		alignItems:'center'
	  },  
	  btnTextTop:{
		  height:20,
		  width:105,
		  marginTop:-7
	  },
	  
	  btnBackground: { 
		width: '100%',
		height: 100,
		justifyContent:'center',
		textAlign: "center",
		alignItems:'center',
		 
	  }, 
	  btnText: { 
		width: '60%',
		height: 20,
		marginTop:0,
		resizeMode:'cover'
	  },
	    btnIcon: { 
		width: 35,
		height: 35,
		marginLeft:'13%',
		marginTop:0
	  }
});

export default SubCategoryScreen;