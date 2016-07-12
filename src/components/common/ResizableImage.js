import React, {PropTypes} from 'react';
import {
  Image,
  Dimensions,
} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

var baseStyle = {
  backgroundColor: 'red',
};

var ResizableImage = React.createClass({
  getInitialState: function () {
    return {
      width: this.props.style.width || 0,
      height: this.props.style.height || 0,
    };
  },
  componentDidMount: function () {
    if (this.props.style.width || this.props.style.height) {
      return;
    }
    Image.getSize(this.props.source.uri, (w, h) => {
      console.log(`Image[${this.props.source.uri}]: width:`, w, 'height:', h);
      this.setState({ width: w, height: h });
    });
  },
  render: function () {
    var finalSize = {};
    const maxImageWidth = Math.floor(this.props.maxWidth || screenWidth);
    if (this.state.width > maxImageWidth) {
      finalSize.width = maxImageWidth;
      var ratio = this.state.width / this.state.height;
      console.log({ ratio });
      finalSize.height = Math.floor(maxImageWidth / ratio);
      console.log('finalSize:', finalSize);
    }
    var style = Object.assign(baseStyle, this.props.style, this.state, finalSize);
    var source = Object.assign({}, this.props.source, this.state);

    return (
      <Image
        key={`image_${this.props.uri}_w[${this.state.width}]_h[${this.state.height}]`}
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
