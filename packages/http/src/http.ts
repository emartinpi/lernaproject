import { curry, clone } from 'ramda';
import { Observable } from 'rxjs';
import { Factory, HttpApi, Header, Client, CurriedAddProvider2, CurriedConfigHeaders2, CurriedConfigToken3 } from './types';

let darwinProvider: any; // libreria a usar para hacer las llamadas AJAX

const darwinHttpFactory: Factory<HttpApi> = () => {
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

const addProvider: <P extends HttpApi, Q extends HttpApi>(p1: P, factory: Factory<Q>) => Promise<Factory<P>> =
  (provider, factory) => {
    darwinProvider = provider;
    return Promise.resolve(factory as any);
  };

const configHeaders: <P extends HttpApi>(p1: Header, factory: Factory<P>) => Promise<Factory<P>> =
  (headers, factory) => {
    return Promise.resolve(
      new Proxy(factory, {
        apply(target, thisArg, argumentsList) {
          const api = target(); // obtiene la api que hubiera configurada hasta este momento
          return Object.assign({}, clone(api), {
            get(...args: any[]) {
              const allHeaders: Header = Object.assign({}, args[1] ? args[1].headers : {}, headers);
              return api.get(args[0], { headers: allHeaders });
            },
            post(...args: any[]) {
              const allHeaders: Header = Object.assign({}, args[2] ? args[2].headers : {}, headers);
              return api.post(args[0], args[1], { headers: allHeaders });
            },
          });
        },
      }),
    );
  };

const configToken: <P extends HttpApi>(p1: string, p2: Client, factory: Factory<P>) => Promise<Factory<P>> =
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
              return Object.assign({}, clone(darwinProvider), {
                get(...args: any[]) {
                  const allHeaders: Header = Object.assign({}, args[1] ? args[1].headers : {}, tokenHeader);
                  return api.get(args[0], { headers: allHeaders });
                },
                post(...args: any[]) {
                  const allHeaders: Header = Object.assign({}, args[2] ? args[2].headers : {}, tokenHeader);
                  return api.post(args[0], args[1], { headers: allHeaders });
                },
              });
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

const addProviderCurrified: CurriedAddProvider2 = curry(addProvider);
const configHeadersCurrified: CurriedConfigHeaders2 = curry(configHeaders);
const configTokenCurrified: CurriedConfigToken3 = curry(configToken);

export {
  darwinHttpFactory,
  addProviderCurrified as addProvider,
  configHeadersCurrified as configHeaders,
  configTokenCurrified as configToken,
};

/**
 * Utils
 */
function isObservable(param: any): param is Observable<any> {
  return (<Observable<any>>param).subscribe !== undefined;
}
