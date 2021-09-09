import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TextInput,TouchableOpacity  } from 'react-native';
import { Container, Header, Footer, FooterTab, Content, Item, Input, Icon , Button} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import HeaderScreen from './HeaderScreen';
import DeviceInfo from 'react-native-device-info';
import { connect, dispatch } from 'react-redux'
import { apiUrl, getCategoryAll } from '../services/apiService';



function mapStateToProps(state){
	console.log('user reducer:::::::',state.userReducer.user)
	return {
		user:state.userReducer.user
	}
}
			
class ProfileEditScreen extends Component {
	
	constructor(props){
		super(props);
		 
		
		this.state = {
			user:this.props.user,
		 
		 
				device_id : DeviceInfo.getUniqueId(),
				user_id: this.props.user.id,
				house_mess_name:this.props.user.house_mess_name,
				user_full_name:this.props.user.user_full_name,
				email:this.props.user.email,
				full_address:this.props.user.full_address,
				user_mobile:this.props.user.user_mobile,
				user_type:this.props.user.user_type,
				mess_member:this.props.user.mess_member,
				branch_name:this.props.user.branch_name,
				current_meal_manager:this.props.user.current_meal_manager,
				current_meal_manager_mobile:this.props.user.current_meal_manager_mobile,
				current_rice_manager:this.props.user.current_rice_manager,
				current_rice_manager_mobile:this.props.user.current_rice_manager_mobile,
				
				payment_method:'',
		 
		}
		
		
	}
	
	componentDidMount() {
		this.focusListener = this.props.navigation.addListener("focus", () =>
		{  
			this.setState({user:this.props.user})
			 if(this.props.user.length<1){
				this.props.navigation.navigate('Login');
			}
		}
		
		);
	  }

	  componentWillUnmount=()=>{
		if(this.props.navigation.focusListener){this.props.navigation.focusListener.remove();}
	  }
	
		  
	getHouseMessName=data=>{
		this.setState({house_mess_name:data});
	}
	
	getUserFullName=data=>{
		this.setState({user_full_name:data});
	}
	
	
	getFullAddress=data=>{
		this.setState({full_address:data});
	}

	getUserMobile=data=>{
		this.setState({user_mobile:data});
	}
	
	getBranchName=data=>{
		this.setState({branch_name:data});
	}
	
	getUserType=data=>{
		this.setState({user_type:data});
	}

	getPaymentMethod=data=>{
		this.setState({payment_method:data});
	}
	getCurrentMealManager=data=>{
		this.setState({current_meal_manager:data});
	}	
	
	getCurrentMealManagerMobile=data=>{
		this.setState({current_meal_manager_mobile:data});
	}	
	
	getCurrentRiceManager=data=>{
		this.setState({current_rice_manager:data});
	}	
	
	getCurrentRiceManagerMobile=data=>{
		this.setState({current_rice_manager_mobile:data});
	}
	  
	updateProfile=()=>{
		  let data;
		  if(this.state.user_type=="house"){
			   data = {
				  device_id:this.state.device_id,
				  user_id: this.state.user_id,
				  house_mess_name:this.state.house_mess_name,
				  user_full_name:this.state.user_full_name,
				  full_address:this.state.full_address,
				  user_mobile:this.state.user_mobile,
				  user_type:this.state.user_type,
				  branch_name:this.state.branch_name,
				  payment_method:this.state.payment_method,
				  token: this.state.user.token
			  }
		  }else{
			     data = {
				  device_id:this.state.device_id,
				  user_id: this.state.user_id,
				  house_mess_name:this.state.house_mess_name,
				  user_full_name:this.state.user_full_name,
				  full_address:this.state.full_address,
				  user_mobile:this.state.user_mobile,
				  user_type:this.state.user_type,
				  branch_name:this.state.branch_name,
				  current_meal_manager:this.state.current_meal_manager,
				  current_meal_manager_mobile:this.state.current_meal_manager_mobile,
				  current_rice_manager:this.state.current_rice_manager,
				  current_rice_manager_mobile:this.state.current_rice_manager_mobile,
				  payment_method:this.state.payment_method,
				  token: this.state.user.token
			  }
		  }
		  console.log('profile update before: ',data);
		  
		  fetch(apiUrl+"profile_update",{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json',
				  'Authorization': 'Bearer ' + this.state.user.token
				},
				body: JSON.stringify(data)
			  }).then(response=>response.json()).then(data=>{
				  console.log('profile success data: ', data);
				  if(data.status=="success"){
					this.props.navigation.navigate('Profile');
				  }else{
					  console.log('some thing is wrong with profile update')
				  }
			  }).catch(error=>{
				  console.log('error: ', error);
			  }); 
			  
	}
	
	
  render() {

    return (
      <Container>
			<HeaderScreen navigation={this.props.navigation} title={"প্রোপাইল"} />
			<Content style={styles.contentBar}>
				{this.state.user.user_type=="house"?(<Grid>
					<Row>
						 
						<Col>
							<Item style={styles.lineItemHead}>
						 
								<Text style={styles.bgTxtTitle}>ব্যবহারকারীর তথ্য সংশোধন</Text>
							</Item>
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
								<TextInput 
									value={this.state.house_mess_name} 
									onChangeText={text=>this.getHouseMessName(text)} 
									placeholder="বাসার নাম/মেসের নাম" />
							</Item>
						</Col>	
					</Row>
					
					<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								
								<Icon type={"FontAwesome"} active name='user' style={{width:35}} />
								<Text style={styles.bgTxt}>ব্যবহারকারীর নাম</Text>
								<TextInput 
									value={this.state.user_full_name} 
									onChangeText={text=>this.getUserFullName(text)} 
									placeholder="ব্যবহারকারীর নাম" />
							</Item>
						</Col>	
					</Row>
					
					
					<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='address-card' style={{width:35}} />
								<Text style={styles.bgTxt}>ঠিকানা</Text>
								<TextInput value={this.state.full_address}  onChangeText={text=>this.getFullAddress(text)} placeholder="ঠিকানা" />
							</Item>
						</Col>	
					</Row>
					 
					<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='telegram' style={{width:35}}/>
								<Text style={styles.bgTxt}>মোবাইল</Text>
								<TextInput  value={this.state.user_mobile}  onChangeText={text=>this.getUserMobile(text)} placeholder="মোবাইল" />
							</Item>
						</Col>	
					</Row>
					
						 
					<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='server' style={{width:35}}/>
								<Text style={styles.bgTxt}>ব্যবহারকারীর ধরণ</Text>
								<TextInput  value={this.state.user_type}  editable={false} placeholder="ব্যবহারকারীর ধরণ" />
							</Item>
						</Col>	
					</Row>
					
					<Row>	 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='codiepie' style={{width:35}}/>
								<Text style={styles.bgTxt}>জেলার নাম</Text>
								<TextInput  value={this.state.branch_name}  onChangeText={text=>this.getBranchName(text)} placeholder="ব্র্যাঞ্চ নাম" />
							</Item>
						</Col>	
					</Row>
					
					<Row>	 
						<Col style={{justifyContent:'center',alignItems:'center'}}>
								<Button onPress={this.updateProfile} style={{width:120,textAlign:'center',justifyContent:'center',alignSelf:'center',paddingRight:15,marginTop:50}}>
									<Icon type={"FontAwesome"} active name='save'/>
									<Text style={{color:'#fff'}}>Update</Text>
								</Button>
						</Col>	
					</Row> 
					
				</Grid>):(<Grid>
					<Row>
						 
						<Col >
							<Item style={styles.lineItemHead}>
						 
								<Text style={styles.bgTxtTitle}>ব্যবহারকারীর তথ্য সংশোধন </Text>
							</Item>
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
								<TextInput 
									value={this.state.house_mess_name} 
									onChangeText={text=>this.getHouseMessName(text)} 
									placeholder="বাসার নাম/মেসের নাম" />
							</Item>
						</Col>	
					</Row>
					
					<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								
								<Icon type={"FontAwesome"} active name='user' style={{width:35}} />
								<Text style={styles.bgTxt}>ব্যবহারকারীর নাম</Text>
								<TextInput 
									value={this.state.user_full_name} 
									onChangeText={text=>this.getUserFullName(text)} 
									placeholder="ব্যবহারকারীর নাম" />
							</Item>
						</Col>	
					</Row>
					
					
					<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='address-card' style={{width:35}} />
								<Text style={styles.bgTxt}>ঠিকানা</Text>
								<TextInput value={this.state.full_address}  onChangeText={text=>this.getFullAddress(text)} placeholder="ঠিকানা" />
							</Item>
						</Col>	
					</Row>
					
					 
				 
					
					 
					<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='telegram' style={{width:35}}/>
								<Text style={styles.bgTxt}>মোবাইল</Text>
								<TextInput  value={this.state.user_mobile}  onChangeText={text=>this.getUserMobile(text)} placeholder="মোবাইল" />
							</Item>
						</Col>	
					</Row>
					
						 
					<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='server' style={{width:35}}/>
								<Text style={styles.bgTxt}>ব্যবহারকারীর ধরণ</Text>
								<TextInput value={this.state.user_type} editable={false}  onChangeText={text=>this.getUserType(text)} placeholder="ব্যবহারকারীর ধরণ" />
							</Item>
						</Col>	
					</Row>
					
					<Row>	 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='codiepie' style={{width:35}}/>
								<Text style={styles.bgTxt}>ব্র্যাঞ্চ নাম</Text>
								<TextInput  value={this.state.branch_name}  onChangeText={text=>this.getBranchName(text)} placeholder="ব্র্যাঞ্চ নাম" />
							</Item>
						</Col>	
					</Row>
					
					<Row>	 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='user' style={{width:35}}/>
								<Text style={styles.bgTxt}>মিল ম্যানেজার</Text>
								<TextInput  value={this.state.current_meal_manager}  onChangeText={text=>this.getCurrentMealManager(text)} placeholder="ব্র্যাঞ্চ নাম" />
							</Item>
						</Col>	
					</Row>
					
					<Row>	 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='telegram' style={{width:35}}/>
								<Text style={styles.bgTxt}>মিল ম্যা. মোবাইল</Text>
								<TextInput  value={this.state.current_meal_manager_mobile}  onChangeText={text=>this.getCurrentMealManagerMobile(text)} placeholder="ব্র্যাঞ্চ নাম" />
							</Item>
						</Col>	
					</Row>
					<Row>	 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='user' style={{width:35}}/>
								<Text style={styles.bgTxt}>রাইস ম্যানেজার</Text>
								<TextInput  value={this.state.current_rice_manager}  onChangeText={text=>this.getCurrentRiceManager(text)} placeholder="ব্র্যাঞ্চ নাম" />
							</Item>
						</Col>	
					</Row>
					<Row>	 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='telegram' style={{width:35}}/>
								<Text style={styles.bgTxt}>রাইস ম্যা. মোবাইল</Text>
								<TextInput  value={this.state.current_rice_manager_mobile}  onChangeText={text=>this.getCurrentRiceManagerMobile(text)} placeholder="ব্র্যাঞ্চ নাম" />
							</Item>
						</Col>	
					</Row>
				 
					<Row>	 
						<Col style={{justifyContent:'center',alignItems:'center'}}>
								<Button onPress={this.updateProfile} style={{width:120,textAlign:'center',justifyContent:'center',alignSelf:'center',paddingRight:15,marginTop:50}}>
									<Icon type={"FontAwesome"} active name='save'/>
									<Text style={{color:'#fff'}}>Update</Text>
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

export default connect(mapStateToProps)(ProfileEditScreen);