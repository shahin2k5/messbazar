/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TextInput,TouchableOpacity  } from 'react-native';
import { Container, Header, Content, Item, Input, Icon , Button, Footer, FooterTab} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import HeaderScreen from './HeaderScreen';


class CartSuccessScreen extends React.Component {

render(){
  return (
   <Container>
			<HeaderScreen navigation={this.props.navigation} title={"CART SUCCESS"} />
			<Content style={styles.contentBar}>
				<View style={{justifyContent:'center'}}>
					<Text style={{textAlign:'center',color:'green',fontSize:20,marginTop:50}}><Icon name="md-checkmark-outline" active style={{color:'green'}} /></Text>
					<Text style={{textAlign:'center',color:'green',fontSize:20,marginTop:50}}>Order has been completed successfully!</Text>
					<Text style={{textAlign:'center',color:'green',fontSize:20,marginTop:50}}>Thank you</Text>
				</View>
			</Content>
			 <Row  style={{marginTop:20}}>
						
					<Col size={20}></Col>
					 
					<Col size={50}>
						 <Button onPress={props=>this.props.navigation.navigate('Home')} style={{width:'100%',justifyContent:'center',borderRadius:20}}>
							<Text style={{justifyContent:'center',color:'#fff',fontWeight:'bold'}}>CONTINUE SHOPPING</Text>
						 </Button>
					</Col>	
					<Col size={20}></Col>
				 
			 
				 
				</Row>
				
				<Footer style={{
				backgroundColor:'#93FC87'
			}}>
				 
						  <FooterTab>
							<Button style={{backgroundColor:'#93FC87'}} onPress={()=>{this.openPreviousCart()}}>
								<Icon name="arrow-back"  style={{color:'#333'}}/>
							  <Text>
								আগের তালিকা
							  </Text>
							 
							</Button>
							
							<Button  style={{backgroundColor:'#93FC87'}}>
							  <Text>TOTAL</Text>
							  <Text>৳</Text>
							</Button>
							<Button onPress={()=>this.confirmedCarts()} style={{backgroundColor:'#009933',color:'#fff'}}>
							  <Icon name="cart"/>
							  <Text  style={{color:'#fff'}}>কনফার্ম অর্ডার</Text>
							</Button>
						  </FooterTab>
			</Footer>
			
    </Container>
);}
};

const styles = StyleSheet.create({
  
});

export default CartSuccessScreen;
