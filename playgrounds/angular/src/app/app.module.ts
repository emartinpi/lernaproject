import { DarwinHttpModule } from './darwin-http/darwin-http.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DarwinHttpModule.forRoot({
      headers: {
        'X-Requested-With': 'DarwinXMLHttpRequest-X'
      },
      token: {
        service: 'https://accounts.spotify.com/api/token',
        id: '6aa367588666404db1162e5ba087998d',
        secret: '2b6f5eef0cb54ea496a1710ff743bcd7'
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
