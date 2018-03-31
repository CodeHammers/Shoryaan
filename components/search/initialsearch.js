import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Title, Button, Icon, Tabs, Tab, Item, Input, Text } from 'native-base';
import { StatusBar, StyleSheet, View, TextInput } from 'react-native'

import { Search } from './search'

export  class InitialSearch extends Component {
  render() {
    return (
      <Container>

        <StatusBar translucent={false} style = {styles.statusBar} barStyle = "light-content"/>

        <Header style={styles.header} hasTabs noShadow =  {true}  androidStatusBarColor={'#D32F2F'}>
          <Left style = {{flex: 1}}>
            <Button transparent>
              <Icon onPress={() => this.props.navigation.goBack()} name='arrow-back' />
            </Button>
          </Left>

          <Body style = {styles.title}>
            <Title> Search </Title>
          </Body>

          <Right style = {{flex: 1}}>
          </Right>
        </Header>

        <Tabs  initialPage={0}>
          <Tab tabStyle = {styles.inactiveTabStyle} textStyle = {styles.inactiveTabTextStyle} 
              activeTabStyle = {styles.activeTabStyle} activeTextStyle = {styles.activeTabTextStyle} heading="Search">
              <Search/>
          </Tab>

          <Tab tabStyle = {styles.inactiveTabStyle} textStyle = {styles.inactiveTabTextStyle} 
              activeTabStyle = {styles.activeTabStyle} activeTextStyle = {styles.activeTabTextStyle} heading="Map">
          </Tab>
        </Tabs>

      </Container>
    );
  }
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F44336',
    height: 50
  },

  title:{
    flex: 1,  
    justifyContent: 'center', 
    alignItems: 'center'
  },

  statusBar: {
    backgroundColor: '#D32F2F'
  },

  inactiveTabStyle:{
      backgroundColor: '#F44336'
  },

  inactiveTabTextStyle:{
      color: '#FFFF'
  },

  activeTabStyle:{
      backgroundColor: '#F44336'
  },

  activeTabTextStyle:{
      color: '#FFFF'
  },
})