import Debug from 'debug';
import Logger from '../index';

jest.mock('debug', () => jest.requireActual('./__mocks__/debug'));

class Page {}

test('Direct usage', () => {
    @Logger
    class ProfileGate {
        readonly page: Page;

        static from(page: Page) {
            return new ProfileGate(page);
        }

        private constructor(page: Page) {
            this.page = page;
        }

        selectProfile(_name: string, _options?: { timeout: number }) {
            return Promise.resolve();
        }
    }

    const person = ProfileGate.from(new Page());
    person.selectProfile('Reed', { timeout: 40_000 });

    // @ts-expect-error – `Debug.output` is defined on our mock.
    expect(Debug.output).toEqual([
        'ProfileGate from(Instance<Page>);',
        'ProfileGate selectProfile("Reed", {"timeout":40000});',
    ]);
});

test('Configured usage', () => {
    @Logger('@tvui/page-object-model')
    class ProfileGate {
        readonly page: Page;

        static from(page: Page) {
            return new ProfileGate(page);
        }

        private constructor(page: Page) {
            this.page = page;
        }

        selectProfile(_name: string) {
            return Promise.resolve();
        }
    }

    const person = ProfileGate.from(new Page());
    person.selectProfile('Reed');

    // @ts-expect-error – `Debug.output` is defined on our mock.
    expect(Debug.output).toEqual([
        '@tvui/page-object-model:ProfileGate from(Instance<Page>);',
        '@tvui/page-object-model:ProfileGate selectProfile("Reed");',
    ]);
});
