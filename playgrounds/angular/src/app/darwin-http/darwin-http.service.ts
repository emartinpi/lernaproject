import { DarwinHttpModuleConfig } from './types';
import { HttpClient } from '@angular/common/http';
import { darwinHttpFactory, addProvider, configHeaders, configToken } from '@monorepo/http';
import { Injectable } from '@angular/core';
import { pipeP } from 'ramda';

@Injectable()
export class DarwinHttpConfigService {
  private _api;

  constructor() {
  }

  async darwinHttpClientConfig(http: HttpClient, config: DarwinHttpModuleConfig) {
    const {headers, token: {service, id, secret}} = config;
    const darwinHttpFactoryBuilder = pipeP(
      addProvider(http),
      configHeaders(headers),
      configToken(service, { id, secret }),
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
