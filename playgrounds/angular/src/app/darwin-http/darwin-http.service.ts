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
    const {headers, token: {service, id, secret}} = config;
    const darwinHttpFactoryBuilder = pipeP(
      addProviderCurrified(http),
      configHeadersCurrified(headers),
      configTokenCurrified(service, { id, secret }),
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
