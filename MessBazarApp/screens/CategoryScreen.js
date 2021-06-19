import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, DrawerLayoutAndroid,Button, 		
		TouchableOpacity  } from 'react-native';
import { Container, Header, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import SubCategoryScreen from './SubCategoryScreen';
import { apiUrl, getCategoryAll } from '../services/apiService';
 
 


class CategoryScreen extends Component {
	 constructor(props) {
		super(props);
		this.drawer = React.createRef();
		 this.state = {
			  categoryList: [], // list is empty in the beginning
			  error: false
		   };
	  }
	  
	  componentDidMount(){
		  this.getUserList();
		   
		}
		
	getUserList = async () => {
       try { 
	   console.log(apiUrl+"category/list");
			   const response = await fetch(apiUrl+"category/list");
			   if (response.ok) {
				   const data = await response.json();
				   // console.log('response data: ',data);
				   this.setState({
					   categoryList:data
				   })		   
			   } else { this.setState({ error: true }) }
		   } catch (e) { 
				console.log('error: ',e);
			}
	  }

	renderCategory=()=>{
		return this.state.categoryList.map((category, index)=>{
			var icon = category.image;
			return(
				<TouchableOpacity key={index} size={50} style={styles.button} onPress={()=>this.onPressOpen(category.id)} >
					<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-6.png')} style={styles.btnBackground}>
						<Image source={require('../assets/images/CategoryScreen/office-ponno-icon.png')} style={styles.btnIcon}/>
						
						<Text style={styles.btnTitle}>{category.category_title}</Text>
					</ImageBackground>
				</TouchableOpacity>
			 
			);
		});
	}
	
	drawerContentView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => this.drawer.current.closeDrawer()}
      />
    </View>
  );
  
  openDrawerT=()=>{
	  this.drawer.current.openDrawer();
  }
  
  onPressOpen=(categoryID)=>{
	  this.props.navigation.navigate('SubCategory',{category:categoryID});
  }
  
  render() {
    return (
		<DrawerLayoutAndroid
		  ref={this.drawer}
		  drawerWidth={300}
		  renderNavigationView={this.drawerContentView} >
		  <Header />
		  <Content>
				
				<Grid>
					<Row>
						<Col></Col>
						<Col>
							<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-28.png')} style={styles.btnBackgroundTop}>
								<Image source={require('../assets/images/CategoryScreen/bazar-talika.png')} style={styles.btnTextTop}/>
							</ImageBackground>
						</Col>
					</Row>
					
					<Row>
						 
						<Col>
							<Image source={require('../assets/images/CategoryScreen/apnar-category.png')}/>
							<Image source={require('../assets/images/CategoryScreen/Line-9.png')}/>
						</Col>
					</Row>
					
					<Row style={styles.btnContainer}>
						{this.renderCategory()}
					</Row>
				</Grid>
				   
			</Content>
		 
      
	  </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
	 btnBackgroundTop: { 
		width: '100%',
		height: 40,
		justifyContent:'center',
		textAlign: "center",
	  },  
	  btnTextTop:{
		  height:20,
		  width:105,
		  marginTop:-7,
		  marginLeft:45
	  },
	  btnBackground: { 
		width: '100%',
		height: 150,
		justifyContent:'center',
		textAlign: "center",
		alignItems:'center',
		 
	  }, 
	  btnText: { 
		width: 80,
		height: 25,
		marginTop:10,
		resizeMode:'cover'
	  },
	    btnIcon: { 
		width: 55,
		height: 55,
		marginLeft:'13%',
		marginTop:-15
	  },
	   container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 16
	  },
	  navigationContainer: {
		backgroundColor: "#ecf0f1"
	  },
	  paragraph: {
		padding: 16,
		fontSize: 15,
		textAlign: "center"
	  },
	  button:{
		width:'50%'
	  },
	  btnContainer:{
		  flexWrap:'wrap',
		  flexDirection:'row'
	  },
	  btnTitle:{
		  fontSize:20,
		  fontWeight:'bold'
	  }
});

export default CategoryScreen; 
