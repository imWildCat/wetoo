import React, {Component, PropTypes} from 'react';
import {View, Text, TextInput, LayoutAnimation} from 'react-native';
import Button from 'react-native-button';

import Style from '../../utilities/style';

class ListViewSearchBar extends Component {
  static propTypes = {
    onChangeText: PropTypes.func,
    onSubmitText: PropTypes.func,
    onCancel: PropTypes.func,
  };

  state = {
    text: null,
    active: false,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          ref="input"
          style={styles.textInput}
          returnKeyType="search"
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitEditing}
          onFocus={this.onFocus}
          value={this.state.text}
          clearButtonMode="always"
          underlineColorAndroid="transparent"
          placeholder="搜索..." />
        {this.state.active ? <Button style={[styles.cancelButton]} onPress={this.onCancel}>取消</Button> : null}
      </View>
    );
  }

  onChangeText = (text) => {
    this.setState({ text });

    if(!text || text.length === 0) {
      this.onCancel();
      return;
    }

    const { onChangeText } = this.props;
    onChangeText && onChangeText(text);
  };

  onSubmitEditing = (event) => {
    const text = event.nativeEvent.text;

    const { onSubmitText } = this.props;
    onSubmitText && onSubmitText(text);
  };

  getText() {
    return this.state.text;
  }

  // Animation

  componentWillMount() {

  }

  onFocus = () => {
    LayoutAnimation.easeInEaseOut();
    this.setState({ active: true });
  };

  onBlur = () => {
    const { onSubmitText } = this.props;
    onSubmitText && onSubmitText(this.state.text);
  };

  onCancel = () => {
    LayoutAnimation.easeInEaseOut();
    this.refs.input.clear();
    this.setState({ active: false, text: '' });
    this.props.onCancel();
  };

}

const styles = Style.create({
  container: {
    height: 44,
    backgroundColor: '#FFFFFF',
    padding: 7,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    height: 30,
    backgroundColor: '#E1E2E4',
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    zIndex: 1,
  },
  cancelButton: {
    overflow: 'hidden',
    marginLeft: 12,
    fontSize: 13,
    zIndex: 99,
  }
});


export default ListViewSearchBar;
