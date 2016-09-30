import React, {Component, PropTypes} from 'react';
import {View, Text, TextInput, ActivityIndicator, Alert} from 'react-native';
import Button from 'react-native-button';

import Style from '../../../utilities/style';
import Networking from '../../../utilities/v2_networking';

class ReplyInput extends Component {
  static defaultProps = {};
  static propTypes = {
    topicID: PropTypes.number.isRequired,
    onReplySucceed: PropTypes.func.isRequired,
  };
  state = {
    content: '',
    isSubmitting: false,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { isSubmitting } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextInput
            multiline={true}
            underlineColorAndroid="transparent" style={styles.textInput}
            onChangeText={content => this.setState({ content })} />
        </View>
        {isSubmitting ? <ActivityIndicator style={styles.replyButton} /> : <Button
          onPress={this.onSubmit} containerStyle={styles.replyButton} style={styles.replyButtonText}>回复</Button>}
      </View>
    );
  }

  onSubmitProcessing = () => {
    this.setState({ isSubmitting: true });
  };

  onSubmitEnd = () => {
    this.setState({ isSubmitting: false });
  };

  onSubmit = async() => {
    const { content } = this.state;
    if (!content || content.length < 1) {
      Alert.alert('回复失败', '内容不能为空');
    }
    this.onSubmitProcessing();
    try {
      const $ = await Networking.post(`/t/${this.props.topicID}`, {
        content,
        once: Networking.getOnce(),
      });
      const problemMessage = $('.problem ul li').text();
      if (problemMessage) {
        Alert.alert('回复失败', problemMessage);
      } else {
        this.props.onReplySucceed($);
      }
    } catch (error) {
      alert(error);
    } finally {
      this.onSubmitEnd();
    }
  };

}

const styles = Style.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderTopColor: '#CCCCDE',
    borderTopWidth: 1,
    paddingLeft: 12,
    paddingRight: 12,
  },
  inputWrapper: {
    flex: 1,
    height: 32,
    justifyContent: 'center',
    borderColor: '#CCCCDE',
    borderWidth: 1,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    height: 28,
    fontSize: 15,
    marginLeft: 5,
    marginRight: 5,
    android: {
      height: 32,
      fontSize: 11,
    },
  },
  replyButton: {
    marginLeft: 10,
  },
  replyButtonText: {
    fontSize: 15,
  },
});


export default ReplyInput;
