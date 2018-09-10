export interface DarwinHttpModuleConfig {
  token?: {
    service: string,
    id: string;
    secret: string;
  };
  headers?: {
    [key: string]: string;
  };
}
