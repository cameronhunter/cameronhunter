# @cameronhunter/debug-logger

A TypeScript decorator for classes that logs all method usages using the [`debug`](https://www.npmjs.com/package/debug) package.

## Examples

### Simple usage

The decorator can be used directly and it will log to a namespace matching the class name it is decorating. An execution
of `new HelloWorld().main('World')` below will result in `HelloWorld main("World");` being logged.

```ts
import DebugLogging from "@cameronhunter/debug-logger";

@DebugLogging
class HelloWorld {
  main(name: string) {
    console.log(`Hello ${name}!`);
  }
}
```

### Using a custom namespace

The decorator also accepts an optional namespace that will be used in addition to the class name it is decorating. An
execution of `new HelloWorld().main('World')` below will result in `my-debug-namespace:HelloWorld main("World");` being
logged.

```ts
import DebugLogging from "@cameronhunter/debug-logger";

@DebugLogging("my-debug-namespace")
class HelloWorld {
  main(name: string) {
    console.log(`Hello ${name}!`);
  }
}
```

### Configuring a shared logger

The decorator can be preconfigured and shared. For example, we can configure a debug logger with a custom namespace and
export it for use around an application. An execution of `new HelloWorld().main('World')` below will result in
`my-namespace:HelloWorld main("World");` being logged.

```ts
import DebugLogger from "@cameronhunter/debug-logger";

const CustomLogger = DebugLogger("my-namespace");

@CustomLogger
class HelloWorld {
  main(name: string) {
    console.log(`Hello ${name}!`);
  }
}
```
