import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground  } from 'react-native';
import { Container, Header, Content, Button, Item, Input, Icon, List, ListItem,CheckBox,Body } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class UserAccountTypeScreen extends Component {
  render() {
    return (
      <Container>
		 
			 <ImageBackground source={require('../assets/images/LoginScreen/login_bg.png')} style={styles.backgroundImage}>
				  
					<Grid>
						<Row></Row><Row></Row>
					 	<Row>
							<Col size={10}></Col>
							<Col size={50} style={{justifyContent:'center'}}>
								<Button onPress={()=>{this.props.navigation.navigate('HomeUserRegistration')}} style={{backgroundColor:'#D5DED9',width:220,justifyContent:'center',borderRadius:30,backgroundColor:'#339966'}}>
								<Text style={{textAlign:'center'}}>বাসার মেম্বার</Text>
								</Button>
							</Col>
							<Col size={10}></Col>
						</Row>
						<Row>
							<Col size={10}></Col>
							<Col size={50} style={{justifyContent:'center'}}>
								<Button onPress={()=>{this.props.navigation.navigate('MessUserRegistration')}} style={{backgroundColor:'whitegreen',width:220,justifyContent:'center',borderRadius:30,backgroundColor:'#339966'}}><Text style={{textAlign:'center'}}>মেস মেম্বার</Text></Button>
							</Col>
							<Col size={10}></Col>
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