import {Linking} from 'react-native';
import {Actions} from 'react-native-router-flux';

import StringUtilities from './string';

class LinkHandler {
  static openExternal(url) {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  static handleURL(url) {
    console.log(url);
    if (url.startsWith('/member/')) {
      const username = StringUtilities.matchFirst(url, /\/member\/(\w+)/);
      Actions.user({ username });
    } else if (url.startsWith('/t/')) {
      const topicID = Number(StringUtilities.matchFirst(url, /\/t\/(\d+)/));
      Actions.topic({ topicID });
    } else if (url.startsWith('/go/')) {
      const slug = StringUtilities.matchFirst(url, /\/go\/(\w+)/);
      Actions.node({ slug });
    } else if (url.startsWith('https://') || url.startsWith('http://')) {
      const externalURL = url;
      LinkHandler.openExternal(externalURL);
    } else {
      console.log('Unhandled link:', url);
    }
  }

}

export default LinkHandler;
