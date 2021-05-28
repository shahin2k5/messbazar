import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground  } from 'react-native';
import { Container, Header, Content, Button, Item, Input, Icon, List, ListItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class UserAccountScreen extends Component {
  render() {
    return (
      <Container>
		 
			 <ImageBackground source={require('../assets/images/LoginScreen/login_bg.png')} style={styles.backgroundImage}>
				  
				  <List style={{marginTop:120, paddingLeft:60}}>
					<ListItem>
						<Row>
							<Col></Col>
							<Col style={{textAlign:'right'}}>
								<Button style={{marginRight:80, marginLeft:'auto',backgroundColor:'coral',width:120,textAlign:'center',paddingLeft:35,borderRadius:30}}><Text>English</Text></Button>
							</Col>
						</Row>
					</ListItem>
						
					<ListItem>
						 <Row>
							<Col>
								<Button style={{backgroundColor:'lightgreen',width:120,textAlign:'center',paddingLeft:35,borderRadius:30}} onPress={() => this.props.navigation.navigate('Login')}><Text>Login</Text></Button>
							</Col>
							<Col>
								<Button style={{backgroundColor:'whitegreen',width:120,textAlign:'center',paddingLeft:35,borderRadius:30}}><Text>Registration</Text></Button>
							</Col>
							
						</Row>
					</ListItem>
					<ListItem>
									<Icon type={"FontAwesome"} active name='arrow-circle-left' />
									<Input placeholder="বাসার নাম" />
					</ListItem>
					
					<ListItem>
									<Icon type={"FontAwesome"} active name='arrow-circle-left' />
									<Input placeholder="ব্যবহারকারির নাম" />
					</ListItem>
					
					<ListItem>
									<Icon type={"FontAwesome"} active name='arrow-circle-left' />
									<Input placeholder="ফোন নাম্বার" />
					</ListItem>
					
					<ListItem>
									<Text>আমি শর্তাদি এবং পরিষেবার সাথে সম্মত</Text>
					</ListItem>
					
					<ListItem>
					  <Row>
							<Col>
								<Button style={{marginRight:80,backgroundColor:'coral',width:'85%',textAlign:'center',paddingLeft:35,borderRadius:30}}><Text>English</Text></Button>
							</Col>
						</Row>
					</ListItem>
					
					
				  </List>
		  
				
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

export default UserAccountScreen;