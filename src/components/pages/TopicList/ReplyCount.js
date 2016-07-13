import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text} from 'react-native';

class ReplyCount extends Component {
  render() {
    const { count, style } = this.props;
    return (
      <View style={[styles.replyCountWrapper, style]}>
        <Text style={styles.replyCount}>{count}</Text>
      </View>
    );
  }
}

ReplyCount.propTypes = {
  count: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  replyCountWrapper: {
    backgroundColor: '#73BCF1',
    height: 16,
    borderRadius: 5,
    justifyContent: 'center',
  },
  replyCount: {
    fontSize: 12,
    marginLeft: 7,
    marginRight: 7,
    color: 'white',
    fontWeight: '300',
  },
});

export default ReplyCount;
