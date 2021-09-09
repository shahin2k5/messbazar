import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TextInput, TouchableOpacity  } from 'react-native';
import { Container, Content } from 'native-base';
import { Header, Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as api from '../services/apiService';
import DeviceInfo from 'react-native-device-info';


class HeaderScreen extends Component {
	
	constructor(props) {
		super(props);
		 this.state = {
			 uniqueId : DeviceInfo.getUniqueId()
		   };
	  }
	  
	 componentDidMount(){
		   
		}	  
		
	componentDidUpdate(){
		   
		}
	
	  onPressOpen=(product)=>{
		  
	  }
	  
  render() {
    return (
      <Header
		  leftComponent={<Icon name='more-vert' color='#fff' onPress={()=>{this.props.navigation.openDrawer()}}/>}
		  centerComponent={{ text: this.props.title, style: { color: '#fff',fontSize:20,fontWeight:'bold' } }}
		  rightComponent={(<View style={{flexDirection:'row',display:'flex',justifyContent:'center'}}>
		  <Text>
		   <Icon name='edit-location' color='#fff' onPress={()=>{this.props.navigation.navigate("Stack",{screen:'ShoppingCart',params:{device_id:this.state.uniqueId}})}} style={{marginRight:10}} />
		  </Text>
		  
		  <Text  style={{justifyContent:'center',color:'yellow',marginTop:5,fontSize:15,textAlign:'right'}}>
				{this.props.total_price?'৳. '+this.props.total_price:''}
		  </Text>
		  <Text  style={{marginLeft:10,justifyContent:'center',color:'#fff'}}>
		  <Icon name='shopping-basket' color='#fff' onPress={()=>{this.props.navigation.navigate("Stack",{screen:'ShoppingCart'})}} />
		  </Text>
		 </View>)}
		  containerStyle={{
			backgroundColor: '#009933',
			justifyContent: 'center',
			fontWeight:'bold'
		  }}
		/>
    );
  }
}

const styles = StyleSheet.create({
	
});

export default  HeaderScreen;