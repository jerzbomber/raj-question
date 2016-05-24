# Raj Sample Solution

This project proposes one way to solve the following:

*Given an array of transactions, want to return similar array
with some added info while avoiding having to call dependent functions more than
once.*

### Proposed Solution
Memoize values inside of the map function and use object spread syntax
instead of _.default() or Object.assign() to make it more concise.

**Note that object spread syntax is a Stage 2 proposal for ECMAScript. However,
it is currently being used in production by several large projects such as
React Native (so probably not going anywhere). Also, since it is a proposed
feature, you have to use a transpiler in order to use it. I'm using Babel.*

### Original

```js
return transactions.map(trans => _.defaults(trans, {
  "ticker": findSymbol(trans.tickerId),
  "costBasis": calcCostBasis(startPrice, quantity),
  "mktVal": calcMktVal(endPrice, quantity),
  "gainLoss": calcMktVal(endPrice, quantity) - calcCostBasis(startPrice, quantity)
}))
```

### Revised

```js
return transactions.map(trans => {
  let costBasis = calcCostBasis(trans.startPrice, trans.qty)
  let mktVal = calcMktVal(trans.endPrice, trans.qty)
  return {
    ...trans,
    ticker: findSymbol(trans.id),
    costBasis: costBasis,
    mktVal: mktVal,
    gainLoss: mktVal - costBasis
  }
})
```

## Install

```sh
npm install
```

## Build/Run

```sh
npm run build
```

## Documentation

Pay special attention to the following files:

* **package.json** - devDependencies section
* **.babelrc** - note the transform-object-rest-spread plugin
* **example.js** - read through the comments

## Reference

[Babel object rest spread transform](https://babeljs.io/docs/plugins/transform-object-rest-spread/)
