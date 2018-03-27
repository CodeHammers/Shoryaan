import React from 'react';
import { View ,TextInput,ActivityIndicator,ImageBackground,StyleSheet,StatusBar,AsyncStorage} from 'react-native';
import { 
    Container, Header, Content, Form, Item, Input, sLabel ,Label,Icon,Button,Text,Card, CardItem,  Footer, FooterTab, Picker,Toast,Thumbnail,Badge} 
    from 'native-base';

import {AuthService} from '../../services/auth'


export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      username:'',
      email:'',
      show_loader:false,
      selected2:'?',
      register_or_login_view: false,
      access_token: null,
      valid_pass: undefined,
      valid_username: undefined,
      valid_email: undefined,
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
              bloodtype: res_json.bloodtype
              
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
   * sends a post request to /auth/login with               
   * user data to check if user exists/authenticated                     
   * if authenticated,stores token recieved for             
   * future communication with server on user's behalf                                         
   * **********************************************************
   */


  login() {
    if( true!=this.state.valid_pass || this.state.valid_username!=true){
      this.showToast("Errors Detected in form ","I'll check")
      this.setState({show_loader:false})
      return;
    }
    body =  JSON.stringify({
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    })
    this.state.auth_service.post(body,'/auth/login')
      .then((response) =>{ 
        if(response.status!=200)
          return null;
        
        return response.json()})
      .then((response) => {
        if(response==null){
          this.showToast("invalid credentials","Okay")
          this.setState({show_loader:false})
          return ;
        }
        if( this.state.auth_service.handleToken(response)){
          this.showToast('Logged in Successfully','Great')
          this.validateToken(true)
          /*
          this.props.navigation.navigate('Home', {
            username: this.state.username,
            email: this.state.email,
          })
          */

        }
        else{
          this.showToast(response.message||"something went wrong,try again","Okay")
        }
        this.setState({show_loader:false})
        //this.setState({data: responseJson.message})
      })
      .catch((error) => {
        alert("Could not connect to server")
        this.setState({show_loader:false})
      });
  }


  validate_username(email){
    el =this.state.username.length
    return (el >=2 || this.setState({valid_username:false}) ) && this.setState({valid_username:true})
  }
  validate_password(){
    
    pl =this.state.password.length
     return (pl >=8 || this.setState({valid_pass:false}) ) && this.setState({valid_pass:true})
  }
  validate_email(){
    return ( this.validateEmail(this.state.email) || this.setState({valid_email:false}) ) && this.setState({valid_email:true})
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


  /**
   * sends a post request to /auth/signup with             
   * user data to create a new account if user does not                   
   * exist,if created,stores token recieved for           
   * future communication with server on user's behalf                                        
   * **********************************************************
   */

  register(){
    if(true!=this.state.valid_email || true!=this.state.valid_pass || this.state.valid_username!=true){
      this.showToast("Errors Detected in form ","I'll check")
      this.setState({show_loader:false})
      return;
    }
    body = JSON.stringify({
      email: this.state.email,
      username: this.state.username,
      bloodtype: this.state.selected2,
      password: this.state.password,
    })

    this.state.auth_service.post(body,'/auth/signup')
      .then((response) => {
        if(response.status!=200){
         return null;
        }
        
        return response.json()
      })
      .then((response) => {
        if(response==null){
          this.showToast("User Exists","Hmmm")
          this.setState({show_loader:false})
          return ;
        }
        if(this.state.auth_service.handleToken(response)){
          this.showToast("Registered Successfully","Great")
          this.props.navigation.navigate('Home', {
            username: this.state.username,
            email: this.state.email,
            bloodtype: this.state.selected2
          })

        }
        else{
          this.showToast(response.message||"something went wrong,try again","Okay")
        }
        this.setState({show_loader:false})
      })
      .catch((error) => {
        alert("Cannot Connect to Server")
        this.setState({show_loader:false})
      });


  }


  /**
   *  calls login/register based on the current view                                
   * **********************************************************
   */
  handleClick(){
    if(!this.state.register_or_login_view){
      //login
      this.login()
    } 
    else{
      //sign up
      this.register()
    } 
  }
 /**
   * keeps track of blood type current value                                       
   * **********************************************************
   */
  onBloodTypeChanged(value) {
    this.setState({
      selected2: value
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
    

    return (
        <ImageBackground style={styles.container}
        source={require('../../tog-help.jpg')}>
          <View>
                <StatusBar
                    backgroundColor={'transparent'}
                    barStyle="light-content"
                    translucent
                  />

        
            </View>
        <Container style={{backgroundColor:'white',opacity:.85, flex: 1,margin:15}}>
 
            <Content >
 
              <View  style={{alignItems:'center',flex: 1,padding:22}}>
   
                <Thumbnail round source={require('../../logo.jpg')} />
                    <Text style={{color:'red'}}> Shoryaan</Text>
                <Form style={{margin:15}}>
                    <Item style={{width:'100%'}}>
                      <Icon style={{color:'red'}}   active name='person' />
                      <Input    placeholder='username'
                      onChangeText={(text) => {this.setState({username: text});this.validate_username()} }
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
                              
                  {
                    this.state.register_or_login_view    &&
                        <Item style={{width:'100%'}}>
                        <Icon style={{color:'red'}}   active name='mail' />
                        <Input  placeholder='email'
                        onChangeText={(text) =>{ this.setState({email: text});this.validate_email()}}
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
                    
                  }

                  
                    <Item style={{width:'100%'}}>
                      <Icon style={{color:'red'}}   active name='key' />
                      <Input   
                      secureTextEntry={true} placeholder='password'
                      onChangeText={(text) => {this.setState({password: text});this.validate_password()}  }
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






                <Button
                 style={{marginTop:21,marginBottom:21,backgroundColor:'#F44336'}}
                 block rounded  primary disabled={this.state.show_loader} iconLeft
                 onPress={ (dull)=>{ this.setState({show_loader:true});this.handleClick()} }

                >

                {this.state.show_loader && (
                 <ActivityIndicator size="large" color="#0000ff" />
                )            
                }
                {
                    !this.state.show_loader    &&
                    <Icon name={ !this.state.register_or_login_view ? 'person' : 'navigate'} />
                }
                {
                    !this.state.show_loader &&
                    <Text style={{fontFamily:'Foundation'}}> { !this.state.register_or_login_view ? 'Login' : 'Register'} </Text>
                }
         
                </Button>
                <Text   onPress={() => this.setState({register_or_login_view:!this.state.register_or_login_view}) } note >
                Already have An Account?<Text style={{color:'red'}}> Login</Text>  </Text>
                <Text numberOfLines={1}  note> ──────────</Text>


                <View style={{flexDirection:'row'}}>

                  <Button
                    style={{marginTop:21,marginBottom:21}}
                      primary disabled={this.state.show_loader} iconLeft
                    >                       
                        <Icon name='logo-facebook' />
                        <Text style={{fontFamily:'Foundation'}}> Facebook </Text>

            
                    </Button>
                    <Button
                    style={{marginTop:21,marginBottom:21,marginLeft:9,backgroundColor:'#dd4b39'}}
                      primary disabled={this.state.show_loader} iconLeft
                    >                       
                        <Icon name='logo-google' />
                        <Text style={{fontFamily:'Foundation'}}> Gmail </Text>
                      
            
                    </Button>
            

                </View>
                <View>
              <Badge   style={{backgroundColor:'#F44336',opacity:.8}}>
                  <Text  style={{color:'white'}} note>Note: Your Email is malformed

                  </Text>
              </Badge>
              </View>

            </View>

            </Content>
            
      
        </Container>
        </ImageBackground>

    );
  }
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
   
    }
  });
  


