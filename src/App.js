/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {Text}from 'react-native';
import {StackNavigator,DrawerNavigator} from 'react-navigation';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen'
import RegisterUser from './screens/RegisterUser';
import ForgotPassword from './screens/ForgotPassword';
import ChangePassword from './screens/ChangePassword';
import Committee from './screens/Committee';
import BoatOwnersList from './screens/BoatOwnersList';
import AboutUs from './screens/AboutUs';
import DetailNews from './screens/DetailNews';
import AppStyles from './constants/AppStyles';
import Button from '../src/components/button';
import UserProfile from './screens/UserProfile'
import EventsList from './screens/EventsList'
import EditProfile from './screens/EditProfile'
import PersonDetails from './screens/PersonDetails';




const AppNavigator = StackNavigator({
  SplashScreen: {
      screen: SplashScreen, 
      navigationOptions: {
      title: "Splash Screen",
      headerTitleStyle:{
        alignSelf:'center',
        textAlign: 'center',
        flex: 1,
      },
  }},
  LoginScreen: { 
      screen: LoginScreen,
      navigationOptions: {
      title: "Login",
      headerTitleStyle:{
        alignSelf:'center',
        textAlign: 'center',
        flex: 1,
      },
      headerLeft:null
  }}, 
  
  HomeScreen: {screen: HomeScreen},
  RegisterUser: {screen: RegisterUser}, 

  ForgotPassword: { 
    screen: ForgotPassword,
    navigationOptions: {
    title: "Forgot Password",
    headerTitleStyle:{
      alignSelf:'center',
      textAlign: 'center',
      flex: 1,
    },
    headerRight: (
      <Button
        text="Clear"
        onPress={()=>alert("hi")}
        color={AppStyles.colour.background}
      />
    ),
  }}, 

  DetailNews: {screen: DetailNews}, 
  PersonDetails: {screen: PersonDetails}, 

  
  UserProfile: {screen: UserProfile}, 
  EditProfile:{screen:EditProfile},

  ChangePassword: { 
    screen: ChangePassword,
    navigationOptions: {
    title: "Change Password",
  }}, 
  Committee: { 
    screen: Committee,
    navigationOptions: {
    title: "Committee List",
    headerTitleStyle:{
      alignSelf:'center',
      textAlign: 'center',
      flex: 1,
    },
    headerRight: (
      <Button
        text="Clear"
        onPress={()=>alert("hi")}
        color={AppStyles.colour.background}
      />
    ),
  }}, 
  AboutUs: { 
    screen: AboutUs,
    navigationOptions: {
    title: "About Us",
    headerTitleStyle:{
      alignSelf:'center',
      textAlign: 'center',
      flex: 1,
    },
    headerRight: (
      <Button
        text="Clear"
        onPress={()=>alert("hi")}
        color={AppStyles.colour.background}
      />
    ),
  }}, 
  BoatOwnersList: { 
    screen: BoatOwnersList,
    navigationOptions: {
    title: "Boat Owners List",
    headerTitleStyle:{
      alignSelf:'center',
      textAlign: 'center',
      flex: 1,
    },
}},
EventsList: {screen: EventsList}, 

},


{
  initialRouteName: 'Committee',
  navigationOptions: {
    headerStyle: {
      backgroundColor: AppStyles.colour.AppHeader_color,
    },
    headerTintColor: AppStyles.colour.font,
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign:'center'
    },
  },
}
);


export const MyDrawer = DrawerNavigator({
  SplashScreen: {
    screen: SplashScreen,
  },
  LoginScreen: {
    screen: LoginScreen,
  },
});

export default AppNavigator;