# series.gauge(Object)

**仪表盘**

**示例：**
~[600x500](${galleryViewPath}gauge&reset=1&edit=1)

<ExampleBaseOption name="gauge" title="基础仪表盘" title-en="Basic Gauge">
const option = {
    series: [
        {
            name: 'Indicator',
            type: 'gauge',
            detail: {formatter: '{value}%'},
            data: [{value: 50, name: 'Percent'}]
        }
    ]
};
</ExampleBaseOption>

## type(string) = 'gauge'









<!-- overwrite radius -->

## radius(number|string) = '75%'

<ExampleUIControlPercent default="75%" />

仪表盘半径，可以是相对于容器高宽中较小的一项的一半的百分比，也可以是绝对的数值。



## startAngle(number) = 225

<ExampleUIControlAngle min="-360" max="360" default="225" step="1" />

仪表盘起始角度。[圆心](~series-gauge.center) 正右手侧为`0`度，正上方为`90`度，正左手侧为`180`度。

## endAngle(number) = -45

<ExampleUIControlAngle min="-360" max="360" default="-45" step="1" />

仪表盘结束角度。

## clockwise(boolean) = true

<ExampleUIControlBoolean default="true" />

仪表盘刻度是否是顺时针增长。

## data(Array)





#${prefix} title(Object)

仪表盘标题。

##${prefix} show(boolean) = true

<ExampleUIControlBoolean default="true" />

是否显示标题。

##${prefix} offsetCenter(Array) = [0, '20%']

<ExampleUIControlPercentVector default="0,20%" dims="x,y" />

相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。



##${prefix} valueAnimation(boolean) = true



是否开启标签的数字动画。

#${prefix} detail(Object)

仪表盘详情，用于显示数据。

##${prefix} show(boolean) = true

<ExampleUIControlBoolean default="true" />

是否显示详情。



##${prefix} valueAnimation(boolean) = true



是否开启标签的数字动画。

##${prefix} width(number) = 100

<ExampleUIControlPercent default="100" min="0" step="1" />

详情宽度。

##${prefix} height(number) = 40

<ExampleUIControlPercent default="40" min="0" step="1" />

详情高度。

##${prefix} color(Color) = '#464646'

<ExampleUIControlColor />

文本颜色，默认取数值所在的[区间的颜色](~series-gauge.axisLine.lineStyle.color)。

##${prefix} backgroundColor(Color) = 'transparent'

<ExampleUIControlColor />

详情背景色。

##${prefix} borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

详情边框宽度。

##${prefix} borderColor(Color) = '#ccc'

<ExampleUIControlColor default="#ccc" />

详情边框颜色。

##${prefix} offsetCenter(Array) = [0, '40%']

<ExampleUIControlPercentVector default="0,-40%" dims="x,y" />

相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。

##${prefix} formatter(Function|string)

格式化函数或者字符串

```js
formatter: function (value) {
    return value.toFixed(0);
}
```



### name(string)

数据项名称。

### value(number)

<ExampleUIControlNumber default="0" step="1" />

数据值。

### itemStyle(Object)

数据项的指针样式。



## min(number) = 0

<ExampleUIControlNumber default="0" step="1" />

最小的数据值，映射到 [minAngle](~series-gauge.minAngle)。

## max(number) = 100

<ExampleUIControlNumber default="100" step="1" />

最大的数据值，映射到 [maxAngle](~series-gauge.maxAngle)。

## splitNumber(number) = 10

<ExampleUIControlNumber min="1" default="10" step="1" />

仪表盘刻度的分割段数。

## axisLine(Object)

仪表盘轴线相关配置。

### show(boolean) = true

<ExampleUIControlBoolean default="true" />

是否显示仪表盘轴线。

### roundCap(boolean) = false



是否在两端显示成圆形。

### lineStyle(Object)

仪表盘轴线样式。

#### color(Array)

仪表盘的轴线可以被分成不同颜色的多段。每段的结束位置和颜色可以通过一个数组来表示。

默认取值：
```js
[[1, '#E6EBF8']]
```

#### width(number) = 10

轴线宽度。



## progress(Object)



展示当前进度。

### show(boolean) = false

<ExampleUIControlBoolean default="true" />

是否显示进度条。

### overlap(boolean) = true

<ExampleUIControlBoolean default="true" />

多组数据时进度条是否重叠。

### width(number) = 10

<ExampleUIControlBoolean default="true" />

进度条宽度。

### roundCap(boolean) = false

是否在两端显示成圆形。

### clip(boolean) = false

是否裁掉超出部分。

### itemStyle(Object)

进度条样式。



## splitLine(Object)

分隔线样式。

### show(boolean) = true

<ExampleUIControlBoolean default="true" />

是否显示分隔线。

### length(number|string) = 10

<ExampleUIControlPercent default="10" min="0" step="0.5" />

分隔线线长。支持相对半径的百分比。

### distance(number) = 10



<ExampleUIControlNumber default="10"  step="0.5" />

分隔线与轴线的距离。

### lineStyle(Object)



## axisTick(Object)

刻度样式。

### show(boolean) = true

<ExampleUIControlBoolean default="true" />

是否显示刻度。

### splitNumber(number) = 5

<ExampleUIControlNumber min="1" default="5" step="1" />

分隔线之间分割的刻度数。

### length(number|string) = 6

<ExampleUIControlPercent default="6" min="0" step="0.5" />

刻度线长。支持相对半径的百分比。

### distance(number) = 10



<ExampleUIControlNumber default="10" step="0.5" />

刻度线与轴线的距离。

### lineStyle(Object)



## axisLabel(Object)

刻度标签。

### show(boolean) = true

<ExampleUIControlBoolean default="true" />

是否显示标签。

### distance(number) = 15

<ExampleUIControlNumber default="15" step="0.5" />

标签与刻度线的距离。

### formatter(string|Function)

刻度标签的内容格式器，支持字符串模板和回调函数两种形式。
示例:
```js
// 使用字符串模板，模板变量为刻度默认标签 {value}
formatter: '{value} kg'

// 使用函数模板，函数参数分别为刻度数值
formatter: function (value) {
    return value + 'km/h';
}
```



## pointer(Object)

仪表盘指针。

### show(boolean) = true

<ExampleUIControlBoolean default="true" />

是否显示指针。

### showAbove(boolean) = true



<ExampleUIControlBoolean default="true" />

指针是否显示在标题和仪表盘详情上方。

### icon(string) = null





### offsetCenter(Array) = [0, 0]



<ExampleUIControlPercentVector default="0,0" dims="x,y" />

相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。

### length(string|number) = '60%'

<ExampleUIControlPercent default="60%" min="0" step="0.5" />

指针长度，可以是绝对数值，也可以是相对于[半径](~series-gauge.radius)的半分比。

### width(number) = 6

<ExampleUIControlNumber default="6" min="0" step="0.5" />

指针宽度。

### keepAspect(boolean) = false



<ExampleUIControlBoolean default="false" />

如果图标是 `path://` 的形式，是否在缩放时保持该图形的长宽比。

### itemStyle(Object)

指针样式。



## anchor(Object)



表盘中指针的固定点。

### show(boolean) = true

<ExampleUIControlBoolean default="true" />

是否显示固定点。

### showAbove(boolean) = false

<ExampleUIControlBoolean default="false" />

固定点是否显示在指针上面。

### size(number) = 6

<ExampleUIControlNumber default="6" min="0" step="0.5" />

固定点大小。

### icon(string) = 'circle'



### offsetCenter(Array) = [0, 0]

<ExampleUIControlPercentVector default="0,0" dims="x,y" />

相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。

### keepAspect(boolean) = false

<ExampleUIControlBoolean default="false" />

如果图标是 `path://` 的形式，是否在缩放时保持该图形的长宽比。

### itemStyle(Object)

指针固定点样式。



<!-- overwrite borderColor -->

#### borderColor(Color) = '#5470c6'

<ExampleUIControlColor default="#5470c6" />

固定点边框颜色。

## itemStyle(Object)

仪表盘指针样式。



<!-- overwrite color -->

### color(Color) = 'auto'

指针颜色，默认取数值所在的[区间的颜色](~series-gauge.axisLine.lineStyle.color)。

## emphasis(Object)

高亮的仪表盘指针样式

### itemStyle(*)





#${prefix} title(Object)

仪表盘标题。

##${prefix} show(boolean) = true

<ExampleUIControlBoolean default="true" />

是否显示标题。

##${prefix} offsetCenter(Array) = [0, '20%']

<ExampleUIControlPercentVector default="0,20%" dims="x,y" />

相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。



##${prefix} valueAnimation(boolean) = true



是否开启标签的数字动画。

#${prefix} detail(Object)

仪表盘详情，用于显示数据。

##${prefix} show(boolean) = true

<ExampleUIControlBoolean default="true" />

是否显示详情。



##${prefix} valueAnimation(boolean) = true



是否开启标签的数字动画。

##${prefix} width(number) = 100

<ExampleUIControlPercent default="100" min="0" step="1" />

详情宽度。

##${prefix} height(number) = 40

<ExampleUIControlPercent default="40" min="0" step="1" />

详情高度。

##${prefix} color(Color) = '#464646'

<ExampleUIControlColor />

文本颜色，默认取数值所在的[区间的颜色](~series-gauge.axisLine.lineStyle.color)。

##${prefix} backgroundColor(Color) = 'transparent'

<ExampleUIControlColor />

详情背景色。

##${prefix} borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

详情边框宽度。

##${prefix} borderColor(Color) = '#ccc'

<ExampleUIControlColor default="#ccc" />

详情边框颜色。

##${prefix} offsetCenter(Array) = [0, '40%']

<ExampleUIControlPercentVector default="0,-40%" dims="x,y" />

相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。

##${prefix} formatter(Function|string)

格式化函数或者字符串

```js
formatter: function (value) {
    return value.toFixed(0);
}
```









#${prefix} animation(boolean) = ${defaultAnimation|default(true)}

<ExampleUIControlBoolean default="${defaultAnimation|default(true)}" clean="true" />

是否开启动画。

#${prefix} animationThreshold(number) = ${defaultAnimationThreshold|default(2000)}

是否开启动画的阈值，当单个系列显示的图形数量大于这个阈值时会关闭动画。



#${prefix} animationDuration(number|Function) = ${defaultAnimationDuration|default(1000)}

<ExampleUIControlNumber min="0" default="${defaultAnimationDuration|default(1000)}" step="20" clean="true" />

初始动画的时长，支持回调函数，可以通过每个数据返回不同的时长实现更戏剧的初始动画效果：

```js
animationDuration: function (idx) {
    // 越往后的数据时长越大
    return idx * 100;
}
```

#${prefix} animationEasing(string) = ${defaultAnimationEasing|default('cubicOut')}

<ExampleUIControlEnum options="linear,quadraticIn,quadraticOut,quadraticInOut,cubicIn,cubicOut,cubicInOut,quarticIn,quarticOut,quarticInOut,quinticIn,quinticOut,quinticInOut,sinusoidalIn,sinusoidalOut,sinusoidalInOut,exponentialIn,exponentialOut,exponentialInOut,circularIn,circularOut,circularInOut,elasticIn,elasticOut,elasticInOut,backIn,backOut,backInOut,bounceIn,bounceOut,bounceInOut" clean="true" />

初始动画的缓动效果。不同的缓动效果可以参考 [缓动示例](${galleryEditorPath}line-easing)。

{{ if: !${noAnimationDelay} }}
#${prefix} animationDelay(number|Function) = 0

初始动画的延迟，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更戏剧的初始动画效果。

如下示例：
```js
animationDelay: function (idx) {
    // 越往后的数据延迟越大
    return idx * 100;
}
```

也可以看[该示例](${galleryEditorPath}bar-animation-delay)
{{ /if }}



#${prefix} animationDurationUpdate(number|Function) = ${defaultAnimationDurationUpdate|default(300)}

<ExampleUIControlNumber min="0" default="${defaultAnimationDuration|default(1000)}" step="20" />

数据更新动画的时长。

支持回调函数，可以通过每个数据返回不同的时长实现更戏剧的更新动画效果：

```js
animationDurationUpdate: function (idx) {
    // 越往后的数据时长越大
    return idx * 100;
}
```

#${prefix} animationEasingUpdate(string) = ${defaultAnimationEasingUpdate|default('cubicInOut')}

<ExampleUIControlEnum options="linear,quadraticIn,quadraticOut,quadraticInOut,cubicIn,cubicOut,cubicInOut,quarticIn,quarticOut,quarticInOut,quinticIn,quinticOut,quinticInOut,sinusoidalIn,sinusoidalOut,sinusoidalInOut,exponentialIn,exponentialOut,exponentialInOut,circularIn,circularOut,circularInOut,elasticIn,elasticOut,elasticInOut,backIn,backOut,backInOut,bounceIn,bounceOut,bounceInOut" />

数据更新动画的缓动效果。

{{ if: !${noAnimationDelay} }}
#${prefix} animationDelayUpdate(number|Function) = 0

数据更新动画的延迟，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更戏剧的更新动画效果。

如下示例：
```js
animationDelayUpdate: function (idx) {
    // 越往后的数据延迟越大
    return idx * 100;
}
```

也可以看[该示例](${galleryEditorPath}bar-animation-delay)
{{ /if }}
