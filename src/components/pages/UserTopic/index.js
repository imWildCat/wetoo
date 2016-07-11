import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, ListView, TouchableHighlight} from 'react-native';

import V2Networking from '../../../utilities/v2_networking';
import StringUtilities from '../../../utilities/string';
import LoadingWrapper from '../../common/LoadingWrapper';
import Separator from '../../common/Separator';
import PointSeparator from '../../common/PointSeparator';
import ReplyCount from '../TopicList/ReplyCount';

class UserTopicPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            topics: [],
        };
    }

    componentDidMount() {
        this._loadTopicList();
    }

    render() {
        return (
            <LoadingWrapper
                style={{ flex: 1 }}
                isLoading={this.state.topics.length === 0}
                renderContent={this._renderList.bind(this)}
                />
        );
    }

    _renderList() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
                />
        );
    }

    _renderRow(rowData) {
        const { topicID, title, nodeName, time, replyCount } = rowData;
        const { pushTopicPage } = this.props;
        return (
            <TouchableHighlight underlayColor="#E6E6E6" onPress={() => { pushTopicPage(topicID); }}>
                <View style={styles.wrapper}>
                    <Text style={styles.titleText}>{title}</Text>
                    <View style={styles.metaInfo}>
                        <View style={styles.nodeTextWrapper}>
                            <Text style={styles.nodeText}>{nodeName}</Text>
                        </View>
                        <PointSeparator style={styles.pointSeparator} />
                        <Text style={styles.nodeText}>{time}</Text>
                        <View style={{ flex: 1 }}>
                            <ReplyCount style={styles.replyCountWrapper} count={replyCount} />
                        </View>
                    </View>
                    <Separator marginLeft={12} />
                </View>
            </TouchableHighlight>
        );
    }

    _loadTopicList() {
        const { username } = this.props;
        V2Networking.get(`member/${username}/topics`)
            .then($ => {
                const _topicElements = $('#Main div.cell.item');
                const _topics = [];

                for (var i = 0; i < _topicElements.length; i++) {
                    const _element = $(_topicElements[i]);
                    const _titleElement = _element.find('.item_title a');
                    const topicID = Number(StringUtilities.matchFirstOrNull(
                        _titleElement.attr('href'),
                        /\/t\/(\d+)/
                    ));
                    const title = _titleElement.text();
                    const nodeName = _element.find('a.node').text();
                    const time = StringUtilities.matchFirstOrNull(
                        _element.find('.small.fade').text(),
                        /&nbsp;•&nbsp; ([0-9 \u4e00-\u9fa5]+)前 &nbsp;/
                    );
                    const replyCount = Number(_element.find('.count_livid').text());

                    _topics.push({ topicID, title, nodeName, time, replyCount });
                }

                const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.topicID !== r2.topicID });
                this.setState({ dataSource: ds.cloneWithRows(_topics), topics: _topics });
            });
    }
}

UserTopicPage.propTypes = {
    username: PropTypes.string.isRequired,
    pushTopicPage: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 10,
    },
    titleText: {
        color: '#333333',
        fontSize: 15,
        paddingLeft: 12,
        paddingRight: 12,
    },
    metaInfo: {
        height: 17,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 12,
        marginTop: 5,
        marginBottom: 12,
    },
    nodeTextWrapper: {
        paddingLeft: 7,
        paddingRight: 7,
        backgroundColor: '#E8F0FC',
        height: 17,
        justifyContent: 'center',
        borderRadius: 5,
    },
    nodeText: {
        fontSize: 12,
        fontWeight: '300',
        color: '#333333',
    },
    pointSeparator: {
        marginLeft: 10,
        marginRight: 10,
    },
    replyCountWrapper: {
        alignSelf: 'flex-end',
    }
});

export default UserTopicPage;
