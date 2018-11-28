import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  ImageBackground,
  ListView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Text,
  Modal,
  View
} from 'react-native';
import Button from '../components/button';
import TextLable from '../components/text';
import { DrawerNavigator } from 'react-navigation';
import AppStyles from '../constants/AppStyles';
import Spinner from '../components/Spinner';
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/FontAwesome';


let count=0;

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        userPic:'../images/wallpaper.png',
        name:'',
        gender:'',
        mobile:'',
        email:'',
        isLoading: false,
    }
  }
  
  static navigationOptions = ({ navigation }) => ({
    title: "News",
    headerTitleStyle:{
      alignSelf:'center',
      textAlign: 'center',
      flex: 1,
    },
     headerLeft: (
       <TouchableOpacity style={{marginLeft:10,justifyContent:'center',alignItems:'center'}} >
          <Icon
             name='user'
             size={20}
             color='#fff'
            />  
            <Text style={{color:'#fff'}}></Text>
         </TouchableOpacity>
     ),
    headerRight: (
      <TouchableOpacity style={{marginRight:10,justifyContent:'center',alignItems:'center'}}
      onPress={()=> navigation.navigate('UserProfile')}
      >
         <Icon
            name='user-circle'
            size={20}
            color='#fff'
           />  
           <Text style={{color:'#fff'}}>Profile</Text>
        </TouchableOpacity>
    ),
});

componentDidMount() {
    this.retriveData();
}
  
retriveData = () =>
{
    this.setState({ isLoading : true }, () =>
{
  fetch('http://zeveninfoway.com/sagarputra/index.php/webservice/getNews',
  {
      method: 'POST',
      headers:
          {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: "master_event_id=1"
          //body: "retailer_id=1"+"& category_id="+this.state.u_n

  }).then((response) => response.json()).then((responseJson) => 
  {
    if(responseJson.status==1)
    {
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(responseJson.result), }, ); 
    }
    else
    {
      alert(responseJson.message);
      this.setState({ isLoading : false });
    }
      
  })
  .catch((error) => {
    console.error(error);
  });
});
}


ListViewItemSeparator = () => {
  return (
    <View
      style={{
        height: .5,
        width: "100%",
        backgroundColor: "#000",
      }} 
    />
  );
}
  

btnClick(data)
{
  this.props.navigation.navigate("DetailNews",{data:data});
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
    if (!this.state.dataSource) {
      return (
        <ImageBackground style={styles.container} source={AppStyles.background_img.source}>
          <View style={styles.top}>         
          <TextLable text="No News Right Now Please Do Visit After Sometime"
                     color={AppStyles.colour.header_text} 
                   />
          </View>
        </ImageBackground>
      );
    }
    else
    {
     return (
      <ImageBackground style={styles.container} source={AppStyles.background_img.source}>
      <View style={styles.top}>
      
          <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) =>{
                  if(count%2==0)
                  {
                    count++;
                    return(
                      <TouchableOpacity style={[styles.viewWrap,{flex:1, flexDirection: 'row'}]}
                                        onPress={this.btnClick.bind(this, rowData)}>
                        <Image source = { rowData.image!="" ? { uri:rowData.image} : require('../images/default.jpg')}
                                style={[styles.imageViewContainer,{marginRight:5}]} />
    
                        <View style={{flex:1, flexDirection: 'column'}}>
                            <TextLable text={rowData.id}
                                      color={AppStyles.colour.News_ID_font} 
                                      />
                            <TextLable text={rowData.title} 
                                      color={AppStyles.colour.News_title_font} 
                                      />
                            <TextLable text={rowData.short_description}
                                      color={AppStyles.colour.News_Description_font} 
                                   /> 
                        </View>
                    </TouchableOpacity>
                    )
                  }
                  else
                  {                    
                    count++;
                    return(
                      <TouchableOpacity style={[styles.viewWrap,{flex:1, flexDirection: 'row'}]}
                      onPress={this.btnClick.bind(this, rowData)}>
  
                        <View style={{flex:1, flexDirection: 'column',marginLeft:5}}>
                            <TextLable text={rowData.id}
                                      color={AppStyles.colour.News_ID_font} 
                                      />
                            <TextLable text={rowData.title} 
                                      color={AppStyles.colour.News_title_font} 
                                      />
                            <TextLable text={rowData.short_description}
                                      color={AppStyles.colour.News_Description_font} 
                                       /> 
                        </View>
                      <Image source = { rowData.image!="" ? { uri:rowData.image} : require('../images/default.jpg')}
                              style={[styles.imageViewContainer,{marginLeft:5}]} />
                  </TouchableOpacity>
                    )
                  }
                }
                }
              />
        
        <ActionButton buttonColor={AppStyles.colour.background}   icon={<Icon style={styles.actionButtonIcon} name='plus' size={25} />} position="center" radiua="200" >
          <ActionButton.Item style={styles.actionButtonstyle}  buttonColor='#9b59b6'  size={50}  title="New Task"
                              onPress={() =>this.props.navigation.navigate("Committee")}
                              >
            <Icon name="users" size={25} style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item style={styles.actionButtonstyle} buttonColor='#1abc9c'  size={50}  title="All Tasks" 
                              onPress={() =>this.props.navigation.navigate("BoatOwnersList")}
                              >
            <Icon name="ship" size={25} style={styles.actionButtonIcon} />
          </ActionButton.Item>

          <ActionButton.Item style={styles.actionButtonstyle} buttonColor='#3498db' size={50} title="Notifications" 
                              onPress={() =>this.props.navigation.navigate("AboutUs")}
                              >
            <Icon name="info-circle" size={25} style={styles.actionButtonIcon} />
          
          </ActionButton.Item>
          <ActionButton.Item style={styles.actionButtonstyle} buttonColor='#1abc9c' size={50}  title="Notifications" 
                                onPress={() =>this.props.navigation.navigate("EventsList")}
                              >
            <Icon name="bullhorn" size={25} style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item style={styles.actionButtonstyle}  buttonColor='#9b59b6'  size={50}  title="All Tasks" onPress={() => {alert("notes tapped!")}}>
            <Icon name="youtube" size={25} style={styles.actionButtonIcon} />
          </ActionButton.Item>
          
        </ActionButton>
        {/* <Button 
          text='Go Back'
          onPress={()=>alert("Hii")}
        /> */}
        </View>
     </ImageBackground>
     );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top:{
    flex: 1,
    padding:5,
    justifyContent:'center',
    backgroundColor:AppStyles.colour.top_View,
},
imageViewContainer: {
  width: 100,
  height:100,
  resizeMode:'cover',
  borderRadius : 10
  },
  viewWrap:{
    margin:2,
    borderRadius:10,
    borderWidth:1,
    backgroundColor:'rgba(50,0,0,0.2)',
//    borderColor:'rgba(0,0,0,0.4)',
    borderColor: AppStyles.colour.border_color

},
btnView:{
  justifyContent:'center',
  height:'25%',
  marginBottom:4,
  marginLeft:4,
  marginRight:4,
  flexDirection:'row'
},
SubmitButtonStyle: {
  backgroundColor:'#2980b6',
  marginLeft:2,
  marginRight:2,
  borderRadius:10,
  borderWidth: 1,
  borderColor: '#1b5478',
  justifyContent:'center',
},
buttonText:{
  color: '#fff',
  textAlign:'center',
  fontWeight: '700'
},
actionButtonIcon: {
  color: 'white',
},
actionButtonstyle:
{
  height:100,
  width:100,
  justifyContent:'center',
  alignItems:'center',
}
});
