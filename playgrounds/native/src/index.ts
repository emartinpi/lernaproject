import { Observable } from 'rxjs';
import {
  darwinHttpFactory,
  addProvider, configHeaders, configToken,
  addProviderCurrified, configHeadersCurrified, configTokenCurrified } from '@monorepo/http';
import { pipe, pipeP } from 'ramda';
import axios, { AxiosResponse } from 'axios';

(async () => {
  /**
   * EJEMPLO SIN CURRIFICACION
   */

  /** API EN FORMATO OBSERVABLE */
  const httpClint = {
    get(url: string, config?: any): Observable<any> { return new Observable(() => {}); },
    post(url: string, data: any, config?: any): Observable<any> { return new Observable(() => {}); },
  };

  const factory1 = await addProvider(axios, darwinHttpFactory);

  const factory2 = await configHeaders({ 'X-Requested-With': 'DarwinXMLHttpRequest-X' }, factory1);

  const factory3 = await configToken('https://accounts.spotify.com/api/token',
                                     { id: '6aa367588666404db1162e5ba087998d', secret: '2b6f5eef0cb54ea496a1710ff743bcd7' },
                                     factory2);

  const httpApi = factory3();
  const playlist = httpApi.get('https://api.spotify.com/v1/browse/featured-playlists').then((res) => {
    console.log(res.data);
  });

  /**
   * EJEMPLO CON CURRIFICACION
   */

  // const darwinHttpFactoryBuilder = pipeP(
  //   addProviderCurrified(axios),
  //   configHeadersCurrified({ 'X-Requested-With': 'DarwinXMLHttpRequest-X' }),
  //   configTokenCurrified('https://accounts.spotify.com/api/token', {
  //     id: '6aa367588666404db1162e5ba087998d',
  //     secret: '2b6f5eef0cb54ea496a1710ff743bcd7',
  //   }),
  // );

  // const darwinHttpFactoryConfigured1 = await darwinHttpFactoryBuilder(darwinHttpFactory);
  // const httpApi = darwinHttpFactoryConfigured1();
  // const playlist = httpApi.get('https://api.spotify.com/v1/browse/featured-playlists').then((res: AxiosResponse) => {
  //   console.log(res.data);
  // });

  // const darwinHttpFactoryConfigured2 = await configHeaders({ 'Y-Requested-With': 'DarwinXMLHttpRequest-Y' }, darwinHttpFactoryConfigured1);

  // const httpApi2 = darwinHttpFactoryConfigured2();
  // httpApi2.get('/user');
})();
