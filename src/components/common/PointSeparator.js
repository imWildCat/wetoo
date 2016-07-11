import React, {Component, PropTypes} from 'react';
import {View} from 'react-native';

class PointSeparator extends Component {
    render() {
        let style = {
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: '#B0B0B3',
        };
        return (
            <View style={[style, this.props.style]} />
        );
    }
}

PointSeparator.propTypes = {
    style: PropTypes.node,
};

export default PointSeparator;
