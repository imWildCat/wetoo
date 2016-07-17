import React, {Component} from 'react';
import GiftedListView from 'react-native-gifted-listview';

export default class GiftedListViewWrapper extends Component {

  render() {
    return <GiftedListView enableEmptySections={true} {...this.props} />
  }

};
