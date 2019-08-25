const Q = require('q')
const conventionalChangelog = require('./../log/conventional-changelog')
const parserOpts = require('./../log/parser-opts')
const recommendedBumpOpts = require('./../log/conventional-recommended-bump')
const writerOpts = require('./writer-opts')

module.exports = Q.all([conventionalChangelog, parserOpts, recommendedBumpOpts, writerOpts]).spread((conventionalChangelog, parserOpts, recommendedBumpOpts, writerOpts) => {
  return { conventionalChangelog, parserOpts, recommendedBumpOpts, writerOpts }
})
