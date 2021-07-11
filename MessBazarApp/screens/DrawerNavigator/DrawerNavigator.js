import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import MenuButton from '../Components/MenuButton/MenuButton';

import { createDrawerNavigator, 
		DrawerContentScrollView, 
		DrawerItem, 
		DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import FlashScreen from '../screens/FlashScreen'
import HomeScreen from '../screens/HomeScreen'
import CategoryScreen from '../screens/CategoryScreen'
import SubCategoryScreen from '../screens/SubCategoryScreen'
import ProductDetailsScreen from '../screens/ProductDetailsScreen'
import ProductListScreen from '../screens/ProductListScreen'
import ShoppingCartScreen from '../screens/ShoppingCartScreen'
import CartConfirmedScreen from '../screens/CartConfirmedScreen'
import LoginScreen from '../screens/LoginScreen'
import LoginCartScreen from '../screens/LoginCartScreen'
import UserAccountScreen from '../screens/UserAccountScreen'
import HomeUserRegistrationScreen from '../screens/HomeUserRegistrationScreen'
import MessUserRegistrationScreen from '../screens/MessUserRegistrationScreen'
import UserAccountTypeScreen from '../screens/UserAccountTypeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import CartSuccessScreen from '../screens/CartSuccessScreen'
import PreviousCartScreen from '../screens/PreviousCartScreen'
import PreviousCartListScreen from '../screens/PreviousCartListScreen'
import OfferScreen from '../screens/OfferScreen'
import CouponScreen from '../screens/CouponScreen'
import SettingScreen from '../screens/SettingScreen'
import BigoptiScreen from '../screens/BigoptiScreen'
 


const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};



const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
	 
	 
		 <Stack.Screen name="Login" title="লগ ইন" component={LoginScreen} />
		 <Stack.Screen name="LoginCart" title="লগ ইন" component={LoginCartScreen} />
		 <Stack.Screen name="UserAccountType" component={UserAccountTypeScreen} />
		 <Stack.Screen name="HomeUserRegistration" component={HomeUserRegistrationScreen} />
		 <Stack.Screen name="MessUserRegistration" component={MessUserRegistrationScreen} />
		 
		 <Stack.Screen name="Category" component={CategoryScreen} />
		 <Stack.Screen name="SubCategory" component={SubCategoryScreen} />
		 <Stack.Screen name="ProductList" component={ProductListScreen} />
		 
		 <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
		 <Stack.Screen name="ShoppingCart" component={ShoppingCartScreen} />
		 <Stack.Screen name="CartConfirmed" component={CartConfirmedScreen} />
		 <Stack.Screen name="CartSuccess" component={CartSuccessScreen} />
		 <Stack.Screen name="PreviousCart" component={PreviousCartScreen} />
		 <Stack.Screen name="PreviousCartList" component={PreviousCartListScreen} />
		 <Stack.Screen name="Profile" component={ProfileScreen} />
		 <Stack.Screen name="Bigopti" component={BigoptiScreen} />
		 <Stack.Screen name="Offer" component={OfferScreen} />
		 <Stack.Screen name="Coupon" component={CouponScreen} />
		 <Stack.Screen name="Setting" component={SettingScreen} />
		 
	   
    </Stack.Navigator>
  );
}




export default class DrawerNavigator extends React.Component {
	
	render(){
		//const { navigation } = this.props;
		const Drawer = createDrawerNavigator();
		return (
				<Drawer.Navigator drawerContent={props=><DrawerMenu {...props}/>}>
					<Drawer.Screen name="Home" component={HomeScreen} />
					 
				 
					<Drawer.Screen name="Stack" component={StackNavigator} />

			   </Drawer.Navigator>
			 );
	}
}



const  DrawerMenu=(props)=>{
 
    const { navigation } = props;
    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <Image style={styles.logo,{height:70, width:150,alignSelf:'center',marginTop:15}} source={require('../assets/images/logo.png')} />
	 
          <MenuButton
            title="হোম পেইজ"
			icon="home"
            onPress={() => {
              navigation.navigate('Home');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="লগইন"
			icon="list"
            onPress={() => {
              navigation.navigate('Stack',{screen:"Login"});
              navigation.closeDrawer();
            }}
          />  
		  
		  <MenuButton
            title="প্রোপাইল"
			icon="people"
            onPress={() => {
              navigation.navigate('Stack',{screen:"Profile"});
              navigation.closeDrawer();
            }}
          />
         
     
          <MenuButton
            title="বিজ্ঞপ্তি"
			icon="copy"
            onPress={() => {
              navigation.navigate('Stack',{screen:"Bigopti"});
              navigation.closeDrawer();
            }}
          /> 
		  
		  <MenuButton
            title="অফার"
			icon="gift"
            onPress={() => {
              navigation.navigate('Stack',{screen:"Offer"});
              navigation.closeDrawer();
            }}
          />  
		  <MenuButton
            title="কুপন"
			icon="basket"
            onPress={() => {
              navigation.navigate('Stack',{screen:"Coupon"});
              navigation.closeDrawer();
            }}
          />  
		  <MenuButton
            title="সেটিংস"
			icon="cog"
            onPress={() => {
              navigation.navigate('Stack',{screen:"Setting"});
              navigation.closeDrawer();
            }}
          />  
		  
		  <MenuButton
            title="লগআউট"
			icon="close"
            onPress={() => {
              navigation.navigate('Home');
              navigation.closeDrawer();
            }}
          />
        </View>
      </View>
    );
  
}

DrawerNavigator.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};
