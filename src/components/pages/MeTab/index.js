import React, {Component} from 'react';
import {View, Text} from 'react-native';

import PageContainer from '../../common/PageContainer';

class MeTab extends Component {
  static defaultProps = {};
  static propTypes = {};
  static state = {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PageContainer isTab={true}>
        <Text>Me Tab</Text>
      </PageContainer>
    );
  }

}

export default MeTab;
