import React, {Component} from 'react';
import {View, Platform} from 'react-native';
import {Provider, connect} from 'react-redux';
import {Scene, Router} from 'react-native-router-flux';

import configureStore from '../store';

import Style from '../utilities/style';

import TabIcon from '../components/common/TabIcon';
import DiscoveryTabPageContainer from './DiscoveryTabPage';
import NotificationTabPage from '../components/pages/NotificationTab';
import MeTab from '../components/pages/MeTab';
import TopicPageContainer from './TopicPage';
import UserPageContainer from './UserPage';
import UserTopicPageContainer from './UserTopicPage';

import NodeListPage from '../components/pages/NodeList';
import NodePage from '../components/pages/Node';
import LoginPage from '../components/pages/Login';
import NewTopicPage from '../components/pages/NewTopic';

const store = configureStore();

const RouterWithRedux = connect()(Router);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux backButtonImage={require('../components/assets/back_icon.png')}>
          <Scene
            key="root"
            titleStyle={styles.titleStyle}
            navigationBarStyle={styles.navigationBarStyle}>
            <Scene key="tabbar" tabs={true} tabBarStyle={styles.tabBar}
                   navigationBarStyle={styles.navigationBarStyle}>
              <Scene key="discovery"
                     component={DiscoveryTabPageContainer}
                     titleStyle={styles.titleStyle}
                     navigationBarStyle={styles.navigationBarStyle}
                     icon={TabIcon}
                     initial={true}
                     title="Wetoo" />
              <Scene key="nodeList"
                     component={NodeListPage}
                     title="节点"
                     titleStyle={styles.titleStyle}
                     navigationBarStyle={styles.navigationBarStyle}
                     icon={TabIcon} />
              <Scene key="notification"
                     component={NotificationTabPage}
                     title="通知"
                     titleStyle={styles.titleStyle}
                     navigationBarStyle={styles.navigationBarStyle}
                     icon={TabIcon} />
              <Scene key="me"
                     component={MeTab}
                     title="我"
                     titleStyle={styles.titleStyle}
                     navigationBarStyle={styles.navigationBarStyle}
                     icon={TabIcon} />
            </Scene>
            <Scene key="topic" component={TopicPageContainer} title="阅读话题" />
            <Scene key="user" component={UserPageContainer} title="用户" />
            <Scene key="user_topic" component={UserTopicPageContainer} title="用户话题" />
            <Scene key="node" component={NodePage} title="节点" />
            <Scene key="login" component={LoginPage} direction="vertical" hideNavBar={true} />
            <Scene key="newTopic" component={NewTopicPage} title="创建话题" />
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}

const styles = Style.create({
  navigationBarStyle: {
    backgroundColor: '#329EED',
    borderBottomWidth: 0,
  },
  titleStyle: {
    color: '#FFFFFF'
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    android: {
      borderTopWidth: 0.5,
      borderTopColor: '#B2B2B2',
    },
    ios: {
      shadowColor: '#B2B2B2',
      shadowOffset: {
        width: 0,
        height: -0.5,
      },
      shadowOpacity: 1,
      shadowRadius: 0,
    }
  },
});

export default App;
