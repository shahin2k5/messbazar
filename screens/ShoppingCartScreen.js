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



class ProductScreen extends React.Component {

render(){
  return (
    <SafeAreaView>
      <StatusBar  />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <Header />
        <View>
			<Text style={{textAlign:'center'}}>{this.props.title}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
);}
};

const styles = StyleSheet.create({
  
});

export default ProductScreen;
