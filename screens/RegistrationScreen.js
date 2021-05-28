import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground  } from 'react-native';
import { Container, Header, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class RegistrationScreen extends Component {
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

export default RegistrationScreen;