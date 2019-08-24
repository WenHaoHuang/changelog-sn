### 
# @Author: wenhao.huang
# @UserId: 18073766
# @Create: 2019-08-24 18:25:50
###
#!/usr/bin/env sh
set -e

git checkout master

VERSION=`npx select-version-cli`

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  npm version $VERSION --message "构建: $VERSION"
  # push
  git push

fi
