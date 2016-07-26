import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableWithoutFeedback} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import SessionManager from '../../../utilities/session_manager';
import Style from '../../../utilities/style';
import Networking from '../../../utilities/v2_networking';

import PageContainer from '../../common/PageContainer';
import ActionRow from './ActionRow';
import AvatarImage from '../../common/AvatarImage';

import SettingIcon from '../../assets/setting_icon.png';
import LogOutIcon from '../../assets/signout_icon.png';

class MeTab extends Component {
  state = { user: null };

  constructor(props) {
    super(props);

    this.onLoginPress = this.onLoginPress.bind(this);
    this.onLogOutPress = this.onLogOutPress.bind(this);
    this.onSettingPress = this.onSettingPress.bind(this);
    this.renderLoggedIn = this.renderLoggedIn.bind(this);
    this.renderNotLoggedIn = this.renderNotLoggedIn.bind(this);
  }

  componentDidMount() {
    SessionManager.listenToStatusChanged((user) => {
      console.log('listenToStatusChanged:', user);
      this.loadCurrentUser(user)
    });

    this.loadCurrentUser(SessionManager.getCurrentUser());
  }

  render() {
    return (
      <PageContainer isTab={true}>
        <ScrollView style={styles.wrapper}>
          {!this.state.user ? this.renderNotLoggedIn() : this.renderLoggedIn()}
        </ScrollView>
      </PageContainer>
    );
  }

  renderNotLoggedIn() {
    return (
      <View>
        <TouchableWithoutFeedback onPress={this.onLoginPress}>
          <View style={styles.topBox}>
            <View style={styles.emptyAvatar} />
            <Text style={styles.usernameText}>尚未登录，请登录</Text>
            <View style={styles.rightArrowContainer}>
              <Icon style={styles.rightArrow} name="chevron-right" size={13} color="#CCCCDE" />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.bottomBox}>
          <ActionRow showSeparator={false} title="设置" onPress={this.onSettingPress} iconImage={SettingIcon} />
        </View>
      </View>
    );
  }

  renderLoggedIn() {
    const {name, avatarURI} = this.state.user;
    console.log('avatarURI:', avatarURI, name, this);
    return (
      <View>
          <View style={styles.topBox}>
            <View style={styles.emptyAvatar}>
              <AvatarImage uri={avatarURI} style={styles.avatarImage} />
            </View>
            <Text style={styles.usernameText}>{name}</Text>
          </View>
        <View style={styles.bottomBox}>
          <ActionRow title="设置" onPress={this.onSettingPress} iconImage={SettingIcon} />
          <ActionRow showSeparator={false} title="注销" onPress={this.onLogOutPress} iconImage={LogOutIcon} />
        </View>
      </View>
    );
  }

  onLoginPress() {
    Actions.login();
  }

  onSettingPress() {
    console.log('press');
  }

  onLogOutPress() {
    SessionManager.logOut().then(res => {
      console.log('log out succeed:', res);
    }, err => {
      console.log('log out err:', err);
    });
  }

  async loadCurrentUser(user) {
    if (!user) {
      this.setState({user});
    } else {
      const { name } = user;
      try {
        const $ = await Networking.get(`/member/${name}`);
        const avatarURI = $('img.avatar').attr('src');
        user.avatarURI = avatarURI;
        console.log('user:', user);
        this.setState({user});
      } catch (error) {
        console.log('error:', error);
      }
    }
  }

}

const styles = Style.create({
  wrapper: {
    backgroundColor: '#F1F1F5',
    flex: 1,
  },

  topBox: {
    height: 75,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    flexDirection: 'row',
  },
  emptyAvatar: {
    width: 55,
    height: 55,
    backgroundColor: '#F1F1F5',
    borderRadius: 55,
    marginLeft: 12,
    overflow: 'hidden',
  },
  avatarImage: {
    width: 55,
    height: 55,
  },
  usernameText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333333',
  },
  rightArrowContainer: {
    flex: 1,
  },
  rightArrow: {
    width: 8,
    height: 13,
    alignSelf: 'flex-end',
    marginRight: 16,
    marginTop: 2,
  },

  bottomBox: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
  }
});

export default MeTab;
