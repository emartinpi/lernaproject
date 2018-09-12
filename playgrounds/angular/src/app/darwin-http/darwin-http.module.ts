import { DarwinHttpConfigService, DarwinHttpService } from './darwin-http.service';
import { DarwinHttpModuleConfig } from './types';
import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: []
})
export class DarwinHttpModule {
  static forRoot(config: DarwinHttpModuleConfig): ModuleWithProviders {
    return {
      ngModule: DarwinHttpModule,
      providers: [
        DarwinHttpConfigService,
        {
          provide: APP_INITIALIZER,
          useFactory: factoryDarwinHttpClient(config),
          deps: [HttpClient, DarwinHttpConfigService],
          multi: true
        },
        {
          provide: DarwinHttpService,
          useFactory: (darwinHttpConfig: DarwinHttpConfigService) => {
            return darwinHttpConfig.getHttpClient();
          },
          deps: [DarwinHttpConfigService]
        }
      ]
    };
  }
}

export function factoryDarwinHttpClient(config: DarwinHttpModuleConfig) {
  return (http: HttpClient, darwinHttpConfig: DarwinHttpConfigService) => {
    return () => darwinHttpConfig.darwinHttpClientConfig(http, config);
  };
}



