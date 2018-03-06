import React from 'react';
import { View ,TextInput,ActivityIndicator} from 'react-native';
import { Container, Header, Content, Form, Item, Input, sLabel ,Label,Icon,Button,Text} from 'native-base';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {password: '',username:'',login_b:false};
  }
  render() {
    return (
        <Container style={{backgroundColor:'white'}}>

            <Content>
                
                <Form style={{margin:15}}>
                    <Item floatingLabel  success={true} >
                    <Label>Username </Label>
                    <Input
                      onChangeText={(text) => this.setState({username: text})}
                    />
                    </Item>
                    
                    <Item floatingLabel error={true} >
                    <Label>Password</Label>
                    <Input 
                        onChangeText={(text) => this.setState({password: text})}
                    />
                    
                    </Item>
                </Form>
                <Button style={{margin:21}}
                 block rounded bordered primary disabled={this.state.login_b} iconLeft
                 onPress={ (dull)=>{this.setState({login_b: true})} }
                >

                {this.state.login_b && (
                 <ActivityIndicator size="large" color="#0000ff" />
                )            
                }
                {
                    !this.state.login_b    &&
                    <Icon name='people' />
                }
                {
                    !this.state.login_b &&
                    <Text> Login </Text>
                }
         
                </Button>
                <Text style={{padding: 10, fontSize: 42}}>
                 {this.state.password.split(' ').map((word) => word && '🍕').join(' ')}
                </Text>

            </Content>
        </Container>
    );
  }
}
