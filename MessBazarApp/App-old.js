import 'react-native-gesture-handler';
import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  DrawerLayoutAndroid,
  Button
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'
import CategoryScreen from './screens/CategoryScreen'
import SubCategoryScreen from './screens/SubCategoryScreen'
import ProductDetailsScreen from './screens/ProductDetailsScreen'
import ProductListScreen from './screens/ProductListScreen'
import CartConfirmScreen from './screens/CartConfirmScreen'
import LoginScreen from './screens/LoginScreen'
import UserAccountScreen from './screens/UserAccountScreen'
import MainUserRegistrationScreen from './screens/MainUserRegistrationScreen'
import MemberUserRegistrationScreen from './screens/MemberUserRegistrationScreen'
 

const Drawer = createDrawerNavigator();


const stackScreen=()=>{return(
	<Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: "#9AC4F8",
        },
        headerTintColor: "white",
        headerBackTitle: "Back",
      }}>
		<Stack.Screen name="LoginSt" component={LoginScreen} />
		<Stack.Screen name="Home" component={HomeScreen} />
		<Stack.Screen name="Login" component={LoginScreen} />
		<Stack.Screen name="MainUserRegistration" component={MainUserRegistrationScreen} />
		<Stack.Screen name="MemberUserRegistration" component={MemberUserRegistrationScreen} />
		<Stack.Screen name="UserAccount" component={UserAccountScreen} />
		<Stack.Screen name="Category" component={CategoryScreen} />
		<Stack.Screen name="SubCategory" component={SubCategoryScreen} />
		<Stack.Screen name="ProductList" component={ProductListScreen} />
		<Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
		<Stack.Screen name="CartConfirm" component={CartConfirmScreen} />
	</Stack.Navigator>
)};
  
class App extends React.Component {

 constructor(props) {
	super(props);
	
  }
  
  
  
  render(){
	  
 
  
  return (
    <NavigationContainer>
		  <Drawer.Navigator>
			<Drawer.Screen name="Home" component={HomeScreen} />
			<Drawer.Screen name="Login" component={LoginScreen} />
			<Drawer.Screen name="MainUserRegistration" component={MainUserRegistrationScreen} />
			<Drawer.Screen name="MemberUserRegistration" component={MemberUserRegistrationScreen} />
			<Drawer.Screen name="UserAccount" component={UserAccountScreen} />
			<Drawer.Screen name="Category" component={CategoryScreen} />
			<Drawer.Screen name="SubCategory" component={SubCategoryScreen} />
			<Drawer.Screen name="ProductList" component={ProductListScreen} />
			<Drawer.Screen name="ProductDetails" component={ProductDetailsScreen} />
			<Drawer.Screen name="CartConfirm" component={CartConfirmScreen} />
		 
		  </Drawer.Navigator> 
		  
    </NavigationContainer>
  )}
};

const styles = StyleSheet.create({
  
});

export default App;
