import React, {Component} from 'react';
import {View, Text, Platform} from 'react-native';

import KeyboardSpacer from 'react-native-keyboard-spacer';

class CustomKeyboardSpacer extends Component {

  render() {
    if (Platform.OS === 'ios') {
      return <KeyboardSpacer />;
    } else {
      return null;
    }
  }

}

export default CustomKeyboardSpacer;
