import React from 'react';
import { TextInput,StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import AppStyles from '../constants/AppStyles';


const Input = ({placeholder,fontSize,paddingLeft,width,secureTextEntry,onChangeText,value,keyboardType,maxLength,editable,ref}) => (
    <TextInput style = {[styles.input,{width:width}]}
        autoCapitalize="none"
        autoCorrect={false}
        fontSize={fontSize}
        editable={editable}
        keyboardType = {keyboardType}
        maxLength={maxLength}
        paddingLeft={paddingLeft}
        secureTextEntry={secureTextEntry}
        returnKeyType="next"
        placeholder={placeholder}
        placeholderTextColor={AppStyles.colour.textinput_placeholder}
        underlineColorAndroid='transparent'
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        //onChangeText={value => this.setState({ value : value})}
        />
);

const styles = StyleSheet.create({
    input:{
        height: 40,
        backgroundColor:AppStyles.colour.textinput_background,
        marginBottom: 5,
        margin:5,
        padding: 5,
        borderRadius:10,
        borderWidth: 1,
        borderColor: AppStyles.colour.border_color,
        color: AppStyles.colour.textinput_font
    },
})

export default Input;