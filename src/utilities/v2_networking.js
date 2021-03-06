import cheerio from 'cheerio';
import StringUtilities from './string';

let once = null;

class V2Networking {
  static get(uri) {
    return V2Networking.request('GET', uri);
  }

  static getJSON(uri) {
    return V2Networking.request('GET', uri, null, null, true);
  }

  static post(uri, data, additionalHeaders = null) {
    const headers = Object.assign({ 'Content-Type': 'application/x-www-form-urlencoded' }, additionalHeaders);
    return V2Networking.request(
      'POST',
      uri,
      headers,
      { body: serializeJSON2FormData(data) }
    );
  }

  static request(method, uri, additionalHeaders = null, additionalOptions = null, rawResponse = false) {
    // TODO: Check user's setting for http/https

    const headers = Object.assign({
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36',
      'Connection': 'keep-alive',
    }, additionalHeaders);

    const options = Object.assign({
      method,
      headers,
    }, additionalOptions);

    if (rawResponse) {
      return fetch(`https://www.v2ex.com${uri}`, options);
    } else {
      return fetch(`https://www.v2ex.com${uri}`, options).then(res => res.text()).then(text => cheerio.load(text, { decodeEntities: false }))
        .then($ => {
          parseOnce($);
          return $;
        });
    }
  }

  static getOnce() {
    return once;
  }
}

function serializeJSON2FormData(data) {
  return Object.keys(data).map(function (keyName) {
    return `${encodeURIComponent(keyName)}=${encodeURIComponent(data[keyName])}`;
  }).join('&');
}

function parseOnce($) {
  const logOutElement = $('a:contains("登出")');
  const onClick = logOutElement.attr('onclick');
  const tempOnce = StringUtilities.matchFirst(onClick, /signout\?once=(\d+)/);
  if (tempOnce) {
    once = tempOnce;
  }
  return tempOnce;
}

export default V2Networking;
