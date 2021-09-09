import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TouchableOpacity,ToastAndroid, ScrollView } from 'react-native';
import { Container, Header, Content, Button, Item, Input, Icon ,Body } from 'native-base';
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
			current_meal_manager:'',
			current_meal_manager_mobile:'',
			current_rice_manager:'',
			current_rice_manager_mobile:'',
			email:'',
			password:'',
			confirm_password:'',
			checked:'',
			checkedValue:'',
			btnSubmited:false,
			radioBtnsData: ['কারমাইকেল, রংপুর', 'পায়রা চত্তর, রংপুর', 'টাউন হল- ধাপ/ মেডিকেল, রংপুর'],
         
		}
	}
	
	
	submitRegistration=()=>{
		this.setState({btnSubmited:true});
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
			checkedValue:this.state.checkedValue,
			current_meal_manager:this.state.current_meal_manager,
			current_meal_manager_mobile:this.state.current_meal_manager_mobile,
			current_rice_manager:this.state.current_rice_manager,
			current_rice_manager_mobile:this.state.current_rice_manager_mobile,
		};
		console.log(data);
		
		if(!data.user_full_name){
			this.showToast('User name is required!')
			this.setState({btnSubmited:false});
			return
		}
		
		if(!data.full_address){
			this.showToast('Address is required!')
			this.setState({btnSubmited:false});
			return
		}
		
		if(!data.user_mobile){
			this.showToast('Mobile number is required!')
			this.setState({btnSubmited:false});
			return
		}
		
		if(!data.email){
			this.showToast('Email is required!')
			this.setState({btnSubmited:false});
			return
		}
		if(!data.checked){
			this.showToast('Terms & conditons is required!')
			this.setState({btnSubmited:false});
			return
		}
		
		if(!data.password){
			this.showToast('Password is required!')
			this.setState({btnSubmited:false});
			return
		}
		
		if(data.password!=data.confirm_password){
			this.showToast('Password is mismatch!')
			this.setState({btnSubmited:false});
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
					this.setState({btnSubmited:false});
					this.showToast(data)
				  }
				  
			  }).catch(error=>{
				  this.setState({btnSubmited:false});
				  console.log('error: ', error);
				  this.showToast(error)
				  
			}); 
			  
	}
	
	checkedRadio=(key)=>{
		this.setState({
			checkedValue: key,
			branch_name:this.state.radioBtnsData[key]
		})
	}
	
	showToast = (error) => {
			ToastAndroid.show(error, ToastAndroid.SHORT);
		};
	
  render() {
    return (
      <Container>
			<HeaderScreen navigation={this.props.navigation} total_price={this.props.cartList?this.props.cartList.total_final_price:'0.00'} title={"রেজিস্ট্রেশন"} />
			 <ImageBackground source={require('../assets/images/LoginScreen/login_bg.png')} style={styles.backgroundImage}>
				 
					
				  <ScrollView style={{marginTop:100,marginBottom:20, marginHorizontal:40,height:'55%'}}> 
					  <Grid style={{marginTop:10,marginHorizontal:5}}>
						
						<Row style={{marginTop:10}}>
							<Col style={{paddingLeft:10}}>
								<Icon name="home"/>
							</Col>
							
							<Col>
								<Button style={{backgroundColor:'#D5DED9',width:120,borderRadius:30}} onPress={() => this.props.navigation.navigate('Login')}><Text style={{fontSize:19,textAlign:'center',width:'100%'}}>লগ ইন</Text></Button>
							</Col>
						</Row>
					
						<Row style={styles.lineItem}>
							<Input placeholder="মেসের নাম *" onChangeText={house_mess_name=>{this.setState({house_mess_name})}} style={{fontSize:15}} />
						</Row>
						
							
						<Row style={styles.lineItem}>
							
							<Input placeholder="মেস পরিচালকের নাম *" onChangeText={user_full_name=>{this.setState({user_full_name})}} style={{fontSize:15}} />
						</Row>
						
						
					 
						<Row style={styles.lineItem }>
							
							<Input placeholder="মেস পরিচালকের মোবাইল *"  onChangeText={user_mobile=>{this.setState({user_mobile})}}  style={{fontSize:15}} />
						</Row>

						<Row style={styles.lineItem }>
							
							<Input keyboardType = 'number-pad' placeholder="মেসের মোট আসন সংখ্যা  *"   onChangeText={mess_member=>{this.setState({mess_member})}} style={{fontSize:15}} />
						</Row>



						<Row style={ styles.lineItem}>
							
							<Input placeholder="ঠিকানা, রোড নং, বাসা, ফ্ল্যাট নং *"  onChangeText={full_address=>{this.setState({full_address})}} style={{fontSize:15}} />
						</Row>


						
						<Text style={{marginLeft:20,color:'#333',marginTop:15}}>ব্রাঞ্চ নাম: *</Text>
						
						
						{this.state.radioBtnsData.map((data, key) => {
								return (
									<Row key={key} style={{marginLeft:20}}>
										{this.state.checkedValue == key ?
											<TouchableOpacity style={styles.btn} onPress={()=>{this.checkedRadio(key)}} >
												<Image style={styles.img} source={require("../assets/images/radio/checkedRadio.png")}/>
												<Text> {data}</Text>
											</TouchableOpacity>
											:
											<TouchableOpacity onPress={()=>{this.checkedRadio(key)}} style={styles.btn}>
												<Image style={styles.img} source={require("../assets/images/radio/unCheckedRadio.png")} />
												<Text> {data}</Text>
											</TouchableOpacity>
										}
									</Row>
								)
							})}
						<Row style={styles.lineItem}>
							
							<Input placeholder="চলতি মাসের মিল ম্যানেজারের নাম *" onChangeText={current_meal_manager=>{this.setState({current_meal_manager})}}  style={{fontSize:15}} />
						</Row>
						
						<Row style={styles.lineItem}>
							
							<Input keyboardType = 'number-pad' placeholder="মোবাইল নম্বর *" onChangeText={current_meal_manager_mobile=>{this.setState({current_meal_manager_mobile})}}  style={{fontSize:15}} />
						</Row>
						
						<Row style={styles.lineItem}>
							
							<Input placeholder="চলতি মাসের চাল ম্যনেজারের নাম"   onChangeText={current_rice_manager=>{this.setState({current_rice_manager})}}  style={{fontSize:15}} />
						</Row>
						<Row style={styles.lineItem}>
							
							<Input keyboardType = 'number-pad' placeholder="মোবাইল নম্বর "   onChangeText={current_rice_manager_mobile=>{this.setState({current_rice_manager_mobile})}}  style={{fontSize:15}} />
						</Row>
						
						<Row style={styles.lineItem}>
							
							<Input placeholder="ইমেইল *"   onChangeText={email=>{this.setState({email})}}  style={{fontSize:15}} />
						</Row>
						
						<Row style={styles.lineItem}>
							
							<Input placeholder="পাসওয়ার্ড *" secureTextEntry={true}  onChangeText={password=>{this.setState({password})}}   style={{fontSize:15}} />
						</Row>


						<Row style={styles.lineItem}>
							
							<Input placeholder="পুনরায় পাসওয়ার্ড *"  secureTextEntry={true} onChangeText={confirm_password=>{this.setState({confirm_password})}}   style={{fontSize:15}} />
						</Row>

						<Row style={styles.lineItem}>
								<View style={{flexDirection:'row',justifyContent:'center'}}>
										<CheckBox
										  title='Click Here'
										  value={this.state.checked}
										onValueChange={checked=>this.setState({checked:!this.state.checked})}
										/>
								
										<Text style={{marginTop:5}}>I accept the terms & conditons </Text>
								</View>
						</Row>

						
						
					  </Grid>
				</ScrollView>
		  
				<Grid>
					 <Row style={{marginTop:0}}>
						<Col></Col>
						
						<Col>
							<Button onPress={()=>this.submitRegistration()} disabled={this.state.btnSubmited} style={{backgroundColor:'#4DB679',width:'100%',borderRadius:30}}>
							<Text style={{textAlign:'center',width:'100%',color:'#fff',fontSize:19}}>রেজিস্ট্রেশন</Text></Button>
						</Col>
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
		height: null,
	},
	  lineItem:{
		  height:35,
		  marginVertical:5,
		  marginHorizontal:10,
		  borderBottomWidth:.3
	},
	  checkbox:{
		  textAlign:'center',
	},
	  checkboxTitle:{
		  color:'navy'
	},
	  img:{
        height:20,
        width: 20
	},
	btn:{
		flexDirection: 'row'
	}

});

export default connect(mapStateToProps,mapDispatchToProps)(MessUserRegistrationScreen);