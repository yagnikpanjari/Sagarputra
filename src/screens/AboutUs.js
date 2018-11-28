import React,{Component}from 'react';
import {View,Text,WebView,StyleSheet}from 'react-native';

export default class AboutUs extends Component
{
    render()
    {
        return(
        <WebView 
          style={styles.WebViewStyle} 
          source={{uri: 'http://zeveninfoway.com/sagarputra/html/about.html'}} 
          javaScriptEnabled={true}
          domStorageEnabled={true}  />
        )
    }
}

const styles = StyleSheet.create(
    {
     
     WebViewStyle:
     {
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
     }
    });