import React, {Component, PropTypes} from 'react';
import {ScrollView, StyleSheet, View, Image, Text, ActivityIndicator} from 'react-native';
import cheerio from 'cheerio';

import StringUtilities from '../../../utilities/string';
import ImageUtilities from '../../../utilities/image';
import HTMLHelper from '../../../utilities/html_helper';

import MetaInfo from './MetaInfo';
import UserInfoRow from './UserInfoRow';

class UserPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
        };
    }

    componentDidMount() {
        this._loadUser();
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {this._renderContent()}
            </ScrollView>
        );
    }

    _renderContent() {
        if (!this.state.username) {
            return <ActivityIndicator />;
        } else {
            const {
                username, signature, company, position, avatarURI,
                github, twitter, dribbble, instagram,
            } = this.state;
            const avatarURL = ImageUtilities.handleAvatarImageURI(avatarURI);
            return (
                <View>
                    <View style={styles.primaryInfoContainer}>
                        <View style={styles.primaryInfoInnerContainer}>
                            <Image style={styles.avatarImage} source={{ uri: avatarURL }} />
                            <MetaInfo {...this.state} />
                        </View>
                        {this._renderSignatureCompanyPosition(signature, company, position)}
                    </View>
                    <View style={styles.sectionGroup}>
                        <UserInfoRow text="话题" rowType="topic" onPress={() => { this.props.pushUserTopicPage(username) }} />
                        <UserInfoRow text="回复" rowType="reply" onPress={() => {}} />
                    </View>
                </View>
            );
        }
    }

    _renderSignatureCompanyPosition(signature, company, position) {
        const elements = [];
        if (company && position) {
            elements.push(<Text style={styles.otherText} key="company">{position} @ {company}</Text>);
        } else if (company || position) {
            elements.push(<Text style={styles.otherText} key="company">{position}{company}</Text>);
        }
        if (signature) {
            elements.push(<Text style={styles.otherText} key="singature">"{signature}"</Text>);
        }
        return elements;
    }

    _loadUser() {
        const uname = this.props.username;
        fetch(`https://www.v2ex.com/member/${uname}`, {
            headers: {
                'Accept': 'text/html',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36'
            }
        })
            .then(res => res.text())
            .then(text => {
                const $ = cheerio.load(text, { decodeEntities: false });

                const username = $('#Main .box .cell table tr td h1').text();
                let signature = $('#Main .box .cell tr td span.bigger').text();
                if (!signature || signature === '') {
                    signature = null;
                }
                const _companyAndPosition = $('.fa-building').parent().text();
                let company = $('.fa-building').parent().find('strong').html();
                let position = _companyAndPosition;
                if (company && company !== '') {
                    position = _companyAndPosition.replace(company, '');
                    company = company.replace('&nbsp;', '');
                }
                position = position.replace('&nbsp;', '').trim();
                if (position === '') {
                    position = null;
                }
                const avatarURI = $('#Main .box .cell table tr td img.avatar').attr('src');
                const _numberAndDateElementText = $('#Main .fa-time').parent().text();
                const num = Number(StringUtilities.matchFirstOrNull(_numberAndDateElementText, /第 (\d+) 号会员/));
                let regDate = StringUtilities.matchFirstOrNull(_numberAndDateElementText, /(\d{4}-\d{2}-\d{2})/);
                if (regDate) {
                    regDate = regDate.replace(/(\-0)|(\-)/g, '.');
                }
                const liveness = Number(StringUtilities.matchFirstOrNull(_numberAndDateElementText, /今日活跃度排名 (\d+)/));

                // Social
                const getSocialElement = (socialMediaName) => {
                    return $(`img[alt="${socialMediaName}"]`).parent();
                };

                let github, twitter, dribbble, instagram;
                github = HTMLHelper.v2SocialElement2Object(getSocialElement('GitHub'));
                twitter = HTMLHelper.v2SocialElement2Object(getSocialElement('Twitter'));
                dribbble = HTMLHelper.v2SocialElement2Object(getSocialElement('Dribbble'));
                instagram = HTMLHelper.v2SocialElement2Object(getSocialElement('Instagram'));

                console.log({
                    username, signature, company, position,
                    avatarURI, num, regDate, liveness,
                    github, twitter, dribbble, instagram,
                });
                this.setState({
                    username, signature, company, position,
                    avatarURI, num, regDate, liveness,
                    github, twitter, dribbble, instagram,
                });
            });
    }
}

UserPage.propTypes = {
    username: PropTypes.string.isRequired,
    pushUserTopicPage: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFF4',
    },
    primaryInfoContainer: {
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#D3D2D3',
        padding: 10,
        paddingLeft: 16,
        paddingRight: 16,
    },
    primaryInfoInnerContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    avatarImage: {
        width: 55,
        height: 55,
        borderRadius: 5,
    },
    otherText: {
        marginTop: 8,
        fontSize: 14,
        color: '#6D6D72',
    },
    sectionGroup: {
        backgroundColor: '#FFFFFF',
        marginTop: 20,
        paddingBottom: -1,
    }
});

export default UserPage;
