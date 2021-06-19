import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TextInput, TouchableOpacity  } from 'react-native';
import { Container, Header, Content } from 'native-base';
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
      <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
    );
  }
}

const styles = StyleSheet.create({
	
});

export default HeaderScreen;