import { darwinHttpFactory, addProvider } from '@monorepo/http';
import axios from 'axios';

const httpApi = darwinHttpFactory();

const darwinHttp1 = addProvider(axios, darwinHttpFactory);

// const myHttp2 = configHeaders({ 'X-Requested-With': 'DarwinXMLHttpRequest' }, myHttp);

darwinHttp1().get('/users');
