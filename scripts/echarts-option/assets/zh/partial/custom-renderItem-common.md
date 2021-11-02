custom 系列需要开发者自己提供图形渲染的逻辑。这个渲染逻辑一般命名为 [renderItem](~series-custom.renderItem)。例如：

```js
var option = {
    ...,
    series: [{
        type: 'custom',
        renderItem: function (params, api) {
            var categoryIndex = api.value(0);
            var start = api.coord([api.value(1), categoryIndex]);
            var end = api.coord([api.value(2), categoryIndex]);
            var height = api.size([0, 1])[1] * 0.6;

            var rectShape = echarts.graphic.clipRectByRect({
                x: start[0],
                y: start[1] - height / 2,
                width: end[0] - start[0],
                height: height
            }, {
                x: params.coordSys.x,
                y: params.coordSys.y,
                width: params.coordSys.width,
                height: params.coordSys.height
            });

            return rectShape && {
                type: 'rect',
                shape: rectShape,
                style: api.style()
            };
        },
        data: data
    }]
}
```

对于 `data` 中的每个数据项（为方便描述，这里称为 `dataItem`)，会调用此 [renderItem](~series-custom.renderItem) 函数。

[renderItem](~series-custom.renderItem) 函数提供了两个参数：
+ [params](~series-custom.renderItem.arguments.params)：包含了当前数据信息和坐标系的信息。
+ [api](~series-custom.renderItem.arguments.api)：是一些开发者可调用的方法集合。

[renderItem](~series-custom.renderItem) 函数须返回根据此 `dataItem` 绘制出的图形元素的定义信息，参见 [renderItem.return](~series-custom.renderItem.return)。

一般来说，[renderItem](~series-custom.renderItem) 函数的主要逻辑，是将 `dataItem` 里的值映射到坐标系上的图形元素。这一般需要用到 [renderItem.arguments.api](~series-custom.renderItem.arguments.api) 中的两个函数：
+ [api.value(...)](~series-custom.renderItem.arguments.api.value)，意思是取出 `dataItem` 中的数值。例如 `api.value(0)` 表示取出当前 `dataItem` 中第一个维度的数值。
+ [api.coord(...)](~series-custom.renderItem.arguments.api.coord)，意思是进行坐标转换计算。例如 `var point = api.coord([api.value(0), api.value(1)])` 表示 `dataItem` 中的数值转换成坐标系上的点。

有时候还需要用到 [api.size(...)](~series-custom.renderItem.arguments.api.size) 函数，表示得到坐标系上一段数值范围对应的长度。

返回值中样式的设置可以使用 [api.style(...)](~series-custom.renderItem.arguments.api.style) 函数，他能得到 [series.itemStyle](~series-custom.itemStyle) 中定义的样式信息，以及视觉映射的样式信息。也可以用这种方式覆盖这些样式信息：`api.style({fill: 'green', stroke: 'yellow'})`。
