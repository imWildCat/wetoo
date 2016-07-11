import React, {Component, PropTypes} from 'react';
import { View, ListView, StatusBar, ActivityIndicator, InteractionManager } from 'react-native';

import cheerio from 'cheerio';
import moment from 'moment';

import StringUtilities from '../../../utilities/string';
import V2Networking from '../../../utilities/v2_networking';

import TopicListRow from './TopicListRow';

class TopicListPage extends Component {

    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return r1 !== r2;
            }
        });
        this.state = {
            dataSource: null,
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.loadList();
        });
    }

    loadList() {
        const tabSlug = this.props.tabSlug || 'all';
        console.log('fetching:', `http://www.v2ex.com/?tab=${tabSlug}`);
        fetch(`http://www.v2ex.com/?tab=${tabSlug}`, {
            headers: {
                // 'Accept': '*/*',
                // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36'
            }
        })
            .then(response => response.text())
            .then(text => {
                const $ = cheerio.load(text);

                const topicElements = $('#Main > div.box > div.cell.item');
                const topicList = [];

                for (var index = 0; index < topicElements.length; index++) {
                    var element = topicElements[index];
                    const e = $(element);

                    const id = Number(StringUtilities.matchFirstOrNull(e.find('.item_title a').attr('href'), /t\/(\d+)/));
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

                    topicList.push({ id, title, nodeName, nodeURI, authorName, authorURI, authorAvatarURI, replyCount, time, timestamp, pinned });
                }

                // It might not need sorting now:
                // topicList.sort((a, b) => {
                //     if (a.pinned && !b.pinned) {
                //         return -1;
                //     }
                //     return b.timestamp - a.timestamp;
                // });
                this.setState({ dataSource: this.ds.cloneWithRows(topicList) });
            }, error => {
                let des = error;
                console.log('error:', error);
            });
    }

    parseTimeToUnix(time) {
        var days, hours, minutes, seconds;

        if (time === null) {
            return 0;
        } else {
            const cleanTime = time.replace(/ /g, '');
            days = Number(StringUtilities.matchFirstOrNull(cleanTime, /(\d+)天/));
            hours = Number(StringUtilities.matchFirstOrNull(cleanTime, /(\d+)小时/));
            minutes = Number(StringUtilities.matchFirstOrNull(cleanTime, /(\d+)分钟/));
            seconds = Number(StringUtilities.matchFirstOrNull(cleanTime, /(\d+)秒/));
        }

        const m = moment().subtract({ days, hours, minutes, seconds });
        return m.unix();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle={'light-content'} />
                {this._renderContent()}
            </View>
        );
    }

    _renderContent() {
        if (this.state.dataSource) {
            return (
                <ListView
                    style={{ flex: 1 }}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    />
            );
        } else {
            return <ActivityIndicator />;
        }
    }

    renderRow(rowData) {
        return (
            <TopicListRow onRowPress={this.onRowPress.bind(this)} {...rowData} />
        );
    }

    onRowPress(topicID) {
        this.props.pushTopicPage(topicID);
    }

}

TopicListPage.propTypes = {
    pushTopicPage: PropTypes.func.isRequired,
    tabSlug: PropTypes.string,
};

export default TopicListPage;
