import React, {Component, PropTypes} from 'react';
import {View, Text} from 'react-native';
import HTMLView from 'react-native-htmlview';

import Style from '../../utilities/style';
import LinkHandler from '../../utilities/link_handler';

class HTMLViewWrapper extends Component {
  static defaultProps = {
    enableDefaultLinkHandler: false,
  };
  static propTypes = {
    enableDefaultLinkHandler: PropTypes.bool,
    ...HTMLView.propTypes,
    style: View.propTypes.style,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { style, stylesheet, enableDefaultLinkHandler, onLinkPress } = this.props;
    const handler = enableDefaultLinkHandler ? LinkHandler.handleURL : onLinkPress;
    const sst = Object.assign({}, defaultStylesheet, stylesheet);
    return (
      <View style={[styles.defaultWrapper, style]}>
        <HTMLView {...this.props} stylesheet={sst} onLinkPress={handler} />
      </View>
    );
  }

}

const styles = Style.create({
  defaultWrapper: {}
});

const defaultStylesheet = Style.create({
  a: {
    color: '#329EED',
    fontWeight: '500',
  }
});


export default HTMLViewWrapper;
