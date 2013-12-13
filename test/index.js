var stringify = require('css-stringify')
var rework = require('rework')
var path = require('path')
var fs = require('fs')

var split = require('../')

describe('Split Media', function () {
  ;[
    'body',
  ].forEach(function (test) {
    var input = fs.readFileSync(path.join(__dirname, test + '.css'), 'utf8')
    var output = require('./' + test + '.json')
    var result

    it('should split queries', function () {
      result = split(rework(input))
      result.should.eql(output)
    })

    it('should have stringifyable stylesheets', function () {
      Object.keys(result).forEach(function (query) {
        stringify(result[query])
      })
    })
  })
})