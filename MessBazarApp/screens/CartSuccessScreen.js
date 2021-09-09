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
			<HeaderScreen navigation={this.props.navigation} title={"অর্ডার সফল"} />
			<Content style={styles.contentBar}>
				<View style={{justifyContent:'center'}}>
					<Text style={{textAlign:'center',color:'green',fontSize:20,marginTop:100}}>অর্ডারটি সফলভাবে সম্পন্ন হয়েছে!</Text>
					<Text style={{textAlign:'center',color:'green',fontSize:20,marginTop:10}}>ধন্যবাদ</Text>
				<Text style={{textAlign:'center',
								color:'#fff',
								fontSize:30,
								marginTop:50,backgroundColor:'coral',padding:10}}>
									<Icon name="md-checkmark" style={{height:40,width:40,marginTop:40,fontWeight:'bold',fontSize:30}} active style={{color:'green'}} /></Text>
					
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
							<Button style={{backgroundColor:'#93FC87'}} onPress={()=>{this.props.navigation.navigate('Home')}}>
							  <Icon name="home"  style={{color:'#333'}}/>
							  <Text>
								হোম
							  </Text>
							 
							</Button>
							
							<Button  style={{backgroundColor:'#93FC87'}}>
							  
							</Button>
							<Button   style={{backgroundColor:'#009933',color:'#fff'}}>
							   
							  <Text  style={{color:'#fff'}}></Text>
							</Button>
						  </FooterTab>
			</Footer>
			
    </Container>
);}
};

const styles = StyleSheet.create({
  
});

export default CartSuccessScreen;
