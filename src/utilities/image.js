const ImageUtilities = {

  handleImageURI: (uri) => {
    if (uri.indexOf('//') === 0) {
      return `https:${uri}`;
    }
    return uri;
  },

  handleTopicImageURI: (uri) => {
    return ImageUtilities.handleImageURI(uri);
  },

  handleAvatarImageURI: (uri) => {
    return ImageUtilities.handleImageURI(uri);
  },

};

export default ImageUtilities;
