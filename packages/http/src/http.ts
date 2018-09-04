import { curry } from 'ramda';

interface HttpApi {
  get(url: string, options?: any): Promise<any>;
  post(url: string, data: any, options?: any): Promise<any>;
  [prop: string]: any;
}

interface Header {
  [key: string]: string;
}
interface Client {
  id: string;
  secret: string;
}

type Factory<A> = () => A;
type FactoryBuilder1Promise<A> = (p1: any, factory: Factory<A>) => Promise<Factory<A>>;
type FactoryBuilder2Promise<A> = (p1: any, p: any, factory:  Factory<A>) => Promise<Factory<A>>;

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

const addProvider: FactoryBuilder1Promise<HttpApi> =
  (provider: any, factory: Factory<HttpApi>) => {
    darwinProvider = provider;
    return Promise.resolve(factory);
  };

const configHeaders: FactoryBuilder1Promise<HttpApi> =
  (headers: Header, factory: Factory<HttpApi>) => {
    return Promise.resolve(
      new Proxy(factory, {
        apply(target, thisArg, argumentsList): HttpApi {
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

const configToken: FactoryBuilder2Promise<HttpApi> =
(tokenServiceUrl: string, client: Client, factory: Factory<HttpApi>) => {
  return new Promise<Factory<HttpApi>>((resolve, reject) => {
    const api = factory();
    api.post(tokenServiceUrl, 'grant_type=client_credentials', {
      headers: {
        Authorization: `Basic ${btoa(client.id + ':' + client.secret)}`,
      },
    }).then((res) => {
      const token = res.data;
      resolve(
        new Proxy(factory, {
          apply(target, thisArg, argumentsList): HttpApi {
            const api = target(); // obtiene la api que hubiera configurada hasta este momento
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
    }).catch((err) => { reject(err); });
  });
};

const addProviderCurrified = curry(addProvider);
const configHeadersCurrified = curry(configHeaders);
const configTokenCurrified = curry(configToken);

export {
  darwinHttpFactory,
  addProviderCurrified as addProvider,
  configHeadersCurrified as configHeaders,
  configTokenCurrified as configToken,
};
