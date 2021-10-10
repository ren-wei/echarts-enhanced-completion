# echarts-enhanced-completion

[English document](./README.md) | [中文文档](./README_cn.md)

This is an extension of `vscode` that is used to prompt completion when editing the options of `echarts`.

## Installed extensions

Search for `echarts-enhanced-completion` in the `vscode` extension, and then click to install.

## Getting Started

After install and enable the extension, add a comment on the previous line of the object you need to use as the option of `echarts`: `/** @type EChartsOption */`. It is used to define an object as echarts option object. Now, when you press the `Enter` key in the echarts option object, the extension will display a list of the option you may need, and there is a detailed description of the option in the prompt.

## Snapshots

![CompletionItems](https://github.com/ren-wei/echarts-enhanced-completion/raw/master/images/CompletionItems.gif)

![hover](https://github.com/ren-wei/echarts-enhanced-completion/raw/master/images/Hover.gif)

![Init](https://github.com/ren-wei/echarts-enhanced-completion/raw/master/images/Init.gif)

## Features

* Trigger completion prompt after `Enter`.

* The completion prompt has a detailed description consistent with the official website for each option.

* Support multiple option objects in a single file.

* `hover` attribute display description.

* Support configurable initialization options.

## Todo

* Support checking attribute values.

## Requirements

* Supported file types: `html`, `javascript`, `typescript`, `vue`.

* Correct indentation is required in the option object. Because the end mark is judged based on indentation.

* There must be no syntax errors in the option object. Because the extension needs to parse the option object when it works.

## Extension Settings

```json
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
![Setting](https://github.com/ren-wei/echarts-enhanced-completion/raw/master/images/Setting.png)

## Issues

If you encounter any problem in use, you can create a [Issues](https://github.com/ren-wei/echarts-enhanced-completion/issues) and we will solve it for you as soon as possible.

## About

Thank you for reading here. Has this project helped you? If it helps you, please give me a `star`.
