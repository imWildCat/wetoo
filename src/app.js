import React, { Component } from 'react';
import moment from 'moment';
moment.locale('zh-cn');

import HotUpdate from './utilities/hot_update';
import App from './containers/App';

export default class Application extends Component {
  render() {
    return (
      <App />
    );
  }

  componentWillMount() {
    HotUpdate.listenToAppState();
  }

  componentDidMount() {
    HotUpdate.sync();
  }

  componentWillUnmount() {
    HotUpdate.unlistenToAppState();
  }
}
