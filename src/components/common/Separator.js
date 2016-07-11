import React, {Component, PropTypes} from 'react';
import {View} from 'react-native';

class Separator extends Component {
    render() {
        const { marginLeft } = this.props;
        let style = {
            marginLeft: 16,
            backgroundColor: '#CCCCDE',
            height: 0.5,
        };
        if (marginLeft) {
            style = [style, { marginLeft }];
        }
        return (
            <View style={style} />
        );
    }
}

Separator.propTypes = {
    marginLeft: PropTypes.number,
};

export default Separator;
