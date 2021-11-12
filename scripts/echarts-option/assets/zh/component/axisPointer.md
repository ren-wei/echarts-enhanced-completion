# axisPointer(Object)

这是坐标轴指示器（axisPointer）的全局公用设置。

<ExampleBaseOption name="axis-pointer" title="坐标轴指示器" title-en="Axis Pointer">
var base = +new Date(2016, 9, 3);
var oneDay = 24 * 3600 * 1000;
var valueBase = Math.random() * 300;
var valueBase2 = Math.random() * 50;
var data = [];
var data2 = [];

for (var i = 1; i < 10; i++) {
    var now = new Date(base += oneDay);
    var dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-');

    valueBase = Math.round((Math.random() - 0.5) * 20 + valueBase);
    valueBase <= 0 && (valueBase = Math.random() * 300);
    data.push([dayStr, valueBase]);

    valueBase2 = Math.round((Math.random() - 0.5) * 20 + valueBase2);
    valueBase2 <= 0 && (valueBase2 = Math.random() * 50);
    data2.push([dayStr, valueBase2]);
}

option = {
    legend: {
        top: 'bottom',
        data: ['意向']
    },
    tooltip: {
        triggerOn: 'none',
        position: function (pt) {
            return [pt[0], 130];
        }
    },
    xAxis: {
        type: 'time',
        // boundaryGap: [0, 0],
        axisPointer: {
            value: '2016-10-7',
            snap: true,
            label: {
                show: true,
                formatter: function (params) {
                    return echarts.format.formatTime('yyyy-MM-dd', params.value);
                }
            },
            handle: {
                show: true
            }
        },
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        axisTick: {
            inside: true
        },
        splitLine: {
            show: false
        },
        axisLabel: {
            inside: true,
            formatter: '{value}\n'
        },
        z: 10
    },
    grid: {
        top: 110,
        left: 15,
        right: 15,
        height: 160
    },
    series: [
        {
            name: '模拟数据',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            sampling: 'lttb',
            itemStyle: {
                color: '#8ec6ad'
            },
            stack: 'a',
            areaStyle: {
            },
            data: data
        },
        {
            name: '模拟数据',
            type: 'line',
            smooth: true,
            stack: 'a',
            symbol: 'circle',
            symbolSize: 5,
            sampling: 'lttb',
            itemStyle: {
                color: '#d68262'
            },
            areaStyle: {
            },
            data: data2
        }

    ]
};

</ExampleBaseOption>

---



坐标轴指示器是指示坐标轴当前刻度的工具。

如下例，鼠标悬浮到图上，可以出现标线和刻度文本。

~[600x450](doc-example/candlestick-axisPointer&edit=1&reset=1)

上例中，使用了 [axisPointer.link](~axisPointer.link) 来关联不同的坐标系中的 axisPointer。

坐标轴指示器也有适合触屏的交互方式，如下：

~[600x400](line-tooltip-touch&edit=1&reset=1)

坐标轴指示器在多轴的场景能起到辅助作用：

~[600x300](multiple-y-axis&edit=1&reset=1)
~[600x300](multiple-x-axis&edit=1&reset=1)



---

> **注意：**
> 一般来说，axisPointer 的具体配置项会配置在各个轴中（如 [xAxis.axisPointer](~xAxis.axisPointer)）或者 `tooltip` 中（如 [tooltip.axisPointer](~tooltip.axisPointer)）。

> 但是这几个选项只能配置在全局的 axisPointer 中：[axisPointer.triggerOn](~axisPointer.triggerOn)、[axisPointer.link](~axisPointer.link)。

---

**如何显示 axisPointer：**

直角坐标系 [grid](~grid)、极坐标系 [polar](~polar)、单轴坐标系 [single](~single) 中的每个轴都自己的 axisPointer。

他们的 axisPointer 默认不显示。有两种方法可以让他们显示：

+ 设置轴上的 `axisPointer.show`（例如 [xAxis.axisPointer.show](~xAxis.axisPointer.show)）为 `true`，则显示此轴的 axisPointer。

+ 设置 [tooltip.trigger](~tooltip.trigger) 设置为 `'axis'` 或者 [tooltip.axisPointer.type](~tooltip.axisPointer.type) 设置为 `'cross'`，则此时坐标系会自动选择显示哪个轴的 axisPointer，也可以使用 [tooltip.axisPointer.axis](~tooltip.axisPointer.axis) 改变这种选择。注意，轴上如果设置了 axisPointer，会覆盖此设置。

---

**如何显示 axisPointer 的 label：**

axisPointer 的 label 默认不显示（也就是默认只显示指示线），除非：

+ 设置轴上的 `axisPointer.label.show`（例如 [xAxis.axisPointer.label.show](~xAxis.axisPointer.show)）为 `true`，则显示此轴的 axisPointer 的 label。

+ 设置 [tooltip.axisPointer.type](~tooltip.axisPointer.type) 为 `'cross'` 时会自动显示 axisPointer 的 label。

---

**关于触屏的 axisPointer 的设置**

设置轴上的 `axisPointer.handle.show`（例如 [xAxis.axisPointer.handle.show](~xAxis.axisPointer.handle.show) 为 `true` 则会显示出此 axisPointer 的拖拽按钮。（polar 坐标系暂不支持此功能）。

**注意：**
如果发现此时 tooltip 效果不良好，可设置 [tooltip.triggerOn](~tooltip.triggerOn) 为 `'none'`（于是效果为：手指按住按钮则显示 tooltip，松开按钮则隐藏 tooltip），或者 [tooltip.alwaysShowContent](~tooltip.alwaysShowContent) 为 `true`（效果为 tooltip 一直显示）。

参见[例子](line-tooltip-touch&edit=1&reset=1)。

---

**自动吸附到数据（snap）**

对于数值轴、时间轴，如果开启了 [snap](~xAxis.axisPointer.snap)，则 axisPointer 会自动吸附到最近的点上。


---





---



## id(string)

组件 ID。默认不指定。指定则可用于在 option 或者 API 中引用组件。





## show(boolean) = false

<ExampleUIControlBoolean />

默认不显示。但是如果 [tooltip.trigger](~tooltip.trigger) 设置为 `'axis'` 或者 [tooltip.axisPointer.type](~tooltip.axisPointer.type) 设置为 `'cross'`，则自动显示 axisPointer。坐标系会自动选择显示显示哪个轴的 axisPointer，也可以使用 [tooltip.axisPointer.axis](~tooltip.axisPointer.axis) 改变这种选择。

## type(string) = 'line'

<ExampleUIControlEnum options="line,shadow,none" />

指示器类型。

可选

+ `'line'` 直线指示器

+ `'shadow'` 阴影指示器

+ `'none'` 无指示器



## snap(boolean)

坐标轴指示器是否自动吸附到点上。默认自动判断。

这个功能在数值轴和时间轴上比较有意义，可以自动寻找细小的数值点。

## z(number)

坐标轴指示器的 z 值。控制图形的前后顺序。`z`值小的图形会被`z`值大的图形覆盖。

## label(Object)

坐标轴指示器的文本标签。

### show(boolean) = false

是否显示文本标签。如果 [tooltip.axisPointer.type](~tooltip.axisPointer.type) 设置为 `'cross'` 则默认显示标签，否则默认不显示。

### precision(number|string) = 'auto'

文本标签中数值的小数点精度。默认根据当前轴的值自动判断。也可以指定如 `2` 表示保留两位小数。

### formatter(string|Function) = null

文本标签文字的格式化器。

如果为 `string`，可以是例如：`formatter: 'some text {value} some text`，其中 `{value}` 会被自动替换为轴的值。

如果为 `function`，可以是例如：

**参数：**

`{Object}` params: 含有：

`{Object}` params.value: 轴当前值，如果 axis.type 为 'category' 时，其值为 axis.data 里的数值。如果 axis.type 为 `'time'`，其值为时间戳。

`{Array.<Object>}` params.seriesData: 一个数组，是当前 axisPointer 最近的点的信息，每项内容为

`{string}` params.axisDimension: 轴的维度名，例如直角坐标系中是 `'x'`、`'y'`，极坐标系中是 `'radius'`、`'angle'`。

`{number}` params.axisIndex: 轴的 index，`0`、`1`、`2`、...



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





每项内容还包括轴的信息：

```js
{
    axisDim: 'x', // 'x', 'y', 'angle', 'radius', 'single'
    axisId: 'xxx',
    axisName: 'xxx',
    axisIndex: 3,
    axisValue: 121, // 当前 axisPointer 对应的 value。
    axisValueLabel: '文本'
}
```



**返回值：**

显示的 string。

例如：
```js
formatter: function (params) {
    // 假设此轴的 type 为 'time'。
    return 'some text' + echarts.format.formatTime(params.value);
}
```

### margin(boolean) = 3

label 距离轴的距离。







### color(Color) = '#fff'

<ExampleUIControlColor default="'#fff'" />

文字的颜色。



### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。





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











### padding(string|Array) = [5, 7, 5, 7]



<ExampleUIControlVector min="0" dims="T,R,B,L"  />

axisPointer内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。

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



### backgroundColor(string) = 'auto'

文本标签的背景颜色，默认是和 [axis.axisLine.lineStyle.color](~xAxis.axisLine.lineStyle.color) 相同。

### borderColor(string) = null

文本标签的边框颜色。

### borderWidth(string) = 0

文本标签的边框宽度。



### shadowBlur(number) = 3

<ExampleUIControlNumber default="3" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```



### shadowColor(Color) = #aaa

<ExampleUIControlColor default="#aaa" />

阴影颜色。支持的格式同`color`。



### shadowOffsetX(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影水平方向上的偏移距离。



### shadowOffsetY(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影垂直方向上的偏移距离。







## lineStyle(Object)

[axisPointer.type](~tooltip.axisPointer.type) 为 `'line'` 时有效。



### color(Color) =  #555 

<ExampleUIControlColor />

线的颜色。





> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)

### width(number) = 1

<ExampleUIControlNumber value="1" min="0" step="0.5" />

线宽。




### type(string|number|Array) = solid


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


### dashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`type`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



### cap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




### join(string) = bevel




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




### miterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`join`
 为 `miter` 时，
`miterLimit`
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











## shadowStyle(Object)

[axisPointer.type](~tooltip.axisPointer.type) 为 `'shadow'` 时有效。



### color(Color) =  \'rgba(150,150,150,0.3) 

<ExampleUIControlColor />

填充的颜色。



> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)









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













## triggerTooltip(boolean) = true

<ExampleUIControlBoolean default="true" />

是否触发 tooltip。如果不想触发 tooltip 可以关掉。

## value(number) = null

当前的 value。在使用 [axisPointer.handle](xAxisPointer.handle) 时，可以设置此值进行初始值设定，从而决定 axisPointer 的初始位置。

## status(boolean)

<ExampleUIControlEnum options="show,hide" />

当前的状态，可取值为 `'show'` 和 `'hide'`。

## handle(Object)

拖拽手柄，适用于触屏的环境。参见 [例子](line-tooltip-touch&edit=1&reset=1)。

### show(boolean) = false

<ExampleUIControlBoolean />

当 show 设为 `true` 时开启，这时显示手柄，并且 axisPointer 会一直显示。

### icon(*)

<ExampleUIControlIcon clean="true" />

手柄的图标。



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







参见 [使用图片的例子](doc-example/axisPointer-handle-image&edit=1&reset=1)

### size(number|Array) = 45

<ExampleUIControlVector default="45,45" min="0" step="0.5" dims="width,height" />

手柄的尺寸，可以设置单值，如 `45`，也可以设置为数组：`[width, height]`。

### margin(number) = 50

<ExampleUIControlNumber default="50" min="0" step="0.5" />

手柄与轴的距离。注意，这是手柄中心点和轴的距离。

### color(string) = '#333'

<ExampleUIControlColor />

手柄颜色。

### throttle(number) = 40

<ExampleUIControlNumber default="40" min="0" step="10" />

手柄拖拽时触发视图更新周期，单位毫秒，调大这个数值可以改善性能，但是降低体验。



### shadowBlur(number) = 3

<ExampleUIControlNumber default="3" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```



### shadowColor(Color) = #aaa

<ExampleUIControlColor default="#aaa" />

阴影颜色。支持的格式同`color`。



### shadowOffsetX(number) = 2

<ExampleUIControlNumber default="2" step="0.5" />

阴影水平方向上的偏移距离。



### shadowOffsetY(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影垂直方向上的偏移距离。











## link(Array)

不同轴的 axisPointer 可以进行联动，在这里设置。联动表示轴能同步一起活动。轴依据他们的 axisPointer 当前对应的值来联动。

联动的效果可以看这两个例子：[例子A](https://echarts.apache.org/examples/zh/view.html?c=candlestick-brush&edit=1&reset=1)，[例子B](https://echarts.apache.org/examples/zh/view.html?c=scatter-nutrients-matrix&edit=1&reset=1)。

link 是一个数组，其中每一项表示一个 link group，一个 group 中的坐标轴互相联动。例如：

```js
link: [
    {
        // 表示所有 xAxisIndex 为 0、3、4 和 yAxisName 为 'someName' 的坐标轴联动。
        xAxisIndex: [0, 3, 4],
        yAxisName: 'someName'
    },
    {
        // 表示左右 xAxisId 为 'aa'、'cc' 以及所有的 angleAxis 联动。
        xAxisId: ['aa', 'cc'],
        angleAxis: 'all'
    },
    ...
]
```

如上所示，每个 link group 中可以用这些方式引用坐标轴：

```js
{
    // 以下的 'some' 均表示轴的维度，也就是表示 'x', 'y', 'radius', 'angle', 'single'
    someAxisIndex: [...], // 可以是一个数组或单值或 'all'
    someAxisName: [...],  // 可以是一个数组或单值或 'all'
    someAxisId: [...],    // 可以是一个数组或单值或 'all'
}
```

---

**如何联动不同类型（[axis.type](~xAxis.type)）的轴？**

如果 axis 的类型不同，比如 axisA type 为 'category'，axisB type 为 'time'，可以在每个 link group 中写转换函数（mapper）来进行值的转换，例如：

```js
link: [{
    xAxisIndex: [0, 1],
    yAxisName: ['yy'],
    mapper: function (sourceVal, sourceAxisInfo, targetAxisInfo) {
        if (sourceAxisInfo.axisName === 'yy') {
            // from timestamp to '2012-02-05'
            return echarts.format.formatTime('yyyy-MM-dd', sourceVal);
        }
        else if (targetAxisInfo.axisName === 'yy') {
            // from '2012-02-05' to date
            return echarts.number.parseDate(dates[sourceVal]);
        }
        else {
            return sourceVal;
        }
    }
}]
```

mapper 的输入参数：

`{number}` sourceVal

`{Object}` sourceAxisInfo 里面包含 {axisDim, axisId, axisName, axisIndex} 等信息

`{Object}` targetAxisInfo 里面包含 {axisDim, axisId, axisName, axisIndex} 等信息

mapper 的返回值：

`{number}` 转换结果

## triggerOn(string) = 'mousemove|click'

<ExampleUIControlEnum options="mousemove,click,none" />

提示框触发的条件，可选：

+ `'mousemove'`

    鼠标移动时触发。

+ `'click'`

    鼠标点击时触发。

+ `'none'`

    不在 `'mousemove'` 或 `'click'` 时触发。
