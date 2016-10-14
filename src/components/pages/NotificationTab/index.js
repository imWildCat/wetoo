import React, {Component} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {Actions} from 'react-native-router-flux';

import Networking from '../../../utilities/v2_networking';
import HTMLHelper from '../../../utilities/html_helper';
import StringUtilities from '../../../utilities/string';
import Style from '../../../utilities/style';
import SessionManager from '../../../utilities/session_manager';

import AvatarImage from '../../common/AvatarImage';
import HTMLRender from '../../common/HTMLRender';
import GiftedListView from '../../common/GiftedListView';
import PageContainer from '../../common/PageContainer';
import TouchableRow from '../../common/TouchableRow';
import Separator from '../../common/Separator';

class NotificationTab extends Component {
  static defaultProps = {};
  static propTypes = {};
  static state = {
    user: null,
  };

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
    const { metaHTML, avatarURI, content, time, topicID, username } = rowData;
    return (
      <TouchableRow onPress={() => this.onRowPress(topicID)} innerViewStyle={styles.rowWrapper}>
        <View style={styles.leftColumn}>
          <TouchableWithoutFeedback onPress={() => this.onAvatarPress(username)}>
            <AvatarImage style={styles.avatarImage} uri={avatarURI} />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.rightColumn}>
          <HTMLRender stylesheet={metaHTMLStyle} value={metaHTML} enableDefaultLinkHandler />
          <HTMLRender style={styles.content} stylesheet={contentHTMLStyle} value={`<div>${content || ''}</div>`}
                    enableDefaultLinkHandler />
          <Text style={styles.timeText}>{time}</Text>
        </View>
      </TouchableRow>
    );
  };

  async onFetch(page = 1, callback, options) {
    try {
      console.log('page:', page);
      const $ = await Networking.get(`/notifications?p=${page}`);
      const { allLoaded } = HTMLHelper.parsePagination($);
      const notifications = [];
      $('#Main .cell[id]').each((_i, _element) => {
        const _row = $(_element);
        const metaHTML = _row.find('.fade').html();
        const _rawAvatarURI = _row.find('img.avatar').attr('src');
        const avatarURI = _rawAvatarURI.replace('_mini.png', '_large.png');
        const content = _row.find('.payload').html();
        const time = _row.find('.snow').text().replace('前', '');
        const topicID = Number(StringUtilities.matchFirst(metaHTML, /\/t\/(\d+)#/));
        const username = StringUtilities.matchFirst(metaHTML, /\/member\/(\w+)/);
        notifications.push({ metaHTML, avatarURI, content, time, topicID, username });
      });
      callback(notifications, { allLoaded });
    } catch (error) {
      console.log('error:', error);
    }
  }

  onRowPress = (topicID) => {
    console.log('onRowPress:', topicID);
    Actions.topic({ topicID });
  };

  onAvatarPress = (username) => {
    console.log('onAvatar:', username);
    Actions.user({ username });
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

const metaHTMLStyle = Style.create({
  a: {
    color: '#000000',
    fontWeight: '500',
  }
});

const contentHTMLStyle = Style.create({
  div: {
    color: '#333333',
    fontWeight: '200',
  },
  a: {
    color: '#333333',
    fontWeight: '400',
  },
});


export default NotificationTab;
