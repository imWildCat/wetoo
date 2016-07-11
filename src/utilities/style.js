/**
 * @providesModule wetoo-style
 */

import {StyleSheet, Platform} from 'react-native';

const WetooStyle = {
    create: (styles) => {
        const platformStyles = {};
        Object.keys(styles).forEach((name) => {
          let {ios, android, ...style} = {...styles[name]};
          if (ios && Platform.OS === 'ios') {
            style = {...style, ...ios};
          }
          if (android && Platform.OS === 'android') {
            style = {...style, ...android};
          }
          platformStyles[name] = style;
        });
        return StyleSheet.create(platformStyles);
    },
};

export default WetooStyle;
