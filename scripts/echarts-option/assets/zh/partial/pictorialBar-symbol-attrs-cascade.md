此属性可以被设置在系列的 [根部](~series-pictorialBar.${attrName})，表示对此系列中所有数据都生效；也可以被设置在 [data](series-pictorialBar.data) 中的 [每个数据项中](~series-pictorialBar.data.${attrName})，表示只对此数据项生效。

例如：
```js
series: [{
    ${attrName}: ... // 对 data 中所有数据项生效。
    data: [23, 56]
}]
或者
series: [{
    data: [{
        value: 23
        ${attrName}: ... // 只对此数据项生效
    }, {
        value: 56
        ${attrName}: ... // 只对此数据项生效
    }]
}]
```
