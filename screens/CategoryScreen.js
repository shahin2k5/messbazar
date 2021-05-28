/* import React, { useRef, useState } from "react";
import { Button, DrawerLayoutAndroid, Text, StyleSheet, View } from "react-native";

const CategoryScreen = () => {
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState("left");
  const changeDrawerPosition = () => {
    if (drawerPosition === "left") {
      setDrawerPosition("right");
    } else {
      setDrawerPosition("left");
    }
  };

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      />
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}
    >
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Drawer on the {drawerPosition}!
        </Text>
        <Button
          title="Change Drawer Position"
          onPress={() => changeDrawerPosition()}
        />
        <Text style={styles.paragraph}>
          Swipe from the side or press button below to see it!
        </Text>
        <Button
          title="Open drawer"
          onPress={() => drawer.current.openDrawer()}
        />
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
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
  }
});

export default CategoryScreen;
 */

import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, DrawerLayoutAndroid,Button, TouchableOpacity  } from 'react-native';
import { Container, Header, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import SubCategoryScreen from './SubCategoryScreen';

class CategoryScreen extends Component {
	 constructor(props) {
		super(props);
		this.drawer = React.createRef();
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
  
  onPressOpen=(screenName)=>{
	  this.props.navigation.navigate(screenName);
  }
  
  render() {
    return (
		<DrawerLayoutAndroid
		  ref={this.drawer}
		  drawerWidth={300}
		  renderNavigationView={this.drawerContentView} >
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
					
					<Row>
						<Col>
							<TouchableOpacity style={styles.button} onPress={()=>this.onPressOpen('SubCategory')} >
								<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-6.png')} style={styles.btnBackground}>
									<Image source={require('../assets/images/CategoryScreen/rondhon-icon.png')} style={styles.btnText}/>
									<Image source={require('../assets/images/CategoryScreen/rondhon.png')} style={styles.btnText}/>
								</ImageBackground>
							</TouchableOpacity>
						</Col>
						 
						<Col>
							<TouchableOpacity style={styles.button} onPress={()=>this.onPressOpen('SubCategory')} >
								<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-6.png')} style={styles.btnBackground}>
									<Image source={require('../assets/images/CategoryScreen/mach-mangso-icon.png')} style={styles.btnIcon}/>
									<Image source={require('../assets/images/CategoryScreen/mach-mangso.png')} style={styles.btnText}/>
								</ImageBackground>
							</TouchableOpacity>
						</Col>
					</Row>
					<Row>
						 
						<Col>
						<TouchableOpacity style={styles.button} onPress={()=>this.onPressOpen('SubCategory')} >
							<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-6.png')} style={styles.btnBackground}>
								<Image source={require('../assets/images/CategoryScreen/paniyo-icon.png')} style={styles.btnIcon}/>
								<Image source={require('../assets/images/CategoryScreen/paniyo.png')} style={styles.btnText}/>
							</ImageBackground>
						</TouchableOpacity>
						</Col>
						<Col>
							<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-6.png')} style={styles.btnBackground}>
								<Image source={require('../assets/images/CategoryScreen/fol-sobji-icon.png')} style={styles.btnIcon}/>
								<Image source={require('../assets/images/CategoryScreen/fol-sobji.png')} style={styles.btnText}/>
							</ImageBackground>
						</Col>
					</Row>
					<Row>
						 
						<Col>
							<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-6.png')} style={styles.btnBackground}>
								<Image source={require('../assets/images/CategoryScreen/gorer-soronjam-icon.png')} style={styles.btnIcon}/>
								<Image source={require('../assets/images/CategoryScreen/gorer-soronjam.png')} style={styles.btnText}/>
							</ImageBackground>
						</Col>
						<Col>
							<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-6.png')} style={styles.btnBackground}>
								<Image source={require('../assets/images/CategoryScreen/office-ponno-icon.png')} style={styles.btnIcon}/>
								<Image source={require('../assets/images/CategoryScreen/office-ponno.png')} style={styles.btnText}/>
							</ImageBackground>
						</Col>
						
					</Row>
					
					<Row>
						 
						<Col>
							<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-6.png')} style={styles.btnBackground}>
								<Image source={require('../assets/images/CategoryScreen/sondhorjo-bordhon-icon.png')} style={styles.btnIcon}/>
								<Image source={require('../assets/images/CategoryScreen/sondhorjo-bordhon.png')} style={styles.btnText}/>
							</ImageBackground>
						</Col>
						<Col>
							<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-6.png')} style={styles.btnBackground}>
								<Image source={require('../assets/images/CategoryScreen/sastho-icon.png')} style={styles.btnIcon}/>
								<Image source={require('../assets/images/CategoryScreen/sastho.png')} style={styles.btnText}/>
							</ImageBackground>
						</Col>
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
		  marginTop:-7
	  },
	  btnBackground: { 
		width: '100%',
		height: 150,
		justifyContent:'center',
		textAlign: "center",
		alignItems:'center',
		 
	  }, 
	  btnText: { 
		width: '60%',
		height: 25,
		marginTop:10,
		resizeMode:'cover'
	  },
	    btnIcon: { 
		width: 45,
		height: 45,
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
	  }
});

export default CategoryScreen; 