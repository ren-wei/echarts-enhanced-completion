# assets

存储所有 `json` 格式资源文件

* `desc` 来源于 [echarts-doc](https://github.com/apache/echarts-doc) 项目，通过执行 `scripts/update/index.ts` 进行获取和更新。

* `rules` 直接编辑进行添加和修改

以上两个目录都分别存在 `en` 和 `zh` 两个子目录用于多语言

* `desc/init` 初始化时的预取，直接进行添加和修改

# src

## extension

* `extension` -- 统一处理 `disposable`
    `export`
        - `ExtensionName`
        - `collection`
        - `keyword`
        - `supportedLanguageList`

## 功能模块

* `completion` -- 自动补全

* `hover` -- hover 显示提示

* `diagnosis` --- 诊断配置项错误

* `fix` -- 对诊断错误的快速修复

## 静态模块

* `config` -- 用户配置信息

* `localize` -- 本地化函数工具

* `rules` -- 校验规则

* `store` -- 描述信息

## 基础模块

* `ast` -- `document` 的配置项部分的抽象语法树

* `command` -- 自动化命令，提供快速修复执行的命令
