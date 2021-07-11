/**
 * Sample React Native App
 * https:github.com/facebook/react-native
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
  Button,
  useWindowDimensions,
  LogBox
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FlashScreen from './screens/FlashScreen'
import HomeScreen from './screens/HomeScreen'
import CategoryScreen from './screens/CategoryScreen'
import SubCategoryScreen from './screens/SubCategoryScreen'
import ProductDetailsScreen from './screens/ProductDetailsScreen'
import ProductListScreen from './screens/ProductListScreen'
import ShoppingCartScreen from './screens/ShoppingCartScreen'
import CartConfirmedScreen from './screens/CartConfirmedScreen'
import LoginScreen from './screens/LoginScreen'
import LoginCartScreen from './screens/LoginCartScreen'
import UserAccountScreen from './screens/UserAccountScreen'
import HomeUserRegistrationScreen from './screens/HomeUserRegistrationScreen'
import MessUserRegistrationScreen from './screens/MessUserRegistrationScreen'
import UserAccountTypeScreen from './screens/UserAccountTypeScreen'
import ProfileScreen from './screens/ProfileScreen'
import CartSuccessScreen from './screens/CartSuccessScreen'
import PreviousCartScreen from './screens/PreviousCartScreen'
import PreviousCartListScreen from './screens/PreviousCartListScreen'
import HomeContainer from './containers/HomeContainer';
import DrawerNavigator from './screens/DrawerNavigator/DrawerNavigator';
//import AppContainer from './screens/Navigations/AppContainer'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import  store  from './services/store/store'

const myStore = store;

LogBox.ignoreLogs(['Reanimated 2']);

const CustomDrawerContent=(props)=>{
  // const width = useWindowDimensions().width * 0.3;
  const width = useWindowDimensions().width ;

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.menuContainer}>
        <View
          style={[
            styles.menuItemsCard,
            { backgroundColor: '#fff2df', width: width, height: width },
          ]}>
          <>
            <View
              style={[styles.circleContainer, { backgroundColor: '#FFC56F' }]}>
              
              <DrawerItem
                label="Screen1"
                labelStyle={{ color: '#fbae41', fontSize: 10 }}
                onPress={() => {
                  props.navigation.navigate('Screen1');
                }}
              />
            </View>
          </>
          <DrawerItem
            style={{
              position: 'absolute',
              left: 0,
              width: width,
              height: 30,
            }}
            label="Screen2"
            labelStyle={{ color: '#609806' }}
            onPress={() => {
              props.navigation.navigate('Screen1');
            }}
          />
        </View>
        <View
          style={[
            styles.menuItemsCard,
            { backgroundColor: '#EFFFD5', width: width, height: width },
          ]}>
          <View
            style={[styles.circleContainer, { backgroundColor: '#b5ff39' }]}>
            
          </View>

          <DrawerItem
            style={{
              position: 'absolute',
              left: 0,
              width: width,
              height: 30,
            }}
            label="Screen2"
            labelStyle={{ color: '#609806' }}
            onPress={() => {
              props.navigation.navigate('StackNav');
            }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}


class App extends React.Component {

 constructor(props) {
	super(props);

  }



  render(){
		  return (
				 
				<Provider store={myStore}>
					 <NavigationContainer>
					 
						<DrawerNavigator />
					 
					 </NavigationContainer>
				</Provider>
			 
		  )
  }
};



const styles = StyleSheet.create({

});

export default App;
