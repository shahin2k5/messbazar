import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TextInput,TouchableOpacity  } from 'react-native';
import { Container, Header, Footer, FooterTab, Content, Item, Input, Icon , Button} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import HeaderScreen from './HeaderScreen';
import DeviceInfo from 'react-native-device-info';
import { connect, dispatch } from 'react-redux'
import * as apiService from '../services/apiService';
import * as actions from '../services/actions/actions'

function mapStateToProps(state){
	console.log('user logout reducer:::::',state.userReducer.user)
	return {
		user:state.userReducer.user
	}
}

function mapDispatchToProps(dispatch){
	return {
		userLogin:data=>dispatch(actions.userLogin(data))
	}
}

			
class LogoutScreen extends Component {
	
	constructor(props){
		super(props);
		 
		
		this.state = {
		
		 
		}
		
		
	}
	
	componentDidMount() {
		 
				this.logout();
			 
	  }
	  
	  
	componentDidUpdate() {
		 
				//this.logout();
			 
	  }

	  componentWillUnmount=()=>{
		if(this.props.navigation.focusListener){this.props.navigation.focusListener.remove();}
	  }
	
	logout=()=>{
		if(this.props.user){
			apiService.storeUserData("")
			this.props.userLogin([]) 
			this.props.navigation.navigate('Stack',{screen:'Home'})			
		}

	}
	
  render() {

    return (
      <Container>
			<HeaderScreen navigation={this.props.navigation} title={"Logout"} />
			<Content  >
				 <Grid>
					<Row>
						 
						<Col >
							 
						</Col>	
					</Row>
					
					<Row>
						 
						<Col >
						 
						</Col>	
					</Row>
					
				</Grid> 
				
				   
			</Content>
			
      </Container>
    );
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(LogoutScreen);