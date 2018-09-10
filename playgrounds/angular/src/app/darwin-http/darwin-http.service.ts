import { HttpApi } from './../../../../../packages/http/dist/http.d';
import { DarwinHttpModuleConfig } from './types';
import { HttpClient } from '@angular/common/http';
import { darwinHttpFactory, addProviderCurrified, configHeadersCurrified, configTokenCurrified } from '@monorepo/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pipeP } from 'ramda';

@Injectable()
export class DarwinHttpConfigService {
  private _api: HttpApi<Observable<any>>;

  constructor() {
  }

  async darwinHttpClientConfig(http: HttpClient, config: DarwinHttpModuleConfig) {
    const darwinHttpFactoryBuilder = pipeP(
      addProviderCurrified(http),
      configHeadersCurrified({'X-Requested-With': 'DarwinXMLHttpRequest-X'}),
      configTokenCurrified('https://accounts.spotify.com/api/token', {
        id: '6aa367588666404db1162e5ba087998d',
        secret: '2b6f5eef0cb54ea496a1710ff743bcd7',
      }),
    );
    const darwinHttpFactoryConfigured = await darwinHttpFactoryBuilder(darwinHttpFactory);
    this._api = darwinHttpFactoryConfigured();
  }

  getHttpClient() {
    return this._api;
  }
}





@Injectable()
export class DarwinHttpService extends HttpClient {
}
