import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
  ListView,
  Image,
  Text,
  ActivityIndicator,
  ScrollView,
  View
} from 'react-native';
import Button from '../components/button';
import TextLable from '../components/text';
import AppStyles from '../constants/AppStyles';


export default class DetailNews extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = ({navigation }) => ({
    title: "Detail News",
    headerTitleStyle:{
      alignSelf:'center',
      textAlign: 'center',
      flex: 1,
    },
    headerRight: (
      <Button
        text="Home"
        onPress={navigation.getParam('handleRightBtn')}
        color={AppStyles.colour.background}
      />
    ),
});

componentDidMount() {
  this.props.navigation.setParams({ handleRightBtn: this._handleRightBtn });
}

_handleRightBtn = () => {
    this.props.navigation.goBack();
};

  render() {   
    const { navigation } = this.props;
    const newsData = navigation.getParam('data');

     return (

        <View style={styles.container}  >
            <View style={styles.top}>
             
                  <ImageBackground source = { newsData.image!="" ? { uri:newsData.image} : require('../images/default.jpg')}
                              style={styles.newsimage} >
                   <View style={styles.viewDate}>
                        <TextLable text={newsData.date}
                              color={AppStyles.colour.News_title_font}
                              marginLeft={5}
                              fontSize={12}
                              width='33%'
                            />
                        <TextLable text={newsData.postby}
                          color={AppStyles.colour.textinput_font}
                          textAlign='center'
                          fontSize={12}
                          width='33%'
                          backgroundColor={AppStyles.colour.News_title_font}
                        />
                        <TextLable text={newsData.time}
                          color={AppStyles.colour.News_title_font}
                          textAlign='right'
                          fontSize={12}
                          width='31%'
                          marginRight={5}
                        />
                
                </View>
                  </ImageBackground>  
                 
                
                  <View style={[styles.roundedView,{margin:5}]}>
                    <TextLable text={newsData.title}
                              textAlign='center'
                              fontSize={20}
                              color={AppStyles.colour.News_title_font} 
                              />
                    <View style={{backgroundColor:AppStyles.colour.textinput_font,height:0.5}}></View>
                    <TextLable text={newsData.short_description}
                              margin={5}
                              color={AppStyles.colour.textinput_font}
                        />
                  </View>
                  <View style={[styles.roundedView,{flex:1,flexDirection: 'column',margin:5}]}>

                  <View style={{margin:10}}>
                  <ScrollView showsVerticalScrollIndicator={false} >
                    <TextLable text={newsData.long_description}
                              margin={5}
                          color={AppStyles.colour.font}
                      />
                  </ScrollView>

                  </View>
                </View>
            </View>
        </View>
     );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width:null,
  },
  top:{
    flex: 1,
    backgroundColor:AppStyles.colour.top_View,
  },
  roundedView:{
    margin:2,
    borderRadius:10,
    borderWidth:1,
    backgroundColor:'rgba(0,0,0,0.2)',
//    borderColor:'rgba(0,0,0,0.4)',
    borderColor: AppStyles.colour.border_color
},
  viewDate:{
    backgroundColor:'rgba(0,0,0,0.7)',
    flexDirection:'row',
    borderRadius:3,
    marginLeft:5,
    marginRight:5
  },
  newsimage:{
    width:null,
    height:'30%',
    borderRadius:10,     
  },
});
