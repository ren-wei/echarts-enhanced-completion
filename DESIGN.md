# 架构设计

## 启动阶段

* 注册触发函数

* 触发时机：打开文档时，文档更新时，文档关闭时，配置更新时

## ast 模块

只有一个 ast 对象管理所有打开的页面的抽象语法树结构。

* 打开文档时初始化，关闭文档时删除，更新时进行局部更新

## completion 触发阶段

1. document, position =(ast.getAstItem)> astItem

2. astItem, position =(getMinAstNode)> node, paths

3. paths, astItem, node =(getOptionDesc)> descTreeList

4. descTreeList, node =(filterOptions)> completionItems

## hover 触发阶段

1. document, position =(ast.getAstItem)> astItem

2. astItem, position =(getMinAstNode)> node, paths

3. paths, astItem, node =(getOptionDesc)> descTreeList

4. descTreeList =(find)> target

## 诊断和修复

### 诊断

1. update

2. astItem(all) =(checkUnknownNode)> diagList

3. astItem(all) =(checkRules)> diagList

### 修复

1. createCommandCodeAction => codeAction

2. diagnostic(diagList) =(codeAction)> execute

# 目录结构
## assets

存储所有 `json` 格式资源文件

* `desc` 来源于 [echarts-doc](https://github.com/apache/echarts-doc) 项目，通过执行 `scripts/update/index.ts` 进行获取和更新。

* `rules` 直接编辑进行添加和修改

以上两个目录都分别存在 `en` 和 `zh` 两个子目录用于多语言

* `desc/init` 初始化时的预取，直接进行添加和修改

## src

### extension

* `extension` -- 统一处理 `disposable`
    `export`
        - `ExtensionName`
        - `collection`
        - `keyword`
        - `supportedLanguageList`

### 功能模块

* `completion` -- 自动补全

* `hover` -- hover 显示提示

* `diagnosis` --- 诊断配置项错误

* `fix` -- 对诊断错误的快速修复

### 静态模块

* `config` -- 用户配置信息

* `localize` -- 本地化函数工具

* `rules` -- 校验规则

* `store` -- 描述信息

### 基础模块

* `ast` -- `document` 的配置项部分的抽象语法树

* `command` -- 自动化命令，提供快速修复执行的命令
