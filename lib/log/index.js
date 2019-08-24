'use strict';

var Q = require('q');
var conventionalChangelog = require('./conventional-changelog');
var parserOpts = require('./parser-opts');
var recommendedBumpOpts = require('./conventional-recommended-bump');
var writerOpts = require('./writer-opts');

module.exports = Q.all([conventionalChangelog, parserOpts, recommendedBumpOpts, writerOpts]).spread(function (conventionalChangelog, parserOpts, recommendedBumpOpts, writerOpts) {
  return { conventionalChangelog: conventionalChangelog, parserOpts: parserOpts, recommendedBumpOpts: recommendedBumpOpts, writerOpts: writerOpts };
});