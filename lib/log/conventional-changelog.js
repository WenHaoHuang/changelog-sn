'use strict';

var Q = require('q');
var parserOpts = require('./parser-opts');
var writerOpts = require('./writer-opts');

module.exports = Q.all([parserOpts, writerOpts]).spread(function (parserOpts, writerOpts) {
  return { parserOpts: parserOpts, writerOpts: writerOpts };
});