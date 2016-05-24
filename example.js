// sample transactions with base properties
const transactions = [
  {
    id: 1,
    startPrice: 95.87,
    endPrice: 96.43,
    qty: 100
  },
  {
    id: 2,
    startPrice: 717.91,
    endPrice: 717.24,
    qty: 50
  },
  {
    id: 3,
    startPrice: 125.96,
    endPrice: 125.15,
    qty: 200
  }
]

// synchronously finds the symbol
const findSymbol = (id) => {
  switch (id) {
    case 1:
      return 'AAPL'
    case 2:
      return 'GOOGL'
    case 3:
      return 'LNKD'
  }
}

// calculates the cost basis
const calcCostBasis = (startPrice, qty) => {
  return startPrice / qty
}

// calculates the market value
const calcMktVal = (endPrice, qty) => {
  return endPrice *  qty
}

// Fun stuff
// Array.map() takes in a function whose first parameter
// is the current value (object) so you can just memoize
// the values inside of the function body and then re-use.

// Also, if you are using Babel as a transpiler, there is a
// plugin named babel-plugin-transform-object-rest-spread
// which will allow you to use object spread syntax. This is
// more concise than _.default({},{},{}) or Object.assign({},{},{}).

// You can see it in action in the return statement.
// Here I'm using the object spread syntax to copy enumerable properties
// from one object to another in a more succinct way.
let newTransactions = transactions.map(trans => {
  // let's memoize the calculated values for later use
  let costBasis = calcCostBasis(trans.startPrice, trans.qty)
  let mktVal = calcMktVal(trans.endPrice, trans.qty)

  // use the object spread syntax to create a new object
  // and add additional properties
  return {
    ...trans,
    ticker: findSymbol(trans.id),
    costBasis: costBasis,
    mktVal: mktVal,
    gainLoss: mktVal - costBasis
  }
})

// output results to console (pretty-printing is set using the third arg)
console.log(JSON.stringify(newTransactions, null, 2))
