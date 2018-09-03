import { curry } from 'ramda';

interface HttpApi {
  get(url: string, options?: any): any;
  post(url: string, data: any, options?: any): any;
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
// type FactoryBuilder0Promise<A> = () => Promise<A>;
type FactoryBuilder1Promise<A> = (param1: any, factory: Factory<A>) => Promise<Factory<A>>;
// type FactoryBuilder2<F> = (param1: any, param2: any, factory: F) => F;

let darwinProvider: any; // libreria a usar para hacer las llamadas AJAX
darwinProvider = undefined;
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
    return Promise.resolve(
      new Proxy(factory, {
        apply(target, thisArg, argumentsList) {
          const api = target();
          darwinProvider = provider;
          return {
            get(...args: any[]) {
              return api.get.apply(api, args);
            },
            post(...args: any[]) {
              return api.post.apply(api, args);
            },
          };
        },
      }),
    );
  };

// const configHeaders: FactoryBuilder1<Factory<HttpApi>> =
//   (headers: Header, factory: Factory<HttpApi>) => new Proxy(factory, {
//     apply(target, thisArg, argumentsList): HttpApi {
//       const api = target(); // obtiene la api que hubiera configurada hasta este momento
//       return {
//         get(...args: any[]) {
//           const allHeaders: Header = Object.assign({}, args[1] ? args[1].headers : {}, headers);
//           return api.get(args[0], { headers: allHeaders });
//         },
//         post(...args: any[]) {
//           const allHeaders: Header = Object.assign({}, args[2] ? args[2].headers : {}, headers);
//           return api.post(args[0], args[1], { headers: allHeaders });
//         },
//       };
//     },
//   });

// const configToken: FactoryBuilder2<Factory<HttpApi>> =
// (tokenServiceUrl: string, client: Client, factory: Factory<HttpApi>) => new Proxy(factory, {
//   apply(target, thisArg, argumentsList): HttpApi {
//     // llamada a post para obtener token
//     const api = target(); // obtiene la api que hubiera configurada hasta este momento
//     api.post(tokenServiceUrl, 'grant_type=client_credentials', {
//       headers: {
//         Authorization: `Basic ${btoa(client.id + ':' + client.secret)}`,
//       },
//     }).then((response: any) => {
//       console.log(response);
//     }).catch((err: any) => {
//       console.log(err);
//     });s

//     return api;
//   },
// });

const addProviderCurrified = addProvider;
// const configHeadersCurrified = curry(configHeaders);
// const configTokenCurrified = curry(configToken);

export {
  darwinHttpFactory,
  addProviderCurrified as addProvider,
  // configHeadersCurrified as configHeaders,
  // configTokenCurrified as configToken,
};
