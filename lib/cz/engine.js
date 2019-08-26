'format cjs'

const wrap = require('word-wrap')
const longest = require('longest')
const rightPad = require('right-pad')
const chalk = require('chalk')

const filter = array => {
  return array.filter(x => {
    return x
  })
}

// 获取选择列表
const getList = obj => {
  const objLeng = longest(Object.keys(obj)).length * 2 + 1

  return Object.keys(obj).map(key => ({
    name: `${rightPad(`${key}:`, objLeng / 2, '  ')} ${obj[key].description}`,
    value: key
  }))
}

const Q = require('q')
const readFile = Q.denodeify(require('fs').readFile)
const resolve = require('path').resolve

// const configs = readFile(resolve(__dirname, '../../.gitignore'), 'utf-8')
Q.all([readFile(resolve(__dirname, '../../.gitignore'), 'utf-8')]).spread(configs => {
  console.log(configs)
})

// function ReadConfig() {
//   //读配置
//   config = ini.parseSync('./babelrc')
//   console.log(config)
// }
// ReadConfig()
// var configs = require()

// console.log(configs)

// #!/usr/bin/env node
const path = require('path')
// const resolvePkg = require('resolve-pkg')
// const readPkg = require('read-pkg')

// const pkgDir = resolvePkg('@commitlint/cli', { cwd: __dirname })
// const manifest = readPkg.sync(path.join(pkgDir, 'package.json'))
console.log(path.join(__dirname, 'package.json'))
// const bin = path.join(pkgDir, manifest.bin.commitlint)
// console.log(bin)
// require(bin);

module.exports = function(options) {
  const typeList = getList(options.types)
  // console.log(options)
  return {
    prompter(cz, commit) {
      console.log(chalk.yellow('\n标题会在100个字符后进行裁剪。 主体内容每行会在100个字符后自动换行，手动换行请直接输入"\\n"。\n'))

      cz.prompt([
        {
          type: 'list',
          name: 'type',
          message: '选择你提交的信息类型:',
          choices: typeList
        },
        {
          type: 'input',
          name: 'scope',
          message: '本次提交的改变所影响的范围？ (按 enter 键跳过)\n'
        },
        {
          type: 'input',
          name: 'subject',
          message: '写一个简短的变化描述，尽量包含主谓宾结构，杜绝简单的单词:\n'
        },
        {
          type: 'input',
          name: 'body',
          message: '提供更详细的变更描述: (按 enter 跳过)\n'
        },
        {
          type: 'confirm',
          name: 'isBreaking',
          message: '是否存在不兼容变更?',
          default: false
        },
        {
          type: 'input',
          name: 'breaking',
          message: '列出所有的不兼容变更:\n',
          when(answers) {
            return answers.isBreaking
          }
        },
        {
          type: 'confirm',
          name: 'isIssueAffected',
          message: '此次变更是否影响某些打开的 issue ?',
          default: false
        },
        {
          type: 'input',
          name: 'issues',
          message: '列出此次改动引用的所有 issues （如："fix #123", "Closes #123, #124"）:\n',
          when(answers) {
            return answers.isIssueAffected
          }
        }
      ]).then(answers => {
        const maxLineWidth = 100

        const wrapOptions = {
          trim: true,
          newline: '\n',
          indent: '',
          width: maxLineWidth
        }

        // 判断影响范围是否输入
        const scope = answers.scope ? `(${answers.scope.trim()})` : ''

        // 限制短描述为 100 个字符
        const head = `${answers.type + scope}: ${answers.subject.trim()}`.slice(0, maxLineWidth)

        // 限制详细描述最长宽度为 100 个字符串
        const body = wrap(answers.body, wrapOptions)

        // Apply breaking change prefix, removing it if already present
        let breaking = answers.breaking ? answers.breaking.trim() : ''

        // 如果手动输入了 不兼容变更，则过滤掉，最后进行长度限制
        breaking = breaking ? `不兼容变更: ${breaking.replace(/^不兼容变更: /, '')}` : ''
        breaking = wrap(breaking, wrapOptions)

        const issues = answers.issues ? wrap(answers.issues, wrapOptions) : ''

        const footer = filter([breaking, issues]).join('\n\n')
        commit(`${head}\n\n${body}\n\n${footer}`)
      })
    }
  }
}
