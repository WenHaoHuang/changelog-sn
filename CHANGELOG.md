### [2.1.3](https://github.com/WenHaoHuang/changelog-sn/compare/v2.1.2...v2.1.3)

_2019-11-19_

#### 修复

##### template
- 修复commit信息为英文时，md斜体语法不生效([8cd2dd9](https://github.com/WenHaoHuang/changelog-sn/commit/8cd2dd9))



### [2.1.2](https://github.com/WenHaoHuang/changelog-sn/compare/v2.1.1...v2.1.2)

_2019-10-24_

#### 优化

##### template
- 优化处理template格式问题([742020d](https://github.com/WenHaoHuang/changelog-sn/commit/742020d))



### [2.1.1](https://github.com/WenHaoHuang/changelog-sn/compare/v2.1.0...v2.1.1)

_2019-10-23_

#### 修复

##### tempalte
- ([0527437](https://github.com/WenHaoHuang/changelog-sn/commit/0527437))解决日志生成中格式问题



### [2.1.0](https://github.com/WenHaoHuang/changelog-sn/compare/v2.0.8...v2.1.0)

_2019-10-23_

#### 修复

##### template
- ([7886e29](https://github.com/WenHaoHuang/changelog-sn/commit/7886e29))修复日志生成中的格式异常问题



### [2.0.8](https://github.com/WenHaoHuang/changelog-sn/compare/v2.0.7...v2.0.8)

_2019-10-23_

#### 优化

##### template
- ([a87b59b](https://github.com/WenHaoHuang/changelog-sn/commit/a87b59b))优化changelog输出格式



### [2.0.7](https://github.com/WenHaoHuang/changelog-sn/compare/v2.0.6...v2.0.7)

_2019-10-22_

#### 优化

##### console
- ([6583619](https://github.com/WenHaoHuang/changelog-sn/commit/6583619))删除console代码



### [2.0.6](https://github.com/WenHaoHuang/changelog-sn/compare/v2.0.5...v2.0.6)

_2019-10-22_

#### 优化

##### 更新依赖
- ([f330491](https://github.com/WenHaoHuang/changelog-sn/commit/f330491))更新依赖，减少使用依赖安装



### [2.0.5](https://github.com/WenHaoHuang/changelog-sn/compare/v2.0.4...v2.0.5)

_2019-10-19_

#### 优化

##### templte
- ([dce2084](https://github.com/WenHaoHuang/changelog-sn/commit/dce2084))优化日志生成版本缺失链接的问题



### [2.0.4](https://github.com/WenHaoHuang/changelog-sn/compare/v1.0.0...v2.0.4)

_2019-10-19_

#### 优化

##### 日志输出
- ([e19f907](https://github.com/WenHaoHuang/changelog-sn/commit/e19f907))优化日志输出格式

##### 输出配置优化
- ([642e968](https://github.com/WenHaoHuang/changelog-sn/commit/642e968))优化配置项，调整配置位置



#### 修复

##### dateFormat
- ([7e4e83f](https://github.com/WenHaoHuang/changelog-sn/commit/7e4e83f))修复时间格式化异常的问题

##### dependencies
- ([8d422c4](https://github.com/WenHaoHuang/changelog-sn/commit/8d422c4))调整依赖位置

##### template
- ([2e2f6c7](https://github.com/WenHaoHuang/changelog-sn/commit/2e2f6c7))修复日志模板格式错误问题

##### 生成格式
- ([f72c915](https://github.com/WenHaoHuang/changelog-sn/commit/f72c915))修复changelog生成格式错乱的问题



#### 新功能

##### log
- ([a147aa7](https://github.com/WenHaoHuang/changelog-sn/commit/a147aa7))增加提取commit信息的author字段,支持通过package设置是否展示到changelog内

##### template
- ([ebded6c](https://github.com/WenHaoHuang/changelog-sn/commit/ebded6c))增加commit信息按照scope进行合并的功能

##### 配置修改
- ([abdb782](https://github.com/WenHaoHuang/changelog-sn/commit/abdb782))集成bin命令，实现可配置化关联issues问题、控制是否展示提交者信息、支持自定义时间格式化



### [1.0.0](https://github.com/WenHaoHuang/changelog-sn/compare/v0.0.6...v1.0.0)

_2019-10-11_

#### 优化

##### log
- ([0f5880e](https://github.com/WenHaoHuang/changelog-sn/commit/0f5880e))优化处理changelog文件生成

##### 日志提取
- ([b0c0b9c](https://github.com/WenHaoHuang/changelog-sn/commit/b0c0b9c))优化日志提取顺序



#### 修复

##### custom
- ([ed4219a](https://github.com/WenHaoHuang/changelog-sn/commit/ed4219a))优化定制化生成changelog的格式

##### 修复地址错误
- ([e11b613](https://github.com/WenHaoHuang/changelog-sn/commit/e11b613))修复地址错误的问题



#### 新功能

##### 配置增加
- ([4db5b74](https://github.com/WenHaoHuang/changelog-sn/commit/4db5b74))新增3个特定配置文档



#### 重构

##### changelog
- ([f5e04fe](https://github.com/WenHaoHuang/changelog-sn/commit/f5e04fe))调整获取changelog的判断条件

##### 日志提取
- ([f1429e6](https://github.com/WenHaoHuang/changelog-sn/commit/f1429e6))更新日志提取的功能



### [0.0.6](https://github.com/WenHaoHuang/changelog-sn/compare/v0.0.5...v0.0.6)

_2019-08-26_

#### 新功能

##### 
- ([209ca43](https://github.com/WenHaoHuang/changelog-sn/commit/209ca43))调整cz配置
- ([65c1365](https://github.com/WenHaoHuang/changelog-sn/commit/65c1365))调整cz配置



### [0.0.5](https://github.com/WenHaoHuang/changelog-sn/compare/v0.0.4...v0.0.5)

_2019-08-25_

#### 修复

##### template
- ([1d8a976](https://github.com/WenHaoHuang/changelog-sn/commit/1d8a976))template格式问题测试
- ([c2cf2a5](https://github.com/WenHaoHuang/changelog-sn/commit/c2cf2a5))修复生成template的格式问题



### [0.0.4](https://github.com/WenHaoHuang/changelog-sn/compare/v0.0.3...v0.0.4)

_2019-08-25_

#### 新功能

##### 数据层
- ([760045d](https://github.com/WenHaoHuang/changelog-sn/commit/760045d))增加一种配置可供提取全部更新日志



### [0.0.3](https://github.com/WenHaoHuang/changelog-sn/compare/v0.0.2...v0.0.3)

_2019-08-24_

#### 修复

##### template
- ([9bb73de](https://github.com/WenHaoHuang/changelog-sn/commit/9bb73de))修复生成template的格式问题

##### 
- ([b36bfa2](https://github.com/WenHaoHuang/changelog-sn/commit/b36bfa2))template问题修复



#### 新功能

##### 
- ([a144ed1](https://github.com/WenHaoHuang/changelog-sn/commit/a144ed1))template格式问题

##### 全部
- ([422f487](https://github.com/WenHaoHuang/changelog-sn/commit/422f487))目录调整




#### 不兼容变更

- 全部
  - 全部

### [0.0.2](https://github.com/WenHaoHuang/changelog-sn/compare/v0.0.1...v0.0.2)

_2019-08-24_

### [0.0.1](https://github.com/WenHaoHuang/changelog-sn/compare/8a3f81e...v0.0.1)

_2019-08-24_

#### 新功能

##### 
- ([8a3f81e](https://github.com/WenHaoHuang/changelog-sn/commit/8a3f81e))初始化项目



