import React from 'react';
import { View ,TextInput,ActivityIndicator,ImageBackground,StyleSheet,StatusBar,AsyncStorage} from 'react-native';
import { 
    Container, Header, Content, Form, Item, Input, sLabel ,Label,Icon,Button,Text,Card, CardItem,  Footer, FooterTab, Picker,Toast,Thumbnail,Badge} 
    from 'native-base';

import {AuthService} from '../../services/auth'
import {ValidateService} from '../../services/validate'


export class Register extends React.Component {
  constructor(props) {
    super(props);
    const navigate = this.props.nv
    const self = this.props.self
    this.state = {
      password: '',
      username:'',
      email:'',
      show_loader:false,
      access_token: null,
      valid_pass: undefined,
      valid_username: undefined,
      valid_email: undefined,
      valid_state: 0,
      auth_service: new AuthService(this),
      v_service: new ValidateService(this),
      navigate: navigate,
      self: self
    };
    
    
  }

  validate_username(un=false){
    this.state.v_service.validate_username(un)
  }
  validate_password(pass=false){
    this.state.v_service.validate_password(pass)
  }
  validate_email(em){
    this.state.v_service.validate_email(em)
  }

  /**
   * sends a post request to /auth/signup with             
   * user data to create a new account if user does not                   
   * exist,if created,stores token recieved for           
   * future communication with server on user's behalf                                        
   * **********************************************************
   */

  register(){
    this.state.auth_service.register()
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
    return (
 
    
       <View style={{alignItems:'center',alignContent:'space-between'}}>
   
                <Form style={{marginBottom:15}}>
                    <Item style={{width:'100%'}}>
                      <Icon style={{color:'red'}}   active name='person' />
                      <Input    placeholder='username'
                      onChangeText={(text) => {this.setState({username: text});this.validate_username(text)} }
                      />
                      {this.state.valid_username ==true&&
                        (
                          <Icon style={{color:'green'}}  name='checkmark-circle' />
                        )
                      }
                      {this.state.valid_username==false &&
                        (
                          <Icon style={{color:'red'}}  name='close-circle' />
                        )
                      }
                    </Item>
                              
                
                        <Item style={{width:'100%'}}>
                        <Icon style={{color:'red'}}   active name='mail' />
                        <Input  placeholder='email'
                        onChangeText={(text) =>{ this.setState({email: text});this.validate_email(text)}}
                        keyboardType='email-address'
                        />

                       {this.state.valid_email ==true&&
                        (
                          <Icon style={{color:'green'}}  name='checkmark-circle' />
                        )
                      }
                      {this.state.valid_email==false &&
                        (
                          <Icon style={{color:'red'}}  name='close-circle' />
                        )
                      }
                      </Item>
                    
                  

                  
                    <Item style={{width:'100%'}}>
                      <Icon style={{color:'red'}}   active name='key' />
                      <Input   
                      secureTextEntry={true} placeholder='password'
                      onChangeText={(text) => {this.setState({password: text});this.validate_password(text)}  }
                      />
                      {this.state.valid_pass ==true&&
                        (
                          <Icon style={{color:'green'}}  name='checkmark-circle' />
                        )
                      }
                      {this.state.valid_pass==false &&
                        (
                          <Icon style={{color:'red'}}  name='close-circle' />
                        )
                      }
                    </Item>
  



                </Form>

             <View>
               {this.state.valid_state==1 && (
                  <Badge   style={{backgroundColor:'#F44336',opacity:.8}}>
                  <Text  style={{color:'white'}} note>Email is malformed
                  </Text>
                </Badge>
               )}
               {this.state.valid_state==2 && (
                  <Badge   style={{backgroundColor:'#F44336',opacity:.8}}>
                  <Text  style={{color:'white'}} note>username: invalid characters
                  </Text>
                </Badge>
               )}
              {this.state.valid_state==3 && (
                  <Badge   style={{backgroundColor:'#F44336',opacity:.8}}>
                  <Text  style={{color:'white'}} note>password too short: min 8 characters
                  </Text>
                </Badge>
               )}
           
              
              </View>
                <Button
                 style={{marginTop:21,marginBottom:21,backgroundColor:'#F44336'}}
                 block rounded  primary disabled={this.state.show_loader} iconLeft
                 onPress={ (dull)=>{ this.setState({show_loader:true});this.register()} }

                >

                {this.state.show_loader && (
                 <ActivityIndicator size="large" color="#fff" />
                )            
                }
            
                {
                    !this.state.show_loader &&
                    <Text >Register </Text>
                }
         
                </Button>
        
 
        
      </View>


    );
  }
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
   
    }
  });
  


