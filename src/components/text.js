import React from 'react';
import {Text,StyleSheet } from 'react-native';
import AppStyles from '../constants/AppStyles';


const TextLable = ({text,color,onPress,width,textAlign,marginLeft,marginRight,fontSize,margin,marginTop,backgroundColor}) => (
        <Text style={[styles.font,
            {width:width,
            color:color,
            fontSize:fontSize,
            textAlign:textAlign,
            margin:margin,
            marginTop:marginTop,
            marginLeft:marginLeft,
            marginRight:marginRight,
            backgroundColor:backgroundColor
        }]} 
                onPress={onPress}>{text}
        </Text>
);

Text.defaultProps={
    color: AppStyles.colour.textinput_font,
    textAlign:'center'
  };
  
const styles = StyleSheet.create({
    font:{
        justifyContent:'center',
        // marginBottom: 5,
        // margin:5,
        // padding: 5
    },
})
export default TextLable;