import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';
import styles from './styles';
import MenuButton from '../Components/MenuButton/MenuButton';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import FlashScreen from '../FlashScreen'
import HomeScreen from '../HomeScreen'
import ProductListScreen from '../ProductListScreen'
import ProductDetailsScreen from '../ProductDetailsScreen'
import ShoppingCartScreen from '../ShoppingCartScreen'
import CartConfirmedScreen from '../CartConfirmedScreen'
import CartSuccessScreen from '../CartSuccessScreen'
import CategoryScreen from '../CategoryScreen'
import SubCategoryScreen from '../SubCategoryScreen'
import PreviousCartScreen from '../PreviousCartScreen'
import PreviousCartListScreen from '../PreviousCartListScreen'
import PrepareCartListScreen from '../PrepareCartListScreen'
import LoginScreen from '../LoginScreen'
import LoginCartScreen from '../LoginCartScreen'
import UserAccountTypeScreen from '../UserAccountTypeScreen'
import HomeUserRegistrationScreen from '../HomeUserRegistrationScreen'
import MessUserRegistrationScreen from '../MessUserRegistrationScreen'
import ProfileScreen from '../ProfileScreen'
import ProfileEditScreen from '../ProfileEditScreen'
import OfferScreen from '../OfferScreen'
import CouponScreen from '../CouponScreen'
import BigoptiScreen from '../BigoptiScreen'
import SettingScreen from '../SettingScreen'
import HotlineScreen from '../HotlineScreen'
import LogoutScreen from '../LogoutScreen'


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
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="LoginCart" component={LoginCartScreen} />
      <Stack.Screen name="UserAccountType" component={UserAccountTypeScreen} />
      <Stack.Screen name="HomeUserRegistration" component={HomeUserRegistrationScreen} />
      <Stack.Screen name="MessUserRegistration" component={MessUserRegistrationScreen} />
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="ShoppingCart" component={ShoppingCartScreen} />
      <Stack.Screen name="CartConfirmed" component={CartConfirmedScreen} />
      <Stack.Screen name="CartSuccess" component={CartSuccessScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="SubCategory" component={SubCategoryScreen} />
      <Stack.Screen name="PreviousCart" component={PreviousCartScreen} />
      <Stack.Screen name="PreviousCartList" component={PreviousCartListScreen} />
      <Stack.Screen name="PrepareCartList" component={PrepareCartListScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
      <Stack.Screen name="Offer" component={OfferScreen} />
      <Stack.Screen name="Coupon" component={CouponScreen} />
      <Stack.Screen name="Bigopti" component={BigoptiScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="Hotline" component={HotlineScreen} />
      <Stack.Screen name="Logout" component={LogoutScreen} />
    </Stack.Navigator>
  );
}

export default class DrawerNavigator extends React.Component {
	
	render(){
		//const { navigation } = this.props;
		const Drawer = createDrawerNavigator();
		return (
				<Drawer.Navigator drawerContent={props=><DrawerMenu {...props}/>}>
					<Drawer.Screen name="FlashScreen" component={FlashScreen} />
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
            title="রেজিষ্ট্রেশন"
			      icon="people"
            onPress={() => {
              navigation.navigate('Stack',{screen:"UserAccountType"});
              navigation.closeDrawer();
            }}
          />  
		  
		  
		  <MenuButton
            title="লগইন/প্রোপাইল"
			      icon="people"
            onPress={() => {
              navigation.navigate('Stack',{screen:"Profile"});
              navigation.closeDrawer();
            }}
          />
         
		 <MenuButton
            title="আগের বাজার"
			      icon="basket"
            onPress={() => {
              navigation.navigate('Stack',{screen:"PreviousCart"});
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
            title="হটলাইন"
			      icon="ios-call"
            onPress={() => {
              navigation.navigate('Hotline');
              navigation.closeDrawer();
            }}
          />
		  {/***<View style={{flexDirection:'row',justifyContent:'space-between',width:'60%',marginLeft:20}}>
				<Icon name="ios-logo-facebook"/>
				<Icon name="ios-logo-youtube"/>
				<Icon name="ios-logo-whatsapp"/>
				<Icon name="ios-logo-twitter"/>
			</View>***/}
        </View>
		
      </View>
    );
  
}

DrawerNavigator.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};
