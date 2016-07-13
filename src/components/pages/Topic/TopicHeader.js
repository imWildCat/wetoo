import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';

class TopicHeader extends Component {

  render() {
    const { title, nodeName } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.nodeNameText}>{nodeName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },
  titleText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  nodeNameText: {
    fontSize: 14,
    color: '#B0B0B3',
    marginTop: 2,
    marginLeft: 5,
  }
});

export default TopicHeader;
