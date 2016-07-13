import React, { Component } from 'react';
import moment from 'moment';
moment.locale('zh-cn');

import App from './containers/App';

export default class Application extends Component {
  render() {
    return (
      <App />
    );
  }
}
