import { Core } from '../src/index';

describe('Test', () => {
    test('greet is a function', () => {
        const core = new Core();
        expect(typeof core.greet).toBe('function');
    });
});