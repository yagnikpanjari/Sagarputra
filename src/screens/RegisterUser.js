import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
  TextInput,
  Text,
  Alert,
  ScrollView,
  View
} from 'react-native';
import Button from '../components/button';
import Input from '../components/textInput';
import TextLable from '../components/text';
import Image from '../components/image';
import Spinner from '../components/Spinner';
import AppStyles from '../constants/AppStyles';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'



export default class RegisterUser extends Component {

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
       isLoading: false,

   }
 }

 componentDidMount() {
    this.props.navigation.setParams({ clear: this.clearTextInput.bind(this) });
  }


  static navigationOptions = ({ navigation: { state : { params } } }) => ({
    title: "Register User",
    headerTitleStyle:{
      alignSelf:'center',
      textAlign: 'center',
      flex: 1,
    },
    headerRight: (
      <Button
        text="Clear"
        onPress={params && params.clear}
        color={AppStyles.colour.background}
      />
    ),
});

clearTextInput()
{
   // alert("Hii")
    console.log(this.state);
    this.setState({ first_name: '' });
    this.setState({ last_name: '' });
    this.setState({ middle_name: '' });
    this.setState({ gender: '' });
    this.setState({ mobile: '' });
    this.setState({ email: '' });
    this.setState({ occupation: '' });
    this.setState({ password: '' });
    this.setState({ conf_password: '' });
    this.setState({ address: '' });
    this.setState({ city: '' });
    this.setState({ pincode: '' });
    this.setState({ country: '' });
    this.setState({ marital_status: '' });
    this.setState({ blood_group: '' });
    this.setState({ dob: '' });

    // console.log("doClear...");
    // let Input = this.refs["textInput"];
    // console.log(Input);
    // Input.clear();
        //console.log(this.state);
}



 user_register()
 {
     if(this.state.password==this.state.conf_password)
    {       
       
     this.setState({ isLoading : true }, () =>
     {
       
         fetch('http://zeveninfoway.com/sagarputra/index.php/webservice/userRegistration',
             {
                 method: 'POST',
                 headers:
                     {
                         'Accept': 'application/json',
                         'Content-Type': 'application/x-www-form-urlencoded'
                     },
                 body: "first_name="+this.state.first_name+"& middle_name="+this.state.middle_name +"& last_name="+this.state.last_name + 
                "& mobile=" +this.state.mobile + "& password="+this.state.password +"& city=" +this.state.city +
                  "& gender="+this.state.gender +"& email=" +this.state.email +
                  "& occupation="+this.state.occupation +"& address=" +this.state.address +
                  "& state="+this.state.state +"& country=" +this.state.country +
                  "& pincode="+this.state.pincode +"& marital_status=" +this.state.marital_status +
                  "& blood_group="+this.state.blood_group + "& dob="+this.state.dob 



             }).then((response) => response.json()).then((responseJsonFromServer) =>
            {
                console.log(responseJsonFromServer);

                if(responseJsonFromServer.status==1)
                {
                    alert("Successfully Registerd");
                    this.props.navigation.navigate('LoginScreen');
                }
                else
                    alert(responseJsonFromServer.message);

                    this.setState({ isLoading : false });

            }).catch((error) =>
            {
                console.error(error);
                this.setState({ isLoading : false });
            });
      });
    }
    else
        alert("Password And Confirm Password not match")

 }


onSelect(index, value){
    alert(value)
}


render() {
if (this.state.isLoading) {
    return (
        <ImageBackground style={styles.container} source={AppStyles.background_img.source}>
        <View style={styles.top}>         
            <Spinner />
        </View>
        </ImageBackground>
    );
    }
return (
    <ImageBackground style={styles.container} source={AppStyles.background_img.source}>
    <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.top}>
            <View style={styles.profileiview}>
                <View style={styles.profileImage}>
                    <Image/>
                </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TextLable width='30%'  text='First Name :' color={AppStyles.colour.font}/>
                <Input width='65%'
                    placeholder='Enter First Name' 
                    value={this.state.first_name}
                    onChangeText={(first_name) => this.setState({first_name})}
                    />
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TextLable width='30%'  text='Middle Name :'color={AppStyles.colour.font}/>
                <Input width='65%' placeholder='Enter Middle Name' 
                    value={this.state.middle_name}
                    onChangeText={(middle_name) => this.setState({middle_name})}
                    />
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TextLable width='30%' text='Last Name :' color={AppStyles.colour.font}/>
                <Input width='65%' placeholder='Enter Last Name'
                    value={this.state.last_name}
                    onChangeText={(last_name) => this.setState({last_name})}
                    />
            </View>
            <View style={{flexDirection:'row'}}>
                <TextLable width='30%' placeholder='Gender :' color={AppStyles.colour.font}/>
                <RadioGroup
                    style={{flexDirection:'row'}}
                    size={20}
                    thickness={2}
                    color={'white'}
                    selectedIndex={0}
                    onSelect = {(index, value) => this.onSelect(index, value)}>
                        <RadioButton style={{alignItems:'center'}} color={AppStyles.colour.border_color} value={'item1'} >
                            <TextLable text='Male' color={AppStyles.colour.font}/>
                        </RadioButton>

                        <RadioButton style={{alignItems:'center'}} color={AppStyles.colour.border_color} value={'item2'}>
                            <TextLable text='Female'  color={AppStyles.colour.font}/>
                        </RadioButton>
                </RadioGroup>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TextLable width='30%'  text='Mobile No :' color={AppStyles.colour.font}/>
                <Input width='65%' placeholder='Enter Mobile No' 
                        value={this.state.mobile}
                        onChangeText={(mobile) => this.setState({mobile})}
                />
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TextLable width='30%'text='Email :' color={AppStyles.colour.font} />
                <Input width='65%' placeholder='Enter Email' 
                    value={this.state.email}
                    onChangeText={(email) => this.setState({email})}
                />
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TextLable width='30%'  text='Date Of Birth:' color={AppStyles.colour.font}/>
                <Input width='65%' 
                    placeholder='Date Of Birth' 
                    value={this.state.dob}
                    onChangeText={(dob) => this.setState({dob})}
                    />
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TextLable width='30%'  text='Occupation :' color={AppStyles.colour.font}/>
                <Input width='65%' placeholder='Enter Occupation'
                    value={this.state.occupation}
                    onChangeText={(occupation) => this.setState({occupation})}
                />
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TextLable width='30%'  text='Password :' color={AppStyles.colour.font}/>
                <Input width='65%' placeholder='Enter Password'
                    value={this.state.password}
                    onChangeText={(password) => this.setState({password})}
                />
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TextLable width='30%'  text='Confirm Password :' color={AppStyles.colour.font}/>
                <Input width='65%' placeholder='Confirm Password' 
                    value={this.state.conf_password}
                    onChangeText={(conf_password) => this.setState({conf_password})}
                />
            </View>

            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TextLable width='30%' text='Address :' color={AppStyles.colour.font}/>
                <Input width='65%' placeholder='Enter Address' 
                    value={this.state.address}
                    onChangeText={(address) => this.setState({address})}
                />
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TextLable width='30%' text='City :' color={AppStyles.colour.font}/>
                <Input width='65%' placeholder='Enter Name Of City' 
                    value={this.state.city}
                    onChangeText={(city) => this.setState({city})}
                />
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TextLable width='30%'  text='Pincode :' color={AppStyles.colour.font}/>
                <Input width='65%' placeholder='Enter Pincode Of City' 
                    value={this.state.pincode}
                    onChangeText={(pincode) => this.setState({pincode})}
                />
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TextLable width='30%' text='State :' color={AppStyles.colour.font}/>
                <Input width='65%' placeholder='Enter Name Of State' 
                    value={this.state.state}
                    onChangeText={(state) => this.setState({state})}
                />
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TextLable width='30%' text='Country :' color={AppStyles.colour.font}/>
                <Input width='65%' placeholder='Enter Name Of Country' 
                    value={this.state.country}
                    onChangeText={(country) => this.setState({country})}
                />
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TextLable width='30%' text='Blood Group :' color={AppStyles.colour.font}/>
                <Input width='65%' placeholder='Enter Blood Broup' 
                    value={this.state.blood_group}
                    onChangeText={(blood_group) => this.setState({blood_group})}
                />
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TextLable width='30%'  text='Marital Status :' color={AppStyles.colour.font}/>
                <Input width='65%' placeholder='Select Marital Status' 
                    value={this.state.marital_status}
                    onChangeText={(marital_status) => this.setState({marital_status})}
                />
            </View>
                
            <Button
                text="Register"
                onPress={()=>this.user_register()}
                color={AppStyles.colour.background_light}
            />
        </View>
        </ScrollView>
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
    profileImage:{
        width:150,
        height:150,
        justifyContent:'center',
        alignItems:'center',
    },
    profileiview:{
        flex:1,
        width:null,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10
    }
});
