# visualMap(Array|Object)

`visualMap` 是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）。

视觉元素可以是：<br>



`visualMap` 组件可以定义多个，从而可以同时对数据中的多个维度进行视觉映射。

`visualMap` 组件可以定义为 [分段型（visualMapPiecewise）](~visualMap-piecewise) 或 [连续型（visualMapContinuous）](~visualMap-continuous)，通过 `type` 来区分。例如：

```javascript
option = {
    visualMap: [
        { // 第一个 visualMap 组件
            type: 'continuous', // 定义为连续型 visualMap
            ...
        },
        { // 第二个 visualMap 组件
            type: 'piecewise', // 定义为分段型 visualMap
            ...
        }
    ],
    ...
};
```

<br>
**✦ 视觉映射方式的配置 ✦**

既然是『数据』到『视觉元素』的映射，`visualMap` 中可以指定数据的『哪个维度』（参见[visualMap.dimension](~visualMap.dimension)）映射到哪些『视觉元素』（参见[visualMap.inRange](~visualMap.inRange) 和 [visualMap.outOfRange](~visualMap.outOfRange)）中。

<br>
在 visualMap 组件所控制的 series 中，如果 series 中某个数据项需要避开 visualMap 映射，可以这么配置：
```
series: {
    type: '...',
    data: [
        {name: 'Shanghai', value: 251},
        {name: 'Haikou', value: 21},
        // 设置 `visualMap: false` 则 visualMap 不对此项进行控制，此时系列
        // 可使用自身的视觉参数（color/symbol/ ...控制此项的显示。
        {name: 'Beijing', value: 821, visualMap: false},
        ...
    ]
}
```



<br>
**✦ 与 ECharts2 中 dataRange 的关系 ✦**

`visualMap` 是由 ECharts2 中的 `dataRange` 组件改名以及扩展而来。ECharts3里 `option` 中的 `dataRange` 配置项仍然被兼容，会自动转换成 `visualMap` 配置项。在option中推荐写 `visualMap` 而非 `dataRange`。
