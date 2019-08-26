module.exports = {
  types: [
    { value: 'feat', name: '新功能   : 一个新功能' },
    { value: 'fix', name: '修复     : 一个 bug 修复' },
    { value: 'docs', name: '文档     : 只有文档发生改变' },
    {
      value: 'style',
      name: '代码风格 : 对代码含义无影响的改动（空格，格式化，等，非 UI 变动）'
    },
    {
      value: 'refactor',
      name: '重构     : 不涉及修复bug和新功能开发的代码更改'
    },
    {
      value: 'perf',
      name: '优化     : 提升性能的代码更改'
    },
    { value: 'test', name: '测试     : 增加缺失的测试案例' },
    {
      value: 'chore',
      name: '构建     : 修改持续集成的配置文件和脚本'
    },
    { value: 'revert', name: '撤销     : 撤销一个历史提交' },
    { value: 'WIP', name: '待完成   : 研发中的提交备份' }
  ],

  scopes: [{ name: 'accounts' }, { name: 'admin' }, { name: 'exampleScope' }, { name: 'changeMe' }],

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',

  // it needs to match the value for field type. Eg.: 'fix'
  scopeOverrides: {
    fix: [{ name: 'merge' }, { name: 'style' }, { name: 'e2eTest' }, { name: 'unitTest' }]
  },
  // override the messages, defaults are as follows
  messages: {
    type: '选择你提交的信息类型:',
    scope: '选择本次提交的改变所影响的范围？',
    // used if allowCustomScopes is true
    customScope: '本次提交的改变所影响的范围？',
    subject: '写一个简短的变化描述，尽量包含主谓宾结构，杜绝简单的单词：\n',
    body: '提供更详细的变更描述 (按 enter 跳过). 使用 "|" 换行：\n',
    breaking: '列出所有的不兼容变更 (按 enter 跳过)：\n',
    footer: '列出此次改动引用的所有 issues （如："fix #123", "Closes #123, #124"）：\n',
    confirmCommit: '确认提交以上内容信息？'
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  skipQuestions: ['body'],

  // limit subject length
  subjectLimit: 100,
  breaklineChar: '|', // It is supported for fields body and footer.
  footerPrefix: 'ISSUES CLOSED:'
  // askForBreakingChangeFirst: true // default is false
}
