import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
  TextInput,
  Text,
  Alert,
  ScrollView,
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



export default class EditProfile extends Component {

 constructor(props)
 {
   super(props)
   this.state={
       user_id:'',
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

 componentDidMount() {
    this.props.navigation.setParams({ clear: this.clearTextInput.bind(this) });
  }


  static navigationOptions = ({ navigation: { state : { params } } }) => ({
    title: "Edit Profile",
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
    //this.setState({user_id:''});
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

retrieveData () {
    if (obj !== null) {
    // We have data!!
    this.setState({user_id:obj.id});
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
    //alert(this.state.user_pic)
    }
}

 user_register()
 {
     this.setState({ isLoading : true }, () =>
     {
         fetch('http://zeveninfoway.com/sagarputra/index.php/webservice/updateBasicInfo',
             {
                 method: 'POST',
                 headers:
                     {
                         'Accept': 'application/json',
                         'Content-Type': 'application/x-www-form-urlencoded'
                     },
                 body: "master_event_id=1"+ "& user_id="+this.state.user_id + "& first_name="+this.state.first_name+"& middle_name="+this.state.middle_name +"& last_name="+this.state.last_name + 
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
                    alert(this.state.first_name + " " + this.state.middle_name + " "+ this.state.last_name)
                   // alert("Successfully Updated");
                    this.props.navigation.navigate('UserProfile');
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
                <Image  style={styles.profileImage}  source = { this.state.user_pic!="" ? { uri:this.state.user_pic } : require('../images/default.jpg')}
                    />
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
                text="Save Changes"
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
        width:200,
        height:200,
        justifyContent:'center',
        alignItems:'center',
        borderRadius : 10,

    },
    profileiview:{
        flex:1,
        width:null,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10
    }
});
