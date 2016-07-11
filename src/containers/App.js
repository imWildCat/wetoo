import React, {Component} from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Provider, connect } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';

import configureStore from '../store';

import DiscoveryTabPageContainer from './DiscoveryTabPage';
import TopicPageContainer from './TopicPage';
import UserPageContainer from './UserPage';
import UserTopicPageContainer from './UserTopicPage';

const store = configureStore();

const RouterWithRedux = connect()(Router);

const styles = StyleSheet.create({
    navigationBarStyle: {
        backgroundColor: '#329EED',
    },
    titleStyle: {
        color: '#FFFFFF'
    }
});

const wrapperStyle = {
    paddingTop: 64,
    backgroundColor: '#FFFFFF',
    flex: 1,
    overflow: 'hidden',
};

const pageWrapper = (Com) => {
    let style = wrapperStyle;
    if (Platform.os === 'android') {
        style = [style, { paddingTop: 30 }];
    }
    return (props) => <View style={style}><Com {...props} /></View>;
};

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RouterWithRedux backButtonImage={require('../components/assets/back_icon.png')}>
                    <Scene
                        key="root"
                        titleStyle={styles.titleStyle}
                        navigationBarStyle={styles.navigationBarStyle}>
                        <Scene key="discovery_tab" component={pageWrapper(DiscoveryTabPageContainer)} title="Wetoo" />
                        <Scene key="topic" component={pageWrapper(TopicPageContainer)} title="阅读话题" />
                        <Scene key="user" component={pageWrapper(UserPageContainer)} title="用户" />
                        <Scene key="user_topic" component={pageWrapper(UserTopicPageContainer)} title="用户话题" />
                    </Scene>
                </RouterWithRedux>
            </Provider>
        );
    }
}

export default App;
