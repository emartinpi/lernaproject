import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarwinHttpService {

  constructor() {
    console.log('creado servicio wrapper');
  }

  mimetodo() {
    console.log('mi metodo');
  }

}
