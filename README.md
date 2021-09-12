# echarts-enhanced-completion

这是一个用于编辑 `echarts` 的配置项时进行补全提示的 `vscode` 的扩展。

## Installed extensions

在 `vscode` 扩展中搜索 `echarts-enhanced-completion`，然后点击安装即可。

## Getting Started

安装并启用插件后，在你需要用作 `echarts` 配置项的对象的上一行添加一行注释： `/** @type EChartsOption */`，用于定义该对象为配置项对象。现在，在配置项对象中按下 `Enter` 键时，插件会显示你可能需要的配置项的列表，并且提示中有对该配置项的详细说明。

![使用示例](https://github.com/ren-wei/echarts-enhanced-completion/raw/master/images/GettingStarted.gif)

## Features

* 支持嵌套的对象和数组

* 对嵌套的不同层级的对象显示与之匹配的候选项

* 对每一个候选项都有与官网一致的详细说明

* 候选项中排除已有的配置项

* `series`、`dataZoom` 和 `visualMap` 数组值中允许相同 `type` 的候选项

* 支持单文件中多个配置项对象 (v1.0.3)

* 支持 `hover` 属性显示提示

## Todo

* 支持更多类型的嵌套

* 支持对属性值的补全提示

* 支持多类型值的补全提示

* 支持对函数作为值的补全提示

* 支持富文本选项的补全提示

## Requirements

* 支持的文件类型：`html`、`javascript`、`typescript` 和 `vue`。

* 配置项对象中需要正确的缩进。因为结束标志是根据缩进来判断的。

* 配置项对象中不能存在语法错误。因为插件工作时需要对配置项对象进行解析。

## Extension Settings

此扩展目前不提供设置项。

## Issues

如果您在使用过程中遇到问题，您可以创建一个 `Issues` ，我们会尽快为您解决。
