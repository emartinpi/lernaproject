import { Another } from './prueba/another';
import * as R from "ramda";

export class Core {
  public greet(): string {
    console.log(R.keys({a: 1, b: 2, c: 3})); //=> ['a', 'b', 'c']
    console.log('hello world yey');
    return 'Hello world';
  }
}

export { Another };
