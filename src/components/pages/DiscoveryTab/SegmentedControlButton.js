import React, {Component, PropTypes} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

class SegmentedControlButton extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.buttonWrapper} onPress={this.props.onPress}>
        <Text style={styles.text}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

SegmentedControlButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  buttonWrapper: {
    height: 36,
    width: 58,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
  }
});

export default SegmentedControlButton;
