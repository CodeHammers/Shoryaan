import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon ,Title,Button,Fab} from 'native-base';

import {AuthService} from '../../services/auth'


const cards = [
  {
    text: 'Shoryaan',
    name: 'swipe right or left',
    image: require('../../tog-help.jpg'),
    logo: require('../../logo.jpg')
  },
  {
    text: 'Shoryaan',
    name: 'swipe right or left',
    image: require('../../tog-help.jpg'),
    logo: require('../../logo.jpg')
  }
];
export  class Intro extends Component {
  constructor(props){
    super(props)
    this.state = {
      active:false,
      auth_service: new AuthService(this)

    }
    this.state.auth_service.checkStoredToken() 

  }

  render() {
    return (
      <Container>
   
        <View style={{flex:.9}}>
          <DeckSwiper
            dataSource={cards}
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={item.logo} />
                    <Body>
                      <Text>{item.text}</Text>
                      <Text note>a word about us/blood_donation(placeholder Image)</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{  flex: 1 }} source={item.image} />
                </CardItem>
                <CardItem>
                  <Icon name="heart" style={{ color: '#ED4A6A' }} />
                  <Text>{item.name}</Text>
                </CardItem>
              </Card>
            }
          />
            <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ opacity:.92}}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => {this.setState({active:!this.state.active});this.props.navigation.navigate('Auth')}}>
            <Icon name="arrow-forward" />

          </Fab>
        </View>

      </Container>
    );
  }
}