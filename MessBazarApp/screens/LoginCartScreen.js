import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, ToastAndroid  } from 'react-native';
import { Container, Header, Content, Button, Item, Input, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import *  as apiService from '../services/apiService';
import { connect, dispatch } from 'react-redux'
import * as actions from '../services/actions/actions'
import HeaderScreen from './HeaderScreen';

function mapStateToProps(state){
	 
	return {
		user:state.userReducer.user
	}
}

function mapDispatchToProps(dispatch){
	return {
		userLogin:data=>dispatch(actions.userLogin(data))
	}
}

class LoginCartScreen extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			email:'',
			password:'',
			user: this.props.user
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
	
	componentDidMount(){
		this.focusListener = this.props.navigation.addListener("focus", () =>{
		  if(this.props.user && this.props.user.name){
			this.props.navigation.navigate('CartConfirmed',{});
		  }
		});
	}
	
	 componentWillUnmount() {
		if(this.focusListener){
			//this.focusListener.remove();
		}
	  }
	  
	showToast = (msg) => {
		ToastAndroid.show(msg, ToastAndroid.SHORT);
	};
	
	onSubmitText=()=>{
		let data = {
			email: this.state.email,
			password:this.state.password
		}
		console.log(data);
		fetch(apiService.apiUrl+"auth/login",{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			  }).then(response=>response.json()).then(data=>{
				   
				  if(data.status=="success"){
					apiService.storeUserData(data.user)
					this.props.userLogin(data.user);
					this.props.navigation.navigate('CartConfirmed',{});
				  }else{
					  this.showToast("আপনার ইমেল অথবা পাসওয়ার্ড সঠিক নয়");
					  console.log('some thing is wrong with login')
				  }
			  }).catch(error=>{
				  console.log('error: ', error);
			  }); 
	}
	
	openUserTypeRegistration=()=>{
		this.props.navigation.navigate("UserAccountType");
	}
  render() {
    return (
      <Container>
		<HeaderScreen navigation={this.props.navigation} title={"লগ ইন"} />
			 <ImageBackground source={require('../assets/images/LoginScreen/login_bg.png')} style={styles.backgroundImage}>
				  <Grid style={{paddingLeft:20,paddingRight:20}}>
					 
					<Row style={{marginTop:180}}>
						<Col>
							<Icon name="home" onPress={()=>this.props.navigation.navigate("Home")}/>
						</Col>
						<Col style={{textAlign:'right'}}>
							<Button onPress={()=>{this.openUserTypeRegistration()}} style={{backgroundColor:'#D5DED9',width:120,textAlign:'center',paddingLeft:35,borderRadius:30,marginRight:0}}><Text>রেজিস্ট্রেশন</Text></Button>
						</Col>
						
					</Row>
					<Row style={{marginTop:50}}>
						<Col>
							<Item>
								<Icon type={"FontAwesome"} active name='user' />
								<Input placeholder="ইমেল অথবা ফোন নাম্বার" value={this.state.email} onChangeText={this.changeEmail}/>
							</Item>
						</Col>
						 
						
					</Row>
					<Row style={{marginTop:50}}>
						<Col>
							<Item>
								<Icon active name='key' />
								<Input secureTextEntry={true} placeholder="পাসওয়ার্ড" value={this.state.password} onChangeText={this.changePassword} />
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
		height: 1000,
	  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginCartScreen);