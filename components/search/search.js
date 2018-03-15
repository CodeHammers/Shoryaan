import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content, Text,Input,Item } from 'native-base';
import {ImageBackground,StatusBar,StyleSheet,View,} from 'react-native'

export  class Search extends Component {
  render() {
    return (
      <Container>
        <StatusBar
          backgroundColor={'#C2185B'}
          barStyle="light-content"
          translucent={false}
        />
        <Header searchBar rounded androidStatusBarColor={'#C2185B'} backgroundColor={'#E91E63'} style={{backgroundColor:'#E91E63'}}>
    
        <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Segment style={{backgroundColor:'transparent'}}>
              <Button first active><Text>search</Text></Button>
              <Button last ><Text>Map</Text></Button>
            </Segment>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="search" />
            </Button>
          </Right>

        </Header>
        <View>

          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>

        </View>
      </Container>
    );
  }
}