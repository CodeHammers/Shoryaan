import React from 'react';
import { View ,TextInput,ActivityIndicator,ImageBackground,StyleSheet,StatusBar,AsyncStorage} from 'react-native';
import { 
    Container, Header, Content, Form, Item, Input, sLabel ,Label,Icon,Button,Text,Card, CardItem,  Footer, FooterTab, Picker,Toast,Thumbnail,Badge} 
    from 'native-base';

import {Register} from './register'
import {Login} from './login'
import {AuthService} from '../../services/auth'


export class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      register_or_login_view: false,
      auth_service: new AuthService()
    };
    this.checkStoredToken() 
  }

  /**
   * Checks if user has a stored token                     
   * if so passes it to validate token                                                                          
   * **********************************************************
   */

  checkStoredToken(){
    
    AsyncStorage.getItem("access_token").then((value) => {
      if(value!=undefined){
        this.setState({access_token:value})
        this.validateToken()
      }
    
  }).done();
  }


  /**
   * sends a post request to /auth/me to check             
   * validity of stored token                                                                                     
   * **********************************************************
   */
  validateToken(no_toast){
    this.setState({show_loader:true})
    body =  JSON.stringify({
      access_token: this.state.access_token
    })
    this.state.auth_service.post(body,'/auth/me')
      //.then((response) =>{ return response.json()})
      .then((response) => {
        if(response.status!=200){
          this.setState({show_loader:false})
          //invalid token
        }
        else{
          response = response.json()
          .then((res_json)=>{
       
            this.props.navigation.navigate('Home', {
              username: res_json.username,
              email: res_json.email,
              bloodtype: res_json.bloodtype,
              gender: res_json.gender
              
            })
            this.setState({show_loader:false})


            }
          )
          //valid token
          if(no_toast!=true)
            this.showToast('Already logged in! moving you to home','Good')
  
        }
      })
      .catch((error) => {
        this.setState({show_loader:false})
        alert("Cannot Connect to Server")
        console.error(error);
      });

  }
   /**
   * create Toast pattern to avoid repeating code                                     
   * **********************************************************
   */
  showToast(msg,btn){
    Toast.show({
      text: msg,
      position: 'bottom',
      buttonText: btn,
      duration: 5000,
      style: {
        backgroundColor: "#212121",
        opacity:0.76
       }
    })
  }


  render() {
    const self = this;
    function nv(s,res_json) {
        s.props.navigation.navigate('Home', {
            bloodtype: res_json.bloodtype,
            username: res_json.username,
            email: res_json.email,
          })
    }   

    return (
        <ImageBackground style={styles.bgImage}
        source={require('../../tog-help.jpg')}>
            <View>
                <StatusBar
                    backgroundColor={'transparent'}
                    barStyle="light-content"
                    translucent
                />
            </View>
            <Container style={styles.container}>
                <Content >
                    <View  style={styles.cc_view}>
                        <Thumbnail round source={require('../../logo.jpg')} />
                        <Text style={styles.red_text}> Shoryaan</Text>
                        {
                            this.state.register_or_login_view ?
                             (<Login self={self} nv={nv} />) :
                              (<Register self={self}  nv={nv} />)
                        }
                        <Text   onPress={() => this.setState({register_or_login_view:!this.state.register_or_login_view}) } note >
                        {!this.state.register_or_login_view ? 'Already have An Account?' : 'No Account Yet?'}
                        <Text style={styles.red_text} note> {!this.state.register_or_login_view ? 'Login' : 'Register'}</Text>  
                        </Text>

                        <Text numberOfLines={1}  note>──────────</Text>
                        <View style={styles.row_view}>
                        <Button
                            style={styles.top_down_margin}
                            primary disabled={this.state.show_loader} iconLeft>                       
                                <Icon name='logo-facebook' />
                                <Text > Facebook </Text>
                            </Button>
                            <Button
                            style={styles.gmail}
                            primary disabled={this.state.show_loader} iconLeft>                       
                                <Icon name='logo-google' />
                                <Text > Gmail </Text>
                            </Button>
                    

                        </View>

                    </View>
                </Content>
            </Container>
        </ImageBackground>

    );
  }
  
}

const styles = StyleSheet.create({
    bgImage:{
        flex:1
    },
    container: {
        backgroundColor:'white',
        opacity:.85,
         flex: 1,
         margin:20
    },
    cc_view: {
        alignItems:'center',
        flex: 1,
        padding:22,
        alignContent:'space-between'
    },
    red_text: {
        color:'red'
    },
    row_view: {
        flexDirection:'row'
    },
    top_down_margin:{
        marginTop:21,
        marginBottom:21
    },
    gmail:{
        marginTop:21,
        marginBottom:21,
        marginLeft:9,
        backgroundColor:'#dd4b39'
    }
  });
  


