import {addProvider, configHeaders } from '@monorepo/http';
import axios from 'axios';

const myHttp = addProvider(axios);
console.log('asdf');
const myHttp2 = configHeaders({ 'X-Requested-With': 'DarwinXMLHttpRequest' }, myHttp);

myHttp2.get('/user');
