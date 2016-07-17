import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import HomepageNodeData from './homepage_node_data.json';
import Style from '../../../utilities/style';
import GiftedListView from '../../common/GiftedListView';
import PageContainer from '../../common/PageContainer';

console.log(HomepageNodeData);

class NodeList extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.onFetch = this.onFetch.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderNodeElement = this.renderNodeElement.bind(this);
  }

  render() {
    return (
      <PageContainer>
        <GiftedListView
          style={{flex: 1}}
          onFetch={this.onFetch}
          renderRow={this.renderRow}
          pagination={false}
          refreshable={false}
        />
      </PageContainer>
    );
  }

  onFetch(page = 1, callback, options) {
    callback(HomepageNodeData);
  }

  renderRow(rowData) {
    const { category_name: categoryName, nodes } = rowData;
    console.log(nodes);
    return (
      <View style={styles.row}>
        <View style={styles.rowWrapper}>
          <View style={styles.nodeCategoryWrapper}>
            <Text style={styles.nodeCategory}> {categoryName}</Text>
          </View>
          <View style={styles.nodeContainer}>
            {nodes.map((node) => this.renderNodeElement(node))}
          </View>
        </View>
      </View>
    );
  }

  renderNodeElement(node) {
    const { slug, name } = node;
    return (
      <View key={slug} style={styles.nodeWrapper}>
        <TouchableOpacity>
          <Text style={styles.nodeText}>{name}</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = Style.create({
  row: {
    overflow: 'hidden',
  },
  rowWrapper: {
    flex: 1,
  },
  nodeCategoryWrapper: {
    height: 39,
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: '#EAEAEA',
  },
  nodeCategory: {
    marginLeft: 16,
    color: '#333333',
  },
  nodeContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 10,
    paddingRight: 10,
    overflow: 'hidden',
  },
  nodeWrapper: {
    height: 30,
    borderWidth: 0.5,
    borderColor: '#B0B0B3',
    borderRadius: 15,
    justifyContent: 'center',
    marginBottom: 15,
    marginLeft: 5,
    marginRight: 5,
  },
  nodeText: {
    marginLeft: 10,
    marginRight: 10,
    color: '#333333',
  }
});

export default NodeList;
