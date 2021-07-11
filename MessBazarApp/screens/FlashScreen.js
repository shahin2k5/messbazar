import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TouchableOpacity  } from 'react-native';
import { Container, Header, Content, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { connect } from 'react-redux'
import * as actions from '../services/actions/actions'

function mapStateToProps(state){
	return {
		categoryList: state.categoryList
	}
}

function mapDispatchToProps(){
	return {
		
	}
}



class FlashScreen extends Component {
	constructor(props){
		super(props);
		this.state = {
			categoryList:0
		}
	}

	componentDidMount(){
		setTimeout(()=>{
			this.props.navigation.navigate('Category');
		 },3000);
	}
	onPressOpen=()=>{
		this.props.navigation.navigate('Category');
	}
	
 
	
  render() {
    return (
      <Container>
		
			 <ImageBackground source={require('../assets/images/home_bg.jpg')} style={styles.backgroundImage}>
			 
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Image source={require('../assets/images/logo.png')}/>
					</View>
					<TouchableOpacity onPress={()=>this.onPressOpen()} >
								<Image source={require('../assets/images/vegetables-1.png')}/>
					</TouchableOpacity>
					{/*****<Row>
						<Col><Button onPress={this.props.decreaseValue}><Text style={{width:80}}>-</Text></Button></Col>
						<Col><Text>{this.props.myCounter}</Text></Col>
						<Col><Button onPress={this.props.increaseValue}><Text style={{width:80}}>+</Text></Button></Col>
					</Row>****/}
			 </ImageBackground >
		

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

export default connect(mapStateToProps, mapDispatchToProps)(FlashScreen);
