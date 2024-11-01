[![Tests](https://github.com/stopsopa/tsdi-lite/actions/workflows/test.yml/badge.svg)](https://github.com/stopsopa/tsdi-lite/actions/workflows/test.yml)
[![JSR](https://jsr.io/badges/@stopsopa/tsdi-lite)](https://jsr.io/@stopsopa/tsdi-lite)
[![npm version](https://badge.fury.io/js/tsdi-lite.svg)](https://badge.fury.io/js/tsdi-lite)
[![npm version](https://shields.io/npm/v/tsdi-lite)](https://www.npmjs.com/package/tsdi-lite)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![jest coverage](https://stopsopa.github.io/tsdi-lite/coverage/coverage-badge.svg)

# jsr

Library is also released to jsr repository but the versioning don't match.

https://jsr.io/@stopsopa/tsdi-lite

# install

```

yarn add tsdi-lite
npm install tsdi-lite
pnpn add tsdi-lite

```

# Usage

## with Typescript

Here is the bunch of code demonstrating all what this library offers

```ts
import { DependencyInjection } from "tsdi-lite";

// create some functions and classes
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

// let's definie the container type with all it's dependencies
type ContainerType = {
  square: NumberFunction;
  double: NumberFunction;
  triple: NumberFunction;
  square_timesten: TimesTen;
  double_timesten: TimesTen;
  triple_timesten: TimesTen;
};

// create the container instance with proper type
const container = new DependencyInjection<ContainerType>();

// now we can start registering services
container.registerService("square", (number: number): number => {
  return number * number;
});
container.registerService("double", numberFunctionFactory(2));
container.registerService("triple", numberFunctionFactory(3));
container.registerService("square_timesten", new TimesTen(container.getService("square")));
container.registerService("double_timesten", new TimesTen(container.getService("double")));
container.registerService("triple_timesten", new TimesTen(container.getService("triple")));

// the the instances of services where we need them
// INFO; all instaces below have properly infered types and autocompletion
//       but I can't show this here in the README.md
const square = container.getService("square");
const double = container.getService("double");
const triple = container.getService("triple");
const square_timesten = container.getService("square_timesten");
const double_timesten = container.getService("double_timesten");
const triple_timesten = container.getService("triple_timesten");

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

# How to use in the prod
