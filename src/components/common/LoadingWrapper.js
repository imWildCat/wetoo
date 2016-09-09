import React, {Component, PropTypes} from 'react';
import {View, ActivityIndicator} from 'react-native';

import Style from '../../utilities/style';

class LoadingWrapper extends Component {
  render() {
    const { isLoading, renderContent } = this.props;
    return (
      <View {...this.props}>
        {isLoading ? <ActivityIndicator style={styles.indicator} /> : renderContent()}
      </View>
    );
  }
}

LoadingWrapper.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  renderContent: PropTypes.func.isRequired,
};

const styles = Style.create({
  indicator: {
    marginTop: 20,
  },
});


export default LoadingWrapper;
