import React from 'react';
import { View ,TextInput,ActivityIndicator,ImageBackground,StyleSheet,StatusBar} from 'react-native';
import { 
    Container, Header, Content, Form, Item, Input, sLabel ,Label,Icon,Button,Text,Card, CardItem,  Footer, FooterTab, Picker,} 
    from 'native-base';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {password: '',username:'',login_b:false,data: [{title:"no data yet"}],selected2:undefined,reg_v: false};
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
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
                    <Item floatingLabel   style={{width:'100%'}}>
                    <Label style={{color:'white'}}>Username </Label>
                    <Input
                    style={{color:'white'}}
                      onChangeText={(text) => this.setState({username: text})}
                    />
                    

                    </Item>

                  {
                    this.state.reg_v    &&
                    <Item floatingLabel  style={{width:'100%'}}>
                    <Label  style={{color:'white'}}>Email</Label>
                    <Input 
                    style={{color:'white'}}
                        onChangeText={(text) => this.setState({password: text})}
                    />
                    
                    </Item>
                    }

                    
                    <Item floatingLabel  style={{width:'100%'}}>
                    <Label  style={{color:'white'}}>Password</Label>
                    <Input 
                    style={{color:'white'}}
                        onChangeText={(text) => this.setState({password: text})}
                    />
                    
                    </Item>
  



                </Form>


                {
                    this.state.reg_v    &&
                    <Picker padder
                    style={{marginLeft:21,color:'white',marginRight:21}}
                      mode="dropdown"
                        placeholder="Blood Type"
                        note={false}
                        selectedValue={this.state.selected2}
                        onValueChange={this.onValueChange2.bind(this)}
                      >
                        <Item label="A+"  style={{fontFamily:'Foundation'}} value="key0" />
                        <Item label="A"  style={{fontFamily:'Foundation'}} value="key1" />
                        <Item label="AB"  style={{fontFamily:'Foundation'}} value="key2" />
                        <Item label="O"  style={{fontFamily:'Foundation'}} value="key3" />
                        <Item label="O+"  style={{fontFamily:'Foundation'}} value="key4" />
                    </Picker>
                }




                <Button
                 style={{margin:21,backgroundColor:'white'}}
                 block rounded bordered primary disabled={this.state.login_b} iconLeft
                 onPress={ (dull)=>{ this.setState({login_b:true})} }

                >

                {this.state.login_b && (
                 <ActivityIndicator size="large" color="#0000ff" />
                )            
                }
                {
                    !this.state.login_b    &&
                    <Icon name={ !this.state.reg_v ? 'person' : 'navigate'} />
                }
                {
                    !this.state.login_b &&
                    <Text> { !this.state.reg_v ? 'Login' : 'Register'} </Text>
                }
         
                </Button>
          
                
            

            </Content>
            <Footer>
          <FooterTab>
            
            <Button 
              onPress={ (dull)=>{ this.setState({reg_v:true})} }
              active ={this.state.reg_v}

            >
              <Icon  name="navigate" />
              <Text>Register</Text>
            </Button>
            <Button active ={!this.state.reg_v}
            onPress={ (dull)=>{ this.setState({reg_v:false})} }

            
            >
              <Icon active name="person" />
              <Text>Login</Text>
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
   
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });
  


