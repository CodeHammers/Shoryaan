import React from 'react';
import { View ,TextInput,ActivityIndicator,ImageBackground,StyleSheet,StatusBar,AsyncStorage} from 'react-native';
import { 
    Container, Header, Content, Form, Item, Input, sLabel ,Label,Icon,Button,Text,Card, CardItem,  Footer, FooterTab, Picker,Toast} 
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
      selected2:undefined,
      register_or_login_view: false,
      access_token: null,
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
  validateToken(){
    body =  JSON.stringify({
      access_token: this.state.access_token
    })
    this.state.auth_service.post(body,'/auth/me')
      //.then((response) =>{ return response.json()})
      .then((response) => {
        if(response.status!=200){
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

            }
          )
          //valid token
          this.showToast('Already logged in! moving you to home','Good')
  
        }
      })
      .catch((error) => {
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
    body =  JSON.stringify({
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    })
    this.state.auth_service.post(body,'/auth/login')
      .then((response) =>{ return response.json()})
      .then((response) => {
        if(this.state.auth_service.handleToken(response)){
          this.showToast('Logged in Successfully','Cool')
          this.props.navigation.navigate('Home', {
            username: this.state.username,
            email: this.state.email,
          })

        }
        else{
          this.showToast(response.message||"something went wrong,try again","Okay")
        }
        this.setState({show_loader:false})
        //this.setState({data: responseJson.message})
      })
      .catch((error) => {
        alert("Cannot Connect to Server")
        console.error(error);
        this.setState({show_loader:false})
      });
  }


  /**
   * sends a post request to /auth/signup with             
   * user data to create a new account if user does not                   
   * exist,if created,stores token recieved for           
   * future communication with server on user's behalf                                        
   * **********************************************************
   */

  register(){
    body = JSON.stringify({
      email: this.state.email,
      username: this.state.username,
      bloodType: this.state.selected2,
      password: this.state.password,
    })

    this.state.auth_service.post(body,'/auth/signup')
      .then((response) => {return response.json()})
      .then((response) => {

        if(this.state.auth_service.handleToken(response)){
          this.showToast("Registered Successfully","Great")
          this.props.navigation.navigate('Home', {
            username: this.state.username,
            email: this.state.email,
          })

        }
        else{
          this.showToast(response.message||"something went wrong,try again","Okay")
        }
        this.setState({show_loader:false})
      })
      .catch((error) => {
        alert("Cannot Connect to Server")
        console.error(error);
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

        <Container style={{opacity:.5,backgroundColor:'#E91E63'}}>
        <StatusBar
          backgroundColor={'transparent'}
          barStyle="light-content"
          translucent
        />
            <Content>
                

                
                <Form style={{margin:15}}>
             
                    
                    <Item floatingLabel  style={{width:'100%'}}>
                    <Label  style={{fontFamily:'Foundation',color:'white'}}>username</Label>
                    <Input 
                    style={{color:'white'}}
                        onChangeText={(text) => this.setState({username: text})}
                    />
                    
                    </Item>
                  {
                    this.state.register_or_login_view    &&
                    <Item floatingLabel   style={{width:'100%'}}>
                    <Label style={{fontFamily:'Foundation',color:'white'}}>Email </Label>
                    <Input
                    style={{color:'white'}}
                      onChangeText={(text) => this.setState({email: text})}
                    />
                    </Item>
                    
                  }

                    
                    <Item floatingLabel  style={{width:'100%'}}>
                    <Label  style={{fontFamily:'Foundation',color:'white'}}>Password</Label>
                    <Input 
                    secureTextEntry={true}
                    style={{color:'white'}}
                        onChangeText={(text) => this.setState({password: text})}
                    />
                    
                    </Item>
  



                </Form>


                {
                    this.state.register_or_login_view    &&
                    <Picker padder
                    style={{marginLeft:21,color:'white',marginRight:21}}
                      mode="dropdown"
                        placeholder="Blood Type"
                        note={false}
                        selectedValue={this.state.selected2}
                        onValueChange={this.onBloodTypeChanged.bind(this)}
                      >
                        <Item label="A+"  style={{fontFamily:'Foundation'}} value="A+" />
                        <Item label="A"  style={{fontFamily:'Foundation'}} value="A" />
                        <Item label="AB"  style={{fontFamily:'Foundation'}} value="AB" />
                        <Item label="O"  style={{fontFamily:'Foundation'}} value="O" />
                        <Item label="O+"  style={{fontFamily:'Foundation'}} value="O+" />
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
  


