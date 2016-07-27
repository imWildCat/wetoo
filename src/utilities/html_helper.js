export default class HTMLHelper {

  static v2SocialElement2Object(element) {
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
  }

  static parsePagination($) {
    const currentPageSelector = '.page_current';
    if ($(currentPageSelector).length === 0) {
      return { currentPage: 1, lastPage: 1, allLoaded: true};
    }
    const currentPageElement = $(currentPageSelector).first();
    const currentPage = Number(currentPageElement.text());
    const lastPageElement = $(currentPageSelector).parent().find('a').last();
    const lastPage = Number(lastPageElement.text());
    console.log('[parsePagination] currentPage:', currentPage, ', lastPage:', lastPage);
    return { currentPage, lastPage, allLoaded: currentPage === lastPage };
  }

}
