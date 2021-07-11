import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TextInput, TouchableOpacity  } from 'react-native';
import { Container, Content } from 'native-base';
import { Header, Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {apiUrl} from '../services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage'
class HeaderScreen extends Component {
	
	constructor(props) {
		super(props);
		 this.state = {
			 
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
		  leftComponent={<Icon name='menu' color='#ddd' onPress={()=>{this.props.navigation.openDrawer()}}/>}
		  centerComponent={{ text: this.props.title, style: { color: '#fff' } }}
		  rightComponent={<Icon name='shopping-cart' color='orange' onPress={()=>{this.props.navigation.navigate("ShoppingCart",{cartid:8})}}/>}
		/>
    );
  }
}

const styles = StyleSheet.create({
	
});

export default HeaderScreen;