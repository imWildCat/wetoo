import React, {Component, PropTypes} from 'react';
import {View, ListView, StatusBar, ActivityIndicator, InteractionManager} from 'react-native';
import {Actions} from 'react-native-router-flux';

import moment from 'moment';

import StringUtilities from '../../../utilities/string';
import V2Networking from '../../../utilities/v2_networking';
import SessionManager from '../../../utilities/session_manager';

import GiftedListView from '../../common/GiftedListView';
import TopicListRow from './TopicListRow';

class TopicListPage extends Component {

  static defaultProps = {
    isNode: false,
  };

  static propTypes = {
    slug: PropTypes.string.isRequired,
    isNode: PropTypes.bool,
  };

  onFetch = (page = 1, callback, options) => {
    const { slug, isNode } = this.props;
    const uri = isNode ? `/go/${slug}` : `?tab=${slug}`;
    V2Networking.get(uri)
      .then($ => {
        // Handle session status firstly
        SessionManager.setCurrentUser($);

        const topicElements = $('#Main > div.box > div.cell.item, #Main > div.box > #TopicsNode > .cell');
        const topicList = [];

        for (var index = 0; index < topicElements.length; index++) {
          var element = topicElements[index];
          const e = $(element);

          const id = Number(StringUtilities.matchFirst(e.find('.item_title a').attr('href'), /t\/(\d+)/));
          const title = e.find('.item_title a').text();
          const nodeName = e.find('a.node').text();
          const nodeURI = e.find('a.node').attr('href');
          const authorName = e.find('span.small.fade strong a:first-child').html(); // FIXME: Why .text() would double the username?
          const authorURI = e.find('span.small.fade strong a').attr('href');
          const replyCount = Number(e.find('td:last-child').text());
          const authorAvatarURI = e.find('img.avatar').attr('src');
          const pinned = e.attr('style') !== '';
          const timeMatches = e.find('span.small.fade').text().match(/•  ([a-zA-Z0-9 \u4e00-\u9fa5]+)前/);
          var time = null;
          if (timeMatches !== null && timeMatches.length > 0) {
            time = timeMatches[1];
          }
          const timestamp = this.parseTimeToUnix(time);

          topicList.push({
            id,
            title,
            nodeName,
            nodeURI,
            authorName,
            authorURI,
            authorAvatarURI,
            replyCount,
            time,
            timestamp,
            pinned
          });
        }

        InteractionManager.runAfterInteractions(() => {
          callback(topicList);
        });
      }, error => {
        console.log('error:', error);
      });
  };

  parseTimeToUnix(time) {
    var days, hours, minutes, seconds;

    if (time === null) {
      return 0;
    } else {
      const cleanTime = time.replace(/ /g, '');
      days = Number(StringUtilities.matchFirst(cleanTime, /(\d+)天/));
      hours = Number(StringUtilities.matchFirst(cleanTime, /(\d+)小时/));
      minutes = Number(StringUtilities.matchFirst(cleanTime, /(\d+)分钟/));
      seconds = Number(StringUtilities.matchFirst(cleanTime, /(\d+)秒/));
    }

    const m = moment().subtract({ days, hours, minutes, seconds });
    return m.unix();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={'light-content'} />
        <GiftedListView
          style={{ flex: 1 }}
          onFetch={this.onFetch}
          renderRow={this.renderRow.bind(this)} />
      </View>
    );
  }

  renderRow = (rowData) => {
    const { isNode } = this.props;
    return (
      <TopicListRow isNode={isNode} onRowPress={this.onRowPress} {...rowData} />
    );
  };

  onRowPress(topicID) {
    Actions.topic({ topicID });
  }

}

export default TopicListPage;
