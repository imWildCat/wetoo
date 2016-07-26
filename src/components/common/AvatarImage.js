import React, {Component, PropTypes} from 'react';
import {Image} from 'react-native';
import ImageSourcePropType from 'ImageSourcePropType';

import ImageUtilities from '../../utilities/image';

import AvatarPlaceholderImage from '../assets/avatar_placeholder.png';

class AvatarImage extends Component {
  static propTypes = {
    uri: PropTypes.string.isRequired,
  };

  state = {
    isLoaded: false,
  };

  render() {
    const { isLoaded, url } = this.state;
    if (isLoaded) {
      return (
        <Image {...this.props} source={{ uri: url }} />
      );
    } else {
      return (
        <Image {...this.props} source={AvatarPlaceholderImage} />
      );
    }
  }

  componentDidMount() {
    const { uri } = this.props;
    const url = ImageUtilities.handleAvatarImageURI(uri);
    Image.prefetch(url).then(() => {
      this.setState({ isLoaded: true, url });
    }, () => {
      console.log('cannot load avatar image:', url);
    });
  }

}

export default AvatarImage;
