# echarts-enhanced-completion

[English document](./README.md) | [中文文档](./README_cn.md)

这是一个用于编辑 `echarts` 的配置项时进行补全提示的 `vscode` 的扩展。

## Installed extensions

在 `vscode` 扩展中搜索 `echarts-enhanced-completion`，然后点击安装即可。

## Getting Started

安装并启用插件后，在你需要用作 `echarts` 配置项的对象的上一行添加一行注释： `/** @type EChartsOption */`，用于定义该对象为配置项对象。现在，在配置项对象中按下 `Enter` 键时，插件会显示你可能需要的配置项的列表，并且提示中有对该配置项的详细说明。

## Snapshots

![自动补全](https://github.com/ren-wei/echarts-enhanced-completion/raw/master/images/CompletionItems.gif)

![hover显示说明](https://github.com/ren-wei/echarts-enhanced-completion/raw/master/images/Hover.gif)

![快速初始化](https://github.com/ren-wei/echarts-enhanced-completion/raw/master/images/Init.gif)

## Features

* `Enter` 后触发补全提示

* 补全提示对每一个候选项都有与官网一致的详细说明

* 支持单文件中多个配置项对象

* `hover` 属性显示说明

* 支持可配置的初始化选项

## Todo

* 支持检查属性值

## Requirements

* 支持的文件类型：`html`、`javascript`、`typescript` 和 `vue`。

* 配置项对象中需要正确的缩进。因为结束标志是根据缩进来判断的。

* 配置项对象中不能存在语法错误。因为插件工作时需要对配置项对象进行解析。

## Extension Settings

```json
"echarts-enhanced-completion.lang": {
    "type": "string",
    "default": "auto",
    "description": "Language setting.",
    "enum": [
        "auto",
        "English",
        "中文"
    ]
},
"echarts-enhanced-completion.init.enabled": {
    "type": "boolean",
    "default": true,
    "description": "空的配置对象中触发补全时显示额外的示例选项"
},
"echarts-enhanced-completion.init.onlyInit": {
    "type": "boolean",
    "default": false,
    "description": "初始化时只显示初始化示例选项"
},
"echarts-enhanced-completion.init.showPictures": {
    "type": "boolean",
    "default": true,
    "description": "显示示例选项的顶部的预览图片"
}

```
![设置](https://github.com/ren-wei/echarts-enhanced-completion/raw/master/images/Setting.png)

## Issues

如果您在使用过程中遇到问题，您可以创建一个 [Issues](https://github.com/ren-wei/echarts-enhanced-completion/issues) ，我们会尽快为您解决。

## About

感谢您阅读到这里，这个项目有没有帮到您？如果它帮到了您，请给我一个 `Star`。
