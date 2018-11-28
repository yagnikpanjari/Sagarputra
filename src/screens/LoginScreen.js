import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Keyboard,
  View,
  AsyncStorage
} from 'react-native';
import Button from '../components/button';
import Input from '../components/textInput';
import TextLable from '../components/text';
import Spinner from '../components/Spinner';
import AppStyles from '../constants/AppStyles';


export default class LoginScreen extends Component {

 constructor(props)
 {
   super(props)
   this.state =
    {
        username:'',
        password:'',
        is_Loading:false,
    }
 }


  btnPress=(redirectto)=>
  {
    this.props.navigation.navigate(redirectto);
  }

  /**
	 * Store auth credentials to device.
	 *
	 */
  async saveToStorage(userData)
  {
    if (userData) 
    {
      await AsyncStorage.setItem('user', JSON.stringify({
      //isLoggedIn: true,
      //authToken: userData.auth_token,
            id: userData.id,
            name: userData.first_name,
            middle_name: userData.middle_name,
            last_name: userData.last_name,
            gender: userData.gender,
            mobile: userData.mobile,
            email: userData.email,
            dob: userData.dob,
            address: userData.address,
            city: userData.city,
            occupation: userData.occupation,
            pincode: userData.pincode,
            marital_status: userData.marital_status,
            blood_group: userData.blood_group,
            user_pic: userData.user_pic

          })
        );             
        var vr=await AsyncStorage.getItem("user");
        //alert("from Login : " + vr)
      return true;
    }
    return false;
  }
  
  retriveData()
  {
    Keyboard.dismiss();
    this.setState({ is_Loading : true }, () =>
    {
      fetch('http://zeveninfoway.com/sagarputra/index.php/webservice/login',
                {
                    method: 'POST',
                    headers:
                        {
                            'Accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                    body: "mobile="+this.state.username + "& password=" +this.state.password

        }).then((response) => response.json()).then((responseJsonFromServer) =>
        {
            console.log(responseJsonFromServer);

            if(responseJsonFromServer.status==1)
            {
                let data = responseJsonFromServer.result[0];
                //alert(JSON.stringify(data))
                this.btnPress("HomeScreen")   
                this.saveToStorage(data)
              }
            else
                alert(responseJsonFromServer.message);

            this.setState({ is_Loading : false });

        }).catch((error) =>
        {
            console.error(error);

            this.setState({ is_Loading : false});
        });
    });
  }
  mRenderButton() {
    if (this.state.is_Loading) {
      return (
        <ImageBackground style={styles.container} source={AppStyles.background_img.source}>
          <View style={styles.top}>         
              <Spinner />
          </View>
        </ImageBackground>
      );
    }
  }

  render() {
    {this.mRenderButton()}
    return (
        <ImageBackground style={styles.container} source={AppStyles.background_img.source}>
                    <View style={styles.top}>

              <Input  placeholder='Enter Mobile Number' 
                      value={this.state.username}
                      maxLength={10}
                      fontSize={20}
                      keyboardType='numeric'
                      paddingLeft={15}
                      onChangeText={(username) => this.setState({username})}
                      />
              <Input  placeholder='Enter Password'
                      fontSize={20}
                      paddingLeft={15}
                      value={this.state.password}
                      secureTextEntry={true}
                      onChangeText={(password) => this.setState({password})}
                      />
              <Button
                  text="Login"
                  onPress={()=>this.retriveData()}
                  color={AppStyles.colour.background}
                />
              <Button
                  text="Register"
                  onPress={()=>this.btnPress("RegisterUser")}
                  color={AppStyles.colour.background_light}
                />
                <TextLable 
                  text="Fogot Password ?"
                  textAlign="center"
                  fontSize={20}
                  color={AppStyles.colour.font}
                  onPress={()=>this.btnPress("ForgotPassword")}
                />
                </View>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent:'center'
  },
  top:{
    flex: 1,
    padding:20,
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0.3)',
},
  input:{
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#1b5478',
    color: '#1b5478'
},
// ActivityIndicatorStyle:{
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 100,
//     alignItems: 'center',
//     justifyContent: 'center'
// }
});
