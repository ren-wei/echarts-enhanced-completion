# 资源文件夹

该文件夹下的每个子文件夹都提供一组补全项的完整数据。通常是由对应的脚本生成。

## 对子文件夹的要求

* [必须] 文件夹名称是补全项名称的中划线命名方式

* [必须] 所有描述文件都应该平铺在文件夹下

* [必须] `index.json` 文件是主要的描述文件，其他描述文件都是对它的补充

* [可选] `init` 文存在件夹下提供了初始化时可选的示例项

## 对描述文件的要求

* [必须] 描述文件都应该是`json`文件，并且格式都应该满足 `DescMsgObject` 的要求 (请参考 [index.d.ts](../index.d.ts))

## `uiControl` 说明

* `type` 规定了值的类型

* `default` 如果存在，则规定属性值的默认值

* `options` 如果存在，则 `type: "enum"`，并规定了可选的所有值

* `min` 如果存在，则规定属性值不能小于它

* `max` 如果存在，则规定属性值不能大于它

* `step` 如果存在，则规定属性值的步进

* `dims` 如果存在，则 `type: "vector"`，并规定向量的格式

* `required` 如果存在，则必须位于数组下，并且所有的兄弟选项都必须存在 `required` 字段；用于相互之间进行区分，它的 `valueRegExp` 是 `key` 对应的属性的值必须满足的正则表达式的字符串。

* `detailFileName` 如果存在，则表示该选项的子选项在这个字段值指定的文件中

## 对资源文件的检查

```shell
node ./scripts/validate-assets.js # 校验所有文件
node ./scripts/validate-assets.js echarts-option # 仅校验 echarts-option 文件夹
```
