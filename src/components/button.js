import React from 'react';
import {Text,TouchableOpacity,StyleSheet } from 'react-native';
import AppStyles from '../constants/AppStyles';


const Button = ({text, onPress,color}) => (
    //<TouchableOpacity style={[styles.buttonStyle,{backgroundColor: color !== undefined ? color : AppStyles.colour.background}]} onPress={onPress}>
    <TouchableOpacity style={[styles.buttonStyle,{backgroundColor: color}]} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
);
Button.defaultProps = {
    color: AppStyles.colour.background,
  };
  
const styles = StyleSheet.create({
    buttonStyle: {
        marginTop:10,
        paddingTop:5,
        paddingBottom:10,
        margin:10,
        //backgroundColor:AppStyles.colour.background,
        borderRadius:10,
        borderWidth: 1,
        borderColor: AppStyles.colour.border_color
    },
    buttonText:{
        color: AppStyles.colour.font,
        textAlign: 'center',
        fontWeight: '700'
    },
})

export default Button;