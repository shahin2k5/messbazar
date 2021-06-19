import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground  } from 'react-native';
import { Container, Header, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { createDrawerNavigator } from '@react-navigation/drawer';

class HomeScreen extends Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		setTimeout(()=>{
			this.props.navigation.navigate('কেটাগরি');
		},4000);
	}
  render() {
    return (
      <Container>

			 <ImageBackground source={require('../assets/images/home_bg.jpg')} style={styles.backgroundImage}>
				   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Image source={require('../assets/images/logo.png')}/>
				   </View>
				   <Image source={require('../assets/images/vegetables-1.png')}/>

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

export default HomeScreen;
