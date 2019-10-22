#!/usr/bin/env sh
set -e

if test -n "$(git status --porcelain)"; then
  echo 'Unclean working tree. Commit or stash changes first.' >&2;
  exit 128;
fi

if ! git fetch --quiet 2>/dev/null; then
  echo 'There was a problem fetching your branch. Run `git fetch` to see more...' >&2;
  exit 128;
fi

if test "0" != "$(git rev-list --count --left-only @'{u}'...HEAD)"; then
  echo 'Remote history differ. Please pull changes.' >&2;
  exit 128;
fi

echo 'No conflicts.' >&2;

# 删除本地所有tag
git tag -l | xargs git tag -d
# 同步远程仓库tag
git fetch origin --tags
# 更新版本
npm run v
# 提取日志
npm run log
git add -A
git commit -m "build(变更日志): CHANGELOG"
git push
# 推送本地所有tag到远程仓库
git push origin --tags
# 发布版本
npm publish
