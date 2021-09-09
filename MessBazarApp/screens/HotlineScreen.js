import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TouchableOpacity  } from 'react-native';
import { Container, Header, Content, Button, Footer, FooterTab, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { connect } from 'react-redux'
import * as actions from '../services/actions/actions'
import HeaderScreen from './HeaderScreen';

function mapStateToProps(state){
	return {
		categoryList: state.categoryList
	}
}

function mapDispatchToProps(){
	return {
		
	}
}



class HotlineScreen extends Component {
	constructor(props){
		super(props);
		this.state = {
			categoryList:0
		}
	}

	componentDidMount(){
		 
	}
	
	componentDidUpdate(){
		 
	}
	
	
	onPressOpen=()=>{
		this.props.navigation.navigate('Stack',{screen:'Home'});
	}
	
 
	
  render() {
    return (
      <Container>
		<HeaderScreen navigation={this.props.navigation} total_price={this.props.cartList?this.props.cartList.total_final_price:'0.00'} title={"মেস বাজার"} />
		<ImageBackground source={require('../assets/images/Hotline/hotline.png')} style={styles.backgroundImage}>
		 
				 
		</ImageBackground >
		
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
						
						<Button  onPress={()=>{this.openPreviousCart()}} style={{backgroundColor:'#93FC87'}}>
						  <Icon name="calendar" style={{color:'#333'}}/>
						  <Text>পূর্বের বাজার</Text>
						</Button>
						
						<Button style={{backgroundColor:'#009933',color:'#fff'}}  onPress={()=>{this.props.navigation.navigate("Stack",{screen:'ShoppingCart',params:{device_id:this.state.uniqueId}})}} >
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
	 backgroundImage: {
		flex: 1,
		width: null,
		height: null,
		 
	  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HotlineScreen);
