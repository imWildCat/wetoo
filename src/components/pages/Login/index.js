import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StatusBar, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';

import Networking from '../../../utilities/v2_networking';
import Style from '../../../utilities/style';

const CLOSE_BUTTON_SIZE = 27;

class LoginPage extends Component {

  state = {
    username: null,
    password: null,
    isInfoWrong: false,
    isLoading: false,
    errorText: null,
  };

  constructor(props) {
    super(props);

    this.focusPasswordField = this.focusPasswordField.bind(this);
    this.onCloseButtonPress = this.onCloseButtonPress.bind(this);
    this.onSubmitButtonPress = this.onSubmitButtonPress.bind(this);
  }

  render() {
    const { username, password, isInfoWrong, isLoading, errorText } = this.state;

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
          <View style={styles.formInputWrapper}>
            <TextInput placeholder="Email 或 用户名" style={styles.formInput} keyboardType="email-address"
                       ref="usernameField"
                       autoCapitalize="none"
                       autoCorrect={false}
                       returnKeyType="next"
                       onChangeText={(username) => this.setState({ username })}
                       onSubmitEditing={this.focusPasswordField}
                       underlineColorAndroid="#FFFFFF" />
          </View>
          <View style={[styles.formInputWrapper, styles.formInputWrapperForPassword]}>
            <TextInput placeholder="密码" style={styles.formInput} keyboardType="default"
                       ref="passwordField"
                       autoCapitalize="none" secureTextEntry={true}
                       onChangeText={(password) => this.setState({ password })}
                       onSubmitEditing={this.onSubmitButtonPress}
                       underlineColorAndroid="#FFFFFF" />
          </View>
        </View>

        <View style={styles.loginFeedbackWrapper}>
          <Text style={styles.loginFeedbackText}>{errorText}</Text>
        </View>

        <Button onPress={this.onSubmitButtonPress}
                disabled={isLoading}
                style={styles.loginButtonText}
                containerStyle={[styles.loginButtonContainer, isLoading ? styles.loginButtonContainerDisabled : {}]}>
          {isLoading ? '登录中...' : '登录'}
        </Button>
      </View>
    );
  }

  focusPasswordField() {
    this.refs['passwordField'].focus();
  }

  onCloseButtonPress() {
    Actions.pop();
  }

  onSubmitButtonPress() {
    const { isLoading, username, password } = this.state;
    if (!isLoading) {
      this.refs['usernameField'].blur();
      this.refs['passwordField'].blur();

      this.setState({ isLoading: true });


    }
  }

  async getPostToken() {
    try {
      let $ = await Networking.get('/signin');

    } catch (error) {
      
    }
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
  closeButtonWrapper: {},
  closeButton: {
    width: CLOSE_BUTTON_SIZE,
    height: CLOSE_BUTTON_SIZE,
  },

  loginFormWrapper: {
    marginTop: 120,
    marginBottom: 15,
  },
  formInputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#D8E0E4',
  },
  formInputWrapperForPassword: {
    marginTop: 18,
  },
  formInput: {
    flex: 1,
    height: 30,
    android: {
      height: 33,
    }
  },

  loginFeedbackWrapper: {
    height: 20,
    marginBottom: 15,
  },
  loginFeedbackText: {
    color: 'red',
    textAlign: 'center',
  },

  loginButtonContainer: {
    height: 40,
    borderRadius: 5,
    backgroundColor: '#73BCF1',
    justifyContent: 'center',
  },
  loginButtonContainerDisabled: {
    backgroundColor: '#B9DDF8',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '300',
  }
});


export default LoginPage;
