import React, {PropTypes, Component} from 'react';
import {
  Image,
  Dimensions,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

var baseStyle = {
  backgroundColor: 'red',
};

class ResizableImage extends Component {

  static propTypes = {
    maxWidth: PropTypes.number,
  };

  state = {
    width: this.props.style.width || 0,
    height: this.props.style.height || 0,
  };

  componentDidMount() {
    if (this.props.style.width || this.props.style.height) {
      return;
    }
    Image.getSize(this.props.source.uri, (w, h) => {
      console.log(`Image[${this.props.source.uri}]: width:`, w, 'height:', h);
      this.setState({ width: w, height: h });
    }, error => {
      console.log('Error while getting size of image:', error);
    });
  }

  render() {
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
    console.log('key:', `image_${source.uri}_w[${this.state.width}]_h[${this.state.height}]`);
    return (
      <Image
        key={`image_${source.uri}_w[${this.state.width}]_h[${this.state.height}]`}
        resizeMode="cover"
        style={style}
        source={source} />
    );
  }
}


export default ResizableImage;
