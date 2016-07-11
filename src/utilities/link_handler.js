import {Linking} from 'react-native';

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

    }

}

export default LinkHandler;
