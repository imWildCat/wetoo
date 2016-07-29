import {AsyncStorage} from 'react-native';

import Networking from './v2_networking';

const NODE_LIST_KEY = 'NODE_LIST';
const NODE_LIST_EXPIRES_IN = 432000;

export default class NodeListManager {

  static async _getRemoteNodeList() {
    return Networking.getJSON('/api/nodes/all.json').then(res => res.json()).then(json => json.map((raw) => {
      const { id, header, name: slug, title: name, topics, created } = raw;
      return { id, header, slug, name, topics, created };
    }));
  }

  static async _saveNodeList(nodes) {
    try {
      await AsyncStorage.setItem(NODE_LIST_KEY, JSON.stringify({ lastModified: this._timestamp(), nodes }));
    } catch (error) {
      console.log('error saving data:', error);
    }
  }

  static async _timestamp() {
    return Date.now() / 1000 | 0;
  }

  static async _refreshNodeList() {
    try {
      const nodes = await this._getRemoteNodeList();
      await this._saveNodeList(nodes);
      return nodes;
    } catch (error) {
      console.log('error:', error);
    }
  }

  static async getNodes() {
    try {
      let data = await AsyncStorage.getItem(NODE_LIST_KEY);
      data = data ? JSON.parse(data) : null;
      if (data === null || this._timestamp() - data.lastModified > NODE_LIST_EXPIRES_IN) {
        console.log('fetch nodes');
        const newNodes = await this._refreshNodeList();
        return newNodes;
      } else {
        console.log('nodes exists');
        const { nodes } = data;
        return nodes;
      }
    } catch (error) {
      console.log('error retrieving data:', error);
    }
  }

  // static async initializeNodes() {
  //   try {
  //     return await this.getNodes();
  //   } catch (error) {
  //     console.log('error:', error);
  //   }
  // }

}
