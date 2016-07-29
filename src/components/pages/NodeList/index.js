import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

import Style from '../../../utilities/style';
import NodeListManager from '../../../utilities/node_list_manager';

import HomepageNodeData from './homepage_node_data.json';
import GiftedListView from '../../common/GiftedListView';
import PageContainer from '../../common/PageContainer';

class NodeList extends Component {

  searchMode = false;

  constructor(props) {
    super(props);
    this.state = {};

    this.onFetch = this.onFetch.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderNodeElement = this.renderNodeElement.bind(this);

    this.initializeNodes();
  }

  async initializeNodes() {
    try {
      this.nodes = await NodeListManager.getNodes();
    } catch (error) {
      console.log('error:', error);
    }
  }

  render() {
    return (
      <PageContainer isTab={true}>
        <GiftedListView
          onFetch={this.onFetch}
          renderRow={this.renderRow}
          pagination={false}
          refreshable={false}
          enableSearch={true}
          searchOnChange={true}
        />
      </PageContainer>
    );
  }

  onFetch = (page = 1, callback, options) => {
    const { search, keywords } = options;
    if (search) {
      this.searchMode = true;
      const lowerKeywords = keywords.toLowerCase();
      if (this.nodes) {
        const filteredNodes = this.nodes.filter((node) => {
          const { slug, name } = node;
          if (slug && name && (slug.toLowerCase().indexOf(lowerKeywords) > -1 || name.toLowerCase().indexOf(lowerKeywords) > -1)) {
            return true;
          } else {
            return false;
          }
        });
        callback(filteredNodes);
      } else {
        this.initializeNodes();
      }
    } else {
      this.searchMode = false;
      callback(HomepageNodeData);
    }
  };


  renderRow = (rowData) => {
    if (this.searchMode) {
      return this.renderSearchResultRow(rowData);
    } else {
      return this.renderNormalRow(rowData);
    }
  };

  renderNormalRow = (rowData) => {
    const { category_name: categoryName, nodes } = rowData;
    return (
      <View style={styles.row}>
        <View style={styles.nodeCategoryWrapper}>
          <Text style={styles.nodeCategory}> {categoryName}</Text>
        </View>
        <View style={styles.nodeContainer}>
          {nodes.map((node) => this.renderNodeElement(node))}
        </View>
      </View>
    );
  };

  renderSearchResultRow = (rowData) => {
    const { slug, name } = rowData;
    return (
      <View style={{ height: 30 }}>
        <Text>{name}</Text>
      </View>
    );
  };

  renderNodeElement = (node) => {
    const { slug, name } = node;
    return (
      <View key={slug} style={styles.nodeWrapper}>
        <TouchableOpacity onPress={() => this.onNodePress(slug, name)}>
          <Text style={styles.nodeText}>{name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  onNodePress(slug, name) {
    Actions.node({ slug, title: name });
  }

}

const styles = Style.create({
  row: {
    overflow: 'hidden',
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
