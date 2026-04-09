import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, LayoutGrid, Plus, PieChart, User } from 'lucide-react-native';

import Posts from '../Home/Posts';
import Article from '../Home/Article';
import Trending from '../Home/Trending';
import TopArticle from '../Home/TopArticle';
import Search from '../Home/Search';
import Explore from '../Home/Explore';
import PostDetail from '../Home/PostDetail';
import EcoStarter from '../Dashboard/EcoStarter';
import History from '../Dashboard/History';
import Challenge from '../Dashboard/Challenge';
import StartChallenge from '../Dashboard/Start_Challenge';
import Communication from '../Dashboard/Communication';
import ProductHome from '../Product/Home';
import Shop from '../Product/Shop';
import Product from '../Product/Product';
import Cart from '../Product/Cart';
import Payment from '../Product/Payment';
import Profile from '../Profile/Profile';
import CreateMenu from './CreateMenu';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#FFFBE6' } }}>
    <Stack.Screen name="Posts" component={Posts} />
    <Stack.Screen name="Article" component={Article} />
    <Stack.Screen name="Trending" component={Trending} />
    <Stack.Screen name="TopArticle" component={TopArticle} />
    <Stack.Screen name="Search" component={Search} />
    <Stack.Screen name="Explore" component={Explore} />
    <Stack.Screen name="PostDetail" component={PostDetail} />
  </Stack.Navigator>
);

const DashboardStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#FFFBE6' } }}>
    <Stack.Screen name="EcoStarter" component={EcoStarter} />
    <Stack.Screen name="Communication" component={Communication} />
    <Stack.Screen name="History" component={History} />
    <Stack.Screen name="Challenge" component={Challenge} />
    <Stack.Screen name="StartChallenge" component={StartChallenge} />
  </Stack.Navigator>
);

const ShopStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#FFFBE6' } }}>
    <Stack.Screen name="ProductHome" component={ProductHome} />
    <Stack.Screen name="Shop" component={Shop} />
    <Stack.Screen name="Product" component={Product} />
    <Stack.Screen name="Cart" component={Cart} />
    <Stack.Screen name="Payment" component={Payment} />
  </Stack.Navigator>
);

const CustomTabBarButton = ({ children, onPress }: any) => (
  <TouchableOpacity
    style={styles.customButtonContainer}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.customButton}>
      {children}
    </View>
  </TouchableOpacity>
);

const BottomTabNavigator = () => {
  const [createMenuVisible, setCreateMenuVisible] = useState(false);
  const navigation = useNavigation<any>();

  const handleCreateSelect = (type: 'post' | 'article' | 'news') => {
    if (type === 'post') navigation.navigate('NewPost');
    else if (type === 'article') navigation.navigate('NewArticle');
    else if (type === 'news') navigation.navigate('NewNews');
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          const hideTabBar = ['Product', 'Cart', 'Payment', 'Search', 'Explore', 'History', 'Challenge', 'StartChallenge'].includes(routeName || '');
          return {
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: hideTabBar ? { display: 'none' } : styles.tabBar,
            tabBarActiveTintColor: '#4F9A42',
            tabBarInactiveTintColor: '#999',
          };
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Home color={color} size={focused ? 30 : 26} strokeWidth={focused ? 2.5 : 2} />
            ),
          }}
        />
        <Tab.Screen
          name="Dashboard"
          component={DashboardStack}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <LayoutGrid color={color} size={focused ? 30 : 26} strokeWidth={focused ? 2.5 : 2} />
            ),
          }}
        />
        <Tab.Screen
          name="Create"
          component={View} // Dummy component
          options={{
            tabBarButton: (props) => (
              <CustomTabBarButton {...props} onPress={() => setCreateMenuVisible(true)}>
                <Plus color="#FFF" size={32} strokeWidth={3} />
              </CustomTabBarButton>
            ),
          }}
        />
        <Tab.Screen
          name="Shop"
          component={ShopStack}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <PieChart color={color} size={focused ? 30 : 26} strokeWidth={focused ? 2.5 : 2} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <User color={color} size={focused ? 30 : 26} strokeWidth={focused ? 2.5 : 2} />
            ),
          }}
        />
      </Tab.Navigator>

      <CreateMenu
        isVisible={createMenuVisible}
        onClose={() => setCreateMenuVisible(false)}
        onSelect={handleCreateSelect}
      />
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    backgroundColor: '#FFFFFF',
    height: 65,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingBottom: 0, // Grounded
  },
  customButtonContainer: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4F9A42',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 15,
  },
  customButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4F9A42',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFF',
  },
});

export default BottomTabNavigator;
