/**
 * Wetoo
 * https://github.com/imWildCat/wetoo-react-native
 * @flow
 */

import {
  AppRegistry,
  BackAndroid,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import Wetoo from './src/app';

AppRegistry.registerComponent('Wetoo', () => Wetoo);

BackAndroid.addEventListener('hardwareBackPress', function() {
  return Actions.pop();
});
