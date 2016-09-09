import React, {Component, PropTypes} from 'react';
import {View, Text, Modal, StatusBar, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Style from '../../../utilities/style';
import NodeListManager from '../../../utilities/node_list_manager';
import LoadingWrapper from '../../common/LoadingWrapper';
import GiftedListView from '../../common/GiftedListView';
import TouchableRow from '../../common/TouchableRow';
import Separator from '../../common/Separator';

class NodeSelector extends Component {
  static defaultProps = {
    visible: false,
  };
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    nodeSlug: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
  };
  state = {
    isLoading: true,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { visible, onCancel } = this.props;
    const { isLoading } = this.state;
    return (
      <Modal visible={visible} animationType="slide">
        <StatusBar barStyle="default" />
        <View style={styles.fakedNavigationBar}>
          <TouchableOpacity onPress={onCancel}>
            <Icon name="times" size={20} color="#CCCCDE" />
          </TouchableOpacity>
          <Text style={styles.fakedNavigationBarTitle}>
            选择节点
          </Text>
        </View>
        <GiftedListView
          onFetch={this.loadNodeList}
          renderRow={this.renderRow}
          pagination={false}
          refreshable={false}
          renderSeparator={this.renderSeparator}
        />
      </Modal>
    );
  }

  loadNodeList = (page = 1, callback, options) => {
    const { nodeSlug } = this.props;
    NodeListManager.getNodes().then(nodes => {
      let currentNode = null;
      const filteredNodes = nodes.filter((node) => {
        if (node.slug !== nodeSlug) {
          return true;
        } else {
          currentNode = Object.assign({}, node, { current: true });
          return false;
        }
      });
      if (currentNode) {
        filteredNodes.unshift(currentNode);
      }
      this.nodes = filteredNodes;
      callback(filteredNodes);
    }, error => {
      Alert.alert('出错啦', '节点列表加载失败');
    });
  };

  renderRow = (rowData) => {
    const { name, slug, current } = rowData;
    return (
      <TouchableRow style={styles.row} onPress={() => this.onRowPress(name, slug)}>
        {current ? <Icon style={styles.tickMark} name="check" size={13} color="#1992F5" /> : null}
        <Text style={styles.nodeText}>{name}</Text>
      </TouchableRow>
    );
  };

  renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
    return (
      <Separator marginLeft={43} key={`${sectionID}-${rowID}`} />
    );
  };

  onRowPress = (nodeName, nodeSlug) => {
    if (nodeName && nodeSlug) {
      this.props.onSelect(nodeName, nodeSlug);
    }
  };

}

const styles = Style.create({
  fakedNavigationBar: {
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
    flexDirection: 'row',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 31,
  },
  fakedNavigationBarTitle: {
    fontSize: 17,
    marginRight: 20,
    flex: 1,
    textAlign: 'center',
  },
  row: {
    overflow: 'hidden',
    height: 44,
    alignItems: 'center',
    flexDirection: 'row',
  },
  tickMark: {
    position: 'absolute',
    left: 15,
    top: 6,
  },
  nodeText: {
    fontSize: 17,
    marginLeft: 43,
  }
});


export default NodeSelector;
