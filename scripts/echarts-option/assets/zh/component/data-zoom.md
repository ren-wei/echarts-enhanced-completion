# dataZoom(Array|Object)

`dataZoom` 组件 用于区域缩放，从而能自由关注细节的数据信息，或者概览数据整体，或者去除离群点的影响。


现在支持这几种类型的 `dataZoom` 组件：

+ [内置型数据区域缩放组件（dataZoomInside）](~dataZoom-inside)：内置于坐标系中，使用户可以在坐标系上通过鼠标拖拽、鼠标滚轮、手指滑动（触屏上）来缩放或漫游坐标系。

+ [滑动条型数据区域缩放组件（dataZoomSlider）](~dataZoom-slider)：有单独的滑动条，用户在滑动条上进行缩放或漫游。

+ [框选型数据区域缩放组件（dataZoomSelect）](~toolbox.feature.dataZoom)：提供一个选框进行数据区域缩放。即 [toolbox.feature.dataZoom](~toolbox.feature.dataZoom)，配置项在 `toolbox` 中。


如下例子：
~[600x400](https://echarts.apache.org/examples/zh/view.html?c=doc-example/scatter-dataZoom-all&edit=1&reset=1)

<br>

---

**✦ dataZoom 和 数轴的关系 ✦**

`dataZoom` 主要是对 `数轴（axis）` 进行操作（控制数轴的显示范围，或称窗口（window））。

> 可以通过 [dataZoom.xAxisIndex](~dataZoom.xAxisIndex) 或 [dataZoom.yAxisIndex](~dataZoom.yAxisIndex) 或 [dataZoom.radiusAxisIndex](~dataZoom.radiusAxisIndex) 或 [dataZoom.angleAxisIndex](~dataZoom.angleAxisIndex) 来指定 `dataZoom` 控制哪个或哪些数轴。

`dataZoom` 组件可 **同时存在多个**，起到共同控制的作用。如果多个 `dataZoom` 组件共同控制同一个数轴，他们会自动联动。

<br>

---

**✦ dataZoom 组件如何影响轴和数据 ✦**



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



另外，如果在任一个数轴上设置了 `min`、`max`（如设置 `yAxis: {min: 0, max: 400}`），那么这个数轴无论如何也不会被其他数轴的 dataZoom 行为影响了。

<br>

---

**✦ 数据窗口的设置 ✦**

`dataZoom` 的数据窗口范围的设置，目前支持两种形式：

+ 百分比形式：即设置 [dataZoom.start](~dataZoom.start) 和 [dataZoom.end](~dataZoom.end)。

+ 绝对数值形式：即设置 [dataZoom.startValue](~dataZoom.startValue) 和 [dataZoom.endValue](~dataZoom.endValue)。

注意：当使用百分比形式指定 `dataZoom` 范围时，且处于如下场景（或类似场景）中，`dataZoom` 的结果是和 `dataZoom` 组件的定义顺序相关的。

```javascript
option = {
    dataZoom: [
        {
            id: 'dataZoomX',
            type: 'slider',
            xAxisIndex: [0],
            filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
            start: 30,
            end: 70
        },
        {
            id: 'dataZoomY',
            type: 'slider',
            yAxisIndex: [0],
            filterMode: 'empty',
            start: 20,
            end: 80
        }
    ],
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'value'
        // yAxis 中并没有使用 min、max 来显示限定轴的显示范围。
    },
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

在上例中，`dataZoomY` 的 `start: 20, end: 80` 到底表示什么意思？

+ 如果 `yAxis.min`、`yAxis.max` 进行了直接设置：

    那么 `dataZoomY` 的 `start: 20, end: 80` 表示 `yAxis.min` ~ `yAxis.max` 的 `20%` 到 `80%`。

+ 如果 `yAxis.min`、`yAxis.max` 没有设置：

    + 如果 `dataZoomX` 设置为 `filterMode: 'empty'`：

        那么 `dataZoomY` 的 `start: 20, end: 80` 表示 series.data 中 `dataMinY` ~ `dataMaxY`（即上例中的 `9` ~ `80`）的 `20%` 到 `80%`。

    + 如果 `dataZoomX` 设置为 `filterMode: 'filter'`：

        那么，因为 `dataZoomX` 定义 `dataZoomY` 组件之前，所以 `dataZoomX` 的 `start: 30, end: 70` 表示全部数据的 `30%` 到 `70%`，而 `dataZoomY` 组件的 `start: 20, end: 80` 表示经过 `dataZoomX` 过滤处理后，所得数据集的 `20%` 到 `80%`。

        如果需要改变这种处理顺序，那么改变 `dataZoomX` 和 `dataZoomY` 在 option 中的出现顺序即可。



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





# dataZoom.slider(Object)

**滑动条型数据区域缩放组件（dataZoomInside）**

滑动条型数据区域缩放组件提供了数据缩略图显示，缩放，刷选，拖拽，点击快速定位等数据筛选的功能。下图显示了该组件可交互部分

![600xauto](~dataZoom-zone.png)

<ExampleBaseOption name="data-zoom-slider" title="滑块缩放的 dataZoom" title-en="DataZoom with Slider">
const data = [["2014-07-14",156],["2014-07-15",140],["2014-07-16",133],["2014-07-17",186],["2014-07-18",182],["2014-07-19",106],["2014-07-20",119],["2014-07-21",68],["2014-07-22",54],["2014-07-23",82],["2014-07-24",90],["2014-07-25",134],["2014-07-26",188],["2014-07-27",194],["2014-07-28",159],["2014-07-29",159],["2014-07-30",169],["2014-07-31",244],["2014-08-01",199],["2014-08-02",163],["2014-08-03",149],["2014-08-05",80],["2014-08-06",67],["2014-08-07",162],["2014-08-08",140],["2014-08-09",143],["2014-08-10",125],["2014-08-11",76],["2014-08-12",119],["2014-08-13",70],["2014-08-14",104],["2014-08-15",109],["2014-08-16",159],["2014-08-17",124],["2014-08-18",135],["2014-08-19",150],["2014-08-20",164],["2014-08-21",169],["2014-08-22",83],["2014-08-23",155],["2014-08-24",75],["2014-08-25",59],["2014-08-26",78],["2014-08-27",136],["2014-08-28",103],["2014-08-29",104],["2014-08-30",176],["2014-08-31",89],["2014-09-01",127],["2014-09-03",54],["2014-09-04",100],["2014-09-05",140],["2014-09-06",186],["2014-09-07",200],["2014-09-08",61],["2014-09-09",109],["2014-09-10",111],["2014-09-11",114],["2014-09-12",97],["2014-09-13",94],["2014-09-14",66],["2014-09-15",54],["2014-09-16",87],["2014-09-17",80],["2014-09-18",84],["2014-09-19",117],["2014-09-20",168],["2014-09-21",129],["2014-09-22",127],["2014-09-23",64],["2014-09-24",60],["2014-09-25",144],["2014-09-26",170],["2014-09-27",58],["2014-09-28",87],["2014-09-29",70],["2014-09-30",53],["2014-10-01",92],["2014-10-02",78],["2014-10-03",123],["2014-10-04",95],["2014-10-05",54],["2014-10-06",68],["2014-10-07",200],["2014-10-08",314],["2014-10-09",379],["2014-10-10",346],["2014-10-11",233],["2014-10-14",80],["2014-10-15",73],["2014-10-16",76],["2014-10-17",132],["2014-10-18",211],["2014-10-19",289],["2014-10-20",250],["2014-10-21",82],["2014-10-22",99],["2014-10-23",163],["2014-10-24",267],["2014-10-25",353],["2014-10-26",78],["2014-10-27",72],["2014-10-28",88],["2014-10-29",140],["2014-10-30",206],["2014-10-31",204],["2014-11-01",65],["2014-11-03",59],["2014-11-04",150],["2014-11-05",79],["2014-11-07",63],["2014-11-08",93],["2014-11-09",80],["2014-11-10",95],["2014-11-11",59],["2014-11-13",65],["2014-11-14",77],["2014-11-15",143],["2014-11-16",98],["2014-11-17",64],["2014-11-18",93],["2014-11-19",282],["2014-11-23",155],["2014-11-24",94],["2014-11-25",196],["2014-11-26",293],["2014-11-27",83],["2014-11-28",114],["2014-11-29",276],["2014-12-01",54],["2014-12-02",65],["2014-12-03",51],["2014-12-05",62],["2014-12-06",89],["2014-12-07",65],["2014-12-08",82],["2014-12-09",276],["2014-12-10",153],["2014-12-11",52],["2014-12-13",69],["2014-12-14",113],["2014-12-15",82],["2014-12-17",99],["2014-12-19",53],["2014-12-22",103],["2014-12-23",100],["2014-12-25",73],["2014-12-26",155],["2014-12-27",243],["2014-12-28",155],["2014-12-29",125],["2014-12-30",65],["2015-01-01",65],["2015-01-02",79],["2015-01-03",200],["2015-01-04",226],["2015-01-05",122],["2015-01-06",60],["2015-01-07",85],["2015-01-08",190],["2015-01-09",105],["2015-01-10",208],["2015-01-11",59],["2015-01-12",160],["2015-01-13",211],["2015-01-14",265],["2015-01-15",386],["2015-01-16",118],["2015-01-17",89],["2015-01-18",94],["2015-01-19",77],["2015-01-20",113],["2015-01-22",143],["2015-01-23",257],["2015-01-24",117],["2015-01-25",185],["2015-01-26",119],["2015-01-28",65],["2015-01-29",87],["2015-01-31",60],["2015-02-01",108],["2015-02-02",188],["2015-02-03",143],["2015-02-05",62],["2015-02-06",100],["2015-02-09",152],["2015-02-10",166],["2015-02-11",55],["2015-02-12",59],["2015-02-13",175],["2015-02-14",293],["2015-02-15",326],["2015-02-16",153],["2015-02-18",73],["2015-02-19",267],["2015-02-20",183],["2015-02-21",394],["2015-02-22",158],["2015-02-23",86],["2015-02-24",207]];

const option = {
    color: ['#3398DB'],
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
    dataZoom: [{
    }],
    series: {
        name: 'Beijing AQI',
        type: 'bar',
        data: data.map(function (item) {
            return item[1];
        })
    }
};
</ExampleBaseOption>

## type(string) = 'slider'



## id(string)

组件 ID。默认不指定。指定则可用于在 option 或者 API 中引用组件。



## show(boolean) = true

<ExampleUIControlBoolean default="true" />

是否显示  组件。如果设置为 `false`，不会显示，但是数据过滤的功能还存在。

## backgroundColor(Color) = 'rgba(47,69,84,0)'

<ExampleUIControlColor default="rgba(47,69,84,0)" />

组件的背景颜色。

## dataBackground(Object)

数据阴影的样式。

### lineStyle(Object)

阴影的线条样式



#### color(Color) =  #d2dbee 

<ExampleUIControlColor />

线的颜色。





> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)

#### width(number) = 0

<ExampleUIControlNumber value="0" min="0" step="0.5" />

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











### areaStyle(Object)

阴影的填充样式



#### color(Color) =  d2dbee 

<ExampleUIControlColor />

填充的颜色。



> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)









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









#### opacity(number) = 0

<ExampleUIControlNumber default="0" min="0" max="1" step="0.01" />

图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。









## selectedDataBackground(Object)



> 从 `v5.0.0` 开始支持



选中部分数据阴影的样式。

### lineStyle(Object)

选中部分阴影的线条样式



#### color(Color) =  #8fb0f7 

<ExampleUIControlColor />

线的颜色。





> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)

#### width(number) = 0

<ExampleUIControlNumber value="0" min="0" step="0.5" />

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











### areaStyle(Object)

选中部分阴影的填充样式



#### color(Color) =  #8fb0f7 

<ExampleUIControlColor />

填充的颜色。



> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)









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









#### opacity(number) = 0

<ExampleUIControlNumber default="0" min="0" max="1" step="0.01" />

图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。









## fillerColor(Color) = 'rgba(167,183,204,0.4)'

<ExampleUIControlColor default="rgba(167,183,204,0.4)" />

选中范围的填充颜色。

## borderColor(Color) = '#ddd'

<ExampleUIControlColor default="#ddd" />

边框颜色。

## handleIcon(string)

<ExampleUIControlIcon />

两侧缩放手柄的 icon 形状，支持路径字符串，默认为：
```js
'M-9.35,34.56V42m0-40V9.5m-2,0h4a2,2,0,0,1,2,2v21a2,2,0,0,1-2,2h-4a2,2,0,0,1-2-2v-21A2,2,0,0,1-11.35,9.5Z'
```



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







## handleSize(number|string) = '100%'

<ExampleUIControlPercent min="0" step="1" default="100%" />

控制手柄的尺寸，可以是像素大小，也可以是相对于 dataZoom 组件宽度的百分比，默认跟 dataZoom 宽度相同。

## handleStyle(Object)

两侧缩放手柄的样式配置。



### color(Color) = #fff

<ExampleUIControlColor />

图形的颜色。



> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)



### borderColor(Color) = #ACB8D1

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











## moveHandleIcon(string)

<ExampleUIControlIcon />



> 从 `v5.0.0` 开始支持



移动手柄中间的 icon，支持路径字符串，默认为：

```js
'M-320.9-50L-320.9-50c18.1,0,27.1,9,27.1,27.1V85.7c0,18.1-9,27.1-27.1,27.1l0,0c-18.1,0-27.1-9-27.1-27.1V-22.9C-348-41-339-50-320.9-50z M-212.3-50L-212.3-50c18.1,0,27.1,9,27.1,27.1V85.7c0,18.1-9,27.1-27.1,27.1l0,0c-18.1,0-27.1-9-27.1-27.1V-22.9C-239.4-41-230.4-50-212.3-50z M-103.7-50L-103.7-50c18.1,0,27.1,9,27.1,27.1V85.7c0,18.1-9,27.1-27.1,27.1l0,0c-18.1,0-27.1-9-27.1-27.1V-22.9C-130.9-41-121.8-50-103.7-50z'
```



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







## moveHandleSize(number) = 7

<ExampleUIControlNumber min="0" step="1" default="7" />



> 从 `v5.0.0` 开始支持



移动手柄的尺寸高度。

## moveHandleStyle(Object)



> 从 `v5.0.0` 开始支持



移动手柄的样式配置。



### color(Color) = #D2DBEE

<ExampleUIControlColor />

图形的颜色。



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











## labelPrecision(number|string) = 'auto'

<ExampleUIControlNumber min="0" step="1" />

显示label的小数精度。默认根据数据自动决定。

## labelFormatter(string|Function) = null

显示的label的格式化器。

+ 如果为 `string`，表示模板，例如：`aaaa{value}bbbb`，其中`{value}`会被替换为实际的数值。

+ 如果为 `Function`，表示回调函数，例如：

```javascript
/**
 * @param {*} value 如果 axis.type 为 'category'，则 `value` 为 axis.data 的 index。
 *                  否则 `value` 是当前值。
 * @param {strign} valueStr 内部格式化的结果。
 * @return {string} 返回最终的label内容。
 */
labelFormatter: function (value) {
    return 'aaa' + value + 'bbb';
}
```

## showDetail(boolean) = true

<ExampleUIControlBoolean default="true" />

是否显示detail，即拖拽时候显示详细数值信息。

## showDataShadow(string) = 'auto'

<ExampleUIControlBoolean />

是否在 `dataZoom-silder` 组件中显示数据阴影。数据阴影可以简单地反应数据走势。

## realtime(boolean) = true

<ExampleUIControlBoolean default="true" />

拖动时，是否实时更新系列的视图。如果设置为 `false`，则只在拖拽结束的时候更新。

## textStyle(Object)







### color(Color) = #333

<ExampleUIControlColor default="#333" />

dataZoom 文字的颜色。



### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

dataZoom 文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

dataZoom 文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

dataZoom 文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

dataZoom 文字的字体大小。





### lineHeight(number) = 

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





### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。



### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




### textBorderType(string|number|Array) = 'solid'


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


### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。





### width(number)

<ExampleUIControlNumber default="100" min="1" max="500" step="1" />

文本显示宽度。

### height(number)

<ExampleUIControlNumber default="50" min="1" max="500" step="1" />

文本显示高度。

### overflow(string) = 'none'

<ExampleUIControlEnum options="truncate,break,breakAll" />

文字超出宽度是否截断或者换行。配置`width`时有效

+ `'truncate'` 截断，并在末尾显示`ellipsis`配置的文本，默认为`...`
+ `'break'` 换行
+ `'breakAll'` 换行，跟`'break'`不同的是，在英语等拉丁文中，`'breakAll'`还会强制单词内换行

### ellipsis(string) = '...'

在`overflow`配置为`'truncate'`的时候，可以通过该属性配置末尾显示的文本。

### lineOverflow(string) = 'none'

文本超出高度部分是否截断，配置`height`时有效。

+ `'truncate'` 在文本行数超出高度部分截断。













## xAxisIndex(number|Array) = null

设置 `dataZoom-slider` 组件控制的 `x轴`（即[xAxis](~xAxis)，是直角坐标系中的概念，参见 [grid](~grid)）。

不指定时，当 [dataZoom-slider.orient](~dataZoom-slider.orient) 为 `'horizontal'`时，默认控制和 dataZoom 平行的第一个 `xAxis`。但是不建议使用默认值，建议显式指定。



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

设置 `dataZoom-slider` 组件控制的 `y轴`（即[yAxis](~yAxis)，是直角坐标系中的概念，参见 [grid](~grid)）。

不指定时，当 [dataZoom-slider.orient](~dataZoom-slider.orient) 为 `'vertical'`时，默认控制和 dataZoom 平行的第一个 `yAxis`。但是不建议使用默认值，建议显式指定。



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

设置 `dataZoom-slider` 组件控制的 `radius 轴`（即[radiusAxis](~radiusAxis)，是直角坐标系中的概念，参见 [polar](~polar)）。



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

设置 `dataZoom-slider` 组件控制的 `angle 轴`（即[angleAxis](~angleAxis)，是直角坐标系中的概念，参见 [polar](~polar)）。



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

[dataZoom-slider.start](~dataZoom-slider.start) 和 [dataZoom-slider.end](~dataZoom-slider.end) 共同用 **百分比** 的形式定义了数据窗口范围。

关于坐标轴范围（axis extent）和 `dataZoom-slider.start` 的关系的更多信息，请参见：[dataZoom-slider.rangeMode](~dataZoom-slider.rangeMode)。

## end(number) = 100

<ExampleUIControlNumber min="0" max="100" default="100" step="0.5" />

数据窗口范围的结束百分比。范围是：0 ~ 100。

[dataZoom-slider.start](~dataZoom-slider.start) 和 [dataZoom-slider.end](~dataZoom-slider.end) 共同用 **百分比** 的形式定义了数据窗口范围。

关于坐标轴范围（axis extent）和 `dataZoom-slider.end` 的关系的更多信息，请参见：[dataZoom-slider.rangeMode](~dataZoom-slider.rangeMode)。

## startValue(number|string|Date) = null

数据窗口范围的起始数值。如果设置了 [dataZoom-slider.start](~dataZoom-slider.start) 则 `startValue` 失效。

[dataZoom-slider.startValue](~dataZoom-slider.startValue) 和 [dataZoom-slider.endValue](~dataZoom-slider.endValue) 共同用 **绝对数值** 的形式定义了数据窗口范围。

注意，如果轴的类型为 `category`，则 `startValue` 既可以设置为 `axis.data` 数组的 `index`，也可以设置为数组值本身。
但是如果设置为数组值本身，会在内部自动转化为数组的 index。

关于坐标轴范围（axis extent）和 `dataZoom-slider.startValue` 的关系的更多信息，请参见：[dataZoom-slider.rangeMode](~dataZoom-slider.rangeMode)。

## endValue(number|string|Date) = null

数据窗口范围的结束数值。如果设置了 [dataZoom-slider.end](~dataZoom-slider.end) 则 `endValue` 失效。

[dataZoom-slider.startValue](~dataZoom-slider.startValue) 和 [dataZoom-slider.endValue](~dataZoom-slider.endValue) 共同用 **绝对数值** 的形式定义了数据窗口范围。

注意，如果轴的类型为 `category`，则 `endValue` 即可以设置为 `axis.data` 数组的 `index`，也可以设置为数组值本身。
但是如果设置为数组值本身，会在内部自动转化为数组的 index。

关于坐标轴范围（axis extent）和 `dataZoom-slider.endValue` 的关系的更多信息，请参见：[dataZoom-slider.rangeMode](~dataZoom-slider.rangeMode)。

## minSpan(number) = null

<ExampleUIControlNumber min="0" max="100" step="0.5" />

用于限制窗口大小的最小值（百分比值），取值范围是 `0` ~ `100`。

如果设置了 [dataZoom-slider.minValueSpan](~dataZoom-slider.minValueSpan) 则 `minSpan` 失效。

## maxSpan(number) = null

<ExampleUIControlNumber min="0" max="100" step="0.5" />

用于限制窗口大小的最大值（百分比值），取值范围是 `0` ~ `100`。

如果设置了 [dataZoom-slider.maxValueSpan](~dataZoom-slider.maxValueSpan) 则 `maxSpan` 失效。

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










## zlevel(number) = 0

所有图形的 zlevel 值。

`zlevel`用于 Canvas 分层，不同`zlevel`值的图形会放置在不同的 Canvas 中，Canvas 分层是一种常见的优化手段。我们可以把一些图形变化频繁（例如有动画）的组件设置成一个单独的`zlevel`。需要注意的是过多的 Canvas 会引起内存开销的增大，在手机端上需要谨慎使用以防崩溃。

`zlevel` 大的 Canvas 会放在 `zlevel` 小的 Canvas 的上面。

## z(number) = 2

组件的所有图形的`z`值。控制图形的前后顺序。`z`值小的图形会被`z`值大的图形覆盖。

`z`相比`zlevel`优先级更低，而且不会创建新的 Canvas。




## left(string|number) = 'auto'

<ExampleUIControlPercent default="0%"/>

dataZoom-slider组件离容器左侧的距离。

`left` 的值可以是像 `20` 这样的具体像素值，可以是像 `'20%'` 这样相对于容器高宽的百分比，也可以是 `'left'`, `'center'`, `'right'`。

如果 `left` 的值为`'left'`, `'center'`, `'right'`，组件会根据相应的位置自动对齐。

## top(string|number) = 'auto'

<ExampleUIControlPercent default="0%"/>

dataZoom-slider组件离容器上侧的距离。

`top` 的值可以是像 `20` 这样的具体像素值，可以是像 `'20%'` 这样相对于容器高宽的百分比，也可以是 `'top'`, `'middle'`, `'bottom'`。

如果 `top` 的值为`'top'`, `'middle'`, `'bottom'`，组件会根据相应的位置自动对齐。

## right(string|number) = 'auto'

<ExampleUIControlPercent default="0%"/>

dataZoom-slider组件离容器右侧的距离。

`right` 的值可以是像 `20` 这样的具体像素值，可以是像 `'20%'` 这样相对于容器高宽的百分比。

默认自适应。

## bottom(string|number) = 'auto'

<ExampleUIControlPercent default="0%"/>

dataZoom-slider组件离容器下侧的距离。

bottom 的值可以是像 `20` 这样的具体像素值，可以是像 `'20%'` 这样相对于容器高宽的百分比。

默认自适应。



## brushSelect(boolean) = true



> 从 `v5.0.0` 开始支持



是否开启刷选功能。在下图的 brush 区域你可以按住鼠标左键后框选出选中部分。

![600xauto](~dataZoom-zone.png)

## brushStyle(Object)



> 从 `v5.0.0` 开始支持



刷选框样式设置。



### color(Color) = rgba(135,175,274,0.15)

<ExampleUIControlColor />

图形的颜色。



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











## emphasis(Object)



> 从 `v5.0.0` 开始支持



高亮样式设置。

### handleStyle(Object)



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











### moveHandleStyle(Object)



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
