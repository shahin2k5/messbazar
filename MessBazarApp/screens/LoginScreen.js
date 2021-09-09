import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground,ToastAndroid  } from 'react-native';
import { Container, Header, Content, Button, Item, Input, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import *  as apiService from '../services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderScreen from './HeaderScreen';
import { connect, dispatch } from 'react-redux'
import * as actions from '../services/actions/actions'

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

class LoginScreen extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			email:'',
			password:''
		}
	}
	
	componentDidMount() {
		// apiService.getUserData().then(user=>{
			// console.log('profile user 52::::',user)
			// this.props.userLogin(user)
		
		// }).catch(error=>console.log(error))
		
		// console.log('profile user::::',user.length)
		 // this.focusListener = this.props.navigation.addListener("focus", () =>{  	
		 // if(this.props.user && Object.keys(this.props.user).length>0){
			 // console.log('Profile Screen tmp:::',Object.keys(this.props.user).length);
			 // this.setState({user:this.props.user})
			 // this.props.navigation.navigate('Stack',{screen:'Profile'});
			 // return true;
		 // }else if(  Object.keys(this.props.user).length<1){	
			// console.log('Profile Screen2:::',this.props.user);		 
			// //this.props.navigation.navigate('Stack',{screen:'Login'});
			// return true;
		 // }
		 
		 // }
		
		 // );
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

		let data = {
			email: this.state.email,
			password:this.state.password
		}

		fetch(apiService.apiUrl+"auth/login",{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			  }).then(response=>response.json()).then(data=>{
				  //console.log('success data: ', data.user);
				  if(data.status=="success"){
					apiService.storeUserData(data.user)
					this.props.userLogin(data.user);
					this.props.navigation.navigate('Profile');
				  
				  }else{
					  this.showToast("আপনার ইমেল অথবা পাসওয়ার্ড সঠিক নয়");
				  }

			  }).catch(error=>{
				  console.log('error: ', error);
			  }); 
	}
	
	showToast = (msg) => {
		ToastAndroid.show(msg, ToastAndroid.SHORT);
	};


  render() {
    return (
      <Container>
			<HeaderScreen navigation={this.props.navigation} title={"লগ ইন"} />
			<ImageBackground source={require('../assets/images/LoginScreen/login_bg.png')} style={styles.backgroundImage}>
				  <Grid style={{marginHorizontal:50}}>
					
					<Row style={{marginTop:140,marginHorizontal:0}}>
						<Col size={20}><Icon name="home" onPress={()=>this.props.navigation.navigate('Home')}/></Col>
						<Col size={40} style={{justifyContent:'center'}}>
							<Button style={{
								backgroundColor:'#D5DED9',
								width:'95%',
								textAlign:'center',
								borderRadius:30}}>
								<Text  style={{textAlign:'center',width:'100%',fontSize:18}}>লগ ইন</Text></Button>
						</Col>
						<Col size={40} style={{justifyContent:'center'}}>
							<Button onPress={()=>this.props.navigation.navigate('UserAccountType')} style={{
									backgroundColor:'#87D2A7',
									width:'95%',
									borderRadius:30}}>
									<Text style={{textAlign:'center',width:'100%',fontSize:18}}>রেজিস্ট্রেশন</Text>
							</Button>
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
					<Row style={{marginTop:40}}>
						<Col>
							<Item>
								<Icon active name='key' />
								<Input secureTextEntry={true} placeholder="পাসওয়ার্ড" onChangeText={this.changePassword} />
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
							<Button style={{backgroundColor:'#87D2A7',width:'100%',textAlign:'center',borderRadius:30}} onPress={this.onSubmitText}>
								<Text style={{textAlign:'center',width:'100%',fontSize:18}}>লগ ইন</Text>
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

export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen);