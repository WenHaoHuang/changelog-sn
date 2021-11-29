## 功能

该工具针对一些需要手动输入更新日志的项目，实现自动化输出更新日志，并且对更新日志进行内容格式化，便于后期维护，目前主要有以下几个功能模块。

1. cz -- 定制化 git 提交
2. log -- 自动生成 CHANGELOG.md 日志文件
3. lint -- 校验 commit 信息

### 依赖安装

> npm install changelog-sn --save-dev

### 配置commitlint和commitizen

> 代码仓库根目录创建文件`.commitlintrc.js`和`.czconfigrc.js`

#### 配置.commitlintrc.js内容

```js
module.exports = Object.assign({}, require('changelog-sn/lib/lint'), {
  rules: {
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'scope-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        '新功能',
        '修复',
        '优化',
        '重构',
        '文档',
        'chore',
        'revert',
        'WIP',
        'docs',
        'build',
        'release'
      ]
    ]
  }
})
```

#### 配置.czconfigrc.js

```js
module.exports = {
  types: [
    { value: '新功能', name: '新功能 : 新增加一个功能' },
    { value: '修复', name: '修复   : 一个 bug 修复' },
    { value: '优化', name: '优化   : 提升性能的代码更改' },
    { value: '重构', name: '重构   : 不涉及修复bug和新功能开发的代码更改' },
    { value: '文档', name: '文档   : 只有文档发生改变' },
    { value: 'chore', name: '构建   : 修改持续集成的配置文件和脚本' },
    { value: 'revert', name: '撤销   : 撤销一个历史提交' },
    { value: 'WIP', name: '待完成 : 研发中的提交备份' }
  ],
  messages: {
    type: '选择你提交的信息类型:',
    scope: '选择本次提交的改变所影响的范围？',
    customScope: '本次提交的改变所影响的范围？',
    subject: '写一个简短的变化描述，尽量清晰描述改动内容，杜绝简单的单词：\n',
    body: '提供更详细的变更描述 (按 enter 跳过). 使用 "|" 换行：\n',
    breaking: '列出所有的不兼容变更 (按 enter 跳过)：\n',
    footer: '列出此次改动解决的所有 jira （如："#123, #234"）(按 enter 跳过)：\n',
    confirmCommit: '确认提交以上内容信息？'
  },
  allowBreakingChanges: ['refactor', 'chore'],
  breakingPrefix: 'WARNING:',
  skipQuestions: ['body'],
  // limit subject length
  subjectLimit: 100,
  breaklineChar: '|',
  footerPrefix: 'JIRA CLOSED:'
}
```
### 配置package.json

```json
{
  "scripts": {
    "log": "changelog-sn -i CHANGELOG.md -s -r 2",
    "cz": "git add . && cz",
    "v": "standard-version --prerelease"
  },
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-customizable"
    },
    "cz-customizable": {
      "config": "./.czconfigrc.js"
    }
  },
  "standard-version": {
    "message": "chore(release): %s",
    "skip": {
      "changelog": true
    }
  },
  "devDependencies": {
    "changelog-sn": "2.2.0",
    "standard-version": "9.3.2"
  }
}
```

#### scripts命令之log
> 该命令用来生成CHANGELOG.MD日志

#### scripts命令之cz
> 该命令会先执行add改动文件并执行`cz`来代替`git commit`以获得`commit`信息帮助，也可分开执行`git add .`和`npx cz`，如果全局安装`commitizen`可直接使用`cz`

#### scripts命令之v
> 使用`standard-version`插件按照配置规则升级版本，标记`tag`
