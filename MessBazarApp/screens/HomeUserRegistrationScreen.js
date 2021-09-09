import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, ToastAndroid, ScrollView } from 'react-native';
import { Container, Header, Content, Button, Item, Input, Icon,Body } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import CheckBox from '@react-native-community/checkbox';
import { apiUrl, getCategoryAll } from '../services/apiService';
import HeaderScreen from './HeaderScreen';
import * as actions from '../services/actions/actions'
import { connect, dispatch } from 'react-redux' 
	
	
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

class HomeUserRegistrationScreen extends Component {
	
	constructor(props){
		super(props);
		this.state={
			house_mess_name:'',
			user_full_name:'',
			full_address:'',
			user_mobile:'',
			user_type:'house',
			email:'',
			password:'',
			confirm_password:'',
			checked:true,
			btnSubmited:false
		}
	}
	
	
	submitRegistration=()=>{
		this.setState({btnSubmited:true});
		let data = {
			house_mess_name: this.state.house_mess_name,
			user_full_name: this.state.user_full_name,
			full_address: this.state.full_address,
			user_mobile:this.state.user_mobile,
			user_type:this.state.user_type,
			email:this.state.email,
			password:this.state.password,
			confirm_password:this.state.confirm_password,
			checked:this.state.checked,
		};
	 
		
		if(!data.user_full_name){
			this.showToast('User name is required!')
			return
		}
		
		if(!data.full_address){
			this.showToast('Address is required!')
			return
		}
		
		if(!data.user_mobile){
			this.showToast('Mobile number is required!')
			return
		}
		
		if(!data.email){
			this.showToast('Email is required!')
			return
		}
		
		if(!data.password){
			this.showToast('Password is required!')
			return
		}
		
		if(data.password!=data.confirm_password){
			this.showToast('Password is mismatch!')
			return
		}
		
		fetch(apiUrl+"auth/registration",{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			  }).then(response=>response.json()).then(data=>{
				  console.log('resgistration response:::',data)
				  if(data.status=="success"){
					this.props.userLogin(data.user)
					this.setState({btnSubmited:false});
					this.props.navigation.navigate('Stack',{screen:'Profile'});  
				  }else{
					console.log('error: ', data);
					this.showToast(data)
				  }
				  
			  }).catch(error=>{
				  this.setState({btnSubmited:false});
				  console.log('error: ', error);
				  this.showToast(error)
				  
			}); 
	}
	
	showToast = (msg) => {
		ToastAndroid.show(msg, ToastAndroid.SHORT);
	};	
	
  render() {
    return (
      <Container>
			<HeaderScreen navigation={this.props.navigation} total_price={this.props.cartList?this.props.cartList.total_final_price:'0.00'} title={"রেজিস্ট্রেশন"} />
			<ImageBackground source={require('../assets/images/LoginScreen/login_bg.png')} style={styles.backgroundImage}>
				  
				  <ScrollView style={{marginTop:60,marginHorizontal:50}}>
				  
					<Row style={{marginTop:0,marginHorizontal:10}} noLine>
						<Row style={{marginTop:30}}>
							<Col style={{justifyContent:'center'}}>
								<Text style={{justifyContent:'center',color:'red',width:'100%',paddingLeft:10}}>
								<Icon name='home'/></Text>
							</Col>
							
							<Col>
								<Button style={{backgroundColor:'#D5DED9',width:120,textAlign:'center',paddingLeft:35,borderRadius:30}} onPress={() => this.props.navigation.navigate('Login')}><Text>লগ ইন</Text></Button>
							</Col>	
						</Row>
					</Row>
					
					<Row style={styles.lineItem}>
						<Icon type={"FontAwesome"} active name='arrow-circle-left' size={5} style={{height:27,width:27,marginLeft:5}} />
						<Input placeholder="বাসার নাম *" onChangeText={house_mess_name=>{this.setState({house_mess_name})}} style={{fontSize:15, height:35,borderBottomWidth:0.5}} />
					</Row>
					
						<Row style={styles.lineItem}>
						<Icon type={"FontAwesome"} active name='arrow-circle-left' size={5} style={{height:27,width:27,marginLeft:5}} />
						<Input placeholder="ব্যবহারকারীর নাম *" onChangeText={user_full_name=>{this.setState({user_full_name})}} style={{fontSize:15, height:35,borderBottomWidth:0.5}} />
					</Row>
					
				 
					<Row style={styles.lineItem }>
						<Icon type={"FontAwesome"} active name='arrow-circle-left' size={5} style={{height:27,width:27,marginLeft:5}} />
						<Input placeholder="মোবাইল *"  onChangeText={user_mobile=>{this.setState({user_mobile})}}  style={{fontSize:15, height:35,borderBottomWidth:0.5}} />
					</Row>

				 

					<Row style={ styles.lineItem}>
						<Icon type={"FontAwesome"} active name='arrow-circle-left' size={5} style={{height:27,width:27,marginLeft:5}} />
						<Input placeholder="বাসার ঠিকানা *"   onChangeText={full_address=>{this.setState({full_address})}}   style={{fontSize:15, height:35,borderBottomWidth:0.5}} />
					</Row>


					<Row style={styles.lineItem}>
						<Icon type={"FontAwesome"} active name='arrow-circle-left' size={5} style={{height:27,width:27,marginLeft:5}} />
						<Input placeholder="ইমেইল *"   onChangeText={email=>{this.setState({email})}}  style={{fontSize:15, height:35,borderBottomWidth:0.5}} />
					</Row>
					
					<Row style={styles.lineItem}>
						<Icon type={"FontAwesome"} active name='arrow-circle-left' size={5} style={{height:27,width:27,marginLeft:5}} />
						<Input placeholder="পাসওয়ার্ড *"  secureTextEntry={true} onChangeText={password=>{this.setState({password})}}   style={{fontSize:15, height:35,borderBottomWidth:0.5}} />
					</Row>


					<Row style={styles.lineItem}>
						<Icon type={"FontAwesome"} active name='arrow-circle-left' size={5} style={{height:27,width:27,marginLeft:5}} />
						<Input placeholder="পুনরায় পাসওয়ার্ড *" secureTextEntry={true}  onChangeText={confirm_password=>{this.setState({confirm_password})}}   style={{fontSize:15, height:35,borderBottomWidth:0.5}} />
					</Row>

					<Row style={{marginTop:-50}}><Col></Col></Row>
				 
					
					<Row style={{marginTop:60}}>
 
							<Col size={15} style={{marginLeft:20}}>
								<CheckBox
								  title='Click Here'
								  value={this.state.checked}
								  onValueChange={checked=>this.setState({checked:!this.state.checked})}
								/>
							</Col>
							<Col size={85} style={{justifyContent:'center'}}>
								<Text>I accept the terms & conditons </Text>
							</Col>
					</Row>
					
					 
					 <Row style={{marginTop:10}}>
						<Col></Col>
						<Col>
							<Button onPress={this.submitRegistration} disabled={this.state.btnSubmited} style={{backgroundColor:'#4DB679',width:'100%',borderRadius:30}}><Text style={{width:'100%',fontSize:18,color:'#fff',textAlign:'center'}}>রেজিস্ট্রেশন</Text></Button>
						</Col>
						<Col></Col>
					</Row>
					 
					
					
				  </ScrollView>
		  
				
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
		  height:25,
		  marginVertical:6
	  },
	  checkbox:{
		  textAlign:'center',
	  },
	  checkboxTitle:{
		  color:'navy'
	  }

});

export default connect(mapStateToProps,mapDispatchToProps)(HomeUserRegistrationScreen);