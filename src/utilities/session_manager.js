import Networking from './v2_networking';

let currentUser = null;

export default class SessionManager {
  static setCurrentUser($) {
    currentUser = this.getCurrentUserFromHTML($);
  }

  static getCurrentUserFromHTML($) {
    const usernameElement = $('#Top table td:nth-child(3) a:nth-child(2)');
    const name = usernameElement.text();
    const uri = usernameElement.attr('href');
    console.log({ name, uri });
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
}
