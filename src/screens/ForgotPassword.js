import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Alert,
  Keyboard,
  ToastAndroid,
  View
} from 'react-native';
import Button from '../components/button';
import Input from '../components/textInput';
import TextLable from '../components/text';
import AppStyles from '../constants/AppStyles';

export default class ForgotPassword extends Component {

 constructor(props)
 {
    super(props)
    this.state={
      number:'',
      otp:'',
      isVisible:false,
      isEditable:true,
    }
 }
 btnPress=()=>
 {
    this.setState({isEditable:false})
    alert(this.state.isVisible)

    if(!this.state.isVisible)
        this.generateOTP()
    else
        this.otpVerification();
 }
 generateOTP=()=>
 {
   Keyboard.dismiss();
   this.setState({ is_Loading : true }, () =>
   {
    fetch('http://zeveninfoway.com/sagarputra/index.php/webservice/generateOtp',
    {
                   method: 'POST',
                   headers:
                       {
                           'Accept': 'application/json',
                           'Content-Type': 'application/x-www-form-urlencoded'
                       },
                       body:"master_event_id=1"+"& mobile="+this.state.number  

       }).then((response) => response.json()).then((responseJsonFromServer) =>
       {
           console.log(responseJsonFromServer);

           if(responseJsonFromServer.status==1)
           {
                ToastAndroid.showWithGravityAndOffset(
                  'Otp Sent',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50
                );
               this.setState({isVisible:true});
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


 otpVerification=()=>
 {
   Keyboard.dismiss();
   this.setState({ is_Loading : true }, () =>
   {
     fetch('http://zeveninfoway.com/sagarputra/index.php/webservice/otpVerify',
               {
                   method: 'POST',
                   headers:
                       {
                           'Accept': 'application/json',
                           'Content-Type': 'application/x-www-form-urlencoded'
                       },
                   body: "master_event_id=1"+"& mobile="+this.state.number + "& otp=" +this.state.otp

       }).then((response) => response.json()).then((responseJsonFromServer) =>
       {
           console.log(responseJsonFromServer);

           if(responseJsonFromServer.status==1)
           {
               let data = responseJsonFromServer.result[0];
               alert(JSON.stringify(data))
              // this.saveToStorage(data)
              this.props.navigation.navigate("ChangePassword");
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

render() {
  return (
      <ImageBackground style={styles.container} source={AppStyles.background_img.source}>
          <View style={styles.top}>
            <TextLable text='Enter Register Mobile Number '
                      color={AppStyles.colour.font}
                      textAlign="center"
                      fontSize={16}
              />
            <Input placeholder='Enter Mobile Number'
                    maxLength={10}
                    keyboardType='numeric'
                    paddingLeft={15}
                    fontSize={20}
                    editable={this.state.isEditable}
                    value={this.state.number}
                    onChangeText={(number) => this.setState({number})}
                    />
            {
              this.state.isVisible ?  
              <Input placeholder='Enter OTP' 
                    maxLength={4} 
                    keyboardType='numeric'
                    paddingLeft={15}
                    fontSize={20}
                    value={this.state.otp}
                    onChangeText={(otp) => this.setState({otp})}
                    /> 
                    : null 
            }
          
            <Button
              text="Submit"
              onPress={()=>this.btnPress()}
              color={AppStyles.colour.background_light}
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
    padding:10,
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
});
