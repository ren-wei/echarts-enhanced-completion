# echarts-enhanced-completion

[中文文档](./README_zh-cn.md)

This is an extension of `vscode` that is used to prompt completion when editing the options of `echarts`.

## Installed extensions

Search for `echarts-enhanced-completion` in the `vscode` extension, and then click to install.

## Getting Started

After install and enable the extension, add a comment on the previous line of the object you need to use as the option of `echarts`: `/** @type EChartsOption */`(Enter `echartsoption` to use code snippets). It is used to define an object as echarts option object. Now, when you press the `Enter` key in the echarts option object, the extension will display a list of the option you may need, and there is a detailed description of the option in the prompt.

## Snapshots

![CompletionItems](https://github.com/ren-wei/echarts-enhanced-completion/raw/master/images/CompletionItems.gif)

![hover](https://github.com/ren-wei/echarts-enhanced-completion/raw/master/images/Hover.gif)

![Init](https://github.com/ren-wei/echarts-enhanced-completion/raw/master/images/Init.gif)

![Snippets](https://github.com/ren-wei/echarts-enhanced-completion/raw/master/images/Snippets.gif)

## Features

* Trigger completion prompt after `Enter`.

* The completion prompt has a detailed description consistent with the official website for each option.

* Support multiple option objects in a single file.

* `hover` attribute display description.

* Support configurable initialization options.

* Support checking attribute values.

## Requirements

* Supported file types: `html`, `javascript`, `typescript`, `vue`.

* Correct indentation is required in the option object. Because the end mark is judged based on indentation.

* There must be no syntax errors in the option object. Because the extension needs to parse the option object when it works.

## Extension Settings

Configuration items are in `Settings` => `Extensions` => `Echarts Enhanced Completion`

### Validation > Rule: Custom

Validation rules can help you better spot errors and omissions when using configuration items.
Currently, there are few default rules, so we allow custom rules to supplement.
Edit the `echarts-enhanced-completion.validation.rule.custom` item in the `vscode` settings file.

The value type is `DependRules` and is defined as follows:
```ts
type DependRules = DependRule[];

interface DependRule {
    /** Target key, concatenated with ., for `series` like items, use `series-line` for `series: { type: 'line' }` */
    key: string;
    msg: string;
    depends: DependItem[];
    /** Default is 0. */
    severity?: 0 | 1 | 2 | 3; // vscode.DiagnosticSeverity
    options?: Array<string|number|boolean>;
    disable?: boolean;
}

type DependItem = ExpectedDepend | ExcludeDepend;

interface ExpectedDepend {
    key: string;
    /** Default value. If not provided, it is equal to the `expectedValue` */
    defaultValue?: string | number | boolean | null;
    expectedValue: string | number | boolean | null;
    msg: string;
}

interface ExcludeDepend {
    key: string;
    /** Default value. If not provided, it is equal to the `excludeValue` */
    defaultValue?: string | number | boolean | null;
    excludeValue: string | number | boolean | null;
    msg: string;
}
```

For example, this property works only if `show: true` is configured and `backgroundColor` is defined other than `transparent`(This rule has been used as the default rule.):

```json
{
    "echarts-enhanced-completion.validation.rule.custom": [
        {
            "key": "legend.shadowBlur",
            "msg": "This property works only if show: true is configured and backgroundColor is defined other than transparent.",
            "severity": 0,
            "depends": [
                {
                    "key": "legend.show",
                    "defaultValue": true,
                    "expectedValue": true,
                    "msg": "Does not take effect when the legend show is false.",
                },
                {
                    "key": "legend.backgroundColor",
                    "defaultValue": "transparent",
                    "excludeValue": "transparent",
                    "msg": "Invalid when legend backgroundColor is transparent.",
                },
            ],
        }
    ]
}
```

Results as shown below:

![RuleEffect](https://github.com/ren-wei/echarts-enhanced-completion/raw/master/images/RuleEffect.png)

## Issues

If you encounter any problem in use, you can create a [Issues](https://github.com/ren-wei/echarts-enhanced-completion/issues) and we will solve it for you as soon as possible.

## About

Document source: [echarts-doc](https://github.com/apache/echarts-doc)
