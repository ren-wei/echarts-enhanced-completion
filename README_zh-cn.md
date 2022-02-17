# echarts-enhanced-completion

这是一个用于编辑 `echarts` 的配置项时进行补全提示的 `vscode` 的扩展。

## Installed extensions

在 `vscode` 扩展中搜索 `echarts-enhanced-completion`，然后点击安装即可。

## Getting Started

安装并启用插件后，在你需要用作 `echarts` 配置项的对象的上一行添加一行注释： `/** @type EChartsOption */` (输入 `echartsoption` 可以使用代码片段)，用于定义该对象为配置项对象。现在，在配置项对象中按下 `Enter` 键时，插件会显示你可能需要的配置项的列表，并且提示中有对该配置项的详细说明。

## Snapshots

![自动补全](https://github.com/ren-wei/echarts-enhanced-completion/raw/master/images/CompletionItems_cn.gif)

![hover显示说明](https://github.com/ren-wei/echarts-enhanced-completion/raw/master/images/Hover_cn.gif)

![快速初始化](https://github.com/ren-wei/echarts-enhanced-completion/raw/master/images/Init_cn.gif)

![代码片段](https://github.com/ren-wei/echarts-enhanced-completion/raw/master/images/Snippets.gif)

## Features

* `Enter` 后触发补全提示

* 补全提示对每一个候选项都有与官网一致的详细说明

* 支持单文件中多个配置项对象

* `hover` 属性显示说明

* 支持可配置的初始化选项

* 支持检查属性值

## Requirements

* 支持的文件类型：`html`、`javascript`、`typescript` 和 `vue`。

* 配置项对象中不能存在语法错误。因为插件工作时需要对配置项对象进行解析。

## Extension Settings

配置项位于 `设置` => `扩展` => `Echarts Enhanced Completion`。

### Init: Custom

配置项初始化时程序会提供选项进行快速初始化，但是可能会不符合您的要求，因此我们允许自定义初始化的选项。
在 `vscode` 设置文件中编辑 `echarts-enhanced-completion.init.custom` 项即可。

值得类型为 `BaseOptions`，定义如下：
```ts
type BaseOptions = BaseOption[];

interface BaseOption {
    title: string;
    name: string;
    imgSrc?: string;
    code: string;
}
```

### Validation > Rule: Custom

校验规则可以帮助您更好的发现在使用配置项时的错误和疏忽。
目前，默认的规则还很少，因此，我们允许自定义规则来补充。
在 `vscode` 设置文件中编辑 `echarts-enhanced-completion.validation.rule.custom` 项即可。

值类型为 `DependRules` ，定义如下：
```ts
type DependRules = DependRule[];

interface DependRule {
    /** 目标key，以 . 连接，对于类似 series 的项，使用 series-line 表示 `series: { type: 'line' }` */
    key: string;
    /** 依赖提示信息 */
    msg: string;
    /** 依赖数组 */
    depends: DependItem[];
    /** 表示诊断的严重性，越小越严重，默认取0 */
    severity?: 0 | 1 | 2 | 3; // 被用于 vscode.DiagnosticSeverity
    /** 值的可选项 */
    options?: Array<string|number|boolean>;
    /** 禁用此规则 */
    disable?: boolean;
}

type DependItem = ExpectedDepend | ExcludeDepend;

/** 预期依赖 */
interface ExpectedDepend {
    /** 目标key，以 . 连接 */
    key: string;
    /** 目标默认值，不提供则与目标预期值相等 */
    defaultValue?: string | number | boolean | null;
    /** 目标预期值 */
    expectedValue: string | number | boolean | null;
    /** 依赖提示信息 */
    msg?: string;
}

/** 排除依赖 */
interface ExcludeDepend {
    /** 目标key，以 . 连接 */
    key: string;
    /** 目标默认值，不提供则与目标排除值相等 */
    defaultValue?: string | number | boolean | null;
    /** 目标排除值 */
    excludeValue: string | number | boolean | null;
    /** 依赖提示信息 */
    msg?: string;
}
```

例如，对于 `legend.shadowBlur` 配置项生效的前提是，设置了 `show: true` 以及值不为 `tranparent` 的背景色 `backgroundColor`，可以进行如下的配置(此规则已被作为默认规则)：

```json
{
    "echarts-enhanced-completion.validation.rule.custom": [
        {
            "key": "legend.shadowBlur",
            "msg": "此配置项生效的前提是，设置了 show: true 以及值不为 'tranparent' 的背景色 backgroundColor。",
            "severity": 0,
            "depends": [
                {
                    "key": "legend.show",
                    "defaultValue": true,
                    "expectedValue": true,
                },
                {
                    "key": "legend.backgroundColor",
                    "defaultValue": "transparent",
                    "excludeValue": "transparent",
                },
            ],
        }
    ]
}
```

效果如下图所示：

![自定义规则效果演示](https://github.com/ren-wei/echarts-enhanced-completion/raw/master/images/RuleEffect_cn.png)

## Issues

如果您在使用过程中遇到问题，您可以创建一个 [Issues](https://github.com/ren-wei/echarts-enhanced-completion/issues) ，我们会尽快为您解决。

## About

文档来源：[echarts-doc](https://github.com/apache/echarts-doc)
