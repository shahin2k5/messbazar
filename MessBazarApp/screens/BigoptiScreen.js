import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground } from 'react-native';
import { Container, Header, Content, Button, Item, Input, Icon ,Body } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import CheckBox from '@react-native-community/checkbox';
import { apiUrl, getCategoryAll } from '../services/apiService';
import HeaderScreen from './HeaderScreen';
import { connect, dispatch } from 'react-redux' 
import * as actions from '../services/actions/actions'

function mapStateToProps(state){
	return {
		bigopti: state.userReducer.bigopti
	}
}

function mapDispatchToProps(dispatch){
	return { 
			getBigopti:data=>dispatch(actions.getBigopti(data)),
	}
}



class BigoptiScreen extends Component {
	
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
	
		
		fetch(apiUrl+"auth/registration",{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			  }).then(response=>response.json()).then(data=>{
				  //this.props.navigation.navigate('ShoppingCart',{cartid:8});
			  },error=>{
				  console.log('error: ', error);
			  }); 
			  
	}
	
	renderBigopti=()=>{
		return this.props.bigopti.map((bigopti, index)=>{
			return(
				
					<Row style={{marginTop:40}} key={index}>
						<Row>
							<Col><Text style={{textAlign:'center',padding:30,fontSize:18}}>{bigopti.bigopti}</Text></Col>
						</Row>
					</Row>
			 
			);
		});
	}
  render() {
    return (
      <Container>
			<HeaderScreen navigation={this.props.navigation} title={"প্রোপাইল"} />
			 <ImageBackground source={require('../assets/images/LoginScreen/login_bg.png')} style={styles.backgroundImage}>
				  
				  <Grid style={{marginTop:80, paddingLeft:5}}>
					
						
					<Row >
						 <Row>
 
							<Col>
								 <Text style={{fontSize:20,textAlign:'center'}}>বিজ্ঞপ্তি</Text> 
							</Col>
							
							
						</Row>
					</Row>
					{this.renderBigopti()}
					
					
				
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

export default connect(mapStateToProps, mapDispatchToProps)(BigoptiScreen);