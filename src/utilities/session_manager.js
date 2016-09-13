import Networking from './v2_networking';
//noinspection JSUnresolvedVariable
import {EventEmitter} from 'events';
import {Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';

import CookieManager from 'react-native-cookies';

class SessionEmitter extends EventEmitter {
}

const sessionEmitter = new SessionEmitter();

let currentUser = null;

export default class SessionManager {
  static setCurrentUser($) {
    const nextUser = this.getCurrentUserFromHTML($);
    const previousUser = this.getCurrentUser();
    currentUser = nextUser;
    if (!(previousUser && nextUser) && (previousUser || nextUser)) {
      // if either of the two user is not null
      this.emitStatusChanged(nextUser);
    } else if ((previousUser && nextUser) && (previousUser.name !== nextUser.name)) {
      // if both of the two user are not null and these names not match
      this.emitStatusChanged(nextUser);
    }
  }

  static emitStatusChanged(user) {
    sessionEmitter.emit('status', user);
  }

  static getCurrentUserFromHTML($ = null) {
    if (!$) {
      return null;
    }
    const usernameElement = $('#Top table td:nth-child(3) a:nth-child(2)');
    const name = usernameElement.text();
    const uri = usernameElement.attr('href');
    if (uri === '/signup' || uri.indexOf('/member/') === -1) {
      return null;
    } else {
      return { name };
    }
  }

  static getCurrentUser() {
    return currentUser ? Object.assign({}, currentUser) : null;
  }

  static checkLogin($ = null) {
    if ($) {
      return !!this.getCurrentUserFromHTML($);
    } else {
      return !!currentUser;
    }
  }

  static checkLoginWithUI($ = null) {
    const flag = SessionManager.checkLogin($);
    if(flag === false) {
      Alert.alert('无法继续', '您尚未登录，请登录',
        [
          {text: '取消', style: 'cancel'},
          {text: '登录', onPress: () => Actions.login()},
        ]);
    }
    return flag;
  }

  static async checkLoginAsync() {
    try {
      const $ = await Networking.get('');

    } catch (error) {
      console.log('error:', error);
    }
  }

  static listenToStatusChanged(callback) {
    sessionEmitter.on('status', callback);
  }

  static logOut() {
    return new Promise((resolve, reject) => {
      CookieManager.clearAll((err, res) => {
        if (err) {
          reject(err);
        } else {
          this.setCurrentUser(null);
          resolve(res);
        }
      });
    });
  }

}

window.SessionManager = SessionManager;
