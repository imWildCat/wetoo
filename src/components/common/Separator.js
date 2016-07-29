import React, {Component, PropTypes} from 'react';
import {View} from 'react-native';

class Separator extends Component {

  static defaultProps = {
    marginLeft: 12,
  };
  static propTypes = {
    marginLeft: PropTypes.number,
  };

  render() {
    const { marginLeft } = this.props;
    const style = {
      marginLeft: marginLeft,
      backgroundColor: '#CCCCDE',
      height: 0.5,
    };
    return (
      <View style={style} />
    );
  }
}

export default Separator;
