import debug from 'debug';
import stringify from './stringify';

const DEFAULT_LOGGER: Pick<debug.Debugger, 'extend'> = { extend: (name: string) => debug(name) };

/**
 * A TypeScript decorator which logs class method usage, it is optionally configurable.
 *
 * @example
 * ```ts
 * import DebugLogging from '@cameronhunter/debug-logger';
 *
 * ＠DebugLogging
 * class HelloWorld {
 *   main(name: string = 'world') {
 *     console.log(`Hello ${name}!`);
 *   }
 * }
 * ```
 *
 * @example
 * ```ts
 * import DebugLogging from '@cameronhunter/debug-logger';
 *
 * ＠DebugLogging('my-debug-namespace')
 * class HelloWorld {
 *   main(name: string = 'world') {
 *     console.log(`Hello ${name}!`);
 *   }
 * }
 * ```
 *
 * @example
 * ```ts
 * import DebugLogging from '@cameronhunter/debug-logger';
 *
 * const CustomLogger = DebugLogging('my-namespace');
 *
 * ＠CustomLogger
 * class HelloWorld {
 *   main(name: string = 'world') {
 *     console.log(`Hello ${name}!`);
 *   }
 * }
 * ```
 */
export default function DebugLogging<TClazz extends Function>(clazz: TClazz): TClazz;
export default function DebugLogging(namespace?: string): <TClazz extends Function>(clazz: TClazz) => TClazz;
export default function DebugLogging<TClazz extends Function>(input: string | undefined | TClazz) {
  /**
   * Support using the decorator directly, e.g. `@DebugLogging`
   */
  if (typeof input === 'function') {
    return decorator(DEFAULT_LOGGER, input);
  }

  /**
   * Support configuration, e.g. `@DebugLogging()` or `@DebugLogging('namespace')`
   */
  return decorator.bind(decorator, input ? debug(input) : DEFAULT_LOGGER);
}

/**
 * This function returns a JavaScript Proxy which intercepts creation of new instances and method calls.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
 */
function decorator<TClazz extends Function>(logger: Pick<debug.Debugger, 'extend'>, clazz: TClazz): TClazz {
  return new Proxy<TClazz>(clazz, {
    apply(target, thisArg, argArray) {
      const log = logger.extend(typeof thisArg === 'function' ? thisArg.name : thisArg.constructor.name);
      log(`${target.name}(${argArray.map(stringify).join(', ')});`);

      return Reflect.apply(target, thisArg, argArray);
    },

    construct(target, argArray, newTarget) {
      return decorator(logger, Reflect.construct(target, argArray, newTarget));
    },

    get(target, p, receiver) {
      const value = Reflect.get(target, p, receiver);
      return typeof value === 'function' ? decorator(logger, value) : value;
    }
  });
}
