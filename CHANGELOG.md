# Change Log

All notable changes to the "echarts-enhanced-completion" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Released]

## 1.3.3 (2021-11-25)

文档资源来源从官网爬取，改为从 https://github.com/apache/echarts-doc 获取

## 1.3.2 (2021-11-2)

### Fixed

- 修复先写配置项再写注释不能触发的问题

- 修复属性为空对象时没有过滤的问题

## 1.3.1 (2021-10-29)

### Fixed

- 修复跨文件编辑时局部更新错误

## 1.3.0 (2021-10-28)

在此版本之前，每次调用，都需要把对应区域的文本全部解析为ast，但是，大多数时候仅仅修改了很小的部分，因此存在很大的性能浪费。现在已经改为使用每次输入时对ast进行局部更新，实现大幅优化性能，响应速度更快。

### 

## 1.2.5 (2021-10-11)

### Added

- 支持英语

## 1.2.4 (2021-10-06)

### Fixed

- 修复过滤选项时多过滤了部分选项的问题

- 修复部分默认值不是字符串的问题

## 1.2.3 (2021-10-06)

### Fixed

- 修复icon类型属性默认值没有补全字符串的问题

- 修复颜色值没有补全为字符串的问题

## 1.2.2 (2021-10-02)

### Added

- series、visualMap和dataZoom同时支持数组和对象格式

### Fixed

- 修复hover属性可能出现不显示提示的问题

- ([#1](https://github.com/ren-wei/echarts-enhanced-completion/issues/1)) 百分比类型属性的默认值应该是字符串

## 1.2.0 (2021-09-26)

### Added

- 支持富文本选项

- 支持可配置的初始化选项

## 1.1.3 (2021-09-19)

### Fixed

- 修复部分选项的父级选项没有出现在补全列表的问题

## 1.1.2 (2021-09-14)

### Added

- 将注释的代码片段的提示改为中文

### Fixed

- 修复部分属性值类型错误

- 修复在数组中出现错误补全项的问题

## 1.1.0 (2021-09-12)

### Added

- 增加 hover 属性显示说明

### Fixed

- 修复部分属性无法显示的问题

- 修复 html 转义字符没有正确显示的问题

- 修复部分属性显示的说明与官网不对应的问题

## 1.0.3 (2021-09-04)

### Added

- 增加注释的代码片段

![注释的代码片段使用示例](https://github.com/ren-wei/echarts-enhanced-completion/raw/master/images/Snippets.gif)

- 支持多个配置项对象

![多个配置项对象使用示例](https://github.com/ren-wei/echarts-enhanced-completion/raw/master/images/MultipleOptions.gif)


## 1.0.2 (2021-09-02)

### Fixed

- 修复新语法不能解析的问题，使用最新语法选项

## 1.0.1 (2021-09-02)

### Added

- 增加logo

## 1.0.0 (2021-09-02)

### Added

- 支持嵌套的对象和数组

- 对嵌套的不同层级的对象显示与之匹配的候选项

- 对每一个候选项都有与官网一致的详细说明

- 候选项中排除已有的配置项

- `series`、`dataZoom` 和 `visualMap` 数组值中允许相同 `type` 的候选项
