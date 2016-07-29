import React, {Component, PropTypes} from 'react';
import GiftedListView from 'react-native-gifted-listview';

import ListViewSearchBar from './ListViewSearchBar';

export default class GiftedListViewWrapper extends Component {

  static defaultProps = {
    enableSearch: false,
    searchOnChange: false,
  };

  static propTypes = {
    enableSearch: PropTypes.bool,
    searchOnChange: PropTypes.bool,
  };

  state = {
    contentOffset: { x: 0, y: 44 },
  };

  render() {
    const { enableSearch } = this.props;
    const searchProps = enableSearch ? {
      renderHeader: this.renderHeader,
      contentOffset: this.state.contentOffset,
    } : {};

    return <GiftedListView ref="listView" enableEmptySections={true} {...searchProps} {...this.props} />;
  }

  onSearchTextChange = (text) => {
    const { searchOnChange } = this.props;
    if (searchOnChange) {
      this.performSearch(text);
    }
  };

  onSearchTextSubmit = (text) => {
    this.performSearch(text);
  };

  performSearch = (text) => {
    const { listView } = this.refs;
    listView.props.onFetch(listView._getPage(), listView._postRefresh, { search: true, keywords: text });
  };

  onCancelSearch = () => {
    const { listView } = this.refs;
    listView.props.onFetch(listView._getPage(), listView._postRefresh, { search: false });
    listView.refs.listview.scrollTo({ x: 0, y: 44, animated: true });
  };

  renderHeader = () => {
    return <ListViewSearchBar
      onCancel={this.onCancelSearch}
      onChangeText={this.onSearchTextChange}
      onSubmitText={this.onSearchTextSubmit} />;
  }

}
