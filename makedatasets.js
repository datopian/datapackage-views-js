/**
 * A quick harness for outputing frictionless
 * data formatted datapackage.json files for use
 * as fixtures and for testing
 **/
const data = require('data.js')
const fs = require('fs')
const path = require('path')
 
const inlineData = [
  ['a', 'b', 'c', 'd'],
  [1,2,3,4],
  [2,3,4,5],
  [3,4,5,6]
]

const dataset = data.open({
  name: 'inline',
  data: inlineData
})

fs.writeFileSync('./__fixtures__/simple.datapackage.json', JSON.stringify(dataset))
console.log(dataset.descriptor)
