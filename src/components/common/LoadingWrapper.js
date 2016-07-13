import React, {Component, PropTypes} from 'react';
import {View, ActivityIndicator} from 'react-native';

class LoadingWrapper extends Component {
  render() {
    const { isLoading, renderContent } = this.props;
    return (
      <View {...this.props}>
        {isLoading ? <ActivityIndicator /> : renderContent()}
      </View>
    );
  }
}

LoadingWrapper.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  renderContent: PropTypes.func.isRequired,
};

export default LoadingWrapper;
