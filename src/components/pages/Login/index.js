import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StatusBar, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';

import Style from '../../../utilities/style';

const CLOSE_BUTTON_SIZE = 27;

class LoginPage extends Component {
  static state = {};

  constructor(props) {
    super(props);

    this.onCloseButtonPress = this.onCloseButtonPress.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        <View style={styles.firstRow}>
          <TouchableOpacity onPress={this.onCloseButtonPress} style={styles.closeButtonWrapper}>
            <Icon name="times" size={CLOSE_BUTTON_SIZE} color="#CCCCDE" style={styles.closeButton} />
          </TouchableOpacity>
          <Text style={styles.titleText}>Wetoo</Text>
        </View>

        <View style={styles.loginFormWrapper}>
          <TextInput style={styles.formInput} keyboardType="email-address" autoCapitalize="none" defaultValue={'123'} />
        </View>

        <Button style={styles.loginButtonText} containerStyle={styles.loginButtonContainer}>登录</Button>
      </View>
    );
  }

  onCloseButtonPress() {
    Actions.pop();
  }

}

const styles = Style.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingTop: 30,
    paddingLeft: 16,
    paddingRight: 16,
  },
  firstRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#329EED',
    marginRight: 25,
    flex: 1,
    textAlign: 'center',
  },
  closeButtonWrapper: {
  },
  closeButton: {
    width: CLOSE_BUTTON_SIZE,
    height: CLOSE_BUTTON_SIZE,
  },

  loginFormWrapper: {
    marginTop: 120,
    marginBottom: 50,
  },
  formInput: {
    borderWidth: 1,
    borderColor: 'red',
    flex: 1,
    height: 30,
    marginBottom: 20,
  },

  loginButtonContainer: {
    height: 40,
    borderRadius: 5,
    backgroundColor: '#73BCF1',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '300',
  }
});


export default LoginPage;
