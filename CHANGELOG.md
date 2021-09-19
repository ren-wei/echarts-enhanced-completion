# Change Log

All notable changes to the "echarts-enhanced-completion" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Released]

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
