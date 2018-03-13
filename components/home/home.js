import React from 'react';
import {View} from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,Fab } from 'native-base';
import {AuthService} from '../../services/auth'

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username:'',
          email:'',
          access_token: null,
          auth_service: new AuthService()
        };
        
    }      
    render() {
        const self = this;
        return (   
            
        
            <Container>
            <Header
                noShadow={false}
                androidStatusBarColor='#C2185B'
                style={{backgroundColor:'#E91E63',}}
            
            />
            <View style={{ flex: 1 ,backgroundColor:'white'}}>
              <Fab
                style={{backgroundColor:'#536DFE'}}
                active={this.state.active}
                direction="up"
                containerStyle={{ marginTop:-30,elevation:3}}
                style={{ backgroundColor: '#5067FF' }}
                position="topRight"
                onPress={() => this.setState({ active: !this.state.active })}>
                <Icon name="share" />
                <Button style={{ backgroundColor: '#34A34F' }}>
                  <Icon name="logo-whatsapp" />
                </Button>
                <Button style={{ backgroundColor: '#3B5998' }}>
                  <Icon name="logo-facebook" />
                </Button>
                <Button disabled style={{ backgroundColor: '#DD5144' }}>
                  <Icon name="mail" />
                </Button>
              </Fab>
            </View>
          </Container>
        )
    }
}
