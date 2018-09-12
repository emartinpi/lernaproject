export interface HttpApi {
  get(url: string, options?: any): any;
  post(url: string, data: any, options?: any): any;
  [propName: string]: any;
}

export type Factory<A> = () => A;

export interface Header {
  [key: string]: string;
}

export interface Client {
  id: string;
  secret: string;
}

export interface CurriedAddProvider2 {
  <P extends HttpApi, Q extends HttpApi>(t1: P): (t2: Factory<Q>) => Promise<Factory<P>>;
  <P extends HttpApi, Q extends HttpApi>(t1: P, t2: Factory<Q>): Promise<Factory<P>>;
}

export interface CurriedConfigHeaders2 {
  <P extends HttpApi>(t1: Header): (t2: Factory<P>) => Promise<Factory<P>>;
  <P extends HttpApi>(t1: Header, t2: Factory<P>): Promise<Factory<P>>;
}

export interface CurriedConfigToken2 {
  <P extends HttpApi>(t1: Client): (t2: Factory<P>) => Promise<Factory<P>>;
  <P extends HttpApi>(t1: Client, t2: Factory<P>): Promise<Factory<P>>;
}

export interface CurriedConfigToken3 {
  <P extends HttpApi>(t1: string): CurriedConfigToken2;
  <P extends HttpApi>(t1: string, t2: Client): (t3: Factory<P>) => Promise<Factory<P>>;
  <P extends HttpApi>(t1: string, t2: Client, t3: Factory<P>): Promise<Factory<P>>;
}
