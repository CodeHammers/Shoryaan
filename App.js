import React, { Component } from 'react';
import {
  Platform
} from 'react-native';
import {Login} from './components/login/login'
import {Home} from './components/home/home'

import {ImageBackground,StatusBar,StyleSheet} from 'react-native'
import {StackNavigator} from 'react-navigation'
import { Root } from "native-base";

/*
################################################################################
|--------------------------Navigation Routing----------------------------------|
################################################################################
*/
const RootStack = StackNavigator({
  Login: {
    screen: Login,
  },
  Home:{
    screen: Home
  },
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
  initialRouteName: 'Home',
},
);


/*
################################################################################
|----------------------Application Root Component------------------------------|
################################################################################
*/
export default class App extends React.Component {

  render() {
    return (

        <Root>
   
          <RootStack />
        </Root>
    )
  }
}


/*
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
*/