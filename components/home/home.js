import React from 'react';
import { Container,Icon, Header, Title , Button, Left, Right, Body, Text,Toast, ActionSheet } from 'native-base';
import {TouchableOpacity,View,Image,StatusBar,StyleSheet,ScrollView} from 'react-native'
import {H3} from 'native-base'
import {AuthService} from '../../services/auth'

var BUTTONS = [
  { text: "Change password", icon: "american-football", iconColor: "#2c8ef4" },
  { text: "Language options", icon: "analytics", iconColor: "#f42ced" },
  { text: "Log out", icon: "aperture", iconColor: "#ea943b" }
];

export class Home extends React.Component {

  static navigationOptions = {
    title: 'Home',
  };
  
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
          username:params.username || "unknown",
          email:params.email || "unknown",
          bloodtype: params.bloodtype || "?",
          gender: params.gender ||  "Male",
          manager: params.hospitalManager,
          name: params.name,
          city: params.city,
          state: params.state,
          dateOfBirth: params.dateOfBirth,
          auth_service: new AuthService(),

          clicked: {}
        };

    }   
    
    navigateToProfile(){
        this.props.navigation.navigate('Profile', {
          username:this.state.username,
          email:this.state.email ,
          state: this.state.state ,
          city: this.state.city ,
          name: this.state.name,
          bloodType: this.state.bloodtype,
          gender: this.state.gender,
          dateOfBirth: this.state.dateOfBirth,
      })
    }

    showUserSettings(){
      ActionSheet.show(
        {
          options: BUTTONS,
          title: "User Settings"
        },
        buttonIndex => {
          if(buttonIndex != undefined || buttonIndex != null){
            if(BUTTONS[buttonIndex].text == "Change password"){
              this.props.navigation.navigate('ChangeUserPassword');
            }
          }
        }
      )
    }


    render() {
        const self = this;
        return (

          <Container>
          <StatusBar translucent={false} style = {styles.statusBar} barStyle = "light-content"/>
 
          <Header style = {styles.header} noShadow =  {true}  androidStatusBarColor={'#D32F2F'}>
              <Left style = {{flex: 1}}>
                  <Button transparent>
                      <Icon name='search' onPress={() => this.props.navigation.navigate('InitialSearch')}/>
                  </Button>
              </Left>
              
              <Body style = {styles.title}>
                  <Title> HOME </Title>
              </Body>
            
              <Right style = {{flex: 1}}>
                  <Button transparent>
                    <Icon name='md-settings' onPress={() => this.showUserSettings()}/>
                  </Button>
              </Right>
          </Header>

          <ScrollView>
            <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => {this.navigateToProfile()}}>
              <Image 
              source={require('../../images/home/i-received-icon.png')} 
              style={styles.ImageIconStyle} 
              />
              <Text style={styles.textbutton}>
                MY PROFILE
              </Text> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Image 
              source={require('../../images/home/12_blood_2.png')} 
              style={styles.ImageIconStyle} 
              />
              <Text style={styles.textbutton}>
                DONATE BLOOD
              </Text> 
            </TouchableOpacity>
            </View>

            <View style={styles.container}>
              <TouchableOpacity style={styles.button}>
                <Image 
                source={require('../../images/home/can-i-give-blood-icon-homepage.png')} 
                style={styles.ImageIconStyle} 
                />
                <Text style={styles.textbutton}>
                  BLOOD DONATION
                </Text> 
                <Text style={styles.textbutton}>
                  GUIDELINES
                </Text> 
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Image 
                source={require('../../images/home/Health_Tests-512.png')} 
                style={styles.ImageIconStyle} 
                />
                <Text style={styles.textbutton}>
                  BLOOD FACTS
                </Text> 
              </TouchableOpacity>
            </View>

            <View style={styles.container}>
              <TouchableOpacity style={styles.button} onPress = {()=>{
                if(this.state.manager){
                  this.props.navigation.navigate('PrivateProfileInfo');
                }
                else{
                  this.props.navigation.navigate('CreateHospital');
                }
              }}>
                  <Image 
                  source={require('../../images/home/hos.png')} 
                  style={styles.ImageIconStyle} 
                  />
                  <Text style={styles.textbutton}>
                    MY HOSPITAL
                  </Text> 
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate('InitialSearch')}}>
                  <Image 
                  source={require('../../images/home/search.png')} 
                  style={styles.ImageIconStyle} 
                  />
                  <Text style={styles.textbutton}>
                    SEARCH
                  </Text> 
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Container>
        )
    }
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  header: {
    backgroundColor: '#F44336',
    height: 50
  },

  statusBar: {
    backgroundColor: '#D32F2F'
  },

  textbutton: {
    color: '#F44336',
    fontSize: 16,
    fontWeight: 'bold'
  },

  title: {
    flex: 1,  
    justifyContent: 'center', 
    alignItems: 'center'
  },

  button: {
    flex: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: '35%',
    height: 210
  },

  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 50,
    width: 50,
    resizeMode : 'stretch',
 },
})