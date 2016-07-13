const StringUtilities = {
  matchFirstOrNull: (str, regex) => {
    if (!str) {
      return null;
    } else {
      const match = str.match(regex);
      if (match && match.length > 0) {
        return match[1];
      } else {
        return null;
      }
    }
  },
  betterV2TimeString: (str) => {
    if (!str) {
      return null;
    } else {
      return str.replace(/(前)|(via .+)/g, '').trim();
    }
  },
};

export default StringUtilities;
