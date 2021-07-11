import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground } from 'react-native';
import { Container, Header, Content, Button, Item, Input, Icon, List, ListItem ,Body } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import CheckBox from '@react-native-community/checkbox';
import { apiUrl, getCategoryAll } from '../services/apiService';


class OfferScreen extends Component {
	
	constructor(props){
		super(props);
		this.state={
			full_name:'',
			mobile:'',
			nid_driving:'',
			full_address:'',
			email:'',
			password:'',
			confirm_password:'',
			checked:true
		}
	}
	
	
	submitRegistration=()=>{
		let data = {
			full_name: this.state.full_name,
			mobile:this.state.mobile,
			nid_driving:this.state.nid_driving,
			full_address:this.state.full_address,
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
				  //this.props.navigation.navigate('ShoppingCart',{cartid:8});
			  },error=>{
				  console.log('error: ', error);
			  }); 
			  
	}
  render() {
    return (
      <Container>
		 
			 <ImageBackground source={require('../assets/images/LoginScreen/login_bg.png')} style={styles.backgroundImage}>
				  
				  <List style={{marginTop:80, paddingLeft:5}}>
					
						
					<ListItem >
						 <Row>
 
							<Col>
								 <Text style={{fontSize:20,textAlign:'center'}}>অফার</Text> 
							</Col>
							
							
						</Row>
					</ListItem>
					
					<ListItem style={{marginTop:40}}>
						<Row>
							<Col><Text>House/Mess Name</Text></Col>
							<Col></Col>
						</Row>
					</ListItem>
					
					<ListItem style={{marginTop:40}}>
						<Row>
							<Col><Text>User Name</Text></Col>
							<Col></Col>
						</Row>
					</ListItem>
					
					
					<ListItem style={{marginTop:40}}>
						<Row>
							<Col><Text>Address</Text></Col>
							<Col></Col>
						</Row>
					</ListItem>
					
					
				 
					
				 
				
					 
					 <Row style={{marginTop:30}}>
						<Col></Col>
						
						<Col style={{justifyContent:'center'}}>
							<Button style={{backgroundColor:'orange',width:'100%',textAlign:'center',borderRadius:30,justifyContent:'center'}}>
							<Text style={{textAlign:'center'}}>LOGOUT</Text>
							</Button>
						</Col>
					    <Col></Col>
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

export default OfferScreen;