import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
  TextInput,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  View,
  Image
} from 'react-native';
import Button from '../components/button';
import Input from '../components/textInput';
import TextLable from '../components/text';
//import Image from '../components/image';
import Spinner from '../components/Spinner';
import AppStyles from '../constants/AppStyles';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import Icon from 'react-native-vector-icons/FontAwesome';
let obj;



export default class UserProfile extends Component {

 constructor(props)
 {
   super(props)
   this.state={
       first_name:'',
       last_name:'',
       middle_name:'',
       gender:'',
       mobile:'',
       email:'',
       occupation:'',
       password:'',
       conf_password:'',
       address:'',
       city:'',
       pincode:'',
       state:'',
       country:'',
       marital_status:'',
       blood_group:'',
       dob:'',
       user_pic:'',
       isLoading: false,
   }
   AsyncStorage.getItem("user").then((value) => {
        obj=JSON.parse(value)
        this.retrieveData();
    })
 }

 static navigationOptions = ({navigation }) => ({
    title: "User Profile",
    headerTitleStyle:{
      alignSelf:'center',
      textAlign: 'center',
      flex: 1,
    },

    headerRight: (
      <TouchableOpacity style={{marginRight:10,justifyContent:'center',alignItems:'center'}} 
      //onPress={navigation.navigate('removeUser')}
      onPress={navigation.getParam('removeUser')}
      >
         <Icon
            name='sign-out'
            size={20}
            color='#fff'
           />  
           <Text style={{color:'#fff'}}>Sign Out</Text>
        </TouchableOpacity>
    ),
});

componentWillMount() {
    this.props.navigation.setParams({ removeUser: this.removeUser });
  }

removeUser=()=>
{
    alert("User Sign Out")
    AsyncStorage.removeItem('user')
    
    this.props.navigation.navigate('SplashScreen');
}

retrieveData () {
   
        if (obj !== null) {
        // We have data!!
        this.setState({first_name:obj.name});
        this.setState({middle_name:obj.middle_name});
        this.setState({last_name:obj.last_name});
        this.setState({gender:obj.gender});
        this.setState({mobile:obj.mobile});
        this.setState({email:obj.email});
        this.setState({dob:obj.dob});
        this.setState({address:obj.address});
        this.setState({city:obj.city});
        this.setState({occupation:obj.occupation});
        this.setState({pincode:obj.pincode});
        this.setState({marital_status:obj.marital_status});
        this.setState({blood_group:obj.blood_group});
        this.setState({user_pic:obj.user_pic});
        }
    }
    

render() {
   
    return (
    <ImageBackground style={styles.container} source={AppStyles.background_img.source}>
        <View style={styles.top}>
            <View style={styles.profileiview}>
                <Image style={styles.profileImage}  source = { this.state.user_pic!="" ? { uri:this.state.user_pic } : require('../images/default.jpg')}
                    />
            </View>

        <View style={styles.roundedView}>

            <View style={{flexDirection:'row',marginLeft:10}}>
                <TextLable fontSize={16} width='30%'  text='First Name :' color={AppStyles.colour.font}/>
                <TextLable  fontSize={16} text={this.state.first_name}color={AppStyles.colour.News_title_font}/>
            </View>
            <View style={{backgroundColor:AppStyles.colour.textinput_font,height:0.5}}></View>

            <View style={{flexDirection:'row',marginLeft:10}}>
                <TextLable width='30%' fontSize={16} text='Middle Name :'color={AppStyles.colour.font}/>
                <TextLable fontSize={16} text={this.state.middle_name}color={AppStyles.colour.News_title_font}/>
            </View>
            <View style={{backgroundColor:AppStyles.colour.textinput_font,height:0.5}}></View>

            <View style={{flexDirection:'row',marginLeft:10}}>
                <TextLable width='30%'fontSize={16} text='Last Name :' color={AppStyles.colour.font}/>
                <TextLable  fontSize={16} text={this.state.last_name} color={AppStyles.colour.News_title_font}/>
            </View>
            <View style={{backgroundColor:AppStyles.colour.textinput_font,height:0.5}}></View>

            <View style={{flexDirection:'row',marginLeft:10}}>
                <TextLable width='30%'fontSize={16} text='Gender :' color={AppStyles.colour.font}/>
                <TextLable  fontSize={16} text={this.state.gender} color={AppStyles.colour.News_title_font}/>
            </View>
            <View style={{backgroundColor:AppStyles.colour.textinput_font,height:0.5}}></View>
            
            <View style={{flexDirection:'row',marginLeft:10}}>
                <TextLable width='30%' fontSize={16} text='Mobile No :' color={AppStyles.colour.font}/>
                <TextLable  fontSize={16} text={this.state.mobile}color={AppStyles.colour.News_title_font}/>
            </View>
            <View style={{backgroundColor:AppStyles.colour.textinput_font,height:0.5}}></View>

            <View style={{flexDirection:'row',marginLeft:10}}>
                <TextLable width='30%' fontSize={16} text='Email :' color={AppStyles.colour.font} />
                <TextLable fontSize={16} text={this.state.email} color={AppStyles.colour.News_title_font} />
            </View>
            <View style={{backgroundColor:AppStyles.colour.textinput_font,height:0.5}}></View>

            <View style={{flexDirection:'row',marginLeft:10}}>
                <TextLable width='30%' fontSize={16} text='Date Of Birth:' color={AppStyles.colour.font}/>
                <TextLable fontSize={16} text={this.state.dob} color={AppStyles.colour.News_title_font}/>  
            </View>
            <View style={{backgroundColor:AppStyles.colour.textinput_font,height:0.5}}></View>

            <View style={{flexDirection:'row',marginLeft:10}}>
                <TextLable width='30%' fontSize={16} text='Occupation :' color={AppStyles.colour.font}/>
                <TextLable  fontSize={16} text={this.state.occupation} color={AppStyles.colour.News_title_font}/>
            </View>
            <View style={{backgroundColor:AppStyles.colour.textinput_font,height:0.5}}></View>

           <View style={{flexDirection:'row',marginLeft:10}}>
                <TextLable width='30%' fontSize={16} text='Address :' color={AppStyles.colour.font}/>
                <TextLable  fontSize={16} text={this.state.address}color={AppStyles.colour.News_title_font}/>

            </View>
            <View style={{backgroundColor:AppStyles.colour.textinput_font,height:0.5}}></View>

            <View style={{flexDirection:'row',marginLeft:10}}>
                <TextLable width='30%' fontSize={16} text='City :' color={AppStyles.colour.font}/>
                <TextLable  fontSize={16} text={this.state.city}color={AppStyles.colour.News_title_font}/>

            </View>
            <View style={{backgroundColor:AppStyles.colour.textinput_font,height:0.5}}></View>

            <View style={{flexDirection:'row',marginLeft:10}}>
                <TextLable width='30%' fontSize={16} text='Pincode :' color={AppStyles.colour.font}/>
                <TextLable  fontSize={16} text={this.state.pincode}color={AppStyles.colour.News_title_font}/>

            </View>
            <View style={{backgroundColor:AppStyles.colour.textinput_font,height:0.5}}></View>

            <View style={{flexDirection:'row',marginLeft:10}}>
                <TextLable width='30%' fontSize={16} text='State :' color={AppStyles.colour.font}/>
                <TextLable  fontSize={16} text={this.state.state}color={AppStyles.colour.News_title_font}/>

            </View>
            <View style={{backgroundColor:AppStyles.colour.textinput_font,height:0.5}}></View>

            <View style={{flexDirection:'row',marginLeft:10}}>
                <TextLable width='30%' fontSize={16} text='Country :' color={AppStyles.colour.font}/>
                <TextLable  fontSize={16} text={this.state.country} color={AppStyles.colour.News_title_font}/>

            </View>
            <View style={{backgroundColor:AppStyles.colour.textinput_font,height:0.5}}></View>

            <View style={{flexDirection:'row',marginLeft:10}}>
                <TextLable width='30%' fontSize={16} text='Blood Group :' color={AppStyles.colour.font}/>
                <TextLable  fontSize={16} text={this.state.blood_group}color={AppStyles.colour.News_title_font}/>

            </View>
            <View style={{backgroundColor:AppStyles.colour.textinput_font,height:0.5}}></View>

            <View style={{flexDirection:'row',marginLeft:10}}>
                <TextLable width='30%' fontSize={16} text='Marital Status :' color={AppStyles.colour.font}/>
                <TextLable  fontSize={16} text={this.state.marital_status} color={AppStyles.colour.News_title_font}/>

            </View>
        </View>
        <Button
                text="Edit Profile"
                onPress={()=>this.props.navigation.navigate("EditProfile")}
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
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0.7)',
    },
    roundedView:{
        margin:2,
        borderRadius:10,
        borderWidth:1,
        backgroundColor:'rgba(0,0,0,0.2)',
        borderColor: AppStyles.colour.border_color
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
    profileImage:{
        width: 200,
        height:200,
        resizeMode:'cover',
        borderRadius : 10,
    },
    profileiview:{
        flex:1,
        width:null,
        justifyContent:'center',
        alignItems:'center',
        margin:5
    }
});
