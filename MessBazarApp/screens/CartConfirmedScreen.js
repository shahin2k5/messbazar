import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TextInput,TouchableOpacity  } from 'react-native';
import { Container, Header, Footer, FooterTab, Content, Item, Input, Icon , Button} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import HeaderScreen from './HeaderScreen';
import DeviceInfo from 'react-native-device-info';
import { connect, dispatch } from 'react-redux'
import { apiUrl, getCategoryAll } from '../services/apiService';


const RadioButton = ({ onPress, selected, children }) => {
			  return (
				<View style={styles.radioButtonContainer}>
				  <TouchableOpacity onPress={onPress} style={styles.radioButton}>
					{selected ? <View style={styles.radioButtonIcon} /> : null}
				  </TouchableOpacity>
				  <TouchableOpacity onPress={onPress}>
					<Text style={styles.radioButtonText}>{children}</Text>
				  </TouchableOpacity>
				</View>
			  );
			};

function mapStateToProps(state){
	console.log('map user cart confirmed: ', state.userReducer.user)
	return {
		user:state.userReducer.user
	}
}
			
class CartConfirmedScreen extends Component {
	
	constructor(props){
		super(props);
		let user = this.props.user;
		this.state = {
			user:this.props.user,
			isLiked:[	{ id: 1, value: true, name: "Yes", selected: false },
						{ id: 2, value: false, name: "No", selected: false }
					  ],
		 
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
				payment_method:'',
		 
		}
	}
	
	
	

	onRadioBtnClick = (item) => {
			let updatedState = this.state.isLiked.map((isLikedItem) =>
			  isLikedItem.id === item.id
				? { ...isLikedItem, selected: true }
				: { ...isLikedItem, selected: false }
			);
			setIsLiked(updatedState);
		  };
		  
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
	  
	confirmedCarts=()=>{
	 
		  let data = {
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
		  console.log('cart confired before: ',data);
		  
		  fetch(apiUrl+"cartconfirm",{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json',
				  'Authorization': 'Bearer ' + this.state.user.token
				},
				body: JSON.stringify(data)
			  }).then(response=>response.json()).then(data=>{
				  console.log('order success data: ', data);
				  if(data.status=="success"){
					//this.props.userLogin(data.user);
					this.props.navigation.navigate('CartSuccess',{orderid:data.data.id});
				  }else{
					  console.log('some thing is wrong with order confirm')
				  }
			  }).catch(error=>{
				  console.log('error: ', error);
			  }); 
			  
	}
	
	dTime=()=>{
		var dTime = new Date();
		dTime = dTime.setHours(dTime.getHours() + 2); 
		return new Date(dTime).toLocaleString();
	}
	
  render() {

    return (
      <Container>
			<HeaderScreen navigation={this.props.navigation} title={"CART CONFIRM"} />
			<Content style={styles.contentBar}>
				<Grid>
					<Row>
						 
						<Col >
							<Item style={styles.lineItemHead}>
						 
								<Text style={styles.bgTxt}>DELIVERY ADDRESS</Text>
							</Item>
						</Col>	
					</Row>
					
					<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								
								<Icon type={"FontAwesome"} active name='inbox' />
								<Text>Email: {this.props.user ? this.props.user.email:'Email not found!'}</Text>
							</Item>
						</Col>	
					</Row>
					
					<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								
								<Icon type={"FontAwesome"} active name='university' />
								<Text>বাসার নাম/মেসের নাম</Text>
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
								
								<Icon type={"FontAwesome"} active name='user' />
								<Text>ব্যবহারকারীর নাম</Text>
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
								<Icon type={"FontAwesome"} active name='address-card' />
								<Text>ঠিকানা</Text>
								<TextInput value={this.state.full_address}  onChangeText={text=>this.getFullAddress(text)} placeholder="ঠিকানা" />
							</Item>
						</Col>	
					</Row>
					
					 
				 
					
					 
					<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='telegram' />
								<Text>মোবাইল</Text>
								<TextInput  value={this.state.user_mobile}  onChangeText={text=>this.getUserMobile(text)} placeholder="মোবাইল" />
							</Item>
						</Col>	
					</Row>
					
						 
					<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='server' />
								<Text>ব্যবহারকারীর ধরণ</Text>
								<TextInput  value={this.state.user_type}  onChangeText={text=>this.getUserType(text)} placeholder="ব্যবহারকারীর ধরণ" />
							</Item>
						</Col>	
					</Row>
					
						<Row>
						 
						<Col >
							<Item style={styles.lineItem}>
								<Icon type={"FontAwesome"} active name='codiepie' />
								<Text>ব্র্যাঞ্চ নাম</Text>
								<TextInput  value={this.state.branch_name}  onChangeText={text=>this.getBranchName(text)} placeholder="ব্র্যাঞ্চ নাম" />
							</Item>
						</Col>	
					</Row>
					
					
					<Row style={{marginTop:30}}>
						<Col style={{justifyContent:'center'}}>
							<Text style={{fontSize:21,color:'green', textAlign:'center'}}>বাজার পৌছানোর সময়:</Text>
							<Text style={{fontSize:21,color:'green',textAlign:'center'}}> { this.dTime() }</Text>
							
						</Col>
					</Row>
					{/****
					<Row>
						 
						<Col >
							<Item>
							 
								<Text style={styles.bgTxt}>PAYMENT METHOD</Text>
							</Item>
						</Col>	
					</Row>
					
				<Row style={{marginTop:20}}>	 
					<Col >	
						 <View style={styles.radioButtonContainer}>
						   <TouchableOpacity onPress={() =>{this.getPaymentMethod('bkash')}} style={styles.radioButton}>
							 <View style={styles.radioButtonIcon} />
						   </TouchableOpacity>
						   <TouchableOpacity onPress={() => {this.getPaymentMethod('bkash')}}>
							 <Text style={styles.radioButtonText}>BKASH</Text>
						   </TouchableOpacity>
						 </View>					
					</Col>
				</Row>
				
				
							
				<Row  style={{marginTop:10}}>	 
					<Col>	
						 <View style={styles.radioButtonContainer}>
						   <TouchableOpacity onPress={() => {this.getPaymentMethod('cash')}} style={styles.radioButton}>
							 <View style={styles.radioButtonIcon} />
						   </TouchableOpacity>
						   <TouchableOpacity onPress={() => {this.getPaymentMethod('cash')}}>
							 <Text style={styles.radioButtonText}>CASH ON DELIVERY</Text>
						   </TouchableOpacity>
						 </View>					
					</Col>
				</Row>
						 
						**/}	
				 
				 
				 
					
				</Grid>
				   
			</Content>
			
				<Footer style={{backgroundColor:'#93FC87'}}>
				 
						  <FooterTab>
							<Button style={{backgroundColor:'#93FC87'}} onPress={()=>{this.openPreviousCart()}}>
								<Icon name="arrow-back"  style={{color:'#333'}}/>
							  <Text>
								আগের তালিকা
							  </Text>
							 
							</Button>
							
							<Button  style={{backgroundColor:'#93FC87'}}>
							  <Text>TOTAL</Text>
							  <Text>৳</Text>
							</Button>
							<Button onPress={()=>this.confirmedCarts()} style={{backgroundColor:'#009933',color:'#fff'}}>
							  <Icon name="cart"/>
							  <Text  style={{color:'#fff'}}>কনফার্ম অর্ডার</Text>
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
		width:'100%',
		fontWeight:'bold'
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

export default connect(mapStateToProps)(CartConfirmedScreen);