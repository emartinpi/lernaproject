interface HttpApi {
  get(url: string, options?: any): any;
  post(url: string, data: any, options?: any): any;
  [prop: string]: any;
}

type Factory<A> = () => A;

// type FactoryBuilder<F> = (
//   ((factory: F) => F) |
//   ((p1: any, factory: F) => F) |
//   ((p1: any, p2: any, factory: F) => F)
// );

type FactoryBuilder0<F> = (factory: F) => F;
type FactoryBuilder1<F> = (param1: any, factory: F) => F;
type FactoryBuilder2<F> = (param1: any, param2: any, factory: F) => F;

export const darwinHttpFactory: Factory<HttpApi> = () => {
  const warning = () => console.log(
    '%cWarning => %cdarwinHttpFactory(): %cSe necesita configurar proveedor...',
    'background: #222; color:#ffff00',
    'background: #222; color:#ff8000',
    'background: #222; color: #fff',
  );

  return {
    get() { warning(); },
    post() { warning(); },
  };
};

export const addProvider: FactoryBuilder1<Factory<HttpApi>> =
  (provider: any, factory: Factory<HttpApi>) => new Proxy<Factory<HttpApi>>(factory, {
    apply(target: any, thisArg: any, argumentsList: any) {
      return {
        get(...args: any[]) {
          provider.get.apply(provider, args);
        },
        post(...args: any[]) {
          provider.post.apply(provider, args);
        },
      };
    },
  });

// export const configHeaders: FactoryBuilder<Factory<HttpApi>> =
//   (headers: object, httpFactory: Factory<HttpApi>): Http {
//     return {
//       get(...args: any[]) {
//         lib.get.call(lib, args[0], options);
//       },
//       post(...args: any[]) {
//         lib.post.call(lib, args[0], args[1], options);
//       },
//     };
//   }

// function getHeadersFromOptions(options: any) {
//   if (options && options.headers) {
//     return { ...options.headers };
//   }
//   return {};
// }
