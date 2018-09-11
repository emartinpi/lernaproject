import {
  darwinHttpFactory,
  addProvider, configHeaders, configToken,
  addProviderCurrified, configHeadersCurrified, configTokenCurrified, HttpApi } from '@monorepo/http';
import { pipe, pipeP } from 'ramda';

(async () => {
  const fecthApi: HttpApi<Promise<any>> = {
    get(url: string, config: any = {}) {
      const { headers } = config;
      return fetch(url, {
        headers,
        method: 'GET',
      }).then((res) => {
        return res.json();
      }).catch((err) => {
        return err;
      });
    },
    post(url: string, data: any, config?: any) {
      const { headers } = config;
      return fetch(url, {
        headers,
        method: 'POST',
        body: typeof data === 'string' ? data : JSON.stringify(data),
      }).then((res) => {
        return res.json();
      }).catch((err) => {
        return err;
      });
    },
  };

  const darwinBuilderFactoryCofigured = pipeP(
    addProviderCurrified(fecthApi),
    configHeadersCurrified({ 'X-Requested-With': 'DarwinXMLHttpRequest-X' }),
    configTokenCurrified('https://accounts.spotify.com/api/token',
                         { id: '6aa367588666404db1162e5ba087998d', secret: '2b6f5eef0cb54ea496a1710ff743bcd7' }),
  );

  const darwinHttpFactoryConfigured = await darwinBuilderFactoryCofigured(darwinHttpFactory);
  const darwinApi = darwinHttpFactoryConfigured();

  const res = await darwinApi.get('https://api.spotify.com/v1/browse/featured-playlists');

  // const res = await fecthApi.get('https://www.googleapis.com/books/v1/volumes?q=java', {
  //   headers: { 'X-Requested-With': 'DarwinXMLHttpRequest-X' },
  // });

  console.log(res);

})();
