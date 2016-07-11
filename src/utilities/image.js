const ImageUtilities = {

    handleImageURI: (uri) => {
        if (uri.startsWith('//cdn.v2ex.co')) {
            return `https:${uri}`;
        } else if (uri.startsWith('//')) {
            return `http:${uri}`;
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
