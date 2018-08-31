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

export
const darwinHttpFactory: Factory<HttpApi> = () => {
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

export
const addProvider: FactoryBuilder1<Factory<HttpApi>> =
  (provider: any, factory: Factory<HttpApi>) => new Proxy(factory, {
    apply(target, thisArg, argumentsList) {
      const api = target();
      return {
        get(...args: any[]) {
          provider.get(...args);
        },
        post(...args: any[]) {
          provider.post(...args);
        },
      };
    },
  });

interface Header {
  [key: string]: string;
}

export
const configHeaders: FactoryBuilder1<Factory<HttpApi>> =
  (headers: Header, factory: Factory<HttpApi>) => new Proxy(factory, {
    apply(target, thisArg, argumentsList) {
      const api = target(); // obtiene la api que hubiera configurada hasta este momento
      return {
        get(...args: any[]) {
          api.get(args[0], { headers });
        },
        post(...args: any[]) {
          api.post(args[0], args[1], { headers });
        },
      };
    },
  });
