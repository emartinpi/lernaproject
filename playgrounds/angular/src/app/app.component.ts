import { HttpApi } from './../../../../packages/http/src/http';
import { DarwinHttpService } from './darwin-http/darwin-http.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public response;

  constructor(private darwinhttp: DarwinHttpService) {
  }

  ngOnInit(): void {
    this.darwinhttp.get('https://api.spotify.com/v1/browse/featured-playlists').subscribe(res => {
      this.response = res;
    });
  }
}
