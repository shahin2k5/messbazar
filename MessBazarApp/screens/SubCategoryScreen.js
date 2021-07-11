import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TouchableOpacity  } from 'react-native';
import { Container, Header, Footer, FooterTab, Button, Content, Item, Input, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import HeaderScreen from './HeaderScreen';
import * as api from '../services/apiService';
import { connect } from 'react-redux'
import DeviceInfo from 'react-native-device-info';

function mapStateToProps(state){
	return {
		cartList:state.cartReducer.cartList
	}
}

class SubCategoryScreen extends Component {
	
	 constructor(props) {
		super(props);
		 this.state = {
			  subcategoryList: [], // list is empty in the beginning
			  error: false,
			  uniqueId : DeviceInfo.getUniqueId()
		   };
	  }
	  
	 componentDidMount(){
		  this.getSubCategoryList();
		}	  
		
	componentDidUpdate(){
		  this.getSubCategoryList();
		}
		
 
		
	getSubCategoryList = async () => {
       try { 
	   
			   const catid = this.props.route.params.category?this.props.route.params.category:0;
			   const response = await fetch(api.apiUrl+"subcategory/list/"+catid);
			   if (response.ok) {
				   const data = await response.json();
				   // console.log('response data: ',data);
				   this.setState({
					   subcategoryList:data
				   })		   
			   } else { this.setState({ error: true }) }
		   } catch (e) { 
				console.log('error: ',e);
			}
	  }

	renderCategory=()=>{
		return this.state.subcategoryList.map((subcategory, index)=>{
			var icon = subcategory.image;
			return(
				<TouchableOpacity key={index} size={32} style={styles.button} onPress={()=>this.onPressOpen(subcategory.id)} >
					<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-6.png')} style={styles.btnBackground}>
						
						<Image source={{uri:api.apiBaseUrl+subcategory.image}} 				style={styles.btnText}/>
						<Text style={styles.btnTitle}>{subcategory.category_title}</Text>
					</ImageBackground>
				</TouchableOpacity>
			 
			);
		});
	}
	
 onPressOpen=(subcategoryID)=>{
	  this.props.navigation.navigate('ProductList',{subcategory:subcategoryID});
  }
  
  render() {
    return (
      <Container>
			<HeaderScreen navigation={this.props.navigation} total_price={this.props.cartList?this.props.cartList.total_final_price:'0.00'}  title={"সাব ক্যাটাগরি"} />
			<Content>
				<Grid>
					 
					
					<Row>
						 
						<Col>
							<Item>
								<Icon type={"FontAwesome"} active name='search' />
								<Input placeholder="Search category" onChangeText={this.changeEmail}/>
							</Item>
						</Col>
					</Row>
					<Row style={styles.btnContainer}>
						{this.state.subcategoryList?
								 (this.renderCategory())
							:
								(<Text style={{textAlign:'center',color:'#000'}}>No Sub category was found!</Text>)
						}
					</Row>
					
					
					 
					
				</Grid>
				   
			</Content>
			
				<Footer style={{
				backgroundColor:'#93FC87'
			}}>
				 
						  <FooterTab>
							<Button style={{backgroundColor:'#93FC87'}} onPress={()=>{this.props.navigation.navigate('Home')}}>
								<Icon name="home"  style={{color:'#333'}}/>
							  <Text>
								হোম
							  </Text>
							 
							</Button>
							
							<Button  style={{backgroundColor:'#93FC87'}}>
							  <Text>TOTAL</Text>
							  <Text>৳ {this.props.cartList.total_final_price}</Text>
							</Button>
							<Button onPress={()=>{this.props.navigation.navigate("Stack",{screen:'ShoppingCart',params:{device_id:this.state.uniqueId}})}} style={{backgroundColor:'#009933',color:'#fff'}}>
							  <Icon name="basket"/>
							  <Text  style={{color:'#fff'}}>শপিং</Text>
							</Button>
						  </FooterTab>
			</Footer>
			
      </Container>
    );
  }
}

const styles = StyleSheet.create({
	 btnBackgroundTop: { 
		width: '95%',
		height: 60,
		justifyContent:'center',
		textAlign: "center",
		alignItems:'center',
		
	  },  
	  btnTextTop:{
		  height:20,
		  width:100,
		  marginTop:-7,
		  marginLeft:5
	  },
	  
	  btnBackground: { 
		width: '100%',
		height: 100,
		justifyContent:'center',
		textAlign: "center",
		alignItems:'center',
		 
	  }, 
	  btnText: { 
		width: '60%',
		height: 30,
		marginTop:-10,
		resizeMode:'cover'
	  },
	    btnIcon: { 
		width: 35,
		height: 35,
		marginLeft:'13%',
		marginTop:0
	  },
	   button:{
		width:'27%',
		marginLeft:7,
		marginRight:7,
	  },
	  btnContainer:{
		  flexWrap:'wrap',
		  flexDirection:'row',
		  paddingLeft:15
	  },
	  btnTitle:{
		  fontSize:15,
		  fontWeight:'bold'
	  }
});

export default connect(mapStateToProps)(SubCategoryScreen);