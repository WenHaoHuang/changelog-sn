### [2.1.0](https://github.com/WenHaoHuang/changelog-sn/compare/v2.0.8...v2.1.0)

_2019-10-23_

#### 修复

##### template
- ([7886e29](https://github.com/WenHaoHuang/changelog-sn/commit/7886e29))修复日志生成中的格式异常问题

### [2.0.8](https://github.com/WenHaoHuang/changelog-sn/compare/v2.0.7...v2.0.8)

_2019-10-23_

#### 优化

##### template
([a87b59b](https://github.com/WenHaoHuang/changelog-sn/commit/a87b59b))- 优化changelog输出格式

### [2.0.7](https://github.com/WenHaoHuang/changelog-sn/compare/v2.0.6...v2.0.7)

_2019-10-22_

#### 优化

- console
  - 删除console代码([6583619](https://github.com/WenHaoHuang/changelog-sn/commit/6583619))

### [2.0.5](https://github.com/WenHaoHuang/changelog-sn/compare/v2.0.4...v2.0.5)

_2019-10-19_

#### 优化

- templte
  - 优化日志生成版本缺失链接的问题([dce2084](https://github.com/WenHaoHuang/changelog-sn/commit/dce2084))

### [2.0.5](https://github.com/WenHaoHuang/changelog-sn/compare/v2.0.4...v2.0.5)

_2019-10-19_

#### 优化

- templte
  - 优化日志生成版本缺失链接的问题([dce2084](https://github.com/WenHaoHuang/changelog-sn/commit/dce2084))

### [2.0.4](https://github.com/WenHaoHuang/changelog-sn/compare/v1.0.0...v2.0.4)

_2019-10-19_

#### 优化

- 日志输出
  - 优化日志输出格式([e19f907](https://github.com/WenHaoHuang/changelog-sn/commit/e19f907))
- 输出配置优化
  - 优化配置项，调整配置位置([642e968](https://github.com/WenHaoHuang/changelog-sn/commit/642e968))

#### 修复

- dateFormat
  - 修复时间格式化异常的问题([7e4e83f](https://github.com/WenHaoHuang/changelog-sn/commit/7e4e83f))
- dependencies
  - 调整依赖位置([8d422c4](https://github.com/WenHaoHuang/changelog-sn/commit/8d422c4))
- template
  - 修复日志模板格式错误问题([2e2f6c7](https://github.com/WenHaoHuang/changelog-sn/commit/2e2f6c7))
- 生成格式
  - 修复 changelog 生成格式错乱的问题([f72c915](https://github.com/WenHaoHuang/changelog-sn/commit/f72c915))

#### 新功能

- log
  - 增加提取 commit 信息的 author 字段,支持通过 package 设置是否展示到 changelog 内([a147aa7](https://github.com/WenHaoHuang/changelog-sn/commit/a147aa7))
- template
  - 增加 commit 信息按照 scope 进行合并的功能([ebded6c](https://github.com/WenHaoHuang/changelog-sn/commit/ebded6c))
- 配置修改
  - 集成 bin 命令，实现可配置化关联 issues 问题、控制是否展示提交者信息、支持自定义时间格式化([abdb782](https://github.com/WenHaoHuang/changelog-sn/commit/abdb782))

### [1.0.0](https://github.com/WenHaoHuang/changelog-sn/compare/v0.0.6...v1.0.0)

_2019-10-11_

#### 优化

- log
  - 优化处理 changelog 文件生成([0f5880e](https://github.com/WenHaoHuang/changelog-sn/commit/0f5880e))
- 日志提取
  - 优化日志提取顺序([b0c0b9c](https://github.com/WenHaoHuang/changelog-sn/commit/b0c0b9c))

#### 修复

- custom
  - 优化定制化生成 changelog 的格式([ed4219a](https://github.com/WenHaoHuang/changelog-sn/commit/ed4219a))
- 修复地址错误
  - 修复地址错误的问题([e11b613](https://github.com/WenHaoHuang/changelog-sn/commit/e11b613))

#### 新功能

- 配置增加
  - 新增 3 个特定配置文档([4db5b74](https://github.com/WenHaoHuang/changelog-sn/commit/4db5b74))

#### 重构

- changelog
  - 调整获取 changelog 的判断条件([f5e04fe](https://github.com/WenHaoHuang/changelog-sn/commit/f5e04fe))
- 日志提取
  - 更新日志提取的功能([f1429e6](https://github.com/WenHaoHuang/changelog-sn/commit/f1429e6))

### [0.0.6](https://github.com/WenHaoHuang/changelog-sn/compare/v0.0.5...v0.0.6)

_2019-08-26_

#### 新功能

- - 调整 cz 配置([209ca43](https://github.com/WenHaoHuang/changelog-sn/commit/209ca43))
  - 调整 cz 配置([65c1365](https://github.com/WenHaoHuang/changelog-sn/commit/65c1365))

### [0.0.5](https://github.com/WenHaoHuang/changelog-sn/compare/v0.0.4...v0.0.5)

_2019-08-25_

#### 修复

- template
  - template 格式问题测试([1d8a976](https://github.com/WenHaoHuang/changelog-sn/commit/1d8a976))
  - 修复生成 template 的格式问题([c2cf2a5](https://github.com/WenHaoHuang/changelog-sn/commit/c2cf2a5))

### [0.0.4](https://github.com/WenHaoHuang/changelog-sn/compare/v0.0.3...v0.0.4)

_2019-08-25_

#### 新功能

- 数据层
  - 增加一种配置可供提取全部更新日志([760045d](https://github.com/WenHaoHuang/changelog-sn/commit/760045d))

### [0.0.3](https://github.com/WenHaoHuang/changelog-sn/compare/v0.0.2...v0.0.3)

_2019-08-24_

#### 修复

- template
  - 修复生成 template 的格式问题([9bb73de](https://github.com/WenHaoHuang/changelog-sn/commit/9bb73de))
- - template 问题修复([b36bfa2](https://github.com/WenHaoHuang/changelog-sn/commit/b36bfa2))

#### 新功能

- - template 格式问题([a144ed1](https://github.com/WenHaoHuang/changelog-sn/commit/a144ed1))
- 全部
  - 目录调整([422f487](https://github.com/WenHaoHuang/changelog-sn/commit/422f487))

#### 不兼容变更

- 全部
  - 全部

### [0.0.2](https://github.com/WenHaoHuang/changelog-sn/compare/v0.0.1...v0.0.2)

_2019-08-24_

### [0.0.1](https://github.com/WenHaoHuang/changelog-sn/compare/8a3f81e...v0.0.1)

_2019-08-24_

#### 新功能

- - 初始化项目([8a3f81e](https://github.com/WenHaoHuang/changelog-sn/commit/8a3f81e))
