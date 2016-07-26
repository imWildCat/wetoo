import Networking from './v2_networking';
import EventEmitter from 'events';

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
}
