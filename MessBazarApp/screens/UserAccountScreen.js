import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground  } from 'react-native';
import { Container, Header, Content, Button, Item, Input, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class MainUserRegistrationScreen extends Component {
  render() {
    return (
      <Container>
		 
			 <ImageBackground source={require('../assets/images/LoginScreen/login_bg.png')} style={styles.backgroundImage}>
				  
				  <Grid style={{marginTop:120, paddingLeft:60}}>
					<Row>
						<Row>
							<Col></Col>
							<Col style={{textAlign:'right'}}>
								<Button style={{marginRight:80, marginLeft:'auto',backgroundColor:'coral',width:120,textAlign:'center',paddingLeft:35,borderRadius:30}}><Text>English</Text></Button>
							</Col>
						</Row>
					</Row>
						
					<Row>
						<Row>
							<Col>
								<Button style={{backgroundColor:'lightgreen',width:120,textAlign:'center',paddingLeft:35,borderRadius:30}}><Text>লগ ইন</Text></Button>
							</Col>
							<Col>
								<Button style={{backgroundColor:'whitegreen',width:120,textAlign:'center',paddingLeft:35,borderRadius:30}}><Text>রেজিস্ট্রেশন</Text></Button>
							</Col>
							
						</Row>
					</Row>
					<Row>
					  <Row>
							<Col>
								 
							</Col>
						</Row>
					</Row>
					
					<Row>
					  <Row>
							<Col>
								<Text>আপনার বাজার আকাউন্ট কিসের জন্য?</Text>
							</Col>
						</Row>
					</Row>
					
					<Row style={{marginTop:50}}>
					  <Row>
							<Col>
								<Button style={{marginRight:80,backgroundColor:'coral',width:'85%',textAlign:'center',paddingLeft:35,borderRadius:30}}><Text>মেস</Text></Button>
							</Col>
						</Row>
					</Row>
					
					<Row>
					  <Row>
							<Col>
								<Button style={{marginRight:80,backgroundColor:'coral',width:'85%',textAlign:'center',paddingLeft:35,borderRadius:30}}><Text>বাসা</Text></Button>
							</Col>
						</Row>
					</Row>
					
					
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
	  }
});

export default MainUserRegistrationScreen;