import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ImageBackground,
    Dimensions,
    View,
    AsyncStorage
} from 'react-native';
let obj;
const win = Dimensions.get('window');


class SplashScreen extends Component {
  
  constructor()
  {
    super()
            //checking wether user login or not 
         AsyncStorage.getItem("user").then((value) => {
             obj=JSON.parse(value)
         })
        
        //set timeout for splash screen
        setTimeout(() => {
          this.gotoScreen();
      }, 3000)

  }    
  componentWillMount(){
      
  }
  static navigationOptions = {
      header: null
  }
  
  gotoScreen()
  { 
      if(obj)
      {
        alert("Welcome Back : " +obj.name)
        this.props.navigation.navigate("HomeScreen")     
      }
      else
        this.props.navigation.navigate("LoginScreen")       
    }

    render()
    {
    return (
        <ImageBackground source={AppStyles.background_img.source}
               style={styles.backgroundImage}>
            <View style={styles.topView}>
              <Text style={styles.text}  onPress={() => this.gotoScreen()}>Welcome To Sagarputra</Text>
              <Text style={styles.text}  onPress={() => this.gotoScreen()}>News App</Text>
            </View>
        </ImageBackground>
    );
    }
}
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    text: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 32,
    },
    topView:{
        width: win.width,
        height: win.height,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(0,0,0,0.3)',
    }
});

export default SplashScreen;
