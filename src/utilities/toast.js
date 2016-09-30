import RootToast from 'react-native-root-toast';
import {Platform} from 'react-native';

class Toast {

  static show(message) {
    let options = Platform.OS === 'android' ? {} : {position: RootToast.positions.CENTER};
    RootToast.show(message, options);
  }

}

export default Toast;
