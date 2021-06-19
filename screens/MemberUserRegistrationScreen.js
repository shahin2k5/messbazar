import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground  } from 'react-native';
import { Container, Header, Content, Button, Item, Input, Icon, List, ListItem,CheckBox,Body } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class UserAccountScreen extends Component {
  render() {
    return (
      <Container>
		 
			 <ImageBackground source={require('../assets/images/LoginScreen/login_bg.png')} style={styles.backgroundImage}>
				  
				  <List style={{marginTop:80, paddingLeft:60}}>
					<ListItem>
						<Row>
							<Col></Col>
							<Col style={{textAlign:'right'}}>
								<Button style={{marginRight:80, marginLeft:'auto',backgroundColor:'coral',width:120,textAlign:'center',paddingLeft:35,borderRadius:30}}><Text>English</Text></Button>
							</Col>
						</Row>
					</ListItem>
						<Row>
							<Col>
								<Button style={{backgroundColor:'#D5DED9',width:120,textAlign:'center',paddingLeft:35,borderRadius:30}}><Text>লগ ইন</Text></Button>
							</Col>
							<Col>
								<Button style={{backgroundColor:'whitegreen',width:120,textAlign:'center',paddingLeft:35,borderRadius:30}}><Text>রেজিস্ট্রেশন</Text></Button>
							</Col>
							
						</Row>
					<ListItem>
						<Row>
							<Col>
								 
							</Col>
						</Row>
					</ListItem>
					
					<ListItem style={styles.lineItem}>
									<Icon type={"FontAwesome"} active name='arrow-circle-left' />
									<Input placeholder="মেসের নাম" />
					</ListItem>

					
					<ListItem style={styles.lineItem}>
									<Icon type={"FontAwesome"} active name='arrow-circle-left' />
									<Input placeholder="মেসের পরিচালকের নাম" />
					</ListItem>
					
					<ListItem style={styles.lineItem}>
									<Icon type={"FontAwesome"} active name='arrow-circle-left' />
									<Input placeholder="মেসের সদস্য" />
					</ListItem>
					
					<ListItem style={styles.lineItem}>
									<Icon type={"FontAwesome"} active name='arrow-circle-left' />
									<Input placeholder="মেসের পরিচালকের ভোটার আইডি " />
					</ListItem>
					
					<ListItem style={styles.lineItem}>
									<Icon type={"FontAwesome"} active name='arrow-circle-left' />
									<Input placeholder="ঠিকানা রোডনং ,বাসা" />
					</ListItem>
					
					
					<ListItem style={styles.lineItem}>
									<Icon type={"FontAwesome"} active name='arrow-circle-left' />
									<Input placeholder="পাচওয়ার্ড" />
					</ListItem>
					
					<ListItem style={styles.lineItem}>
									<Icon type={"FontAwesome"} active name='arrow-circle-left' />
									<Input placeholder="পুনরায় পাচওয়ার্ড" />
					</ListItem>
					
					
				

					
					<ListItem style={styles.lineItem}>
					 <CheckBox checked={false}
						  style={styles.checkbox}
						  color="gray"
						/>
						<Body>
		
									<Text style={styles.checkboxTitle}>আমি শর্তাদি এবং পরিষেবার সাথে সম্মত</Text>
						</Body>
					</ListItem>
					
					
					<ListItem>
					  <Row>
							<Col>
								<Button style={{marginLeft:50,backgroundColor:'#4DB679',width:'55%',textAlign:'center',paddingLeft:45,borderRadius:30}}><Text>রেজিস্ট্রেশন</Text></Button>
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

export default UserAccountScreen;