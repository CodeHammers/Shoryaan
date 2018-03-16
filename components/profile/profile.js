import React from 'react';
import {View,Image} from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,Fab , Card, CardItem,Thumbnail} from 'native-base';
import {ImageBackground,StatusBar,StyleSheet} from 'react-native'
import {H3,Input,Item,Label} from 'native-base'
import {AuthService} from '../../services/auth'


export class Profile extends React.Component {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
          username:params.username || "unknown",
          email:params.email || "unknown",
          bloodtype: params.bloodtype || "unkown",
          auth_service: new AuthService()
        };
        
    } 
   
    render() {
        const self = this;
        return (   
            
        
            <Container>

                <View style={styles.container} >
        
                <StatusBar
                backgroundColor={'transparent'}
                barStyle="light-content"Emad
                translucent
                />
                <Header style={{backgroundColor:'transparent'}} noShadow={true} androidStatusBarColor={'transparent'}/>

                 <Thumbnail round source={require('../../hos.png')} />
                    <Text style={{color:'white'}}> {this.state.username}</Text>
                    <Text style={{color:'white'}}>
                    
                    <Icon name='pin' style={{color:'white'}} />
                    Cairo,Egypt
                    </Text>

                </View>
                <View style={{flex:0.65,backgroundColor:'#f5f5f5'}}>
                    <Card>
                        <CardItem>
                        <Left>
                            <Body>
                            <Text>User Name</Text>
                            <Item>
                                 <Input disabled={true} style={{color:'#888',fontSize:14}}  placeholderTextColor='#999'  placeholder={this.state.username} />
                            </Item>
                            </Body>
                        </Left>
                        <Button transparent Right >
                            <Text>Edit</Text>
                        </Button>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                        <Left>
                            <Body>
                            <Text>E-mail</Text>
                            <Item>
                                 <Input disabled={true} style={{color:'#888',fontSize:14}}  placeholderTextColor='#999'  placeholder={this.state.email} />
                            </Item>
                            </Body>
                        </Left>
                            <Button transparent Right >
                            <Text>Edit</Text>
                            </Button>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                        <Left>
                            <Body>
                            <Text>Blood Type</Text>
                            <Item>
                                 <Input disabled={true} style={{color:'#888',fontSize:14}}  placeholderTextColor='#999'  placeholder={this.state.bloodtype} />
                            </Item>
                            </Body>
                        </Left>
                        <Button transparent Right >
                            <Text>Edit</Text>
                        </Button>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem>
                        <Left>
                            <Body>
                            <Text>Password</Text>
                            <Text note>Protected </Text>

                            </Body>
                        </Left>
                        <Button transparent Right >
                            <Text>Edit</Text>
                        </Button>
                        </CardItem>
                    </Card>


                </View>

            </Container>

        )

    }
    
}


const styles = StyleSheet.create({
  container: {
    flex: .35,
    backgroundColor:'#555',
    alignItems: 'center'
  }
})
