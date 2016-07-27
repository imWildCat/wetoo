import React, {Component} from 'react';
import {View, Text} from 'react-native';

import Networking from '../../../utilities/v2_networking';
import HTMLHelper from '../../../utilities/html_helper';
import Style from '../../../utilities/style';

import AvatarImage from '../../common/AvatarImage';
import HTMLView from '../../common/HTMLView';
import GiftedListView from '../../common/GiftedListView';
import PageContainer from '../../common/PageContainer';
import TouchableRow from '../../common/TouchableRow';
import Separator from '../../common/Separator';

class NotificationTab extends Component {
  static defaultProps = {};
  static propTypes = {};
  static state = {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PageContainer isTab={true}>
        <GiftedListView onFetch={this.onFetch} renderRow={this.renderRow} renderSeparator={this.renderSeparator} />
      </PageContainer>
    );
  }

  renderRow = (rowData) => {
    const { metaHTML, avatarURI, content, time } = rowData;
    return (
      <TouchableRow onPress={() => this.onRowPress(rowData)} innerViewStyle={styles.rowWrapper}>
        <View style={styles.leftColumn}>
          <AvatarImage style={styles.avatarImage} uri={avatarURI} />
        </View>
        <View style={styles.rightColumn}>
          <HTMLView value={metaHTML} enableDefaultLinkHandler />
          <HTMLView style={styles.content} value={content} enableDefaultLinkHandler />
          <Text style={styles.timeText}>{time}</Text>
        </View>
      </TouchableRow>
    );
  };

  async onFetch(page = 1, callback, options) {
    try {
      console.log('page:', page);
      const $ = await Networking.get(`/notifications?p=${page}`);
      const { currentPage, lastPage, allLoaded } = HTMLHelper.parsePagination($);
      const notifications = [];
      $('#Main .cell[id]').each((_i, _element) => {
        const _row = $(_element);
        const metaHTML = _row.find('.fade').html();
        const _rawAvatarURI = _row.find('img.avatar').attr('src');
        const avatarURI = _rawAvatarURI.replace('_mini.png', '_large.png');
        const content = _row.find('.payload').html();
        const time = _row.find('.snow').text().replace('前', '');
        notifications.push({ metaHTML, avatarURI, content, time });
      });
      callback(notifications, { allLoaded });
    } catch (error) {
      console.log('error:', error);
    }
  }

  onRowPress = (rowData) => {

  };

  renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
    return (
      <Separator marginLeft={12} key={`${sectionID}-${rowID}`} />
    );
  };

}

const styles = Style.create({
  rowWrapper: {
    margin: 10,
    marginLeft: 12,
    marginRight: 12,
    flexDirection: 'row',
  },
  // Left column
  leftColumn: {
    width: 55,
    overflow: 'hidden',
  },
  avatarImage: {
    width: 55,
    height: 55,
    borderRadius: 5,
  },
  timeText: {
    fontSize: 12,
    // textAlign: 'center',
    color: '#B0B0B3',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  // Right column
  rightColumn: {
    flex: 1,
    marginLeft: 10,
  },
  content: {
    marginTop: 5,
  }
});


export default NotificationTab;
