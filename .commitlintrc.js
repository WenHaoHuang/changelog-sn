module.exports = Object.assign({}, require('./lib/lint'), {
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 100],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'scope-empty': [2, 'never'],
    'type-enum': [2, 'always', ['新功能', '修复', '优化', '文档', 'test', 'chore', 'revert', 'WIP', 'build', 'release']],
    'scope-enum': [
      2,
      'always',
      [
        // 影响范围定义字段
        // 'components/Button',
        // '组件/按钮',
      ]
    ]
  }
})
