## transform.sort(Object)

### type(string) = 'sort'

### config(*)

"sort" 数据转换器的“条件”。



参见 [数据变换教程](concepts/data-transform)







### print(boolean) = false

使用 transform 时，有时候我们会配不对，显示不出来结果，并且不知道哪里错了。所以，这里提供了一个配置项 `transform.print` 方便 debug 。这个配置项只在开发环境中生效。如下例：

```js
option = {
    dataset: [{
        source: [ ... ]
    }, {
        transform: {
            type: 'filter',
            config: { ... }
            // 配置为 `true` 后， transform 的结果
            // 会被 console.log 打印出来。
            print: true
        }
    }],
    ...
}
```
