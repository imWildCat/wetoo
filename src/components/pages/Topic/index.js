import React, {Component, PropTypes} from 'react';
import { View, ListView, StyleSheet, ActivityIndicator } from 'react-native';

import cheerio from 'cheerio';

import StringUtilities from '../../../utilities/string';

import TopicHeader from './TopicHeader';
import Post from './Post';

class TopicPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            topic: {},
            posts: [],
            dataSource: null,
        };
    }

    componentDidMount() {
        const loadTopic = () => this.loadTopic();
        setTimeout(function () {
            loadTopic();
        }, 500);
    }

    render() {
        return (
            <View style={styles.container} >
                {this.renderPosts()}
            </View>
        );
    }

    renderPosts() {
        if (!this.state.dataSource) {
            return <ActivityIndicator />;
        } else {
            return (
                <ListView
                    style={{ flex: 1 }}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)} />
            );
        }
    }

    renderRow(rowData) {
        if (rowData.title) {
            return <TopicHeader {...rowData} />;
        }
        return <Post {...rowData} onUserPress={this._onUserPress.bind(this)} />;
    }

    _onUserPress(username) {
        this.props.pushUserPage(username);
    }

    loadTopic() {
        fetch(`http://www.v2ex.com/t/${this.props.topicID}`, {
            headers: {
                'Accept': 'text/html',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36'
            }
        })
            .then(response => response.text())
            .then(text => {
                const $ = cheerio.load(text, { decodeEntities: false });

                // Parse topic
                const _topicMetaElement = $($('#Main div.box .header'));
                const title = _topicMetaElement.find('h1').text();
                const topicID = Number(StringUtilities.matchFirstOrNull(_topicMetaElement.find('div.votes').attr('id'), /topic_(\d+)_votes/));
                const replyCount = Number(StringUtilities.matchFirstOrNull($('#Main div.box .cell span.gray').text(), /(\d+) 回复/));
                const topicContent = $('#Main .box .topic_content').html();
                // const postscript = $('#Main .box .subtle').html();
                // TODO: Find a better regex expression for Chinese
                const topicTime = StringUtilities.betterV2TimeString(StringUtilities.matchFirstOrNull(_topicMetaElement.find('small.gray').text(), / · ([a-zA-Z0-9 \u4E00-\u9FA5\uF900-\uFA2D]+) ·/));

                // TODO: Implement appreciation count and favourite count for topic:
                // const _topicOtherInfoElementText = $('#Main .box .topic_buttons .fr').text();
                // const appreciationCount = Number(StringUtilities.matchFirstOrNull(_topicOtherInfoElementText, /(\d+) 人感谢/));
                // const favoriteCount = Number(StringUtilities.matchFirstOrNull(_topicOtherInfoElementText, /(\d+) 人收藏/));

                // Parse author of topic
                const authorName = _topicMetaElement.find('small.gray > a').text();
                const authorAvatarURI = _topicMetaElement.find('.fr > a > img').attr('src');

                // Parse node
                const _nodeElement = $('#Main .box .header > a:nth-child(4)');
                const nodeName = _nodeElement.text();
                const nodeSlug = StringUtilities.matchFirstOrNull(_nodeElement.attr('href'), /\/go\/(\w{1,31})/);

                const topic = {
                    id: topicID,
                    title: title,
                    replyCount,
                    nodeName,
                    nodeSlug,
                };

                // Parse replies
                const posts = [];

                posts.push(topic);

                // Push data of topic into `posts` array
                posts.push({
                    id: 0, content: topicContent, authorAvatarURI: authorAvatarURI,
                    authorName, time: topicTime, floor: 0, appreciationCount: 0,
                });

                const _replyElements = $('#Main > div:nth-child(4) > .cell');
                for (var index = 1; index < _replyElements.length; index++) { // Start from second element, because the first is about tags
                    const _element = $(_replyElements[index]);

                    // console.log(_element.attr('class'), _element.hasClass('normalUser'));
                    const replyID = Number(StringUtilities.matchFirstOrNull(_element.attr('id'), /r_(\d{1,15})/));
                    if (!replyID) {
                        // If there is no replyID, it might be a pagination element
                        continue;
                    }
                    const replyContent = _element.find('.reply_content').html();
                    const replyAuthorAvatarURI = _element.find('img.avatar').attr('src');
                    const replyAuthorName = _element.find('strong a').text();

                    const time = StringUtilities.betterV2TimeString(_element.find('span[class="fade small"]').text());
                    const floor = Number(_element.find('span.no').text());
                    const replyAppreciationCount = Number(StringUtilities.matchFirstOrNull(_element.find('span[class="small fade"]').text(), /♥ (\d+)/));

                    posts.push({
                        id: replyID, content: replyContent, authorAvatarURI: replyAuthorAvatarURI,
                        authorName: replyAuthorName, time, floor, appreciationCount: replyAppreciationCount,
                    });
                }

                const ds = new ListView.DataSource({
                    rowHasChanged: (r1, r2) => {
                        return r1.id !== r2.id;
                    }
                });
                this.setState({ posts, dataSource: ds.cloneWithRows(posts) });
            });
    }
}

TopicPage.propTypes = {
    pushTopicPage: PropTypes.func.isRequired,
    pushUserPage: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default TopicPage;
