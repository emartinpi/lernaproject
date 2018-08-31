import { darwinHttpFactory, addProvider, configHeaders } from '@monorepo/http';
import axios from 'axios';

// const httpApi = darwinHttpFactory();

const darwinHttp1 = configHeaders({ 'X-Requested-With': 'DarwinXMLHttpRequest' }, darwinHttpFactory);

const darwinHttp2 = addProvider(axios, darwinHttp1);

darwinHttp2().get('/users');
