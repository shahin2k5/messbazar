import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground  } from 'react-native';
import { Container, Header, Content, Button, Item, Input, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { apiUrl, getCategoryAll } from '../services/apiService';

class LoginScreen extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			email:'',
			password:''
		}
	}
	
	changeEmail=(email)=>{
		this.setState({
			email:email
		})
	}
	
	changePassword=(password)=>{
		this.setState({
			password:password
		})
	}
	
	onSubmitText=()=>{
		console.log(this.state.email)
		console.log(this.state.password)
		let data = {
			email: this.state.email,
			password:this.state.password
		}
		console.log(data);
		fetch(apiUrl+"auth/login",{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			  }).then(response=>response.json()).then(data=>{
				  console.log('success data: ', data);
				  this.props.navigation.navigate('Profile');
			  },error=>{
				  console.log('error: ', error);
			  }); 
	}
  render() {
    return (
      <Container>
		 
			 <ImageBackground source={require('../assets/images/LoginScreen/login_bg.png')} style={styles.backgroundImage}>
				  <Grid style={{paddingLeft:20,paddingRight:20}}>
					<Row style={{marginTop:120}}>
						<Col></Col>
						<Col style={{textAlign:'right'}}>
							{/***<Button style={{marginRight:0, marginLeft:'auto',backgroundColor:'coral',width:120,textAlign:'center',paddingLeft:35,borderRadius:30}}><Text>English</Text></Button>***/}
						</Col>
					</Row>
					<Row style={{marginTop:40}}>
						<Col>
							<Button style={{backgroundColor:'#87D2A7',width:120,textAlign:'center',paddingLeft:35,borderRadius:30}}><Text>লগ ইন</Text></Button>
						</Col>
						<Col style={{textAlign:'right'}}>
							<Button onPress={()=>this.props.navigation.navigate('UserAccountType')} style={{backgroundColor:'#D5DED9',width:120,textAlign:'center',paddingLeft:35,borderRadius:30,marginRight:0}}><Text>রেজিস্ট্রেশন</Text></Button>
						</Col>
						
					</Row>
					<Row style={{marginTop:50}}>
						<Col>
							<Item>
								<Icon type={"FontAwesome"} active name='user' />
								<Input placeholder="ইমেল অথবা ফোন নাম্বার" onChangeText={this.changeEmail}/>
							</Item>
						</Col>
						 
						
					</Row>
					<Row style={{marginTop:50}}>
						<Col>
							<Item>
								<Icon active name='key' />
								<Input placeholder="পাসওয়ার্ড" onChangeText={this.changePassword} />
							</Item>
						</Col>
						
					</Row>
					<Row style={{marginTop:30}}>
						<Col>
							
						</Col>
						<Col>
							<Text>পাসওয়ার্ড ভুলে গেছি?</Text>
						</Col>
						
					</Row>
					<Row>
						<Col></Col>
					</Row>
					<Row>
						<Col></Col>
						<Col>
							<Button style={{backgroundColor:'#87D2A7',width:120,textAlign:'center',paddingLeft:35,borderRadius:30}} onPress={this.onSubmitText}>
								<Text>লগ ইন</Text>
							</Button>
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