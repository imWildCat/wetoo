import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableWithoutFeedback} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import Style from '../../../utilities/style';

import PageContainer from '../../common/PageContainer';
import ActionRow from './ActionRow';

import SettingIcon from '../../assets/setting_icon.png';

class MeTab extends Component {
  static defaultProps = {};
  static propTypes = {};
  static state = {};

  constructor(props) {
    super(props);

    this.onLoginPress = this.onLoginPress.bind(this);
    this.onSettingPress = this.onSettingPress.bind(this);
  }

  render() {
    return (
      <PageContainer isTab={true}>
        <ScrollView style={styles.wrapper}>
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
        </ScrollView>
      </PageContainer>
    );
  }

  onLoginPress() {
    Actions.login();
  }

  onSettingPress() {
    console.log('press');
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
