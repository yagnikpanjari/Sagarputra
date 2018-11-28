import React from 'react';
import {StyleSheet,Image,View } from 'react-native';
import AppStyles from '../constants/AppStyles';

const ImageView =(img)=>(
         <Image 
             style={styles.profileimage} 
             source = {require('../images/three.jpg')}>
         </Image>
        // <Image style={styles.profileimage}  source = { img!="" ? { uri:img } : require('../images/default.jpg')}
        // />
);


export default ImageView;

const styles=StyleSheet.create({
    profileimage:{
        flex:1,
        width:null,
        alignSelf:'stretch',
        borderRadius:180,
        borderWidth:4,
        borderColor:'#fff',
    },
})