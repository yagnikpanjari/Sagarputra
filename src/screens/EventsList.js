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



export default class EventsList extends Component {

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
    title: "Events",
    headerTitleStyle:{
      alignSelf:'center',
      textAlign: 'center',
      flex: 1,
    },
    // headerLeft: (
    //   <TouchableOpacity style={{marginLeft:10,justifyContent:'center',alignItems:'center'}} >
    //      <Icon
    //         name='sign-out'
    //         size={20}
    //         color='#fff'
    //        />  
    //        <Text style={{color:'#fff'}}>Sign Out</Text>
    //     </TouchableOpacity>
    // ),
    headerRight: (
      <TouchableOpacity style={{marginRight:10,justifyContent:'center',alignItems:'center'}}
      onPress={()=> alert("Go To Home")}
      >
         <Icon
            name='home'
            size={20}
            color='#fff'
           />  
           <Text style={{color:'#fff'}}>Home</Text>
        </TouchableOpacity>
    ),
});


  componentDidMount() {
      this.retriveData();
  }
  

  btnClick(data)
  {
    this.props.navigation.navigate("DetailNews",{data:data});
  }


  retriveData = () =>
  {
      this.setState({ isLoading : true }, () =>
  {
    fetch('http://zeveninfoway.com/sagarputra/index.php/webservice/eventList',
    {
        method: 'POST',
        headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            //body: "master_event_id=1"
           
            body: "master_event_id=1"+"& user_id=1"


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

// btnClick(data)
// {
//   this.props.navigation.navigate("DetailNews",{data:data});
// }

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
                       // {alert(JSON.stringify(rowData.images[0]))}
                    return(
                      <TouchableOpacity style={[styles.viewWrap,{flex:1, flexDirection: 'row'}]}
                                        onPress={this.btnClick.bind(this, rowData)}
                                        >
                          <Image source = { JSON.stringify(rowData.images[0])!=null ? { uri:rowData.images[0].image} : require('../images/default.jpg')}
                                style={[styles.imageViewContainer,{marginRight:5}]} 
                               />  
                                {/* {alert(JSON.stringify(rowData.images[0].image) )} */}
                        {/* <Image source = {require('../images/default.jpg')}
                                style={[styles.imageViewContainer,{marginRight:5}]} />  */}
                        <View style={{flex:1, flexDirection: 'column'}}>
                            <TextLable text={rowData.event_name}
                                      color={AppStyles.colour.News_ID_font} 
                                      />
                            <TextLable text={rowData.event_description +" - "+ rowData.coordinator} 
                                      color={AppStyles.colour.News_title_font} 
                                      />
                            <TextLable text={rowData.event_date}
                                      color={AppStyles.colour.News_Description_font} 
                                   /> 
                        </View>
                    </TouchableOpacity>
                    )
                  }           
                }
              />
        
      
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
