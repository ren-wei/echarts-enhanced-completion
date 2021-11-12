# series.map(Object)

**地图。**

地图主要用于地理区域数据的可视化，配合 [visualMap](~visualMap) 组件用于展示不同区域的人口分布密度等数据。

多个[地图类型](~series-map.map)相同的系列会在同一地图上显示，这时候使用第一个系列的配置项作为地图绘制的配置。

**Tip: **在 ECharts 3 中不再建议在地图类型的图表使用 `markLine` 和 `markPoint`。如果要实现点数据或者线数据的可视化，可以使用在[地理坐标系组件](~geo)上的[散点图](~series-scatter)和[线图](~series-lines)。

## type(string) = 'map'



## id(string)

组件 ID。默认不指定。指定则可用于在 option 或者 API 中引用组件。





## name(string)

系列名称，用于[tooltip](~tooltip)的显示，[legend](~legend) 的图例筛选，在 `setOption` 更新数据和配置项时用于指定对应的系列。





## colorBy(string) = 'series'



> 从 `v5.2.0` 开始支持



从调色盘 [option.color](~color) 中取色的策略，可取值为：

+ `'series'`：按照系列分配调色盘中的颜色，同一系列中的所有数据都是用相同的颜色；
+ `'data'`：按照数据项分配调色盘中的颜色，每个数据项都使用不同的颜色。




## map(string) = ''

使用 [registerMap](api.html#echarts.registerMap) 注册的地图名称。


**geoJSON 引入示例**
```js
$.get('map/china_geo.json', function (geoJson) {
    echarts.registerMap('china', {geoJSON: geoJson});
    var chart = echarts.init(document.getElementById('main'));
    chart.setOption({
        series: [{
            type: 'map',
            map: 'china',
            ...
        }]
    });
});
```
也参见示例 [USA Population Estimates](map-usa)。


如上所示，ECharts 可以使用 [GeoJSON](http://geojson.org/) 格式的数据作为地图的轮廓，你可以获取第三方的 [GeoJSON](http://geojson.org/) 数据注册到 ECharts 中。例如第三方资源 [maps](https://github.com/echarts-maps)。


**SVG 引入示例**
```js
$.get('map/topographic_map.svg', function (svg) {
    echarts.registerMap('topo', {svg: svg});
    var chart = echarts.init(document.getElementById('main'));
    chart.setOption({
        series: [{
            type: 'map',
            map: 'topo',
            ...
        }]
    });
});
```
也参见示例 [Beef Cuts](geo-beef-cuts)。


如上所示，ECharts 也可以使用 SVG 格式的地图。详情参见：[SVG 底图](tutorial.html#%E5%9C%B0%E7%90%86%E5%9D%90%E6%A0%87%E7%B3%BB%E5%92%8C%E5%9C%B0%E5%9B%BE%E7%B3%BB%E5%88%97%E7%9A%84%20SVG%20%E5%BA%95%E5%9B%BE)。

## roam(boolean|string) = false



<ExampleUIControlEnum options="true,false,scale,move" />

是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 `'scale'` 或者 `'move'`。设置成 `true` 为都开启





## center(Array)

当前视角的中心点，用经纬度表示

例如：
```js
center: [115.97, 29.71]
```

## aspectScale(number) = 0.75

这个参数用于 scale 地图的长宽比。

最终的 `aspect` 的计算方式是：`geoBoundingRect.width / geoBoundingRect.height * aspectScale`

## boundingCoords(Array) = null

二维数组，定义定位的左上角以及右下角分别所对应的经纬度。例如
```js
// 设置为一张完整经纬度的世界地图
map: 'world',
left: 0, top: 0, right: 0, bottom: 0,
boundingCoords: [
    // 定位左上角经纬度
    [-180, 90],
    // 定位右下角经纬度
    [180, -90]
],
```

## zoom(number) = 1

当前视角的缩放比例。

## scaleLimit(Object)



滚轮缩放的极限控制，通过`min`, `max`最小和最大的缩放值，默认的缩放为`1`。

### min(number)

最小的缩放值

### max(number)

最大的缩放值



## nameMap(Object)

自定义地区的名称映射，如：
```js
{
    'China' : '中国'
}
```

## nameProperty(string) = 'name'



> 从 `v4.8.0` 开始支持



默认是 `'name'`，针对 GeoJSON 要素的自定义属性名称，作为主键用于关联数据点和 GeoJSON 地理要素。
例如：
```js
{
    nameProperty: 'NAME', // 数据点中的 name：Alabama 会关联到 GeoJSON 中 NAME 属性值为 Alabama 的地理要素{"type":"Feature","id":"01","properties":{"NAME":"Alabama"}, "geometry": { ... }}
    data:[
        {name: 'Alabama', value: 4822023},
        {name: 'Alaska', value: 731449},
    ]
}
```

## selectedMode(boolean|string) = false

选中模式，表示是否支持多个选中，默认关闭，支持布尔值和字符串，字符串取值可选`'single'`表示单选，或者`'multiple'`表示多选。

## label(Object)



图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。







### show(boolean) = false

<ExampleUIControlBoolean default="false" />

是否显示标签。


### position(string|Array) = 

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />



标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](doc-example/label-position)。





### distance(number) = 5

<ExampleUIControlNumber default="5" min="0" step="0.5" />

距离图形元素的距离。


当 position 为字符描述值（如 `'top'`、`'insideRight'`）时候有效。

参见：[label position](doc-example/label-position)。




### rotate(number) = 

<ExampleUIControlAngle default="0" min="-90" max="90" step="1" />

标签旋转。从 -90 度到 90 度。正值是逆时针。

参见：[label rotation](bar-label-rotation)。


### offset(Array)

<ExampleUIControlVector dims="x,y" step="0.5" separate="true" />

是否对文字进行偏移。默认不偏移。例如：`[30, 40]` 表示文字在横向上偏移 `30`，纵向上偏移 `40`。


### formatter(string|Function)



标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 `\n` 换行。

**字符串模板**
模板变量有：
+ `{a}`：系列名。
+ `{b}`：数据名。
+ `{c}`：数据值。
+ `{@xxx}`：数据中名为 `'xxx'` 的维度的值，如 `{@product}` 表示名为 `'product'` 的维度的值。
+ `{@[n]}`：数据中维度 `n` 的值，如 `{@[3]}` 表示维度 3 的值，从 0 开始计数。

**示例：**
```js
formatter: '{b}: {@score}'
```

**回调函数**

回调函数格式：
```js
(params: Object|Array) => string
```
参数 `params` 是 formatter 需要的单个数据集。格式如下：



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














### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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


### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




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




### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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









### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


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




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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


### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

#### <style_name>(Object)



##### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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

##### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


##### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





##### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




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




##### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






##### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






##### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




##### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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









##### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

##### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

##### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

##### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

##### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

##### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


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




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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















## itemStyle(Object)



地图区域的多边形 图形样式。





### areaColor(Color) = '#eee'

地图区域的颜色。



> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)



### color(Color) = 自适应

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

高亮状态下的多边形和标签样式。





### label(Object)



#### show(boolean) = false

<ExampleUIControlBoolean default="false" />

是否显示标签。


#### position(string|Array) = 

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />



标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](doc-example/label-position)。





#### distance(number) = 5

<ExampleUIControlNumber default="5" min="0" step="0.5" />

距离图形元素的距离。


当 position 为字符描述值（如 `'top'`、`'insideRight'`）时候有效。

参见：[label position](doc-example/label-position)。




#### rotate(number) = 

<ExampleUIControlAngle default="0" min="-90" max="90" step="1" />

标签旋转。从 -90 度到 90 度。正值是逆时针。

参见：[label rotation](bar-label-rotation)。


#### offset(Array)

<ExampleUIControlVector dims="x,y" step="0.5" separate="true" />

是否对文字进行偏移。默认不偏移。例如：`[30, 40]` 表示文字在横向上偏移 `30`，纵向上偏移 `40`。


#### formatter(string|Function)



标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 `\n` 换行。

**字符串模板**
模板变量有：
+ `{a}`：系列名。
+ `{b}`：数据名。
+ `{c}`：数据值。
+ `{@xxx}`：数据中名为 `'xxx'` 的维度的值，如 `{@product}` 表示名为 `'product'` 的维度的值。
+ `{@[n]}`：数据中维度 `n` 的值，如 `{@[3]}` 表示维度 3 的值，从 0 开始计数。

**示例：**
```js
formatter: '{b}: {@score}'
```

**回调函数**

回调函数格式：
```js
(params: Object|Array) => string
```
参数 `params` 是 formatter 需要的单个数据集。格式如下：



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














#### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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

#### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


#### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





#### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




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




#### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






#### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






#### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




#### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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









#### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

#### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

#### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

#### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

#### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

#### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


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




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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


#### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

##### <style_name>(Object)



###### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

###### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

###### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

###### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


###### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





###### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




###### lineHeight(number) = 

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




###### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




###### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


###### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









###### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

###### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

###### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

###### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

###### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

###### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


###### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

###### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

###### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




###### textBorderType(string|number|Array) = 'solid'


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


###### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









###### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

###### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

###### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

###### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。















### itemStyle(Object)

#### areaColor(Color) = '#eee'

地图区域的颜色。



> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)



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













## select(Object)

选中状态下的多边形和标签样式。



### label(Object)



#### show(boolean) = false

<ExampleUIControlBoolean default="false" />

是否显示标签。


#### position(string|Array) = 

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />



标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](doc-example/label-position)。





#### distance(number) = 5

<ExampleUIControlNumber default="5" min="0" step="0.5" />

距离图形元素的距离。


当 position 为字符描述值（如 `'top'`、`'insideRight'`）时候有效。

参见：[label position](doc-example/label-position)。




#### rotate(number) = 

<ExampleUIControlAngle default="0" min="-90" max="90" step="1" />

标签旋转。从 -90 度到 90 度。正值是逆时针。

参见：[label rotation](bar-label-rotation)。


#### offset(Array)

<ExampleUIControlVector dims="x,y" step="0.5" separate="true" />

是否对文字进行偏移。默认不偏移。例如：`[30, 40]` 表示文字在横向上偏移 `30`，纵向上偏移 `40`。


#### formatter(string|Function)



标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 `\n` 换行。

**字符串模板**
模板变量有：
+ `{a}`：系列名。
+ `{b}`：数据名。
+ `{c}`：数据值。
+ `{@xxx}`：数据中名为 `'xxx'` 的维度的值，如 `{@product}` 表示名为 `'product'` 的维度的值。
+ `{@[n]}`：数据中维度 `n` 的值，如 `{@[3]}` 表示维度 3 的值，从 0 开始计数。

**示例：**
```js
formatter: '{b}: {@score}'
```

**回调函数**

回调函数格式：
```js
(params: Object|Array) => string
```
参数 `params` 是 formatter 需要的单个数据集。格式如下：



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














#### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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

#### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


#### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





#### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




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




#### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






#### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






#### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




#### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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









#### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

#### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

#### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

#### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

#### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

#### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


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




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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


#### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

##### <style_name>(Object)



###### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

###### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

###### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

###### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


###### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





###### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




###### lineHeight(number) = 

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




###### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




###### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


###### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









###### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

###### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

###### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

###### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

###### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

###### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


###### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

###### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

###### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




###### textBorderType(string|number|Array) = 'solid'


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


###### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









###### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

###### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

###### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

###### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。















### itemStyle(Object)

#### areaColor(Color) = '#eee'

地图区域的颜色。



> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)



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




















## zlevel(number) = 0

所有图形的 zlevel 值。

`zlevel`用于 Canvas 分层，不同`zlevel`值的图形会放置在不同的 Canvas 中，Canvas 分层是一种常见的优化手段。我们可以把一些图形变化频繁（例如有动画）的组件设置成一个单独的`zlevel`。需要注意的是过多的 Canvas 会引起内存开销的增大，在手机端上需要谨慎使用以防崩溃。

`zlevel` 大的 Canvas 会放在 `zlevel` 小的 Canvas 的上面。

## z(number) = 2

组件的所有图形的`z`值。控制图形的前后顺序。`z`值小的图形会被`z`值大的图形覆盖。

`z`相比`zlevel`优先级更低，而且不会创建新的 Canvas。




## left(string|number) = 'auto'

<ExampleUIControlPercent default="0%"/>

组件离容器左侧的距离。

`left` 的值可以是像 `20` 这样的具体像素值，可以是像 `'20%'` 这样相对于容器高宽的百分比，也可以是 `'left'`, `'center'`, `'right'`。

如果 `left` 的值为`'left'`, `'center'`, `'right'`，组件会根据相应的位置自动对齐。

## top(string|number) = 'auto'

<ExampleUIControlPercent default="0%"/>

组件离容器上侧的距离。

`top` 的值可以是像 `20` 这样的具体像素值，可以是像 `'20%'` 这样相对于容器高宽的百分比，也可以是 `'top'`, `'middle'`, `'bottom'`。

如果 `top` 的值为`'top'`, `'middle'`, `'bottom'`，组件会根据相应的位置自动对齐。

## right(string|number) = 'auto'

<ExampleUIControlPercent default="0%"/>

组件离容器右侧的距离。

`right` 的值可以是像 `20` 这样的具体像素值，可以是像 `'20%'` 这样相对于容器高宽的百分比。

默认自适应。

## bottom(string|number) = 'auto'

<ExampleUIControlPercent default="0%"/>

组件离容器下侧的距离。

bottom 的值可以是像 `20` 这样的具体像素值，可以是像 `'20%'` 这样相对于容器高宽的百分比。

默认自适应。



## layoutCenter(Array) = null

`layoutCenter` 和 `layoutSize` 提供了除了 `left/right/top/bottom/width/height` 之外的布局手段。

在使用 `left/right/top/bottom/width/height` 的时候，可能很难在保持地图高宽比的情况下把地图放在某个盒形区域的正中间，并且保证不超出盒形的范围。此时可以通过 `layoutCenter` 属性定义地图中心在屏幕中的位置，`layoutSize` 定义地图的大小。如下示例

```js
layoutCenter: ['30%', '30%'],
// 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
layoutSize: 100
```

设置这两个值后 `left/right/top/bottom/width/height` 无效。

## layoutSize(number|string)

地图的大小，见 `layoutCenter`。支持相对于屏幕宽高的百分比或者绝对的像素大小。





## geoIndex(number) = null

默认情况下，map series 会自己生成内部专用的 `geo` 组件。但是也可以用这个 `geoIndex` 指定一个 [geo](~geo) 组件。这样的话，map 和 其他 series（例如散点图）就可以共享一个 [geo](~geo) 组件了。并且，[geo](~geo) 组件的颜色也可以被这个 map series 控制，从而用 [visualMap](~visualMap) 来更改。

当设定了 `geoIndex` 后，[series-map.map](~series-map.map) 属性，以及 [series-map.itemStyle](~series-map.itemStyle) 等样式配置不再起作用，而是采用 [geo](~geo) 中的相应属性。

## mapValueCalculation(string) = 'sum'

多个拥有相同[地图类型](~series-map.map)的系列会使用同一个地图展现，如果多个系列都在同一个区域有值，ECharts 会对这些值统计得到一个数据。这个配置项就是用于配置统计的方式，目前有：

+ `'sum'`   取和。
+ `'average'` 取平均值。
+ `'max'`   取最大值。
+ `'min'`   取最小值。

## showLegendSymbol(boolean)

在图例相应区域显示图例的颜色标识（系列标识的小圆点），存在 [legend](~legend) 组件时生效。

## roam(boolean|string) = false



<ExampleUIControlEnum options="true,false,scale,move" />

是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 `'scale'` 或者 `'move'`。设置成 `true` 为都开启







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













## data(Array)



地图系列中的数据内容数组。数组项可以为单个数值，如：
```js
[12, 34, 56, 10, 23]
```

如果需要在数据中加入其它维度给 [visualMap](~visualMap) 组件用来映射到颜色等其它图形属性。每个数据项也可以是数组，如：
```js
[[12, 14], [34, 50], [56, 30], [10, 15], [23, 10]]
```

这时候可以将每项数组中的第二个值指定给 [visualMap](~visualMap) 组件。


更多时候我们需要指定每个数据项的名称，这时候需要每个项为一个对象：
```js
[{
    // 数据项的名称
    name: '数据1',
    // 数据项值8
    value: 10
}, {
    name: '数据2',
    value: 20
}]
```

需要对个别内容指定进行个性化定义时：

```js
[{
    name: '数据1',
    value: 10
}, {
    // 数据项名称
    name: '数据2',
    value : 56,
    //自定义特殊 tooltip，仅对该数据项有效
    tooltip:{},
    //自定义特殊itemStyle，仅对该item有效
    itemStyle:{}
}]
```



### name(string)

数据所对应的地图区域的名称，例如 `'广东'`，`'浙江'`。

### value(number)

该区域的数据值。



### groupId(string)

该数据项的组 ID。组 ID 会被用于分类数据，并在全局过渡动画中决定如何进行合并和分裂动画。



### selected(boolean) = false

该区域是否选中。

### itemStyle(Object)

该数据所在区域的多边形样式设置

#### areaColor(Color)

地图区域的颜色。



> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)



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











### label(Object)



图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。







#### show(boolean) = false

<ExampleUIControlBoolean default="false" />

是否显示标签。


#### position(string|Array) = \'bottom\'

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />



标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](doc-example/label-position)。





#### distance(number) = 5

<ExampleUIControlNumber default="5" min="0" step="0.5" />

距离图形元素的距离。


当 position 为字符描述值（如 `'top'`、`'insideRight'`）时候有效。

参见：[label position](doc-example/label-position)。




#### rotate(number) = 

<ExampleUIControlAngle default="0" min="-90" max="90" step="1" />

标签旋转。从 -90 度到 90 度。正值是逆时针。

参见：[label rotation](bar-label-rotation)。


#### offset(Array)

<ExampleUIControlVector dims="x,y" step="0.5" separate="true" />

是否对文字进行偏移。默认不偏移。例如：`[30, 40]` 表示文字在横向上偏移 `30`，纵向上偏移 `40`。


#### formatter(string|Function)



标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 `\n` 换行。

**字符串模板**
模板变量有：
+ `{a}`：系列名。
+ `{b}`：数据名。
+ `{c}`：数据值。
+ `{@xxx}`：数据中名为 `'xxx'` 的维度的值，如 `{@product}` 表示名为 `'product'` 的维度的值。
+ `{@[n]}`：数据中维度 `n` 的值，如 `{@[3]}` 表示维度 3 的值，从 0 开始计数。

**示例：**
```js
formatter: '{b}: {@score}'
```

**回调函数**

回调函数格式：
```js
(params: Object|Array) => string
```
参数 `params` 是 formatter 需要的单个数据集。格式如下：



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














#### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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

#### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

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




#### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






#### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






#### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




#### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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









#### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

#### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

#### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

#### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

#### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

#### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


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




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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


#### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

##### <style_name>(Object)



###### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

###### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

###### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

###### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


###### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





###### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




###### lineHeight(number) = 

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




###### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




###### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


###### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









###### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

###### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

###### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

###### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

###### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

###### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


###### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

###### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

###### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




###### textBorderType(string|number|Array) = 'solid'


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


###### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









###### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

###### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

###### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

###### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。















### labelLine(Object)



标签的视觉引导线配置。







#### show(boolean)

<ExampleUIControlBoolean />

是否显示视觉引导线。


#### showAbove(boolean)

是否显示在图形上方。





#### length2(number)

<ExampleUIControlNumber default="15" min="0" step="1" />

视觉引导项第二段的长度。



#### smooth(boolean|number) = false

<ExampleUIControlBoolean />

是否平滑视觉引导线，默认不平滑，可以设置成 `true` 平滑显示，也可以设置为 0 到 1 的值，表示平滑程度。



#### minTurnAngle(number) = null

通过调整第二段线的长度，限制引导线两端之间最小的夹角，以防止过小的夹角导致显示不美观。

可以设置为 0 - 180 度。


#### lineStyle(Object)



##### color(Color) =  "#000" 

<ExampleUIControlColor />

线的颜色。





> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)

##### width(number) = 1

<ExampleUIControlNumber value="1" min="0" step="0.5" />

线宽。




##### type(string|number|Array) = 'solid'


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


##### dashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`type`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



##### cap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




##### join(string) = bevel




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




##### miterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`join`
 为 `miter` 时，
`miterLimit`
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













### emphasis(Object)

该数据所在区域的多边形高亮状态



#### itemStyle(Object)

##### areaColor(Color)

地图区域的颜色。



> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)



##### color(Color) = 自适应

<ExampleUIControlColor />

图形的颜色。从 5.2.0 开始支持在`emphasis`状态中支持设置为`'inherit'`取消高亮颜色。



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











#### label(Object)



##### show(boolean) = false

<ExampleUIControlBoolean default="false" />

是否显示标签。


##### position(string|Array) = 

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />



标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](doc-example/label-position)。





##### distance(number) = 5

<ExampleUIControlNumber default="5" min="0" step="0.5" />

距离图形元素的距离。


当 position 为字符描述值（如 `'top'`、`'insideRight'`）时候有效。

参见：[label position](doc-example/label-position)。




##### rotate(number) = 

<ExampleUIControlAngle default="0" min="-90" max="90" step="1" />

标签旋转。从 -90 度到 90 度。正值是逆时针。

参见：[label rotation](bar-label-rotation)。


##### offset(Array)

<ExampleUIControlVector dims="x,y" step="0.5" separate="true" />

是否对文字进行偏移。默认不偏移。例如：`[30, 40]` 表示文字在横向上偏移 `30`，纵向上偏移 `40`。


##### formatter(string|Function)



标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 `\n` 换行。

**字符串模板**
模板变量有：
+ `{a}`：系列名。
+ `{b}`：数据名。
+ `{c}`：数据值。
+ `{@xxx}`：数据中名为 `'xxx'` 的维度的值，如 `{@product}` 表示名为 `'product'` 的维度的值。
+ `{@[n]}`：数据中维度 `n` 的值，如 `{@[3]}` 表示维度 3 的值，从 0 开始计数。

**示例：**
```js
formatter: '{b}: {@score}'
```

**回调函数**

回调函数格式：
```js
(params: Object|Array) => string
```
参数 `params` 是 formatter 需要的单个数据集。格式如下：



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














##### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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

##### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

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




##### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






##### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






##### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




##### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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









##### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

##### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

##### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

##### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

##### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

##### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


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




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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


##### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

###### <style_name>(Object)



####### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

####### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

####### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

####### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


####### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





####### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




####### lineHeight(number) = 

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




####### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




####### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


####### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

####### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

####### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

####### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

####### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

####### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


####### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




####### textBorderType(string|number|Array) = 'solid'


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


####### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

####### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

####### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

####### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。















#### labelLine(Object)



标签的视觉引导线配置。







##### show(boolean)

<ExampleUIControlBoolean />

是否显示视觉引导线。











##### lineStyle(Object)



###### color(Color) =  "#000" 

<ExampleUIControlColor />

线的颜色。





> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)

###### width(number) = 1

<ExampleUIControlNumber value="1" min="0" step="0.5" />

线宽。




###### type(string|number|Array) = 'solid'


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


###### dashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`type`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



###### cap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




###### join(string) = bevel




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




###### miterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`join`
 为 `miter` 时，
`miterLimit`
 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。








###### shadowBlur(number) = 

<ExampleUIControlNumber default="" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```



###### shadowColor(Color) = 

<ExampleUIControlColor default="" />

阴影颜色。支持的格式同`color`。



###### shadowOffsetX(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影水平方向上的偏移距离。



###### shadowOffsetY(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影垂直方向上的偏移距离。









###### opacity(number) = 1

<ExampleUIControlNumber default="1" min="0" max="1" step="0.01" />

图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。















### select(Object)

该数据所在区域的多边形选中状态



#### itemStyle(Object)

##### areaColor(Color)

地图区域的颜色。



> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)



##### color(Color) = 自适应

<ExampleUIControlColor />

图形的颜色。从 5.2.0 开始支持在`emphasis`状态中支持设置为`'inherit'`取消高亮颜色。



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











#### label(Object)



##### show(boolean) = false

<ExampleUIControlBoolean default="false" />

是否显示标签。


##### position(string|Array) = 

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />



标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](doc-example/label-position)。





##### distance(number) = 5

<ExampleUIControlNumber default="5" min="0" step="0.5" />

距离图形元素的距离。


当 position 为字符描述值（如 `'top'`、`'insideRight'`）时候有效。

参见：[label position](doc-example/label-position)。




##### rotate(number) = 

<ExampleUIControlAngle default="0" min="-90" max="90" step="1" />

标签旋转。从 -90 度到 90 度。正值是逆时针。

参见：[label rotation](bar-label-rotation)。


##### offset(Array)

<ExampleUIControlVector dims="x,y" step="0.5" separate="true" />

是否对文字进行偏移。默认不偏移。例如：`[30, 40]` 表示文字在横向上偏移 `30`，纵向上偏移 `40`。


##### formatter(string|Function)



标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 `\n` 换行。

**字符串模板**
模板变量有：
+ `{a}`：系列名。
+ `{b}`：数据名。
+ `{c}`：数据值。
+ `{@xxx}`：数据中名为 `'xxx'` 的维度的值，如 `{@product}` 表示名为 `'product'` 的维度的值。
+ `{@[n]}`：数据中维度 `n` 的值，如 `{@[3]}` 表示维度 3 的值，从 0 开始计数。

**示例：**
```js
formatter: '{b}: {@score}'
```

**回调函数**

回调函数格式：
```js
(params: Object|Array) => string
```
参数 `params` 是 formatter 需要的单个数据集。格式如下：



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














##### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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

##### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

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




##### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






##### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






##### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




##### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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









##### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

##### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

##### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

##### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

##### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

##### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


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




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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


##### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

###### <style_name>(Object)



####### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

####### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

####### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

####### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


####### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





####### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




####### lineHeight(number) = 

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




####### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




####### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


####### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

####### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

####### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

####### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

####### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

####### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


####### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




####### textBorderType(string|number|Array) = 'solid'


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


####### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

####### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

####### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

####### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。















#### labelLine(Object)



标签的视觉引导线配置。







##### show(boolean)

<ExampleUIControlBoolean />

是否显示视觉引导线。











##### lineStyle(Object)



###### color(Color) =  "#000" 

<ExampleUIControlColor />

线的颜色。





> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)

###### width(number) = 1

<ExampleUIControlNumber value="1" min="0" step="0.5" />

线宽。




###### type(string|number|Array) = 'solid'


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


###### dashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`type`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



###### cap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




###### join(string) = bevel




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




###### miterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`join`
 为 `miter` 时，
`miterLimit`
 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。








###### shadowBlur(number) = 

<ExampleUIControlNumber default="" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```



###### shadowColor(Color) = 

<ExampleUIControlColor default="" />

阴影颜色。支持的格式同`color`。



###### shadowOffsetX(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影水平方向上的偏移距离。



###### shadowOffsetY(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影垂直方向上的偏移距离。









###### opacity(number) = 1

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











## markPoint(Object)

图表标注。



### symbol(string|Function) = \'pin\'

<ExampleUIControlIcon default="circle" />

标记的图形。



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












如果需要每个数据的图形不一样，可以设置为如下格式的回调函数：
```js
(value: Array|number, params: Object) => string
```
其中第一个参数 `value` 为 [data](~series-map.data) 中的数据值。第二个参数`params` 是其它的数据项参数。


### symbolSize(number|Array|Function) = 50

<ExampleUIControlNumber min="0" />

标记的大小，可以设置成诸如 `10` 这样单一的数字，也可以用数组分开表示宽和高，例如 `[20, 10]` 表示标记宽为`20`，高为`10`。


如果需要每个数据的图形大小不一样，可以设置为如下格式的回调函数：
```js
(value: Array|number, params: Object) => number|Array
```
其中第一个参数 `value` 为 [data](~series-map.data) 中的数据值。第二个参数`params` 是其它的数据项参数。


### symbolRotate(number|Function)

<ExampleUIControlAngle min="-180" max="180" step="1" />

标记的旋转角度（而非弧度）。正值表示逆时针旋转。注意在 `markLine` 中当 `symbol` 为 `'arrow'` 时会忽略 `symbolRotate` 强制设置为切线的角度。


如果需要每个数据的旋转角度不一样，可以设置为如下格式的回调函数：
```js
(value: Array|number, params: Object) => number
```
其中第一个参数 `value` 为 [data](~series-map.data) 中的数据值。第二个参数`params` 是其它的数据项参数。
> 从 4.8.0 开始支持回调函数。


### symbolKeepAspect(boolean) = false

<ExampleUIControlBoolean clean="true" />

如果 `symbol` 是 `path://` 的形式，是否在缩放时保持该图形的长宽比。

### symbolOffset(Array) = [0, 0]

<ExampleUIControlVector separate="true" dims="x,y" />

标记相对于原本位置的偏移。默认情况下，标记会居中置放在数据对应的位置，但是如果 symbol 是自定义的矢量路径或者图片，就有可能不希望 symbol 居中。这时候可以使用该配置项配置 symbol 相对于原本居中的偏移，可以是绝对的像素值，也可以是相对的百分比。

例如 `[0, '-50%']` 就是把自己向上移动了一半的位置，在 symbol 图形是气泡的时候可以让图形下端的箭头对准数据点。





### silent(boolean) = false

<ExampleUIControlBoolean />

图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。



### label(Object)

标注的文本。



#### show(boolean) = true

<ExampleUIControlBoolean default="true" />

是否显示标签。


#### position(string|Array) = \'inside\'

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />



标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](doc-example/label-position)。





#### distance(number) = 5

<ExampleUIControlNumber default="5" min="0" step="0.5" />

距离图形元素的距离。


当 position 为字符描述值（如 `'top'`、`'insideRight'`）时候有效。

参见：[label position](doc-example/label-position)。




#### rotate(number) = 

<ExampleUIControlAngle default="0" min="-90" max="90" step="1" />

标签旋转。从 -90 度到 90 度。正值是逆时针。

参见：[label rotation](bar-label-rotation)。


#### offset(Array)

<ExampleUIControlVector dims="x,y" step="0.5" separate="true" />

是否对文字进行偏移。默认不偏移。例如：`[30, 40]` 表示文字在横向上偏移 `30`，纵向上偏移 `40`。


#### formatter(string|Function)



标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 `\n` 换行。

**字符串模板**
模板变量有：
+ `{a}`：系列名。
+ `{b}`：数据名。
+ `{c}`：数据值。
+ `{@xxx}`：数据中名为 `'xxx'` 的维度的值，如 `{@product}` 表示名为 `'product'` 的维度的值。
+ `{@[n]}`：数据中维度 `n` 的值，如 `{@[3]}` 表示维度 3 的值，从 0 开始计数。

**示例：**
```js
formatter: '{b}: {@score}'
```

**回调函数**

回调函数格式：
```js
(params: Object|Array) => string
```
参数 `params` 是 formatter 需要的单个数据集。格式如下：



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














#### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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

#### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


#### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





#### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




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




#### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






#### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






#### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




#### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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









#### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

#### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

#### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

#### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

#### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

#### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


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




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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


#### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

##### <style_name>(Object)



###### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

###### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

###### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

###### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


###### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





###### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




###### lineHeight(number) = 

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




###### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




###### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


###### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









###### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

###### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

###### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

###### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

###### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

###### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


###### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

###### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

###### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




###### textBorderType(string|number|Array) = 'solid'


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


###### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









###### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

###### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

###### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

###### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。















### itemStyle(Object)

标注的样式。



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











### emphasis(Object)

标注的高亮样式。

#### label(Object)



##### show(boolean) = false

<ExampleUIControlBoolean default="false" />

是否显示标签。


##### position(string|Array) = 

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />



标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](doc-example/label-position)。





##### distance(number) = 5

<ExampleUIControlNumber default="5" min="0" step="0.5" />

距离图形元素的距离。


当 position 为字符描述值（如 `'top'`、`'insideRight'`）时候有效。

参见：[label position](doc-example/label-position)。




##### rotate(number) = 

<ExampleUIControlAngle default="0" min="-90" max="90" step="1" />

标签旋转。从 -90 度到 90 度。正值是逆时针。

参见：[label rotation](bar-label-rotation)。


##### offset(Array)

<ExampleUIControlVector dims="x,y" step="0.5" separate="true" />

是否对文字进行偏移。默认不偏移。例如：`[30, 40]` 表示文字在横向上偏移 `30`，纵向上偏移 `40`。


##### formatter(string|Function)



标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 `\n` 换行。

**字符串模板**
模板变量有：
+ `{a}`：系列名。
+ `{b}`：数据名。
+ `{c}`：数据值。
+ `{@xxx}`：数据中名为 `'xxx'` 的维度的值，如 `{@product}` 表示名为 `'product'` 的维度的值。
+ `{@[n]}`：数据中维度 `n` 的值，如 `{@[3]}` 表示维度 3 的值，从 0 开始计数。

**示例：**
```js
formatter: '{b}: {@score}'
```

**回调函数**

回调函数格式：
```js
(params: Object|Array) => string
```
参数 `params` 是 formatter 需要的单个数据集。格式如下：



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














##### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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

##### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


##### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





##### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




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




##### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






##### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






##### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




##### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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









##### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

##### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

##### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

##### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

##### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

##### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


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




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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


##### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

###### <style_name>(Object)



####### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

####### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

####### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

####### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


####### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





####### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




####### lineHeight(number) = 

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




####### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




####### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


####### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

####### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

####### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

####### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

####### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

####### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


####### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




####### textBorderType(string|number|Array) = 'solid'


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


####### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

####### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

####### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

####### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。















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











### blur(Object)



> 从 `v5.0.0` 开始支持



标注的淡出样式。淡出的规则跟随所在系列。

#### label(Object)



##### show(boolean) = false

<ExampleUIControlBoolean default="false" />

是否显示标签。


##### position(string|Array) = 

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />



标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](doc-example/label-position)。





##### distance(number) = 5

<ExampleUIControlNumber default="5" min="0" step="0.5" />

距离图形元素的距离。


当 position 为字符描述值（如 `'top'`、`'insideRight'`）时候有效。

参见：[label position](doc-example/label-position)。




##### rotate(number) = 

<ExampleUIControlAngle default="0" min="-90" max="90" step="1" />

标签旋转。从 -90 度到 90 度。正值是逆时针。

参见：[label rotation](bar-label-rotation)。


##### offset(Array)

<ExampleUIControlVector dims="x,y" step="0.5" separate="true" />

是否对文字进行偏移。默认不偏移。例如：`[30, 40]` 表示文字在横向上偏移 `30`，纵向上偏移 `40`。


##### formatter(string|Function)



标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 `\n` 换行。

**字符串模板**
模板变量有：
+ `{a}`：系列名。
+ `{b}`：数据名。
+ `{c}`：数据值。
+ `{@xxx}`：数据中名为 `'xxx'` 的维度的值，如 `{@product}` 表示名为 `'product'` 的维度的值。
+ `{@[n]}`：数据中维度 `n` 的值，如 `{@[3]}` 表示维度 3 的值，从 0 开始计数。

**示例：**
```js
formatter: '{b}: {@score}'
```

**回调函数**

回调函数格式：
```js
(params: Object|Array) => string
```
参数 `params` 是 formatter 需要的单个数据集。格式如下：



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














##### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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

##### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


##### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





##### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




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




##### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






##### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






##### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




##### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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









##### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

##### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

##### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

##### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

##### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

##### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


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




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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


##### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

###### <style_name>(Object)



####### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

####### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

####### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

####### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


####### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





####### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




####### lineHeight(number) = 

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




####### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




####### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


####### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

####### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

####### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

####### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

####### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

####### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


####### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




####### textBorderType(string|number|Array) = 'solid'


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


####### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

####### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

####### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

####### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。















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











### data(Array)

标注的数据数组。每个数组项是一个对象，有下面几种方式指定标注的位置。
1. 通过 [x](~series-map.markPoint.data.x), [y](~series-map.markPoint.data.y) 属性指定相对容器的屏幕坐标，单位像素，支持百分比。


2. 用 [coord](~series-map.markPoint.data.coord) 属性指定数据在相应坐标系上的坐标位置，单个维度支持设置 `'min'`, `'max'`, `'average'`。


当多个属性同时存在时，优先级按上述的顺序。

**示例：**
```js
data: [
    {
        name: '某个坐标',
        coord: [10, 20]
    }, {
        name: '固定 x 像素位置',
        yAxis: 10,
        x: '90%'
    }, 

    {
        name: '某个屏幕坐标',
        x: 100,
        y: 100
    }
]
```

#### name(string) = ''

标注名称。




#### valueIndex(number)

<ExampleUIControlNumber min="0" max="1" step="1"  />

在使用 [type](~series-map.markPoint.data.type) 时有效，用于指定在哪个维度上指定最大值最小值，可以是 `0`（xAxis, radiusAxis），`1`（yAxis, angleAxis），默认使用第一个数值轴所在的维度。

#### valueDim(string)

在使用 [type](~series-map.markPoint.data.type) 时有效，用于指定在哪个维度上指定最大值最小值。这可以是维度的直接名称，例如折线图时可以是`x`、`angle`等、candlestick 图时可以是`open`、`close`等维度名称。

#### coord(Array)

标注的坐标。坐标格式视系列的坐标系而定，可以是[直角坐标系](~grid)上的 `x`, `y`，也可以是[极坐标系](~polar)上的 `radius`, `angle`。例如 [121, 2323]、['aa', 998]。



**注：**对于 [axis.type](~xAixs.type) 为 `'category'` 类型的轴

+ 如果 coord 值为 `number`，则表示 [axis.data](~xAxis.data) 的 index。
+ 如果 coord 值为 `string`，则表示 [axis.data](~xAxis.data) 中具体的值。注意使用这种方式时，xAxis.data 不能写成 [number, number, ...]，而只能写成 [string, string, ...]，否则不能被 markPoint / markLine 用『具体值』索引到。

例如：
```javascript
{
    xAxis: {
        type: 'category',
        data: ['5', '6', '9', '13', '19', '33']
        // 注意这里不建议写成 [5, 6, 9, 13, 19, 33]，否则不能被 markPoint / markLine 用『具体值』索引到。
    },
    series: {
        type: 'line',
        data: [11, 22, 33, 44, 55, 66],
        markPoint: { // markLine 也是同理
            data: [{
                coord: [5, 33.4], // 其中 5 表示 xAxis.data[5]，即 '33' 这个元素。
                // coord: ['5', 33.4] // 其中 '5' 表示 xAxis.data中的 '5' 这个元素。
                                      // 注意，使用这种方式时，xAxis.data 不能写成 [number, number, ...]
                                      // 而只能写成 [string, string, ...]
            }]
        }
    }
}
```




#### x(number)

<ExampleUIControlPercent default="0" />

相对容器的屏幕 x 坐标，单位像素。

#### y(number)

<ExampleUIControlPercent default="0" />

相对容器的屏幕 y 坐标，单位像素。

#### value(number)

标注值，可以不设。



#### symbol(string) = 

<ExampleUIControlIcon default="circle" />

标记的图形。



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













#### symbolSize(number|Array) = 

<ExampleUIControlNumber min="0" />

标记的大小，可以设置成诸如 `10` 这样单一的数字，也可以用数组分开表示宽和高，例如 `[20, 10]` 表示标记宽为`20`，高为`10`。



#### symbolRotate(number)

<ExampleUIControlAngle min="-180" max="180" step="1" />

标记的旋转角度（而非弧度）。正值表示逆时针旋转。注意在 `markLine` 中当 `symbol` 为 `'arrow'` 时会忽略 `symbolRotate` 强制设置为切线的角度。



#### symbolKeepAspect(boolean) = false

<ExampleUIControlBoolean clean="true" />

如果 `symbol` 是 `path://` 的形式，是否在缩放时保持该图形的长宽比。

#### symbolOffset(Array) = [0, 0]

<ExampleUIControlVector separate="true" dims="x,y" />

标记相对于原本位置的偏移。默认情况下，标记会居中置放在数据对应的位置，但是如果 symbol 是自定义的矢量路径或者图片，就有可能不希望 symbol 居中。这时候可以使用该配置项配置 symbol 相对于原本居中的偏移，可以是绝对的像素值，也可以是相对的百分比。

例如 `[0, '-50%']` 就是把自己向上移动了一半的位置，在 symbol 图形是气泡的时候可以让图形下端的箭头对准数据点。



#### itemStyle(Object)

该标注的样式。



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











#### label(Object)



##### show(boolean) = false

<ExampleUIControlBoolean default="false" />

是否显示标签。


##### position(string|Array) = 

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />



标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](doc-example/label-position)。





##### distance(number) = 5

<ExampleUIControlNumber default="5" min="0" step="0.5" />

距离图形元素的距离。


当 position 为字符描述值（如 `'top'`、`'insideRight'`）时候有效。

参见：[label position](doc-example/label-position)。




##### rotate(number) = 

<ExampleUIControlAngle default="0" min="-90" max="90" step="1" />

标签旋转。从 -90 度到 90 度。正值是逆时针。

参见：[label rotation](bar-label-rotation)。


##### offset(Array)

<ExampleUIControlVector dims="x,y" step="0.5" separate="true" />

是否对文字进行偏移。默认不偏移。例如：`[30, 40]` 表示文字在横向上偏移 `30`，纵向上偏移 `40`。








##### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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

##### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


##### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





##### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




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




##### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






##### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






##### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




##### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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









##### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

##### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

##### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

##### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

##### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

##### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


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




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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


##### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

###### <style_name>(Object)



####### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

####### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

####### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

####### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


####### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





####### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




####### lineHeight(number) = 

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




####### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




####### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


####### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

####### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

####### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

####### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

####### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

####### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


####### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




####### textBorderType(string|number|Array) = 'solid'


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


####### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

####### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

####### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

####### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。















#### emphasis(Object)

##### label(Object)



###### show(boolean) = false

<ExampleUIControlBoolean default="false" />

是否显示标签。


###### position(string|Array) = 

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />



标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](doc-example/label-position)。





###### distance(number) = 5

<ExampleUIControlNumber default="5" min="0" step="0.5" />

距离图形元素的距离。


当 position 为字符描述值（如 `'top'`、`'insideRight'`）时候有效。

参见：[label position](doc-example/label-position)。




###### rotate(number) = 

<ExampleUIControlAngle default="0" min="-90" max="90" step="1" />

标签旋转。从 -90 度到 90 度。正值是逆时针。

参见：[label rotation](bar-label-rotation)。


###### offset(Array)

<ExampleUIControlVector dims="x,y" step="0.5" separate="true" />

是否对文字进行偏移。默认不偏移。例如：`[30, 40]` 表示文字在横向上偏移 `30`，纵向上偏移 `40`。








###### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

###### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

###### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

###### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


###### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





###### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




###### lineHeight(number) = 

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




###### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




###### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


###### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









###### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

###### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

###### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

###### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

###### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

###### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


###### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

###### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

###### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




###### textBorderType(string|number|Array) = 'solid'


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


###### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









###### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

###### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

###### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

###### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。





###### width(number)

<ExampleUIControlNumber default="100" min="1" max="500" step="1" />

文本显示宽度。

###### height(number)

<ExampleUIControlNumber default="50" min="1" max="500" step="1" />

文本显示高度。

###### overflow(string) = 'none'

<ExampleUIControlEnum options="truncate,break,breakAll" />

文字超出宽度是否截断或者换行。配置`width`时有效

+ `'truncate'` 截断，并在末尾显示`ellipsis`配置的文本，默认为`...`
+ `'break'` 换行
+ `'breakAll'` 换行，跟`'break'`不同的是，在英语等拉丁文中，`'breakAll'`还会强制单词内换行

###### ellipsis(string) = '...'

在`overflow`配置为`'truncate'`的时候，可以通过该属性配置末尾显示的文本。

###### lineOverflow(string) = 'none'

文本超出高度部分是否截断，配置`height`时有效。

+ `'truncate'` 在文本行数超出高度部分截断。


###### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

####### <style_name>(Object)



######## color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######## fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

######## fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

######## fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

######## fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


######## align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





######## verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




######## lineHeight(number) = 

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




######## backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######## borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######## borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




######## borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


######## borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######## borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

######## padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

######## shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

######## shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

######## shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

######## shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


######## width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######## height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######## textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######## textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




######## textBorderType(string|number|Array) = 'solid'


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


######## textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######## textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

######## textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

######## textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

######## textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。















##### itemStyle(Object)



###### color(Color) = 自适应

<ExampleUIControlColor />

图形的颜色。



> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)



###### borderColor(Color) = '#000'

<ExampleUIControlColor />

图形的描边颜色。支持的颜色格式同 `color`，不支持回调函数。

###### borderWidth(number) = 0

<ExampleUIControlNumber value="0" min="0" step="0.5" />

(${name} ? ${name} : "") + "描边线宽。为 0 时无描边。"




###### borderType(string|number|Array) = 'solid'



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


###### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



###### borderCap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




###### borderJoin(string) = bevel




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




###### borderMiterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`borderJoin`
 为 `miter` 时，
`borderMiterLimit`
 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。








###### shadowBlur(number) = 

<ExampleUIControlNumber default="" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```



###### shadowColor(Color) = 

<ExampleUIControlColor default="" />

阴影颜色。支持的格式同`color`。



###### shadowOffsetX(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影水平方向上的偏移距离。



###### shadowOffsetY(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影垂直方向上的偏移距离。









###### opacity(number) = 1

<ExampleUIControlNumber default="1" min="0" max="1" step="0.01" />

图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。













### animation(boolean) = true

<ExampleUIControlBoolean default="true" clean="true" />

是否开启动画。

### animationThreshold(number) = 2000

是否开启动画的阈值，当单个系列显示的图形数量大于这个阈值时会关闭动画。



### animationDuration(number|Function) = 1000

<ExampleUIControlNumber min="0" default="1000" step="20" clean="true" />

初始动画的时长，支持回调函数，可以通过每个数据返回不同的时长实现更戏剧的初始动画效果：

```js
animationDuration: function (idx) {
    // 越往后的数据时长越大
    return idx * 100;
}
```

### animationEasing(string) = cubicOut

<ExampleUIControlEnum options="linear,quadraticIn,quadraticOut,quadraticInOut,cubicIn,cubicOut,cubicInOut,quarticIn,quarticOut,quarticInOut,quinticIn,quinticOut,quinticInOut,sinusoidalIn,sinusoidalOut,sinusoidalInOut,exponentialIn,exponentialOut,exponentialInOut,circularIn,circularOut,circularInOut,elasticIn,elasticOut,elasticInOut,backIn,backOut,backInOut,bounceIn,bounceOut,bounceInOut" clean="true" />

初始动画的缓动效果。不同的缓动效果可以参考 [缓动示例](line-easing)。


### animationDelay(number|Function) = 0

初始动画的延迟，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更戏剧的初始动画效果。

如下示例：
```js
animationDelay: function (idx) {
    // 越往后的数据延迟越大
    return idx * 100;
}
```

也可以看[该示例](bar-animation-delay)




### animationDurationUpdate(number|Function) = 300

<ExampleUIControlNumber min="0" default="1000" step="20" />

数据更新动画的时长。

支持回调函数，可以通过每个数据返回不同的时长实现更戏剧的更新动画效果：

```js
animationDurationUpdate: function (idx) {
    // 越往后的数据时长越大
    return idx * 100;
}
```

### animationEasingUpdate(string) = cubicInOut

<ExampleUIControlEnum options="linear,quadraticIn,quadraticOut,quadraticInOut,cubicIn,cubicOut,cubicInOut,quarticIn,quarticOut,quarticInOut,quinticIn,quinticOut,quinticInOut,sinusoidalIn,sinusoidalOut,sinusoidalInOut,exponentialIn,exponentialOut,exponentialInOut,circularIn,circularOut,circularInOut,elasticIn,elasticOut,elasticInOut,backIn,backOut,backInOut,bounceIn,bounceOut,bounceInOut" />

数据更新动画的缓动效果。


### animationDelayUpdate(number|Function) = 0

数据更新动画的延迟，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更戏剧的更新动画效果。

如下示例：
```js
animationDelayUpdate: function (idx) {
    // 越往后的数据延迟越大
    return idx * 100;
}
```

也可以看[该示例](bar-animation-delay)






#### blur(Object)

##### label(Object)



###### show(boolean) = false

<ExampleUIControlBoolean default="false" />

是否显示标签。


###### position(string|Array) = 

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />



标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](doc-example/label-position)。





###### distance(number) = 5

<ExampleUIControlNumber default="5" min="0" step="0.5" />

距离图形元素的距离。


当 position 为字符描述值（如 `'top'`、`'insideRight'`）时候有效。

参见：[label position](doc-example/label-position)。




###### rotate(number) = 

<ExampleUIControlAngle default="0" min="-90" max="90" step="1" />

标签旋转。从 -90 度到 90 度。正值是逆时针。

参见：[label rotation](bar-label-rotation)。


###### offset(Array)

<ExampleUIControlVector dims="x,y" step="0.5" separate="true" />

是否对文字进行偏移。默认不偏移。例如：`[30, 40]` 表示文字在横向上偏移 `30`，纵向上偏移 `40`。








###### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

###### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

###### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

###### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


###### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





###### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




###### lineHeight(number) = 

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




###### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




###### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


###### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









###### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

###### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

###### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

###### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

###### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

###### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


###### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

###### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

###### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




###### textBorderType(string|number|Array) = 'solid'


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


###### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









###### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

###### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

###### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

###### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。





###### width(number)

<ExampleUIControlNumber default="100" min="1" max="500" step="1" />

文本显示宽度。

###### height(number)

<ExampleUIControlNumber default="50" min="1" max="500" step="1" />

文本显示高度。

###### overflow(string) = 'none'

<ExampleUIControlEnum options="truncate,break,breakAll" />

文字超出宽度是否截断或者换行。配置`width`时有效

+ `'truncate'` 截断，并在末尾显示`ellipsis`配置的文本，默认为`...`
+ `'break'` 换行
+ `'breakAll'` 换行，跟`'break'`不同的是，在英语等拉丁文中，`'breakAll'`还会强制单词内换行

###### ellipsis(string) = '...'

在`overflow`配置为`'truncate'`的时候，可以通过该属性配置末尾显示的文本。

###### lineOverflow(string) = 'none'

文本超出高度部分是否截断，配置`height`时有效。

+ `'truncate'` 在文本行数超出高度部分截断。


###### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

####### <style_name>(Object)



######## color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######## fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

######## fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

######## fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

######## fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


######## align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





######## verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




######## lineHeight(number) = 

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




######## backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######## borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######## borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




######## borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


######## borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######## borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

######## padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

######## shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

######## shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

######## shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

######## shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


######## width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######## height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######## textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######## textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




######## textBorderType(string|number|Array) = 'solid'


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


######## textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######## textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

######## textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

######## textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

######## textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。















##### itemStyle(Object)



###### color(Color) = 自适应

<ExampleUIControlColor />

图形的颜色。



> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)



###### borderColor(Color) = '#000'

<ExampleUIControlColor />

图形的描边颜色。支持的颜色格式同 `color`，不支持回调函数。

###### borderWidth(number) = 0

<ExampleUIControlNumber value="0" min="0" step="0.5" />

(${name} ? ${name} : "") + "描边线宽。为 0 时无描边。"




###### borderType(string|number|Array) = 'solid'



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


###### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



###### borderCap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




###### borderJoin(string) = bevel




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




###### borderMiterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`borderJoin`
 为 `miter` 时，
`borderMiterLimit`
 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。








###### shadowBlur(number) = 

<ExampleUIControlNumber default="" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```



###### shadowColor(Color) = 

<ExampleUIControlColor default="" />

阴影颜色。支持的格式同`color`。



###### shadowOffsetX(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影水平方向上的偏移距离。



###### shadowOffsetY(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影垂直方向上的偏移距离。









###### opacity(number) = 1

<ExampleUIControlNumber default="1" min="0" max="1" step="0.01" />

图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。













### animation(boolean) = true

<ExampleUIControlBoolean default="true" clean="true" />

是否开启动画。

### animationThreshold(number) = 2000

是否开启动画的阈值，当单个系列显示的图形数量大于这个阈值时会关闭动画。



### animationDuration(number|Function) = 1000

<ExampleUIControlNumber min="0" default="1000" step="20" clean="true" />

初始动画的时长，支持回调函数，可以通过每个数据返回不同的时长实现更戏剧的初始动画效果：

```js
animationDuration: function (idx) {
    // 越往后的数据时长越大
    return idx * 100;
}
```

### animationEasing(string) = cubicOut

<ExampleUIControlEnum options="linear,quadraticIn,quadraticOut,quadraticInOut,cubicIn,cubicOut,cubicInOut,quarticIn,quarticOut,quarticInOut,quinticIn,quinticOut,quinticInOut,sinusoidalIn,sinusoidalOut,sinusoidalInOut,exponentialIn,exponentialOut,exponentialInOut,circularIn,circularOut,circularInOut,elasticIn,elasticOut,elasticInOut,backIn,backOut,backInOut,bounceIn,bounceOut,bounceInOut" clean="true" />

初始动画的缓动效果。不同的缓动效果可以参考 [缓动示例](line-easing)。


### animationDelay(number|Function) = 0

初始动画的延迟，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更戏剧的初始动画效果。

如下示例：
```js
animationDelay: function (idx) {
    // 越往后的数据延迟越大
    return idx * 100;
}
```

也可以看[该示例](bar-animation-delay)




### animationDurationUpdate(number|Function) = 300

<ExampleUIControlNumber min="0" default="1000" step="20" />

数据更新动画的时长。

支持回调函数，可以通过每个数据返回不同的时长实现更戏剧的更新动画效果：

```js
animationDurationUpdate: function (idx) {
    // 越往后的数据时长越大
    return idx * 100;
}
```

### animationEasingUpdate(string) = cubicInOut

<ExampleUIControlEnum options="linear,quadraticIn,quadraticOut,quadraticInOut,cubicIn,cubicOut,cubicInOut,quarticIn,quarticOut,quarticInOut,quinticIn,quinticOut,quinticInOut,sinusoidalIn,sinusoidalOut,sinusoidalInOut,exponentialIn,exponentialOut,exponentialInOut,circularIn,circularOut,circularInOut,elasticIn,elasticOut,elasticInOut,backIn,backOut,backInOut,bounceIn,bounceOut,bounceInOut" />

数据更新动画的缓动效果。


### animationDelayUpdate(number|Function) = 0

数据更新动画的延迟，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更戏剧的更新动画效果。

如下示例：
```js
animationDelayUpdate: function (idx) {
    // 越往后的数据延迟越大
    return idx * 100;
}
```

也可以看[该示例](bar-animation-delay)










## markLine(Object)

图表标线。



### silent(boolean) = false

<ExampleUIControlBoolean />

图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。



### symbol(string|Array)

标线两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定，具体格式见 [data.symbol](~series-map.markLine.data.0.symbol)。

### symbolSize(number|Array)

标线两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定。

**注意：** 这里无法像一般的 `symbolSize` 那样通过数组分别指定高宽。

### precision(number) = 2

标线数值的精度，在显示平均值线的时候有用。

### label(Object)

标线的文本。



#### show(boolean) = true

是否显示标签。

#### position(string) = 'end'

标签位置，可选：
+ `'start'` 线的起始点。
+ `'middle'` 线的中点。
+ `'end'` 线的结束点。

4.7.0 版本起，支持更多标签位置：`'start'`, `'middle'`, `'end'`, `'insideStartTop'`, `'insideStartBottom'`, `'insideMiddleTop'`, `'insideMiddleBottom'`, `'insideEndTop'`, `'insideEndBottom'`。

其中，`'insideMiddleBottom'` 等同于 `'middle'`。具体位置参见下图。

文字与线的间距可以通过 [label.distance](~series-.markLine.label.distance) 调整。

~[800x500](bar-markline&reset=1&edit=1)

#### distance(number|Array)

标签与线之间的间距。如果是数组，第一项为横向间距，第二项为纵向间距。如果是数字，则表示横向纵向使用相同的间距。

#### formatter(string|Function)



标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 `\n` 换行。

**字符串模板**


**字符串模板**
模板变量有：
+ `{a}`：系列名。
+ `{b}`：数据名。
+ `{c}`：数据值。
+ `{d}`：百分比。
+ `{@xxx}`：数据中名为 `'xxx'` 的维度的值，如 `{@product}` 表示名为 `'product'` 的维度的值。
+ `{@[n]}`：数据中维度 `n` 的值，如 `{@[3]}` 表示维度 3 的值，从 0 开始计数。

**示例：**
```js
formatter: '{b}: {d}'
```

**回调函数**

回调函数格式：
```js
(params: Object|Array) => string
```
参数 `params` 是 formatter 需要的单个数据集。格式如下：



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











#### color(Color) = 

<ExampleUIControlColor default="" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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

#### fontSize(number) = 

<ExampleUIControlNumber default="" min="1" step="1" />

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




#### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






#### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






#### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




#### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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









#### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

#### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

#### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

#### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

#### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

#### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


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




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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


#### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

##### <style_name>(Object)



###### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

###### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

###### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

###### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


###### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





###### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




###### lineHeight(number) = 

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




###### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




###### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


###### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









###### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

###### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

###### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

###### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

###### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

###### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


###### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

###### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

###### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




###### textBorderType(string|number|Array) = 'solid'


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


###### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









###### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

###### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

###### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

###### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。














### lineStyle(Object)

标线的样式



#### color(Color) =  自适应 

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








#### curveness(number) = 0

<ExampleUIControlNumber min="0" max="1" step="0.01" default="0" />

边的曲度，支持从 0 到 1 的值，值越大曲度越大。




### emphasis(Object)

标线的高亮样式。

#### label(Object)



##### show(boolean) = true

是否显示标签。

##### position(string) = 'end'

标签位置，可选：
+ `'start'` 线的起始点。
+ `'middle'` 线的中点。
+ `'end'` 线的结束点。

4.7.0 版本起，支持更多标签位置：`'start'`, `'middle'`, `'end'`, `'insideStartTop'`, `'insideStartBottom'`, `'insideMiddleTop'`, `'insideMiddleBottom'`, `'insideEndTop'`, `'insideEndBottom'`。

其中，`'insideMiddleBottom'` 等同于 `'middle'`。具体位置参见下图。

文字与线的间距可以通过 [label.distance](~series-.markLine.label.distance) 调整。

~[800x500](bar-markline&reset=1&edit=1)

##### distance(number|Array)

标签与线之间的间距。如果是数组，第一项为横向间距，第二项为纵向间距。如果是数字，则表示横向纵向使用相同的间距。

##### formatter(string|Function)



标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 `\n` 换行。

**字符串模板**


**字符串模板**
模板变量有：
+ `{a}`：系列名。
+ `{b}`：数据名。
+ `{c}`：数据值。
+ `{d}`：百分比。
+ `{@xxx}`：数据中名为 `'xxx'` 的维度的值，如 `{@product}` 表示名为 `'product'` 的维度的值。
+ `{@[n]}`：数据中维度 `n` 的值，如 `{@[3]}` 表示维度 3 的值，从 0 开始计数。

**示例：**
```js
formatter: '{b}: {d}'
```

**回调函数**

回调函数格式：
```js
(params: Object|Array) => string
```
参数 `params` 是 formatter 需要的单个数据集。格式如下：



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











##### color(Color) = 

<ExampleUIControlColor default="" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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

##### fontSize(number) = 

<ExampleUIControlNumber default="" min="1" step="1" />

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




##### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






##### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






##### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




##### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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









##### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

##### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

##### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

##### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

##### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

##### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


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




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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


##### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

###### <style_name>(Object)



####### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

####### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

####### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

####### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


####### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





####### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




####### lineHeight(number) = 

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




####### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




####### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


####### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

####### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

####### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

####### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

####### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

####### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


####### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




####### textBorderType(string|number|Array) = 'solid'


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


####### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

####### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

####### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

####### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。














#### lineStyle(Object)



##### color(Color) =  "#000" 

<ExampleUIControlColor />

线的颜色。





> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)

##### width(number) = 1

<ExampleUIControlNumber value="1" min="0" step="0.5" />

线宽。




##### type(string|number|Array) = 'solid'


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


##### dashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`type`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



##### cap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




##### join(string) = bevel




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




##### miterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`join`
 为 `miter` 时，
`miterLimit`
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











### blur(Object)



> 从 `v5.0.0` 开始支持



标线的淡出样式。淡出的规则跟随所在系列。

#### label(Object)



##### show(boolean) = true

是否显示标签。

##### position(string) = 'end'

标签位置，可选：
+ `'start'` 线的起始点。
+ `'middle'` 线的中点。
+ `'end'` 线的结束点。

4.7.0 版本起，支持更多标签位置：`'start'`, `'middle'`, `'end'`, `'insideStartTop'`, `'insideStartBottom'`, `'insideMiddleTop'`, `'insideMiddleBottom'`, `'insideEndTop'`, `'insideEndBottom'`。

其中，`'insideMiddleBottom'` 等同于 `'middle'`。具体位置参见下图。

文字与线的间距可以通过 [label.distance](~series-.markLine.label.distance) 调整。

~[800x500](bar-markline&reset=1&edit=1)

##### distance(number|Array)

标签与线之间的间距。如果是数组，第一项为横向间距，第二项为纵向间距。如果是数字，则表示横向纵向使用相同的间距。

##### formatter(string|Function)



标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 `\n` 换行。

**字符串模板**


**字符串模板**
模板变量有：
+ `{a}`：系列名。
+ `{b}`：数据名。
+ `{c}`：数据值。
+ `{d}`：百分比。
+ `{@xxx}`：数据中名为 `'xxx'` 的维度的值，如 `{@product}` 表示名为 `'product'` 的维度的值。
+ `{@[n]}`：数据中维度 `n` 的值，如 `{@[3]}` 表示维度 3 的值，从 0 开始计数。

**示例：**
```js
formatter: '{b}: {d}'
```

**回调函数**

回调函数格式：
```js
(params: Object|Array) => string
```
参数 `params` 是 formatter 需要的单个数据集。格式如下：



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











##### color(Color) = 

<ExampleUIControlColor default="" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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

##### fontSize(number) = 

<ExampleUIControlNumber default="" min="1" step="1" />

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




##### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






##### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






##### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




##### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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









##### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

##### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

##### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

##### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

##### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

##### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


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




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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


##### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

###### <style_name>(Object)



####### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

####### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

####### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

####### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


####### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





####### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




####### lineHeight(number) = 

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




####### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




####### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


####### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

####### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

####### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

####### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

####### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

####### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


####### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




####### textBorderType(string|number|Array) = 'solid'


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


####### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

####### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

####### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

####### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。














#### lineStyle(Object)



##### color(Color) =  "#000" 

<ExampleUIControlColor />

线的颜色。





> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)

##### width(number) = 1

<ExampleUIControlNumber value="1" min="0" step="0.5" />

线宽。




##### type(string|number|Array) = 'solid'


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


##### dashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`type`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



##### cap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




##### join(string) = bevel




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




##### miterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`join`
 为 `miter` 时，
`miterLimit`
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











### data(*)

标线的数据数组。每个数组项可以是一个两个值的数组，分别表示线的起点和终点，每一项是一个对象，有下面几种方式指定起点或终点的位置。
1. 通过 [x](~series-map.markLine.data.0.x), [y](~series-map.markLine.data.0.y) 属性指定相对容器的屏幕坐标，单位像素，支持百分比。


2. 用 [coord](~series-map.markLine.data.0.coord) 属性指定数据在相应坐标系上的坐标位置，单个维度支持设置 `'min'`, `'max'`, `'average'`。


当多个属性同时存在时，优先级按上述的顺序。



```
data: [

[
        {
            name: '两个坐标之间的标线',
            coord: [10, 20]
        },
        {
            coord: [20, 30]
        }
    ], [{
        // 固定起点的 x 像素位置，用于模拟一条指向最大值的水平线
        yAxis: 'max',
        x: '90%'
    }, {
        type: 'max'
    }],
[
        {
            name: '两个屏幕坐标之间的标线',
            x: 100,
            y: 100
        },
        {
            x: 500,
            y: 200
        }
    ]
]
```

#### 0(Object)

起点的数据。






##### valueIndex(number)

<ExampleUIControlNumber min="0" max="1" step="1"  />

在使用 [type](~series-map.markLine.data.type) 时有效，用于指定在哪个维度上指定最大值最小值，可以是 `0`（xAxis, radiusAxis），`1`（yAxis, angleAxis），默认使用第一个数值轴所在的维度。

##### valueDim(string)

在使用 [type](~series-map.markLine.data.type) 时有效，用于指定在哪个维度上指定最大值最小值。这可以是维度的直接名称，例如折线图时可以是`x`、`angle`等、candlestick 图时可以是`open`、`close`等维度名称。

##### coord(Array)

起点或终点的坐标。坐标格式视系列的坐标系而定，可以是[直角坐标系](~grid)上的 `x`, `y`，也可以是[极坐标系](~polar)上的 `radius`, `angle`。



**注：**对于 [axis.type](~xAixs.type) 为 `'category'` 类型的轴

+ 如果 coord 值为 `number`，则表示 [axis.data](~xAxis.data) 的 index。
+ 如果 coord 值为 `string`，则表示 [axis.data](~xAxis.data) 中具体的值。注意使用这种方式时，xAxis.data 不能写成 [number, number, ...]，而只能写成 [string, string, ...]，否则不能被 markPoint / markLine 用『具体值』索引到。

例如：
```javascript
{
    xAxis: {
        type: 'category',
        data: ['5', '6', '9', '13', '19', '33']
        // 注意这里不建议写成 [5, 6, 9, 13, 19, 33]，否则不能被 markPoint / markLine 用『具体值』索引到。
    },
    series: {
        type: 'line',
        data: [11, 22, 33, 44, 55, 66],
        markPoint: { // markLine 也是同理
            data: [{
                coord: [5, 33.4], // 其中 5 表示 xAxis.data[5]，即 '33' 这个元素。
                // coord: ['5', 33.4] // 其中 '5' 表示 xAxis.data中的 '5' 这个元素。
                                      // 注意，使用这种方式时，xAxis.data 不能写成 [number, number, ...]
                                      // 而只能写成 [string, string, ...]
            }]
        }
    }
}
```




##### name(string) = '起点'

标注名称，将会作为文字显示。

##### x(number)

<ExampleUIControlPercent default="0" />

相对容器的屏幕 x 坐标，单位像素。

##### y(number)

<ExampleUIControlPercent default="0" />

相对容器的屏幕 y 坐标，单位像素。

##### xAxis(number|string)

x 值为给定值的标记线，仅对数据值是一项的设置有效。例如：

```
data: [{
    name: 'X 轴值为 100 的竖直线',
    xAxis: 100
}]
```

或对于 `'time'` 类型的 xAxis，可以设置为：

```
{
    name: 'X 轴值为 "2020-01-01" 的竖直线',
    xAxis: '2020-01-01'
}]
```

##### yAxis(number|string)

Y 值为给定值的标记线，仅对数据值是一项的设置有效。例如：

```
data: [{
    name: 'Y 轴值为 100 的水平线',
    yAxis: 100
}]
```

或对于 `'time'` 类型的 yAxis，可以设置为：

```
{
    name: 'Y 轴值为 "2020-01-01" 的水平线',
    yAxis: '2020-01-01'
}]
```

##### value(number)

标注值，可以不设。



##### symbol(string) = 

<ExampleUIControlIcon default="circle" />

0标记的图形。



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













##### symbolSize(number|Array) = 

<ExampleUIControlNumber min="0" />

0标记的大小，可以设置成诸如 `10` 这样单一的数字，也可以用数组分开表示宽和高，例如 `[20, 10]` 表示标记宽为`20`，高为`10`。



##### symbolRotate(number)

<ExampleUIControlAngle min="-180" max="180" step="1" />

0标记的旋转角度（而非弧度）。正值表示逆时针旋转。注意在 `markLine` 中当 `symbol` 为 `'arrow'` 时会忽略 `symbolRotate` 强制设置为切线的角度。



##### symbolKeepAspect(boolean) = false

<ExampleUIControlBoolean clean="true" />

如果 `symbol` 是 `path://` 的形式，是否在缩放时保持该图形的长宽比。

##### symbolOffset(Array) = [0, 0]

<ExampleUIControlVector separate="true" dims="x,y" />

0标记相对于原本位置的偏移。默认情况下，标记会居中置放在数据对应的位置，但是如果 symbol 是自定义的矢量路径或者图片，就有可能不希望 symbol 居中。这时候可以使用该配置项配置 symbol 相对于原本居中的偏移，可以是绝对的像素值，也可以是相对的百分比。

例如 `[0, '-50%']` 就是把自己向上移动了一半的位置，在 symbol 图形是气泡的时候可以让图形下端的箭头对准数据点。



##### lineStyle(Object)

该数据项线的样式，起点和终点项的 `lineStyle`会合并到一起。



###### color(Color) =  "#000" 

<ExampleUIControlColor />

线的颜色。





> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)

###### width(number) = 1

<ExampleUIControlNumber value="1" min="0" step="0.5" />

线宽。




###### type(string|number|Array) = 'solid'


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


###### dashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`type`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



###### cap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




###### join(string) = bevel




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




###### miterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`join`
 为 `miter` 时，
`miterLimit`
 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。








###### shadowBlur(number) = 

<ExampleUIControlNumber default="" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```



###### shadowColor(Color) = 

<ExampleUIControlColor default="" />

阴影颜色。支持的格式同`color`。



###### shadowOffsetX(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影水平方向上的偏移距离。



###### shadowOffsetY(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影垂直方向上的偏移距离。









###### opacity(number) = 1

<ExampleUIControlNumber default="1" min="0" max="1" step="0.01" />

图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。








###### curveness(number) = 0

<ExampleUIControlNumber min="0" max="1" step="0.01" default="0" />

边的曲度，支持从 0 到 1 的值，值越大曲度越大。




##### label(Object)

该数据项标签的样式，起点和终点项的 `label`会合并到一起。



###### show(boolean) = true

是否显示标签。

###### position(string) = 'end'

标签位置，可选：
+ `'start'` 线的起始点。
+ `'middle'` 线的中点。
+ `'end'` 线的结束点。

4.7.0 版本起，支持更多标签位置：`'start'`, `'middle'`, `'end'`, `'insideStartTop'`, `'insideStartBottom'`, `'insideMiddleTop'`, `'insideMiddleBottom'`, `'insideEndTop'`, `'insideEndBottom'`。

其中，`'insideMiddleBottom'` 等同于 `'middle'`。具体位置参见下图。

文字与线的间距可以通过 [label.distance](~series-.markLine.label.distance) 调整。

~[800x500](bar-markline&reset=1&edit=1)

###### distance(number|Array)

标签与线之间的间距。如果是数组，第一项为横向间距，第二项为纵向间距。如果是数字，则表示横向纵向使用相同的间距。

###### formatter(string|Function)



标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 `\n` 换行。

**字符串模板**


**字符串模板**
模板变量有：
+ `{a}`：系列名。
+ `{b}`：数据名。
+ `{c}`：数据值。
+ `{d}`：百分比。
+ `{@xxx}`：数据中名为 `'xxx'` 的维度的值，如 `{@product}` 表示名为 `'product'` 的维度的值。
+ `{@[n]}`：数据中维度 `n` 的值，如 `{@[3]}` 表示维度 3 的值，从 0 开始计数。

**示例：**
```js
formatter: '{b}: {d}'
```

**回调函数**

回调函数格式：
```js
(params: Object|Array) => string
```
参数 `params` 是 formatter 需要的单个数据集。格式如下：



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











###### color(Color) = 

<ExampleUIControlColor default="" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

###### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

###### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

###### fontSize(number) = 

<ExampleUIControlNumber default="" min="1" step="1" />

文字的字体大小。





###### lineHeight(number) = 

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




###### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




###### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


###### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









###### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

###### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

###### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

###### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

###### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

###### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


###### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

###### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

###### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




###### textBorderType(string|number|Array) = 'solid'


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


###### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









###### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

###### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

###### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

###### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。





###### width(number)

<ExampleUIControlNumber default="100" min="1" max="500" step="1" />

文本显示宽度。

###### height(number)

<ExampleUIControlNumber default="50" min="1" max="500" step="1" />

文本显示高度。

###### overflow(string) = 'none'

<ExampleUIControlEnum options="truncate,break,breakAll" />

文字超出宽度是否截断或者换行。配置`width`时有效

+ `'truncate'` 截断，并在末尾显示`ellipsis`配置的文本，默认为`...`
+ `'break'` 换行
+ `'breakAll'` 换行，跟`'break'`不同的是，在英语等拉丁文中，`'breakAll'`还会强制单词内换行

###### ellipsis(string) = '...'

在`overflow`配置为`'truncate'`的时候，可以通过该属性配置末尾显示的文本。

###### lineOverflow(string) = 'none'

文本超出高度部分是否截断，配置`height`时有效。

+ `'truncate'` 在文本行数超出高度部分截断。


###### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

####### <style_name>(Object)



######## color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######## fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

######## fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

######## fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

######## fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


######## align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





######## verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




######## lineHeight(number) = 

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




######## backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######## borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######## borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




######## borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


######## borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######## borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

######## padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

######## shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

######## shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

######## shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

######## shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


######## width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######## height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######## textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######## textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




######## textBorderType(string|number|Array) = 'solid'


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


######## textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######## textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

######## textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

######## textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

######## textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。














##### emphasis(Object)

###### lineStyle(Object)



####### color(Color) =  "#000" 

<ExampleUIControlColor />

线的颜色。





> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)

####### width(number) = 1

<ExampleUIControlNumber value="1" min="0" step="0.5" />

线宽。




####### type(string|number|Array) = 'solid'


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


####### dashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`type`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



####### cap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




####### join(string) = bevel




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




####### miterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`join`
 为 `miter` 时，
`miterLimit`
 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。








####### shadowBlur(number) = 

<ExampleUIControlNumber default="" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```



####### shadowColor(Color) = 

<ExampleUIControlColor default="" />

阴影颜色。支持的格式同`color`。



####### shadowOffsetX(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影水平方向上的偏移距离。



####### shadowOffsetY(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影垂直方向上的偏移距离。









####### opacity(number) = 1

<ExampleUIControlNumber default="1" min="0" max="1" step="0.01" />

图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。








####### curveness(number) = 0

<ExampleUIControlNumber min="0" max="1" step="0.01" default="0" />

边的曲度，支持从 0 到 1 的值，值越大曲度越大。




###### label(Object)



####### show(boolean) = true

是否显示标签。

####### position(string) = 'end'

标签位置，可选：
+ `'start'` 线的起始点。
+ `'middle'` 线的中点。
+ `'end'` 线的结束点。

4.7.0 版本起，支持更多标签位置：`'start'`, `'middle'`, `'end'`, `'insideStartTop'`, `'insideStartBottom'`, `'insideMiddleTop'`, `'insideMiddleBottom'`, `'insideEndTop'`, `'insideEndBottom'`。

其中，`'insideMiddleBottom'` 等同于 `'middle'`。具体位置参见下图。

文字与线的间距可以通过 [label.distance](~series-.markLine.label.distance) 调整。

~[800x500](bar-markline&reset=1&edit=1)

####### distance(number|Array)

标签与线之间的间距。如果是数组，第一项为横向间距，第二项为纵向间距。如果是数字，则表示横向纵向使用相同的间距。

####### formatter(string|Function)



标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 `\n` 换行。

**字符串模板**


**字符串模板**
模板变量有：
+ `{a}`：系列名。
+ `{b}`：数据名。
+ `{c}`：数据值。
+ `{d}`：百分比。
+ `{@xxx}`：数据中名为 `'xxx'` 的维度的值，如 `{@product}` 表示名为 `'product'` 的维度的值。
+ `{@[n]}`：数据中维度 `n` 的值，如 `{@[3]}` 表示维度 3 的值，从 0 开始计数。

**示例：**
```js
formatter: '{b}: {d}'
```

**回调函数**

回调函数格式：
```js
(params: Object|Array) => string
```
参数 `params` 是 formatter 需要的单个数据集。格式如下：



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











####### color(Color) = 

<ExampleUIControlColor default="" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

####### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

####### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

####### fontSize(number) = 

<ExampleUIControlNumber default="" min="1" step="1" />

文字的字体大小。





####### lineHeight(number) = 

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




####### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




####### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


####### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

####### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

####### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

####### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

####### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

####### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


####### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




####### textBorderType(string|number|Array) = 'solid'


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


####### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

####### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

####### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

####### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。





####### width(number)

<ExampleUIControlNumber default="100" min="1" max="500" step="1" />

文本显示宽度。

####### height(number)

<ExampleUIControlNumber default="50" min="1" max="500" step="1" />

文本显示高度。

####### overflow(string) = 'none'

<ExampleUIControlEnum options="truncate,break,breakAll" />

文字超出宽度是否截断或者换行。配置`width`时有效

+ `'truncate'` 截断，并在末尾显示`ellipsis`配置的文本，默认为`...`
+ `'break'` 换行
+ `'breakAll'` 换行，跟`'break'`不同的是，在英语等拉丁文中，`'breakAll'`还会强制单词内换行

####### ellipsis(string) = '...'

在`overflow`配置为`'truncate'`的时候，可以通过该属性配置末尾显示的文本。

####### lineOverflow(string) = 'none'

文本超出高度部分是否截断，配置`height`时有效。

+ `'truncate'` 在文本行数超出高度部分截断。


####### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

######## <style_name>(Object)



######### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

######### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

######### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

######### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


######### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





######### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




######### lineHeight(number) = 

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




######### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




######### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


######### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

######### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

######### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

######### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

######### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

######### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


######### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




######### textBorderType(string|number|Array) = 'solid'


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


######### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

######### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

######### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

######### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。














##### blur(Object)



> 从 `v5.0.0` 开始支持



###### lineStyle(Object)



####### color(Color) =  "#000" 

<ExampleUIControlColor />

线的颜色。





> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)

####### width(number) = 1

<ExampleUIControlNumber value="1" min="0" step="0.5" />

线宽。




####### type(string|number|Array) = 'solid'


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


####### dashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`type`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



####### cap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




####### join(string) = bevel




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




####### miterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`join`
 为 `miter` 时，
`miterLimit`
 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。








####### shadowBlur(number) = 

<ExampleUIControlNumber default="" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```



####### shadowColor(Color) = 

<ExampleUIControlColor default="" />

阴影颜色。支持的格式同`color`。



####### shadowOffsetX(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影水平方向上的偏移距离。



####### shadowOffsetY(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影垂直方向上的偏移距离。









####### opacity(number) = 1

<ExampleUIControlNumber default="1" min="0" max="1" step="0.01" />

图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。








####### curveness(number) = 0

<ExampleUIControlNumber min="0" max="1" step="0.01" default="0" />

边的曲度，支持从 0 到 1 的值，值越大曲度越大。




###### label(Object)



####### show(boolean) = true

是否显示标签。

####### position(string) = 'end'

标签位置，可选：
+ `'start'` 线的起始点。
+ `'middle'` 线的中点。
+ `'end'` 线的结束点。

4.7.0 版本起，支持更多标签位置：`'start'`, `'middle'`, `'end'`, `'insideStartTop'`, `'insideStartBottom'`, `'insideMiddleTop'`, `'insideMiddleBottom'`, `'insideEndTop'`, `'insideEndBottom'`。

其中，`'insideMiddleBottom'` 等同于 `'middle'`。具体位置参见下图。

文字与线的间距可以通过 [label.distance](~series-.markLine.label.distance) 调整。

~[800x500](bar-markline&reset=1&edit=1)

####### distance(number|Array)

标签与线之间的间距。如果是数组，第一项为横向间距，第二项为纵向间距。如果是数字，则表示横向纵向使用相同的间距。

####### formatter(string|Function)



标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 `\n` 换行。

**字符串模板**


**字符串模板**
模板变量有：
+ `{a}`：系列名。
+ `{b}`：数据名。
+ `{c}`：数据值。
+ `{d}`：百分比。
+ `{@xxx}`：数据中名为 `'xxx'` 的维度的值，如 `{@product}` 表示名为 `'product'` 的维度的值。
+ `{@[n]}`：数据中维度 `n` 的值，如 `{@[3]}` 表示维度 3 的值，从 0 开始计数。

**示例：**
```js
formatter: '{b}: {d}'
```

**回调函数**

回调函数格式：
```js
(params: Object|Array) => string
```
参数 `params` 是 formatter 需要的单个数据集。格式如下：



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











####### color(Color) = 

<ExampleUIControlColor default="" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

####### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

####### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

####### fontSize(number) = 

<ExampleUIControlNumber default="" min="1" step="1" />

文字的字体大小。





####### lineHeight(number) = 

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




####### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




####### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


####### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

####### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

####### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

####### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

####### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

####### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


####### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




####### textBorderType(string|number|Array) = 'solid'


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


####### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

####### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

####### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

####### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。





####### width(number)

<ExampleUIControlNumber default="100" min="1" max="500" step="1" />

文本显示宽度。

####### height(number)

<ExampleUIControlNumber default="50" min="1" max="500" step="1" />

文本显示高度。

####### overflow(string) = 'none'

<ExampleUIControlEnum options="truncate,break,breakAll" />

文字超出宽度是否截断或者换行。配置`width`时有效

+ `'truncate'` 截断，并在末尾显示`ellipsis`配置的文本，默认为`...`
+ `'break'` 换行
+ `'breakAll'` 换行，跟`'break'`不同的是，在英语等拉丁文中，`'breakAll'`还会强制单词内换行

####### ellipsis(string) = '...'

在`overflow`配置为`'truncate'`的时候，可以通过该属性配置末尾显示的文本。

####### lineOverflow(string) = 'none'

文本超出高度部分是否截断，配置`height`时有效。

+ `'truncate'` 在文本行数超出高度部分截断。


####### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

######## <style_name>(Object)



######### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

######### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

######### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

######### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


######### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





######### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




######### lineHeight(number) = 

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




######### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




######### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


######### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

######### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

######### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

######### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

######### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

######### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


######### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




######### textBorderType(string|number|Array) = 'solid'


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


######### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

######### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

######### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

######### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。
















#### 1(Object)

终点的数据。






##### valueIndex(number)

<ExampleUIControlNumber min="0" max="1" step="1"  />

在使用 [type](~series-map.markLine.data.type) 时有效，用于指定在哪个维度上指定最大值最小值，可以是 `0`（xAxis, radiusAxis），`1`（yAxis, angleAxis），默认使用第一个数值轴所在的维度。

##### valueDim(string)

在使用 [type](~series-map.markLine.data.type) 时有效，用于指定在哪个维度上指定最大值最小值。这可以是维度的直接名称，例如折线图时可以是`x`、`angle`等、candlestick 图时可以是`open`、`close`等维度名称。

##### coord(Array)

起点或终点的坐标。坐标格式视系列的坐标系而定，可以是[直角坐标系](~grid)上的 `x`, `y`，也可以是[极坐标系](~polar)上的 `radius`, `angle`。



**注：**对于 [axis.type](~xAixs.type) 为 `'category'` 类型的轴

+ 如果 coord 值为 `number`，则表示 [axis.data](~xAxis.data) 的 index。
+ 如果 coord 值为 `string`，则表示 [axis.data](~xAxis.data) 中具体的值。注意使用这种方式时，xAxis.data 不能写成 [number, number, ...]，而只能写成 [string, string, ...]，否则不能被 markPoint / markLine 用『具体值』索引到。

例如：
```javascript
{
    xAxis: {
        type: 'category',
        data: ['5', '6', '9', '13', '19', '33']
        // 注意这里不建议写成 [5, 6, 9, 13, 19, 33]，否则不能被 markPoint / markLine 用『具体值』索引到。
    },
    series: {
        type: 'line',
        data: [11, 22, 33, 44, 55, 66],
        markPoint: { // markLine 也是同理
            data: [{
                coord: [5, 33.4], // 其中 5 表示 xAxis.data[5]，即 '33' 这个元素。
                // coord: ['5', 33.4] // 其中 '5' 表示 xAxis.data中的 '5' 这个元素。
                                      // 注意，使用这种方式时，xAxis.data 不能写成 [number, number, ...]
                                      // 而只能写成 [string, string, ...]
            }]
        }
    }
}
```




##### name(string) = '终点'

标注名称，将会作为文字显示。

##### x(number)

<ExampleUIControlPercent default="0" />

相对容器的屏幕 x 坐标，单位像素。

##### y(number)

<ExampleUIControlPercent default="0" />

相对容器的屏幕 y 坐标，单位像素。

##### xAxis(number|string)

x 值为给定值的标记线，仅对数据值是一项的设置有效。例如：

```
data: [{
    name: 'X 轴值为 100 的竖直线',
    xAxis: 100
}]
```

或对于 `'time'` 类型的 xAxis，可以设置为：

```
{
    name: 'X 轴值为 "2020-01-01" 的竖直线',
    xAxis: '2020-01-01'
}]
```

##### yAxis(number|string)

Y 值为给定值的标记线，仅对数据值是一项的设置有效。例如：

```
data: [{
    name: 'Y 轴值为 100 的水平线',
    yAxis: 100
}]
```

或对于 `'time'` 类型的 yAxis，可以设置为：

```
{
    name: 'Y 轴值为 "2020-01-01" 的水平线',
    yAxis: '2020-01-01'
}]
```

##### value(number)

标注值，可以不设。



##### symbol(string) = 

<ExampleUIControlIcon default="circle" />

1标记的图形。



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













##### symbolSize(number|Array) = 

<ExampleUIControlNumber min="0" />

1标记的大小，可以设置成诸如 `10` 这样单一的数字，也可以用数组分开表示宽和高，例如 `[20, 10]` 表示标记宽为`20`，高为`10`。



##### symbolRotate(number)

<ExampleUIControlAngle min="-180" max="180" step="1" />

1标记的旋转角度（而非弧度）。正值表示逆时针旋转。注意在 `markLine` 中当 `symbol` 为 `'arrow'` 时会忽略 `symbolRotate` 强制设置为切线的角度。



##### symbolKeepAspect(boolean) = false

<ExampleUIControlBoolean clean="true" />

如果 `symbol` 是 `path://` 的形式，是否在缩放时保持该图形的长宽比。

##### symbolOffset(Array) = [0, 0]

<ExampleUIControlVector separate="true" dims="x,y" />

1标记相对于原本位置的偏移。默认情况下，标记会居中置放在数据对应的位置，但是如果 symbol 是自定义的矢量路径或者图片，就有可能不希望 symbol 居中。这时候可以使用该配置项配置 symbol 相对于原本居中的偏移，可以是绝对的像素值，也可以是相对的百分比。

例如 `[0, '-50%']` 就是把自己向上移动了一半的位置，在 symbol 图形是气泡的时候可以让图形下端的箭头对准数据点。



##### lineStyle(Object)

该数据项线的样式，起点和终点项的 `lineStyle`会合并到一起。



###### color(Color) =  "#000" 

<ExampleUIControlColor />

线的颜色。





> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)

###### width(number) = 1

<ExampleUIControlNumber value="1" min="0" step="0.5" />

线宽。




###### type(string|number|Array) = 'solid'


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


###### dashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`type`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



###### cap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




###### join(string) = bevel




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




###### miterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`join`
 为 `miter` 时，
`miterLimit`
 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。








###### shadowBlur(number) = 

<ExampleUIControlNumber default="" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```



###### shadowColor(Color) = 

<ExampleUIControlColor default="" />

阴影颜色。支持的格式同`color`。



###### shadowOffsetX(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影水平方向上的偏移距离。



###### shadowOffsetY(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影垂直方向上的偏移距离。









###### opacity(number) = 1

<ExampleUIControlNumber default="1" min="0" max="1" step="0.01" />

图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。








###### curveness(number) = 0

<ExampleUIControlNumber min="0" max="1" step="0.01" default="0" />

边的曲度，支持从 0 到 1 的值，值越大曲度越大。




##### label(Object)

该数据项标签的样式，起点和终点项的 `label`会合并到一起。



###### show(boolean) = true

是否显示标签。

###### position(string) = 'end'

标签位置，可选：
+ `'start'` 线的起始点。
+ `'middle'` 线的中点。
+ `'end'` 线的结束点。

4.7.0 版本起，支持更多标签位置：`'start'`, `'middle'`, `'end'`, `'insideStartTop'`, `'insideStartBottom'`, `'insideMiddleTop'`, `'insideMiddleBottom'`, `'insideEndTop'`, `'insideEndBottom'`。

其中，`'insideMiddleBottom'` 等同于 `'middle'`。具体位置参见下图。

文字与线的间距可以通过 [label.distance](~series-.markLine.label.distance) 调整。

~[800x500](bar-markline&reset=1&edit=1)

###### distance(number|Array)

标签与线之间的间距。如果是数组，第一项为横向间距，第二项为纵向间距。如果是数字，则表示横向纵向使用相同的间距。

###### formatter(string|Function)



标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 `\n` 换行。

**字符串模板**


**字符串模板**
模板变量有：
+ `{a}`：系列名。
+ `{b}`：数据名。
+ `{c}`：数据值。
+ `{d}`：百分比。
+ `{@xxx}`：数据中名为 `'xxx'` 的维度的值，如 `{@product}` 表示名为 `'product'` 的维度的值。
+ `{@[n]}`：数据中维度 `n` 的值，如 `{@[3]}` 表示维度 3 的值，从 0 开始计数。

**示例：**
```js
formatter: '{b}: {d}'
```

**回调函数**

回调函数格式：
```js
(params: Object|Array) => string
```
参数 `params` 是 formatter 需要的单个数据集。格式如下：



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











###### color(Color) = 

<ExampleUIControlColor default="" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

###### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

###### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

###### fontSize(number) = 

<ExampleUIControlNumber default="" min="1" step="1" />

文字的字体大小。





###### lineHeight(number) = 

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




###### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




###### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


###### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









###### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

###### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

###### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

###### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

###### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

###### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


###### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

###### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

###### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




###### textBorderType(string|number|Array) = 'solid'


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


###### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









###### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

###### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

###### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

###### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。





###### width(number)

<ExampleUIControlNumber default="100" min="1" max="500" step="1" />

文本显示宽度。

###### height(number)

<ExampleUIControlNumber default="50" min="1" max="500" step="1" />

文本显示高度。

###### overflow(string) = 'none'

<ExampleUIControlEnum options="truncate,break,breakAll" />

文字超出宽度是否截断或者换行。配置`width`时有效

+ `'truncate'` 截断，并在末尾显示`ellipsis`配置的文本，默认为`...`
+ `'break'` 换行
+ `'breakAll'` 换行，跟`'break'`不同的是，在英语等拉丁文中，`'breakAll'`还会强制单词内换行

###### ellipsis(string) = '...'

在`overflow`配置为`'truncate'`的时候，可以通过该属性配置末尾显示的文本。

###### lineOverflow(string) = 'none'

文本超出高度部分是否截断，配置`height`时有效。

+ `'truncate'` 在文本行数超出高度部分截断。


###### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

####### <style_name>(Object)



######## color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######## fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

######## fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

######## fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

######## fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


######## align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





######## verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




######## lineHeight(number) = 

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




######## backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######## borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######## borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




######## borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


######## borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######## borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

######## padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

######## shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

######## shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

######## shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

######## shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


######## width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######## height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######## textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######## textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




######## textBorderType(string|number|Array) = 'solid'


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


######## textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######## textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

######## textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

######## textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

######## textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。














##### emphasis(Object)

###### lineStyle(Object)



####### color(Color) =  "#000" 

<ExampleUIControlColor />

线的颜色。





> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)

####### width(number) = 1

<ExampleUIControlNumber value="1" min="0" step="0.5" />

线宽。




####### type(string|number|Array) = 'solid'


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


####### dashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`type`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



####### cap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




####### join(string) = bevel




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




####### miterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`join`
 为 `miter` 时，
`miterLimit`
 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。








####### shadowBlur(number) = 

<ExampleUIControlNumber default="" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```



####### shadowColor(Color) = 

<ExampleUIControlColor default="" />

阴影颜色。支持的格式同`color`。



####### shadowOffsetX(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影水平方向上的偏移距离。



####### shadowOffsetY(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影垂直方向上的偏移距离。









####### opacity(number) = 1

<ExampleUIControlNumber default="1" min="0" max="1" step="0.01" />

图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。








####### curveness(number) = 0

<ExampleUIControlNumber min="0" max="1" step="0.01" default="0" />

边的曲度，支持从 0 到 1 的值，值越大曲度越大。




###### label(Object)



####### show(boolean) = true

是否显示标签。

####### position(string) = 'end'

标签位置，可选：
+ `'start'` 线的起始点。
+ `'middle'` 线的中点。
+ `'end'` 线的结束点。

4.7.0 版本起，支持更多标签位置：`'start'`, `'middle'`, `'end'`, `'insideStartTop'`, `'insideStartBottom'`, `'insideMiddleTop'`, `'insideMiddleBottom'`, `'insideEndTop'`, `'insideEndBottom'`。

其中，`'insideMiddleBottom'` 等同于 `'middle'`。具体位置参见下图。

文字与线的间距可以通过 [label.distance](~series-.markLine.label.distance) 调整。

~[800x500](bar-markline&reset=1&edit=1)

####### distance(number|Array)

标签与线之间的间距。如果是数组，第一项为横向间距，第二项为纵向间距。如果是数字，则表示横向纵向使用相同的间距。

####### formatter(string|Function)



标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 `\n` 换行。

**字符串模板**


**字符串模板**
模板变量有：
+ `{a}`：系列名。
+ `{b}`：数据名。
+ `{c}`：数据值。
+ `{d}`：百分比。
+ `{@xxx}`：数据中名为 `'xxx'` 的维度的值，如 `{@product}` 表示名为 `'product'` 的维度的值。
+ `{@[n]}`：数据中维度 `n` 的值，如 `{@[3]}` 表示维度 3 的值，从 0 开始计数。

**示例：**
```js
formatter: '{b}: {d}'
```

**回调函数**

回调函数格式：
```js
(params: Object|Array) => string
```
参数 `params` 是 formatter 需要的单个数据集。格式如下：



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











####### color(Color) = 

<ExampleUIControlColor default="" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

####### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

####### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

####### fontSize(number) = 

<ExampleUIControlNumber default="" min="1" step="1" />

文字的字体大小。





####### lineHeight(number) = 

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




####### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




####### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


####### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

####### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

####### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

####### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

####### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

####### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


####### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




####### textBorderType(string|number|Array) = 'solid'


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


####### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

####### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

####### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

####### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。





####### width(number)

<ExampleUIControlNumber default="100" min="1" max="500" step="1" />

文本显示宽度。

####### height(number)

<ExampleUIControlNumber default="50" min="1" max="500" step="1" />

文本显示高度。

####### overflow(string) = 'none'

<ExampleUIControlEnum options="truncate,break,breakAll" />

文字超出宽度是否截断或者换行。配置`width`时有效

+ `'truncate'` 截断，并在末尾显示`ellipsis`配置的文本，默认为`...`
+ `'break'` 换行
+ `'breakAll'` 换行，跟`'break'`不同的是，在英语等拉丁文中，`'breakAll'`还会强制单词内换行

####### ellipsis(string) = '...'

在`overflow`配置为`'truncate'`的时候，可以通过该属性配置末尾显示的文本。

####### lineOverflow(string) = 'none'

文本超出高度部分是否截断，配置`height`时有效。

+ `'truncate'` 在文本行数超出高度部分截断。


####### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

######## <style_name>(Object)



######### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

######### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

######### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

######### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


######### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





######### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




######### lineHeight(number) = 

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




######### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




######### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


######### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

######### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

######### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

######### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

######### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

######### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


######### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




######### textBorderType(string|number|Array) = 'solid'


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


######### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

######### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

######### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

######### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。














##### blur(Object)



> 从 `v5.0.0` 开始支持



###### lineStyle(Object)



####### color(Color) =  "#000" 

<ExampleUIControlColor />

线的颜色。





> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)

####### width(number) = 1

<ExampleUIControlNumber value="1" min="0" step="0.5" />

线宽。




####### type(string|number|Array) = 'solid'


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


####### dashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`type`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



####### cap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




####### join(string) = bevel




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




####### miterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`join`
 为 `miter` 时，
`miterLimit`
 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。








####### shadowBlur(number) = 

<ExampleUIControlNumber default="" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```



####### shadowColor(Color) = 

<ExampleUIControlColor default="" />

阴影颜色。支持的格式同`color`。



####### shadowOffsetX(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影水平方向上的偏移距离。



####### shadowOffsetY(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影垂直方向上的偏移距离。









####### opacity(number) = 1

<ExampleUIControlNumber default="1" min="0" max="1" step="0.01" />

图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。








####### curveness(number) = 0

<ExampleUIControlNumber min="0" max="1" step="0.01" default="0" />

边的曲度，支持从 0 到 1 的值，值越大曲度越大。




###### label(Object)



####### show(boolean) = true

是否显示标签。

####### position(string) = 'end'

标签位置，可选：
+ `'start'` 线的起始点。
+ `'middle'` 线的中点。
+ `'end'` 线的结束点。

4.7.0 版本起，支持更多标签位置：`'start'`, `'middle'`, `'end'`, `'insideStartTop'`, `'insideStartBottom'`, `'insideMiddleTop'`, `'insideMiddleBottom'`, `'insideEndTop'`, `'insideEndBottom'`。

其中，`'insideMiddleBottom'` 等同于 `'middle'`。具体位置参见下图。

文字与线的间距可以通过 [label.distance](~series-.markLine.label.distance) 调整。

~[800x500](bar-markline&reset=1&edit=1)

####### distance(number|Array)

标签与线之间的间距。如果是数组，第一项为横向间距，第二项为纵向间距。如果是数字，则表示横向纵向使用相同的间距。

####### formatter(string|Function)



标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 `\n` 换行。

**字符串模板**


**字符串模板**
模板变量有：
+ `{a}`：系列名。
+ `{b}`：数据名。
+ `{c}`：数据值。
+ `{d}`：百分比。
+ `{@xxx}`：数据中名为 `'xxx'` 的维度的值，如 `{@product}` 表示名为 `'product'` 的维度的值。
+ `{@[n]}`：数据中维度 `n` 的值，如 `{@[3]}` 表示维度 3 的值，从 0 开始计数。

**示例：**
```js
formatter: '{b}: {d}'
```

**回调函数**

回调函数格式：
```js
(params: Object|Array) => string
```
参数 `params` 是 formatter 需要的单个数据集。格式如下：



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











####### color(Color) = 

<ExampleUIControlColor default="" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

####### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

####### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

####### fontSize(number) = 

<ExampleUIControlNumber default="" min="1" step="1" />

文字的字体大小。





####### lineHeight(number) = 

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




####### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




####### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


####### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

####### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

####### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

####### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

####### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

####### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


####### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




####### textBorderType(string|number|Array) = 'solid'


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


####### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

####### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

####### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

####### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。





####### width(number)

<ExampleUIControlNumber default="100" min="1" max="500" step="1" />

文本显示宽度。

####### height(number)

<ExampleUIControlNumber default="50" min="1" max="500" step="1" />

文本显示高度。

####### overflow(string) = 'none'

<ExampleUIControlEnum options="truncate,break,breakAll" />

文字超出宽度是否截断或者换行。配置`width`时有效

+ `'truncate'` 截断，并在末尾显示`ellipsis`配置的文本，默认为`...`
+ `'break'` 换行
+ `'breakAll'` 换行，跟`'break'`不同的是，在英语等拉丁文中，`'breakAll'`还会强制单词内换行

####### ellipsis(string) = '...'

在`overflow`配置为`'truncate'`的时候，可以通过该属性配置末尾显示的文本。

####### lineOverflow(string) = 'none'

文本超出高度部分是否截断，配置`height`时有效。

+ `'truncate'` 在文本行数超出高度部分截断。


####### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

######## <style_name>(Object)



######### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

######### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

######### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

######### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


######### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





######### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




######### lineHeight(number) = 

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




######### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




######### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


######### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

######### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

######### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

######### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

######### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

######### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


######### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




######### textBorderType(string|number|Array) = 'solid'


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


######### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

######### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

######### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

######### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。


















### animation(boolean) = true

<ExampleUIControlBoolean default="true" clean="true" />

是否开启动画。

### animationThreshold(number) = 2000

是否开启动画的阈值，当单个系列显示的图形数量大于这个阈值时会关闭动画。



### animationDuration(number|Function) = 1000

<ExampleUIControlNumber min="0" default="1000" step="20" clean="true" />

初始动画的时长，支持回调函数，可以通过每个数据返回不同的时长实现更戏剧的初始动画效果：

```js
animationDuration: function (idx) {
    // 越往后的数据时长越大
    return idx * 100;
}
```

### animationEasing(string) = cubicOut

<ExampleUIControlEnum options="linear,quadraticIn,quadraticOut,quadraticInOut,cubicIn,cubicOut,cubicInOut,quarticIn,quarticOut,quarticInOut,quinticIn,quinticOut,quinticInOut,sinusoidalIn,sinusoidalOut,sinusoidalInOut,exponentialIn,exponentialOut,exponentialInOut,circularIn,circularOut,circularInOut,elasticIn,elasticOut,elasticInOut,backIn,backOut,backInOut,bounceIn,bounceOut,bounceInOut" clean="true" />

初始动画的缓动效果。不同的缓动效果可以参考 [缓动示例](line-easing)。


### animationDelay(number|Function) = 0

初始动画的延迟，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更戏剧的初始动画效果。

如下示例：
```js
animationDelay: function (idx) {
    // 越往后的数据延迟越大
    return idx * 100;
}
```

也可以看[该示例](bar-animation-delay)




### animationDurationUpdate(number|Function) = 300

<ExampleUIControlNumber min="0" default="1000" step="20" />

数据更新动画的时长。

支持回调函数，可以通过每个数据返回不同的时长实现更戏剧的更新动画效果：

```js
animationDurationUpdate: function (idx) {
    // 越往后的数据时长越大
    return idx * 100;
}
```

### animationEasingUpdate(string) = cubicInOut

<ExampleUIControlEnum options="linear,quadraticIn,quadraticOut,quadraticInOut,cubicIn,cubicOut,cubicInOut,quarticIn,quarticOut,quarticInOut,quinticIn,quinticOut,quinticInOut,sinusoidalIn,sinusoidalOut,sinusoidalInOut,exponentialIn,exponentialOut,exponentialInOut,circularIn,circularOut,circularInOut,elasticIn,elasticOut,elasticInOut,backIn,backOut,backInOut,bounceIn,bounceOut,bounceInOut" />

数据更新动画的缓动效果。


### animationDelayUpdate(number|Function) = 0

数据更新动画的延迟，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更戏剧的更新动画效果。

如下示例：
```js
animationDelayUpdate: function (idx) {
    // 越往后的数据延迟越大
    return idx * 100;
}
```

也可以看[该示例](bar-animation-delay)












## markArea(Object)

图表标域，常用于标记图表中某个范围的数据，例如标出某段时间投放了广告。



### silent(boolean) = false

<ExampleUIControlBoolean />

图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。



### label(Object)

标域文本配置。



#### show(boolean) = false

<ExampleUIControlBoolean default="false" />

是否显示标签。


#### position(string|Array) = 

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />



标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](doc-example/label-position)。





#### distance(number) = 5

<ExampleUIControlNumber default="5" min="0" step="0.5" />

距离图形元素的距离。


当 position 为字符描述值（如 `'top'`、`'insideRight'`）时候有效。

参见：[label position](doc-example/label-position)。




#### rotate(number) = 

<ExampleUIControlAngle default="0" min="-90" max="90" step="1" />

标签旋转。从 -90 度到 90 度。正值是逆时针。

参见：[label rotation](bar-label-rotation)。


#### offset(Array)

<ExampleUIControlVector dims="x,y" step="0.5" separate="true" />

是否对文字进行偏移。默认不偏移。例如：`[30, 40]` 表示文字在横向上偏移 `30`，纵向上偏移 `40`。








#### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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

#### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


#### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





#### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




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




#### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






#### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






#### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




#### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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









#### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

#### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

#### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

#### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

#### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

#### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


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




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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


#### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

##### <style_name>(Object)



###### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

###### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

###### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

###### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


###### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





###### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




###### lineHeight(number) = 

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




###### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




###### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


###### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









###### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

###### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

###### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

###### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

###### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

###### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


###### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

###### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

###### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




###### textBorderType(string|number|Array) = 'solid'


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


###### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









###### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

###### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

###### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

###### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。















### itemStyle(Object)

该标域的样式。



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











### emphasis(Object)

高亮的标域样式

#### label(Object)



##### show(boolean) = false

<ExampleUIControlBoolean default="false" />

是否显示标签。


##### position(string|Array) = 

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />



标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](doc-example/label-position)。





##### distance(number) = 5

<ExampleUIControlNumber default="5" min="0" step="0.5" />

距离图形元素的距离。


当 position 为字符描述值（如 `'top'`、`'insideRight'`）时候有效。

参见：[label position](doc-example/label-position)。




##### rotate(number) = 

<ExampleUIControlAngle default="0" min="-90" max="90" step="1" />

标签旋转。从 -90 度到 90 度。正值是逆时针。

参见：[label rotation](bar-label-rotation)。


##### offset(Array)

<ExampleUIControlVector dims="x,y" step="0.5" separate="true" />

是否对文字进行偏移。默认不偏移。例如：`[30, 40]` 表示文字在横向上偏移 `30`，纵向上偏移 `40`。








##### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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

##### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


##### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





##### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




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




##### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






##### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






##### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




##### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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









##### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

##### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

##### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

##### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

##### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

##### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


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




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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


##### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

###### <style_name>(Object)



####### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

####### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

####### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

####### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


####### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





####### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




####### lineHeight(number) = 

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




####### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




####### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


####### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

####### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

####### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

####### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

####### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

####### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


####### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




####### textBorderType(string|number|Array) = 'solid'


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


####### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

####### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

####### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

####### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。















#### itemStyle(*)



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











### blur(Object)



> 从 `v5.0.0` 开始支持



淡出的标域样式。淡出的规则跟随所在系列。

#### label(Object)



##### show(boolean) = false

<ExampleUIControlBoolean default="false" />

是否显示标签。


##### position(string|Array) = 

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />



标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](doc-example/label-position)。





##### distance(number) = 5

<ExampleUIControlNumber default="5" min="0" step="0.5" />

距离图形元素的距离。


当 position 为字符描述值（如 `'top'`、`'insideRight'`）时候有效。

参见：[label position](doc-example/label-position)。




##### rotate(number) = 

<ExampleUIControlAngle default="0" min="-90" max="90" step="1" />

标签旋转。从 -90 度到 90 度。正值是逆时针。

参见：[label rotation](bar-label-rotation)。


##### offset(Array)

<ExampleUIControlVector dims="x,y" step="0.5" separate="true" />

是否对文字进行偏移。默认不偏移。例如：`[30, 40]` 表示文字在横向上偏移 `30`，纵向上偏移 `40`。








##### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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

##### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


##### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





##### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




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




##### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






##### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






##### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




##### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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









##### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

##### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

##### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

##### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

##### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

##### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


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




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






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


##### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

###### <style_name>(Object)



####### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

####### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

####### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

####### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


####### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





####### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




####### lineHeight(number) = 

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




####### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




####### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


####### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

####### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

####### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

####### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

####### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

####### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


####### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




####### textBorderType(string|number|Array) = 'solid'


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


####### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

####### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

####### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

####### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。















#### itemStyle(*)



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











### data(*)

标域的数据数组。每个数组项是一个两个项的数组，分别表示标域左上角和右下角的位置，每个项支持通过下面几种方式指定自己的位置

1. 通过 [x](~series-map.markArea.data.0.x), [y](~series-map.markArea.data.0.y) 属性指定相对容器的屏幕坐标，单位像素，支持百分比。


2. 用 [coord](~series-map.markArea.data.0.coord) 属性指定数据在相应坐标系上的坐标位置，单个维度支持设置 `'min'`, `'max'`, `'average'`。


当多个属性同时存在时，优先级按上述的顺序。



```
data: [


    [
        {
            name: '两个坐标之间的标域',
            coord: [10, 20]
        },
        {
            coord: [20, 30]
        }
    ], [
        {
            name: '60分到80分',
            yAxis: 60
        },
        {
            yAxis: 80
        }
    ], [
        {
            name: '所有数据范围区间',
            coord: ['min', 'min']
        },
        {
            coord: ['max', 'max']
        }
    ],
[
        {
            name: '两个屏幕坐标之间的标域',
            x: 100,
            y: 100
        }, {
            x: '90%',
            y: '10%'
        }
    ]
]
```

#### 0(Object)

标域左上角的数据






##### valueIndex(number)

<ExampleUIControlNumber min="0" max="1" step="1"  />

在使用 [type](~series-map.markArea.data.type) 时有效，用于指定在哪个维度上指定最大值最小值，可以是 `0`（xAxis, radiusAxis），`1`（yAxis, angleAxis），默认使用第一个数值轴所在的维度。

##### valueDim(string)

在使用 [type](~series-map.markArea.data.type) 时有效，用于指定在哪个维度上指定最大值最小值。这可以是维度的直接名称，例如折线图时可以是`x`、`angle`等、candlestick 图时可以是`open`、`close`等维度名称。

##### coord(Array)

起点或终点的坐标。坐标格式视系列的坐标系而定，可以是[直角坐标系](~grid)上的 `x`, `y`，也可以是[极坐标系](~polar)上的 `radius`, `angle`。


##### name(string) = '起点'

标注名称，将会作为文字显示。

##### x(number)

<ExampleUIControlPercent default="0" />

相对容器的屏幕 x 坐标，单位像素，支持百分比形式，例如 `'20%'`。

##### y(number)

<ExampleUIControlPercent default="0" />

相对容器的屏幕 y 坐标，单位像素，支持百分比形式，例如 `'20%'`。

##### value(number)

标域值，可以不设。

##### itemStyle(Object)

该数据项区域的样式，起点和终点项的`itemStyle`会合并到一起。



###### color(Color) = 自适应

<ExampleUIControlColor />

图形的颜色。



> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)



###### borderColor(Color) = '#000'

<ExampleUIControlColor />

图形的描边颜色。支持的颜色格式同 `color`，不支持回调函数。

###### borderWidth(number) = 0

<ExampleUIControlNumber value="0" min="0" step="0.5" />

(${name} ? ${name} : "") + "描边线宽。为 0 时无描边。"




###### borderType(string|number|Array) = 'solid'



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


###### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



###### borderCap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




###### borderJoin(string) = bevel




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




###### borderMiterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`borderJoin`
 为 `miter` 时，
`borderMiterLimit`
 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。








###### shadowBlur(number) = 

<ExampleUIControlNumber default="" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```



###### shadowColor(Color) = 

<ExampleUIControlColor default="" />

阴影颜色。支持的格式同`color`。



###### shadowOffsetX(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影水平方向上的偏移距离。



###### shadowOffsetY(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影垂直方向上的偏移距离。









###### opacity(number) = 1

<ExampleUIControlNumber default="1" min="0" max="1" step="0.01" />

图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。











##### label(Object)

该数据项标签的样式，起点和终点项的`label`会合并到一起。



###### show(boolean) = false

<ExampleUIControlBoolean default="false" />

是否显示标签。


###### position(string|Array) = 

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />



标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](doc-example/label-position)。





###### distance(number) = 5

<ExampleUIControlNumber default="5" min="0" step="0.5" />

距离图形元素的距离。


当 position 为字符描述值（如 `'top'`、`'insideRight'`）时候有效。

参见：[label position](doc-example/label-position)。




###### rotate(number) = 

<ExampleUIControlAngle default="0" min="-90" max="90" step="1" />

标签旋转。从 -90 度到 90 度。正值是逆时针。

参见：[label rotation](bar-label-rotation)。


###### offset(Array)

<ExampleUIControlVector dims="x,y" step="0.5" separate="true" />

是否对文字进行偏移。默认不偏移。例如：`[30, 40]` 表示文字在横向上偏移 `30`，纵向上偏移 `40`。








###### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

###### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

###### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

###### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


###### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





###### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




###### lineHeight(number) = 

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




###### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




###### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


###### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









###### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

###### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

###### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

###### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

###### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

###### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


###### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

###### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

###### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




###### textBorderType(string|number|Array) = 'solid'


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


###### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









###### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

###### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

###### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

###### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。





###### width(number)

<ExampleUIControlNumber default="100" min="1" max="500" step="1" />

文本显示宽度。

###### height(number)

<ExampleUIControlNumber default="50" min="1" max="500" step="1" />

文本显示高度。

###### overflow(string) = 'none'

<ExampleUIControlEnum options="truncate,break,breakAll" />

文字超出宽度是否截断或者换行。配置`width`时有效

+ `'truncate'` 截断，并在末尾显示`ellipsis`配置的文本，默认为`...`
+ `'break'` 换行
+ `'breakAll'` 换行，跟`'break'`不同的是，在英语等拉丁文中，`'breakAll'`还会强制单词内换行

###### ellipsis(string) = '...'

在`overflow`配置为`'truncate'`的时候，可以通过该属性配置末尾显示的文本。

###### lineOverflow(string) = 'none'

文本超出高度部分是否截断，配置`height`时有效。

+ `'truncate'` 在文本行数超出高度部分截断。


###### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

####### <style_name>(Object)



######## color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######## fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

######## fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

######## fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

######## fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


######## align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





######## verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




######## lineHeight(number) = 

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




######## backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######## borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######## borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




######## borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


######## borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######## borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

######## padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

######## shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

######## shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

######## shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

######## shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


######## width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######## height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######## textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######## textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




######## textBorderType(string|number|Array) = 'solid'


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


######## textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######## textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

######## textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

######## textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

######## textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。















##### emphasis(Object)

###### itemStyle(Object)



####### color(Color) = 自适应

<ExampleUIControlColor />

图形的颜色。



> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)



####### borderColor(Color) = '#000'

<ExampleUIControlColor />

图形的描边颜色。支持的颜色格式同 `color`，不支持回调函数。

####### borderWidth(number) = 0

<ExampleUIControlNumber value="0" min="0" step="0.5" />

(${name} ? ${name} : "") + "描边线宽。为 0 时无描边。"




####### borderType(string|number|Array) = 'solid'



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


####### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



####### borderCap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




####### borderJoin(string) = bevel




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




####### borderMiterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`borderJoin`
 为 `miter` 时，
`borderMiterLimit`
 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。








####### shadowBlur(number) = 

<ExampleUIControlNumber default="" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```



####### shadowColor(Color) = 

<ExampleUIControlColor default="" />

阴影颜色。支持的格式同`color`。



####### shadowOffsetX(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影水平方向上的偏移距离。



####### shadowOffsetY(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影垂直方向上的偏移距离。









####### opacity(number) = 1

<ExampleUIControlNumber default="1" min="0" max="1" step="0.01" />

图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。











###### label(Object)



####### show(boolean) = false

<ExampleUIControlBoolean default="false" />

是否显示标签。


####### position(string|Array) = 

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />



标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](doc-example/label-position)。





####### distance(number) = 5

<ExampleUIControlNumber default="5" min="0" step="0.5" />

距离图形元素的距离。


当 position 为字符描述值（如 `'top'`、`'insideRight'`）时候有效。

参见：[label position](doc-example/label-position)。




####### rotate(number) = 

<ExampleUIControlAngle default="0" min="-90" max="90" step="1" />

标签旋转。从 -90 度到 90 度。正值是逆时针。

参见：[label rotation](bar-label-rotation)。


####### offset(Array)

<ExampleUIControlVector dims="x,y" step="0.5" separate="true" />

是否对文字进行偏移。默认不偏移。例如：`[30, 40]` 表示文字在横向上偏移 `30`，纵向上偏移 `40`。








####### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

####### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

####### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

####### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


####### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





####### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




####### lineHeight(number) = 

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




####### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




####### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


####### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

####### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

####### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

####### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

####### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

####### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


####### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




####### textBorderType(string|number|Array) = 'solid'


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


####### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

####### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

####### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

####### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。





####### width(number)

<ExampleUIControlNumber default="100" min="1" max="500" step="1" />

文本显示宽度。

####### height(number)

<ExampleUIControlNumber default="50" min="1" max="500" step="1" />

文本显示高度。

####### overflow(string) = 'none'

<ExampleUIControlEnum options="truncate,break,breakAll" />

文字超出宽度是否截断或者换行。配置`width`时有效

+ `'truncate'` 截断，并在末尾显示`ellipsis`配置的文本，默认为`...`
+ `'break'` 换行
+ `'breakAll'` 换行，跟`'break'`不同的是，在英语等拉丁文中，`'breakAll'`还会强制单词内换行

####### ellipsis(string) = '...'

在`overflow`配置为`'truncate'`的时候，可以通过该属性配置末尾显示的文本。

####### lineOverflow(string) = 'none'

文本超出高度部分是否截断，配置`height`时有效。

+ `'truncate'` 在文本行数超出高度部分截断。


####### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

######## <style_name>(Object)



######### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

######### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

######### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

######### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


######### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





######### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




######### lineHeight(number) = 

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




######### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




######### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


######### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

######### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

######### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

######### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

######### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

######### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


######### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




######### textBorderType(string|number|Array) = 'solid'


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


######### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

######### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

######### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

######### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。















##### blur(Object)



> 从 `v5.0.0` 开始支持



###### itemStyle(Object)



####### color(Color) = 自适应

<ExampleUIControlColor />

图形的颜色。



> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)



####### borderColor(Color) = '#000'

<ExampleUIControlColor />

图形的描边颜色。支持的颜色格式同 `color`，不支持回调函数。

####### borderWidth(number) = 0

<ExampleUIControlNumber value="0" min="0" step="0.5" />

(${name} ? ${name} : "") + "描边线宽。为 0 时无描边。"




####### borderType(string|number|Array) = 'solid'



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


####### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



####### borderCap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




####### borderJoin(string) = bevel




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




####### borderMiterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`borderJoin`
 为 `miter` 时，
`borderMiterLimit`
 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。








####### shadowBlur(number) = 

<ExampleUIControlNumber default="" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```



####### shadowColor(Color) = 

<ExampleUIControlColor default="" />

阴影颜色。支持的格式同`color`。



####### shadowOffsetX(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影水平方向上的偏移距离。



####### shadowOffsetY(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影垂直方向上的偏移距离。









####### opacity(number) = 1

<ExampleUIControlNumber default="1" min="0" max="1" step="0.01" />

图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。











###### label(Object)



####### show(boolean) = false

<ExampleUIControlBoolean default="false" />

是否显示标签。


####### position(string|Array) = 

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />



标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](doc-example/label-position)。





####### distance(number) = 5

<ExampleUIControlNumber default="5" min="0" step="0.5" />

距离图形元素的距离。


当 position 为字符描述值（如 `'top'`、`'insideRight'`）时候有效。

参见：[label position](doc-example/label-position)。




####### rotate(number) = 

<ExampleUIControlAngle default="0" min="-90" max="90" step="1" />

标签旋转。从 -90 度到 90 度。正值是逆时针。

参见：[label rotation](bar-label-rotation)。


####### offset(Array)

<ExampleUIControlVector dims="x,y" step="0.5" separate="true" />

是否对文字进行偏移。默认不偏移。例如：`[30, 40]` 表示文字在横向上偏移 `30`，纵向上偏移 `40`。








####### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

####### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

####### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

####### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


####### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





####### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




####### lineHeight(number) = 

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




####### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




####### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


####### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

####### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

####### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

####### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

####### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

####### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


####### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




####### textBorderType(string|number|Array) = 'solid'


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


####### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

####### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

####### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

####### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。





####### width(number)

<ExampleUIControlNumber default="100" min="1" max="500" step="1" />

文本显示宽度。

####### height(number)

<ExampleUIControlNumber default="50" min="1" max="500" step="1" />

文本显示高度。

####### overflow(string) = 'none'

<ExampleUIControlEnum options="truncate,break,breakAll" />

文字超出宽度是否截断或者换行。配置`width`时有效

+ `'truncate'` 截断，并在末尾显示`ellipsis`配置的文本，默认为`...`
+ `'break'` 换行
+ `'breakAll'` 换行，跟`'break'`不同的是，在英语等拉丁文中，`'breakAll'`还会强制单词内换行

####### ellipsis(string) = '...'

在`overflow`配置为`'truncate'`的时候，可以通过该属性配置末尾显示的文本。

####### lineOverflow(string) = 'none'

文本超出高度部分是否截断，配置`height`时有效。

+ `'truncate'` 在文本行数超出高度部分截断。


####### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

######## <style_name>(Object)



######### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

######### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

######### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

######### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


######### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





######### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




######### lineHeight(number) = 

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




######### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




######### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


######### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

######### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

######### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

######### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

######### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

######### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


######### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




######### textBorderType(string|number|Array) = 'solid'


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


######### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

######### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

######### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

######### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。

















#### 1(Object)

标域右下角的数据






##### valueIndex(number)

<ExampleUIControlNumber min="0" max="1" step="1"  />

在使用 [type](~series-map.markArea.data.type) 时有效，用于指定在哪个维度上指定最大值最小值，可以是 `0`（xAxis, radiusAxis），`1`（yAxis, angleAxis），默认使用第一个数值轴所在的维度。

##### valueDim(string)

在使用 [type](~series-map.markArea.data.type) 时有效，用于指定在哪个维度上指定最大值最小值。这可以是维度的直接名称，例如折线图时可以是`x`、`angle`等、candlestick 图时可以是`open`、`close`等维度名称。

##### coord(Array)

起点或终点的坐标。坐标格式视系列的坐标系而定，可以是[直角坐标系](~grid)上的 `x`, `y`，也可以是[极坐标系](~polar)上的 `radius`, `angle`。


##### name(string) = '终点'

标注名称，将会作为文字显示。

##### x(number)

<ExampleUIControlPercent default="0" />

相对容器的屏幕 x 坐标，单位像素，支持百分比形式，例如 `'20%'`。

##### y(number)

<ExampleUIControlPercent default="0" />

相对容器的屏幕 y 坐标，单位像素，支持百分比形式，例如 `'20%'`。

##### value(number)

标域值，可以不设。

##### itemStyle(Object)

该数据项区域的样式，起点和终点项的`itemStyle`会合并到一起。



###### color(Color) = 自适应

<ExampleUIControlColor />

图形的颜色。



> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)



###### borderColor(Color) = '#000'

<ExampleUIControlColor />

图形的描边颜色。支持的颜色格式同 `color`，不支持回调函数。

###### borderWidth(number) = 0

<ExampleUIControlNumber value="0" min="0" step="0.5" />

(${name} ? ${name} : "") + "描边线宽。为 0 时无描边。"




###### borderType(string|number|Array) = 'solid'



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


###### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



###### borderCap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




###### borderJoin(string) = bevel




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




###### borderMiterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`borderJoin`
 为 `miter` 时，
`borderMiterLimit`
 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。








###### shadowBlur(number) = 

<ExampleUIControlNumber default="" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```



###### shadowColor(Color) = 

<ExampleUIControlColor default="" />

阴影颜色。支持的格式同`color`。



###### shadowOffsetX(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影水平方向上的偏移距离。



###### shadowOffsetY(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影垂直方向上的偏移距离。









###### opacity(number) = 1

<ExampleUIControlNumber default="1" min="0" max="1" step="0.01" />

图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。











##### label(Object)

该数据项标签的样式，起点和终点项的`label`会合并到一起。



###### show(boolean) = false

<ExampleUIControlBoolean default="false" />

是否显示标签。


###### position(string|Array) = 

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />



标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](doc-example/label-position)。





###### distance(number) = 5

<ExampleUIControlNumber default="5" min="0" step="0.5" />

距离图形元素的距离。


当 position 为字符描述值（如 `'top'`、`'insideRight'`）时候有效。

参见：[label position](doc-example/label-position)。




###### rotate(number) = 

<ExampleUIControlAngle default="0" min="-90" max="90" step="1" />

标签旋转。从 -90 度到 90 度。正值是逆时针。

参见：[label rotation](bar-label-rotation)。


###### offset(Array)

<ExampleUIControlVector dims="x,y" step="0.5" separate="true" />

是否对文字进行偏移。默认不偏移。例如：`[30, 40]` 表示文字在横向上偏移 `30`，纵向上偏移 `40`。








###### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

###### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

###### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

###### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


###### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





###### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




###### lineHeight(number) = 

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




###### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




###### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


###### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









###### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

###### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

###### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

###### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

###### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

###### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


###### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

###### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

###### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






###### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




###### textBorderType(string|number|Array) = 'solid'


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


###### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









###### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

###### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

###### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

###### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。





###### width(number)

<ExampleUIControlNumber default="100" min="1" max="500" step="1" />

文本显示宽度。

###### height(number)

<ExampleUIControlNumber default="50" min="1" max="500" step="1" />

文本显示高度。

###### overflow(string) = 'none'

<ExampleUIControlEnum options="truncate,break,breakAll" />

文字超出宽度是否截断或者换行。配置`width`时有效

+ `'truncate'` 截断，并在末尾显示`ellipsis`配置的文本，默认为`...`
+ `'break'` 换行
+ `'breakAll'` 换行，跟`'break'`不同的是，在英语等拉丁文中，`'breakAll'`还会强制单词内换行

###### ellipsis(string) = '...'

在`overflow`配置为`'truncate'`的时候，可以通过该属性配置末尾显示的文本。

###### lineOverflow(string) = 'none'

文本超出高度部分是否截断，配置`height`时有效。

+ `'truncate'` 在文本行数超出高度部分截断。


###### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

####### <style_name>(Object)



######## color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######## fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

######## fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

######## fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

######## fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


######## align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





######## verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




######## lineHeight(number) = 

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




######## backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######## borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######## borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




######## borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


######## borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######## borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

######## padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

######## shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

######## shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

######## shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

######## shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


######## width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######## height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######## textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######## textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




######## textBorderType(string|number|Array) = 'solid'


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


######## textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######## textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

######## textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

######## textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

######## textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。















##### emphasis(Object)

###### itemStyle(Object)



####### color(Color) = 自适应

<ExampleUIControlColor />

图形的颜色。



> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)



####### borderColor(Color) = '#000'

<ExampleUIControlColor />

图形的描边颜色。支持的颜色格式同 `color`，不支持回调函数。

####### borderWidth(number) = 0

<ExampleUIControlNumber value="0" min="0" step="0.5" />

(${name} ? ${name} : "") + "描边线宽。为 0 时无描边。"




####### borderType(string|number|Array) = 'solid'



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


####### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



####### borderCap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




####### borderJoin(string) = bevel




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




####### borderMiterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`borderJoin`
 为 `miter` 时，
`borderMiterLimit`
 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。








####### shadowBlur(number) = 

<ExampleUIControlNumber default="" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```



####### shadowColor(Color) = 

<ExampleUIControlColor default="" />

阴影颜色。支持的格式同`color`。



####### shadowOffsetX(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影水平方向上的偏移距离。



####### shadowOffsetY(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影垂直方向上的偏移距离。









####### opacity(number) = 1

<ExampleUIControlNumber default="1" min="0" max="1" step="0.01" />

图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。











###### label(Object)



####### show(boolean) = false

<ExampleUIControlBoolean default="false" />

是否显示标签。


####### position(string|Array) = 

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />



标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](doc-example/label-position)。





####### distance(number) = 5

<ExampleUIControlNumber default="5" min="0" step="0.5" />

距离图形元素的距离。


当 position 为字符描述值（如 `'top'`、`'insideRight'`）时候有效。

参见：[label position](doc-example/label-position)。




####### rotate(number) = 

<ExampleUIControlAngle default="0" min="-90" max="90" step="1" />

标签旋转。从 -90 度到 90 度。正值是逆时针。

参见：[label rotation](bar-label-rotation)。


####### offset(Array)

<ExampleUIControlVector dims="x,y" step="0.5" separate="true" />

是否对文字进行偏移。默认不偏移。例如：`[30, 40]` 表示文字在横向上偏移 `30`，纵向上偏移 `40`。








####### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

####### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

####### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

####### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


####### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





####### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




####### lineHeight(number) = 

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




####### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




####### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


####### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

####### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

####### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

####### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

####### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

####### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


####### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




####### textBorderType(string|number|Array) = 'solid'


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


####### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

####### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

####### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

####### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。





####### width(number)

<ExampleUIControlNumber default="100" min="1" max="500" step="1" />

文本显示宽度。

####### height(number)

<ExampleUIControlNumber default="50" min="1" max="500" step="1" />

文本显示高度。

####### overflow(string) = 'none'

<ExampleUIControlEnum options="truncate,break,breakAll" />

文字超出宽度是否截断或者换行。配置`width`时有效

+ `'truncate'` 截断，并在末尾显示`ellipsis`配置的文本，默认为`...`
+ `'break'` 换行
+ `'breakAll'` 换行，跟`'break'`不同的是，在英语等拉丁文中，`'breakAll'`还会强制单词内换行

####### ellipsis(string) = '...'

在`overflow`配置为`'truncate'`的时候，可以通过该属性配置末尾显示的文本。

####### lineOverflow(string) = 'none'

文本超出高度部分是否截断，配置`height`时有效。

+ `'truncate'` 在文本行数超出高度部分截断。


####### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

######## <style_name>(Object)



######### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

######### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

######### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

######### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


######### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





######### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




######### lineHeight(number) = 

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




######### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




######### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


######### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

######### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

######### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

######### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

######### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

######### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


######### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




######### textBorderType(string|number|Array) = 'solid'


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


######### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

######### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

######### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

######### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。















##### blur(Object)



> 从 `v5.0.0` 开始支持



###### itemStyle(Object)



####### color(Color) = 自适应

<ExampleUIControlColor />

图形的颜色。



> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)



####### borderColor(Color) = '#000'

<ExampleUIControlColor />

图形的描边颜色。支持的颜色格式同 `color`，不支持回调函数。

####### borderWidth(number) = 0

<ExampleUIControlNumber value="0" min="0" step="0.5" />

(${name} ? ${name} : "") + "描边线宽。为 0 时无描边。"




####### borderType(string|number|Array) = 'solid'



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


####### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



####### borderCap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




####### borderJoin(string) = bevel




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




####### borderMiterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`borderJoin`
 为 `miter` 时，
`borderMiterLimit`
 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。








####### shadowBlur(number) = 

<ExampleUIControlNumber default="" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```



####### shadowColor(Color) = 

<ExampleUIControlColor default="" />

阴影颜色。支持的格式同`color`。



####### shadowOffsetX(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影水平方向上的偏移距离。



####### shadowOffsetY(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影垂直方向上的偏移距离。









####### opacity(number) = 1

<ExampleUIControlNumber default="1" min="0" max="1" step="0.01" />

图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。











###### label(Object)



####### show(boolean) = false

<ExampleUIControlBoolean default="false" />

是否显示标签。


####### position(string|Array) = 

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />



标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](doc-example/label-position)。





####### distance(number) = 5

<ExampleUIControlNumber default="5" min="0" step="0.5" />

距离图形元素的距离。


当 position 为字符描述值（如 `'top'`、`'insideRight'`）时候有效。

参见：[label position](doc-example/label-position)。




####### rotate(number) = 

<ExampleUIControlAngle default="0" min="-90" max="90" step="1" />

标签旋转。从 -90 度到 90 度。正值是逆时针。

参见：[label rotation](bar-label-rotation)。


####### offset(Array)

<ExampleUIControlVector dims="x,y" step="0.5" separate="true" />

是否对文字进行偏移。默认不偏移。例如：`[30, 40]` 表示文字在横向上偏移 `30`，纵向上偏移 `40`。








####### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

####### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

####### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

####### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


####### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





####### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




####### lineHeight(number) = 

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




####### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




####### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


####### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

####### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

####### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

####### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

####### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

####### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


####### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

####### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






####### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




####### textBorderType(string|number|Array) = 'solid'


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


####### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









####### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

####### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

####### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

####### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。





####### width(number)

<ExampleUIControlNumber default="100" min="1" max="500" step="1" />

文本显示宽度。

####### height(number)

<ExampleUIControlNumber default="50" min="1" max="500" step="1" />

文本显示高度。

####### overflow(string) = 'none'

<ExampleUIControlEnum options="truncate,break,breakAll" />

文字超出宽度是否截断或者换行。配置`width`时有效

+ `'truncate'` 截断，并在末尾显示`ellipsis`配置的文本，默认为`...`
+ `'break'` 换行
+ `'breakAll'` 换行，跟`'break'`不同的是，在英语等拉丁文中，`'breakAll'`还会强制单词内换行

####### ellipsis(string) = '...'

在`overflow`配置为`'truncate'`的时候，可以通过该属性配置末尾显示的文本。

####### lineOverflow(string) = 'none'

文本超出高度部分是否截断，配置`height`时有效。

+ `'truncate'` 在文本行数超出高度部分截断。


####### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

######## <style_name>(Object)



######### color(Color) = "#fff"

<ExampleUIControlColor default="null" />

文字的颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

######### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

######### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

######### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字的字体大小。


######### align(string) = 

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```





######### verticalAlign(string) = 

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```




######### lineHeight(number) = 

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




######### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。




######### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字块边框描边类型。



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


######### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

######### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

######### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

######### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

######### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

######### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。


######### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

######### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。




如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。






######### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




######### textBorderType(string|number|Array) = 'solid'


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


######### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









######### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

######### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

######### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

######### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。



















### animation(boolean) = false

<ExampleUIControlBoolean default="false" clean="true" />

是否开启动画。

### animationThreshold(number) = 2000

是否开启动画的阈值，当单个系列显示的图形数量大于这个阈值时会关闭动画。



### animationDuration(number|Function) = 1000

<ExampleUIControlNumber min="0" default="1000" step="20" clean="true" />

初始动画的时长，支持回调函数，可以通过每个数据返回不同的时长实现更戏剧的初始动画效果：

```js
animationDuration: function (idx) {
    // 越往后的数据时长越大
    return idx * 100;
}
```

### animationEasing(string) = cubicOut

<ExampleUIControlEnum options="linear,quadraticIn,quadraticOut,quadraticInOut,cubicIn,cubicOut,cubicInOut,quarticIn,quarticOut,quarticInOut,quinticIn,quinticOut,quinticInOut,sinusoidalIn,sinusoidalOut,sinusoidalInOut,exponentialIn,exponentialOut,exponentialInOut,circularIn,circularOut,circularInOut,elasticIn,elasticOut,elasticInOut,backIn,backOut,backInOut,bounceIn,bounceOut,bounceInOut" clean="true" />

初始动画的缓动效果。不同的缓动效果可以参考 [缓动示例](line-easing)。


### animationDelay(number|Function) = 0

初始动画的延迟，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更戏剧的初始动画效果。

如下示例：
```js
animationDelay: function (idx) {
    // 越往后的数据延迟越大
    return idx * 100;
}
```

也可以看[该示例](bar-animation-delay)




### animationDurationUpdate(number|Function) = 300

<ExampleUIControlNumber min="0" default="1000" step="20" />

数据更新动画的时长。

支持回调函数，可以通过每个数据返回不同的时长实现更戏剧的更新动画效果：

```js
animationDurationUpdate: function (idx) {
    // 越往后的数据时长越大
    return idx * 100;
}
```

### animationEasingUpdate(string) = cubicInOut

<ExampleUIControlEnum options="linear,quadraticIn,quadraticOut,quadraticInOut,cubicIn,cubicOut,cubicInOut,quarticIn,quarticOut,quarticInOut,quinticIn,quinticOut,quinticInOut,sinusoidalIn,sinusoidalOut,sinusoidalInOut,exponentialIn,exponentialOut,exponentialInOut,circularIn,circularOut,circularInOut,elasticIn,elasticOut,elasticInOut,backIn,backOut,backInOut,bounceIn,bounceOut,bounceInOut" />

数据更新动画的缓动效果。


### animationDelayUpdate(number|Function) = 0

数据更新动画的延迟，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更戏剧的更新动画效果。

如下示例：
```js
animationDelayUpdate: function (idx) {
    // 越往后的数据延迟越大
    return idx * 100;
}
```

也可以看[该示例](bar-animation-delay)
















## silent(boolean) = false

<ExampleUIControlBoolean />

图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。





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
