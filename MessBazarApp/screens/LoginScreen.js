import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground  } from 'react-native';
import { Container, Header, Content, Button, Item, Input, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class LoginScreen extends Component {
  render() {
    return (
      <Container>
		 
			 <ImageBackground source={require('../assets/images/LoginScreen/login_bg.png')} style={styles.backgroundImage}>
				  <Grid style={{paddingLeft:60}}>
					<Row style={{marginTop:120}}>
						<Col></Col>
						<Col style={{textAlign:'right'}}>
							<Button style={{marginRight:80, marginLeft:'auto',backgroundColor:'coral',width:120,textAlign:'center',paddingLeft:35,borderRadius:30}}><Text>English</Text></Button>
						</Col>
					</Row>
					<Row>
						<Col>
							<Button style={{backgroundColor:'#87D2A7',width:120,textAlign:'center',paddingLeft:35,borderRadius:30}}><Text>লগ ইন</Text></Button>
						</Col>
						<Col>
							<Button style={{backgroundColor:'#D5DED9',width:120,textAlign:'center',paddingLeft:35,borderRadius:30}}><Text>রেজিস্ট্রেশন</Text></Button>
						</Col>
						
					</Row>
					<Row>
						<Col>
							<Item>
								<Icon type={"FontAwesome"} active name='home' />
								<Input placeholder="ইমেল অথবা ফোন নাম্বার" />
							</Item>
						</Col>
						 
						
					</Row>
					<Row>
						<Col>
							<Item>
								<Icon active name='key' />
								<Input placeholder="পাসওয়ার্ড" />
							</Item>
						</Col>
						
					</Row>
					<Row>
						<Col>
							
						</Col>
						<Col>
							<Text>পাসওয়ার্ড ভুলে গেছি</Text>
						</Col>
						
					</Row>
					<Row>
						<Col></Col>
					</Row>
					<Row>
						<Col></Col>
						<Col>
							<Button style={{backgroundColor:'#87D2A7',width:120,textAlign:'center',paddingLeft:35,borderRadius:30}}><Text>লগ ইন</Text></Button>
						</Col>
						<Col>
							
						</Col>
						
					</Row>
					
					<Row>
						<Col></Col>
					</Row>
										
					<Row>
						<Col></Col>
					</Row>
										
					<Row>
						<Col></Col>
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
		height: 700,
	  }
});

export default LoginScreen;