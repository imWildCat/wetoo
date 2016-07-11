import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Style from '../../utilities/style';

class PageContainer extends Component {
    render() {
        const {style, ...otherProps} = this.props;
        return (
            <View style={[style, styles.container]} {...otherProps}>
                {this.props.children}
            </View>
        );
    }
}

const styles = Style.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        overflow: 'hidden',
        ios: {
            paddingTop: 64,
        },
        android: {
            paddingTop: 54,
        },
    }
});

export default PageContainer;
