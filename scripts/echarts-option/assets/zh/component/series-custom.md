# series.custom(Object)

**自定义系列**

自定义系列可以自定义系列中的图形元素渲染。从而能扩展出不同的图表。

同时，echarts 会统一管理图形的创建删除、动画、与其他组件（如 [dataZoom](~dataZoom)、[visualMap](~visualMap)）的联动，使开发者不必纠结这些细节。

**例如，下面的例子使用 custom series 扩展出了 x-range 图：**
~[800x500](https://echarts.apache.org/examples/zh/view.html?c=custom-profile&reset=1&edit=1)

**更多的例子参见：[custom examples](/examples/zh/index.html#chart-type-custom)**

**[这里是个教程](tutorial.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%B3%BB%E5%88%97)**

**开发者自定义渲染逻辑（renderItem 函数）**



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





**维度的映射（encode 和 dimensions 属性）**

`custom` 系列往往需要定义 [series.encode](~series-custom.encode)，主要用于指明 `data` 的哪些维度映射到哪些数轴上。从而，echarts 能根据这些维度的值的范围，画出合适的数轴刻度。
同时，encode.tooltip 和 encode.label 也可以被指定，指明默认的 tooltip 和 label 显示什么内容。[series.dimensions](~series-custom.dimensions) 也可以被指定，指明显示在 tooltip 中的维度名称，或者维度的类型。

例如：
```js
series: {
    type: 'custom',
    renderItem: function () {
        ...
    },
    encode: {
        x: [2, 4, 3],
        y: 1,
        label: 0,
        tooltip: [2, 4, 3]
    }
}
```

**与 dataZoom 组件的结合**

与 [dataZoom](~dataZoom) 结合使用的时候，常常使用会设置 [dataZoom.filterMode](~dataZoom.filterMode) 为 'weakFilter'，从而让 `dataItem` 部分超出坐标系边界的时候，不会整体被过滤掉。

**关于 `dataIndex` 和 `dataIndexInside` 的区别**



+ `dataIndex` 指的 `dataItem` 在原始数据中的 index。
+ `dataIndexInside` 指的是 `dataItem` 在当前数据窗口（参见 [dataZoom](~dataZoom)）中的 index。

[renderItem.arguments.api](~series-custom.renderItem.arguments.api) 中使用的参数都是 `dataIndexInside` 而非 `dataIndex`，因为从 `dataIndex` 转换成 `dataIndexInside` 需要时间开销。



**Event listener**

```js
chart.setOption({
    // ...
    series: {
        type: 'custom',
        renderItem: function () {
            // ...
            return {
                type: 'group',
                children: [{
                    type: 'circle'
                    // ...
                }, {
                    type: 'circle',
                    name: 'aaa',
                    // 用户指定的信息，可以在 event handler 访问到。
                    info: 12345,
                    // ...
                }]
            };
        }
    }
});
chart.on('click', {element: 'aaa'}, function (params) {
    // 当 name 为 'aaa' 的图形元素被点击时，此回调被触发。
    console.log(params.info);
});
```

## type(string) = 'custom'



## id(string)

组件 ID。默认不指定。指定则可用于在 option 或者 API 中引用组件。





## name(string)

系列名称，用于[tooltip](~tooltip)的显示，[legend](~legend) 的图例筛选，在 `setOption` 更新数据和配置项时用于指定对应的系列。





## colorBy(string) = 'series'



> 从 `v5.2.0` 开始支持



从调色盘 [option.color](~color) 中取色的策略，可取值为：

+ `'series'`：按照系列分配调色盘中的颜色，同一系列中的所有数据都是用相同的颜色；
+ `'data'`：按照数据项分配调色盘中的颜色，每个数据项都使用不同的颜色。




## legendHoverLink(boolean) = true

<ExampleUIControlBoolean default="true" />

是否启用[图例](~legend) hover 时的联动高亮。





## coordinateSystem(string) = \'cartesian2d\'

该系列使用的坐标系，可选：


+ `null` 或者 `'none'`

    无坐标系。



+ `'cartesian2d'`

    使用二维的直角坐标系（也称笛卡尔坐标系），通过 [xAxisIndex](~series-custom.xAxisIndex), [yAxisIndex](~series-custom.yAxisIndex)指定相应的坐标轴组件。



+ `'polar'`

    使用极坐标系，通过 [polarIndex](~series-custom.polarIndex) 指定相应的极坐标组件



+ `'geo'`

    使用地理坐标系，通过 [geoIndex](~series-custom.geoIndex) 指定相应的地理坐标系组件。





+ `'none'`

    不使用坐标系。



## xAxisIndex(number) = 0

使用的 [x 轴](~xAxis)的 index，在单个图表实例中存在多个 x 轴的时候有用。

## yAxisIndex(number) = 0

使用的 [y 轴](~yAxis)的 index，在单个图表实例中存在多个 y轴的时候有用。



## polarIndex(number) = 0

使用的[极坐标系](~polar)的 index，在单个图表实例中存在多个极坐标系的时候有用。



## geoIndex(number) = 0

使用的[地理坐标系](~geo)的 index，在单个图表实例中存在多个地理坐标系的时候有用。





## calendarIndex(number) = 0

使用的[日历坐标系](~calendar)的 index，在单个图表实例中存在多个日历坐标系的时候有用。




## renderItem(Function)



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





### arguments(*)

renderItem 函数的参数。

#### params(Object)

renderItem 函数的第一个参数，含有：

```js
{
    context: // {Object} 一个可供开发者暂存东西的对象。生命周期只为：当前次的渲染。
    seriesId: // {string} 本系列 id。
    seriesName: // {string} 本系列 name。
    seriesIndex: // {number} 本系列 index。
    dataIndex: // {number} 数据项的 index。
    dataIndexInside: // {number} 数据项在当前坐标系中可见的数据的 index（即 dataZoom 当前窗口中的数据的 index）。
    dataInsideLength: // {number} 当前坐标系中可见的数据长度（即 dataZoom 当前窗口中的数据数量）。
    actionType: // {string} 触发此次重绘的 action 的 type。
    coordSys: // 不同的坐标系中，coordSys 里的信息不一样，含有如下这些可能：
    coordSys: {
        type: 'cartesian2d',
        x: // {number} grid rect 的 x
        y: // {number} grid rect 的 y
        width: // {number} grid rect 的 width
        height: // {number} grid rect 的 height
    },
    coordSys: {
        type: 'calendar',
        x: // {number} calendar rect 的 x
        y: // {number} calendar rect 的 y
        width: // {number} calendar rect 的 width
        height: // {number} calendar rect 的 height
        cellWidth: // {number} calendar cellWidth
        cellHeight: // {number} calendar cellHeight
        rangeInfo: {
            start: // calendar 日期开端
            end: // calendar 日期结尾
            weeks: // calendar 周数
            dayCount: // calendar 日数
        }
    },
    coordSys: {
        type: 'geo',
        x: // {number} geo rect 的 x
        y: // {number} geo rect 的 y
        width: // {number} geo rect 的 width
        height: // {number} geo rect 的 height
        zoom: // {number} 缩放的比率。如果没有缩放，则值为 1。例如 0.5 表示缩小了一半。
    },
    coordSys: {
        type: 'polar',
        cx: // {number} polar 的中心坐标
        cy: // {number} polar 的中心坐标
        r: // {number} polar 的外半径
        r0: // {number} polar 的内半径
    },
    coordSys: {
        type: 'singleAxis',
        x: // {number} singleAxis rect 的 x
        y: // {number} singleAxis rect 的 y
        width: // {number} singleAxis rect 的 width
        height: // {number} singleAxis rect 的 height
    }
}
```

其中，关于 `dataIndex` 和 `dataIndexInside` 的区别：



+ `dataIndex` 指的 `dataItem` 在原始数据中的 index。
+ `dataIndexInside` 指的是 `dataItem` 在当前数据窗口（参见 [dataZoom](~dataZoom)）中的 index。

[renderItem.arguments.api](~series-custom.renderItem.arguments.api) 中使用的参数都是 `dataIndexInside` 而非 `dataIndex`，因为从 `dataIndex` 转换成 `dataIndexInside` 需要时间开销。



#### api(Object)

renderItem 函数的第二个参数。

##### value(Function)

得到给定维度的数据值。

```
@param {number} dimension 指定的维度（维度从 0 开始计数）。
@param {number} [dataIndexInside] 一般不用传，默认就是当前数据项的 dataIndexInside。
@return {number} 给定维度上的值。
```

##### coord(Function)

将数据值映射到坐标系上。

```
@param {Array.<number>} data 数据值。
@return {Array.<number>} 画布上的点的坐标，至少包含：[x, y]
        对于polar坐标系，还会包含其他信息：
        polar: [x, y, radius, angle]
```

##### size(Function)

给定数据范围，映射到坐标系上后的长度。

例如，cartesian2d中，`api.size([2, 4])` 返回 `[12.4, 55]`，表示 x 轴数据范围为 2 映射得到长度是 `12.4`，y 轴数据范围为 4 时应设得到长度为 `55`。

在一些坐标系中，如极坐标系（polar）或者有 log 数轴的坐标系，不同点的长度是不同的，所以需要第二个参数，指定获取长度的点。

```
@param {Array.<number>} dataSize 数据范围。
@param {Array.<number>} dataItem 获取长度的点。
@return {Array.<number>} 画布上的长度
```

##### style(Function)

能得到 [series.itemStyle](~series-custom.itemStyle) 中定义的样式信息和视觉映射得到的样式信息，可直接用于绘制图元。也可以用这种方式覆盖这些样式信息：`api.style({fill: 'green', stroke: 'yellow'})`。

```
@param {Object} [extra] 额外指定的样式信息。
@param {number} [dataIndexInside] 一般不用传，默认就是当前数据项的 dataIndexInside。
@return {Object} 直接用于绘制图元的样式信息。
```

##### styleEmphasis(Function)

能得到 [series.itemStyle.emphasis](~series-custom.itemStyle.emphasis) 中定义的样式信息和视觉映射的样式信息，可直接用于绘制图元。也可以用这种方式覆盖这些样式信息：`api.style({fill: 'green', stroke: 'yellow'})`。

```
@param {Object} [extra] 额外指定的样式信息。
@param {number} [dataIndexInside] 一般不用传，默认就是当前数据项的 dataIndexInside。
@return {Object} 直接用于绘制图元的样式信息。
```

##### visual(Function)

得到视觉映射的样式信息。比较少被使用。

```
@param {string} visualType 'color', 'symbol', 'symbolSize', ...
@param {number} [dataIndexInside] 一般不用传，默认就是当前数据项的 dataIndexInside。
@return {string|number} 视觉映射的样式值。
```

##### barLayout(Function)

当需要采用 barLayout 的时候，比如向柱状图上附加些东西，可以用这个方法得到 layout 信息。
参见 [例子](custom-bar-trend)。

```
@param {Object} opt
@param {number} opt.count 每个簇有多少个 bar。
@param {number|string} [opt.barWidth] bar 宽度。
        可以是绝对值例如 `40` 或者百分数例如 `'60%'`。
        百分数基于自动计算出的每一类目的宽度。
@param {number|string} [opt.barMaxWidth] bar 最大宽度。
        可以是绝对值例如 `40` 或者百分数例如 `'60%'`。
        百分数基于自动计算出的每一类目的宽度。
        比 `opt.barWidth` 优先级高。
@param {number|string} [opt.barMinWidth] bar 最小宽度。
        可以是绝对值例如 `40` 或者百分数例如 `'60%'`。
        百分数基于自动计算出的每一类目的宽度。
        比 `opt.barWidth` 优先级高。
@param {number} [opt.barGap] 每个簇的 bar 之间的宽度。
@param {number} [opt.barCategoryGap] 不同簇间的宽度。
@return {Array.<Object>} [{
        width: number bar 的宽度。
        offset: number bar 的偏移量，以bar最左为基准。
        offsetCenter: number bar 的偏移量，以bar中心为基准。
    }, ...]
```

##### currentSeriesIndices(Function)

得到系列的 当前index。注意这个 index 不同于系列定义时的 index。这个 index 是当 legend 组件进行了系列筛选后，剩余的系列排列后的 index。

```
@return {number}
```

##### font(Function)

得到可以直接进行样式设置的文字信息字符串。

```
@param {Object} opt
@param {string} [opt.fontStyle]
@param {number} [opt.fontWeight]
@param {number} [opt.fontSize]
@param {string} [opt.fontFamily]
@return {string} font 字符串。
```

##### getWidth(Function)

```
@return {number} echarts 容器的宽度。
```

##### getHeight(Function)

```
@return {number} echarts 容器的高度。
```

##### getZr(Function)

```
@return {module:zrender} zrender 实例。
```

##### getDevicePixelRatio(Function)

```
@return {number} 得到当前 devicePixelRatio。
```

### return(Object)

图形元素。每个图形元素是一个 object。详细信息参见：[graphic](~graphic.elements)。（width\height\top\bottom 不支持）

如果什么都不渲染，可以不返回任何东西。

例如：
```js
// 单独一个矩形
{
    type: 'rect',
    shape: {
        x: x, y: y, width: width, height: height
    },
    style: api.style()
}
```

```js
// 一组图形元素
{
    type: 'group',
    // 如果 diffChildrenByName 设为 true，则会使用 child.name 进行 diff，
    // 从而能有更好的过度动画，但是降低性能。缺省为 false。
    // diffChildrenByName: true,
    children: [{
        type: 'circle',
        shape: {
            cx: cx, cy: cy, r: r
        },
        style: api.style()
    }, {
        type: 'line',
        shape: {
            x1: x1, y1: y1, x2: x2, y2: y2
        },
        style: api.style()
    }]
}
```



### return_group(Object)

group 是唯一的可以有子节点的容器。group 可以用来整体定位一组图形元素。



#### type(string) = group

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~series-custom.renderItem.return_image),
[text](~series-custom.renderItem.return_text),
[circle](~series-custom.renderItem.return_circle),
[sector](~series-custom.renderItem.return_sector),
[ring](~series-custom.renderItem.return_ring),
[polygon](~series-custom.renderItem.return_polygon),
[polyline](~series-custom.renderItem.return_polyline),
[rect](~series-custom.renderItem.return_rect),
[line](~series-custom.renderItem.return_line),
[bezierCurve](~series-custom.renderItem.return_bezierCurve),
[arc](~series-custom.renderItem.return_arc),
[group](~series-custom.renderItem.return_group),





#### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。





#### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_group.x) 和 [y](~series-custom.renderItem.return_group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_group.scaleX) 和 [scaleY](~series-custom.renderItem.return_group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_group.originX) 和 [originY](~series-custom.renderItem.return_group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_group.x) 和 [y](~series-custom.renderItem.return_group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_group.scaleX) 和 [scaleY](~series-custom.renderItem.return_group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_group.originX) 和 [originY](~series-custom.renderItem.return_group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_group.x) 和 [y](~series-custom.renderItem.return_group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_group.scaleX) 和 [scaleY](~series-custom.renderItem.return_group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_group.originX) 和 [originY](~series-custom.renderItem.return_group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_group.x) 和 [y](~series-custom.renderItem.return_group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_group.scaleX) 和 [scaleY](~series-custom.renderItem.return_group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_group.originX) 和 [originY](~series-custom.renderItem.return_group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_group.x) 和 [y](~series-custom.renderItem.return_group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_group.scaleX) 和 [scaleY](~series-custom.renderItem.return_group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_group.originX) 和 [originY](~series-custom.renderItem.return_group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_group.x) 和 [y](~series-custom.renderItem.return_group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_group.scaleX) 和 [scaleY](~series-custom.renderItem.return_group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_group.originX) 和 [originY](~series-custom.renderItem.return_group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_group.x) 和 [y](~series-custom.renderItem.return_group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_group.scaleX) 和 [scaleY](~series-custom.renderItem.return_group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_group.originX) 和 [originY](~series-custom.renderItem.return_group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。










#### transition(string|Array) = ['x', 'y']

可以指定一个属性名，或者一组属性名。被指定的属性值变化时，会开启过渡动画。

属性只可以是：
+ Transform 相关的属性：[`'x'`](~series-custom.renderItem.return_group.x), [`'y'`](~series-custom.renderItem.return_group.y)、[`'scaleX'`](~series-custom.renderItem.return_group.scaleX)、[`'scaleY'`](~series-custom.renderItem.return_group.scaleY)、[`'rotation'`](~series-custom.renderItem.return_group.rotation)、[`'originX'`](~series-custom.renderItem.return_group.originX)、[`'originY'`](~series-custom.renderItem.return_group.originY)。例如：
    ```js
    renderItem: function (params, api) {
        var coord = api.coord([api.value(0), api.value[1]);
        return {
            type: 'rect',
            x: coord[0],
            y: coord[1],
            shape: {
                x: 0,
                y: 0,
                width: api.value(2),
                height: 100
            },
            transition: ['x', 'y', 'width']
        }
    }
    ```
+ 还可以是这三个属性 [`'shape'`](~series-custom.renderItem.return_group.shape)、['`style'`](~series-custom.renderItem.return_group.style)、[`'extra'`](~series-custom.renderItem.return_group.extra)。表示这三个属性中所有的子属性都开启过渡动画。例如：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3)
            },
            // 表示 shape 中所有属性都开启过渡动画。
            transition: 'shape',
        };
    }
    ```
    这等价于：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3),
                // transition 放在 shape 中，能只指定部分属性开启过渡动画。
                transition: ['x', 'y', 'width', 'height']
            }
        };
    }
    ```

当 transition 没有指定时，[`'x'`](~series-custom.renderItem.return_group.x) 和 [`'y'`](~series-custom.renderItem.return_group.y) 会默认开启过渡动画。如果想禁用这种默认，可设定：
```js
transition: [] // 一个空数组
```

看这个 [例子](doc-example/custom-transition-simple&edit=1&reset=1)。







#### z2(number) = undefined

用于决定图形元素的覆盖关系。

#### name(string) = undefined

参见 [diffChildrenByName](~series-custom.renderItem.return_group.diffChildrenByName)。


#### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

#### silent(boolean) = false

是否不响应鼠标以及触摸事件。

#### invisible(boolean) = false

节点是否可见。

#### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

#### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#series-custom.renderItem.return_text)。


#### textConfig(Object)

##### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

##### rotation(number)

`textContent` 的旋转弧度。

##### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

##### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

##### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

##### distance(number) = 5

距离 `layoutRect` 的距离。

##### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

##### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

##### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

##### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

##### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

##### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。




#### during(Function)

在动画的每一帧里，用户可以使用 `during` 回调来设定节点的各种属性。

```js
(duringAPI: CustomDuringAPI) => void

interface CustomDuringAPI {
    // 设置 transform 属性值。
    // transform 属性参见 `TransformProp`。
    setTransform(key: TransformProp, val: unknown): void;
    // 获得当前动画帧的 transform 属性值。
    getTransform(key: TransformProp): unknown;
    // 设置 shape 属性值。
    // shape 属性形如：`{ type: 'rect', shape: { xxxProp: xxxValue } }`。
    setShape(key: string, val: unknown): void;
    // 获得当前动画帧的 shape 属性值。
    getShape(key: string): unknown;
    // 设置 style 属性值。
    // style 属性形如：`{ type: 'rect', style: { xxxProp: xxxValue } }`。
    setStyle(key: string, val: unknown): void;
    // 获得当前动画帧的 style 属性值。
    getStyle(key: string): unknown;
    // 设置 extra 属性值。
    // extra 属性形如：`{ type: 'rect', extra: { xxxProp: xxxValue } }`。
    setExtra(key: string, val: unknown): void;
    // 获得当前动画帧的 extra 属性值。
    getExtra(key: string): unknown;
}

type TransformProp =
    'x' | 'y' | 'scaleX' | 'scaleY' | 'originX' | 'originY' | 'rotation';
```

在绝大多数场景下，用户不需要这个 `during` 回调。因为，假如属性被设定到 [transition](option.html#series-custom.renderItem.return_rect.transition) 中后，echarts 会自动对它进行插值，并且基于这些插值形成动画。但是，如果这些插值形成的动画不满足用户需求，那么用户可以使用 `during` 回调来定制他们。

例如，如果用户使用 [polygon](option.html#series-custom.renderItem.return_polygon) 画图形，图形的形状会由 [shape.points](option.html#series-custom.renderItem.return_polygon.shape.points) 来定义，形如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...]
    },
    // ...
}
```
如果用户指定了 [transition](option.html#series-custom.renderItem.return_polygon.transition) 如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...],
    },
    transition: 'shape'
    // ...
}
```
尽管这些 `points` 会被 echarts 自动插值，但是这样形成的动画里，这些点会直线走向目标位置。假如用户需求是，这些点要按照某种特定的路径（如弧线、螺旋）来移动，则这就不满足了。所以在这种情况下，可以使用 `during` 回调如下：
```js
{
    type: 'polygon',
    shape: {
        points: calculatePoints(initialDegree),
        transition: 'points'
    },
    extra: {
        degree: nextDegree
    },
    // 让 echarts 对 `extra.degree` 进行插值，然后基于
    // `extra.degree` 来计算动画中每一帧时的 polygon 形状。
    transition: 'extra',
    during: function (duringAPI) {
        var currentDegree = duringAPI.getExtra('degree');
        duringAPI.setShape(calculatePoints(currentDegree));
    }
    // ...
}
```

也参见这个 [例子](custom-spiral-race&edit=1&reset=1)。





#### extra(Object)

用户可以在 `extra` 字段中定义自己的属性。`extra` 的往往会结合 [during](option.html#series-custom.renderItem.return_rect.during) 一起使用。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `extra` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `extra` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `extra` 下所有属性开启过渡动画。
        transition: 'extra',
    };
}
```

















#### width(number) = 0

用于描述此 `group` 的宽。

这个宽只用于给子节点定位。

即便当宽度为零的时候，子节点也可以使用 `left: 'center'` 相对于父节点水平居中。

#### height(number) = 0

用于描述此 `group` 的高。

这个高只用于给子节点定位。

即便当高度为零的时候，子节点也可以使用 `top: 'middle'` 相对于父节点垂直居中。

#### diffChildrenByName(boolean) = false

在 [自定义系列](~series-custom) 中，当 `diffChildrenByName: true` 时，对于 [renderItem](~series-custom.renderItem) 返回值中的每一个 [group](~series-custom.renderItem.return_group)，会根据其 [children](~series-custom.renderItem.return_group.children) 中每个图形元素的 [name](~series-custom.renderItem.return_polygon.name) 属性进行 "diff"。在这里，"diff" 的意思是，重绘的时候，在已存在的图形元素和新的图形元素之间建立对应关系（依据 `name` 是否相同），从如果数据有更新，能够形成的过渡动画。

但是注意，这会有性能开销。如果数据量较大，不要开启这个功能。

#### children(Array)

子节点列表，其中项都是一个图形元素定义。



#### type(string) = group

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~series-custom.renderItem.return_image),
[text](~series-custom.renderItem.return_text),
[circle](~series-custom.renderItem.return_circle),
[sector](~series-custom.renderItem.return_sector),
[ring](~series-custom.renderItem.return_ring),
[polygon](~series-custom.renderItem.return_polygon),
[polyline](~series-custom.renderItem.return_polyline),
[rect](~series-custom.renderItem.return_rect),
[line](~series-custom.renderItem.return_line),
[bezierCurve](~series-custom.renderItem.return_bezierCurve),
[arc](~series-custom.renderItem.return_arc),
[group](~series-custom.renderItem.return_group),





#### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。





#### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_group.x) 和 [y](~series-custom.renderItem.return_group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_group.scaleX) 和 [scaleY](~series-custom.renderItem.return_group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_group.originX) 和 [originY](~series-custom.renderItem.return_group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_group.x) 和 [y](~series-custom.renderItem.return_group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_group.scaleX) 和 [scaleY](~series-custom.renderItem.return_group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_group.originX) 和 [originY](~series-custom.renderItem.return_group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_group.x) 和 [y](~series-custom.renderItem.return_group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_group.scaleX) 和 [scaleY](~series-custom.renderItem.return_group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_group.originX) 和 [originY](~series-custom.renderItem.return_group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_group.x) 和 [y](~series-custom.renderItem.return_group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_group.scaleX) 和 [scaleY](~series-custom.renderItem.return_group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_group.originX) 和 [originY](~series-custom.renderItem.return_group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_group.x) 和 [y](~series-custom.renderItem.return_group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_group.scaleX) 和 [scaleY](~series-custom.renderItem.return_group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_group.originX) 和 [originY](~series-custom.renderItem.return_group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_group.x) 和 [y](~series-custom.renderItem.return_group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_group.scaleX) 和 [scaleY](~series-custom.renderItem.return_group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_group.originX) 和 [originY](~series-custom.renderItem.return_group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_group.x) 和 [y](~series-custom.renderItem.return_group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_group.scaleX) 和 [scaleY](~series-custom.renderItem.return_group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_group.originX) 和 [originY](~series-custom.renderItem.return_group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。










#### transition(string|Array) = ['x', 'y']

可以指定一个属性名，或者一组属性名。被指定的属性值变化时，会开启过渡动画。

属性只可以是：
+ Transform 相关的属性：[`'x'`](~series-custom.renderItem.return_group.x), [`'y'`](~series-custom.renderItem.return_group.y)、[`'scaleX'`](~series-custom.renderItem.return_group.scaleX)、[`'scaleY'`](~series-custom.renderItem.return_group.scaleY)、[`'rotation'`](~series-custom.renderItem.return_group.rotation)、[`'originX'`](~series-custom.renderItem.return_group.originX)、[`'originY'`](~series-custom.renderItem.return_group.originY)。例如：
    ```js
    renderItem: function (params, api) {
        var coord = api.coord([api.value(0), api.value[1]);
        return {
            type: 'rect',
            x: coord[0],
            y: coord[1],
            shape: {
                x: 0,
                y: 0,
                width: api.value(2),
                height: 100
            },
            transition: ['x', 'y', 'width']
        }
    }
    ```
+ 还可以是这三个属性 [`'shape'`](~series-custom.renderItem.return_group.shape)、['`style'`](~series-custom.renderItem.return_group.style)、[`'extra'`](~series-custom.renderItem.return_group.extra)。表示这三个属性中所有的子属性都开启过渡动画。例如：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3)
            },
            // 表示 shape 中所有属性都开启过渡动画。
            transition: 'shape',
        };
    }
    ```
    这等价于：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3),
                // transition 放在 shape 中，能只指定部分属性开启过渡动画。
                transition: ['x', 'y', 'width', 'height']
            }
        };
    }
    ```

当 transition 没有指定时，[`'x'`](~series-custom.renderItem.return_group.x) 和 [`'y'`](~series-custom.renderItem.return_group.y) 会默认开启过渡动画。如果想禁用这种默认，可设定：
```js
transition: [] // 一个空数组
```

看这个 [例子](doc-example/custom-transition-simple&edit=1&reset=1)。







#### z2(number) = undefined

用于决定图形元素的覆盖关系。

#### name(string) = undefined

参见 [diffChildrenByName](~series-custom.renderItem.return_group.diffChildrenByName)。


#### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

#### silent(boolean) = false

是否不响应鼠标以及触摸事件。

#### invisible(boolean) = false

节点是否可见。

#### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

#### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#series-custom.renderItem.return_text)。


#### textConfig(Object)

##### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

##### rotation(number)

`textContent` 的旋转弧度。

##### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

##### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

##### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

##### distance(number) = 5

距离 `layoutRect` 的距离。

##### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

##### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

##### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

##### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

##### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

##### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。




#### during(Function)

在动画的每一帧里，用户可以使用 `during` 回调来设定节点的各种属性。

```js
(duringAPI: CustomDuringAPI) => void

interface CustomDuringAPI {
    // 设置 transform 属性值。
    // transform 属性参见 `TransformProp`。
    setTransform(key: TransformProp, val: unknown): void;
    // 获得当前动画帧的 transform 属性值。
    getTransform(key: TransformProp): unknown;
    // 设置 shape 属性值。
    // shape 属性形如：`{ type: 'rect', shape: { xxxProp: xxxValue } }`。
    setShape(key: string, val: unknown): void;
    // 获得当前动画帧的 shape 属性值。
    getShape(key: string): unknown;
    // 设置 style 属性值。
    // style 属性形如：`{ type: 'rect', style: { xxxProp: xxxValue } }`。
    setStyle(key: string, val: unknown): void;
    // 获得当前动画帧的 style 属性值。
    getStyle(key: string): unknown;
    // 设置 extra 属性值。
    // extra 属性形如：`{ type: 'rect', extra: { xxxProp: xxxValue } }`。
    setExtra(key: string, val: unknown): void;
    // 获得当前动画帧的 extra 属性值。
    getExtra(key: string): unknown;
}

type TransformProp =
    'x' | 'y' | 'scaleX' | 'scaleY' | 'originX' | 'originY' | 'rotation';
```

在绝大多数场景下，用户不需要这个 `during` 回调。因为，假如属性被设定到 [transition](option.html#series-custom.renderItem.return_rect.transition) 中后，echarts 会自动对它进行插值，并且基于这些插值形成动画。但是，如果这些插值形成的动画不满足用户需求，那么用户可以使用 `during` 回调来定制他们。

例如，如果用户使用 [polygon](option.html#series-custom.renderItem.return_polygon) 画图形，图形的形状会由 [shape.points](option.html#series-custom.renderItem.return_polygon.shape.points) 来定义，形如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...]
    },
    // ...
}
```
如果用户指定了 [transition](option.html#series-custom.renderItem.return_polygon.transition) 如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...],
    },
    transition: 'shape'
    // ...
}
```
尽管这些 `points` 会被 echarts 自动插值，但是这样形成的动画里，这些点会直线走向目标位置。假如用户需求是，这些点要按照某种特定的路径（如弧线、螺旋）来移动，则这就不满足了。所以在这种情况下，可以使用 `during` 回调如下：
```js
{
    type: 'polygon',
    shape: {
        points: calculatePoints(initialDegree),
        transition: 'points'
    },
    extra: {
        degree: nextDegree
    },
    // 让 echarts 对 `extra.degree` 进行插值，然后基于
    // `extra.degree` 来计算动画中每一帧时的 polygon 形状。
    transition: 'extra',
    during: function (duringAPI) {
        var currentDegree = duringAPI.getExtra('degree');
        duringAPI.setShape(calculatePoints(currentDegree));
    }
    // ...
}
```

也参见这个 [例子](custom-spiral-race&edit=1&reset=1)。





#### extra(Object)

用户可以在 `extra` 字段中定义自己的属性。`extra` 的往往会结合 [during](option.html#series-custom.renderItem.return_rect.during) 一起使用。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `extra` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `extra` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `extra` 下所有属性开启过渡动画。
        transition: 'extra',
    };
}
```


























### return_path(Object)

可使用 [SVG PathData](http://www.w3.org/TR/SVG/paths.html#PathData) 做路径。
可以用来画图标，或者其他各种图形，因为可以很便捷得缩放以适应给定尺寸。

参见例子：
[icons](custom-calendar-icon) 和 [shapes](custom-gantt-flight)。

关于制定尺寸、拉伸还是平铺，参见 [layout](~series-custom.renderItem.return_path.shape.layout)。



#### type(string) = path

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~series-custom.renderItem.return_image),
[text](~series-custom.renderItem.return_text),
[circle](~series-custom.renderItem.return_circle),
[sector](~series-custom.renderItem.return_sector),
[ring](~series-custom.renderItem.return_ring),
[polygon](~series-custom.renderItem.return_polygon),
[polyline](~series-custom.renderItem.return_polyline),
[rect](~series-custom.renderItem.return_rect),
[line](~series-custom.renderItem.return_line),
[bezierCurve](~series-custom.renderItem.return_bezierCurve),
[arc](~series-custom.renderItem.return_arc),
[group](~series-custom.renderItem.return_group),





#### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。





#### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_path.x) 和 [y](~series-custom.renderItem.return_path.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_path.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_path.scaleX) 和 [scaleY](~series-custom.renderItem.return_path.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_path.originX) 和 [originY](~series-custom.renderItem.return_path.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_path.x) 和 [y](~series-custom.renderItem.return_path.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_path.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_path.scaleX) 和 [scaleY](~series-custom.renderItem.return_path.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_path.originX) 和 [originY](~series-custom.renderItem.return_path.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_path.x) 和 [y](~series-custom.renderItem.return_path.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_path.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_path.scaleX) 和 [scaleY](~series-custom.renderItem.return_path.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_path.originX) 和 [originY](~series-custom.renderItem.return_path.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_path.x) 和 [y](~series-custom.renderItem.return_path.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_path.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_path.scaleX) 和 [scaleY](~series-custom.renderItem.return_path.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_path.originX) 和 [originY](~series-custom.renderItem.return_path.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_path.x) 和 [y](~series-custom.renderItem.return_path.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_path.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_path.scaleX) 和 [scaleY](~series-custom.renderItem.return_path.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_path.originX) 和 [originY](~series-custom.renderItem.return_path.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_path.x) 和 [y](~series-custom.renderItem.return_path.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_path.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_path.scaleX) 和 [scaleY](~series-custom.renderItem.return_path.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_path.originX) 和 [originY](~series-custom.renderItem.return_path.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_path.x) 和 [y](~series-custom.renderItem.return_path.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_path.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_path.scaleX) 和 [scaleY](~series-custom.renderItem.return_path.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_path.originX) 和 [originY](~series-custom.renderItem.return_path.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。










#### transition(string|Array) = ['x', 'y']

可以指定一个属性名，或者一组属性名。被指定的属性值变化时，会开启过渡动画。

属性只可以是：
+ Transform 相关的属性：[`'x'`](~series-custom.renderItem.return_path.x), [`'y'`](~series-custom.renderItem.return_path.y)、[`'scaleX'`](~series-custom.renderItem.return_path.scaleX)、[`'scaleY'`](~series-custom.renderItem.return_path.scaleY)、[`'rotation'`](~series-custom.renderItem.return_path.rotation)、[`'originX'`](~series-custom.renderItem.return_path.originX)、[`'originY'`](~series-custom.renderItem.return_path.originY)。例如：
    ```js
    renderItem: function (params, api) {
        var coord = api.coord([api.value(0), api.value[1]);
        return {
            type: 'rect',
            x: coord[0],
            y: coord[1],
            shape: {
                x: 0,
                y: 0,
                width: api.value(2),
                height: 100
            },
            transition: ['x', 'y', 'width']
        }
    }
    ```
+ 还可以是这三个属性 [`'shape'`](~series-custom.renderItem.return_path.shape)、['`style'`](~series-custom.renderItem.return_path.style)、[`'extra'`](~series-custom.renderItem.return_path.extra)。表示这三个属性中所有的子属性都开启过渡动画。例如：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3)
            },
            // 表示 shape 中所有属性都开启过渡动画。
            transition: 'shape',
        };
    }
    ```
    这等价于：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3),
                // transition 放在 shape 中，能只指定部分属性开启过渡动画。
                transition: ['x', 'y', 'width', 'height']
            }
        };
    }
    ```

当 transition 没有指定时，[`'x'`](~series-custom.renderItem.return_path.x) 和 [`'y'`](~series-custom.renderItem.return_path.y) 会默认开启过渡动画。如果想禁用这种默认，可设定：
```js
transition: [] // 一个空数组
```

看这个 [例子](doc-example/custom-transition-simple&edit=1&reset=1)。



#### morph(boolean) = false

是否开启形变动画。

**什么情况下会展示出形变动画？**

`morph` 设置为 `true` 后，还需按照如下规则，来形成形变动画：

每次走渲染流程是，自定义系列会自动比较（diff）新旧数据。在这个 diff 过程中，如果发现，一组旧数据项和一组新数据项的值相等（相等的规则是，name 相同，或者 [transition](api.html#echartsInstance.setOption) 所指定的维度上的值相同），那么我们就找到了能形成形变动画的一对候选集。

在这组旧数据和这组新数据间，可能产生三种形变动画：
+ 一对一（one-to-one）：如果新数据组和旧数据组都各自只有一个数据项。
+ 一对多（one-to-many）：如果新数据组中有多个数据项，旧数据组中只有一个数据项。
+ 多对一（many-to-one）：如果新数据组中只有一个数据项，旧数据组中有多个数据项。

注：我们并不支持多对多（many-to-many）的情况。

然后，自定义系列，会在新旧组中，寻找声明为 `morph: true` 的图形元素，并分配他们形成真正的一一映射的形变，或者分裂（separating），或者合并（combining）。

参见示例：[custom-one-to-one-morph](custom-one-to-one-morph&edit=1&reset=1) 和
[custom-combine-separate-morph](custom-combine-separate-morph&edit=1&reset=1)。





#### z2(number) = undefined

用于决定图形元素的覆盖关系。

#### name(string) = undefined

参见 [diffChildrenByName](~series-custom.renderItem.return_path.diffChildrenByName)。


#### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

#### silent(boolean) = false

是否不响应鼠标以及触摸事件。

#### invisible(boolean) = false

节点是否可见。

#### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

#### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#series-custom.renderItem.return_text)。


#### textConfig(Object)

##### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

##### rotation(number)

`textContent` 的旋转弧度。

##### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

##### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

##### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

##### distance(number) = 5

距离 `layoutRect` 的距离。

##### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

##### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

##### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

##### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

##### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

##### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。




#### during(Function)

在动画的每一帧里，用户可以使用 `during` 回调来设定节点的各种属性。

```js
(duringAPI: CustomDuringAPI) => void

interface CustomDuringAPI {
    // 设置 transform 属性值。
    // transform 属性参见 `TransformProp`。
    setTransform(key: TransformProp, val: unknown): void;
    // 获得当前动画帧的 transform 属性值。
    getTransform(key: TransformProp): unknown;
    // 设置 shape 属性值。
    // shape 属性形如：`{ type: 'rect', shape: { xxxProp: xxxValue } }`。
    setShape(key: string, val: unknown): void;
    // 获得当前动画帧的 shape 属性值。
    getShape(key: string): unknown;
    // 设置 style 属性值。
    // style 属性形如：`{ type: 'rect', style: { xxxProp: xxxValue } }`。
    setStyle(key: string, val: unknown): void;
    // 获得当前动画帧的 style 属性值。
    getStyle(key: string): unknown;
    // 设置 extra 属性值。
    // extra 属性形如：`{ type: 'rect', extra: { xxxProp: xxxValue } }`。
    setExtra(key: string, val: unknown): void;
    // 获得当前动画帧的 extra 属性值。
    getExtra(key: string): unknown;
}

type TransformProp =
    'x' | 'y' | 'scaleX' | 'scaleY' | 'originX' | 'originY' | 'rotation';
```

在绝大多数场景下，用户不需要这个 `during` 回调。因为，假如属性被设定到 [transition](option.html#series-custom.renderItem.return_rect.transition) 中后，echarts 会自动对它进行插值，并且基于这些插值形成动画。但是，如果这些插值形成的动画不满足用户需求，那么用户可以使用 `during` 回调来定制他们。

例如，如果用户使用 [polygon](option.html#series-custom.renderItem.return_polygon) 画图形，图形的形状会由 [shape.points](option.html#series-custom.renderItem.return_polygon.shape.points) 来定义，形如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...]
    },
    // ...
}
```
如果用户指定了 [transition](option.html#series-custom.renderItem.return_polygon.transition) 如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...],
    },
    transition: 'shape'
    // ...
}
```
尽管这些 `points` 会被 echarts 自动插值，但是这样形成的动画里，这些点会直线走向目标位置。假如用户需求是，这些点要按照某种特定的路径（如弧线、螺旋）来移动，则这就不满足了。所以在这种情况下，可以使用 `during` 回调如下：
```js
{
    type: 'polygon',
    shape: {
        points: calculatePoints(initialDegree),
        transition: 'points'
    },
    extra: {
        degree: nextDegree
    },
    // 让 echarts 对 `extra.degree` 进行插值，然后基于
    // `extra.degree` 来计算动画中每一帧时的 polygon 形状。
    transition: 'extra',
    during: function (duringAPI) {
        var currentDegree = duringAPI.getExtra('degree');
        duringAPI.setShape(calculatePoints(currentDegree));
    }
    // ...
}
```

也参见这个 [例子](custom-spiral-race&edit=1&reset=1)。





#### extra(Object)

用户可以在 `extra` 字段中定义自己的属性。`extra` 的往往会结合 [during](option.html#series-custom.renderItem.return_rect.during) 一起使用。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `extra` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `extra` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `extra` 下所有属性开启过渡动画。
        transition: 'extra',
    };
}
```

















#### shape(Object)

##### pathData(string)

即 [SVG PathData](http://www.w3.org/TR/SVG/paths.html#PathData)。

例如：`'M0,0 L0,-20 L30,-20 C42,-20 38,-1 50,-1 L70,-1 L70,0 Z'`。

如果指定了 [width](~series-custom.renderItem.return_path.shape.width)、[height](~series-custom.renderItem.return_path.shape.height)、[x](~series-custom.renderItem.return_path.shape.x)、[y](~series-custom.renderItem.return_path.shape.y)，则会根据他们定义的矩形，缩放 PathData。如果没有指定这些，就不会缩放。

可使用 [layout](~series-custom.renderItem.return_path.shape.layout) 指定缩放策略。

参见例子：
[icons](custom-calendar-icon) 和 [shapes](custom-gantt-flight)。

##### d(string)

同 [pathData](~series-custom.renderItem.return_path.shape.pathData)，别名。

##### layout(string) = 'center'

如果指定了 [width](~series-custom.renderItem.return_path.shape.width)、[height](~series-custom.renderItem.return_path.shape.height)、[x](~series-custom.renderItem.return_path.shape.x)、[y](~series-custom.renderItem.return_path.shape.y)，则会根据他们定义的矩形，缩放 PathData。

`layout` 用于指定缩放策略。

可选值：
+ `'center'`：保持原来的 PathData 的长宽比，居于矩形中，尽可能撑大但不会超出矩形。
+ `'cover'`：PathData 拉伸为矩形的长宽比，完全填满矩形，不会超出矩形。



##### x(number) = 0

图形元素的左上角在父节点坐标系（以父节点左上角为原点）中的横坐标值。

##### y(number) = 0

图形元素的左上角在父节点坐标系（以父节点左上角为原点）中的纵坐标值。







##### width(number) = 0

图形元素的宽度。

##### height(numbr) = 0

图形元素的高度。








##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `shape` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        shape: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `shape` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        shape: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `shape` 下所有属性开启过渡动画。
        transition: 'shape',
    };
}
```






#### style(Object)



注：关于图形元素中更多的样式设置（例如 [富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)），参见 [zrender/graphic/Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable) 中的 style 相关属性。

注意，这里图形元素的样式属性名称直接源于 zrender，和 `echarts label`、`echarts itemStyle` 等处同样含义的样式属性名称或有不同。例如，有如下对应：

+ [itemStyle.color](~series-scatter.label.color) => `style.fill`
+ [itemStyle.borderColor](~series-scatter.label.color) => `style.stroke`
+ [label.color](~series-scatter.label.color) => `style.textFill`
+ [label.textBorderColor](~series-scatter.label.textBorderColor) => `style.textStroke`
+ ...

##### fill(string) = '#000'

填充色。

##### stroke(string) = null

笔画颜色。

##### lineWidth(number) = 0

笔画宽度。

##### shadowBlur(number) = undefined

阴影宽度。

##### shadowOffsetX(number) = undefined

阴影 X 方向偏移。

##### shadowOffsetY(number) = undefined

阴影 Y 方向偏移。

##### shadowColor(number) = undefined

阴影颜色。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `style` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        style: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `style` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        style: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `style` 下所有属性开启过渡动画。
        transition: 'style',
    };
}
```












#### focus(string) = 'none'



> 从 `v5.0.0` 开始支持



在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。支持如下配置：

+ `'none'` 不淡出其它图形，默认使用该配置。
+ `'self'` 只聚焦（不淡出）当前高亮的数据的图形。
+ `'series'` 聚焦当前高亮的数据所在的系列的所有图形。

#### blurScope(string) = 'coordinateSystem'



> 从 `v5.0.0` 开始支持



在开启`focus`的时候，可以通过`blurScope`配置淡出的范围。支持如下配置

+ `'coordinateSystem'` 淡出范围为坐标系，默认使用该配置。
+ `'series'` 淡出范围为系列。
+ `'global'` 淡出范围为全局。








#### emphasis(Object)

图形元素的高亮状态

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。

#### blur(Object)



> 从 `v5.0.0` 开始支持



图形元素的淡出状态，配置`focus`时有效。

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。

#### select(Object)



> 从 `v5.0.0` 开始支持



图形元素的选中状态，配置自定义系列的 [selectedMode](~series-custom.selectedMode) 时有效。

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。















### return_image(Object)



#### type(string) = image

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~series-custom.renderItem.return_image),
[text](~series-custom.renderItem.return_text),
[circle](~series-custom.renderItem.return_circle),
[sector](~series-custom.renderItem.return_sector),
[ring](~series-custom.renderItem.return_ring),
[polygon](~series-custom.renderItem.return_polygon),
[polyline](~series-custom.renderItem.return_polyline),
[rect](~series-custom.renderItem.return_rect),
[line](~series-custom.renderItem.return_line),
[bezierCurve](~series-custom.renderItem.return_bezierCurve),
[arc](~series-custom.renderItem.return_arc),
[group](~series-custom.renderItem.return_group),





#### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。





#### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_image.x) 和 [y](~series-custom.renderItem.return_image.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_image.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_image.scaleX) 和 [scaleY](~series-custom.renderItem.return_image.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_image.originX) 和 [originY](~series-custom.renderItem.return_image.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_image.x) 和 [y](~series-custom.renderItem.return_image.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_image.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_image.scaleX) 和 [scaleY](~series-custom.renderItem.return_image.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_image.originX) 和 [originY](~series-custom.renderItem.return_image.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_image.x) 和 [y](~series-custom.renderItem.return_image.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_image.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_image.scaleX) 和 [scaleY](~series-custom.renderItem.return_image.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_image.originX) 和 [originY](~series-custom.renderItem.return_image.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_image.x) 和 [y](~series-custom.renderItem.return_image.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_image.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_image.scaleX) 和 [scaleY](~series-custom.renderItem.return_image.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_image.originX) 和 [originY](~series-custom.renderItem.return_image.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_image.x) 和 [y](~series-custom.renderItem.return_image.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_image.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_image.scaleX) 和 [scaleY](~series-custom.renderItem.return_image.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_image.originX) 和 [originY](~series-custom.renderItem.return_image.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_image.x) 和 [y](~series-custom.renderItem.return_image.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_image.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_image.scaleX) 和 [scaleY](~series-custom.renderItem.return_image.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_image.originX) 和 [originY](~series-custom.renderItem.return_image.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_image.x) 和 [y](~series-custom.renderItem.return_image.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_image.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_image.scaleX) 和 [scaleY](~series-custom.renderItem.return_image.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_image.originX) 和 [originY](~series-custom.renderItem.return_image.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。










#### transition(string|Array) = ['x', 'y']

可以指定一个属性名，或者一组属性名。被指定的属性值变化时，会开启过渡动画。

属性只可以是：
+ Transform 相关的属性：[`'x'`](~series-custom.renderItem.return_image.x), [`'y'`](~series-custom.renderItem.return_image.y)、[`'scaleX'`](~series-custom.renderItem.return_image.scaleX)、[`'scaleY'`](~series-custom.renderItem.return_image.scaleY)、[`'rotation'`](~series-custom.renderItem.return_image.rotation)、[`'originX'`](~series-custom.renderItem.return_image.originX)、[`'originY'`](~series-custom.renderItem.return_image.originY)。例如：
    ```js
    renderItem: function (params, api) {
        var coord = api.coord([api.value(0), api.value[1]);
        return {
            type: 'rect',
            x: coord[0],
            y: coord[1],
            shape: {
                x: 0,
                y: 0,
                width: api.value(2),
                height: 100
            },
            transition: ['x', 'y', 'width']
        }
    }
    ```
+ 还可以是这三个属性 [`'shape'`](~series-custom.renderItem.return_image.shape)、['`style'`](~series-custom.renderItem.return_image.style)、[`'extra'`](~series-custom.renderItem.return_image.extra)。表示这三个属性中所有的子属性都开启过渡动画。例如：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3)
            },
            // 表示 shape 中所有属性都开启过渡动画。
            transition: 'shape',
        };
    }
    ```
    这等价于：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3),
                // transition 放在 shape 中，能只指定部分属性开启过渡动画。
                transition: ['x', 'y', 'width', 'height']
            }
        };
    }
    ```

当 transition 没有指定时，[`'x'`](~series-custom.renderItem.return_image.x) 和 [`'y'`](~series-custom.renderItem.return_image.y) 会默认开启过渡动画。如果想禁用这种默认，可设定：
```js
transition: [] // 一个空数组
```

看这个 [例子](doc-example/custom-transition-simple&edit=1&reset=1)。







#### z2(number) = undefined

用于决定图形元素的覆盖关系。

#### name(string) = undefined

参见 [diffChildrenByName](~series-custom.renderItem.return_image.diffChildrenByName)。


#### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

#### silent(boolean) = false

是否不响应鼠标以及触摸事件。

#### invisible(boolean) = false

节点是否可见。

#### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

#### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#series-custom.renderItem.return_text)。


#### textConfig(Object)

##### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

##### rotation(number)

`textContent` 的旋转弧度。

##### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

##### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

##### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

##### distance(number) = 5

距离 `layoutRect` 的距离。

##### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

##### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

##### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

##### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

##### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

##### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。




#### during(Function)

在动画的每一帧里，用户可以使用 `during` 回调来设定节点的各种属性。

```js
(duringAPI: CustomDuringAPI) => void

interface CustomDuringAPI {
    // 设置 transform 属性值。
    // transform 属性参见 `TransformProp`。
    setTransform(key: TransformProp, val: unknown): void;
    // 获得当前动画帧的 transform 属性值。
    getTransform(key: TransformProp): unknown;
    // 设置 shape 属性值。
    // shape 属性形如：`{ type: 'rect', shape: { xxxProp: xxxValue } }`。
    setShape(key: string, val: unknown): void;
    // 获得当前动画帧的 shape 属性值。
    getShape(key: string): unknown;
    // 设置 style 属性值。
    // style 属性形如：`{ type: 'rect', style: { xxxProp: xxxValue } }`。
    setStyle(key: string, val: unknown): void;
    // 获得当前动画帧的 style 属性值。
    getStyle(key: string): unknown;
    // 设置 extra 属性值。
    // extra 属性形如：`{ type: 'rect', extra: { xxxProp: xxxValue } }`。
    setExtra(key: string, val: unknown): void;
    // 获得当前动画帧的 extra 属性值。
    getExtra(key: string): unknown;
}

type TransformProp =
    'x' | 'y' | 'scaleX' | 'scaleY' | 'originX' | 'originY' | 'rotation';
```

在绝大多数场景下，用户不需要这个 `during` 回调。因为，假如属性被设定到 [transition](option.html#series-custom.renderItem.return_rect.transition) 中后，echarts 会自动对它进行插值，并且基于这些插值形成动画。但是，如果这些插值形成的动画不满足用户需求，那么用户可以使用 `during` 回调来定制他们。

例如，如果用户使用 [polygon](option.html#series-custom.renderItem.return_polygon) 画图形，图形的形状会由 [shape.points](option.html#series-custom.renderItem.return_polygon.shape.points) 来定义，形如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...]
    },
    // ...
}
```
如果用户指定了 [transition](option.html#series-custom.renderItem.return_polygon.transition) 如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...],
    },
    transition: 'shape'
    // ...
}
```
尽管这些 `points` 会被 echarts 自动插值，但是这样形成的动画里，这些点会直线走向目标位置。假如用户需求是，这些点要按照某种特定的路径（如弧线、螺旋）来移动，则这就不满足了。所以在这种情况下，可以使用 `during` 回调如下：
```js
{
    type: 'polygon',
    shape: {
        points: calculatePoints(initialDegree),
        transition: 'points'
    },
    extra: {
        degree: nextDegree
    },
    // 让 echarts 对 `extra.degree` 进行插值，然后基于
    // `extra.degree` 来计算动画中每一帧时的 polygon 形状。
    transition: 'extra',
    during: function (duringAPI) {
        var currentDegree = duringAPI.getExtra('degree');
        duringAPI.setShape(calculatePoints(currentDegree));
    }
    // ...
}
```

也参见这个 [例子](custom-spiral-race&edit=1&reset=1)。





#### extra(Object)

用户可以在 `extra` 字段中定义自己的属性。`extra` 的往往会结合 [during](option.html#series-custom.renderItem.return_rect.during) 一起使用。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `extra` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `extra` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `extra` 下所有属性开启过渡动画。
        transition: 'extra',
    };
}
```

















#### style(Object)

##### image(string)

图片的内容，可以是图片的 URL，也可以是 [dataURI](https://tools.ietf.org/html/rfc2397).



##### x(number) = 0

图形元素的左上角在父节点坐标系（以父节点左上角为原点）中的横坐标值。

##### y(number) = 0

图形元素的左上角在父节点坐标系（以父节点左上角为原点）中的纵坐标值。







##### width(number) = 0

图形元素的宽度。

##### height(numbr) = 0

图形元素的高度。







注：关于图形元素中更多的样式设置（例如 [富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)），参见 [zrender/graphic/Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable) 中的 style 相关属性。

注意，这里图形元素的样式属性名称直接源于 zrender，和 `echarts label`、`echarts itemStyle` 等处同样含义的样式属性名称或有不同。例如，有如下对应：

+ [itemStyle.color](~series-scatter.label.color) => `style.fill`
+ [itemStyle.borderColor](~series-scatter.label.color) => `style.stroke`
+ [label.color](~series-scatter.label.color) => `style.textFill`
+ [label.textBorderColor](~series-scatter.label.textBorderColor) => `style.textStroke`
+ ...

##### fill(string) = '#000'

填充色。

##### stroke(string) = null

笔画颜色。

##### lineWidth(number) = 0

笔画宽度。

##### shadowBlur(number) = undefined

阴影宽度。

##### shadowOffsetX(number) = undefined

阴影 X 方向偏移。

##### shadowOffsetY(number) = undefined

阴影 Y 方向偏移。

##### shadowColor(number) = undefined

阴影颜色。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `style` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        style: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `style` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        style: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `style` 下所有属性开启过渡动画。
        transition: 'style',
    };
}
```












#### focus(string) = 'none'



> 从 `v5.0.0` 开始支持



在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。支持如下配置：

+ `'none'` 不淡出其它图形，默认使用该配置。
+ `'self'` 只聚焦（不淡出）当前高亮的数据的图形。
+ `'series'` 聚焦当前高亮的数据所在的系列的所有图形。

#### blurScope(string) = 'coordinateSystem'



> 从 `v5.0.0` 开始支持



在开启`focus`的时候，可以通过`blurScope`配置淡出的范围。支持如下配置

+ `'coordinateSystem'` 淡出范围为坐标系，默认使用该配置。
+ `'series'` 淡出范围为系列。
+ `'global'` 淡出范围为全局。








#### emphasis(Object)

图形元素的高亮状态

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。

#### blur(Object)



> 从 `v5.0.0` 开始支持



图形元素的淡出状态，配置`focus`时有效。

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。

#### select(Object)



> 从 `v5.0.0` 开始支持



图形元素的选中状态，配置自定义系列的 [selectedMode](~series-custom.selectedMode) 时有效。

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。














### return_text(Object)

文本块。



#### type(string) = text

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~series-custom.renderItem.return_image),
[text](~series-custom.renderItem.return_text),
[circle](~series-custom.renderItem.return_circle),
[sector](~series-custom.renderItem.return_sector),
[ring](~series-custom.renderItem.return_ring),
[polygon](~series-custom.renderItem.return_polygon),
[polyline](~series-custom.renderItem.return_polyline),
[rect](~series-custom.renderItem.return_rect),
[line](~series-custom.renderItem.return_line),
[bezierCurve](~series-custom.renderItem.return_bezierCurve),
[arc](~series-custom.renderItem.return_arc),
[group](~series-custom.renderItem.return_group),





#### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。





#### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_text.x) 和 [y](~series-custom.renderItem.return_text.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_text.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_text.scaleX) 和 [scaleY](~series-custom.renderItem.return_text.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_text.originX) 和 [originY](~series-custom.renderItem.return_text.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_text.x) 和 [y](~series-custom.renderItem.return_text.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_text.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_text.scaleX) 和 [scaleY](~series-custom.renderItem.return_text.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_text.originX) 和 [originY](~series-custom.renderItem.return_text.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_text.x) 和 [y](~series-custom.renderItem.return_text.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_text.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_text.scaleX) 和 [scaleY](~series-custom.renderItem.return_text.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_text.originX) 和 [originY](~series-custom.renderItem.return_text.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_text.x) 和 [y](~series-custom.renderItem.return_text.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_text.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_text.scaleX) 和 [scaleY](~series-custom.renderItem.return_text.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_text.originX) 和 [originY](~series-custom.renderItem.return_text.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_text.x) 和 [y](~series-custom.renderItem.return_text.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_text.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_text.scaleX) 和 [scaleY](~series-custom.renderItem.return_text.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_text.originX) 和 [originY](~series-custom.renderItem.return_text.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_text.x) 和 [y](~series-custom.renderItem.return_text.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_text.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_text.scaleX) 和 [scaleY](~series-custom.renderItem.return_text.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_text.originX) 和 [originY](~series-custom.renderItem.return_text.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_text.x) 和 [y](~series-custom.renderItem.return_text.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_text.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_text.scaleX) 和 [scaleY](~series-custom.renderItem.return_text.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_text.originX) 和 [originY](~series-custom.renderItem.return_text.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。










#### transition(string|Array) = ['x', 'y']

可以指定一个属性名，或者一组属性名。被指定的属性值变化时，会开启过渡动画。

属性只可以是：
+ Transform 相关的属性：[`'x'`](~series-custom.renderItem.return_text.x), [`'y'`](~series-custom.renderItem.return_text.y)、[`'scaleX'`](~series-custom.renderItem.return_text.scaleX)、[`'scaleY'`](~series-custom.renderItem.return_text.scaleY)、[`'rotation'`](~series-custom.renderItem.return_text.rotation)、[`'originX'`](~series-custom.renderItem.return_text.originX)、[`'originY'`](~series-custom.renderItem.return_text.originY)。例如：
    ```js
    renderItem: function (params, api) {
        var coord = api.coord([api.value(0), api.value[1]);
        return {
            type: 'rect',
            x: coord[0],
            y: coord[1],
            shape: {
                x: 0,
                y: 0,
                width: api.value(2),
                height: 100
            },
            transition: ['x', 'y', 'width']
        }
    }
    ```
+ 还可以是这三个属性 [`'shape'`](~series-custom.renderItem.return_text.shape)、['`style'`](~series-custom.renderItem.return_text.style)、[`'extra'`](~series-custom.renderItem.return_text.extra)。表示这三个属性中所有的子属性都开启过渡动画。例如：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3)
            },
            // 表示 shape 中所有属性都开启过渡动画。
            transition: 'shape',
        };
    }
    ```
    这等价于：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3),
                // transition 放在 shape 中，能只指定部分属性开启过渡动画。
                transition: ['x', 'y', 'width', 'height']
            }
        };
    }
    ```

当 transition 没有指定时，[`'x'`](~series-custom.renderItem.return_text.x) 和 [`'y'`](~series-custom.renderItem.return_text.y) 会默认开启过渡动画。如果想禁用这种默认，可设定：
```js
transition: [] // 一个空数组
```

看这个 [例子](doc-example/custom-transition-simple&edit=1&reset=1)。







#### z2(number) = undefined

用于决定图形元素的覆盖关系。

#### name(string) = undefined

参见 [diffChildrenByName](~series-custom.renderItem.return_text.diffChildrenByName)。


#### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

#### silent(boolean) = false

是否不响应鼠标以及触摸事件。

#### invisible(boolean) = false

节点是否可见。

#### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

#### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#series-custom.renderItem.return_text)。


#### textConfig(Object)

##### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

##### rotation(number)

`textContent` 的旋转弧度。

##### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

##### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

##### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

##### distance(number) = 5

距离 `layoutRect` 的距离。

##### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

##### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

##### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

##### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

##### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

##### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。




#### during(Function)

在动画的每一帧里，用户可以使用 `during` 回调来设定节点的各种属性。

```js
(duringAPI: CustomDuringAPI) => void

interface CustomDuringAPI {
    // 设置 transform 属性值。
    // transform 属性参见 `TransformProp`。
    setTransform(key: TransformProp, val: unknown): void;
    // 获得当前动画帧的 transform 属性值。
    getTransform(key: TransformProp): unknown;
    // 设置 shape 属性值。
    // shape 属性形如：`{ type: 'rect', shape: { xxxProp: xxxValue } }`。
    setShape(key: string, val: unknown): void;
    // 获得当前动画帧的 shape 属性值。
    getShape(key: string): unknown;
    // 设置 style 属性值。
    // style 属性形如：`{ type: 'rect', style: { xxxProp: xxxValue } }`。
    setStyle(key: string, val: unknown): void;
    // 获得当前动画帧的 style 属性值。
    getStyle(key: string): unknown;
    // 设置 extra 属性值。
    // extra 属性形如：`{ type: 'rect', extra: { xxxProp: xxxValue } }`。
    setExtra(key: string, val: unknown): void;
    // 获得当前动画帧的 extra 属性值。
    getExtra(key: string): unknown;
}

type TransformProp =
    'x' | 'y' | 'scaleX' | 'scaleY' | 'originX' | 'originY' | 'rotation';
```

在绝大多数场景下，用户不需要这个 `during` 回调。因为，假如属性被设定到 [transition](option.html#series-custom.renderItem.return_rect.transition) 中后，echarts 会自动对它进行插值，并且基于这些插值形成动画。但是，如果这些插值形成的动画不满足用户需求，那么用户可以使用 `during` 回调来定制他们。

例如，如果用户使用 [polygon](option.html#series-custom.renderItem.return_polygon) 画图形，图形的形状会由 [shape.points](option.html#series-custom.renderItem.return_polygon.shape.points) 来定义，形如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...]
    },
    // ...
}
```
如果用户指定了 [transition](option.html#series-custom.renderItem.return_polygon.transition) 如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...],
    },
    transition: 'shape'
    // ...
}
```
尽管这些 `points` 会被 echarts 自动插值，但是这样形成的动画里，这些点会直线走向目标位置。假如用户需求是，这些点要按照某种特定的路径（如弧线、螺旋）来移动，则这就不满足了。所以在这种情况下，可以使用 `during` 回调如下：
```js
{
    type: 'polygon',
    shape: {
        points: calculatePoints(initialDegree),
        transition: 'points'
    },
    extra: {
        degree: nextDegree
    },
    // 让 echarts 对 `extra.degree` 进行插值，然后基于
    // `extra.degree` 来计算动画中每一帧时的 polygon 形状。
    transition: 'extra',
    during: function (duringAPI) {
        var currentDegree = duringAPI.getExtra('degree');
        duringAPI.setShape(calculatePoints(currentDegree));
    }
    // ...
}
```

也参见这个 [例子](custom-spiral-race&edit=1&reset=1)。





#### extra(Object)

用户可以在 `extra` 字段中定义自己的属性。`extra` 的往往会结合 [during](option.html#series-custom.renderItem.return_rect.during) 一起使用。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `extra` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `extra` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `extra` 下所有属性开启过渡动画。
        transition: 'extra',
    };
}
```

















#### style(Object)

##### text(string) = ''

文本块文字。可以使用 `\n` 来换行。



##### x(number) = 0

图形元素的左上角在父节点坐标系（以父节点左上角为原点）中的横坐标值。

##### y(number) = 0

图形元素的左上角在父节点坐标系（以父节点左上角为原点）中的纵坐标值。





##### font(string)

字体大小、字体类型、粗细、字体样式。格式参见 [css font](https://developer.mozilla.org/en-US/docs/Web/CSS/font)。

例如：
```
// size | family
font: '2em "STHeiti", sans-serif'

// style | weight | size | family
font: 'italic bolder 16px cursive'

// weight | size | family
font: 'bolder 2em "Microsoft YaHei", sans-serif'
```

##### textAlign(string) = 'left'

水平对齐方式，取值：`'left'`, `'center'`, `'right'`。

如果为 `'left'`，表示文本最左端在 `x` 值上。如果为 `'right'`，表示文本最右端在 `x` 值上。

##### textVerticalAlign(string)

垂直对齐方式，取值：`'top'`, `'middle'`, `'bottom'`。



注：关于图形元素中更多的样式设置（例如 [富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)），参见 [zrender/graphic/Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable) 中的 style 相关属性。

注意，这里图形元素的样式属性名称直接源于 zrender，和 `echarts label`、`echarts itemStyle` 等处同样含义的样式属性名称或有不同。例如，有如下对应：

+ [itemStyle.color](~series-scatter.label.color) => `style.fill`
+ [itemStyle.borderColor](~series-scatter.label.color) => `style.stroke`
+ [label.color](~series-scatter.label.color) => `style.textFill`
+ [label.textBorderColor](~series-scatter.label.textBorderColor) => `style.textStroke`
+ ...

##### fill(string) = '#000'

填充色。

##### stroke(string) = null

笔画颜色。

##### lineWidth(number) = 0

笔画宽度。

##### shadowBlur(number) = undefined

阴影宽度。

##### shadowOffsetX(number) = undefined

阴影 X 方向偏移。

##### shadowOffsetY(number) = undefined

阴影 Y 方向偏移。

##### shadowColor(number) = undefined

阴影颜色。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `style` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        style: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `style` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        style: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `style` 下所有属性开启过渡动画。
        transition: 'style',
    };
}
```












#### focus(string) = 'none'



> 从 `v5.0.0` 开始支持



在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。支持如下配置：

+ `'none'` 不淡出其它图形，默认使用该配置。
+ `'self'` 只聚焦（不淡出）当前高亮的数据的图形。
+ `'series'` 聚焦当前高亮的数据所在的系列的所有图形。

#### blurScope(string) = 'coordinateSystem'



> 从 `v5.0.0` 开始支持



在开启`focus`的时候，可以通过`blurScope`配置淡出的范围。支持如下配置

+ `'coordinateSystem'` 淡出范围为坐标系，默认使用该配置。
+ `'series'` 淡出范围为系列。
+ `'global'` 淡出范围为全局。








#### emphasis(Object)

图形元素的高亮状态

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。

#### blur(Object)



> 从 `v5.0.0` 开始支持



图形元素的淡出状态，配置`focus`时有效。

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。

#### select(Object)



> 从 `v5.0.0` 开始支持



图形元素的选中状态，配置自定义系列的 [selectedMode](~series-custom.selectedMode) 时有效。

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。














### return_rect(Object)

矩形。



#### type(string) = rect

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~series-custom.renderItem.return_image),
[text](~series-custom.renderItem.return_text),
[circle](~series-custom.renderItem.return_circle),
[sector](~series-custom.renderItem.return_sector),
[ring](~series-custom.renderItem.return_ring),
[polygon](~series-custom.renderItem.return_polygon),
[polyline](~series-custom.renderItem.return_polyline),
[rect](~series-custom.renderItem.return_rect),
[line](~series-custom.renderItem.return_line),
[bezierCurve](~series-custom.renderItem.return_bezierCurve),
[arc](~series-custom.renderItem.return_arc),
[group](~series-custom.renderItem.return_group),





#### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。





#### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_rect.x) 和 [y](~series-custom.renderItem.return_rect.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_rect.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_rect.scaleX) 和 [scaleY](~series-custom.renderItem.return_rect.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_rect.originX) 和 [originY](~series-custom.renderItem.return_rect.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_rect.x) 和 [y](~series-custom.renderItem.return_rect.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_rect.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_rect.scaleX) 和 [scaleY](~series-custom.renderItem.return_rect.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_rect.originX) 和 [originY](~series-custom.renderItem.return_rect.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_rect.x) 和 [y](~series-custom.renderItem.return_rect.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_rect.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_rect.scaleX) 和 [scaleY](~series-custom.renderItem.return_rect.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_rect.originX) 和 [originY](~series-custom.renderItem.return_rect.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_rect.x) 和 [y](~series-custom.renderItem.return_rect.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_rect.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_rect.scaleX) 和 [scaleY](~series-custom.renderItem.return_rect.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_rect.originX) 和 [originY](~series-custom.renderItem.return_rect.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_rect.x) 和 [y](~series-custom.renderItem.return_rect.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_rect.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_rect.scaleX) 和 [scaleY](~series-custom.renderItem.return_rect.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_rect.originX) 和 [originY](~series-custom.renderItem.return_rect.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_rect.x) 和 [y](~series-custom.renderItem.return_rect.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_rect.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_rect.scaleX) 和 [scaleY](~series-custom.renderItem.return_rect.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_rect.originX) 和 [originY](~series-custom.renderItem.return_rect.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_rect.x) 和 [y](~series-custom.renderItem.return_rect.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_rect.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_rect.scaleX) 和 [scaleY](~series-custom.renderItem.return_rect.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_rect.originX) 和 [originY](~series-custom.renderItem.return_rect.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。










#### transition(string|Array) = ['x', 'y']

可以指定一个属性名，或者一组属性名。被指定的属性值变化时，会开启过渡动画。

属性只可以是：
+ Transform 相关的属性：[`'x'`](~series-custom.renderItem.return_rect.x), [`'y'`](~series-custom.renderItem.return_rect.y)、[`'scaleX'`](~series-custom.renderItem.return_rect.scaleX)、[`'scaleY'`](~series-custom.renderItem.return_rect.scaleY)、[`'rotation'`](~series-custom.renderItem.return_rect.rotation)、[`'originX'`](~series-custom.renderItem.return_rect.originX)、[`'originY'`](~series-custom.renderItem.return_rect.originY)。例如：
    ```js
    renderItem: function (params, api) {
        var coord = api.coord([api.value(0), api.value[1]);
        return {
            type: 'rect',
            x: coord[0],
            y: coord[1],
            shape: {
                x: 0,
                y: 0,
                width: api.value(2),
                height: 100
            },
            transition: ['x', 'y', 'width']
        }
    }
    ```
+ 还可以是这三个属性 [`'shape'`](~series-custom.renderItem.return_rect.shape)、['`style'`](~series-custom.renderItem.return_rect.style)、[`'extra'`](~series-custom.renderItem.return_rect.extra)。表示这三个属性中所有的子属性都开启过渡动画。例如：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3)
            },
            // 表示 shape 中所有属性都开启过渡动画。
            transition: 'shape',
        };
    }
    ```
    这等价于：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3),
                // transition 放在 shape 中，能只指定部分属性开启过渡动画。
                transition: ['x', 'y', 'width', 'height']
            }
        };
    }
    ```

当 transition 没有指定时，[`'x'`](~series-custom.renderItem.return_rect.x) 和 [`'y'`](~series-custom.renderItem.return_rect.y) 会默认开启过渡动画。如果想禁用这种默认，可设定：
```js
transition: [] // 一个空数组
```

看这个 [例子](doc-example/custom-transition-simple&edit=1&reset=1)。



#### morph(boolean) = false

是否开启形变动画。

**什么情况下会展示出形变动画？**

`morph` 设置为 `true` 后，还需按照如下规则，来形成形变动画：

每次走渲染流程是，自定义系列会自动比较（diff）新旧数据。在这个 diff 过程中，如果发现，一组旧数据项和一组新数据项的值相等（相等的规则是，name 相同，或者 [transition](api.html#echartsInstance.setOption) 所指定的维度上的值相同），那么我们就找到了能形成形变动画的一对候选集。

在这组旧数据和这组新数据间，可能产生三种形变动画：
+ 一对一（one-to-one）：如果新数据组和旧数据组都各自只有一个数据项。
+ 一对多（one-to-many）：如果新数据组中有多个数据项，旧数据组中只有一个数据项。
+ 多对一（many-to-one）：如果新数据组中只有一个数据项，旧数据组中有多个数据项。

注：我们并不支持多对多（many-to-many）的情况。

然后，自定义系列，会在新旧组中，寻找声明为 `morph: true` 的图形元素，并分配他们形成真正的一一映射的形变，或者分裂（separating），或者合并（combining）。

参见示例：[custom-one-to-one-morph](custom-one-to-one-morph&edit=1&reset=1) 和
[custom-combine-separate-morph](custom-combine-separate-morph&edit=1&reset=1)。





#### z2(number) = undefined

用于决定图形元素的覆盖关系。

#### name(string) = undefined

参见 [diffChildrenByName](~series-custom.renderItem.return_rect.diffChildrenByName)。


#### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

#### silent(boolean) = false

是否不响应鼠标以及触摸事件。

#### invisible(boolean) = false

节点是否可见。

#### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

#### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#series-custom.renderItem.return_text)。


#### textConfig(Object)

##### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

##### rotation(number)

`textContent` 的旋转弧度。

##### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

##### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

##### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

##### distance(number) = 5

距离 `layoutRect` 的距离。

##### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

##### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

##### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

##### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

##### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

##### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。




#### during(Function)

在动画的每一帧里，用户可以使用 `during` 回调来设定节点的各种属性。

```js
(duringAPI: CustomDuringAPI) => void

interface CustomDuringAPI {
    // 设置 transform 属性值。
    // transform 属性参见 `TransformProp`。
    setTransform(key: TransformProp, val: unknown): void;
    // 获得当前动画帧的 transform 属性值。
    getTransform(key: TransformProp): unknown;
    // 设置 shape 属性值。
    // shape 属性形如：`{ type: 'rect', shape: { xxxProp: xxxValue } }`。
    setShape(key: string, val: unknown): void;
    // 获得当前动画帧的 shape 属性值。
    getShape(key: string): unknown;
    // 设置 style 属性值。
    // style 属性形如：`{ type: 'rect', style: { xxxProp: xxxValue } }`。
    setStyle(key: string, val: unknown): void;
    // 获得当前动画帧的 style 属性值。
    getStyle(key: string): unknown;
    // 设置 extra 属性值。
    // extra 属性形如：`{ type: 'rect', extra: { xxxProp: xxxValue } }`。
    setExtra(key: string, val: unknown): void;
    // 获得当前动画帧的 extra 属性值。
    getExtra(key: string): unknown;
}

type TransformProp =
    'x' | 'y' | 'scaleX' | 'scaleY' | 'originX' | 'originY' | 'rotation';
```

在绝大多数场景下，用户不需要这个 `during` 回调。因为，假如属性被设定到 [transition](option.html#series-custom.renderItem.return_rect.transition) 中后，echarts 会自动对它进行插值，并且基于这些插值形成动画。但是，如果这些插值形成的动画不满足用户需求，那么用户可以使用 `during` 回调来定制他们。

例如，如果用户使用 [polygon](option.html#series-custom.renderItem.return_polygon) 画图形，图形的形状会由 [shape.points](option.html#series-custom.renderItem.return_polygon.shape.points) 来定义，形如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...]
    },
    // ...
}
```
如果用户指定了 [transition](option.html#series-custom.renderItem.return_polygon.transition) 如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...],
    },
    transition: 'shape'
    // ...
}
```
尽管这些 `points` 会被 echarts 自动插值，但是这样形成的动画里，这些点会直线走向目标位置。假如用户需求是，这些点要按照某种特定的路径（如弧线、螺旋）来移动，则这就不满足了。所以在这种情况下，可以使用 `during` 回调如下：
```js
{
    type: 'polygon',
    shape: {
        points: calculatePoints(initialDegree),
        transition: 'points'
    },
    extra: {
        degree: nextDegree
    },
    // 让 echarts 对 `extra.degree` 进行插值，然后基于
    // `extra.degree` 来计算动画中每一帧时的 polygon 形状。
    transition: 'extra',
    during: function (duringAPI) {
        var currentDegree = duringAPI.getExtra('degree');
        duringAPI.setShape(calculatePoints(currentDegree));
    }
    // ...
}
```

也参见这个 [例子](custom-spiral-race&edit=1&reset=1)。





#### extra(Object)

用户可以在 `extra` 字段中定义自己的属性。`extra` 的往往会结合 [during](option.html#series-custom.renderItem.return_rect.during) 一起使用。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `extra` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `extra` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `extra` 下所有属性开启过渡动画。
        transition: 'extra',
    };
}
```

















#### shape(Object)



##### x(number) = 0

图形元素的左上角在父节点坐标系（以父节点左上角为原点）中的横坐标值。

##### y(number) = 0

图形元素的左上角在父节点坐标系（以父节点左上角为原点）中的纵坐标值。







##### width(number) = 0

图形元素的宽度。

##### height(numbr) = 0

图形元素的高度。





##### r(Array)

可以用于设置圆角矩形。`r: [r1, r2, r3, r4]`，
左上、右上、右下、左下角的半径依次为r1、r2、r3、r4。

可以缩写，例如：
+ `r` 缩写为 `1`         相当于 `[1, 1, 1, 1]`
+ `r` 缩写为 `[1]`       相当于 `[1, 1, 1, 1]`
+ `r` 缩写为 `[1, 2]`    相当于 `[1, 2, 1, 2]`
+ `r` 缩写为 `[1, 2, 3]1 相当于 `[1, 2, 3, 2]`




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `shape` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        shape: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `shape` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        shape: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `shape` 下所有属性开启过渡动画。
        transition: 'shape',
    };
}
```






#### style(Object)



注：关于图形元素中更多的样式设置（例如 [富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)），参见 [zrender/graphic/Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable) 中的 style 相关属性。

注意，这里图形元素的样式属性名称直接源于 zrender，和 `echarts label`、`echarts itemStyle` 等处同样含义的样式属性名称或有不同。例如，有如下对应：

+ [itemStyle.color](~series-scatter.label.color) => `style.fill`
+ [itemStyle.borderColor](~series-scatter.label.color) => `style.stroke`
+ [label.color](~series-scatter.label.color) => `style.textFill`
+ [label.textBorderColor](~series-scatter.label.textBorderColor) => `style.textStroke`
+ ...

##### fill(string) = '#000'

填充色。

##### stroke(string) = null

笔画颜色。

##### lineWidth(number) = 0

笔画宽度。

##### shadowBlur(number) = undefined

阴影宽度。

##### shadowOffsetX(number) = undefined

阴影 X 方向偏移。

##### shadowOffsetY(number) = undefined

阴影 Y 方向偏移。

##### shadowColor(number) = undefined

阴影颜色。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `style` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        style: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `style` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        style: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `style` 下所有属性开启过渡动画。
        transition: 'style',
    };
}
```












#### focus(string) = 'none'



> 从 `v5.0.0` 开始支持



在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。支持如下配置：

+ `'none'` 不淡出其它图形，默认使用该配置。
+ `'self'` 只聚焦（不淡出）当前高亮的数据的图形。
+ `'series'` 聚焦当前高亮的数据所在的系列的所有图形。

#### blurScope(string) = 'coordinateSystem'



> 从 `v5.0.0` 开始支持



在开启`focus`的时候，可以通过`blurScope`配置淡出的范围。支持如下配置

+ `'coordinateSystem'` 淡出范围为坐标系，默认使用该配置。
+ `'series'` 淡出范围为系列。
+ `'global'` 淡出范围为全局。








#### emphasis(Object)

图形元素的高亮状态

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。

#### blur(Object)



> 从 `v5.0.0` 开始支持



图形元素的淡出状态，配置`focus`时有效。

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。

#### select(Object)



> 从 `v5.0.0` 开始支持



图形元素的选中状态，配置自定义系列的 [selectedMode](~series-custom.selectedMode) 时有效。

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。














### return_circle(Object)

圆。



#### type(string) = circle

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~series-custom.renderItem.return_image),
[text](~series-custom.renderItem.return_text),
[circle](~series-custom.renderItem.return_circle),
[sector](~series-custom.renderItem.return_sector),
[ring](~series-custom.renderItem.return_ring),
[polygon](~series-custom.renderItem.return_polygon),
[polyline](~series-custom.renderItem.return_polyline),
[rect](~series-custom.renderItem.return_rect),
[line](~series-custom.renderItem.return_line),
[bezierCurve](~series-custom.renderItem.return_bezierCurve),
[arc](~series-custom.renderItem.return_arc),
[group](~series-custom.renderItem.return_group),





#### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。





#### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_circle.x) 和 [y](~series-custom.renderItem.return_circle.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_circle.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_circle.scaleX) 和 [scaleY](~series-custom.renderItem.return_circle.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_circle.originX) 和 [originY](~series-custom.renderItem.return_circle.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_circle.x) 和 [y](~series-custom.renderItem.return_circle.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_circle.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_circle.scaleX) 和 [scaleY](~series-custom.renderItem.return_circle.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_circle.originX) 和 [originY](~series-custom.renderItem.return_circle.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_circle.x) 和 [y](~series-custom.renderItem.return_circle.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_circle.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_circle.scaleX) 和 [scaleY](~series-custom.renderItem.return_circle.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_circle.originX) 和 [originY](~series-custom.renderItem.return_circle.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_circle.x) 和 [y](~series-custom.renderItem.return_circle.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_circle.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_circle.scaleX) 和 [scaleY](~series-custom.renderItem.return_circle.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_circle.originX) 和 [originY](~series-custom.renderItem.return_circle.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_circle.x) 和 [y](~series-custom.renderItem.return_circle.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_circle.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_circle.scaleX) 和 [scaleY](~series-custom.renderItem.return_circle.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_circle.originX) 和 [originY](~series-custom.renderItem.return_circle.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_circle.x) 和 [y](~series-custom.renderItem.return_circle.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_circle.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_circle.scaleX) 和 [scaleY](~series-custom.renderItem.return_circle.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_circle.originX) 和 [originY](~series-custom.renderItem.return_circle.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_circle.x) 和 [y](~series-custom.renderItem.return_circle.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_circle.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_circle.scaleX) 和 [scaleY](~series-custom.renderItem.return_circle.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_circle.originX) 和 [originY](~series-custom.renderItem.return_circle.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。










#### transition(string|Array) = ['x', 'y']

可以指定一个属性名，或者一组属性名。被指定的属性值变化时，会开启过渡动画。

属性只可以是：
+ Transform 相关的属性：[`'x'`](~series-custom.renderItem.return_circle.x), [`'y'`](~series-custom.renderItem.return_circle.y)、[`'scaleX'`](~series-custom.renderItem.return_circle.scaleX)、[`'scaleY'`](~series-custom.renderItem.return_circle.scaleY)、[`'rotation'`](~series-custom.renderItem.return_circle.rotation)、[`'originX'`](~series-custom.renderItem.return_circle.originX)、[`'originY'`](~series-custom.renderItem.return_circle.originY)。例如：
    ```js
    renderItem: function (params, api) {
        var coord = api.coord([api.value(0), api.value[1]);
        return {
            type: 'rect',
            x: coord[0],
            y: coord[1],
            shape: {
                x: 0,
                y: 0,
                width: api.value(2),
                height: 100
            },
            transition: ['x', 'y', 'width']
        }
    }
    ```
+ 还可以是这三个属性 [`'shape'`](~series-custom.renderItem.return_circle.shape)、['`style'`](~series-custom.renderItem.return_circle.style)、[`'extra'`](~series-custom.renderItem.return_circle.extra)。表示这三个属性中所有的子属性都开启过渡动画。例如：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3)
            },
            // 表示 shape 中所有属性都开启过渡动画。
            transition: 'shape',
        };
    }
    ```
    这等价于：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3),
                // transition 放在 shape 中，能只指定部分属性开启过渡动画。
                transition: ['x', 'y', 'width', 'height']
            }
        };
    }
    ```

当 transition 没有指定时，[`'x'`](~series-custom.renderItem.return_circle.x) 和 [`'y'`](~series-custom.renderItem.return_circle.y) 会默认开启过渡动画。如果想禁用这种默认，可设定：
```js
transition: [] // 一个空数组
```

看这个 [例子](doc-example/custom-transition-simple&edit=1&reset=1)。



#### morph(boolean) = false

是否开启形变动画。

**什么情况下会展示出形变动画？**

`morph` 设置为 `true` 后，还需按照如下规则，来形成形变动画：

每次走渲染流程是，自定义系列会自动比较（diff）新旧数据。在这个 diff 过程中，如果发现，一组旧数据项和一组新数据项的值相等（相等的规则是，name 相同，或者 [transition](api.html#echartsInstance.setOption) 所指定的维度上的值相同），那么我们就找到了能形成形变动画的一对候选集。

在这组旧数据和这组新数据间，可能产生三种形变动画：
+ 一对一（one-to-one）：如果新数据组和旧数据组都各自只有一个数据项。
+ 一对多（one-to-many）：如果新数据组中有多个数据项，旧数据组中只有一个数据项。
+ 多对一（many-to-one）：如果新数据组中只有一个数据项，旧数据组中有多个数据项。

注：我们并不支持多对多（many-to-many）的情况。

然后，自定义系列，会在新旧组中，寻找声明为 `morph: true` 的图形元素，并分配他们形成真正的一一映射的形变，或者分裂（separating），或者合并（combining）。

参见示例：[custom-one-to-one-morph](custom-one-to-one-morph&edit=1&reset=1) 和
[custom-combine-separate-morph](custom-combine-separate-morph&edit=1&reset=1)。





#### z2(number) = undefined

用于决定图形元素的覆盖关系。

#### name(string) = undefined

参见 [diffChildrenByName](~series-custom.renderItem.return_circle.diffChildrenByName)。


#### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

#### silent(boolean) = false

是否不响应鼠标以及触摸事件。

#### invisible(boolean) = false

节点是否可见。

#### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

#### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#series-custom.renderItem.return_text)。


#### textConfig(Object)

##### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

##### rotation(number)

`textContent` 的旋转弧度。

##### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

##### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

##### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

##### distance(number) = 5

距离 `layoutRect` 的距离。

##### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

##### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

##### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

##### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

##### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

##### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。




#### during(Function)

在动画的每一帧里，用户可以使用 `during` 回调来设定节点的各种属性。

```js
(duringAPI: CustomDuringAPI) => void

interface CustomDuringAPI {
    // 设置 transform 属性值。
    // transform 属性参见 `TransformProp`。
    setTransform(key: TransformProp, val: unknown): void;
    // 获得当前动画帧的 transform 属性值。
    getTransform(key: TransformProp): unknown;
    // 设置 shape 属性值。
    // shape 属性形如：`{ type: 'rect', shape: { xxxProp: xxxValue } }`。
    setShape(key: string, val: unknown): void;
    // 获得当前动画帧的 shape 属性值。
    getShape(key: string): unknown;
    // 设置 style 属性值。
    // style 属性形如：`{ type: 'rect', style: { xxxProp: xxxValue } }`。
    setStyle(key: string, val: unknown): void;
    // 获得当前动画帧的 style 属性值。
    getStyle(key: string): unknown;
    // 设置 extra 属性值。
    // extra 属性形如：`{ type: 'rect', extra: { xxxProp: xxxValue } }`。
    setExtra(key: string, val: unknown): void;
    // 获得当前动画帧的 extra 属性值。
    getExtra(key: string): unknown;
}

type TransformProp =
    'x' | 'y' | 'scaleX' | 'scaleY' | 'originX' | 'originY' | 'rotation';
```

在绝大多数场景下，用户不需要这个 `during` 回调。因为，假如属性被设定到 [transition](option.html#series-custom.renderItem.return_rect.transition) 中后，echarts 会自动对它进行插值，并且基于这些插值形成动画。但是，如果这些插值形成的动画不满足用户需求，那么用户可以使用 `during` 回调来定制他们。

例如，如果用户使用 [polygon](option.html#series-custom.renderItem.return_polygon) 画图形，图形的形状会由 [shape.points](option.html#series-custom.renderItem.return_polygon.shape.points) 来定义，形如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...]
    },
    // ...
}
```
如果用户指定了 [transition](option.html#series-custom.renderItem.return_polygon.transition) 如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...],
    },
    transition: 'shape'
    // ...
}
```
尽管这些 `points` 会被 echarts 自动插值，但是这样形成的动画里，这些点会直线走向目标位置。假如用户需求是，这些点要按照某种特定的路径（如弧线、螺旋）来移动，则这就不满足了。所以在这种情况下，可以使用 `during` 回调如下：
```js
{
    type: 'polygon',
    shape: {
        points: calculatePoints(initialDegree),
        transition: 'points'
    },
    extra: {
        degree: nextDegree
    },
    // 让 echarts 对 `extra.degree` 进行插值，然后基于
    // `extra.degree` 来计算动画中每一帧时的 polygon 形状。
    transition: 'extra',
    during: function (duringAPI) {
        var currentDegree = duringAPI.getExtra('degree');
        duringAPI.setShape(calculatePoints(currentDegree));
    }
    // ...
}
```

也参见这个 [例子](custom-spiral-race&edit=1&reset=1)。





#### extra(Object)

用户可以在 `extra` 字段中定义自己的属性。`extra` 的往往会结合 [during](option.html#series-custom.renderItem.return_rect.during) 一起使用。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `extra` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `extra` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `extra` 下所有属性开启过渡动画。
        transition: 'extra',
    };
}
```

















#### shape(Object)



##### cx(number) = 0

图形元素的中心在父节点坐标系（以父节点左上角为原点）中的横坐标值。

##### cy(numbr) = 0

图形元素的中心在父节点坐标系（以父节点左上角为原点）中的纵坐标值。







##### r(number) = 0

外半径。








##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `shape` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        shape: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `shape` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        shape: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `shape` 下所有属性开启过渡动画。
        transition: 'shape',
    };
}
```






#### style(Object)



注：关于图形元素中更多的样式设置（例如 [富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)），参见 [zrender/graphic/Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable) 中的 style 相关属性。

注意，这里图形元素的样式属性名称直接源于 zrender，和 `echarts label`、`echarts itemStyle` 等处同样含义的样式属性名称或有不同。例如，有如下对应：

+ [itemStyle.color](~series-scatter.label.color) => `style.fill`
+ [itemStyle.borderColor](~series-scatter.label.color) => `style.stroke`
+ [label.color](~series-scatter.label.color) => `style.textFill`
+ [label.textBorderColor](~series-scatter.label.textBorderColor) => `style.textStroke`
+ ...

##### fill(string) = '#000'

填充色。

##### stroke(string) = null

笔画颜色。

##### lineWidth(number) = 0

笔画宽度。

##### shadowBlur(number) = undefined

阴影宽度。

##### shadowOffsetX(number) = undefined

阴影 X 方向偏移。

##### shadowOffsetY(number) = undefined

阴影 Y 方向偏移。

##### shadowColor(number) = undefined

阴影颜色。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `style` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        style: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `style` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        style: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `style` 下所有属性开启过渡动画。
        transition: 'style',
    };
}
```












#### focus(string) = 'none'



> 从 `v5.0.0` 开始支持



在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。支持如下配置：

+ `'none'` 不淡出其它图形，默认使用该配置。
+ `'self'` 只聚焦（不淡出）当前高亮的数据的图形。
+ `'series'` 聚焦当前高亮的数据所在的系列的所有图形。

#### blurScope(string) = 'coordinateSystem'



> 从 `v5.0.0` 开始支持



在开启`focus`的时候，可以通过`blurScope`配置淡出的范围。支持如下配置

+ `'coordinateSystem'` 淡出范围为坐标系，默认使用该配置。
+ `'series'` 淡出范围为系列。
+ `'global'` 淡出范围为全局。








#### emphasis(Object)

图形元素的高亮状态

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。

#### blur(Object)



> 从 `v5.0.0` 开始支持



图形元素的淡出状态，配置`focus`时有效。

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。

#### select(Object)



> 从 `v5.0.0` 开始支持



图形元素的选中状态，配置自定义系列的 [selectedMode](~series-custom.selectedMode) 时有效。

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。














### return_ring(Object)

圆环。



#### type(string) = ring

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~series-custom.renderItem.return_image),
[text](~series-custom.renderItem.return_text),
[circle](~series-custom.renderItem.return_circle),
[sector](~series-custom.renderItem.return_sector),
[ring](~series-custom.renderItem.return_ring),
[polygon](~series-custom.renderItem.return_polygon),
[polyline](~series-custom.renderItem.return_polyline),
[rect](~series-custom.renderItem.return_rect),
[line](~series-custom.renderItem.return_line),
[bezierCurve](~series-custom.renderItem.return_bezierCurve),
[arc](~series-custom.renderItem.return_arc),
[group](~series-custom.renderItem.return_group),





#### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。





#### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_ring.x) 和 [y](~series-custom.renderItem.return_ring.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_ring.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_ring.scaleX) 和 [scaleY](~series-custom.renderItem.return_ring.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_ring.originX) 和 [originY](~series-custom.renderItem.return_ring.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_ring.x) 和 [y](~series-custom.renderItem.return_ring.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_ring.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_ring.scaleX) 和 [scaleY](~series-custom.renderItem.return_ring.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_ring.originX) 和 [originY](~series-custom.renderItem.return_ring.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_ring.x) 和 [y](~series-custom.renderItem.return_ring.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_ring.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_ring.scaleX) 和 [scaleY](~series-custom.renderItem.return_ring.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_ring.originX) 和 [originY](~series-custom.renderItem.return_ring.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_ring.x) 和 [y](~series-custom.renderItem.return_ring.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_ring.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_ring.scaleX) 和 [scaleY](~series-custom.renderItem.return_ring.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_ring.originX) 和 [originY](~series-custom.renderItem.return_ring.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_ring.x) 和 [y](~series-custom.renderItem.return_ring.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_ring.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_ring.scaleX) 和 [scaleY](~series-custom.renderItem.return_ring.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_ring.originX) 和 [originY](~series-custom.renderItem.return_ring.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_ring.x) 和 [y](~series-custom.renderItem.return_ring.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_ring.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_ring.scaleX) 和 [scaleY](~series-custom.renderItem.return_ring.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_ring.originX) 和 [originY](~series-custom.renderItem.return_ring.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_ring.x) 和 [y](~series-custom.renderItem.return_ring.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_ring.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_ring.scaleX) 和 [scaleY](~series-custom.renderItem.return_ring.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_ring.originX) 和 [originY](~series-custom.renderItem.return_ring.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。










#### transition(string|Array) = ['x', 'y']

可以指定一个属性名，或者一组属性名。被指定的属性值变化时，会开启过渡动画。

属性只可以是：
+ Transform 相关的属性：[`'x'`](~series-custom.renderItem.return_ring.x), [`'y'`](~series-custom.renderItem.return_ring.y)、[`'scaleX'`](~series-custom.renderItem.return_ring.scaleX)、[`'scaleY'`](~series-custom.renderItem.return_ring.scaleY)、[`'rotation'`](~series-custom.renderItem.return_ring.rotation)、[`'originX'`](~series-custom.renderItem.return_ring.originX)、[`'originY'`](~series-custom.renderItem.return_ring.originY)。例如：
    ```js
    renderItem: function (params, api) {
        var coord = api.coord([api.value(0), api.value[1]);
        return {
            type: 'rect',
            x: coord[0],
            y: coord[1],
            shape: {
                x: 0,
                y: 0,
                width: api.value(2),
                height: 100
            },
            transition: ['x', 'y', 'width']
        }
    }
    ```
+ 还可以是这三个属性 [`'shape'`](~series-custom.renderItem.return_ring.shape)、['`style'`](~series-custom.renderItem.return_ring.style)、[`'extra'`](~series-custom.renderItem.return_ring.extra)。表示这三个属性中所有的子属性都开启过渡动画。例如：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3)
            },
            // 表示 shape 中所有属性都开启过渡动画。
            transition: 'shape',
        };
    }
    ```
    这等价于：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3),
                // transition 放在 shape 中，能只指定部分属性开启过渡动画。
                transition: ['x', 'y', 'width', 'height']
            }
        };
    }
    ```

当 transition 没有指定时，[`'x'`](~series-custom.renderItem.return_ring.x) 和 [`'y'`](~series-custom.renderItem.return_ring.y) 会默认开启过渡动画。如果想禁用这种默认，可设定：
```js
transition: [] // 一个空数组
```

看这个 [例子](doc-example/custom-transition-simple&edit=1&reset=1)。



#### morph(boolean) = false

是否开启形变动画。

**什么情况下会展示出形变动画？**

`morph` 设置为 `true` 后，还需按照如下规则，来形成形变动画：

每次走渲染流程是，自定义系列会自动比较（diff）新旧数据。在这个 diff 过程中，如果发现，一组旧数据项和一组新数据项的值相等（相等的规则是，name 相同，或者 [transition](api.html#echartsInstance.setOption) 所指定的维度上的值相同），那么我们就找到了能形成形变动画的一对候选集。

在这组旧数据和这组新数据间，可能产生三种形变动画：
+ 一对一（one-to-one）：如果新数据组和旧数据组都各自只有一个数据项。
+ 一对多（one-to-many）：如果新数据组中有多个数据项，旧数据组中只有一个数据项。
+ 多对一（many-to-one）：如果新数据组中只有一个数据项，旧数据组中有多个数据项。

注：我们并不支持多对多（many-to-many）的情况。

然后，自定义系列，会在新旧组中，寻找声明为 `morph: true` 的图形元素，并分配他们形成真正的一一映射的形变，或者分裂（separating），或者合并（combining）。

参见示例：[custom-one-to-one-morph](custom-one-to-one-morph&edit=1&reset=1) 和
[custom-combine-separate-morph](custom-combine-separate-morph&edit=1&reset=1)。





#### z2(number) = undefined

用于决定图形元素的覆盖关系。

#### name(string) = undefined

参见 [diffChildrenByName](~series-custom.renderItem.return_ring.diffChildrenByName)。


#### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

#### silent(boolean) = false

是否不响应鼠标以及触摸事件。

#### invisible(boolean) = false

节点是否可见。

#### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

#### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#series-custom.renderItem.return_text)。


#### textConfig(Object)

##### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

##### rotation(number)

`textContent` 的旋转弧度。

##### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

##### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

##### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

##### distance(number) = 5

距离 `layoutRect` 的距离。

##### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

##### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

##### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

##### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

##### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

##### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。




#### during(Function)

在动画的每一帧里，用户可以使用 `during` 回调来设定节点的各种属性。

```js
(duringAPI: CustomDuringAPI) => void

interface CustomDuringAPI {
    // 设置 transform 属性值。
    // transform 属性参见 `TransformProp`。
    setTransform(key: TransformProp, val: unknown): void;
    // 获得当前动画帧的 transform 属性值。
    getTransform(key: TransformProp): unknown;
    // 设置 shape 属性值。
    // shape 属性形如：`{ type: 'rect', shape: { xxxProp: xxxValue } }`。
    setShape(key: string, val: unknown): void;
    // 获得当前动画帧的 shape 属性值。
    getShape(key: string): unknown;
    // 设置 style 属性值。
    // style 属性形如：`{ type: 'rect', style: { xxxProp: xxxValue } }`。
    setStyle(key: string, val: unknown): void;
    // 获得当前动画帧的 style 属性值。
    getStyle(key: string): unknown;
    // 设置 extra 属性值。
    // extra 属性形如：`{ type: 'rect', extra: { xxxProp: xxxValue } }`。
    setExtra(key: string, val: unknown): void;
    // 获得当前动画帧的 extra 属性值。
    getExtra(key: string): unknown;
}

type TransformProp =
    'x' | 'y' | 'scaleX' | 'scaleY' | 'originX' | 'originY' | 'rotation';
```

在绝大多数场景下，用户不需要这个 `during` 回调。因为，假如属性被设定到 [transition](option.html#series-custom.renderItem.return_rect.transition) 中后，echarts 会自动对它进行插值，并且基于这些插值形成动画。但是，如果这些插值形成的动画不满足用户需求，那么用户可以使用 `during` 回调来定制他们。

例如，如果用户使用 [polygon](option.html#series-custom.renderItem.return_polygon) 画图形，图形的形状会由 [shape.points](option.html#series-custom.renderItem.return_polygon.shape.points) 来定义，形如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...]
    },
    // ...
}
```
如果用户指定了 [transition](option.html#series-custom.renderItem.return_polygon.transition) 如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...],
    },
    transition: 'shape'
    // ...
}
```
尽管这些 `points` 会被 echarts 自动插值，但是这样形成的动画里，这些点会直线走向目标位置。假如用户需求是，这些点要按照某种特定的路径（如弧线、螺旋）来移动，则这就不满足了。所以在这种情况下，可以使用 `during` 回调如下：
```js
{
    type: 'polygon',
    shape: {
        points: calculatePoints(initialDegree),
        transition: 'points'
    },
    extra: {
        degree: nextDegree
    },
    // 让 echarts 对 `extra.degree` 进行插值，然后基于
    // `extra.degree` 来计算动画中每一帧时的 polygon 形状。
    transition: 'extra',
    during: function (duringAPI) {
        var currentDegree = duringAPI.getExtra('degree');
        duringAPI.setShape(calculatePoints(currentDegree));
    }
    // ...
}
```

也参见这个 [例子](custom-spiral-race&edit=1&reset=1)。





#### extra(Object)

用户可以在 `extra` 字段中定义自己的属性。`extra` 的往往会结合 [during](option.html#series-custom.renderItem.return_rect.during) 一起使用。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `extra` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `extra` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `extra` 下所有属性开启过渡动画。
        transition: 'extra',
    };
}
```

















#### shape(Object)



##### cx(number) = 0

图形元素的中心在父节点坐标系（以父节点左上角为原点）中的横坐标值。

##### cy(numbr) = 0

图形元素的中心在父节点坐标系（以父节点左上角为原点）中的纵坐标值。









##### r(number) = 0

外半径。





##### r0(number) = 0

内半径。








##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `shape` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        shape: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `shape` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        shape: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `shape` 下所有属性开启过渡动画。
        transition: 'shape',
    };
}
```






#### style(Object)



注：关于图形元素中更多的样式设置（例如 [富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)），参见 [zrender/graphic/Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable) 中的 style 相关属性。

注意，这里图形元素的样式属性名称直接源于 zrender，和 `echarts label`、`echarts itemStyle` 等处同样含义的样式属性名称或有不同。例如，有如下对应：

+ [itemStyle.color](~series-scatter.label.color) => `style.fill`
+ [itemStyle.borderColor](~series-scatter.label.color) => `style.stroke`
+ [label.color](~series-scatter.label.color) => `style.textFill`
+ [label.textBorderColor](~series-scatter.label.textBorderColor) => `style.textStroke`
+ ...

##### fill(string) = '#000'

填充色。

##### stroke(string) = null

笔画颜色。

##### lineWidth(number) = 0

笔画宽度。

##### shadowBlur(number) = undefined

阴影宽度。

##### shadowOffsetX(number) = undefined

阴影 X 方向偏移。

##### shadowOffsetY(number) = undefined

阴影 Y 方向偏移。

##### shadowColor(number) = undefined

阴影颜色。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `style` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        style: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `style` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        style: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `style` 下所有属性开启过渡动画。
        transition: 'style',
    };
}
```












#### focus(string) = 'none'



> 从 `v5.0.0` 开始支持



在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。支持如下配置：

+ `'none'` 不淡出其它图形，默认使用该配置。
+ `'self'` 只聚焦（不淡出）当前高亮的数据的图形。
+ `'series'` 聚焦当前高亮的数据所在的系列的所有图形。

#### blurScope(string) = 'coordinateSystem'



> 从 `v5.0.0` 开始支持



在开启`focus`的时候，可以通过`blurScope`配置淡出的范围。支持如下配置

+ `'coordinateSystem'` 淡出范围为坐标系，默认使用该配置。
+ `'series'` 淡出范围为系列。
+ `'global'` 淡出范围为全局。








#### emphasis(Object)

图形元素的高亮状态

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。

#### blur(Object)



> 从 `v5.0.0` 开始支持



图形元素的淡出状态，配置`focus`时有效。

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。

#### select(Object)



> 从 `v5.0.0` 开始支持



图形元素的选中状态，配置自定义系列的 [selectedMode](~series-custom.selectedMode) 时有效。

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。














### return_sector(Object)

扇形。



#### type(string) = sector

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~series-custom.renderItem.return_image),
[text](~series-custom.renderItem.return_text),
[circle](~series-custom.renderItem.return_circle),
[sector](~series-custom.renderItem.return_sector),
[ring](~series-custom.renderItem.return_ring),
[polygon](~series-custom.renderItem.return_polygon),
[polyline](~series-custom.renderItem.return_polyline),
[rect](~series-custom.renderItem.return_rect),
[line](~series-custom.renderItem.return_line),
[bezierCurve](~series-custom.renderItem.return_bezierCurve),
[arc](~series-custom.renderItem.return_arc),
[group](~series-custom.renderItem.return_group),





#### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。





#### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_sector.x) 和 [y](~series-custom.renderItem.return_sector.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_sector.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_sector.scaleX) 和 [scaleY](~series-custom.renderItem.return_sector.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_sector.originX) 和 [originY](~series-custom.renderItem.return_sector.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_sector.x) 和 [y](~series-custom.renderItem.return_sector.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_sector.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_sector.scaleX) 和 [scaleY](~series-custom.renderItem.return_sector.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_sector.originX) 和 [originY](~series-custom.renderItem.return_sector.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_sector.x) 和 [y](~series-custom.renderItem.return_sector.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_sector.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_sector.scaleX) 和 [scaleY](~series-custom.renderItem.return_sector.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_sector.originX) 和 [originY](~series-custom.renderItem.return_sector.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_sector.x) 和 [y](~series-custom.renderItem.return_sector.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_sector.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_sector.scaleX) 和 [scaleY](~series-custom.renderItem.return_sector.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_sector.originX) 和 [originY](~series-custom.renderItem.return_sector.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_sector.x) 和 [y](~series-custom.renderItem.return_sector.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_sector.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_sector.scaleX) 和 [scaleY](~series-custom.renderItem.return_sector.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_sector.originX) 和 [originY](~series-custom.renderItem.return_sector.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_sector.x) 和 [y](~series-custom.renderItem.return_sector.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_sector.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_sector.scaleX) 和 [scaleY](~series-custom.renderItem.return_sector.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_sector.originX) 和 [originY](~series-custom.renderItem.return_sector.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_sector.x) 和 [y](~series-custom.renderItem.return_sector.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_sector.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_sector.scaleX) 和 [scaleY](~series-custom.renderItem.return_sector.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_sector.originX) 和 [originY](~series-custom.renderItem.return_sector.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。










#### transition(string|Array) = ['x', 'y']

可以指定一个属性名，或者一组属性名。被指定的属性值变化时，会开启过渡动画。

属性只可以是：
+ Transform 相关的属性：[`'x'`](~series-custom.renderItem.return_sector.x), [`'y'`](~series-custom.renderItem.return_sector.y)、[`'scaleX'`](~series-custom.renderItem.return_sector.scaleX)、[`'scaleY'`](~series-custom.renderItem.return_sector.scaleY)、[`'rotation'`](~series-custom.renderItem.return_sector.rotation)、[`'originX'`](~series-custom.renderItem.return_sector.originX)、[`'originY'`](~series-custom.renderItem.return_sector.originY)。例如：
    ```js
    renderItem: function (params, api) {
        var coord = api.coord([api.value(0), api.value[1]);
        return {
            type: 'rect',
            x: coord[0],
            y: coord[1],
            shape: {
                x: 0,
                y: 0,
                width: api.value(2),
                height: 100
            },
            transition: ['x', 'y', 'width']
        }
    }
    ```
+ 还可以是这三个属性 [`'shape'`](~series-custom.renderItem.return_sector.shape)、['`style'`](~series-custom.renderItem.return_sector.style)、[`'extra'`](~series-custom.renderItem.return_sector.extra)。表示这三个属性中所有的子属性都开启过渡动画。例如：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3)
            },
            // 表示 shape 中所有属性都开启过渡动画。
            transition: 'shape',
        };
    }
    ```
    这等价于：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3),
                // transition 放在 shape 中，能只指定部分属性开启过渡动画。
                transition: ['x', 'y', 'width', 'height']
            }
        };
    }
    ```

当 transition 没有指定时，[`'x'`](~series-custom.renderItem.return_sector.x) 和 [`'y'`](~series-custom.renderItem.return_sector.y) 会默认开启过渡动画。如果想禁用这种默认，可设定：
```js
transition: [] // 一个空数组
```

看这个 [例子](doc-example/custom-transition-simple&edit=1&reset=1)。



#### morph(boolean) = false

是否开启形变动画。

**什么情况下会展示出形变动画？**

`morph` 设置为 `true` 后，还需按照如下规则，来形成形变动画：

每次走渲染流程是，自定义系列会自动比较（diff）新旧数据。在这个 diff 过程中，如果发现，一组旧数据项和一组新数据项的值相等（相等的规则是，name 相同，或者 [transition](api.html#echartsInstance.setOption) 所指定的维度上的值相同），那么我们就找到了能形成形变动画的一对候选集。

在这组旧数据和这组新数据间，可能产生三种形变动画：
+ 一对一（one-to-one）：如果新数据组和旧数据组都各自只有一个数据项。
+ 一对多（one-to-many）：如果新数据组中有多个数据项，旧数据组中只有一个数据项。
+ 多对一（many-to-one）：如果新数据组中只有一个数据项，旧数据组中有多个数据项。

注：我们并不支持多对多（many-to-many）的情况。

然后，自定义系列，会在新旧组中，寻找声明为 `morph: true` 的图形元素，并分配他们形成真正的一一映射的形变，或者分裂（separating），或者合并（combining）。

参见示例：[custom-one-to-one-morph](custom-one-to-one-morph&edit=1&reset=1) 和
[custom-combine-separate-morph](custom-combine-separate-morph&edit=1&reset=1)。





#### z2(number) = undefined

用于决定图形元素的覆盖关系。

#### name(string) = undefined

参见 [diffChildrenByName](~series-custom.renderItem.return_sector.diffChildrenByName)。


#### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

#### silent(boolean) = false

是否不响应鼠标以及触摸事件。

#### invisible(boolean) = false

节点是否可见。

#### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

#### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#series-custom.renderItem.return_text)。


#### textConfig(Object)

##### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

##### rotation(number)

`textContent` 的旋转弧度。

##### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

##### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

##### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

##### distance(number) = 5

距离 `layoutRect` 的距离。

##### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

##### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

##### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

##### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

##### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

##### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。




#### during(Function)

在动画的每一帧里，用户可以使用 `during` 回调来设定节点的各种属性。

```js
(duringAPI: CustomDuringAPI) => void

interface CustomDuringAPI {
    // 设置 transform 属性值。
    // transform 属性参见 `TransformProp`。
    setTransform(key: TransformProp, val: unknown): void;
    // 获得当前动画帧的 transform 属性值。
    getTransform(key: TransformProp): unknown;
    // 设置 shape 属性值。
    // shape 属性形如：`{ type: 'rect', shape: { xxxProp: xxxValue } }`。
    setShape(key: string, val: unknown): void;
    // 获得当前动画帧的 shape 属性值。
    getShape(key: string): unknown;
    // 设置 style 属性值。
    // style 属性形如：`{ type: 'rect', style: { xxxProp: xxxValue } }`。
    setStyle(key: string, val: unknown): void;
    // 获得当前动画帧的 style 属性值。
    getStyle(key: string): unknown;
    // 设置 extra 属性值。
    // extra 属性形如：`{ type: 'rect', extra: { xxxProp: xxxValue } }`。
    setExtra(key: string, val: unknown): void;
    // 获得当前动画帧的 extra 属性值。
    getExtra(key: string): unknown;
}

type TransformProp =
    'x' | 'y' | 'scaleX' | 'scaleY' | 'originX' | 'originY' | 'rotation';
```

在绝大多数场景下，用户不需要这个 `during` 回调。因为，假如属性被设定到 [transition](option.html#series-custom.renderItem.return_rect.transition) 中后，echarts 会自动对它进行插值，并且基于这些插值形成动画。但是，如果这些插值形成的动画不满足用户需求，那么用户可以使用 `during` 回调来定制他们。

例如，如果用户使用 [polygon](option.html#series-custom.renderItem.return_polygon) 画图形，图形的形状会由 [shape.points](option.html#series-custom.renderItem.return_polygon.shape.points) 来定义，形如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...]
    },
    // ...
}
```
如果用户指定了 [transition](option.html#series-custom.renderItem.return_polygon.transition) 如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...],
    },
    transition: 'shape'
    // ...
}
```
尽管这些 `points` 会被 echarts 自动插值，但是这样形成的动画里，这些点会直线走向目标位置。假如用户需求是，这些点要按照某种特定的路径（如弧线、螺旋）来移动，则这就不满足了。所以在这种情况下，可以使用 `during` 回调如下：
```js
{
    type: 'polygon',
    shape: {
        points: calculatePoints(initialDegree),
        transition: 'points'
    },
    extra: {
        degree: nextDegree
    },
    // 让 echarts 对 `extra.degree` 进行插值，然后基于
    // `extra.degree` 来计算动画中每一帧时的 polygon 形状。
    transition: 'extra',
    during: function (duringAPI) {
        var currentDegree = duringAPI.getExtra('degree');
        duringAPI.setShape(calculatePoints(currentDegree));
    }
    // ...
}
```

也参见这个 [例子](custom-spiral-race&edit=1&reset=1)。





#### extra(Object)

用户可以在 `extra` 字段中定义自己的属性。`extra` 的往往会结合 [during](option.html#series-custom.renderItem.return_rect.during) 一起使用。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `extra` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `extra` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `extra` 下所有属性开启过渡动画。
        transition: 'extra',
    };
}
```

















#### shape(Object)



##### cx(number) = 0

图形元素的中心在父节点坐标系（以父节点左上角为原点）中的横坐标值。

##### cy(numbr) = 0

图形元素的中心在父节点坐标系（以父节点左上角为原点）中的纵坐标值。









##### r(number) = 0

外半径。





##### r0(number) = 0

内半径。







##### startAngle(number) = 0

开始弧度。

##### endAngle(number) = Math.PI * 2

结束弧度。

##### clockwise(boolean) = true

是否顺时针。








##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `shape` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        shape: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `shape` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        shape: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `shape` 下所有属性开启过渡动画。
        transition: 'shape',
    };
}
```






#### style(Object)



注：关于图形元素中更多的样式设置（例如 [富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)），参见 [zrender/graphic/Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable) 中的 style 相关属性。

注意，这里图形元素的样式属性名称直接源于 zrender，和 `echarts label`、`echarts itemStyle` 等处同样含义的样式属性名称或有不同。例如，有如下对应：

+ [itemStyle.color](~series-scatter.label.color) => `style.fill`
+ [itemStyle.borderColor](~series-scatter.label.color) => `style.stroke`
+ [label.color](~series-scatter.label.color) => `style.textFill`
+ [label.textBorderColor](~series-scatter.label.textBorderColor) => `style.textStroke`
+ ...

##### fill(string) = '#000'

填充色。

##### stroke(string) = null

笔画颜色。

##### lineWidth(number) = 0

笔画宽度。

##### shadowBlur(number) = undefined

阴影宽度。

##### shadowOffsetX(number) = undefined

阴影 X 方向偏移。

##### shadowOffsetY(number) = undefined

阴影 Y 方向偏移。

##### shadowColor(number) = undefined

阴影颜色。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `style` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        style: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `style` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        style: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `style` 下所有属性开启过渡动画。
        transition: 'style',
    };
}
```












#### focus(string) = 'none'



> 从 `v5.0.0` 开始支持



在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。支持如下配置：

+ `'none'` 不淡出其它图形，默认使用该配置。
+ `'self'` 只聚焦（不淡出）当前高亮的数据的图形。
+ `'series'` 聚焦当前高亮的数据所在的系列的所有图形。

#### blurScope(string) = 'coordinateSystem'



> 从 `v5.0.0` 开始支持



在开启`focus`的时候，可以通过`blurScope`配置淡出的范围。支持如下配置

+ `'coordinateSystem'` 淡出范围为坐标系，默认使用该配置。
+ `'series'` 淡出范围为系列。
+ `'global'` 淡出范围为全局。








#### emphasis(Object)

图形元素的高亮状态

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。

#### blur(Object)



> 从 `v5.0.0` 开始支持



图形元素的淡出状态，配置`focus`时有效。

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。

#### select(Object)



> 从 `v5.0.0` 开始支持



图形元素的选中状态，配置自定义系列的 [selectedMode](~series-custom.selectedMode) 时有效。

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。














### return_arc(Object)

圆弧。



#### type(string) = arc

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~series-custom.renderItem.return_image),
[text](~series-custom.renderItem.return_text),
[circle](~series-custom.renderItem.return_circle),
[sector](~series-custom.renderItem.return_sector),
[ring](~series-custom.renderItem.return_ring),
[polygon](~series-custom.renderItem.return_polygon),
[polyline](~series-custom.renderItem.return_polyline),
[rect](~series-custom.renderItem.return_rect),
[line](~series-custom.renderItem.return_line),
[bezierCurve](~series-custom.renderItem.return_bezierCurve),
[arc](~series-custom.renderItem.return_arc),
[group](~series-custom.renderItem.return_group),





#### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。





#### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_arc.x) 和 [y](~series-custom.renderItem.return_arc.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_arc.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_arc.scaleX) 和 [scaleY](~series-custom.renderItem.return_arc.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_arc.originX) 和 [originY](~series-custom.renderItem.return_arc.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_arc.x) 和 [y](~series-custom.renderItem.return_arc.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_arc.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_arc.scaleX) 和 [scaleY](~series-custom.renderItem.return_arc.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_arc.originX) 和 [originY](~series-custom.renderItem.return_arc.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_arc.x) 和 [y](~series-custom.renderItem.return_arc.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_arc.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_arc.scaleX) 和 [scaleY](~series-custom.renderItem.return_arc.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_arc.originX) 和 [originY](~series-custom.renderItem.return_arc.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_arc.x) 和 [y](~series-custom.renderItem.return_arc.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_arc.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_arc.scaleX) 和 [scaleY](~series-custom.renderItem.return_arc.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_arc.originX) 和 [originY](~series-custom.renderItem.return_arc.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_arc.x) 和 [y](~series-custom.renderItem.return_arc.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_arc.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_arc.scaleX) 和 [scaleY](~series-custom.renderItem.return_arc.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_arc.originX) 和 [originY](~series-custom.renderItem.return_arc.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_arc.x) 和 [y](~series-custom.renderItem.return_arc.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_arc.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_arc.scaleX) 和 [scaleY](~series-custom.renderItem.return_arc.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_arc.originX) 和 [originY](~series-custom.renderItem.return_arc.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_arc.x) 和 [y](~series-custom.renderItem.return_arc.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_arc.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_arc.scaleX) 和 [scaleY](~series-custom.renderItem.return_arc.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_arc.originX) 和 [originY](~series-custom.renderItem.return_arc.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。










#### transition(string|Array) = ['x', 'y']

可以指定一个属性名，或者一组属性名。被指定的属性值变化时，会开启过渡动画。

属性只可以是：
+ Transform 相关的属性：[`'x'`](~series-custom.renderItem.return_arc.x), [`'y'`](~series-custom.renderItem.return_arc.y)、[`'scaleX'`](~series-custom.renderItem.return_arc.scaleX)、[`'scaleY'`](~series-custom.renderItem.return_arc.scaleY)、[`'rotation'`](~series-custom.renderItem.return_arc.rotation)、[`'originX'`](~series-custom.renderItem.return_arc.originX)、[`'originY'`](~series-custom.renderItem.return_arc.originY)。例如：
    ```js
    renderItem: function (params, api) {
        var coord = api.coord([api.value(0), api.value[1]);
        return {
            type: 'rect',
            x: coord[0],
            y: coord[1],
            shape: {
                x: 0,
                y: 0,
                width: api.value(2),
                height: 100
            },
            transition: ['x', 'y', 'width']
        }
    }
    ```
+ 还可以是这三个属性 [`'shape'`](~series-custom.renderItem.return_arc.shape)、['`style'`](~series-custom.renderItem.return_arc.style)、[`'extra'`](~series-custom.renderItem.return_arc.extra)。表示这三个属性中所有的子属性都开启过渡动画。例如：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3)
            },
            // 表示 shape 中所有属性都开启过渡动画。
            transition: 'shape',
        };
    }
    ```
    这等价于：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3),
                // transition 放在 shape 中，能只指定部分属性开启过渡动画。
                transition: ['x', 'y', 'width', 'height']
            }
        };
    }
    ```

当 transition 没有指定时，[`'x'`](~series-custom.renderItem.return_arc.x) 和 [`'y'`](~series-custom.renderItem.return_arc.y) 会默认开启过渡动画。如果想禁用这种默认，可设定：
```js
transition: [] // 一个空数组
```

看这个 [例子](doc-example/custom-transition-simple&edit=1&reset=1)。



#### morph(boolean) = false

是否开启形变动画。

**什么情况下会展示出形变动画？**

`morph` 设置为 `true` 后，还需按照如下规则，来形成形变动画：

每次走渲染流程是，自定义系列会自动比较（diff）新旧数据。在这个 diff 过程中，如果发现，一组旧数据项和一组新数据项的值相等（相等的规则是，name 相同，或者 [transition](api.html#echartsInstance.setOption) 所指定的维度上的值相同），那么我们就找到了能形成形变动画的一对候选集。

在这组旧数据和这组新数据间，可能产生三种形变动画：
+ 一对一（one-to-one）：如果新数据组和旧数据组都各自只有一个数据项。
+ 一对多（one-to-many）：如果新数据组中有多个数据项，旧数据组中只有一个数据项。
+ 多对一（many-to-one）：如果新数据组中只有一个数据项，旧数据组中有多个数据项。

注：我们并不支持多对多（many-to-many）的情况。

然后，自定义系列，会在新旧组中，寻找声明为 `morph: true` 的图形元素，并分配他们形成真正的一一映射的形变，或者分裂（separating），或者合并（combining）。

参见示例：[custom-one-to-one-morph](custom-one-to-one-morph&edit=1&reset=1) 和
[custom-combine-separate-morph](custom-combine-separate-morph&edit=1&reset=1)。





#### z2(number) = undefined

用于决定图形元素的覆盖关系。

#### name(string) = undefined

参见 [diffChildrenByName](~series-custom.renderItem.return_arc.diffChildrenByName)。


#### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

#### silent(boolean) = false

是否不响应鼠标以及触摸事件。

#### invisible(boolean) = false

节点是否可见。

#### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

#### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#series-custom.renderItem.return_text)。


#### textConfig(Object)

##### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

##### rotation(number)

`textContent` 的旋转弧度。

##### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

##### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

##### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

##### distance(number) = 5

距离 `layoutRect` 的距离。

##### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

##### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

##### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

##### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

##### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

##### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。




#### during(Function)

在动画的每一帧里，用户可以使用 `during` 回调来设定节点的各种属性。

```js
(duringAPI: CustomDuringAPI) => void

interface CustomDuringAPI {
    // 设置 transform 属性值。
    // transform 属性参见 `TransformProp`。
    setTransform(key: TransformProp, val: unknown): void;
    // 获得当前动画帧的 transform 属性值。
    getTransform(key: TransformProp): unknown;
    // 设置 shape 属性值。
    // shape 属性形如：`{ type: 'rect', shape: { xxxProp: xxxValue } }`。
    setShape(key: string, val: unknown): void;
    // 获得当前动画帧的 shape 属性值。
    getShape(key: string): unknown;
    // 设置 style 属性值。
    // style 属性形如：`{ type: 'rect', style: { xxxProp: xxxValue } }`。
    setStyle(key: string, val: unknown): void;
    // 获得当前动画帧的 style 属性值。
    getStyle(key: string): unknown;
    // 设置 extra 属性值。
    // extra 属性形如：`{ type: 'rect', extra: { xxxProp: xxxValue } }`。
    setExtra(key: string, val: unknown): void;
    // 获得当前动画帧的 extra 属性值。
    getExtra(key: string): unknown;
}

type TransformProp =
    'x' | 'y' | 'scaleX' | 'scaleY' | 'originX' | 'originY' | 'rotation';
```

在绝大多数场景下，用户不需要这个 `during` 回调。因为，假如属性被设定到 [transition](option.html#series-custom.renderItem.return_rect.transition) 中后，echarts 会自动对它进行插值，并且基于这些插值形成动画。但是，如果这些插值形成的动画不满足用户需求，那么用户可以使用 `during` 回调来定制他们。

例如，如果用户使用 [polygon](option.html#series-custom.renderItem.return_polygon) 画图形，图形的形状会由 [shape.points](option.html#series-custom.renderItem.return_polygon.shape.points) 来定义，形如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...]
    },
    // ...
}
```
如果用户指定了 [transition](option.html#series-custom.renderItem.return_polygon.transition) 如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...],
    },
    transition: 'shape'
    // ...
}
```
尽管这些 `points` 会被 echarts 自动插值，但是这样形成的动画里，这些点会直线走向目标位置。假如用户需求是，这些点要按照某种特定的路径（如弧线、螺旋）来移动，则这就不满足了。所以在这种情况下，可以使用 `during` 回调如下：
```js
{
    type: 'polygon',
    shape: {
        points: calculatePoints(initialDegree),
        transition: 'points'
    },
    extra: {
        degree: nextDegree
    },
    // 让 echarts 对 `extra.degree` 进行插值，然后基于
    // `extra.degree` 来计算动画中每一帧时的 polygon 形状。
    transition: 'extra',
    during: function (duringAPI) {
        var currentDegree = duringAPI.getExtra('degree');
        duringAPI.setShape(calculatePoints(currentDegree));
    }
    // ...
}
```

也参见这个 [例子](custom-spiral-race&edit=1&reset=1)。





#### extra(Object)

用户可以在 `extra` 字段中定义自己的属性。`extra` 的往往会结合 [during](option.html#series-custom.renderItem.return_rect.during) 一起使用。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `extra` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `extra` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `extra` 下所有属性开启过渡动画。
        transition: 'extra',
    };
}
```

















#### shape(Object)



##### cx(number) = 0

图形元素的中心在父节点坐标系（以父节点左上角为原点）中的横坐标值。

##### cy(numbr) = 0

图形元素的中心在父节点坐标系（以父节点左上角为原点）中的纵坐标值。









##### r(number) = 0

外半径。





##### r0(number) = 0

内半径。







##### startAngle(number) = 0

开始弧度。

##### endAngle(number) = Math.PI * 2

结束弧度。

##### clockwise(boolean) = true

是否顺时针。








##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `shape` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        shape: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `shape` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        shape: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `shape` 下所有属性开启过渡动画。
        transition: 'shape',
    };
}
```






#### style(Object)



注：关于图形元素中更多的样式设置（例如 [富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)），参见 [zrender/graphic/Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable) 中的 style 相关属性。

注意，这里图形元素的样式属性名称直接源于 zrender，和 `echarts label`、`echarts itemStyle` 等处同样含义的样式属性名称或有不同。例如，有如下对应：

+ [itemStyle.color](~series-scatter.label.color) => `style.fill`
+ [itemStyle.borderColor](~series-scatter.label.color) => `style.stroke`
+ [label.color](~series-scatter.label.color) => `style.textFill`
+ [label.textBorderColor](~series-scatter.label.textBorderColor) => `style.textStroke`
+ ...

##### fill(string) = null

填充色。

##### stroke(string) = "#000"

笔画颜色。

##### lineWidth(number) = 1

笔画宽度。

##### shadowBlur(number) = undefined

阴影宽度。

##### shadowOffsetX(number) = undefined

阴影 X 方向偏移。

##### shadowOffsetY(number) = undefined

阴影 Y 方向偏移。

##### shadowColor(number) = undefined

阴影颜色。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `style` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        style: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `style` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        style: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `style` 下所有属性开启过渡动画。
        transition: 'style',
    };
}
```












#### focus(string) = 'none'



> 从 `v5.0.0` 开始支持



在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。支持如下配置：

+ `'none'` 不淡出其它图形，默认使用该配置。
+ `'self'` 只聚焦（不淡出）当前高亮的数据的图形。
+ `'series'` 聚焦当前高亮的数据所在的系列的所有图形。

#### blurScope(string) = 'coordinateSystem'



> 从 `v5.0.0` 开始支持



在开启`focus`的时候，可以通过`blurScope`配置淡出的范围。支持如下配置

+ `'coordinateSystem'` 淡出范围为坐标系，默认使用该配置。
+ `'series'` 淡出范围为系列。
+ `'global'` 淡出范围为全局。








#### emphasis(Object)

图形元素的高亮状态

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。

#### blur(Object)



> 从 `v5.0.0` 开始支持



图形元素的淡出状态，配置`focus`时有效。

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。

#### select(Object)



> 从 `v5.0.0` 开始支持



图形元素的选中状态，配置自定义系列的 [selectedMode](~series-custom.selectedMode) 时有效。

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。














### return_polygon(Object)

多边形。



#### type(string) = polygon

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~series-custom.renderItem.return_image),
[text](~series-custom.renderItem.return_text),
[circle](~series-custom.renderItem.return_circle),
[sector](~series-custom.renderItem.return_sector),
[ring](~series-custom.renderItem.return_ring),
[polygon](~series-custom.renderItem.return_polygon),
[polyline](~series-custom.renderItem.return_polyline),
[rect](~series-custom.renderItem.return_rect),
[line](~series-custom.renderItem.return_line),
[bezierCurve](~series-custom.renderItem.return_bezierCurve),
[arc](~series-custom.renderItem.return_arc),
[group](~series-custom.renderItem.return_group),





#### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。





#### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_polygon.x) 和 [y](~series-custom.renderItem.return_polygon.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_polygon.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_polygon.scaleX) 和 [scaleY](~series-custom.renderItem.return_polygon.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_polygon.originX) 和 [originY](~series-custom.renderItem.return_polygon.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_polygon.x) 和 [y](~series-custom.renderItem.return_polygon.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_polygon.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_polygon.scaleX) 和 [scaleY](~series-custom.renderItem.return_polygon.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_polygon.originX) 和 [originY](~series-custom.renderItem.return_polygon.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_polygon.x) 和 [y](~series-custom.renderItem.return_polygon.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_polygon.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_polygon.scaleX) 和 [scaleY](~series-custom.renderItem.return_polygon.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_polygon.originX) 和 [originY](~series-custom.renderItem.return_polygon.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_polygon.x) 和 [y](~series-custom.renderItem.return_polygon.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_polygon.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_polygon.scaleX) 和 [scaleY](~series-custom.renderItem.return_polygon.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_polygon.originX) 和 [originY](~series-custom.renderItem.return_polygon.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_polygon.x) 和 [y](~series-custom.renderItem.return_polygon.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_polygon.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_polygon.scaleX) 和 [scaleY](~series-custom.renderItem.return_polygon.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_polygon.originX) 和 [originY](~series-custom.renderItem.return_polygon.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_polygon.x) 和 [y](~series-custom.renderItem.return_polygon.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_polygon.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_polygon.scaleX) 和 [scaleY](~series-custom.renderItem.return_polygon.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_polygon.originX) 和 [originY](~series-custom.renderItem.return_polygon.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_polygon.x) 和 [y](~series-custom.renderItem.return_polygon.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_polygon.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_polygon.scaleX) 和 [scaleY](~series-custom.renderItem.return_polygon.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_polygon.originX) 和 [originY](~series-custom.renderItem.return_polygon.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。










#### transition(string|Array) = ['x', 'y']

可以指定一个属性名，或者一组属性名。被指定的属性值变化时，会开启过渡动画。

属性只可以是：
+ Transform 相关的属性：[`'x'`](~series-custom.renderItem.return_polygon.x), [`'y'`](~series-custom.renderItem.return_polygon.y)、[`'scaleX'`](~series-custom.renderItem.return_polygon.scaleX)、[`'scaleY'`](~series-custom.renderItem.return_polygon.scaleY)、[`'rotation'`](~series-custom.renderItem.return_polygon.rotation)、[`'originX'`](~series-custom.renderItem.return_polygon.originX)、[`'originY'`](~series-custom.renderItem.return_polygon.originY)。例如：
    ```js
    renderItem: function (params, api) {
        var coord = api.coord([api.value(0), api.value[1]);
        return {
            type: 'rect',
            x: coord[0],
            y: coord[1],
            shape: {
                x: 0,
                y: 0,
                width: api.value(2),
                height: 100
            },
            transition: ['x', 'y', 'width']
        }
    }
    ```
+ 还可以是这三个属性 [`'shape'`](~series-custom.renderItem.return_polygon.shape)、['`style'`](~series-custom.renderItem.return_polygon.style)、[`'extra'`](~series-custom.renderItem.return_polygon.extra)。表示这三个属性中所有的子属性都开启过渡动画。例如：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3)
            },
            // 表示 shape 中所有属性都开启过渡动画。
            transition: 'shape',
        };
    }
    ```
    这等价于：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3),
                // transition 放在 shape 中，能只指定部分属性开启过渡动画。
                transition: ['x', 'y', 'width', 'height']
            }
        };
    }
    ```

当 transition 没有指定时，[`'x'`](~series-custom.renderItem.return_polygon.x) 和 [`'y'`](~series-custom.renderItem.return_polygon.y) 会默认开启过渡动画。如果想禁用这种默认，可设定：
```js
transition: [] // 一个空数组
```

看这个 [例子](doc-example/custom-transition-simple&edit=1&reset=1)。



#### morph(boolean) = false

是否开启形变动画。

**什么情况下会展示出形变动画？**

`morph` 设置为 `true` 后，还需按照如下规则，来形成形变动画：

每次走渲染流程是，自定义系列会自动比较（diff）新旧数据。在这个 diff 过程中，如果发现，一组旧数据项和一组新数据项的值相等（相等的规则是，name 相同，或者 [transition](api.html#echartsInstance.setOption) 所指定的维度上的值相同），那么我们就找到了能形成形变动画的一对候选集。

在这组旧数据和这组新数据间，可能产生三种形变动画：
+ 一对一（one-to-one）：如果新数据组和旧数据组都各自只有一个数据项。
+ 一对多（one-to-many）：如果新数据组中有多个数据项，旧数据组中只有一个数据项。
+ 多对一（many-to-one）：如果新数据组中只有一个数据项，旧数据组中有多个数据项。

注：我们并不支持多对多（many-to-many）的情况。

然后，自定义系列，会在新旧组中，寻找声明为 `morph: true` 的图形元素，并分配他们形成真正的一一映射的形变，或者分裂（separating），或者合并（combining）。

参见示例：[custom-one-to-one-morph](custom-one-to-one-morph&edit=1&reset=1) 和
[custom-combine-separate-morph](custom-combine-separate-morph&edit=1&reset=1)。





#### z2(number) = undefined

用于决定图形元素的覆盖关系。

#### name(string) = undefined

参见 [diffChildrenByName](~series-custom.renderItem.return_polygon.diffChildrenByName)。


#### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

#### silent(boolean) = false

是否不响应鼠标以及触摸事件。

#### invisible(boolean) = false

节点是否可见。

#### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

#### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#series-custom.renderItem.return_text)。


#### textConfig(Object)

##### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

##### rotation(number)

`textContent` 的旋转弧度。

##### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

##### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

##### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

##### distance(number) = 5

距离 `layoutRect` 的距离。

##### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

##### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

##### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

##### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

##### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

##### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。




#### during(Function)

在动画的每一帧里，用户可以使用 `during` 回调来设定节点的各种属性。

```js
(duringAPI: CustomDuringAPI) => void

interface CustomDuringAPI {
    // 设置 transform 属性值。
    // transform 属性参见 `TransformProp`。
    setTransform(key: TransformProp, val: unknown): void;
    // 获得当前动画帧的 transform 属性值。
    getTransform(key: TransformProp): unknown;
    // 设置 shape 属性值。
    // shape 属性形如：`{ type: 'rect', shape: { xxxProp: xxxValue } }`。
    setShape(key: string, val: unknown): void;
    // 获得当前动画帧的 shape 属性值。
    getShape(key: string): unknown;
    // 设置 style 属性值。
    // style 属性形如：`{ type: 'rect', style: { xxxProp: xxxValue } }`。
    setStyle(key: string, val: unknown): void;
    // 获得当前动画帧的 style 属性值。
    getStyle(key: string): unknown;
    // 设置 extra 属性值。
    // extra 属性形如：`{ type: 'rect', extra: { xxxProp: xxxValue } }`。
    setExtra(key: string, val: unknown): void;
    // 获得当前动画帧的 extra 属性值。
    getExtra(key: string): unknown;
}

type TransformProp =
    'x' | 'y' | 'scaleX' | 'scaleY' | 'originX' | 'originY' | 'rotation';
```

在绝大多数场景下，用户不需要这个 `during` 回调。因为，假如属性被设定到 [transition](option.html#series-custom.renderItem.return_rect.transition) 中后，echarts 会自动对它进行插值，并且基于这些插值形成动画。但是，如果这些插值形成的动画不满足用户需求，那么用户可以使用 `during` 回调来定制他们。

例如，如果用户使用 [polygon](option.html#series-custom.renderItem.return_polygon) 画图形，图形的形状会由 [shape.points](option.html#series-custom.renderItem.return_polygon.shape.points) 来定义，形如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...]
    },
    // ...
}
```
如果用户指定了 [transition](option.html#series-custom.renderItem.return_polygon.transition) 如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...],
    },
    transition: 'shape'
    // ...
}
```
尽管这些 `points` 会被 echarts 自动插值，但是这样形成的动画里，这些点会直线走向目标位置。假如用户需求是，这些点要按照某种特定的路径（如弧线、螺旋）来移动，则这就不满足了。所以在这种情况下，可以使用 `during` 回调如下：
```js
{
    type: 'polygon',
    shape: {
        points: calculatePoints(initialDegree),
        transition: 'points'
    },
    extra: {
        degree: nextDegree
    },
    // 让 echarts 对 `extra.degree` 进行插值，然后基于
    // `extra.degree` 来计算动画中每一帧时的 polygon 形状。
    transition: 'extra',
    during: function (duringAPI) {
        var currentDegree = duringAPI.getExtra('degree');
        duringAPI.setShape(calculatePoints(currentDegree));
    }
    // ...
}
```

也参见这个 [例子](custom-spiral-race&edit=1&reset=1)。





#### extra(Object)

用户可以在 `extra` 字段中定义自己的属性。`extra` 的往往会结合 [during](option.html#series-custom.renderItem.return_rect.during) 一起使用。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `extra` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `extra` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `extra` 下所有属性开启过渡动画。
        transition: 'extra',
    };
}
```

















#### shape(Object)



##### points(Array)

点列表，用于定义形状，如 `[[22, 44], [44, 55], [11, 44], ...]`

##### smooth(number|string) = undefined

是否平滑曲线。

+ 如果为 number：表示贝塞尔 (bezier) 差值平滑，smooth 指定了平滑等级，范围 `[0, 1]`。
+ 如果为 `'spline'`：表示 Catmull-Rom spline 差值平滑。

##### smoothConstraint(boolean) = false

是否将平滑曲线约束在包围盒中。`smooth` 为 `number`（bezier）时生效。








##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `shape` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        shape: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `shape` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        shape: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `shape` 下所有属性开启过渡动画。
        transition: 'shape',
    };
}
```






#### style(Object)



注：关于图形元素中更多的样式设置（例如 [富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)），参见 [zrender/graphic/Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable) 中的 style 相关属性。

注意，这里图形元素的样式属性名称直接源于 zrender，和 `echarts label`、`echarts itemStyle` 等处同样含义的样式属性名称或有不同。例如，有如下对应：

+ [itemStyle.color](~series-scatter.label.color) => `style.fill`
+ [itemStyle.borderColor](~series-scatter.label.color) => `style.stroke`
+ [label.color](~series-scatter.label.color) => `style.textFill`
+ [label.textBorderColor](~series-scatter.label.textBorderColor) => `style.textStroke`
+ ...

##### fill(string) = '#000'

填充色。

##### stroke(string) = null

笔画颜色。

##### lineWidth(number) = 0

笔画宽度。

##### shadowBlur(number) = undefined

阴影宽度。

##### shadowOffsetX(number) = undefined

阴影 X 方向偏移。

##### shadowOffsetY(number) = undefined

阴影 Y 方向偏移。

##### shadowColor(number) = undefined

阴影颜色。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `style` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        style: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `style` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        style: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `style` 下所有属性开启过渡动画。
        transition: 'style',
    };
}
```












#### focus(string) = 'none'



> 从 `v5.0.0` 开始支持



在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。支持如下配置：

+ `'none'` 不淡出其它图形，默认使用该配置。
+ `'self'` 只聚焦（不淡出）当前高亮的数据的图形。
+ `'series'` 聚焦当前高亮的数据所在的系列的所有图形。

#### blurScope(string) = 'coordinateSystem'



> 从 `v5.0.0` 开始支持



在开启`focus`的时候，可以通过`blurScope`配置淡出的范围。支持如下配置

+ `'coordinateSystem'` 淡出范围为坐标系，默认使用该配置。
+ `'series'` 淡出范围为系列。
+ `'global'` 淡出范围为全局。








#### emphasis(Object)

图形元素的高亮状态

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。

#### blur(Object)



> 从 `v5.0.0` 开始支持



图形元素的淡出状态，配置`focus`时有效。

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。

#### select(Object)



> 从 `v5.0.0` 开始支持



图形元素的选中状态，配置自定义系列的 [selectedMode](~series-custom.selectedMode) 时有效。

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。














### return_polyline(Object)

折线。



#### type(string) = polyline

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~series-custom.renderItem.return_image),
[text](~series-custom.renderItem.return_text),
[circle](~series-custom.renderItem.return_circle),
[sector](~series-custom.renderItem.return_sector),
[ring](~series-custom.renderItem.return_ring),
[polygon](~series-custom.renderItem.return_polygon),
[polyline](~series-custom.renderItem.return_polyline),
[rect](~series-custom.renderItem.return_rect),
[line](~series-custom.renderItem.return_line),
[bezierCurve](~series-custom.renderItem.return_bezierCurve),
[arc](~series-custom.renderItem.return_arc),
[group](~series-custom.renderItem.return_group),





#### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。





#### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_polyline.x) 和 [y](~series-custom.renderItem.return_polyline.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_polyline.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_polyline.scaleX) 和 [scaleY](~series-custom.renderItem.return_polyline.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_polyline.originX) 和 [originY](~series-custom.renderItem.return_polyline.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_polyline.x) 和 [y](~series-custom.renderItem.return_polyline.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_polyline.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_polyline.scaleX) 和 [scaleY](~series-custom.renderItem.return_polyline.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_polyline.originX) 和 [originY](~series-custom.renderItem.return_polyline.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_polyline.x) 和 [y](~series-custom.renderItem.return_polyline.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_polyline.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_polyline.scaleX) 和 [scaleY](~series-custom.renderItem.return_polyline.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_polyline.originX) 和 [originY](~series-custom.renderItem.return_polyline.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_polyline.x) 和 [y](~series-custom.renderItem.return_polyline.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_polyline.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_polyline.scaleX) 和 [scaleY](~series-custom.renderItem.return_polyline.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_polyline.originX) 和 [originY](~series-custom.renderItem.return_polyline.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_polyline.x) 和 [y](~series-custom.renderItem.return_polyline.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_polyline.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_polyline.scaleX) 和 [scaleY](~series-custom.renderItem.return_polyline.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_polyline.originX) 和 [originY](~series-custom.renderItem.return_polyline.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_polyline.x) 和 [y](~series-custom.renderItem.return_polyline.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_polyline.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_polyline.scaleX) 和 [scaleY](~series-custom.renderItem.return_polyline.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_polyline.originX) 和 [originY](~series-custom.renderItem.return_polyline.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_polyline.x) 和 [y](~series-custom.renderItem.return_polyline.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_polyline.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_polyline.scaleX) 和 [scaleY](~series-custom.renderItem.return_polyline.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_polyline.originX) 和 [originY](~series-custom.renderItem.return_polyline.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。










#### transition(string|Array) = ['x', 'y']

可以指定一个属性名，或者一组属性名。被指定的属性值变化时，会开启过渡动画。

属性只可以是：
+ Transform 相关的属性：[`'x'`](~series-custom.renderItem.return_polyline.x), [`'y'`](~series-custom.renderItem.return_polyline.y)、[`'scaleX'`](~series-custom.renderItem.return_polyline.scaleX)、[`'scaleY'`](~series-custom.renderItem.return_polyline.scaleY)、[`'rotation'`](~series-custom.renderItem.return_polyline.rotation)、[`'originX'`](~series-custom.renderItem.return_polyline.originX)、[`'originY'`](~series-custom.renderItem.return_polyline.originY)。例如：
    ```js
    renderItem: function (params, api) {
        var coord = api.coord([api.value(0), api.value[1]);
        return {
            type: 'rect',
            x: coord[0],
            y: coord[1],
            shape: {
                x: 0,
                y: 0,
                width: api.value(2),
                height: 100
            },
            transition: ['x', 'y', 'width']
        }
    }
    ```
+ 还可以是这三个属性 [`'shape'`](~series-custom.renderItem.return_polyline.shape)、['`style'`](~series-custom.renderItem.return_polyline.style)、[`'extra'`](~series-custom.renderItem.return_polyline.extra)。表示这三个属性中所有的子属性都开启过渡动画。例如：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3)
            },
            // 表示 shape 中所有属性都开启过渡动画。
            transition: 'shape',
        };
    }
    ```
    这等价于：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3),
                // transition 放在 shape 中，能只指定部分属性开启过渡动画。
                transition: ['x', 'y', 'width', 'height']
            }
        };
    }
    ```

当 transition 没有指定时，[`'x'`](~series-custom.renderItem.return_polyline.x) 和 [`'y'`](~series-custom.renderItem.return_polyline.y) 会默认开启过渡动画。如果想禁用这种默认，可设定：
```js
transition: [] // 一个空数组
```

看这个 [例子](doc-example/custom-transition-simple&edit=1&reset=1)。



#### morph(boolean) = false

是否开启形变动画。

**什么情况下会展示出形变动画？**

`morph` 设置为 `true` 后，还需按照如下规则，来形成形变动画：

每次走渲染流程是，自定义系列会自动比较（diff）新旧数据。在这个 diff 过程中，如果发现，一组旧数据项和一组新数据项的值相等（相等的规则是，name 相同，或者 [transition](api.html#echartsInstance.setOption) 所指定的维度上的值相同），那么我们就找到了能形成形变动画的一对候选集。

在这组旧数据和这组新数据间，可能产生三种形变动画：
+ 一对一（one-to-one）：如果新数据组和旧数据组都各自只有一个数据项。
+ 一对多（one-to-many）：如果新数据组中有多个数据项，旧数据组中只有一个数据项。
+ 多对一（many-to-one）：如果新数据组中只有一个数据项，旧数据组中有多个数据项。

注：我们并不支持多对多（many-to-many）的情况。

然后，自定义系列，会在新旧组中，寻找声明为 `morph: true` 的图形元素，并分配他们形成真正的一一映射的形变，或者分裂（separating），或者合并（combining）。

参见示例：[custom-one-to-one-morph](custom-one-to-one-morph&edit=1&reset=1) 和
[custom-combine-separate-morph](custom-combine-separate-morph&edit=1&reset=1)。





#### z2(number) = undefined

用于决定图形元素的覆盖关系。

#### name(string) = undefined

参见 [diffChildrenByName](~series-custom.renderItem.return_polyline.diffChildrenByName)。


#### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

#### silent(boolean) = false

是否不响应鼠标以及触摸事件。

#### invisible(boolean) = false

节点是否可见。

#### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

#### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#series-custom.renderItem.return_text)。


#### textConfig(Object)

##### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

##### rotation(number)

`textContent` 的旋转弧度。

##### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

##### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

##### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

##### distance(number) = 5

距离 `layoutRect` 的距离。

##### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

##### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

##### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

##### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

##### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

##### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。




#### during(Function)

在动画的每一帧里，用户可以使用 `during` 回调来设定节点的各种属性。

```js
(duringAPI: CustomDuringAPI) => void

interface CustomDuringAPI {
    // 设置 transform 属性值。
    // transform 属性参见 `TransformProp`。
    setTransform(key: TransformProp, val: unknown): void;
    // 获得当前动画帧的 transform 属性值。
    getTransform(key: TransformProp): unknown;
    // 设置 shape 属性值。
    // shape 属性形如：`{ type: 'rect', shape: { xxxProp: xxxValue } }`。
    setShape(key: string, val: unknown): void;
    // 获得当前动画帧的 shape 属性值。
    getShape(key: string): unknown;
    // 设置 style 属性值。
    // style 属性形如：`{ type: 'rect', style: { xxxProp: xxxValue } }`。
    setStyle(key: string, val: unknown): void;
    // 获得当前动画帧的 style 属性值。
    getStyle(key: string): unknown;
    // 设置 extra 属性值。
    // extra 属性形如：`{ type: 'rect', extra: { xxxProp: xxxValue } }`。
    setExtra(key: string, val: unknown): void;
    // 获得当前动画帧的 extra 属性值。
    getExtra(key: string): unknown;
}

type TransformProp =
    'x' | 'y' | 'scaleX' | 'scaleY' | 'originX' | 'originY' | 'rotation';
```

在绝大多数场景下，用户不需要这个 `during` 回调。因为，假如属性被设定到 [transition](option.html#series-custom.renderItem.return_rect.transition) 中后，echarts 会自动对它进行插值，并且基于这些插值形成动画。但是，如果这些插值形成的动画不满足用户需求，那么用户可以使用 `during` 回调来定制他们。

例如，如果用户使用 [polygon](option.html#series-custom.renderItem.return_polygon) 画图形，图形的形状会由 [shape.points](option.html#series-custom.renderItem.return_polygon.shape.points) 来定义，形如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...]
    },
    // ...
}
```
如果用户指定了 [transition](option.html#series-custom.renderItem.return_polygon.transition) 如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...],
    },
    transition: 'shape'
    // ...
}
```
尽管这些 `points` 会被 echarts 自动插值，但是这样形成的动画里，这些点会直线走向目标位置。假如用户需求是，这些点要按照某种特定的路径（如弧线、螺旋）来移动，则这就不满足了。所以在这种情况下，可以使用 `during` 回调如下：
```js
{
    type: 'polygon',
    shape: {
        points: calculatePoints(initialDegree),
        transition: 'points'
    },
    extra: {
        degree: nextDegree
    },
    // 让 echarts 对 `extra.degree` 进行插值，然后基于
    // `extra.degree` 来计算动画中每一帧时的 polygon 形状。
    transition: 'extra',
    during: function (duringAPI) {
        var currentDegree = duringAPI.getExtra('degree');
        duringAPI.setShape(calculatePoints(currentDegree));
    }
    // ...
}
```

也参见这个 [例子](custom-spiral-race&edit=1&reset=1)。





#### extra(Object)

用户可以在 `extra` 字段中定义自己的属性。`extra` 的往往会结合 [during](option.html#series-custom.renderItem.return_rect.during) 一起使用。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `extra` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `extra` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `extra` 下所有属性开启过渡动画。
        transition: 'extra',
    };
}
```

















#### shape(Object)



##### points(Array)

点列表，用于定义形状，如 `[[22, 44], [44, 55], [11, 44], ...]`

##### smooth(number|string) = undefined

是否平滑曲线。

+ 如果为 number：表示贝塞尔 (bezier) 差值平滑，smooth 指定了平滑等级，范围 `[0, 1]`。
+ 如果为 `'spline'`：表示 Catmull-Rom spline 差值平滑。

##### smoothConstraint(boolean) = false

是否将平滑曲线约束在包围盒中。`smooth` 为 `number`（bezier）时生效。








##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `shape` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        shape: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `shape` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        shape: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `shape` 下所有属性开启过渡动画。
        transition: 'shape',
    };
}
```






#### style(Object)



注：关于图形元素中更多的样式设置（例如 [富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)），参见 [zrender/graphic/Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable) 中的 style 相关属性。

注意，这里图形元素的样式属性名称直接源于 zrender，和 `echarts label`、`echarts itemStyle` 等处同样含义的样式属性名称或有不同。例如，有如下对应：

+ [itemStyle.color](~series-scatter.label.color) => `style.fill`
+ [itemStyle.borderColor](~series-scatter.label.color) => `style.stroke`
+ [label.color](~series-scatter.label.color) => `style.textFill`
+ [label.textBorderColor](~series-scatter.label.textBorderColor) => `style.textStroke`
+ ...

##### fill(string) = null

填充色。

##### stroke(string) = "#000"

笔画颜色。

##### lineWidth(number) = 5

笔画宽度。

##### shadowBlur(number) = undefined

阴影宽度。

##### shadowOffsetX(number) = undefined

阴影 X 方向偏移。

##### shadowOffsetY(number) = undefined

阴影 Y 方向偏移。

##### shadowColor(number) = undefined

阴影颜色。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `style` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        style: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `style` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        style: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `style` 下所有属性开启过渡动画。
        transition: 'style',
    };
}
```












#### focus(string) = 'none'



> 从 `v5.0.0` 开始支持



在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。支持如下配置：

+ `'none'` 不淡出其它图形，默认使用该配置。
+ `'self'` 只聚焦（不淡出）当前高亮的数据的图形。
+ `'series'` 聚焦当前高亮的数据所在的系列的所有图形。

#### blurScope(string) = 'coordinateSystem'



> 从 `v5.0.0` 开始支持



在开启`focus`的时候，可以通过`blurScope`配置淡出的范围。支持如下配置

+ `'coordinateSystem'` 淡出范围为坐标系，默认使用该配置。
+ `'series'` 淡出范围为系列。
+ `'global'` 淡出范围为全局。








#### emphasis(Object)

图形元素的高亮状态

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。

#### blur(Object)



> 从 `v5.0.0` 开始支持



图形元素的淡出状态，配置`focus`时有效。

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。

#### select(Object)



> 从 `v5.0.0` 开始支持



图形元素的选中状态，配置自定义系列的 [selectedMode](~series-custom.selectedMode) 时有效。

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。














### return_line(Object)

直线。



#### type(string) = line

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~series-custom.renderItem.return_image),
[text](~series-custom.renderItem.return_text),
[circle](~series-custom.renderItem.return_circle),
[sector](~series-custom.renderItem.return_sector),
[ring](~series-custom.renderItem.return_ring),
[polygon](~series-custom.renderItem.return_polygon),
[polyline](~series-custom.renderItem.return_polyline),
[rect](~series-custom.renderItem.return_rect),
[line](~series-custom.renderItem.return_line),
[bezierCurve](~series-custom.renderItem.return_bezierCurve),
[arc](~series-custom.renderItem.return_arc),
[group](~series-custom.renderItem.return_group),





#### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。





#### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_line.x) 和 [y](~series-custom.renderItem.return_line.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_line.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_line.scaleX) 和 [scaleY](~series-custom.renderItem.return_line.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_line.originX) 和 [originY](~series-custom.renderItem.return_line.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_line.x) 和 [y](~series-custom.renderItem.return_line.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_line.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_line.scaleX) 和 [scaleY](~series-custom.renderItem.return_line.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_line.originX) 和 [originY](~series-custom.renderItem.return_line.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_line.x) 和 [y](~series-custom.renderItem.return_line.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_line.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_line.scaleX) 和 [scaleY](~series-custom.renderItem.return_line.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_line.originX) 和 [originY](~series-custom.renderItem.return_line.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_line.x) 和 [y](~series-custom.renderItem.return_line.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_line.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_line.scaleX) 和 [scaleY](~series-custom.renderItem.return_line.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_line.originX) 和 [originY](~series-custom.renderItem.return_line.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_line.x) 和 [y](~series-custom.renderItem.return_line.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_line.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_line.scaleX) 和 [scaleY](~series-custom.renderItem.return_line.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_line.originX) 和 [originY](~series-custom.renderItem.return_line.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_line.x) 和 [y](~series-custom.renderItem.return_line.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_line.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_line.scaleX) 和 [scaleY](~series-custom.renderItem.return_line.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_line.originX) 和 [originY](~series-custom.renderItem.return_line.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_line.x) 和 [y](~series-custom.renderItem.return_line.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_line.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_line.scaleX) 和 [scaleY](~series-custom.renderItem.return_line.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_line.originX) 和 [originY](~series-custom.renderItem.return_line.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。










#### transition(string|Array) = ['x', 'y']

可以指定一个属性名，或者一组属性名。被指定的属性值变化时，会开启过渡动画。

属性只可以是：
+ Transform 相关的属性：[`'x'`](~series-custom.renderItem.return_line.x), [`'y'`](~series-custom.renderItem.return_line.y)、[`'scaleX'`](~series-custom.renderItem.return_line.scaleX)、[`'scaleY'`](~series-custom.renderItem.return_line.scaleY)、[`'rotation'`](~series-custom.renderItem.return_line.rotation)、[`'originX'`](~series-custom.renderItem.return_line.originX)、[`'originY'`](~series-custom.renderItem.return_line.originY)。例如：
    ```js
    renderItem: function (params, api) {
        var coord = api.coord([api.value(0), api.value[1]);
        return {
            type: 'rect',
            x: coord[0],
            y: coord[1],
            shape: {
                x: 0,
                y: 0,
                width: api.value(2),
                height: 100
            },
            transition: ['x', 'y', 'width']
        }
    }
    ```
+ 还可以是这三个属性 [`'shape'`](~series-custom.renderItem.return_line.shape)、['`style'`](~series-custom.renderItem.return_line.style)、[`'extra'`](~series-custom.renderItem.return_line.extra)。表示这三个属性中所有的子属性都开启过渡动画。例如：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3)
            },
            // 表示 shape 中所有属性都开启过渡动画。
            transition: 'shape',
        };
    }
    ```
    这等价于：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3),
                // transition 放在 shape 中，能只指定部分属性开启过渡动画。
                transition: ['x', 'y', 'width', 'height']
            }
        };
    }
    ```

当 transition 没有指定时，[`'x'`](~series-custom.renderItem.return_line.x) 和 [`'y'`](~series-custom.renderItem.return_line.y) 会默认开启过渡动画。如果想禁用这种默认，可设定：
```js
transition: [] // 一个空数组
```

看这个 [例子](doc-example/custom-transition-simple&edit=1&reset=1)。



#### morph(boolean) = false

是否开启形变动画。

**什么情况下会展示出形变动画？**

`morph` 设置为 `true` 后，还需按照如下规则，来形成形变动画：

每次走渲染流程是，自定义系列会自动比较（diff）新旧数据。在这个 diff 过程中，如果发现，一组旧数据项和一组新数据项的值相等（相等的规则是，name 相同，或者 [transition](api.html#echartsInstance.setOption) 所指定的维度上的值相同），那么我们就找到了能形成形变动画的一对候选集。

在这组旧数据和这组新数据间，可能产生三种形变动画：
+ 一对一（one-to-one）：如果新数据组和旧数据组都各自只有一个数据项。
+ 一对多（one-to-many）：如果新数据组中有多个数据项，旧数据组中只有一个数据项。
+ 多对一（many-to-one）：如果新数据组中只有一个数据项，旧数据组中有多个数据项。

注：我们并不支持多对多（many-to-many）的情况。

然后，自定义系列，会在新旧组中，寻找声明为 `morph: true` 的图形元素，并分配他们形成真正的一一映射的形变，或者分裂（separating），或者合并（combining）。

参见示例：[custom-one-to-one-morph](custom-one-to-one-morph&edit=1&reset=1) 和
[custom-combine-separate-morph](custom-combine-separate-morph&edit=1&reset=1)。





#### z2(number) = undefined

用于决定图形元素的覆盖关系。

#### name(string) = undefined

参见 [diffChildrenByName](~series-custom.renderItem.return_line.diffChildrenByName)。


#### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

#### silent(boolean) = false

是否不响应鼠标以及触摸事件。

#### invisible(boolean) = false

节点是否可见。

#### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

#### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#series-custom.renderItem.return_text)。


#### textConfig(Object)

##### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

##### rotation(number)

`textContent` 的旋转弧度。

##### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

##### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

##### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

##### distance(number) = 5

距离 `layoutRect` 的距离。

##### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

##### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

##### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

##### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

##### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

##### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。




#### during(Function)

在动画的每一帧里，用户可以使用 `during` 回调来设定节点的各种属性。

```js
(duringAPI: CustomDuringAPI) => void

interface CustomDuringAPI {
    // 设置 transform 属性值。
    // transform 属性参见 `TransformProp`。
    setTransform(key: TransformProp, val: unknown): void;
    // 获得当前动画帧的 transform 属性值。
    getTransform(key: TransformProp): unknown;
    // 设置 shape 属性值。
    // shape 属性形如：`{ type: 'rect', shape: { xxxProp: xxxValue } }`。
    setShape(key: string, val: unknown): void;
    // 获得当前动画帧的 shape 属性值。
    getShape(key: string): unknown;
    // 设置 style 属性值。
    // style 属性形如：`{ type: 'rect', style: { xxxProp: xxxValue } }`。
    setStyle(key: string, val: unknown): void;
    // 获得当前动画帧的 style 属性值。
    getStyle(key: string): unknown;
    // 设置 extra 属性值。
    // extra 属性形如：`{ type: 'rect', extra: { xxxProp: xxxValue } }`。
    setExtra(key: string, val: unknown): void;
    // 获得当前动画帧的 extra 属性值。
    getExtra(key: string): unknown;
}

type TransformProp =
    'x' | 'y' | 'scaleX' | 'scaleY' | 'originX' | 'originY' | 'rotation';
```

在绝大多数场景下，用户不需要这个 `during` 回调。因为，假如属性被设定到 [transition](option.html#series-custom.renderItem.return_rect.transition) 中后，echarts 会自动对它进行插值，并且基于这些插值形成动画。但是，如果这些插值形成的动画不满足用户需求，那么用户可以使用 `during` 回调来定制他们。

例如，如果用户使用 [polygon](option.html#series-custom.renderItem.return_polygon) 画图形，图形的形状会由 [shape.points](option.html#series-custom.renderItem.return_polygon.shape.points) 来定义，形如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...]
    },
    // ...
}
```
如果用户指定了 [transition](option.html#series-custom.renderItem.return_polygon.transition) 如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...],
    },
    transition: 'shape'
    // ...
}
```
尽管这些 `points` 会被 echarts 自动插值，但是这样形成的动画里，这些点会直线走向目标位置。假如用户需求是，这些点要按照某种特定的路径（如弧线、螺旋）来移动，则这就不满足了。所以在这种情况下，可以使用 `during` 回调如下：
```js
{
    type: 'polygon',
    shape: {
        points: calculatePoints(initialDegree),
        transition: 'points'
    },
    extra: {
        degree: nextDegree
    },
    // 让 echarts 对 `extra.degree` 进行插值，然后基于
    // `extra.degree` 来计算动画中每一帧时的 polygon 形状。
    transition: 'extra',
    during: function (duringAPI) {
        var currentDegree = duringAPI.getExtra('degree');
        duringAPI.setShape(calculatePoints(currentDegree));
    }
    // ...
}
```

也参见这个 [例子](custom-spiral-race&edit=1&reset=1)。





#### extra(Object)

用户可以在 `extra` 字段中定义自己的属性。`extra` 的往往会结合 [during](option.html#series-custom.renderItem.return_rect.during) 一起使用。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `extra` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `extra` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `extra` 下所有属性开启过渡动画。
        transition: 'extra',
    };
}
```

















#### shape(Object)



##### x1(number) = 0

开始点的 x 值。

##### y1(number) = 0

开始点的 y 值。

##### x2(number) = 0

结束点的 x 值。

##### y2(number) = 0

结束点的 y 值。





##### percent(number) = 1

线画到百分之多少就不画了。值的范围：[0, 1]。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `shape` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        shape: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `shape` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        shape: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `shape` 下所有属性开启过渡动画。
        transition: 'shape',
    };
}
```






#### style(Object)



注：关于图形元素中更多的样式设置（例如 [富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)），参见 [zrender/graphic/Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable) 中的 style 相关属性。

注意，这里图形元素的样式属性名称直接源于 zrender，和 `echarts label`、`echarts itemStyle` 等处同样含义的样式属性名称或有不同。例如，有如下对应：

+ [itemStyle.color](~series-scatter.label.color) => `style.fill`
+ [itemStyle.borderColor](~series-scatter.label.color) => `style.stroke`
+ [label.color](~series-scatter.label.color) => `style.textFill`
+ [label.textBorderColor](~series-scatter.label.textBorderColor) => `style.textStroke`
+ ...

##### fill(string) = null

填充色。

##### stroke(string) = "#000"

笔画颜色。

##### lineWidth(number) = 5

笔画宽度。

##### shadowBlur(number) = undefined

阴影宽度。

##### shadowOffsetX(number) = undefined

阴影 X 方向偏移。

##### shadowOffsetY(number) = undefined

阴影 Y 方向偏移。

##### shadowColor(number) = undefined

阴影颜色。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `style` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        style: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `style` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        style: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `style` 下所有属性开启过渡动画。
        transition: 'style',
    };
}
```












#### focus(string) = 'none'



> 从 `v5.0.0` 开始支持



在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。支持如下配置：

+ `'none'` 不淡出其它图形，默认使用该配置。
+ `'self'` 只聚焦（不淡出）当前高亮的数据的图形。
+ `'series'` 聚焦当前高亮的数据所在的系列的所有图形。

#### blurScope(string) = 'coordinateSystem'



> 从 `v5.0.0` 开始支持



在开启`focus`的时候，可以通过`blurScope`配置淡出的范围。支持如下配置

+ `'coordinateSystem'` 淡出范围为坐标系，默认使用该配置。
+ `'series'` 淡出范围为系列。
+ `'global'` 淡出范围为全局。








#### emphasis(Object)

图形元素的高亮状态

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。

#### blur(Object)



> 从 `v5.0.0` 开始支持



图形元素的淡出状态，配置`focus`时有效。

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。

#### select(Object)



> 从 `v5.0.0` 开始支持



图形元素的选中状态，配置自定义系列的 [selectedMode](~series-custom.selectedMode) 时有效。

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。














### return_bezierCurve(Object)

二次或三次贝塞尔曲线。



#### type(string) = bezierCurve

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~series-custom.renderItem.return_image),
[text](~series-custom.renderItem.return_text),
[circle](~series-custom.renderItem.return_circle),
[sector](~series-custom.renderItem.return_sector),
[ring](~series-custom.renderItem.return_ring),
[polygon](~series-custom.renderItem.return_polygon),
[polyline](~series-custom.renderItem.return_polyline),
[rect](~series-custom.renderItem.return_rect),
[line](~series-custom.renderItem.return_line),
[bezierCurve](~series-custom.renderItem.return_bezierCurve),
[arc](~series-custom.renderItem.return_arc),
[group](~series-custom.renderItem.return_group),





#### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。





#### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_bezierCurve.x) 和 [y](~series-custom.renderItem.return_bezierCurve.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_bezierCurve.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_bezierCurve.scaleX) 和 [scaleY](~series-custom.renderItem.return_bezierCurve.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_bezierCurve.originX) 和 [originY](~series-custom.renderItem.return_bezierCurve.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_bezierCurve.x) 和 [y](~series-custom.renderItem.return_bezierCurve.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_bezierCurve.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_bezierCurve.scaleX) 和 [scaleY](~series-custom.renderItem.return_bezierCurve.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_bezierCurve.originX) 和 [originY](~series-custom.renderItem.return_bezierCurve.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_bezierCurve.x) 和 [y](~series-custom.renderItem.return_bezierCurve.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_bezierCurve.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_bezierCurve.scaleX) 和 [scaleY](~series-custom.renderItem.return_bezierCurve.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_bezierCurve.originX) 和 [originY](~series-custom.renderItem.return_bezierCurve.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_bezierCurve.x) 和 [y](~series-custom.renderItem.return_bezierCurve.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_bezierCurve.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_bezierCurve.scaleX) 和 [scaleY](~series-custom.renderItem.return_bezierCurve.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_bezierCurve.originX) 和 [originY](~series-custom.renderItem.return_bezierCurve.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_bezierCurve.x) 和 [y](~series-custom.renderItem.return_bezierCurve.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_bezierCurve.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_bezierCurve.scaleX) 和 [scaleY](~series-custom.renderItem.return_bezierCurve.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_bezierCurve.originX) 和 [originY](~series-custom.renderItem.return_bezierCurve.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_bezierCurve.x) 和 [y](~series-custom.renderItem.return_bezierCurve.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_bezierCurve.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_bezierCurve.scaleX) 和 [scaleY](~series-custom.renderItem.return_bezierCurve.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_bezierCurve.originX) 和 [originY](~series-custom.renderItem.return_bezierCurve.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





#### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~series-custom.renderItem.return_bezierCurve.x) 和 [y](~series-custom.renderItem.return_bezierCurve.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~series-custom.renderItem.return_bezierCurve.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~series-custom.renderItem.return_bezierCurve.scaleX) 和 [scaleY](~series-custom.renderItem.return_bezierCurve.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~series-custom.renderItem.return_bezierCurve.originX) 和 [originY](~series-custom.renderItem.return_bezierCurve.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~series-custom.renderItem.return_group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~series-custom.renderItem.return_group) 来组织多个图形元素，并且 [group](~series-custom.renderItem.return_group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。










#### transition(string|Array) = ['x', 'y']

可以指定一个属性名，或者一组属性名。被指定的属性值变化时，会开启过渡动画。

属性只可以是：
+ Transform 相关的属性：[`'x'`](~series-custom.renderItem.return_bezierCurve.x), [`'y'`](~series-custom.renderItem.return_bezierCurve.y)、[`'scaleX'`](~series-custom.renderItem.return_bezierCurve.scaleX)、[`'scaleY'`](~series-custom.renderItem.return_bezierCurve.scaleY)、[`'rotation'`](~series-custom.renderItem.return_bezierCurve.rotation)、[`'originX'`](~series-custom.renderItem.return_bezierCurve.originX)、[`'originY'`](~series-custom.renderItem.return_bezierCurve.originY)。例如：
    ```js
    renderItem: function (params, api) {
        var coord = api.coord([api.value(0), api.value[1]);
        return {
            type: 'rect',
            x: coord[0],
            y: coord[1],
            shape: {
                x: 0,
                y: 0,
                width: api.value(2),
                height: 100
            },
            transition: ['x', 'y', 'width']
        }
    }
    ```
+ 还可以是这三个属性 [`'shape'`](~series-custom.renderItem.return_bezierCurve.shape)、['`style'`](~series-custom.renderItem.return_bezierCurve.style)、[`'extra'`](~series-custom.renderItem.return_bezierCurve.extra)。表示这三个属性中所有的子属性都开启过渡动画。例如：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3)
            },
            // 表示 shape 中所有属性都开启过渡动画。
            transition: 'shape',
        };
    }
    ```
    这等价于：
    ```js
    renderItem: function (params, api) {
        return {
            type: 'rect',
            shape: {
                x: api.value(0),
                y: api.value(1),
                width: api.value(2),
                height: api.value(3),
                // transition 放在 shape 中，能只指定部分属性开启过渡动画。
                transition: ['x', 'y', 'width', 'height']
            }
        };
    }
    ```

当 transition 没有指定时，[`'x'`](~series-custom.renderItem.return_bezierCurve.x) 和 [`'y'`](~series-custom.renderItem.return_bezierCurve.y) 会默认开启过渡动画。如果想禁用这种默认，可设定：
```js
transition: [] // 一个空数组
```

看这个 [例子](doc-example/custom-transition-simple&edit=1&reset=1)。



#### morph(boolean) = false

是否开启形变动画。

**什么情况下会展示出形变动画？**

`morph` 设置为 `true` 后，还需按照如下规则，来形成形变动画：

每次走渲染流程是，自定义系列会自动比较（diff）新旧数据。在这个 diff 过程中，如果发现，一组旧数据项和一组新数据项的值相等（相等的规则是，name 相同，或者 [transition](api.html#echartsInstance.setOption) 所指定的维度上的值相同），那么我们就找到了能形成形变动画的一对候选集。

在这组旧数据和这组新数据间，可能产生三种形变动画：
+ 一对一（one-to-one）：如果新数据组和旧数据组都各自只有一个数据项。
+ 一对多（one-to-many）：如果新数据组中有多个数据项，旧数据组中只有一个数据项。
+ 多对一（many-to-one）：如果新数据组中只有一个数据项，旧数据组中有多个数据项。

注：我们并不支持多对多（many-to-many）的情况。

然后，自定义系列，会在新旧组中，寻找声明为 `morph: true` 的图形元素，并分配他们形成真正的一一映射的形变，或者分裂（separating），或者合并（combining）。

参见示例：[custom-one-to-one-morph](custom-one-to-one-morph&edit=1&reset=1) 和
[custom-combine-separate-morph](custom-combine-separate-morph&edit=1&reset=1)。





#### z2(number) = undefined

用于决定图形元素的覆盖关系。

#### name(string) = undefined

参见 [diffChildrenByName](~series-custom.renderItem.return_bezierCurve.diffChildrenByName)。


#### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

#### silent(boolean) = false

是否不响应鼠标以及触摸事件。

#### invisible(boolean) = false

节点是否可见。

#### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

#### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#series-custom.renderItem.return_text)。


#### textConfig(Object)

##### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

##### rotation(number)

`textContent` 的旋转弧度。

##### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

##### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

##### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

##### distance(number) = 5

距离 `layoutRect` 的距离。

##### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

##### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

##### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

##### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

##### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

##### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。




#### during(Function)

在动画的每一帧里，用户可以使用 `during` 回调来设定节点的各种属性。

```js
(duringAPI: CustomDuringAPI) => void

interface CustomDuringAPI {
    // 设置 transform 属性值。
    // transform 属性参见 `TransformProp`。
    setTransform(key: TransformProp, val: unknown): void;
    // 获得当前动画帧的 transform 属性值。
    getTransform(key: TransformProp): unknown;
    // 设置 shape 属性值。
    // shape 属性形如：`{ type: 'rect', shape: { xxxProp: xxxValue } }`。
    setShape(key: string, val: unknown): void;
    // 获得当前动画帧的 shape 属性值。
    getShape(key: string): unknown;
    // 设置 style 属性值。
    // style 属性形如：`{ type: 'rect', style: { xxxProp: xxxValue } }`。
    setStyle(key: string, val: unknown): void;
    // 获得当前动画帧的 style 属性值。
    getStyle(key: string): unknown;
    // 设置 extra 属性值。
    // extra 属性形如：`{ type: 'rect', extra: { xxxProp: xxxValue } }`。
    setExtra(key: string, val: unknown): void;
    // 获得当前动画帧的 extra 属性值。
    getExtra(key: string): unknown;
}

type TransformProp =
    'x' | 'y' | 'scaleX' | 'scaleY' | 'originX' | 'originY' | 'rotation';
```

在绝大多数场景下，用户不需要这个 `during` 回调。因为，假如属性被设定到 [transition](option.html#series-custom.renderItem.return_rect.transition) 中后，echarts 会自动对它进行插值，并且基于这些插值形成动画。但是，如果这些插值形成的动画不满足用户需求，那么用户可以使用 `during` 回调来定制他们。

例如，如果用户使用 [polygon](option.html#series-custom.renderItem.return_polygon) 画图形，图形的形状会由 [shape.points](option.html#series-custom.renderItem.return_polygon.shape.points) 来定义，形如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...]
    },
    // ...
}
```
如果用户指定了 [transition](option.html#series-custom.renderItem.return_polygon.transition) 如：
```js
{
    type: 'polygon',
    shape: {
        points: [[12, 33], [15, 36], [19, 39], ...],
    },
    transition: 'shape'
    // ...
}
```
尽管这些 `points` 会被 echarts 自动插值，但是这样形成的动画里，这些点会直线走向目标位置。假如用户需求是，这些点要按照某种特定的路径（如弧线、螺旋）来移动，则这就不满足了。所以在这种情况下，可以使用 `during` 回调如下：
```js
{
    type: 'polygon',
    shape: {
        points: calculatePoints(initialDegree),
        transition: 'points'
    },
    extra: {
        degree: nextDegree
    },
    // 让 echarts 对 `extra.degree` 进行插值，然后基于
    // `extra.degree` 来计算动画中每一帧时的 polygon 形状。
    transition: 'extra',
    during: function (duringAPI) {
        var currentDegree = duringAPI.getExtra('degree');
        duringAPI.setShape(calculatePoints(currentDegree));
    }
    // ...
}
```

也参见这个 [例子](custom-spiral-race&edit=1&reset=1)。





#### extra(Object)

用户可以在 `extra` 字段中定义自己的属性。`extra` 的往往会结合 [during](option.html#series-custom.renderItem.return_rect.during) 一起使用。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `extra` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `extra` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        extra: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `extra` 下所有属性开启过渡动画。
        transition: 'extra',
    };
}
```

















#### shape(Object)



##### x1(number) = 0

开始点的 x 值。

##### y1(number) = 0

开始点的 y 值。

##### x2(number) = 0

结束点的 x 值。

##### y2(number) = 0

结束点的 y 值。





##### cpx1(number) = 0

控制点 x 值。

##### cpy1(number) = 0

控制点 y 值。

##### cpx2(number) = null

第二个控制点 x 值。如果设置则开启三阶贝塞尔曲线。

##### cpy2(number) = null

第二个控制点 y 值。如果设置则开启三阶贝塞尔曲线。

##### percent(number) = 1

画到百分之多少就不画了。值的范围：[0, 1]。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `shape` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        shape: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `shape` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        shape: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `shape` 下所有属性开启过渡动画。
        transition: 'shape',
    };
}
```






#### style(Object)



注：关于图形元素中更多的样式设置（例如 [富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)），参见 [zrender/graphic/Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable) 中的 style 相关属性。

注意，这里图形元素的样式属性名称直接源于 zrender，和 `echarts label`、`echarts itemStyle` 等处同样含义的样式属性名称或有不同。例如，有如下对应：

+ [itemStyle.color](~series-scatter.label.color) => `style.fill`
+ [itemStyle.borderColor](~series-scatter.label.color) => `style.stroke`
+ [label.color](~series-scatter.label.color) => `style.textFill`
+ [label.textBorderColor](~series-scatter.label.textBorderColor) => `style.textStroke`
+ ...

##### fill(string) = '#000'

填充色。

##### stroke(string) = null

笔画颜色。

##### lineWidth(number) = 0

笔画宽度。

##### shadowBlur(number) = undefined

阴影宽度。

##### shadowOffsetX(number) = undefined

阴影 X 方向偏移。

##### shadowOffsetY(number) = undefined

阴影 Y 方向偏移。

##### shadowColor(number) = undefined

阴影颜色。




##### transition(string|Array) = undefined

可以是一个属性名，或者一组属性名。
被指定的属性，在其指发生变化时，会开启过渡动画。
只可以指定本 `style` 下的属性。

例如：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        style: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
            // 这两个属性会开启过渡动画。
            transition: ['mmm', 'ppp']
        }
    };
}
```
我们这样可以指定 `style` 下所有属性开启过渡动画：
```js
renderItem: function (params, api) {
    return {
        type: 'xxx',
        style: {
            mmm: ...,
            nnn: ...,
            ppp: ...,
            qqq: ...,
        },
        // `style` 下所有属性开启过渡动画。
        transition: 'style',
    };
}
```












#### focus(string) = 'none'



> 从 `v5.0.0` 开始支持



在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。支持如下配置：

+ `'none'` 不淡出其它图形，默认使用该配置。
+ `'self'` 只聚焦（不淡出）当前高亮的数据的图形。
+ `'series'` 聚焦当前高亮的数据所在的系列的所有图形。

#### blurScope(string) = 'coordinateSystem'



> 从 `v5.0.0` 开始支持



在开启`focus`的时候，可以通过`blurScope`配置淡出的范围。支持如下配置

+ `'coordinateSystem'` 淡出范围为坐标系，默认使用该配置。
+ `'series'` 淡出范围为系列。
+ `'global'` 淡出范围为全局。








#### emphasis(Object)

图形元素的高亮状态

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。

#### blur(Object)



> 从 `v5.0.0` 开始支持



图形元素的淡出状态，配置`focus`时有效。

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。

#### select(Object)



> 从 `v5.0.0` 开始支持



图形元素的选中状态，配置自定义系列的 [selectedMode](~series-custom.selectedMode) 时有效。

##### style(Object)

结构同 [style](~series-custom.renderItem.return_polygon.style)。


















## itemStyle(Object)



 图形样式。







### color(Color) = 自适应

<ExampleUIControlColor />

图形的颜色。 默认从全局调色盘 [option.color](~color) 获取颜色。



> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)



### borderColor(Color) = '#000'

<ExampleUIControlColor />

图形的描边颜色。支持的颜色格式同 `color`，不支持回调函数。

### borderWidth(number) = 0

<ExampleUIControlNumber value="0" min="0" step="0.5" />

(${name} ? ${name} : "") + "描边线宽。为 0 时无描边。"




### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


描边类型。



可选：
+ `'solid'`
+ `'dashed'`
+ `'dotted'`

自 `v5.0.0` 开始，也可以是 `number` 或者 `number` 数组，用以指定线条的 [dash array](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-dasharray)，配合 
`borderDashOffset`
 可实现更灵活的虚线效果。

例如：
```js
{

borderType: [5, 10],

borderDashOffset: 5
}
```


### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



### borderCap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




### borderJoin(string) = bevel




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="bevel" options="bevel,round,miter" />

用于设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）。

可以是：
+ `'bevel'`: 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
+ `'round'`: 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
+ `'miter'`: 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。这个设置可以通过 
`borderMiterLimit`
 属性看到效果。

默认值为 `'bevel'`。 更多详情可以参考 MDN [lineJoin](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineJoin)。




### borderMiterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`borderJoin`
 为 `miter` 时，
`borderMiterLimit`
 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。








### shadowBlur(number) = 

<ExampleUIControlNumber default="" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```



### shadowColor(Color) = 

<ExampleUIControlColor default="" />

阴影颜色。支持的格式同`color`。



### shadowOffsetX(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影水平方向上的偏移距离。



### shadowOffsetY(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影垂直方向上的偏移距离。









### opacity(number) = 1

<ExampleUIControlNumber default="1" min="0" max="1" step="0.01" />

图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。








### decal(Object) = 



图形的贴花图案，在 [aria.enabled](~aria.enabled) 与 [aria.decal.show](~aria.decal.show) 都是 `true` 的情况下才生效。

如果为 `'none'` 表示不使用贴花图案。









#### symbol(string|Array) = 'rect'

贴花的图案，如果是 `string[]` 表示循环使用数组中的图案。



ECharts 提供的标记类型包括



`'circle'`, `'rect'`, `'roundRect'`, `'triangle'`, `'diamond'`, `'pin'`, `'arrow'`, `'none'`







可以通过 `'image://url'` 设置为图片，其中 URL 为图片的链接，或者 `dataURI`。

URL 为图片链接例如：
```
'image://http://xxx.xxx.xxx/a/b.png'
```

URL 为 `dataURI` 例如：
```
'image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7'
```



可以通过 `'path://'` 将图标设置为任意的矢量路径。这种方式相比于使用图片的方式，不用担心因为缩放而产生锯齿或模糊，而且可以设置为任意颜色。路径图形会自适应调整为合适的大小。路径的格式参见 [SVG PathData](http://www.w3.org/TR/SVG/paths.html#PathData)。可以从 Adobe Illustrator 等工具编辑导出。

例如：
```
'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z'
```











#### symbolSize(number) = 1

取值范围：`0` 到 `1`，表示占图案区域的百分比。

#### symbolKeepAspect(boolean) = true

是否保持图案的长宽比。

#### color(string) = 'rgba(0, 0, 0, 0.2)'

贴花图案的颜色，建议使用半透明色，这样能叠加在系列本身的颜色上。

#### backgroundColor(string) = null

贴花的背景色，将会覆盖在系列本身颜色之上，贴花图案之下。

#### dashArrayX(number|Array) = 5

贴花图案的基本模式是在横向和纵向上分别以`图案 - 空白 - 图案 - 空白 - 图案 - 空白`的形式无限循环。通过设置每个图案和空白的长度，可以实现复杂的图案效果。

`dashArrayX` 控制了横向的图案模式。当其值为 `number` 或 `number[]` 类型时，与 [SVG stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray) 类似。

- 如果是 `number` 类型，表示图案和空白分别是这个值。如 `5` 表示先显示宽度为 5 的图案，然后空 5 像素，再然后显示宽度为 5 的图案……

- 如果是 `number[]` 类型，则表示图案和空白依次为数组值的循环。如：`[5, 10, 2, 6]` 表示图案宽 5 像素，然后空 10 像素，然后图案宽 2 像素，然后空 6 像素，然后图案宽 5 像素……

- 如果是 `(number | number[])[]` 类型，表示每行的图案和空白依次为数组值的循环。如：`[10, [2, 5]]` 表示第一行以图案 10 像素空 10 像素循环，第二行以图案 2 像素空 5 像素循环，第三行以图案 10 像素空 10 像素循环……

可以结合以下的例子理解本接口：

~[700x300](doc-example/aria-decal&edit=1&reset=1)

#### dashArrayY(number|Array) = 5

贴花图案的基本模式是在横向和纵向上分别以`图案 - 空白 - 图案 - 空白 - 图案 - 空白`的形式无限循环。通过设置每个图案和空白的长度，可以实现复杂的图案效果。

`dashArrayY` 控制了横向的图案模式。与 [SVG stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray) 类似。

- 如果是 `number` 类型，表示图案和空白分别是这个值。如 `5` 表示先显示高度为 5 的图案，然后空 5 像素，再然后显示高度为 5 的图案……

- 如果是 `number[]` 类型，则表示图案和空白依次为数组值的循环。如：`[5, 10, 2, 6]` 表示图案高 5 像素，然后空 10 像素，然后图案高 2 像素，然后空 6 像素，然后图案高 5 像素……

可以结合以下的例子理解本接口：

~[700x300](doc-example/aria-decal&edit=1&reset=1)

#### rotation(number) = 0

图案的整体旋转角度（弧度制），取值范围从 `-Math.PI` 到 `Math.PI`。

#### maxTileWidth(number) = 512

生成的图案在未重复之前的宽度上限。通常不需要设置该值，当你发现图案在重复的时候出现不连续的接缝时，可以尝试提高该值。

#### maxTileHeight(number) = 512

生成的图案在未重复之前的高度上限。通常不需要设置该值，当你发现图案在重复的时候出现不连续的接缝时，可以尝试提高该值。






## labelLine(Object)



标签的视觉引导线配置。







### show(boolean)

<ExampleUIControlBoolean />

是否显示视觉引导线。


### showAbove(boolean)

是否显示在图形上方。





### length2(number)

<ExampleUIControlNumber default="15" min="0" step="1" />

视觉引导项第二段的长度。



### smooth(boolean|number) = false

<ExampleUIControlBoolean />

是否平滑视觉引导线，默认不平滑，可以设置成 `true` 平滑显示，也可以设置为 0 到 1 的值，表示平滑程度。



### minTurnAngle(number) = null

通过调整第二段线的长度，限制引导线两端之间最小的夹角，以防止过小的夹角导致显示不美观。

可以设置为 0 - 180 度。


### lineStyle(Object)



#### color(Color) =  "#000" 

<ExampleUIControlColor />

线的颜色。





> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)

#### width(number) = 1

<ExampleUIControlNumber value="1" min="0" step="0.5" />

线宽。




#### type(string|number|Array) = 'solid'


<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


线的类型。


可选：
+ `'solid'`
+ `'dashed'`
+ `'dotted'`

自 `v5.0.0` 开始，也可以是 `number` 或者 `number` 数组，用以指定线条的 [dash array](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-dasharray)，配合 
`dashOffset`
 可实现更灵活的虚线效果。

例如：
```js
{

type: [5, 10],

dashOffset: 5
}
```


#### dashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`type`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



#### cap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




#### join(string) = bevel




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="bevel" options="bevel,round,miter" />

用于设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）。

可以是：
+ `'bevel'`: 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
+ `'round'`: 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
+ `'miter'`: 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。这个设置可以通过 
`miterLimit`
 属性看到效果。

默认值为 `'bevel'`。 更多详情可以参考 MDN [lineJoin](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineJoin)。




#### miterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`join`
 为 `miter` 时，
`miterLimit`
 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。








#### shadowBlur(number) = 

<ExampleUIControlNumber default="" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```



#### shadowColor(Color) = 

<ExampleUIControlColor default="" />

阴影颜色。支持的格式同`color`。



#### shadowOffsetX(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影水平方向上的偏移距离。



#### shadowOffsetY(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影垂直方向上的偏移距离。









#### opacity(number) = 1

<ExampleUIControlNumber default="1" min="0" max="1" step="0.01" />

图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。













## labelLayout(Object|Function)





> 从 `v5.0.0` 开始支持



标签的统一布局配置。

该配置项是在每个系列默认的标签布局基础上，统一调整标签的`(x, y)`位置，标签对齐等属性以实现想要的标签布局效果。

该配置项也可以是一个有如下参数的回调函数

```js
// 标签对应数据的 dataIndex
dataIndex: number
// 标签对应的数据类型，只在关系图中会有 node 和 edge 数据类型的区分
dataType?: string
// 标签对应的系列的 index
seriesIndex: number
// 标签显示的文本
text: string
// 默认的标签的包围盒，由系列默认的标签布局决定
labelRect: {x: number, y: number, width: number, height: number}
// 默认的标签水平对齐
align: 'left' | 'center' | 'right'
// 默认的标签垂直对齐
verticalAlign: 'top' | 'middle' | 'bottom'
// 标签所对应的数据图形的包围盒，可用于定位标签位置
rect: {x: number, y: number, width: number, height: number}
// 默认引导线的位置，目前只有饼图(pie)和漏斗图(funnel)有默认标签位置
// 如果没有该值则为 null
labelLinePoints?: number[][]
```

**示例：**

将标签显示在图形右侧 10px 的位置，并且垂直居中：

```js
labelLayout(params) {
    return {
        x: params.rect.x + 10,
        y: params.rect.y + params.rect.height / 2,
        verticalAlign: 'middle',
        align: 'left'
    }
}
```

根据图形的包围盒尺寸决定文本尺寸

```js

labelLayout(params) {
    return {
        fontSize: Math.max(params.rect.width / 10, 5)
    };
}
```

### hideOverlap(boolean)

是否隐藏重叠的标签。

下面示例演示了在关系图中开启该配置后，在缩放时可以实现自动的标签隐藏。

~[600x400](graph-label-overlap&edit=1&reset=1)

### moveOverlap(string)

在标签重叠的时候是否挪动标签位置以防止重叠。

目前支持配置为：

+ `'shiftX'` 水平方向依次位移，在水平方向对齐时使用
+ `'shiftY'` 垂直方向依次位移，在垂直方向对齐时使用

下面是标签右对齐并配置垂直方向依次位移以防止重叠的示例。

~[600x400](scatter-label-align-right&edit=1&reset=1)

### x(number|string)

标签的 x 位置。支持绝对的像素值或者`'20%'`这样的相对值。

### y(number|string)

标签的 y 位置。支持绝对的像素值或者`'20%'`这样的相对值。

### dx(number)

标签在 x 方向上的像素偏移。可以和`x`一起使用。

### dy(number)

标签在 y 方向上的像素偏移。可以和`y`一起使用

### rotate(number)

标签旋转角度。

### width(number)

标签显示的宽度。可以配合`overflow`使用控制标签显示在固定宽度内

### height(number)

标签显示的高度。可以配合`lineOverflow`使用控制标签显示在固定高度内

### align(string)

标签水平对齐方式。可以设置`'left'`, `'center'`, `'right'`。

### verticalAlign(string)

标签垂直对齐方式。可以设置`'top'`, `'middle'`, `'bottom'`。

### fontSize(number)

The text size of the label.

### draggable(boolean)

标签是否可以允许用户通过拖拽二次调整位置。

### labelLinePoints(Array)

标签引导线三个点的位置。格式为：

```js
[[x, y], [x, y], [x, y]]
```

在饼图中常用来微调已经计算好的引导线，其它情况一般不建议设置。





## selectedMode(boolean|string) = false




> 从 `v5.0.0` 开始支持




<ExampleUIControlEnum options="false,true,single,multiple" />

选中模式的配置，表示是否支持多个选中，默认关闭，支持布尔值和字符串，字符串取值可选`'single'`，`'multiple'`，分别表示单选还是多选。





## dimensions(Array)

使用 dimensions 定义 `series.data` 或者 `dataset.source` 的每个维度的信息。

注意：如果使用了 [dataset](~dataset)，那么可以在 [dataset.dimensions](~dataset.dimensions) 中定义 dimension ，或者在 [dataset.source](~dataset.source) 的第一行/列中给出 dimension 名称。于是就不用在这里指定 dimension。但如果在这里指定了 `dimensions`，那么优先使用这里的。

例如：

```js
option = {
    dataset: {
        source: [
            // 有了上面 dimensions 定义后，下面这五个维度的名称分别为：
            // 'date', 'open', 'close', 'highest', 'lowest'
            [12, 44, 55, 66, 2],
            [23, 6, 16, 23, 1],
            ...
        ]
    },
    series: {
        type: 'xxx',
        // 定义了每个维度的名称。这个名称会被显示到默认的 tooltip 中。
        dimensions: ['date', 'open', 'close', 'highest', 'lowest']
    }
}
```

```js
series: {
    type: 'xxx',
    dimensions: [
        null,                // 如果此维度不想给出定义，则使用 null 即可
        {type: 'ordinal'},   // 只定义此维度的类型。
                             // 'ordinal' 表示离散型，一般文本使用这种类型。
                             // 如果类型没有被定义，会自动猜测类型。
        {name: 'good', type: 'number'},
        'bad'                // 等同于 {name: 'bad'}
    ]
}
```

`dimensions` 数组中的每一项可以是：
+ `string`，如 `'someName'`，等同于 `{name: 'someName'}`
+ `Object`，属性可以有：
    + name: `string`。
    + type: `string`，支持
        + `number`，默认，表示普通数据。
        + `ordinal`，对于类目、文本这些 string 类型的数据，如果需要能在数轴上使用，须是 'ordinal' 类型。ECharts 默认会自动判断这个类型。但是自动判断也是不可能很完备的，所以使用者也可以手动强制指定。
        + `float`，即 [Float64Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float64Array)。
        + `int`，即 [Int32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array)。
        + `time`，表示时间类型。设置成 'time' 则能支持自动解析数据成时间戳（timestamp），比如该维度的数据是 '2017-05-10'，会自动被解析。时间类型的支持参见 [data](~series.data)。
    + displayName: 一般用于 tooltip 中维度名的展示。`string` 如果没有指定，默认使用 name 来展示。

值得一提的是，当定义了 `dimensions` 后，默认 `tooltip` 中对个维度的显示，会变为『竖排』，从而方便显示每个维度的名称。如果没有定义 `dimensions`，则默认 `tooltip` 会横排显示，且只显示数值没有维度名称可显示。





## encode(Object)

可以定义 `data` 的哪个维度被编码成什么。比如：

```js
option = {
    dataset: {
        source: [
            // 每一列称为一个『维度』。
            // 这里分别是维度 0、1、2、3、4。
            [12, 44, 55, 66, 2],
            [23, 6, 16, 23, 1],
            ...
        ]
    },
    series: {
        type: 'xxx',
        encode: {
            x: [3, 1, 5],      // 表示维度 3、1、5 映射到 x 轴。
            y: 2,              // 表示维度 2 映射到 y 轴。
            tooltip: [3, 2, 4] // 表示维度 3、2、4 会在 tooltip 中显示。
        }
    }
}
```

当使用 [dimensions](~series.dimensions) 给维度定义名称后，`encode` 中可直接引用名称，例如：

```js
series: {
    type: 'xxx',
    dimensions: ['date', 'open', 'close', 'highest', 'lowest'],
    encode: {
        x: 'date',
        y: ['open', 'close', 'highest', 'lowest']
    }
}
```

`encode` 声明的基本结构如下，其中冒号左边是坐标系、标签等特定名称，如 `'x'`, `'y'`, `'tooltip'` 等，冒号右边是数据中的维度名（string 格式）或者维度的序号（number 格式，从 0 开始计数），可以指定一个或多个维度（使用数组）。通常情况下，下面各种信息不需要所有的都写，按需写即可。

下面是 encode 支持的属性：

```js
// 在任何坐标系和系列中，都支持：
encode: {
    // 使用 “名为 product 的维度” 和 “名为 score 的维度” 的值在 tooltip 中显示
    tooltip: ['product', 'score']
    // 使用第一个维度和第三个维度的维度名连起来作为系列名。（有时候名字比较长，这可以避免在 series.name 重复输入这些名字）
    seriesName: [1, 3],
    // 表示使用第二个维度中的值作为 id。这在使用 setOption 动态更新数据时有用处，可以使新老数据用 id 对应起来，从而能够产生合适的数据更新动画。
    itemId: 2,
    // 指定数据项的名称使用第三个维度在饼图等图表中有用，可以使这个名字显示在图例（legend）中。
    itemName: 3,
    // 指定数据项的组 ID (groupID)，组 ID 会被用于分类数据，并在全局过渡动画中决定如何进行合并和分裂动画，具体见 universalTransition
    itemGroupId: 4
}

// 直角坐标系（grid/cartesian）特有的属性：
encode: {
    // 把 “维度1”、“维度5”、“名为 score 的维度” 映射到 X 轴：
    x: [1, 5, 'score'],
    // 把“维度0”映射到 Y 轴。
    y: 0
}

// 单轴（singleAxis）特有的属性：
encode: {
    single: 3
}

// 极坐标系（polar）特有的属性：
encode: {
    radius: 3,
    angle: 2
}

// 地理坐标系（geo）特有的属性：
encode: {
    lng: 3,
    lat: 2
}

// 对于一些没有坐标系的图表，例如饼图、漏斗图等，可以是：
encode: {
    value: 3
}
```

这是个更丰富的 `encode` 的[示例](dataset-encode1&edit=1&reset=1)：



特殊地，在 [自定义系列（custom series）](~series-custom) 中，`encode` 中轴可以不指定或设置为 `null/undefined`，从而使系列免于受这个轴控制，也就是说，轴的范围（extent）不会受此系列数值的影响，轴被 [dataZoom](~dataZoom) 控制时也不会过滤掉这个系列：

```js
var option = {
    xAxis: {},
    yAxis: {},
    dataZoom: [{
        xAxisIndex: 0
    }, {
        yAxisIndex: 0
    }],
    series: {
        type: 'custom',
        renderItem: function (params, api) {
            return {
                type: 'circle',
                shape: {
                    cx: 100, // x 位置永远为 100
                    cy: api.coord([0, api.value(0)])[1],
                    r: 30
                },
                style: {
                    fill: 'blue'
                }
            };
        },
        encode: {
            // 这样这个系列就不会被 x 轴以及 x
            // 轴上的 dataZoom 控制了。
            x: -1,
            y: 1
        },
        data: [ ... ]
    }
};
```







## seriesLayoutBy(string) = 'column'

当使用 [dataset](~dataset) 时，`seriesLayoutBy` 指定了 `dataset` 中用行还是列对应到系列上，也就是说，系列“排布”到 `dataset` 的行还是列上。可取值：

+ 'column'：默认，`dataset` 的列对应于系列，从而 `dataset` 中每一列是一个维度（dimension）。
+ 'row'：`dataset` 的行对应于系列，从而 `dataset` 中每一行是一个维度（dimension）。

参见这个 [示例](dataset-series-layout-by&theme=lite)







## datasetIndex(number) = 0

如果 [series.data](~series.data) 没有指定，并且 [dataset](~dataset) 存在，那么就会使用 [dataset](~dataset)。`datasetIndex` 指定本系列使用那个 [dataset](~dataset)。







## dataGroupId(string)

该系列所有数据共有的组 ID。组 ID 会被用于分类数据，并在全局过渡动画中决定如何进行合并和分裂动画。

如果你使用了[dataset](~dataset)组件来表达数据，推荐使用`encode.itemGroupID`来指定哪个维度被编码为组 ID。





## data(Array)



系列中的数据内容数组。数组项通常为具体的数据项。

注意，如果系列没有指定 `data`，并且 option 有 [dataset](~dataset)，那么默认使用第一个 [dataset](~dataset)。如果指定了 `data`，则不会再使用 [dataset](~dataset)。

可以使用 `series.datasetIndex` 指定其他的 [dataset](~dataset)。

通常来说，数据用一个二维数组表示。如下，每一列被称为一个『维度』。
```js
series: [{
    data: [
        // 维度X   维度Y   其他维度 ...
        [  3.4,    4.5,   15,   43],
        [  4.2,    2.3,   20,   91],
        [  10.8,   9.5,   30,   18],
        [  7.2,    8.8,   18,   57]
    ]
}]
```

+ 在 [直角坐标系 (grid)](~grid) 中『维度X』和『维度Y』会默认对应于 [xAxis](~xAxis) 和 [yAxis](~yAxis)。
+ 在 [极坐标系 (polar)](~polar) 中『维度X』和『维度Y』会默认对应于 [radiusAxis](~radiusAxis) 和 [angleAxis](~anbleAxis)。
+ 后面的其他维度是可选的，可以在别处被使用，例如：
    + 在 [visualMap](~visualMap) 中可以将一个或多个维度映射到颜色，大小等多个图形属性上。
    + 在 [series.symbolSize](~series.symbolSize) 中可以使用回调函数，基于某个维度得到 symbolSize 值。
    + 使用 [tooltip.formatter](~tooltip.formatter) 或 [series.label.formatter](~series.label.formatter) 可以把其他维度的值展示出来。

特别地，当只有一个轴为类目轴（axis.type 为 `'category'`）的时候，数据可以简化用一个一维数组表示。例如：
```js
xAxis: {
    data: ['a', 'b', 'm', 'n']
},
series: [{
    // 与 xAxis.data 一一对应。
    data: [23,  44,  55,  19]
    // 它其实是下面这种形式的简化：
    // data: [[0, 23], [1, 44], [2, 55], [3, 19]]
}]
```

**『值』与 [轴类型](~xAxis.type) 的关系：**

+ 当某维度对应于数值轴（axis.type 为 `'value'` 或者 `'log'`）的时候：

    其值可以为 `number`（例如 `12`）。（也可以兼容 `string` 形式的 number，例如 `'12'`）

+ 当某维度对应于类目轴（axis.type 为 `'category'`）的时候：

    其值须为类目的『序数』（从 `0` 开始）或者类目的『字符串值』。例如：
    ```js
    xAxis: {
        type: 'category',
        data: ['星期一', '星期二', '星期三', '星期四']
    },
    yAxis: {
        type: 'category',
        data: ['a', 'b', 'm', 'n', 'p', 'q']
    },
    series: [{
        data: [
            // xAxis    yAxis
            [  0,        0,    2  ], // 意思是此点位于 xAxis: '星期一', yAxis: 'a'。
            [  '星期四',  2,    1  ], // 意思是此点位于 xAxis: '星期四', yAxis: 'm'。
            [  2,       'p',   2  ], // 意思是此点位于 xAxis: '星期三', yAxis: 'p'。
            [  3,        3,    5  ]
        ]
    }]
    ```
    双类目轴的示例可以参考 [Github Punchcard](scatter-punchCard) 示例。

+ 当某维度对应于时间轴（type 为 `'time'`）的时候，值可以为：
    + 一个时间戳，如 `1484141700832`，表示 UTC 时间。
    + 或者字符串形式的时间描述：
        + [ISO 8601](http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) 的子集，只包含这些形式（这几种格式，除非指明时区，否则均表示本地时间，与 [moment](https://momentjs.com/) 一致）：
            + 部分年月日时间: `'2012-03'`, `'2012-03-01'`, `'2012-03-01 05'`, `'2012-03-01 05:06'`.
            + 使用 `'T'` 或空格分割: `'2012-03-01T12:22:33.123'`, `'2012-03-01 12:22:33.123'`.
            + 时区设定: `'2012-03-01T12:22:33Z'`, `'2012-03-01T12:22:33+8000'`, `'2012-03-01T12:22:33-05:00'`.
        + 其他的时间字符串，包括（均表示本地时间）:
          `'2012'`, `'2012-3-1'`, `'2012/3/1'`, `'2012/03/01'`,
          `'2009/6/12 2:00'`, `'2009/6/12 2:05:08'`, `'2009/6/12 2:05:08.123'`
    + 或者用户自行初始化的 Date 实例：
        + 注意，用户自行初始化 Date 实例的时候，[浏览器的行为有差异，不同字符串的表示也不同](http://dygraphs.com/date-formats.html)。
        + 例如：在 chrome 中，`new Date('2012-01-01')` 表示 UTC 时间的 2012 年 1 月 1 日，而 `new Date('2012-1-1')` 和 `new Date('2012/01/01')` 表示本地时间的 2012 年 1 月 1 日。在 safari 中，不支持 `new Date('2012-1-1')` 这种表示方法。
        + 所以，使用 `new Date(dataString)` 时，可使用第三方库解析（如 [moment](https://momentjs.com/)），或者使用 `echarts.number.parseDate`，或者参见 [这里](http://dygraphs.com/date-formats.html)。

**当需要对个别数据进行个性化定义时：**

数组项可用对象，其中的 `value` 像表示具体的数值，如：
```js
[
    12,
    34,
    {
        value : 56,
        //自定义标签样式，仅对该数据项有效
        label: {},
        //自定义特殊 itemStyle，仅对该数据项有效
        itemStyle:{}
    },
    10
]
// 或
[
    [12, 33],
    [34, 313],
    {
        value: [56, 44],
        label: {},
        itemStyle:{}
    },
    [10, 33]
]
```

**空值：**

当某数据不存在时（ps：*不存在*不代表值为 0），可以用 `'-'` 或者 `null` 或者 `undefined` 或者 `NaN` 表示。

例如，无数据在折线图中可表现为该点是断开的，在其它图中可表示为图形不存在。



### name(string)

数据项名称。

### value(number)

单个数据项的数值。



### groupId(string)

该数据项的组 ID。组 ID 会被用于分类数据，并在全局过渡动画中决定如何进行合并和分裂动画。



### itemStyle(Object)



#### color(Color) = 自适应

<ExampleUIControlColor />

图形的颜色。



> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)



#### borderColor(Color) = '#000'

<ExampleUIControlColor />

图形的描边颜色。支持的颜色格式同 `color`，不支持回调函数。

#### borderWidth(number) = 0

<ExampleUIControlNumber value="0" min="0" step="0.5" />

(${name} ? ${name} : "") + "描边线宽。为 0 时无描边。"




#### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


描边类型。



可选：
+ `'solid'`
+ `'dashed'`
+ `'dotted'`

自 `v5.0.0` 开始，也可以是 `number` 或者 `number` 数组，用以指定线条的 [dash array](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-dasharray)，配合 
`borderDashOffset`
 可实现更灵活的虚线效果。

例如：
```js
{

borderType: [5, 10],

borderDashOffset: 5
}
```


#### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



#### borderCap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




#### borderJoin(string) = bevel




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="bevel" options="bevel,round,miter" />

用于设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）。

可以是：
+ `'bevel'`: 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
+ `'round'`: 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
+ `'miter'`: 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。这个设置可以通过 
`borderMiterLimit`
 属性看到效果。

默认值为 `'bevel'`。 更多详情可以参考 MDN [lineJoin](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineJoin)。




#### borderMiterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`borderJoin`
 为 `miter` 时，
`borderMiterLimit`
 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。








#### shadowBlur(number) = 

<ExampleUIControlNumber default="" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```



#### shadowColor(Color) = 

<ExampleUIControlColor default="" />

阴影颜色。支持的格式同`color`。



#### shadowOffsetX(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影水平方向上的偏移距离。



#### shadowOffsetY(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影垂直方向上的偏移距离。









#### opacity(number) = 1

<ExampleUIControlNumber default="1" min="0" max="1" step="0.01" />

图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。








#### decal(Object) = 



图形的贴花图案，在 [aria.enabled](~aria.enabled) 与 [aria.decal.show](~aria.decal.show) 都是 `true` 的情况下才生效。

如果为 `'none'` 表示不使用贴花图案。









##### symbol(string|Array) = 'rect'

贴花的图案，如果是 `string[]` 表示循环使用数组中的图案。



ECharts 提供的标记类型包括



`'circle'`, `'rect'`, `'roundRect'`, `'triangle'`, `'diamond'`, `'pin'`, `'arrow'`, `'none'`







可以通过 `'image://url'` 设置为图片，其中 URL 为图片的链接，或者 `dataURI`。

URL 为图片链接例如：
```
'image://http://xxx.xxx.xxx/a/b.png'
```

URL 为 `dataURI` 例如：
```
'image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7'
```



可以通过 `'path://'` 将图标设置为任意的矢量路径。这种方式相比于使用图片的方式，不用担心因为缩放而产生锯齿或模糊，而且可以设置为任意颜色。路径图形会自适应调整为合适的大小。路径的格式参见 [SVG PathData](http://www.w3.org/TR/SVG/paths.html#PathData)。可以从 Adobe Illustrator 等工具编辑导出。

例如：
```
'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z'
```











##### symbolSize(number) = 1

取值范围：`0` 到 `1`，表示占图案区域的百分比。

##### symbolKeepAspect(boolean) = true

是否保持图案的长宽比。

##### color(string) = 'rgba(0, 0, 0, 0.2)'

贴花图案的颜色，建议使用半透明色，这样能叠加在系列本身的颜色上。

##### backgroundColor(string) = null

贴花的背景色，将会覆盖在系列本身颜色之上，贴花图案之下。

##### dashArrayX(number|Array) = 5

贴花图案的基本模式是在横向和纵向上分别以`图案 - 空白 - 图案 - 空白 - 图案 - 空白`的形式无限循环。通过设置每个图案和空白的长度，可以实现复杂的图案效果。

`dashArrayX` 控制了横向的图案模式。当其值为 `number` 或 `number[]` 类型时，与 [SVG stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray) 类似。

- 如果是 `number` 类型，表示图案和空白分别是这个值。如 `5` 表示先显示宽度为 5 的图案，然后空 5 像素，再然后显示宽度为 5 的图案……

- 如果是 `number[]` 类型，则表示图案和空白依次为数组值的循环。如：`[5, 10, 2, 6]` 表示图案宽 5 像素，然后空 10 像素，然后图案宽 2 像素，然后空 6 像素，然后图案宽 5 像素……

- 如果是 `(number | number[])[]` 类型，表示每行的图案和空白依次为数组值的循环。如：`[10, [2, 5]]` 表示第一行以图案 10 像素空 10 像素循环，第二行以图案 2 像素空 5 像素循环，第三行以图案 10 像素空 10 像素循环……

可以结合以下的例子理解本接口：

~[700x300](doc-example/aria-decal&edit=1&reset=1)

##### dashArrayY(number|Array) = 5

贴花图案的基本模式是在横向和纵向上分别以`图案 - 空白 - 图案 - 空白 - 图案 - 空白`的形式无限循环。通过设置每个图案和空白的长度，可以实现复杂的图案效果。

`dashArrayY` 控制了横向的图案模式。与 [SVG stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray) 类似。

- 如果是 `number` 类型，表示图案和空白分别是这个值。如 `5` 表示先显示高度为 5 的图案，然后空 5 像素，再然后显示高度为 5 的图案……

- 如果是 `number[]` 类型，则表示图案和空白依次为数组值的循环。如：`[5, 10, 2, 6]` 表示图案高 5 像素，然后空 10 像素，然后图案高 2 像素，然后空 6 像素，然后图案高 5 像素……

可以结合以下的例子理解本接口：

~[700x300](doc-example/aria-decal&edit=1&reset=1)

##### rotation(number) = 0

图案的整体旋转角度（弧度制），取值范围从 `-Math.PI` 到 `Math.PI`。

##### maxTileWidth(number) = 512

生成的图案在未重复之前的宽度上限。通常不需要设置该值，当你发现图案在重复的时候出现不连续的接缝时，可以尝试提高该值。

##### maxTileHeight(number) = 512

生成的图案在未重复之前的高度上限。通常不需要设置该值，当你发现图案在重复的时候出现不连续的接缝时，可以尝试提高该值。






### emphasis(Object)

#### itemStyle(Object)



##### color(Color) = 自适应

<ExampleUIControlColor />

图形的颜色。



> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)



##### borderColor(Color) = '#000'

<ExampleUIControlColor />

图形的描边颜色。支持的颜色格式同 `color`，不支持回调函数。

##### borderWidth(number) = 0

<ExampleUIControlNumber value="0" min="0" step="0.5" />

(${name} ? ${name} : "") + "描边线宽。为 0 时无描边。"




##### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


描边类型。



可选：
+ `'solid'`
+ `'dashed'`
+ `'dotted'`

自 `v5.0.0` 开始，也可以是 `number` 或者 `number` 数组，用以指定线条的 [dash array](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-dasharray)，配合 
`borderDashOffset`
 可实现更灵活的虚线效果。

例如：
```js
{

borderType: [5, 10],

borderDashOffset: 5
}
```


##### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



##### borderCap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




##### borderJoin(string) = bevel




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="bevel" options="bevel,round,miter" />

用于设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）。

可以是：
+ `'bevel'`: 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
+ `'round'`: 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
+ `'miter'`: 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。这个设置可以通过 
`borderMiterLimit`
 属性看到效果。

默认值为 `'bevel'`。 更多详情可以参考 MDN [lineJoin](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineJoin)。




##### borderMiterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`borderJoin`
 为 `miter` 时，
`borderMiterLimit`
 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。








##### shadowBlur(number) = 

<ExampleUIControlNumber default="" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```



##### shadowColor(Color) = 

<ExampleUIControlColor default="" />

阴影颜色。支持的格式同`color`。



##### shadowOffsetX(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影水平方向上的偏移距离。



##### shadowOffsetY(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影垂直方向上的偏移距离。









##### opacity(number) = 1

<ExampleUIControlNumber default="1" min="0" max="1" step="0.01" />

图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。













### tooltip(*)

本系列每个数据项中特定的 tooltip 设定。



#### position(string|Array|Function)




> **注意：**`series.data.tooltip` 仅在 [tooltip.trigger](~tooltip.trigger) 为 `'item'` 时有效。<br>






提示框浮层的位置，默认不设置时位置会跟随鼠标的位置。

可选：

+ `Array`

    通过数组表示提示框浮层的位置，支持数字设置绝对位置，百分比设置相对位置。

    示例:

    ```js
    // 绝对位置，相对于容器左侧 10px, 上侧 10 px
    position: [10, 10]
    // 相对位置，放置在容器正中间
    position: ['50%', '50%']
    ```

+ `Function`

    回调函数，格式如下：
    ```js
    (point: Array, params: Object|Array.<Object>, dom: HTMLDomElement, rect: Object, size: Object) => Array
    ```

    **参数：**<br>
    point: 鼠标位置，如 [20, 40]。<br>
    params: 同 formatter 的参数相同。<br>
    dom: tooltip 的 dom 对象。<br>
    rect: 只有鼠标在图形上时有效，是一个用`x`, `y`, `width`, `height`四个属性表达的图形包围盒。<br>
    size: 包括 dom 的尺寸和 echarts 容器的当前尺寸，例如：`{contentSize: [width, height], viewSize: [width, height]}`。<br>

    **返回值：**<br>
    可以是一个表示 tooltip 位置的数组，数组值可以是绝对的像素值，也可以是相  百分比。<br>
    也可以是一个对象，如：`{left: 10, top: 30}`，或者 `{right: '20%', bottom: 40}`。<br>

    如下示例：
    ```js
    position: function (point, params, dom, rect, size) {
        // 固定在顶部
        return [point[0], '10%'];
    }
    ```
    或者：
    ```js
    position: function (pos, params, dom, rect, size) {
        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
        var obj = {top: 60};
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
        return obj;
    }
    ```


+ `'inside'`

    鼠标所在图形的内部中心位置，只在 [trigger](~tooltip.trigger) 为`'item'`的时候有效。

+ `'top'`

    鼠标所在图形上侧，只在 [trigger](~tooltip.trigger) 为`'item'`的时候有效。

+ `'left'`

    鼠标所在图形左侧，只在 [trigger](~tooltip.trigger) 为`'item'`的时候有效。

+ `'right'`

    鼠标所在图形右侧，只在 [trigger](~tooltip.trigger) 为`'item'`的时候有效。

+ `'bottom'`

    鼠标所在图形底侧，只在 [trigger](~tooltip.trigger) 为`'item'`的时候有效。

#### formatter(string|Function)




> **注意：**`series.data.tooltip` 仅在 [tooltip.trigger](~tooltip.trigger) 为 `'item'` 时有效。<br>






提示框浮层内容格式器，支持字符串模板和回调函数两种形式。

**1. 字符串模板**

模板变量有 `{a}`, `{b}`，`{c}`，`{d}`，`{e}`，分别表示系列名，数据名，数据值等。
在 [trigger](~tooltip.trigger) 为 `'axis'` 的时候，会有多个系列的数据，此时可以通过 `{a0}`, `{a1}`, `{a2}` 这种后面加索引的方式表示系列的索引。
不同图表类型下的 `{a}`，`{b}`，`{c}`，`{d}` 含义不一样。
其中变量`{a}`, `{b}`, `{c}`, `{d}`在不同图表类型下代表数据含义为：

+ 折线（区域）图、柱状（条形）图、K线图 : `{a}`（系列名称），`{b}`（类目值），`{c}`（数值）, `{d}`（无）

+ 散点图（气泡）图 : `{a}`（系列名称），`{b}`（数据名称），`{c}`（数值数组）, `{d}`（无）

+ 地图 : `{a}`（系列名称），`{b}`（区域名称），`{c}`（合并数值）, `{d}`（无）

+ 饼图、仪表盘、漏斗图: `{a}`（系列名称），`{b}`（数据项名称），`{c}`（数值）, `{d}`（百分比）

更多其它图表模板变量的含义可以见相应的图表的 label.formatter 配置项。

**示例：**
```js
formatter: '{b0}: {c0}<br />{b1}: {c1}'
```


**2. 回调函数**

回调函数格式：

```js
(params: Object|Array, ticket: string, callback: (ticket: string, html: string)) => string | HTMLElement | HTMLElement[]
```

支持返回 HTML 字符串或者创建的 DOM 实例。

第一个参数 `params` 是 formatter 需要的数据集。格式如下：



```js
{
    componentType: 'series',
    // 系列类型
    seriesType: string,
    // 系列在传入的 option.series 中的 index
    seriesIndex: number,
    // 系列名称
    seriesName: string,
    // 数据名，类目名
    name: string,
    // 数据在传入的 data 数组中的 index
    dataIndex: number,
    // 传入的原始数据项
    data: Object,
    // 传入的数据值。在多数系列下它和 data 相同。在一些系列下是 data 中的分量（如 map、radar 中）
    value: number|Array|Object,
    // 坐标轴 encode 映射信息，
    // key 为坐标轴（如 'x' 'y' 'radius' 'angle' 等）
    // value 必然为数组，不会为 null/undefied，表示 dimension index 。
    // 其内容如：
    // {
    //     x: [2] // dimension index 为 2 的数据映射到 x 轴
    //     y: [0] // dimension index 为 0 的数据映射到 y 轴
    // }
    encode: Object,
    // 维度名列表
    dimensionNames: Array<String>,
    // 数据的维度 index，如 0 或 1 或 2 ...
    // 仅在雷达图中使用。
    dimensionIndex: number,
    // 数据图形的颜色
    color: string,

{{ for:  as ,  }}{{ /for }}

}
```

注：encode 和 dimensionNames 的使用方式，例如：

如果数据为：
```js
dataset: {
    source: [
        ['Matcha Latte', 43.3, 85.8, 93.7],
        ['Milk Tea', 83.1, 73.4, 55.1],
        ['Cheese Cocoa', 86.4, 65.2, 82.5],
        ['Walnut Brownie', 72.4, 53.9, 39.1]
    ]
}
```
则可这样得到 y 轴对应的 value：
```js
params.value[params.encode.y[0]]
```

如果数据为：
```js
dataset: {
    dimensions: ['product', '2015', '2016', '2017'],
    source: [
        {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
        {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
        {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
        {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
    ]
}
```
则可这样得到 y 轴对应的 value：
```js
params.value[params.dimensionNames[params.encode.y[0]]]
```



在 [trigger](~tooltip.trigger) 为 `'axis'` 的时候，或者 tooltip 被 [axisPointer](~xAxis.axisPointer) 触发的时候，`params` 是多个系列的数据数组。其中每项内容格式同上，并且，



```js
{
    componentType: 'series',
    // 系列类型
    seriesType: string,
    // 系列在传入的 option.series 中的 index
    seriesIndex: number,
    // 系列名称
    seriesName: string,
    // 数据名，类目名
    name: string,
    // 数据在传入的 data 数组中的 index
    dataIndex: number,
    // 传入的原始数据项
    data: Object,
    // 传入的数据值。在多数系列下它和 data 相同。在一些系列下是 data 中的分量（如 map、radar 中）
    value: number|Array|Object,
    // 坐标轴 encode 映射信息，
    // key 为坐标轴（如 'x' 'y' 'radius' 'angle' 等）
    // value 必然为数组，不会为 null/undefied，表示 dimension index 。
    // 其内容如：
    // {
    //     x: [2] // dimension index 为 2 的数据映射到 x 轴
    //     y: [0] // dimension index 为 0 的数据映射到 y 轴
    // }
    encode: Object,
    // 维度名列表
    dimensionNames: Array<String>,
    // 数据的维度 index，如 0 或 1 或 2 ...
    // 仅在雷达图中使用。
    dimensionIndex: number,
    // 数据图形的颜色
    color: string,

{{ for:  as ,  }}{{ /for }}

}
```

注：encode 和 dimensionNames 的使用方式，例如：

如果数据为：
```js
dataset: {
    source: [
        ['Matcha Latte', 43.3, 85.8, 93.7],
        ['Milk Tea', 83.1, 73.4, 55.1],
        ['Cheese Cocoa', 86.4, 65.2, 82.5],
        ['Walnut Brownie', 72.4, 53.9, 39.1]
    ]
}
```
则可这样得到 y 轴对应的 value：
```js
params.value[params.encode.y[0]]
```

如果数据为：
```js
dataset: {
    dimensions: ['product', '2015', '2016', '2017'],
    source: [
        {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
        {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
        {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
        {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
    ]
}
```
则可这样得到 y 轴对应的 value：
```js
params.value[params.dimensionNames[params.encode.y[0]]]
```



**注：** ECharts 2.x 使用数组表示各参数的方式不再支持。

第二个参数 `ticket` 是异步回调标识，配合第三个参数 `callback` 使用。
第三个参数 `callback` 是异步回调，在提示框浮层内容是异步获取的时候，可以通过 callback 传入上述的 `ticket` 和 `html` 更新提示框浮层内容。

示例：
```js
formatter: function (params, ticket, callback) {
    $.get('detail?name=' + params.name, function (content) {
        callback(ticket, toHTML(content));
    });
    return 'Loading';
}
```

#### backgroundColor(Color) = 'rgba(50,50,50,0.7)'




> **注意：**`series.data.tooltip` 仅在 [tooltip.trigger](~tooltip.trigger) 为 `'item'` 时有效。<br>






提示框浮层的背景颜色。

#### borderColor(Color) = '#333'

<ExampleUIControlColor default="#333" />




> **注意：**`series.data.tooltip` 仅在 [tooltip.trigger](~tooltip.trigger) 为 `'item'` 时有效。<br>






提示框浮层的边框颜色。

#### borderWidth(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />




> **注意：**`series.data.tooltip` 仅在 [tooltip.trigger](~tooltip.trigger) 为 `'item'` 时有效。<br>






提示框浮层的边框宽。

#### padding(number) = 5

<ExampleUIControlVector dims="T,R,B,L" default="5,5,5,5" />




> **注意：**`series.data.tooltip` 仅在 [tooltip.trigger](~tooltip.trigger) 为 `'item'` 时有效。<br>








<ExampleUIControlVector min="0" dims="T,R,B,L"  />

提示框浮层内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。

使用示例：
```js
// 设置内边距为 5
padding: 5
// 设置上下的内边距为 5，左右的内边距为 10
padding: [5, 10]
// 分别设置四个方向的内边距
padding: [
    5,  // 上
    10, // 右
    5,  // 下
    10, // 左
]
```



#### textStyle(Object)




> **注意：**`series.data.tooltip` 仅在 [tooltip.trigger](~tooltip.trigger) 为 `'item'` 时有效。<br>






提示框浮层的文本样式。







##### color(Color) = '#fff'

<ExampleUIControlColor default="'#fff'" />

文字的颜色。



##### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

##### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

##### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

##### fontSize(number) = 14

<ExampleUIControlNumber default="14" min="1" step="1" />

文字的字体大小。





##### lineHeight(number) = 

<ExampleUIControlNumber min="0" step="1" default="12" />

行高。



`rich` 中如果没有设置 `lineHeight`，则会取父层级的 `lineHeight`。例如：

```js
{
    lineHeight: 56,
    rich: {
        a: {
            // 没有设置 `lineHeight`，则 `lineHeight` 为 56
        }
    }
}
```





##### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

##### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

##### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。



##### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




##### textBorderType(string|number|Array) = 'solid'


<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字本身的描边类型。


可选：
+ `'solid'`
+ `'dashed'`
+ `'dotted'`

自 `v5.0.0` 开始，也可以是 `number` 或者 `number` 数组，用以指定线条的 [dash array](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-dasharray)，配合 
`textBorderDashOffset`
 可实现更灵活的虚线效果。

例如：
```js
{

textBorderType: [5, 10],

textBorderDashOffset: 5
}
```


##### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









##### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

##### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

##### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

##### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。





##### width(number)

<ExampleUIControlNumber default="100" min="1" max="500" step="1" />

文本显示宽度。

##### height(number)

<ExampleUIControlNumber default="50" min="1" max="500" step="1" />

文本显示高度。

##### overflow(string) = 'none'

<ExampleUIControlEnum options="truncate,break,breakAll" />

文字超出宽度是否截断或者换行。配置`width`时有效

+ `'truncate'` 截断，并在末尾显示`ellipsis`配置的文本，默认为`...`
+ `'break'` 换行
+ `'breakAll'` 换行，跟`'break'`不同的是，在英语等拉丁文中，`'breakAll'`还会强制单词内换行

##### ellipsis(string) = '...'

在`overflow`配置为`'truncate'`的时候，可以通过该属性配置末尾显示的文本。

##### lineOverflow(string) = 'none'

文本超出高度部分是否截断，配置`height`时有效。

+ `'truncate'` 在文本行数超出高度部分截断。











#### extraCssText(string)

<ExampleUIControlText />




> **注意：**`series.data.tooltip` 仅在 [tooltip.trigger](~tooltip.trigger) 为 `'item'` 时有效。<br>






额外附加到浮层的 css 样式。如下为浮层添加阴影的示例：

```js
extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
```









## clip(boolean) = false

<ExampleUIControlBoolean default="false" />



> 从 `v` 开始支持



是否裁剪超出坐标系部分的图形，具体裁剪效果根据系列决定：

+ 散点图/带有涟漪特效动画的散点（气泡）图：忽略中心点超出坐标系的图形，但是不裁剪单个图形
+ 柱状图：裁掉完全超出的柱子，但是不会裁剪只超出部分的柱子
+ 折线图：裁掉所有超出坐标系的折线部分，拐点图形的逻辑按照散点图处理
+ 路径图：裁掉所有超出坐标系的部分
+ K 线图：忽略整体都超出坐标系的图形，但是不裁剪单个图形
+ 自定义系列：裁掉所有超出坐标系的部分

除了自定义系列，其它系列的默认值都为 true，及开启裁剪，如果你觉得不想要裁剪的话，可以设置成 false 关闭。





## zlevel(number) = 0

自定义图所有图形的 zlevel 值。

`zlevel`用于 Canvas 分层，不同`zlevel`值的图形会放置在不同的 Canvas 中，Canvas 分层是一种常见的优化手段。我们可以把一些图形变化频繁（例如有动画）的组件设置成一个单独的`zlevel`。需要注意的是过多的 Canvas 会引起内存开销的增大，在手机端上需要谨慎使用以防崩溃。

`zlevel` 大的 Canvas 会放在 `zlevel` 小的 Canvas 的上面。

## z(number) = 2

自定义图组件的所有图形的`z`值。控制图形的前后顺序。`z`值小的图形会被`z`值大的图形覆盖。

`z`相比`zlevel`优先级更低，而且不会创建新的 Canvas。





## silent(boolean) = false

<ExampleUIControlBoolean />

图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。





## animation(boolean) = true

<ExampleUIControlBoolean default="true" clean="true" />

是否开启动画。

## animationThreshold(number) = 2000

是否开启动画的阈值，当单个系列显示的图形数量大于这个阈值时会关闭动画。



## animationDuration(number|Function) = 1000

<ExampleUIControlNumber min="0" default="1000" step="20" clean="true" />

初始动画的时长，支持回调函数，可以通过每个数据返回不同的时长实现更戏剧的初始动画效果：

```js
animationDuration: function (idx) {
    // 越往后的数据时长越大
    return idx * 100;
}
```

## animationEasing(string) = cubicOut

<ExampleUIControlEnum options="linear,quadraticIn,quadraticOut,quadraticInOut,cubicIn,cubicOut,cubicInOut,quarticIn,quarticOut,quarticInOut,quinticIn,quinticOut,quinticInOut,sinusoidalIn,sinusoidalOut,sinusoidalInOut,exponentialIn,exponentialOut,exponentialInOut,circularIn,circularOut,circularInOut,elasticIn,elasticOut,elasticInOut,backIn,backOut,backInOut,bounceIn,bounceOut,bounceInOut" clean="true" />

初始动画的缓动效果。不同的缓动效果可以参考 [缓动示例](line-easing)。


## animationDelay(number|Function) = 0

初始动画的延迟，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更戏剧的初始动画效果。

如下示例：
```js
animationDelay: function (idx) {
    // 越往后的数据延迟越大
    return idx * 100;
}
```

也可以看[该示例](bar-animation-delay)




## animationDurationUpdate(number|Function) = 300

<ExampleUIControlNumber min="0" default="1000" step="20" />

数据更新动画的时长。

支持回调函数，可以通过每个数据返回不同的时长实现更戏剧的更新动画效果：

```js
animationDurationUpdate: function (idx) {
    // 越往后的数据时长越大
    return idx * 100;
}
```

## animationEasingUpdate(string) = cubicInOut

<ExampleUIControlEnum options="linear,quadraticIn,quadraticOut,quadraticInOut,cubicIn,cubicOut,cubicInOut,quarticIn,quarticOut,quarticInOut,quinticIn,quinticOut,quinticInOut,sinusoidalIn,sinusoidalOut,sinusoidalInOut,exponentialIn,exponentialOut,exponentialInOut,circularIn,circularOut,circularInOut,elasticIn,elasticOut,elasticInOut,backIn,backOut,backInOut,bounceIn,bounceOut,bounceInOut" />

数据更新动画的缓动效果。


## animationDelayUpdate(number|Function) = 0

数据更新动画的延迟，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更戏剧的更新动画效果。

如下示例：
```js
animationDelayUpdate: function (idx) {
    // 越往后的数据延迟越大
    return idx * 100;
}
```

也可以看[该示例](bar-animation-delay)








## universalTransition(object)

全局过渡动画相关的配置。

全局过渡动画（Universal Transition）提供了任意系列之间进行变形动画的功能。开启该功能后，每次`setOption`，相同`id`的系列之间会自动关联进行动画的过渡，更细粒度的关联配置见`universalTransition.seriesKey`配置。

通过配置`encode.itemGroupId`或者`dataGroupId`等指定数据的分组，还可以实现诸如下钻，聚合等一对多或者多对一的动画。

可以直接在系列中配置 `universalTransition: true` 开启该功能。也可以提供一个对象进行更多属性的配置。

### enabled(boolean) = false

是否开启全局过渡动画。

### seriesKey(string|Array)

`seriesKey`决定了如何关联需要动画的系列，未配置时会默认取系列的`id`。

通常该配置为一个字符串，配置为相同`seriesKey`的系列之间会进行动画的过渡。也可以像下面配置为一个数组：

```js
seriesKey: ['male', 'female']
```

配置为数组意味着在动画的时候所有数组项指定的系列会合并为当前系列。比如该配置是指`id`或者`seriesKey`为`'male'`和`'female'`的系列会合并成当前系列。

### divideShape(string)

`divideShape`决定在一对多或者多对一的动画中，当前系列的图形如何分裂成多个图形。目前支持

+ `'split'` 通过一定的算法将分割图形成为多个。
+ `'clone'` 从当前图形克隆得到多个。

为了较好的效果，不同的系列会默认有不同的配置，比如散点图这种图形比较小且复杂的默认采用了`'clone'`，而柱状图这种更加规则的则默认是`'split'`。你可以根据你自己的场景需求设置为需要的分裂策略。

### delay(Function)

```ts
(index: number, count: number) => number
```

配置一对多或者多对一的动画中每个图形的动画延时，设置不同的动画延时可以给动画带来一定的趣味性。比如下面代码每个图形通过一个随机的延时造成一种错落的效果：

```js
delay: function (index, count) {
    return Math.random() * 1000;
}
```





## tooltip(Object)

本系列特定的 tooltip 设定。



### position(string|Array|Function)




<br>
> **注意：**`series.tooltip` 仅在 [tooltip.trigger](~tooltip.trigger) 为 `'item'` 时有效。<br>







提示框浮层的位置，默认不设置时位置会跟随鼠标的位置。

可选：

+ `Array`

    通过数组表示提示框浮层的位置，支持数字设置绝对位置，百分比设置相对位置。

    示例:

    ```js
    // 绝对位置，相对于容器左侧 10px, 上侧 10 px
    position: [10, 10]
    // 相对位置，放置在容器正中间
    position: ['50%', '50%']
    ```

+ `Function`

    回调函数，格式如下：
    ```js
    (point: Array, params: Object|Array.<Object>, dom: HTMLDomElement, rect: Object, size: Object) => Array
    ```

    **参数：**<br>
    point: 鼠标位置，如 [20, 40]。<br>
    params: 同 formatter 的参数相同。<br>
    dom: tooltip 的 dom 对象。<br>
    rect: 只有鼠标在图形上时有效，是一个用`x`, `y`, `width`, `height`四个属性表达的图形包围盒。<br>
    size: 包括 dom 的尺寸和 echarts 容器的当前尺寸，例如：`{contentSize: [width, height], viewSize: [width, height]}`。<br>

    **返回值：**<br>
    可以是一个表示 tooltip 位置的数组，数组值可以是绝对的像素值，也可以是相  百分比。<br>
    也可以是一个对象，如：`{left: 10, top: 30}`，或者 `{right: '20%', bottom: 40}`。<br>

    如下示例：
    ```js
    position: function (point, params, dom, rect, size) {
        // 固定在顶部
        return [point[0], '10%'];
    }
    ```
    或者：
    ```js
    position: function (pos, params, dom, rect, size) {
        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
        var obj = {top: 60};
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
        return obj;
    }
    ```


+ `'inside'`

    鼠标所在图形的内部中心位置，只在 [trigger](~tooltip.trigger) 为`'item'`的时候有效。

+ `'top'`

    鼠标所在图形上侧，只在 [trigger](~tooltip.trigger) 为`'item'`的时候有效。

+ `'left'`

    鼠标所在图形左侧，只在 [trigger](~tooltip.trigger) 为`'item'`的时候有效。

+ `'right'`

    鼠标所在图形右侧，只在 [trigger](~tooltip.trigger) 为`'item'`的时候有效。

+ `'bottom'`

    鼠标所在图形底侧，只在 [trigger](~tooltip.trigger) 为`'item'`的时候有效。

### formatter(string|Function)




<br>
> **注意：**`series.tooltip` 仅在 [tooltip.trigger](~tooltip.trigger) 为 `'item'` 时有效。<br>







提示框浮层内容格式器，支持字符串模板和回调函数两种形式。

**1. 字符串模板**

模板变量有 `{a}`, `{b}`，`{c}`，`{d}`，`{e}`，分别表示系列名，数据名，数据值等。
在 [trigger](~tooltip.trigger) 为 `'axis'` 的时候，会有多个系列的数据，此时可以通过 `{a0}`, `{a1}`, `{a2}` 这种后面加索引的方式表示系列的索引。
不同图表类型下的 `{a}`，`{b}`，`{c}`，`{d}` 含义不一样。
其中变量`{a}`, `{b}`, `{c}`, `{d}`在不同图表类型下代表数据含义为：

+ 折线（区域）图、柱状（条形）图、K线图 : `{a}`（系列名称），`{b}`（类目值），`{c}`（数值）, `{d}`（无）

+ 散点图（气泡）图 : `{a}`（系列名称），`{b}`（数据名称），`{c}`（数值数组）, `{d}`（无）

+ 地图 : `{a}`（系列名称），`{b}`（区域名称），`{c}`（合并数值）, `{d}`（无）

+ 饼图、仪表盘、漏斗图: `{a}`（系列名称），`{b}`（数据项名称），`{c}`（数值）, `{d}`（百分比）

更多其它图表模板变量的含义可以见相应的图表的 label.formatter 配置项。

**示例：**
```js
formatter: '{b0}: {c0}<br />{b1}: {c1}'
```


**2. 回调函数**

回调函数格式：

```js
(params: Object|Array, ticket: string, callback: (ticket: string, html: string)) => string | HTMLElement | HTMLElement[]
```

支持返回 HTML 字符串或者创建的 DOM 实例。

第一个参数 `params` 是 formatter 需要的数据集。格式如下：



```js
{
    componentType: 'series',
    // 系列类型
    seriesType: string,
    // 系列在传入的 option.series 中的 index
    seriesIndex: number,
    // 系列名称
    seriesName: string,
    // 数据名，类目名
    name: string,
    // 数据在传入的 data 数组中的 index
    dataIndex: number,
    // 传入的原始数据项
    data: Object,
    // 传入的数据值。在多数系列下它和 data 相同。在一些系列下是 data 中的分量（如 map、radar 中）
    value: number|Array|Object,
    // 坐标轴 encode 映射信息，
    // key 为坐标轴（如 'x' 'y' 'radius' 'angle' 等）
    // value 必然为数组，不会为 null/undefied，表示 dimension index 。
    // 其内容如：
    // {
    //     x: [2] // dimension index 为 2 的数据映射到 x 轴
    //     y: [0] // dimension index 为 0 的数据映射到 y 轴
    // }
    encode: Object,
    // 维度名列表
    dimensionNames: Array<String>,
    // 数据的维度 index，如 0 或 1 或 2 ...
    // 仅在雷达图中使用。
    dimensionIndex: number,
    // 数据图形的颜色
    color: string,

{{ for:  as ,  }}{{ /for }}

}
```

注：encode 和 dimensionNames 的使用方式，例如：

如果数据为：
```js
dataset: {
    source: [
        ['Matcha Latte', 43.3, 85.8, 93.7],
        ['Milk Tea', 83.1, 73.4, 55.1],
        ['Cheese Cocoa', 86.4, 65.2, 82.5],
        ['Walnut Brownie', 72.4, 53.9, 39.1]
    ]
}
```
则可这样得到 y 轴对应的 value：
```js
params.value[params.encode.y[0]]
```

如果数据为：
```js
dataset: {
    dimensions: ['product', '2015', '2016', '2017'],
    source: [
        {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
        {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
        {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
        {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
    ]
}
```
则可这样得到 y 轴对应的 value：
```js
params.value[params.dimensionNames[params.encode.y[0]]]
```



在 [trigger](~tooltip.trigger) 为 `'axis'` 的时候，或者 tooltip 被 [axisPointer](~xAxis.axisPointer) 触发的时候，`params` 是多个系列的数据数组。其中每项内容格式同上，并且，



```js
{
    componentType: 'series',
    // 系列类型
    seriesType: string,
    // 系列在传入的 option.series 中的 index
    seriesIndex: number,
    // 系列名称
    seriesName: string,
    // 数据名，类目名
    name: string,
    // 数据在传入的 data 数组中的 index
    dataIndex: number,
    // 传入的原始数据项
    data: Object,
    // 传入的数据值。在多数系列下它和 data 相同。在一些系列下是 data 中的分量（如 map、radar 中）
    value: number|Array|Object,
    // 坐标轴 encode 映射信息，
    // key 为坐标轴（如 'x' 'y' 'radius' 'angle' 等）
    // value 必然为数组，不会为 null/undefied，表示 dimension index 。
    // 其内容如：
    // {
    //     x: [2] // dimension index 为 2 的数据映射到 x 轴
    //     y: [0] // dimension index 为 0 的数据映射到 y 轴
    // }
    encode: Object,
    // 维度名列表
    dimensionNames: Array<String>,
    // 数据的维度 index，如 0 或 1 或 2 ...
    // 仅在雷达图中使用。
    dimensionIndex: number,
    // 数据图形的颜色
    color: string,

{{ for:  as ,  }}{{ /for }}

}
```

注：encode 和 dimensionNames 的使用方式，例如：

如果数据为：
```js
dataset: {
    source: [
        ['Matcha Latte', 43.3, 85.8, 93.7],
        ['Milk Tea', 83.1, 73.4, 55.1],
        ['Cheese Cocoa', 86.4, 65.2, 82.5],
        ['Walnut Brownie', 72.4, 53.9, 39.1]
    ]
}
```
则可这样得到 y 轴对应的 value：
```js
params.value[params.encode.y[0]]
```

如果数据为：
```js
dataset: {
    dimensions: ['product', '2015', '2016', '2017'],
    source: [
        {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
        {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
        {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
        {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
    ]
}
```
则可这样得到 y 轴对应的 value：
```js
params.value[params.dimensionNames[params.encode.y[0]]]
```



**注：** ECharts 2.x 使用数组表示各参数的方式不再支持。

第二个参数 `ticket` 是异步回调标识，配合第三个参数 `callback` 使用。
第三个参数 `callback` 是异步回调，在提示框浮层内容是异步获取的时候，可以通过 callback 传入上述的 `ticket` 和 `html` 更新提示框浮层内容。

示例：
```js
formatter: function (params, ticket, callback) {
    $.get('detail?name=' + params.name, function (content) {
        callback(ticket, toHTML(content));
    });
    return 'Loading';
}
```

### backgroundColor(Color) = 'rgba(50,50,50,0.7)'




<br>
> **注意：**`series.tooltip` 仅在 [tooltip.trigger](~tooltip.trigger) 为 `'item'` 时有效。<br>







提示框浮层的背景颜色。

### borderColor(Color) = '#333'

<ExampleUIControlColor default="#333" />




<br>
> **注意：**`series.tooltip` 仅在 [tooltip.trigger](~tooltip.trigger) 为 `'item'` 时有效。<br>







提示框浮层的边框颜色。

### borderWidth(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />




<br>
> **注意：**`series.tooltip` 仅在 [tooltip.trigger](~tooltip.trigger) 为 `'item'` 时有效。<br>







提示框浮层的边框宽。

### padding(number) = 5

<ExampleUIControlVector dims="T,R,B,L" default="5,5,5,5" />




<br>
> **注意：**`series.tooltip` 仅在 [tooltip.trigger](~tooltip.trigger) 为 `'item'` 时有效。<br>









<ExampleUIControlVector min="0" dims="T,R,B,L"  />

提示框浮层内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。

使用示例：
```js
// 设置内边距为 5
padding: 5
// 设置上下的内边距为 5，左右的内边距为 10
padding: [5, 10]
// 分别设置四个方向的内边距
padding: [
    5,  // 上
    10, // 右
    5,  // 下
    10, // 左
]
```



### textStyle(Object)




<br>
> **注意：**`series.tooltip` 仅在 [tooltip.trigger](~tooltip.trigger) 为 `'item'` 时有效。<br>







提示框浮层的文本样式。







#### color(Color) = '#fff'

<ExampleUIControlColor default="'#fff'" />

文字的颜色。



#### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

#### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

#### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

#### fontSize(number) = 14

<ExampleUIControlNumber default="14" min="1" step="1" />

文字的字体大小。





#### lineHeight(number) = 

<ExampleUIControlNumber min="0" step="1" default="12" />

行高。



`rich` 中如果没有设置 `lineHeight`，则会取父层级的 `lineHeight`。例如：

```js
{
    lineHeight: 56,
    rich: {
        a: {
            // 没有设置 `lineHeight`，则 `lineHeight` 为 56
        }
    }
}
```





#### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

#### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

#### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。



#### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




#### textBorderType(string|number|Array) = 'solid'


<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字本身的描边类型。


可选：
+ `'solid'`
+ `'dashed'`
+ `'dotted'`

自 `v5.0.0` 开始，也可以是 `number` 或者 `number` 数组，用以指定线条的 [dash array](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-dasharray)，配合 
`textBorderDashOffset`
 可实现更灵活的虚线效果。

例如：
```js
{

textBorderType: [5, 10],

textBorderDashOffset: 5
}
```


#### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









#### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

#### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

#### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

#### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。





#### width(number)

<ExampleUIControlNumber default="100" min="1" max="500" step="1" />

文本显示宽度。

#### height(number)

<ExampleUIControlNumber default="50" min="1" max="500" step="1" />

文本显示高度。

#### overflow(string) = 'none'

<ExampleUIControlEnum options="truncate,break,breakAll" />

文字超出宽度是否截断或者换行。配置`width`时有效

+ `'truncate'` 截断，并在末尾显示`ellipsis`配置的文本，默认为`...`
+ `'break'` 换行
+ `'breakAll'` 换行，跟`'break'`不同的是，在英语等拉丁文中，`'breakAll'`还会强制单词内换行

#### ellipsis(string) = '...'

在`overflow`配置为`'truncate'`的时候，可以通过该属性配置末尾显示的文本。

#### lineOverflow(string) = 'none'

文本超出高度部分是否截断，配置`height`时有效。

+ `'truncate'` 在文本行数超出高度部分截断。











### extraCssText(string)

<ExampleUIControlText />




<br>
> **注意：**`series.tooltip` 仅在 [tooltip.trigger](~tooltip.trigger) 为 `'item'` 时有效。<br>







额外附加到浮层的 css 样式。如下为浮层添加阴影的示例：

```js
extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
```
