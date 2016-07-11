import cheerio from 'cheerio';

const V2Networking = {
    get: (uri, otherConfig = {}) => {
        return V2Networking.request('GET', uri, otherConfig);
    },
    request: (method, uri, otherConfig = {}) => {
        // TODO: Check user's setting for http/https
        return fetch(`https://www.v2ex.com/${uri}`, {
            method: method,
            headers: {
                'Accept': 'text/html',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36'
            }
        }, ...otherConfig).then(res => res.text()).then(text => cheerio.load(text, { decodeEntities: false }));
    }
};

export default V2Networking;
