import stringify from '../stringify';

test('null', () => {
    expect(stringify(null)).toBe('null');
});

test('strings', () => {
    expect(stringify('hello world')).toBe('"hello world"');
});

test('numbers', () => {
    expect(stringify(10_000)).toBe('10000');
});

test('booleans', () => {
    expect(stringify(true)).toBe('true');
    expect(stringify(false)).toBe('false');
});

test('objects', () => {
    expect(stringify({timeout: 40_000})).toBe('{"timeout":40000}');
    expect(stringify({hello: 'world'})).toBe('{"hello":"world"}');
});

test('instances', () => {
    class MyClass {}
    expect(stringify(new MyClass())).toBe('Instance<MyClass>');
});

describe('functions', () => {
    test('declarations', () => {
        function foo() {
            return;
        }

        expect(stringify(foo)).toBe('Function<foo>');
    });

    test('expressions', () => {
        const bar = function() {
            return;
        };

        expect(stringify(bar)).toBe('Function<bar>');

        const arrow = () => {
            return;
        };

        expect(stringify(arrow)).toBe('Function<arrow>');
    });

    test('anonymous', () => {
        expect(stringify(() => {
            return;
        })).toBe('Function');
    });
});
