import React from "react";
import { View, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from "./src/onboarding/SplashScreen";
import Ob_1 from "./src/onboarding/Ob_1";
import Ob_2 from "./src/onboarding/Ob_2";
import Ob_3 from "./src/onboarding/Ob_3";
import LoginMenu from "./src/onboarding/LoginMenu";
// import BackButton from "./src/components/BackButton"; 
import Signup from "./src/login/PhoneNo";
import Otp from "./src/login/OtpVerification";
import Details from "./src/onboarding/Details";
import Interest from "./src/onboarding/Interest";
import Welcome from "./src/onboarding/Welcome";
// import PostSearchBar from "./src/components/PostSearchBar"
import Posts from "./src/Home/Posts";
import Article from "./src/Home/Article";
import TopArticle from "./src/Home/TopArticle";
import Trending from "./src/Home/Trending";
import NewPost from "./src/create/NewPost";
import NewPostDetails from "./src/create/NewPostDetails";
import NewArticle from "./src/create/NewArticle";
import NewNews from "./src/create/NewNews";
import NewProduct from "./src/create/NewProduct";
import DashBoardHeader from "./src/components/DashBoardHeader";
import EcoStarter from "./src/Dashboard/EcoStarter";
import History from "./src/Dashboard/History";
import Challenge from "./src/Dashboard/Challenge";
import Start_Challenge from "./src/Dashboard/Start_Challenge";
import Home from "./src/Product/Home";
import Shop from "./src/Product/Shop";
import Product from "./src/Product/Product";
import Cart from "./src/Product/Cart";
import Payment from "./src/Product/Payment";


import BottomTabNavigator from "./src/components/BottomTabNavigator";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false ,  contentStyle: { backgroundColor: '#FFFBE6' }}}>
            <Stack.Screen name="Intro" component={SplashScreen} />
            <Stack.Screen name="Ob1" component={Ob_1} />
            <Stack.Screen name="Ob2" component={Ob_2} />
            <Stack.Screen name="Ob3" component={Ob_3} />
            <Stack.Screen name="LoginMenu" component={LoginMenu} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Otp" component={Otp} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="Interest" component={Interest} />
            <Stack.Screen name="Welcome" component={Welcome} />
            
            <Stack.Screen name="MainTabs" component={BottomTabNavigator} />

            <Stack.Screen name="NewPost" component={NewPost} />
            <Stack.Screen name="NewPostDetails" component={NewPostDetails} />
            <Stack.Screen name="NewArticle" component={NewArticle} />
            <Stack.Screen name="NewNews" component={NewNews} />
            <Stack.Screen name="NewProduct" component={NewProduct} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}