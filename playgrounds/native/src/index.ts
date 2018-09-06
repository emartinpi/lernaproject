import { darwinHttpFactory, addProvider, configHeaders, configToken } from '@monorepo/http';
import { pipe, pipeP } from 'ramda';
import axios from 'axios';

(async () => {
  const darwinHttpFactoryBuilder = pipeP(
    addProvider(axios),
    // configHeaders({ 'X-Requested-With': 'DarwinXMLHttpRequest-X' }),
    configToken('https://accounts.spotify.com/api/token', {
      id: '6aa367588666404db1162e5ba087998d',
      secret: '2b6f5eef0cb54ea496a1710ff743bcd7',
    }),
  );

  const darwinHttpFactoryConfigured = await darwinHttpFactoryBuilder(darwinHttpFactory);
  const httpApi = darwinHttpFactoryConfigured();
  const playlist = await httpApi.get('https://api.spotify.com/v1/browse/featured-playlists');
  console.log(playlist.data);

  const darwinHttpFactoryBuilder2 =
  await configHeaders({ 'Y-Requested-With': 'DarwinXMLHttpRequest-Y' }, darwinHttpFactoryConfigured);

  const httpApi2 = darwinHttpFactoryBuilder2();
  httpApi2.get('/user');
})();
