const HTMLHelper = {
  v2SocialElement2Object: (element) => {
    if (element) {
      const name = element.text().trim().replace('&nbsp;', '');
      const link = element.attr('href');
      if (!link) {
        return null;
      }
      return { name, link };
    } else {
      return null;
    }
  },
};

export default HTMLHelper;
