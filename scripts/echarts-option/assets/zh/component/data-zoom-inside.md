# dataZoom.inside(Object)

**内置型数据区域缩放组件（dataZoomInside）**

（参考[数据区域缩放组件（dataZoom）的介绍](~dataZoom)）

所谓『内置』，即内置在坐标系中。

+ 平移：在坐标系中滑动拖拽进行数据区域平移。
+ 缩放：
    + PC端：鼠标在坐标系范围内滚轮滚动（MAC触控板类同）
    + 移动端：在移动端触屏上，支持两指滑动缩放。


<ExampleBaseOption name="data-zoom-inside" title="使用拖拽滚轮平移缩放" title-en="DataZoom with Pan and Zoom">
const data = [["2014-07-14",156],["2014-07-15",140],["2014-07-16",133],["2014-07-17",186],["2014-07-18",182],["2014-07-19",106],["2014-07-20",119],["2014-07-21",68],["2014-07-22",54],["2014-07-23",82],["2014-07-24",90],["2014-07-25",134],["2014-07-26",188],["2014-07-27",194],["2014-07-28",159],["2014-07-29",159],["2014-07-30",169],["2014-07-31",244],["2014-08-01",199],["2014-08-02",163],["2014-08-03",149],["2014-08-05",80],["2014-08-06",67],["2014-08-07",162],["2014-08-08",140],["2014-08-09",143],["2014-08-10",125],["2014-08-11",76],["2014-08-12",119],["2014-08-13",70],["2014-08-14",104],["2014-08-15",109],["2014-08-16",159],["2014-08-17",124],["2014-08-18",135],["2014-08-19",150],["2014-08-20",164],["2014-08-21",169],["2014-08-22",83],["2014-08-23",155],["2014-08-24",75],["2014-08-25",59],["2014-08-26",78],["2014-08-27",136],["2014-08-28",103],["2014-08-29",104],["2014-08-30",176],["2014-08-31",89],["2014-09-01",127],["2014-09-03",54],["2014-09-04",100],["2014-09-05",140],["2014-09-06",186],["2014-09-07",200],["2014-09-08",61],["2014-09-09",109],["2014-09-10",111],["2014-09-11",114],["2014-09-12",97],["2014-09-13",94],["2014-09-14",66],["2014-09-15",54],["2014-09-16",87],["2014-09-17",80],["2014-09-18",84],["2014-09-19",117],["2014-09-20",168],["2014-09-21",129],["2014-09-22",127],["2014-09-23",64],["2014-09-24",60],["2014-09-25",144],["2014-09-26",170],["2014-09-27",58],["2014-09-28",87],["2014-09-29",70],["2014-09-30",53],["2014-10-01",92],["2014-10-02",78],["2014-10-03",123],["2014-10-04",95],["2014-10-05",54],["2014-10-06",68],["2014-10-07",200],["2014-10-08",314],["2014-10-09",379],["2014-10-10",346],["2014-10-11",233],["2014-10-14",80],["2014-10-15",73],["2014-10-16",76],["2014-10-17",132],["2014-10-18",211],["2014-10-19",289],["2014-10-20",250],["2014-10-21",82],["2014-10-22",99],["2014-10-23",163],["2014-10-24",267],["2014-10-25",353],["2014-10-26",78],["2014-10-27",72],["2014-10-28",88],["2014-10-29",140],["2014-10-30",206],["2014-10-31",204],["2014-11-01",65],["2014-11-03",59],["2014-11-04",150],["2014-11-05",79],["2014-11-07",63],["2014-11-08",93],["2014-11-09",80],["2014-11-10",95],["2014-11-11",59],["2014-11-13",65],["2014-11-14",77],["2014-11-15",143],["2014-11-16",98],["2014-11-17",64],["2014-11-18",93],["2014-11-19",282],["2014-11-23",155],["2014-11-24",94],["2014-11-25",196],["2014-11-26",293],["2014-11-27",83],["2014-11-28",114],["2014-11-29",276],["2014-12-01",54],["2014-12-02",65],["2014-12-03",51],["2014-12-05",62],["2014-12-06",89],["2014-12-07",65],["2014-12-08",82],["2014-12-09",276],["2014-12-10",153],["2014-12-11",52],["2014-12-13",69],["2014-12-14",113],["2014-12-15",82],["2014-12-17",99],["2014-12-19",53],["2014-12-22",103],["2014-12-23",100],["2014-12-25",73],["2014-12-26",155],["2014-12-27",243],["2014-12-28",155],["2014-12-29",125],["2014-12-30",65],["2015-01-01",65],["2015-01-02",79],["2015-01-03",200],["2015-01-04",226],["2015-01-05",122],["2015-01-06",60],["2015-01-07",85],["2015-01-08",190],["2015-01-09",105],["2015-01-10",208],["2015-01-11",59],["2015-01-12",160],["2015-01-13",211],["2015-01-14",265],["2015-01-15",386],["2015-01-16",118],["2015-01-17",89],["2015-01-18",94],["2015-01-19",77],["2015-01-20",113],["2015-01-22",143],["2015-01-23",257],["2015-01-24",117],["2015-01-25",185],["2015-01-26",119],["2015-01-28",65],["2015-01-29",87],["2015-01-31",60],["2015-02-01",108],["2015-02-02",188],["2015-02-03",143],["2015-02-05",62],["2015-02-06",100],["2015-02-09",152],["2015-02-10",166],["2015-02-11",55],["2015-02-12",59],["2015-02-13",175],["2015-02-14",293],["2015-02-15",326],["2015-02-16",153],["2015-02-18",73],["2015-02-19",267],["2015-02-20",183],["2015-02-21",394],["2015-02-22",158],["2015-02-23",86],["2015-02-24",207]];

const option = {
    color: ['#3398DB'],
    title: {
        text: 'Beijing AQI'
    },
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        data: data.map(function (item) {
            return item[0];
        })
    },
    yAxis: {
        splitLine: {
            show: false
        }
    },
    dataZoom: {
        start: 80,
        type: 'inside'
    },
    series: {
        name: 'Beijing AQI',
        type: 'bar',
        data: data.map(function (item) {
            return item[1];
        })
    }
};
</ExampleBaseOption>

## type(string) = 'inside'



## id(string)

组件 ID。默认不指定。指定则可用于在 option 或者 API 中引用组件。



## disabled(boolean) = false

<ExampleUIControlBoolean />

是否停止组件的功能。



## xAxisIndex(number|Array) = null

设置 `dataZoom-inside` 组件控制的 `x轴`（即[xAxis](~xAxis)，是直角坐标系中的概念，参见 [grid](~grid)）。

不指定时，当 [dataZoom-inside.orient](~dataZoom-inside.orient) 为 `'horizontal'`时，默认控制和 dataZoom 平行的第一个 `xAxis`。但是不建议使用默认值，建议显式指定。



如果是 `number` 表示控制一个轴，如果是 `Array` 表示控制多个轴。

例如有如下 ECharts option：

```javascript
option: {
    xAxis: [
        {...}, // 第一个 xAxis
        {...}, // 第二个 xAxis
        {...}, // 第三个 xAxis
        {...}  // 第四个 xAxis
    ],
    dataZoom: [
        { // 第一个 dataZoom 组件
            xAxisIndex: [0, 2] // 表示这个 dataZoom 组件控制 第一个 和 第三个 xAxis
        },
        { // 第二个 dataZoom 组件
            xAxisIndex: 3      // 表示这个 dataZoom 组件控制 第四个 xAxis
        }
    ]
}
```





## yAxisIndex(number|Array) = null

设置 `dataZoom-inside` 组件控制的 `y轴`（即[yAxis](~yAxis)，是直角坐标系中的概念，参见 [grid](~grid)）。

不指定时，当 [dataZoom-inside.orient](~dataZoom-inside.orient) 为 `'vertical'`时，默认控制和 dataZoom 平行的第一个 `yAxis`。但是不建议使用默认值，建议显式指定。



如果是 `number` 表示控制一个轴，如果是 `Array` 表示控制多个轴。

例如有如下 ECharts option：

```javascript
option: {
    yAxis: [
        {...}, // 第一个 yAxis
        {...}, // 第二个 yAxis
        {...}, // 第三个 yAxis
        {...}  // 第四个 yAxis
    ],
    dataZoom: [
        { // 第一个 dataZoom 组件
            yAxisIndex: [0, 2] // 表示这个 dataZoom 组件控制 第一个 和 第三个 yAxis
        },
        { // 第二个 dataZoom 组件
            yAxisIndex: 3      // 表示这个 dataZoom 组件控制 第四个 yAxis
        }
    ]
}
```





## radiusAxisIndex(number|Array) = null

设置 `dataZoom-inside` 组件控制的 `radius 轴`（即[radiusAxis](~radiusAxis)，是直角坐标系中的概念，参见 [polar](~polar)）。



如果是 `number` 表示控制一个轴，如果是 `Array` 表示控制多个轴。

例如有如下 ECharts option：

```javascript
option: {
    radiusAxis: [
        {...}, // 第一个 radiusAxis
        {...}, // 第二个 radiusAxis
        {...}, // 第三个 radiusAxis
        {...}  // 第四个 radiusAxis
    ],
    dataZoom: [
        { // 第一个 dataZoom 组件
            radiusAxisIndex: [0, 2] // 表示这个 dataZoom 组件控制 第一个 和 第三个 radiusAxis
        },
        { // 第二个 dataZoom 组件
            radiusAxisIndex: 3      // 表示这个 dataZoom 组件控制 第四个 radiusAxis
        }
    ]
}
```





## angleAxisIndex(number|Array) = null

设置 `dataZoom-inside` 组件控制的 `angle 轴`（即[angleAxis](~angleAxis)，是直角坐标系中的概念，参见 [polar](~polar)）。



如果是 `number` 表示控制一个轴，如果是 `Array` 表示控制多个轴。

例如有如下 ECharts option：

```javascript
option: {
    angleAxis: [
        {...}, // 第一个 angleAxis
        {...}, // 第二个 angleAxis
        {...}, // 第三个 angleAxis
        {...}  // 第四个 angleAxis
    ],
    dataZoom: [
        { // 第一个 dataZoom 组件
            angleAxisIndex: [0, 2] // 表示这个 dataZoom 组件控制 第一个 和 第三个 angleAxis
        },
        { // 第二个 dataZoom 组件
            angleAxisIndex: 3      // 表示这个 dataZoom 组件控制 第四个 angleAxis
        }
    ]
}
```





## filterMode(string) = 'filter'

<ExampleUIControlEnum options="filter,weakFilter,empty,none" default="filter" />



`dataZoom` 的运行原理是通过 `数据过滤` 以及在内部设置轴的显示窗口来达到 `数据窗口缩放` 的效果。

数据过滤模式（[dataZoom.filterMode](~dataZoom.filterMode)）的设置不同，效果也不同。

可选值为：

+ 'filter'：当前数据窗口外的数据，被 **过滤掉**。即 **会** 影响其他轴的数据范围。每个数据项，只要有一个维度在数据窗口外，整个数据项就会被过滤掉。

+ 'weakFilter'：当前数据窗口外的数据，被 **过滤掉**。即 **会** 影响其他轴的数据范围。每个数据项，只有当全部维度都在数据窗口同侧外部，整个数据项才会被过滤掉。

+ 'empty'：当前数据窗口外的数据，被 **设置为空**。即 **不会** 影响其他轴的数据范围。

+ 'none': 不过滤数据，只改变数轴范围。

如何设置，由用户根据场景和需求自己决定。经验来说：

+ 当『只有 X 轴 或 只有 Y 轴受 `dataZoom` 组件控制』时，常使用 `filterMode: 'filter'`，这样能使另一个轴自适应过滤后的数值范围。

+ 当『X 轴 Y 轴分别受 `dataZoom` 组件控制』时：

    + 如果 X 轴和 Y 轴是『同等地位的、不应互相影响的』，比如在『双数值轴散点图』中，那么两个轴可都设为 `fiterMode: 'empty'`。

    + 如果 X 轴为主，Y 轴为辅，比如在『柱状图』中，需要『拖动 `dataZoomX` 改变 X 轴过滤柱子时，Y 轴的范围也自适应剩余柱子的高度』，『拖动 `dataZoomY` 改变 Y 轴过滤柱子时，X 轴范围不受影响』，那么就 X轴设为 `fiterMode: 'filter'`，Y 轴设为 `fiterMode: 'empty'`，即主轴 `'filter'`，辅轴 `'empty'`。

下面是个具体例子：

```javascript
option = {
    dataZoom: [
        {
            id: 'dataZoomX',
            type: 'slider',
            xAxisIndex: [0],
            filterMode: 'filter'
        },
        {
            id: 'dataZoomY',
            type: 'slider',
            yAxisIndex: [0],
            filterMode: 'empty'
        }
    ],
    xAxis: {type: 'value'},
    yAxis: {type: 'value'},
    series{
        type: 'bar',
        data: [
            // 第一列对应 X 轴，第二列对应 Y 轴。
            [12, 24, 36],
            [90, 80, 70],
            [3, 9, 27],
            [1, 11, 111]
        ]
    }
}
```
上例中，`dataZoomX` 的 `filterMode` 设置为 `'filter'`。于是，假设当用户拖拽 `dataZoomX`（不去动 `dataZoomY`）导致其 valueWindow 变为 `[2, 50]` 时，`dataZoomX` 对 series.data 的第一列进行遍历，窗口外的整项去掉，最终得到的 series.data 为：

```javascript
[
    // 第一列对应 X 轴，第二列对应 Y 轴。
    [12, 24, 36],
    // [90, 80, 70] 整项被过滤掉，因为 90 在 dataWindow 之外。
    [3, 9, 27]
    // [1, 11, 111] 整项被过滤掉，因为 1 在 dataWindow 之外。
]
```

过滤前，series.data 中对应 Y 轴的值有 `24`、`80`、`9`、`11`，过滤后，只剩下 `24` 和 `9`，那么 Y 轴的显示范围就会自动改变以适应剩下的这两个值的显示（如果 Y 轴没有被设置 `min`、`max` 固定其显示范围的话）。

所以，`filterMode: 'filter'` 的效果是：过滤数据后使另外的轴也能自动适应当前数据的范围。

再从头来，上例中 `dataZoomY` 的 `filterMode` 设置为 `'empty'`。于是，假设当用户拖拽 `dataZoomY`（不去动 `dataZoomX`）导致其 dataWindow 变为 `[10, 60]` 时，`dataZoomY` 对 series.data 的第二列进行遍历，窗口外的值被设置为 empty （即替换为 NaN，这样设置为空的项，其所对应柱形，在 X 轴还有占位，只是不显示出来）。最终得到的 series.data 为：

```javascript
[
    // 第一列对应 X 轴，第二列对应 Y 轴。
    [12, 24, 36],
    [90, NaN, 70], // 设置为 empty (NaN)
    [3, NaN, 27],  // 设置为 empty (NaN)
    [1, 11, 111]
]
```

这时，series.data 中对应于 X 轴的值仍然全部保留不受影响，为 `12`、`90`、`3`、`1`。那么用户对 `dataZoomY` 的拖拽操作不会影响到 X 轴的范围。这样的效果，对于离群点（outlier）过滤功能，比较清晰。

如下面的例子：
~[600x400](doc-example/bar-dataZoom-filterMode&edit=1&reset=1)



## start(number) = 0

<ExampleUIControlNumber min="0" max="100" step="0.5" />

数据窗口范围的起始百分比。范围是：0 ~ 100。表示 0% ~ 100%。

[dataZoom-inside.start](~dataZoom-inside.start) 和 [dataZoom-inside.end](~dataZoom-inside.end) 共同用 **百分比** 的形式定义了数据窗口范围。

关于坐标轴范围（axis extent）和 `dataZoom-inside.start` 的关系的更多信息，请参见：[dataZoom-inside.rangeMode](~dataZoom-inside.rangeMode)。

## end(number) = 100

<ExampleUIControlNumber min="0" max="100" default="100" step="0.5" />

数据窗口范围的结束百分比。范围是：0 ~ 100。

[dataZoom-inside.start](~dataZoom-inside.start) 和 [dataZoom-inside.end](~dataZoom-inside.end) 共同用 **百分比** 的形式定义了数据窗口范围。

关于坐标轴范围（axis extent）和 `dataZoom-inside.end` 的关系的更多信息，请参见：[dataZoom-inside.rangeMode](~dataZoom-inside.rangeMode)。

## startValue(number|string|Date) = null

数据窗口范围的起始数值。如果设置了 [dataZoom-inside.start](~dataZoom-inside.start) 则 `startValue` 失效。

[dataZoom-inside.startValue](~dataZoom-inside.startValue) 和 [dataZoom-inside.endValue](~dataZoom-inside.endValue) 共同用 **绝对数值** 的形式定义了数据窗口范围。

注意，如果轴的类型为 `category`，则 `startValue` 既可以设置为 `axis.data` 数组的 `index`，也可以设置为数组值本身。
但是如果设置为数组值本身，会在内部自动转化为数组的 index。

关于坐标轴范围（axis extent）和 `dataZoom-inside.startValue` 的关系的更多信息，请参见：[dataZoom-inside.rangeMode](~dataZoom-inside.rangeMode)。

## endValue(number|string|Date) = null

数据窗口范围的结束数值。如果设置了 [dataZoom-inside.end](~dataZoom-inside.end) 则 `endValue` 失效。

[dataZoom-inside.startValue](~dataZoom-inside.startValue) 和 [dataZoom-inside.endValue](~dataZoom-inside.endValue) 共同用 **绝对数值** 的形式定义了数据窗口范围。

注意，如果轴的类型为 `category`，则 `endValue` 即可以设置为 `axis.data` 数组的 `index`，也可以设置为数组值本身。
但是如果设置为数组值本身，会在内部自动转化为数组的 index。

关于坐标轴范围（axis extent）和 `dataZoom-inside.endValue` 的关系的更多信息，请参见：[dataZoom-inside.rangeMode](~dataZoom-inside.rangeMode)。

## minSpan(number) = null

<ExampleUIControlNumber min="0" max="100" step="0.5" />

用于限制窗口大小的最小值（百分比值），取值范围是 `0` ~ `100`。

如果设置了 [dataZoom-inside.minValueSpan](~dataZoom-inside.minValueSpan) 则 `minSpan` 失效。

## maxSpan(number) = null

<ExampleUIControlNumber min="0" max="100" step="0.5" />

用于限制窗口大小的最大值（百分比值），取值范围是 `0` ~ `100`。

如果设置了 [dataZoom-inside.maxValueSpan](~dataZoom-inside.maxValueSpan) 则 `maxSpan` 失效。

## minValueSpan(number|string|Date) = null

用于限制窗口大小的最小值（实际数值）。

如在时间轴上可以设置为：`3600 * 24 * 1000 * 5` 表示 5 天。
在类目轴上可以设置为 `5` 表示 5 个类目。

## maxValueSpan(number|string|Date) = null

用于限制窗口大小的最大值（实际数值）。

如在时间轴上可以设置为：`3600 * 24 * 1000 * 5` 表示 5 天。
在类目轴上可以设置为 `5` 表示 5 个类目。

## orient(string) = null

<ExampleUIControlEnum options="horizontal,vertical" />

布局方式是横还是竖。不仅是布局方式，对于直角坐标系而言，也决定了，缺省情况控制横向数轴还是纵向数轴。

可选值为：

+ `'horizontal'`：水平。

+ `'vertical'`：竖直。

## zoomLock(boolean) = false

<ExampleUIControlBoolean />

是否锁定选择区域（或叫做数据窗口）的大小。

如果设置为 `true` 则锁定选择区域的大小，也就是说，只能平移，不能缩放。

## throttle(number) = 100

<ExampleUIControlNumber default="100" min="0" step="20" />

设置触发视图刷新的频率。单位为毫秒（ms）。

如果 [animation](~animation) 设为 `true` 且 [animationDurationUpdate](~animationDurationUpdate) 大于 `0`，可以保持 `throttle` 为默认值 `100`（或者设置为大于 `0` 的值），否则拖拽时有可能画面感觉卡顿。

如果 [animation](~animation) 设为 `false` 或者 [animationDurationUpdate](~animationDurationUpdate) 设为 `0`，且在数据量不大时，拖拽时画面感觉卡顿，可以把尝试把 `throttle` 设为 `0` 来改善。

## rangeMode(Array)

形式为：`[rangeModeForStart, rangeModeForEnd]`。

例如 `rangeMode: ['value', 'percent']`，表示 start 值取绝对数值，end 取百分比。

每项可选值为：`'value'`, `'percent'`

+ `'value'` 模式：处于此模式下，坐标轴范围（axis extent）总只会被`dataZoom.startValue` and `dataZoom.endValue` 决定，而不管数据是多少，以及不管，`axis.min` 和 `axis.max` 怎么设置。
+ `'percent'` 模式：处于此模式下，`100` 代表 100% 的 `[dMin, dMax]`。这里 `dMin` 表示，如果 `axis.min` 设置了就是 `axis.min`，否则是 `data.extent[0]`；`dMax` 表示，如果 `axis.max` 设置了就是 `axis.max`，否则是 `data.extent[1]`。`[dMin, dMax]` 乘以 percent 的结果得到坐标轴范围（axis extent）。

默认情况下，`rangeMode` 总是被自动设定。如果指定了 `option.start`/`option.end` 那么就设定为 `'percent'`，如果指定了 `option.startValue`/`option.endValue` 那么就设定为 `'value'`。以及当用户用不用操作触发视图改变时，`rangeMode` 也可能会相应得变化（如，通过 `toolbox.dataZoom` 触发视图改变时，`rangeMode` 会自动被设置为 `value`，通过 `dataZoom-inside` 和 `dataZoom-slider` 触发视图改变时，会自动被设置为 `'percent'`）。

如果我们手动在 `option` 中设定了 `rangeMode`，那么它只在 `start` 和 `startValue` 都设置了或者 `end` 和 `endValue` 都设置了才有意义。所以通常我们没必要在 `option` 中指定 `rangeMode`。

举例一个使用场景：当我们使用动态数据时（即，周期性得通过 `setOption` 来改变数据），如果 `rangeMode` 在 `'value`' 模式，`dataZoom` 的窗口会一直保持在一个固定的值区间，无论数据怎么改变添加了多少；如果 `rangeMode` 在 `'percent'` 模式，窗口会随着数据的添加而改变（假设 `axis.min` 和 `axis.max` 没有被设置）。





## zoomOnMouseWheel(boolean|string) = true

<ExampleUIControlEnum options="true,false,shift,ctrl,alt" default="true" />

如何触发缩放。可选值为：

+ `true`：表示不按任何功能键，鼠标滚轮能触发缩放。
+ `false`：表示鼠标滚轮不能触发缩放。
+ `'shift'`：表示按住 `shift` 和鼠标滚轮能触发缩放。
+ `'ctrl'`：表示按住 `ctrl` 和鼠标滚轮能触发缩放。
+ `'alt'`：表示按住 `alt` 和鼠标滚轮能触发缩放。

## moveOnMouseMove(boolean|string) = true

<ExampleUIControlEnum options="true,false,shift,ctrl,alt" default="true" />

如何触发数据窗口平移。可选值为：

+ `true`：表示不按任何功能键，鼠标移动能触发数据窗口平移。
+ `false`：表示鼠标移动不能触发平移。
+ `'shift'`：表示按住 `shift` 和鼠标移动能触发数据窗口平移。
+ `'ctrl'`：表示按住 `ctrl` 和鼠标移动能触发数据窗口平移。
+ `'alt'`：表示按住 `alt` 和鼠标移动能触发数据窗口平移。

## moveOnMouseWheel(boolean|string) = true

<ExampleUIControlEnum options="true,false,shift,ctrl,alt" default="true" />

如何触发数据窗口平移。可选值为：

+ `true`：表示不按任何功能键，鼠标滚轮能触发数据窗口平移。
+ `false`：表示鼠标滚轮不能触发平移。
+ `'shift'`：表示按住 `shift` 和鼠标滚轮能触发数据窗口平移。
+ `'ctrl'`：表示按住 `ctrl` 和鼠标滚轮能触发数据窗口平移。
+ `'alt'`：表示按住 `alt` 和鼠标滚轮能触发数据窗口平移。

## preventDefaultMouseMove(boolean) = true

<ExampleUIControlBoolean default="true" />

是否阻止 mousemove 事件的默认行为。
