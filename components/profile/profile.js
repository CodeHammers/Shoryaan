import React from 'react';
import {View,Image} from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,Fab , Card, CardItem,Thumbnail} from 'native-base';
import {ImageBackground,StatusBar,StyleSheet} from 'react-native'
import {H3} from 'native-base'
import {AuthService} from '../../services/auth'


export class Profile extends React.Component {
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

                <View style={styles.container} >
        
                <StatusBar
                backgroundColor={'transparent'}
                barStyle="light-content"
                translucent
                />
                <Header style={{backgroundColor:'transparent'}} noShadow={true} androidStatusBarColor={'transparent'}/>

                 <Thumbnail round source={require('../../hos.png')} />
                    <Text style={{color:'white'}}> Kareem Emad</Text>
                    <Text style={{color:'white'}}>
                    
                    <Icon name='md-pin' color={'white'} />
                    Cairo,Egypt
                    </Text>

                </View>
                <View style={{flex:0.65,backgroundColor:'#f5f5f5'}}>
                    <Card>
                        <CardItem>
                        <Left>
                            <Body>
                            <Text>User Name</Text>
                            <Text note> Kareem Emad </Text>
                            </Body>
                        </Left>
                        <Right>
                            <Button transparent >
                            <Text>Edit</Text>
                            </Button>
                        </Right>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                        <Left>
                            <Body>
                            <Text>E-mail</Text>
                            <Text note> kareememad400@gmail.com </Text>

                            </Body>
                        </Left>
                        <Right>
                            <Button transparent >
                            <Text>Edit</Text>
                            </Button>
                        </Right>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                        <Left>
                            <Body>
                            <Text>Blood Type</Text>
                            <Text note> O+ </Text>

                            </Body>
                        </Left>
                        <Right>
                            <Button transparent >
                            <Text>Edit</Text>
                            </Button>
                        </Right>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem>
                        <Left>
                            <Body>
                            <Text>Password</Text>
                            <Text note>Filtered </Text>

                            </Body>
                        </Left>
                        <Right>
                            <Button transparent >
                            <Text>Edit</Text>
                            </Button>
                        </Right>
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
