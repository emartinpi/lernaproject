import { darwinHttpFactory, addProvider } from '@monorepo/http';
import { pipe } from 'ramda';
import axios from 'axios';

// const httpApi = darwinHttpFactory();

// const darwinHttp1 = addProviderCurrified(axios)(darwinHttpFactory);
// const darwinHttp2 = configHeadersCurrified({
//   'X-Requested-With': 'DarwinXMLHttpRequest',
// })(darwinHttp1);

// const allFactoryConfig = pipe(
//   addProvider(axios),
//   configHeaders({ 'X-Requested-With': 'DarwinXMLHttpRequest' }),
//   configToken('https://accounts.spotify.com/api/token', {
//     id: '6aa367588666404db1162e5ba087998d',
//     secret: '2b6f5eef0cb54ea496a1710ff743bcd7',
//   }) // tslint:disable-line
// );

// const factoryBuilder = allFactoryConfig(darwinHttpFactory);
// const httpApi = factoryBuilder();

// httpApi.get('/users');

(async () => {

  // const httpApi1 =  darwinHttpFactory();

  const factory1 = await addProvider(axios, darwinHttpFactory);

  const httpApi = factory1();
  httpApi.get('/user');
})();
