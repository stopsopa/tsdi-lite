[![Tests](https://github.com/stopsopa/tsdi-lite/actions/workflows/test.yml/badge.svg)](https://github.com/stopsopa/tsdi-lite/actions/workflows/test.yml)
[![JSR](https://jsr.io/badges/@stopsopa/tsdi-lite)](https://jsr.io/@stopsopa/tsdi-lite)
[![npm version](https://badge.fury.io/js/tsdi-lite.svg)]([https://badge.fury.io/js/tsdi-lite](https://www.npmjs.com/package/tsdi-lite))
[![npm version](https://shields.io/npm/v/tsdi-lite)](https://www.npmjs.com/package/tsdi-lite)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![jest coverage](https://stopsopa.github.io/tsdi-lite/coverage/coverage-badge.svg)

# Description

Simple dependency injection container for typescript.

Mainly designed to harvest most important benefits of DI without any magic.
Benefits like:

- improved testibility
- loose coupling
- code reusability
- enhanced maintainability
- scalability
- enforcing single responsibility principle

# Design goals

- simplicity
- typesafety
- no dependency - low footprint ([that](src/index.ts) is literally all we need)
- designed to be used in imperative way
- no annotations, no decorators, no magic
- framework agnostic
- library exports in commonjs and esm module formats with typescript definitions

# install

```sh

yarn add tsdi-lite
npm install tsdi-lite
pnpn add tsdi-lite

# also available in JSR: https://jsr.io/@stopsopa/tsdi-lite
# but in JSR versions don't match exactly

```

# Usage

Here is the bunch of code demonstrating all what this library offers.

Just an example demonstrating registering class and functional services.

```ts
import { DependencyInjection } from "tsdi-lite";

// ---- SERVICES DEFINITIONS ----
// to use them later to create some instances out of them
interface NumberFunction {
  (number: number): number;
}

function numberFunctionFactory(multiplier: number): NumberFunction {
  return (number: number): number => {
    return number * multiplier;
  };
}

// simple class taking other services as a dependency
// just one in this case but that should suffice as a demo
class TimesTen {
  protected transformer: NumberFunction;
  constructor(transformer: NumberFunction) {
    this.transformer = transformer;
  }
  public ten(param: number) {
    return this.transformer(param) * 10;
  }
}

// ---- CONTAINER TYPE FOR ALL SERVICES REGISTERED WITH THEIR ID'S ----
type ContainerType = {
  square: NumberFunction;
  double: NumberFunction;
  triple: NumberFunction;
  square_timesten: TimesTen;
  double_timesten: TimesTen;
  triple_timesten: TimesTen;
};

// --- INSTANCE OF CONTAINER ----
// NOTE: this is what we would export from the module and use anywhere in the project
export const container = new DependencyInjection<ContainerType>();

// ---- REGISTERING INDIVIDUAL SERVICES ----
container.registerService("square", (number: number): number => {
  return number * number;
});
container.registerService("double", numberFunctionFactory(2));
container.registerService("triple", numberFunctionFactory(3));
// inject one service into antoher
container.registerService("square_timesten", new TimesTen(container.getService("square")));
container.registerService("double_timesten", new TimesTen(container.getService("double")));
container.registerService("triple_timesten", new TimesTen(container.getService("triple")));

// ---- EXTRACTING INDIVIDUAL SERVICES ----
// INFO; all instaces below have properly infered types and autocompletion
//       but I can't show this here in the README.md
const square = container.getService("square");
const double = container.getService("double");
const triple = container.getService("triple");
const square_timesten = container.getService("square_timesten");
const double_timesten = container.getService("double_timesten");
const triple_timesten = container.getService("triple_timesten");

// ---- USING SERVICES ----
// and use them
console.log({
  square: square(2),
  double: double(3),
  triple: triple(4),
  square_timesten: square_timesten.ten(2),
  double_timesten: double_timesten.ten(3),
  triple_timesten: triple_timesten.ten(4),
});
// return
// {
//     square: 4,
//     double: 6,
//     triple: 12,
//     square_timesten: 40,
//     double_timesten: 60,
//     triple_timesten: 120
// }
```

# WARNING:

Be aware that you have to follow natural order of registering services.
First create instances of services and only after try to obtaine them to inject somewhere else. But that is the general principle of pretty much all DI containers.

Also avoid circular dependencies.
If absolutely needed then inject the container itself and get the service from it when needed inside dependant serivice.

But this way you violate the principle of loose coupling.

Because that service will have to know the service it needs by it's id.
Therefore you are de facto coupling them with each other.

Additionally this way also you are coupling your service with this particular implementation of DI container too.

# How to use in the prod
