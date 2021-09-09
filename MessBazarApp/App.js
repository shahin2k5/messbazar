/**
 * Sample React Native App
 * https:github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './screens/DrawerNavigator/DrawerNavigator';
import { Provider } from 'react-redux'
import  store  from './services/store/store'

const myStore = store;

LogBox.ignoreLogs(['Reanimated 2']);


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

export default App;
