import { AppRegistry } from 'react-native';
import App from './App';

import { YellowBox } from 'react-native';

/*
#########################################################
|----------suppress deprication warnings----------------|
|-https://github.com/facebook/react-native/issues/18175-|
#########################################################
*/
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: Can only update a mounted or mounting component'
  //'Warning: Failed prop type:'
]);

AppRegistry.registerComponent('shoryaan', () => App);
