import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground } from 'react-native';
import { Container, Header, Content, Button, Item, Input, Icon, List, ListItem ,Body } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import CheckBox from '@react-native-community/checkbox';
import { apiUrl, getCategoryAll } from '../services/apiService';


class MessUserRegistrationScreen extends Component {
	
	constructor(props){
		super(props);
		this.state={
			house_mess_name:'',
			user_full_name:'',
			full_address:'',
			user_mobile:'',
			user_type:'mess',
			mess_member:'',
			branch_name:'',
			email:'',
			password:'',
			confirm_password:'',
			checked:true
		}
	}
	
	
	submitRegistration=()=>{
		let data = {
			house_mess_name: this.state.house_mess_name,
			user_full_name: this.state.user_full_name,
			full_address: this.state.full_address,
			user_mobile:this.state.user_mobile,
			mess_member:this.state.mess_member,
			user_type:this.state.user_type,
			branch_name:this.state.branch_name,
			email:this.state.email,
			password:this.state.password,
			confirm_password:this.state.confirm_password,
			checked:this.state.checked,
		};
		console.log(data);
		
		fetch(apiUrl+"auth/registration",{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			  }).then(response=>response.json()).then(data=>{
				  console.log('success data: ', data);
				  this.props.navigation.navigate('Category');
			  },error=>{
				  console.log('error: ', error);
			  }); 
			  
	}
  render() {
    return (
      <Container>
		 
			 <ImageBackground source={require('../assets/images/LoginScreen/login_bg.png')} style={styles.backgroundImage}>
				  
				  <List style={{marginTop:80, paddingLeft:30}}>
					
						 <Row>
							
							<Col>
								 
							</Col>
							
							<Col>
								<Button style={{backgroundColor:'#D5DED9',width:120,textAlign:'center',paddingLeft:35,borderRadius:30}} onPress={() => this.props.navigation.navigate('Login')}><Text>লগ ইন</Text></Button>
							</Col>
							
							
						</Row>
					 
					
					<ListItem style={{marginTop:40}}>
						<Row></Row>
					</ListItem>
					
					<ListItem style={styles.lineItem}>
						<Icon type={"FontAwesome"} active name='arrow-circle-left' size={5} style={{height:27,width:27,marginLeft:5}} />
						<Input placeholder="মেসের নাম" onChangeText={house_mess_name=>{this.setState({house_mess_name})}} style={{fontSize:15}} />
					</ListItem>
					
						
					<ListItem style={styles.lineItem}>
						<Icon type={"FontAwesome"} active name='arrow-circle-left' size={5} style={{height:27,width:27,marginLeft:5}} />
						<Input placeholder="মেস পরিচালকের নাম" onChangeText={user_full_name=>{this.setState({user_full_name})}} style={{fontSize:15}} />
					</ListItem>
					
					
				 
					<ListItem style={styles.lineItem }>
						<Icon type={"FontAwesome"} active name='arrow-circle-left' size={5} style={{height:27,width:27,marginLeft:5}} />
						<Input placeholder="মেস পরিচালকের মোবাইল"  onChangeText={user_mobile=>{this.setState({user_mobile})}}  style={{fontSize:15}} />
					</ListItem>

					<ListItem style={styles.lineItem }>
						<Icon type={"FontAwesome"} active name='arrow-circle-left' size={5} style={{height:27,width:27,marginLeft:5}} />
						<Input placeholder="মেসের সদস্য"   onChangeText={mess_member=>{this.setState({mess_member})}} style={{fontSize:15}} />
					</ListItem>



					<ListItem style={ styles.lineItem}>
						<Icon type={"FontAwesome"} active name='arrow-circle-left' size={5} style={{height:27,width:27,marginLeft:5}} />
						<Input placeholder="ঠিকানা, রোড নং, বাসা, ফ্ল্যাট নং"   onChangeText={full_address=>{this.setState({full_address})}} style={{fontSize:15}} />
					</ListItem>


					<ListItem style={ styles.lineItem}>
						<Icon type={"FontAwesome"} active name='arrow-circle-left' size={5} style={{height:27,width:27,marginLeft:5}} />
						<Input placeholder="ব্রাঞ্চ নাম"   onChangeText={branch_name=>{this.setState({branch_name})}}  style={{fontSize:15}} />
					</ListItem>


					<ListItem style={styles.lineItem}>
						<Icon type={"FontAwesome"} active name='arrow-circle-left' size={5} style={{height:27,width:27,marginLeft:5}} />
						<Input placeholder="ইমেইল"   onChangeText={email=>{this.setState({email})}}  style={{fontSize:15}} />
					</ListItem>
					
					<ListItem style={styles.lineItem}>
						<Icon type={"FontAwesome"} active name='arrow-circle-left' size={5} style={{height:27,width:27,marginLeft:5}} />
						<Input placeholder="পাসওয়ার্ড"   onChangeText={password=>{this.setState({password})}}   style={{fontSize:15}} />
					</ListItem>


					<ListItem style={styles.lineItem}>
						<Icon type={"FontAwesome"} active name='arrow-circle-left' size={5} style={{height:27,width:27,marginLeft:5}} />
						<Input placeholder="পুনরায় পাসওয়ার্ড"   onChangeText={confirm_password=>{this.setState({confirm_password})}}   style={{fontSize:15}} />
					</ListItem>

					
				 
					
					<Row style={styles.lineItem}>
 
							<Col size={15}>
								<CheckBox
								  title='Click Here'
								  value={this.state.checked}
								onValueChange={checked=>this.setState({checked:!this.state.checked})}
								/>
							</Col>
							<Col size={85}>
								<Text>I accept the terms & conditons </Text>
							</Col>
					</Row>
					
					 
					 <Row style={{marginTop:30}}>
						<Col>
							<Button onPress={this.submitRegistration} style={{marginLeft:50,backgroundColor:'#4DB679',width:'55%',textAlign:'center',paddingLeft:45,borderRadius:30}}><Text>রেজিস্ট্রেশন</Text></Button>
						</Col>
					</Row>
					 
					
					
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
		  height:25
	  },
	  checkbox:{
		  textAlign:'center',
	  },
	  checkboxTitle:{
		  color:'navy'
	  }

});

export default MessUserRegistrationScreen;