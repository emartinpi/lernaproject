import  { curry, CurriedFunction2, CurriedFunction3 } from 'ramda';
import { Observable } from 'rxjs';

export interface HttpApi<R> {
  get(url: string, options?: any): R;
  post(url: string, data: any, options?: any): R;
  [propName: string]: any;
}

interface Header {
  [key: string]: string;
}
interface Client {
  id: string;
  secret: string;
}

export type Factory<A> = () => A;
// type FactoryBuilder1Promise<P, A> = (p1: P, factory: Factory<A>) => Promise<Factory<A>>;
// type FactoryBuilder2Promise<P, Q, A> = (p1: P, p2: Q, factory:  Factory<A>) => Promise<Factory<A>>;

let darwinProvider: any; // libreria a usar para hacer las llamadas AJAX

export const darwinHttpFactory: Factory<HttpApi<any>> = () => {
  const warning = () => console.log(
    '%cWarning => %cdarwinHttpFactory(): %cSe necesita configurar proveedor...',
    'background: #222; color:#ffff00',
    'background: #222; color:#ff8000',
    'background: #222; color: #fff',
  );

  return {
    get(...args: any[]) {
      return darwinProvider ? darwinProvider.get(...args) : warning();
    },
    post(...args: any[]) {
      return darwinProvider ? darwinProvider.post(...args) : warning();
    },
  };
};

export const addProvider: <R, S extends R>(p1: HttpApi<R>, factory: Factory<HttpApi<S>>) => Promise<Factory<HttpApi<R>>> =
  (provider, factory) => {
    darwinProvider = provider;
    return Promise.resolve(factory);
  };

export const configHeaders: <R>(p1: Header, factory: Factory<HttpApi<R>>) => Promise<Factory<HttpApi<R>>> =
  (headers, factory) => {
    return Promise.resolve(
      new Proxy(factory, {
        apply(target, thisArg, argumentsList) {
          const api = target(); // obtiene la api que hubiera configurada hasta este momento
          return {
            get(...args: any[]) {
              const allHeaders: Header = Object.assign({}, args[1] ? args[1].headers : {}, headers);
              return api.get(args[0], { headers: allHeaders });
            },
            post(...args: any[]) {
              const allHeaders: Header = Object.assign({}, args[2] ? args[2].headers : {}, headers);
              return api.post(args[0], args[1], { headers: allHeaders });
            },
          };
        },
      }),
    );
  };

export const configToken: <R extends any>(p1: string, p2: Client, factory: Factory<HttpApi<R>>) => Promise<Factory<HttpApi<R>>> =
  (tokenServiceUrl, client, factory) => {
    return new Promise((resolve, reject) => {
      const api = factory();
      const post = api.post(tokenServiceUrl, 'grant_type=client_credentials', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${client.id}:${client.secret}`)}`,
        },
      });

      const callbackOK = (res: any) => {
        const token = res.data ? res.data : res;
        resolve(
          new Proxy(factory, {
            apply(target, thisArg, argumentsList) {
              const tokenHeader: Header = {
                Authorization: `Bearer ${token.access_token}`,
              };
              return {
                get(...args: any[]) {
                  const allHeaders: Header = Object.assign({}, args[1] ? args[1].headers : {}, tokenHeader);
                  return api.get(args[0], { headers: allHeaders });
                },
                post(...args: any[]) {
                  const allHeaders: Header = Object.assign({}, args[2] ? args[2].headers : {}, tokenHeader);
                  return api.post(args[0], args[1], { headers: allHeaders });
                },
              };
            },
          }),
        );
      };

      const callbackKO = (err: any) => { reject(err); };

      isObservable(post) ?
        post.subscribe(callbackOK, callbackKO) :
        post.then(callbackOK, callbackKO);
    });
  };

export const addProviderCurrified: CurriedFunction2<HttpApi<any>, Factory<HttpApi<any>>, Promise<Factory<HttpApi<any>>>> = curry(addProvider);
export const configHeadersCurrified: CurriedFunction2<Header, Factory<HttpApi<any>>, Promise<Factory<HttpApi<any>>>> = curry(configHeaders);
export const configTokenCurrified: CurriedFunction3<string, Client, Factory<HttpApi<any>>, Promise<Factory<HttpApi<any>>>> = curry(configToken);

/**
 * Utils
 */
function isObservable(param: any): param is Observable<any> {
  return (<Observable<any>>param).subscribe !== undefined;
}
