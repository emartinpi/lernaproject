import { DarwinHttpClient } from './darwin-http/darwin-http.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';

  constructor(dhs: DarwinHttpClient) {
    dhs.mimetodo();
  }
}
