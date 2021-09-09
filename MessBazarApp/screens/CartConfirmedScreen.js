import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TextInput,TouchableOpacity  } from 'react-native';
import { Container, Header, Footer, FooterTab, Content, Input, Icon , Button} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import HeaderScreen from './HeaderScreen';
import DeviceInfo from 'react-native-device-info';
import { connect, dispatch } from 'react-redux'
import { apiUrl } from '../services/apiService';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as actions from '../services/actions/actions'


 
function mapDispatchToProps(dispatch){
	return { 
			getCartList:data=>dispatch(actions.getCartList(data))
	}
}

function mapStateToProps(state){
	return {
		user:state.userReducer.user,
		cartList:state.cartReducer.cartList
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
				dTime:'',
				chosenDate: new Date(),
				showTime:false
		 
		}
	}
	
	
	

	onRadioBtnClick = (View) => {
			let updatedState = this.state.isLiked.map((isLikedView) =>
			  isLikedView.id === View.id
				? { ...isLikedView, selected: true }
				: { ...isLikedView, selected: false }
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
			  cart_id:this.props.cartList.id,
			  user_id: this.props.user.id,
			  house_mess_name:this.state.house_mess_name,
			  user_full_name:this.state.user_full_name,
			  full_address:this.state.full_address,
			  user_mobile:this.state.user_mobile,
			  user_type:this.state.user_type,
			  branch_name:this.state.branch_name,
			  payment_method:this.state.payment_method,
			  token: this.state.user.token,
			  delivery_time:this.state.chosenDate
		  }
		  
		  
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
					this.props.getCartList([]);
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

	showTime=()=>{
		this.setState({
			showTime:true
		})
	}

	setDate=(event, newTime)=>{
		console.log('time: ',newTime)
		this.setState({chosenDate: newTime,
			showTime:false
		})
	}
	
  render() {

    return (
      <Container>
			<HeaderScreen navigation={this.props.navigation} title={"কনফার্ম অর্ডার"} total_price={this.props.cartList?this.props.cartList.total_final_price:'0.00'}/>
			<Content style={styles.contentBar}>
				<Grid>
					<Row>
						 
						<Col >
							<View style={styles.lineViewHead}>
						 
								<Text style={styles.bgTxt}>DELIVERY ADDRESS</Text>
							</View>
						</Col>	
					</Row>
					
					<Row>
						 
						<Col >
							<View style={styles.lineView}>
								
								<Icon type={"FontAwesome"} style={{width:35}} active name='inbox' />
								<Text style={{width:'32%'}}>Email: </Text>
								<Text> {this.props.user ? this.props.user.email:'Email not found!'}</Text>
							</View>
						</Col>	
					</Row>
					
					<Row>
						 
						<Col >
							<View style={styles.lineView}>
								
								<Icon type={"FontAwesome"} style={{width:35}} active name='university' />
								<Text style={{width:'32%'}}>বাসার/মেসের নাম</Text>
								<TextInput style={{borderBottomWidth:1,width:'55%'}}
									value={this.state.house_mess_name} 
									onChangeText={text=>this.getHouseMessName(text)} 
									placeholder="বাসার নাম/মেসের নাম" />
							</View>
						</Col>	
					</Row>
					
					<Row>
						 
						<Col >
							<View style={styles.lineView}>
								
								<Icon type={"FontAwesome"} style={{width:35}} active name='user' />
								<Text style={{width:'32%'}}>ব্যবহারকারীর নাম</Text>
								<TextInput style={{borderBottomWidth:1,width:'55%'}}
									value={this.state.user_full_name} 
									onChangeText={text=>this.getUserFullName(text)} 
									placeholder="ব্যবহারকারীর নাম" />
							</View>
						</Col>	
					</Row>
					
					
					<Row>
						 
						<Col >
							<View style={styles.lineView}>
								<Icon type={"FontAwesome"} style={{width:35}} active name='address-card' />
								<Text style={{width:'32%'}}>ঠিকানা</Text>
								<TextInput style={{borderBottomWidth:1,width:'55%'}}value={this.state.full_address}  onChangeText={text=>this.getFullAddress(text)} placeholder="ঠিকানা" />
							</View>
						</Col>	
					</Row>
					
					<Row>
						 
						<Col >
							<View style={styles.lineView}>
								<Icon type={"FontAwesome"} style={{width:35}} active name='telegram' />
								<Text style={{width:'32%'}}>মোবাইল</Text>
								<TextInput style={{borderBottomWidth:1,width:'55%'}} value={this.state.user_mobile}  onChangeText={text=>this.getUserMobile(text)} placeholder="মোবাইল" />
							</View>
						</Col>	
					</Row>
					
						 
				
					
					
					<Row style={{marginTop:30}}>
						<Col style={{justifyContent:'center'}}>
							<Text style={{fontSize:21,color:'green', textAlign:'center'}}>বাজার পৌছানোর সময়:</Text>
							<Text style={{fontSize:21,color:'green',textAlign:'center'}} onPress={()=>this.showTime()}>
								{ this.state.chosenDate.toLocaleTimeString() }
								<Icon name="chevron-down" onPress={()=>this.showTime()}/>
							</Text>
							
							<Text style={{fontSize:21,color:'green',textAlign:'center'}}>
								{this.state.showTime && (<DateTimePicker
									testID="dateTimePicker"
									value={this.state.chosenDate}
									mode={"time"}
									is24Hour={false}
									display="clock"
									onChange={this.setDate}
								/>)}
							
							</Text>

								
						</Col>
					</Row>
					 
 
					
				</Grid>
				   
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
							  <Text style={{width:'40%'}}>TOTAL</Text>
							  <Text style={{width:'40%'}}>৳ {this.props.cartList.total_final_price}</Text>
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

  lineView:{
	  height:40,
	  marginVertical:7,
	  flexDirection:'row',
	  justifyContent:'flex-start'
  }
	 
});

export default connect(mapStateToProps,mapDispatchToProps)(CartConfirmedScreen);