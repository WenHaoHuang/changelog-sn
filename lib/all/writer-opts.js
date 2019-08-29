const compareFunc = require('compare-func')
const Q = require('q')
const readFile = Q.denodeify(require('fs').readFile)
const resolve = require('path').resolve

module.exports = Q.all([
  readFile(resolve(__dirname, './../log/templates/template.hbs'), 'utf-8'),
  readFile(resolve(__dirname, './../log/templates/header.hbs'), 'utf-8'),
  readFile(resolve(__dirname, './../log/templates/commit.hbs'), 'utf-8'),
  readFile(resolve(__dirname, './../log/templates/footer.hbs'), 'utf-8')
]).spread((template, header, commit, footer) => {
  const writerOpts = getWriterOpts()

  writerOpts.mainTemplate = template
  writerOpts.headerPartial = header
  writerOpts.commitPartial = commit
  writerOpts.footerPartial = footer

  return writerOpts
})

function getWriterOpts() {
  return {
    transform: (commit, context) => {
      let discard = true
      const issues = []

      commit.notes.forEach(note => {
        console.log(note.title)
        note.title = '不兼容变更'
        discard = false
      })
      if (commit.type === 'feat' || commit.type === '新功能') {
        commit.type = '新功能'
      } else if (commit.type === 'fix' || commit.type === '修复') {
        commit.type = '修复'
      } else if (commit.type === 'perf' || commit.type === '优化') {
        commit.type = '优化'
      } else if (commit.type === 'refactor' || commit.type === '重构') {
        commit.type = '重构'
      } else if (commit.type === 'docs' || commit.type === '文档') {
        commit.type = '文档'
      } else if (commit.type === 'test' || commit.type === '测试') {
        commit.type = '测试'
      } else if (commit.type === 'build' || commit.type === '构建') {
        commit.type = '构建系统'
      } else if (commit.type === 'chore' || commit.type === '持续集成') {
        commit.type = '持续集成'
      } else if (commit.type === 'revert' || commit.type === '撤销') {
        commit.type = '撤销'
      } else if (commit.type === '其他') {
        commit.type = '其他'
      } else if (discard) {
        return
      }

      if (commit.scope === '*') {
        commit.scope = ''
      }

      if (typeof commit.hash === 'string') {
        commit.hash = commit.hash.substring(0, 7)
      }

      if (typeof commit.subject === 'string') {
        let url = context.repository ? `${context.host}/${context.owner}/${context.repository}` : context.repoUrl
        if (url) {
          url = `${url}/issues/`
          // Issue URLs.
          commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
            issues.push(issue)
            return `[#${issue}](${url}${issue})`
          })
        }
        if (context.host) {
          // User URLs.
          commit.subject = commit.subject.replace(/\B@([a-z0-9](?:-?[a-z0-9]){0,38})/g, `[@$1](${context.host}/$1)`)
        }
      }

      // remove references that already appear in the subject
      commit.references = commit.references.filter(reference => {
        if (issues.indexOf(reference.issue) === -1) {
          return true
        }

        return false
      })

      return commit
    },
    groupBy: 'type',
    commitGroupsSort: 'title',
    commitsSort: ['scope', 'subject'],
    noteGroupsSort: 'title',
    notesSort: compareFunc
  }
}
