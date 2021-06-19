/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
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

import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen'
import CategoryScreen from './screens/CategoryScreen'
import SubCategoryScreen from './screens/SubCategoryScreen'
import ProductDetailsScreen from './screens/ProductDetailsScreen'
import ProductListScreen from './screens/ProductListScreen'
import ShoppingCartScreen from './screens/ShoppingCartScreen'
import CartConfirmScreen from './screens/CartConfirmScreen'
import LoginScreen from './screens/LoginScreen'
import UserAccountScreen from './screens/UserAccountScreen'
import MainUserRegistrationScreen from './screens/MainUserRegistrationScreen'
import MemberUserRegistrationScreen from './screens/MemberUserRegistrationScreen'
import HomeContainer from './containers/HomeContainer';

const Drawer = createDrawerNavigator();


class App extends React.Component {

 constructor(props) {
	super(props);

  }



  render(){



  return (
	
		<NavigationContainer>
			  <Drawer.Navigator>
				<Drawer.Screen name="Home" component={HomeScreen} />
				<Drawer.Screen name="প্রোফাইল" component={LoginScreen} />
				<Drawer.Screen name="লগ ইন" component={LoginScreen} />
				<Drawer.Screen name="মেইন ইউজার রেজিষ্ট্রেশন" component={MainUserRegistrationScreen} />
				<Drawer.Screen name="মেমবার ইউজার রেজিষ্ট্রেশন" component={MemberUserRegistrationScreen} />
				<Drawer.Screen name="ইউজার একাউন্ট" component={UserAccountScreen} />
				<Drawer.Screen name="কেটাগরি" component={CategoryScreen} />
				<Drawer.Screen name="SubCategory" component={SubCategoryScreen} />
				<Drawer.Screen name="ProductList" component={ProductListScreen} />
				<Drawer.Screen name="বিজ্ঞপ্তি" component={ProductListScreen} />
				<Drawer.Screen name="কুপন" component={ProductListScreen} />
				<Drawer.Screen name="সেটিংস" component={ProductListScreen} />
				 
				<Drawer.Screen name="ProductDetails" component={HomeContainer} />
				<Drawer.Screen name="ShoppingCart" component={ShoppingCartScreen} />
				<Drawer.Screen name="CartConfirm" component={CartConfirmScreen} />

			  </Drawer.Navigator>

		</NavigationContainer>
	 
  )}
};



const styles = StyleSheet.create({

});

export default App;
