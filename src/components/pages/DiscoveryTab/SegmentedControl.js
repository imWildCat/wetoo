import React, {Component, PropTypes} from 'react';
import {Animated, ScrollView, StyleSheet, View} from 'react-native';

import SegmentedControlButton from './SegmentedControlButton';

class SegmentedControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            indicatorLeft: new Animated.Value(5)
        };
    }

    _renderButtons() {
        const buttons = [];
        for (var i = 0; i < this.props.buttonTitles.length; i++) {
            var title = this.props.buttonTitles[i];
            const index = i; // Copy the value of i.
            buttons.push(
                <SegmentedControlButton key={`button_${i}`} text={title} onPress={() => {
                    this._indicatorAnimate(index);
                    this.props.onPress(index);
                }} />
            );
        }
        return buttons;
    }

    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                <ScrollView
                    style={styles.horizontalScrollView}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {this._renderButtons()}
                    <Animated.View style={[styles.indicator, { left: this.state.indicatorLeft }]} />
                </ScrollView>
            </View>
        );
    }

    _indicatorAnimate(index) {
        Animated.timing(
            this.state.indicatorLeft,
            {
                toValue: 5 + 10 * index + 58 * index,
                duration: 250,
            }
        ).start();
    }

    setIndex(index) {
        this._indicatorAnimate(index);
    }

}

SegmentedControl.propTypes = {
    onPress: PropTypes.func.isRequired,
    buttonTitles: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
    container: {
        height: 37,
    },
    indicator: {
        width: 58,
        height: 2,
        backgroundColor: '#1992F5',
        position: 'absolute',
        top: 35,
    },
    horizontalScrollView: {
        flex: 1,
    },
});

export default SegmentedControl;
