import React, {PropTypes} from 'react';
import {
  Image,
  Dimensions,
  Platform,
} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

var baseStyle = {
  backgroundColor: 'transparent',
};

var ResizableImage = React.createClass({
  getInitialState: function () {
    return {
      width: this.props.style.width || 0,
      height: this.props.style.height || 0,
    };
  },
  componentDidMount: function () {
    //avoid repaint if width/height is given
    if (this.props.style.width || this.props.style.height) {
      return;
    }
    Image.getSize(this.props.source.uri, (w, h) => {
      this.setState({ width: w, height: h });
    });

  },
  render: function () {
    var finalSize = {};
    const maxImageWidth = this.props.maxWidth || screenWidth;
    console.log({ maxImageWidth, });
    if (this.state.width > maxImageWidth) {
      finalSize.width = maxImageWidth;
      var ratio = this.state.width / this.state.height;
      console.log({ ratio });
      finalSize.height = Math.floor(maxImageWidth / ratio);
    }
    var style = Object.assign(baseStyle, this.props.style, this.state, finalSize);
    var source = Object.assign({}, this.props.source, this.state);
    console.log({ style, source });

    return (
      <Image
        resizeMode="cover"
        style={style}
        source={source} />
    );
  }
});

ResizableImage.propTypes = {
  maxWidth: PropTypes.number,
};

export default ResizableImage;
