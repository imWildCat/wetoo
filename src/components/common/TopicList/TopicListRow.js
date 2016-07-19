import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableHighlight} from 'react-native';

import PointSeparator from '../PointSeparator';
import ReplyCount from './ReplyCount';

class TopicListRow extends Component {

  render() {
    const { id, title, nodeName, /*nodeURI,*/ authorName, /*authorURI,*/ replyCount, authorAvatarURI, /*time, timestamp, pinned,*/ onRowPress, isNode } = this.props;

    let nodeView = null;
    if (!isNode) {
      nodeView = <View style={styles.nodeView}>
        <PointSeparator style={styles.pointSeparator}/>
        <View style={styles.nodeNameWrapper}>
          <Text style={styles.nodeName}>{nodeName}</Text>
        </View>
      </View>;
    }

    return (
      <TouchableHighlight underlayColor="#E6E6E6" onPress={() => onRowPress(id)} style={{ overflow: 'hidden' }}>
        <View style={styles.rowContainer}>
          <View style={styles.rowInnerContainer}>
            <Image style={styles.avatarImage} source={{ uri: `https:${authorAvatarURI}` }}/>
            <View style={styles.infoContainer}>
              <Text style={styles.titleText}>{title}</Text>
              <View style={styles.metaContainer}>
                <Text style={styles.authorName}>{this.renderAuthorName(authorName)}</Text>
                {nodeView}
                <View style={styles.replyCountLayout}>
                  <ReplyCount count={replyCount}/>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.rowSeparator}/>
        </View>
      </TouchableHighlight>
    );
  }


  renderAuthorName(name) {
    if (name && name.length) {
      return name.length < 13 ? name : `${name.substring(0, 12)}...`;
    }
  }

}

const commonFontColor = '#333333';

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 12,
  },
  rowInnerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  avatarImage: {
    width: 55,
    height: 55,
    marginTop: 13,
    borderRadius: 5,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  titleText: {
    marginTop: 10,
    fontSize: 15,
    flex: 1,
    marginRight: 12,
    color: commonFontColor,
  },
  metaContainer: {
    flexDirection: 'row',
  },
  authorName: {
    fontSize: 12,
    color: commonFontColor,
  },
  pointSeparator: {
    margin: 5,
    marginTop: 6,
    marginBottom: 0,
  },
  nodeView: {
    flexDirection: 'row',
  },
  nodeNameWrapper: {
    backgroundColor: '#E8F0FC',
    height: 16,
    borderRadius: 5,
    justifyContent: 'center',
  },
  nodeName: {
    fontSize: 12,
    marginLeft: 7,
    marginRight: 7,
    color: commonFontColor,
  },
  replyCountLayout: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 12,
  },
  rowSeparator: {
    height: 1,
    backgroundColor: '#D8E0E4',
    marginTop: 10,
  },
});

export default TopicListRow;
