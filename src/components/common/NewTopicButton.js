import React, {Component, PropTypes} from 'react';
import {View, Text, Image} from 'react-native';

import Style from '../../utilities/style';
import NewTopicIconImg from '../assets/new_topic_icon.png';

class NewTopicButton extends Component {
  static defaultProps = {};
  static propTypes = {
    onPress: PropTypes.func.isRequired
  };
  state = {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Image style={styles.image} source={NewTopicIconImg} />
      </View>
    );
  }

}

const styles = Style.create({
  image: {
    width: 25,
    height: 25,
  }
});


export default NewTopicButton;
