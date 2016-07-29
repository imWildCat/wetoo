import React, {Component} from 'react';
import {TouchableHighlight, View} from 'react-native';

class TouchableRow extends Component {

  static propTypes = {
    innerViewStyle: View.propTypes.style,
  };

  render() {
    const { style, innerViewStyle, children } = this.props;
    return (
      <TouchableHighlight underlayColor="#E6E6E6" {...this.props} style={[{ overflow: 'hidden' }, style]}>
        <View style={[{ flex: 1 }, innerViewStyle]}>
          {children}
        </View>
      </TouchableHighlight>
    );
  }

}

export default TouchableRow;
