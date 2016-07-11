import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, Image, TouchableHighlight} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class UserInfoRow extends Component {
    render() {
        const {text, onPress} = this.props;
        return (
            <TouchableHighlight underlayColor="#E6E6E6" onPress={onPress}>
                <View>
                    <View style={styles.container}>
                        <Image style={styles.rowIcon} source={this._getImage()} />
                        <Text style={styles.buttonText}>{text}</Text>
                        <View style={styles.rightArrowContainer}>
                            <Icon style={styles.rightArrow} name="chevron-right" size={13} color="#CCCCDE" />
                        </View>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
        );
    }

    _getImage() {
        switch (this.props.rowType) {
            case 'topic':
                return require('../../assets/topic_icon.png');
            case 'reply':
                return require('../../assets/reply_icon.png');
            case 'github':
                return require('../../assets/github_icon.png');
            case 'twitter':
                return require('../../assets/twitter_icon.png');
            case 'instagram':
                return require('../../assets/instagram_icon.png');
            case 'dribbble':
                return require('../../assets/dribbble_icon.png');
            default:
                return require('../../assets/topic_icon.png');
        }
    }
}

UserInfoRow.propTypes = {
    text: PropTypes.string.isRequired,
    rowType: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingLeft: 16,
        flexDirection: 'row',
        height: 44,
        alignItems: 'center',
        flex: 1,
    },
    rowIcon: {
        width: 23,
        height: 23,
    },
    buttonText: {
        fontSize: 16,
        color: '#333333',
        marginLeft: 13,
    },
    rightArrowContainer: {
        flex: 1,
    },
    rightArrow: {
        width: 8,
        height: 13,
        alignSelf: 'flex-end',
        marginRight: 16,
    },
    separator: {
        marginLeft: 50,
        backgroundColor: '#CCCCDE',
        height: 0.5,
    }
});

export default UserInfoRow;
