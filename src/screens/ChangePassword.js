import React,{Component}from 'react';
import {ImageBackground,StyleSheet,Keyboard,View} from 'react-native';
import Button from '../components/button';
import Input from '../components/textInput';
import TextLable from '../components/text';
import AppStyles from '../constants/AppStyles';


export default class ChangePassword extends Component{
    render()
    {
        return(
            <ImageBackground style={styles.container} source={AppStyles.background_img.source}>
            <View style={styles.top}>
              <TextLable text='Please Enter Your New Password'
                        color={AppStyles.colour.font}
                />
                <Input placeholder='Enter New Password'
                    //   value={this.state.number}
                    //   onChangeText={(number) => this.setState({number})}
                      />
                <Input placeholder='Re Enter New Password'
                    //   value={this.state.otp}
                    //   onChangeText={(otp) => this.setState({otp})}
                      /> 
            
              <Button
                text="Change Password"
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