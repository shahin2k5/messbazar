// import { createAppContainer } from 'react-navigation';
import { createAppContainer, NavigationContainer } from '@react-navigation/native';
//import { createDrawerNavigator } from 'react-navigation-drawer'
//import { createStackNavigator } from 'react-navigation-stack'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../HomeScreen'
import CategoryScreen from '../CategoryScreen'
import SubCategoryScreen from '../SubCategoryScreen'
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';

// import HomeScreen from '../screens/Home/HomeScreen';
// import CheckoutScreen from '../screens/Checkout/CheckoutScreen';
// import ItemDetailsScreen from '../screens/ItemDetails/ItemDetailsScreen';
// import ItemsListScreen from '../screens/ItemsList/ItemsListScreen';
// import CartScreen from '../screens/Cart/CartScreen';
// import AboutScreen from '../screens/About/AboutScreen';
// import ContactScreen from '../screens/Contact/ContactScreen';
// import LoginScreen from '../screens/login/login';
// import OrderDetails from '../screens/OrderDetails/OrderDetailsScreen'
// import SearchScreen from '../screens/Search/SearchScreen'
// import MyOrder from '../screens/MyOrder/OrderDetailsScreen'

const screens = {
  Home: HomeScreen,
  Category: CategoryScreen,
  SubCategory: SubCategoryScreen,
  // Search: SearchScreen,
  // ItemDetails: ItemDetailsScreen,
  // ItemsList: ItemsListScreen,
  // About: AboutScreen,
  // Contact: ContactScreen,
  // Cart: CartScreen,
  // Checkout: CheckoutScreen,
  // Login: LoginScreen,
  // OrderDetails: OrderDetails,
  // Orders: MyOrder,
};

const MainNavigator = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: { backgroundColor: '#545454', height: 50, },
    headerTintColor: 'white',
    headerTitleStyle: {
      color: 'white'
    },
    headerForceInset: { top: 'never' },
  }
});

const DrawerStack = createDrawerNavigator(
  {
    Main: MainNavigator
  },
  {
    drawerPosition: 'left',
    initialRouteName: 'Main',
    drawerWidth: 230,
    contentComponent: DrawerContainer,
  }
);

export default AppContainer = createAppContainer(DrawerStack);

console.disableYellowBox = true;

