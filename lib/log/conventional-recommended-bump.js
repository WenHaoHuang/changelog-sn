'use strict';

var parserOpts = require('./parser-opts');

module.exports = {
  parserOpts: parserOpts,

  whatBump: function whatBump(commits) {
    var level = 2;
    var breakings = 0;
    var features = 0;

    commits.forEach(function (commit) {
      console.log(commit);
      if (commit.notes.length > 0) {
        breakings += commit.notes.length;
        level = 0;
      } else if (commit.type === 'feat' || commit.type === '新功能') {
        features += 1;
        if (level === 2) {
          level = 1;
        }
      }
    });

    return {
      level: level,
      reason: breakings === 1 ? 'There is ' + breakings + ' BREAKING CHANGE and ' + features + ' features' : 'There are ' + breakings + ' BREAKING CHANGES and ' + features + ' features'
    };
  }
};