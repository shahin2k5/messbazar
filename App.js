/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import HomeScreen from './screens/HomeScreen'
import CategoryScreen from './screens/CategoryScreen'
import SubCategoryScreen from './screens/SubCategoryScreen'
import ProductDetailsScreen from './screens/ProductDetailsScreen'
import ProductListScreen from './screens/ProductListScreen'

const App: () => Node = () => {


  return (
    <SafeAreaView>
      <StatusBar  />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View>
			<ProductListScreen title="Call from App"/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
