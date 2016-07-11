import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text} from 'react-native';

class MetaInfo extends Component {
    render() {
        const {regDate, num} = this.props;
        return (
            <View style={styles.wrapper}>
                <View style={styles.firstRow}>
                    {this._renderCounts()}
                </View>
                <View style={styles.separator} />
                <View style={styles.secondRow}>
                    <Text style={styles.regDate}>注册日期：{regDate}</Text>
                    <Text style={styles.regNumber}># {num}</Text>
                </View>
            </View>
        );
    }

    _renderCounts() {
        const counts = [];
        const {topicCount, replyCount, liveness} = this.props;
        if (topicCount) {
            counts.push(this._renderOneCount('topic_count', '话题', topicCount));
        }
        if (replyCount) {
            counts.push(this._renderOneCount('reply_count', '回复', replyCount));
        }
        if (liveness) {
            counts.push(this._renderOneCount('liveness', '活跃度', liveness));
        }
        return counts;
    }

    _renderOneCount(key, countName, count) {
        return (
            <View style={styles.countContainer} key={key}>
                <Text style={styles.countNumber}>{count}</Text>
                <Text style={styles.countName}>{countName}</Text>
            </View>
        );
    }
}

MetaInfo.propTypes = {
    topicCount: PropTypes.number,
    replyCount: PropTypes.number,
    liveness: PropTypes.number,
    regDate: PropTypes.string.isRequired,
    num: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginLeft: 10,
        height: 55,
        justifyContent: 'flex-end',
        paddingBottom: 3,
    },
    firstRow: {
        flexDirection: 'row',
    },
    countContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    countNumber: {
        fontSize: 16,
        color: '#6D6D72',
        fontWeight: '500',
    },
    countName: {
        fontSize: 10,
        color: '#6D6D72',
        marginLeft: 5,
        marginTop: 5,
    },
    separator: {
        height: 0.5,
        backgroundColor: '#CCCCDE',
        marginTop: 5,
        marginBottom: 7,
    },
    secondRow: {
        flexDirection: 'row',
    },
    regDate: {
        fontSize: 12,
        color: '#6D6D72',
    },
    regNumber: {
        flex: 1,
        fontSize: 12,
        color: '#6D6D72',
        textAlign: 'right',
    }
});

export default MetaInfo;
