import { DarwinHttpClient } from './darwin-http.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
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
        { provide: DarwinHttpClient, useFactory: configDarwinHttpClient(config), deps: [HttpClient] }
      ]
    };
  }
}

function configDarwinHttpClient(config: DarwinHttpModuleConfig) {
  return (httpClient: HttpClient ): DarwinHttpClient => {
    return new DarwinHttpClient(httpClient, config);
  };
}
