import React from 'react';
import {View,Image} from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,Fab , Card, CardItem,Thumbnail} from 'native-base';
import {ImageBackground,StatusBar,StyleSheet} from 'react-native'
import {H3} from 'native-base'
import {AuthService} from '../../services/auth'

export class Home extends React.Component {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
          username:params.username || "unknown",
          email:params.email || "unknown",
          bloodtype: params.bloodtype || "?",
          auth_service: new AuthService()
        };
        
    }      
    render() {
        const self = this;
        return (   
            
        
      <Container>

        <ImageBackground style={styles.container}
        source={require('../../doc.jpg')}>

          <StatusBar
          backgroundColor={'transparent'}
          barStyle="light-content"
          translucent
        />
        <Header style={{backgroundColor:'transparent'}} noShadow={true} androidStatusBarColor={'transparent'}/>
        </ImageBackground>
        <View style={{flex:0.75,backgroundColor:'#f5f5f5'}}>
        
          <Text style={{margin:11,color:'#212121',fontFamily:'foundation'}}>         
           welcome , {this.state.username}!</Text>

         <Card>
            <CardItem>
              <Left>
                <Thumbnail source={require('../../report.png')} />
                <Body>
                  <Text>Guidlines</Text>
                  <Text note>Guidlines is a good start before your first donation</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>


          <Card>
            <CardItem  button onPress={() => {this.props.navigation.navigate('Search')}}>
              <Left>
                <Thumbnail source={require('../../heart.png')} />
                <Body>
                  <Text>Search and Donate</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>



          <Card >
            <CardItem button onPress={() => {this.props.navigation.navigate('Profile',{username: this.state.username,email: this.state.email,bloodtype:this.state.bloodtype})}}>
              <Left>
                <Thumbnail source={require('../../prof.png')} />
                <Body>
                  <Text>My Profile</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>


         <Card>
            <CardItem>
              <Left>
                <Thumbnail source={require('../../hos.png')} />
                <Body>
                  <Text>I'm a hospital owner/authoritive</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>





        
        </View>

          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{marginTop:115 ,elevation:3}}
            style={{ backgroundColor: '#1976D2' }}
            position="topRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Thumbnail  source={require('../../blood_icon.png')}></Thumbnail> 
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
      </Container>

        )

    }
    
}
const styles = StyleSheet.create({
  container: {
    flex: .25,
  }
})