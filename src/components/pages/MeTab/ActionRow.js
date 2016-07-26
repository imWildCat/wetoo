import React, {Component, PropTypes} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Style from '../../../utilities/style';

import Separator from '../../common/Separator';

class ActionRow extends Component {
  static defaultProps = {
    showSeparator: true,
  };
  static propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    iconImage: PropTypes.any.isRequired,
    showSeparator: PropTypes.bool,
  };
  static state = {};

  constructor(props) {
    super(props);
  }

  render() {
    const { title, onPress, iconImage, showSeparator } = this.props;
    let separator = showSeparator ? <Separator marginLeft={47} /> : null;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.innerContainer} onPress={onPress}>
          <Image style={styles.iconImage} source={iconImage} />
          <Text style={styles.titleText}>{title}</Text>
          <View style={styles.rightArrowContainer}>
            <Icon style={styles.rightArrow} name="chevron-right" size={13} color="#CCCCDE" />
          </View>
        </TouchableOpacity>
        {separator}
      </View>
    );
  }

}

const styles = Style.create({
  container: {
    height: 44,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconImage: {
    width: 23,
    height: 23,
    marginLeft: 10,
  },
  titleText: {
    marginLeft: 13,
    color: '#333333',
    fontSize: 16,
  },
  rightArrowContainer: {
    marginTop: 2,
    flex: 1,
  },
  rightArrow: {
    width: 8,
    height: 13,
    alignSelf: 'flex-end',
    marginRight: 16,
  },
});


export default ActionRow;
