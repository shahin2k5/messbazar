import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TextInput,TouchableOpacity  } from 'react-native';
import { Container, Header, Footer, FooterTab, Content, Item, Input, Icon , Button} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderScreen from './HeaderScreen';
import DeviceInfo from 'react-native-device-info';
import { connect, dispatch } from 'react-redux'
import * as apiService from '../services/apiService';
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
			
class ProfileScreen extends Component {
	
	constructor(props){
		super(props);
		let uniqueId = DeviceInfo.getUniqueId();
		let user = this.props.user;
		this.state = {
				user:user,
				device_id : uniqueId,
				house_mess_name:user?user.house_mess_name:'',
				user_full_name: user?user.user_full_name:'',
				email: user?user.email:'',
				full_address:user?user.full_address:'',
				user_mobile:user?user.user_mobile:'',
				user_type:user?user.user_type:'',
				mess_member:user?user.mess_member:'',
				branch_name:user?user.branch_name:'',
				current_meal_manager:user?user.current_meal_manager:'',
				current_meal_manager_mobile:user?user.current_meal_manager_mobile:'',
				current_rice_manager:user?user.current_rice_manager:'',
				current_rice_manager_mobile:user?user.current_rice_manager_mobile:'',
				payment_method:'',
		}
	}
	
	componentDidMount() {
		
		 this.focusListener = this.props.navigation.addListener("focus", () =>{  	
		 
			 apiService.getUserData().then(user=>{
				console.log('profile user 52::::',user)
				if(user){
					this.props.userLogin(user)
					this.setState({user:this.props.user})
					}else{
					console.log('Profile Screen 58:::',this.props.user);		 
					this.props.navigation.navigate('Stack',{screen:'Login'});
					return true;
				}
				// if(this.props.user && Object.keys(this.props.user).length>0){
					 // console.log('Profile Screen tmp:::',Object.keys(this.props.user).length);
					 // this.setState({user:this.props.user})
					 // return true;
				 // }else if(Object.keys(this.props.user).length<1){	
					// console.log('Profile Screen2:::',this.props.user);		 
					// this.props.navigation.navigate('Stack',{screen:'Login'});
					// return true;
				 // }
			}).catch(error=>console.log(error))//apiService
		 }
		
		 );
	  }
	  
	  checkUserLogin=()=>{
	 
		 
	 
	  }
	  

	  componentWillUnmount=()=>{
		if(this.props.navigation.focusListener){this.props.navigation.focusListener.remove();}
	  }
  
    
	
	openEditProfile=()=>{
		this.props.navigation.navigate('ProfileEdit');
	}
	
	logoutProfile=()=>{
		this.props.navigation.navigate('Stack',{screen:'Logout'});
	}
	
  render() {

    return (
      <Container>
			 
			<HeaderScreen navigation={this.props.navigation} title={"প্রোপাইল"} />
			<Content style={styles.contentBar}>
				{this.props.user && this.props.user.user_type=="house"?(<Grid>
					<Row>
						 
						<Col size={80}>
							<Item style={styles.lineItemHead}>
						 
								<Text style={styles.bgTxtTitle}>ব্যবহারকারীর বিবরণ</Text>
							</Item>
						</Col>	
						<Col size={10} style={{justifyContent:'center'}}>
							<Icon name='pencil' onPress={()=>this.openEditProfile()} style={{backgroundColor:'#eca',height:40,marginTop:-10,padding:7}}/>  
						</Col>
					</Row>
					
					<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								
								<Icon type={"FontAwesome"} active name='inbox' style={{width:35}}/>
								<Text style={styles.bgTxt}>Email: </Text>
								<Text>{this.props.user ? this.props.user.email:'Email not found!'}</Text>
							</Item>
						</Col>	
					</Row>
					
					<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								
								<Icon type={"FontAwesome"} active name='university' style={{width:35}} />
								<Text style={styles.bgTxt}>বাসার নাম/মেসের নাম</Text>
								<Text> 
									 {this.props.user.house_mess_name} 
								</Text>
							</Item>
						</Col>	
					</Row>
					
					<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								
								<Icon type={"FontAwesome"} active name='user' style={{width:35}} />
								<Text style={styles.bgTxt}>ব্যবহারকারীর নাম</Text>
								<Text>{this.props.user.user_full_name}</Text> 
							</Item>
						</Col>	
					</Row>
					
					
					<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='address-card' style={{width:35}} />
								<Text style={styles.bgTxt}>ঠিকানা</Text>
								<Text>{this.props.user.full_address}</Text>
							</Item>
						</Col>	
					</Row>
					
					<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='telegram' style={{width:35}}/>
								<Text style={styles.bgTxt}>মোবাইল</Text>
								<Text>{this.props.user.user_mobile}</Text>
							</Item>
						</Col>	
					</Row>
					
						 
					<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='server' style={{width:35}}/>
								<Text style={styles.bgTxt}>ব্যবহারকারীর ধরণ</Text>
								<Text>{this.props.user.user_type}</Text>
							</Item>
						</Col>	
					</Row>
					
					<Row>	 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='codiepie' style={{width:35}}/>
								<Text style={styles.bgTxt}>জেলার নাম</Text>
								<Text>{this.props.user.branch_name}</Text>
							</Item>
						</Col>	
					</Row>
					
					<Row>	 
						<Col style={{justifyContent:'center',alignItems:'center'}}>
								<Button onPress={()=>this.logoutProfile()} style={{width:120,textAlign:'center',justifyContent:'center',alignSelf:'center',paddingRight:15,marginTop:50}}>
									<Icon type={"FontAwesome"} active name='close'/>
									<Text style={{color:'#fff'}}>LOGOUT</Text>
								</Button>
						</Col>	
					</Row>   
					 
					 
					 
					
				</Grid>):(<Grid>
					<Row>
						 
						<Col size={80}>
							<Item style={styles.lineItemHead}>
						 
								<Text style={styles.bgTxtTitle}>ব্যবহারকারীর বিবরণ</Text>
							</Item>
						</Col>	
						<Col size={10} style={{justifyContent:'center'}}>
							<Icon name='pencil' onPress={()=>this.openEditProfile()} style={{backgroundColor:'#eca',height:40,marginTop:-10,padding:7}}/>  
						</Col>
					</Row>
					
					<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								
								<Icon type={"FontAwesome"} active name='inbox' style={{width:35}}/>
								<Text style={styles.bgTxt}>Email: </Text>
								<Text>{this.props.user ? this.props.user.email:'Email not found!'}</Text>
							</Item>
						</Col>	
					</Row>
					
					<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								
								<Icon type={"FontAwesome"} active name='university' style={{width:35}} />
								<Text style={styles.bgTxt}>বাসার নাম/মেসের নাম</Text>
								<Text> 
									 {this.props.user && this.props.user.house_mess_name} 
								</Text>
							</Item>
						</Col>	
					</Row>
					
					<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								
								<Icon type={"FontAwesome"} active name='user' style={{width:35}} />
								<Text style={styles.bgTxt}>ব্যবহারকারীর নাম</Text>
								<Text>{this.props.user && this.props.user.user_full_name}</Text> 
							</Item>
						</Col>	
					</Row>
					
					
					<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='address-card' style={{width:35}} />
								<Text style={styles.bgTxt}>ঠিকানা</Text>
								<Text>{this.props.user && this.props.user.full_address}</Text>
							</Item>
						</Col>	
					</Row>
					 
					<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='telegram' style={{width:35}}/>
								<Text style={styles.bgTxt}>মোবাইল</Text>
								<Text>{this.props.user && this.props.user.user_mobile}</Text>
							</Item>
						</Col>	
					</Row>
					
						 
					<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='server' style={{width:35}}/>
								<Text style={styles.bgTxt}>ব্যবহারকারীর ধরণ</Text>
								<Text>{this.props.user && this.props.user.user_type}</Text>
							</Item>
						</Col>	
					</Row>
					
					<Row>	 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='codiepie' style={{width:35}}/>
								<Text style={styles.bgTxt}>ব্র্যাঞ্চ নাম</Text>
								<Text>{this.props.user && this.props.user.branch_name}</Text>
							</Item>
						</Col>	
					</Row>
					
					<Row>	 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='user' style={{width:35}}/>
								<Text style={styles.bgTxt}>মিল ম্যানেজার</Text>
								<Text>{this.props.user && this.props.user.current_meal_manager}</Text>
							</Item>
						</Col>	
					</Row>
					
					<Row>	 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='telegram' style={{width:35}}/>
								<Text style={styles.bgTxt}>মিল ম্যানে. মোবাইল</Text>
								<Text>{this.props.user && this.props.user.current_meal_manager_mobile}</Text>
							</Item>
						</Col>	
					</Row>
					<Row>	 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='user' style={{width:35}}/>
								<Text style={styles.bgTxt}>রাইস ম্যানেজার</Text>
								<Text>{this.props.user && this.props.user.current_rice_manager}</Text>
							</Item>
						</Col>	
					</Row>
					<Row>	 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='telegram' style={{width:35}}/>
								<Text style={styles.bgTxt}>রাইস ম্যানে. মোবাইল</Text>
								<Text>{this.props.user && this.props.user.current_rice_manager_mobile}</Text>
							</Item>
						</Col>	
					</Row>
				 
					<Row>	 
						<Col style={{justifyContent:'center',alignItems:'center',marginTop:-30}}>
								<Button onPress={()=>this.logoutProfile()} style={{width:120,textAlign:'center',justifyContent:'center',alignSelf:'center',paddingRight:15,marginTop:50}}>
									<Icon type={"FontAwesome"} active name='close'/>
									<Text style={{color:'#fff'}}>LOGOUT</Text>
								</Button>
						</Col>	
					</Row>   
					 
					
				</Grid>)}
				
				   
			</Content>
			
				<Footer style={{backgroundColor:'#93FC87'}}>
				 
						  <FooterTab>
							<Button style={{backgroundColor:'#93FC87'}} onPress={()=>{this.props.navigation.navigate('Home')}}>
								<Icon name="home"  style={{color:'#333'}}/>
							  <Text>
								হোম
							  </Text>
							 
							</Button>
							
							<Button  style={{backgroundColor:'#93FC87'}}>
							  <Text></Text>
							  <Text></Text>
							</Button>
							<Button  style={{backgroundColor:'#009933',color:'#fff'}}>
							  
							  <Text  style={{color:'#fff'}}> </Text>
							</Button>
						  </FooterTab>
			</Footer>
			
      </Container>
    );
  }
}

const styles = StyleSheet.create({
	contentBar:{
		padding:5
	},
	bgTxt:{
		backgroundColor:'#ddd',
		padding:5,
		textAlign:'center',
		width:'35%',
		fontWeight:'bold',
		marginRight:15
	},
	bgTxtTitle:{
		backgroundColor:'#ddd',
		padding:5,
		textAlign:'center',
		width:'100%',
		fontSize:23,
		fontWeight:'bold',
		marginBottom:10
	},
	 radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 45
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    alignItems: "center",
    justifyContent: "center"
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: "#98CFB6"
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16
  },
  lineItem:{
	  height:40
  }
	 
});

export default connect(mapStateToProps,mapDispatchToProps)(ProfileScreen);