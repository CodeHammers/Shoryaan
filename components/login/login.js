import React from 'react';
import { View ,TextInput,ActivityIndicator,ImageBackground,StyleSheet,StatusBar,AsyncStorage} from 'react-native';
import { 
    Container, Header, Content, Form, Item, Input, sLabel ,Label,Icon,Button,Text,Card, CardItem,  Footer, FooterTab, Picker,Toast,Thumbnail} 
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
        source={require('../../blood_s.jpg')}>

        <Container style={{opacity:.63,backgroundColor:'#E91E63'}}>
 
            <Content>
 
              <View  style={{alignContent:'center',alignItems:'center',flex: 1}}>
                <View>
                    <StatusBar
                        backgroundColor={'transparent'}
                        barStyle="light-content"
                        translucent
                      />
                    <Header style={{backgroundColor:'transparent'}} noShadow={true} androidStatusBarColor={'transparent'}/>

                    <Thumbnail round source={require('../../gene.png')} />
                    <Text style={{color:'white'}}> Shoryaan</Text>
                </View>
                <Form style={{margin:15}}>
                    <Item style={{width:'100%'}}>
                      <Icon style={{color:'white'}}   active name='person' />
                      <Input style={{color:'white'}}  
                      placeholderTextColor='white' placeholder='username'
                      onChangeText={(text) => {this.setState({username: text});this.validate_username()} }
                      />
                      {this.state.valid_username ==true&&
                        (
                          <Icon style={{color:'#f5f5f5'}}  name='checkmark-circle' />
                        )
                      }
                      {this.state.valid_username==false &&
                        (
                          <Icon style={{color:'#f5f5f5'}}  name='close-circle' />
                        )
                      }
                    </Item>
                              
                  {
                    this.state.register_or_login_view    &&
                        <Item style={{width:'100%'}}>
                        <Icon style={{color:'white'}}   active name='mail' />
                        <Input style={{color:'white'}}  
                        placeholderTextColor='white' placeholder='email'
                        onChangeText={(text) =>{ this.setState({email: text});this.validate_email()}}
                        />

                       {this.state.valid_email ==true&&
                        (
                          <Icon style={{color:'#f5f5f5'}}  name='checkmark-circle' />
                        )
                      }
                      {this.state.valid_email==false &&
                        (
                          <Icon style={{color:'#f5f5f5'}}  name='close-circle' />
                        )
                      }
                      </Item>
                    
                  }

                  
                    <Item style={{width:'100%'}}>
                      <Icon style={{color:'white'}}   active name='key' />
                      <Input style={{color:'white'}}  
                      secureTextEntry={true}
                      placeholderTextColor='white' placeholder='password'
                      onChangeText={(text) => {this.setState({password: text});this.validate_password()}  }
                      />
                      {this.state.valid_pass ==true&&
                        (
                          <Icon style={{color:'#f5f5f5'}}  name='checkmark-circle' />
                        )
                      }
                      {this.state.valid_pass==false &&
                        (
                          <Icon style={{color:'#f5f5f5'}}  name='close-circle' />
                        )
                      }
                    </Item>
  



                </Form>


                {
                    this.state.register_or_login_view    &&
                    <Picker padder
                    style={{color:'white',width:'90%'}}
                      mode="dropdown"
                        note={false}
                        selectedValue={this.state.selected2}
                        onValueChange={this.onBloodTypeChanged.bind(this)}
                      >
                        <Item label='O+'  style={{fontFamily:'Foundation'}} value='O+' />
                        <Item label="O-"  style={{fontFamily:'Foundation'}} value="O-" />
                        <Item label="AB"  style={{fontFamily:'Foundation'}} value="A+" />
                        <Item label="A-"  style={{fontFamily:'Foundation'}} value="A-" />
                        <Item label="B+"  style={{fontFamily:'Foundation'}} value="B+" />
                        <Item label="B-"  style={{fontFamily:'Foundation'}} value="B-" />
                        <Item label="AB+"  style={{fontFamily:'Foundation'}} value="AB+" />
                        <Item label="AB-"  style={{fontFamily:'Foundation'}} value="AB-" />

                        <Item label="?"  style={{fontFamily:'Foundation'}} value="?" />
                    </Picker>
                }




                <Button
                 style={{margin:21,backgroundColor:'white',}}
                 block rounded bordered primary disabled={this.state.show_loader} iconLeft
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
          
            </View>

            </Content>
            <Footer>
          <FooterTab>
            
            <Button 
              onPress={ (dull)=>{ this.setState({register_or_login_view:true})} }
              active ={this.state.register_or_login_view}

            >
              <Icon  name="navigate" />
              <Text  style={{fontFamily:'Foundation'}}>Register</Text>
            </Button>
            <Button active ={!this.state.register_or_login_view}
            onPress={ (dull)=>{ this.setState({register_or_login_view:false});} }

            
            >
              <Icon active name="person" />
              <Text  style={{fontFamily:'Foundation'}}>Login</Text>
            </Button>
          </FooterTab>
        </Footer>
      
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
  


