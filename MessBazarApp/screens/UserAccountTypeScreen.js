import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground  } from 'react-native';
import { Container, Header, Content, Button, Item, Input, Icon,CheckBox,Body } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import HeaderScreen from './HeaderScreen';

class UserAccountTypeScreen extends Component {
  render() {
    return (
      <Container>
		 <HeaderScreen navigation={this.props.navigation} total_price={this.props.cartList?this.props.cartList.total_final_price:'0.00'} title={"রেজিস্ট্রেশন"} />
			 <ImageBackground source={require('../assets/images/LoginScreen/login_bg.png')} style={styles.backgroundImage}>
				  
					<Grid>
						<Row></Row>
						<Row></Row>

						<Row>
							<Col><Text style={{textAlign:'center',fontSize:23}}>ইউজার টাইপ নির্বাচন করুন</Text></Col>
						</Row>

						<Row>
							<Col><Text style={{textAlign:'center',fontSize:25}}><Icon name='people'/></Text></Col>
						</Row>
						
					 	<Row>
							<Col></Col>
							<Col style={{justifyContent:'center'}}>
								<Button onPress={()=>{this.props.navigation.navigate('HomeUserRegistration')}} style={{backgroundColor:'#D5DED9',width:'100%',justifyContent:'center',borderRadius:30,backgroundColor:'#339966'}}>
								<Text style={{textAlign:'center',color:'#fff',fontSize:18}}>বাসার মেম্বার</Text>
								</Button>
							</Col>
							<Col></Col>
						</Row>
						<Row>
							<Col></Col>
							<Col style={{justifyContent:'center'}}>
								<Button onPress={()=>{this.props.navigation.navigate('MessUserRegistration')}} style={{backgroundColor:'whitegreen',width:'100%',justifyContent:'center',borderRadius:30,backgroundColor:'#339966'}}><Text style={{textAlign:'center',color:'#fff',fontSize:18}}>মেস মেম্বার</Text></Button>
							</Col>
							<Col></Col>
						</Row>
				 		<Row></Row><Row></Row>	
					</Grid>
		  
				
			</ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
	 backgroundImage: {
		flex: 1,
		width: null,
		height: null,
	  },
	  
	  lineItem:{
		  marginTop:-15,
		  marginBottom:-15
	  },
	  checkbox:{
		  textAlign:'center',
	  },
	  checkboxTitle:{
		  marginLeft:10
	  }
	  
});

export default UserAccountTypeScreen;