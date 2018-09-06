import { Injectable, OnInit, Optional } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { darwinHttpFactory, addProvider } from '@monorepo/http';
// import { pipeP } from 'ramda';


export class DarwinHttpClient {
  constructor(
    private provider: any,
    private config: DarwinHttpModuleConfig) {
    this.init();
  }

  private async init() {
    console.log('init');

    const factory = await addProvider(this.provider, darwinHttpFactory);
    const httpApi = factory();
    httpApi.get('https://www.googleapis.com/books/v1/volumes?q=car');
  }

  mimetodo() {
    console.log('mi metodoo');
  }
}
