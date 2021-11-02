# series.line(Object)

**折线/面积图**

折线图是用折线将各个数据点[标志](~series-line.symbol)连接起来的图表，用于展现数据的变化趋势。可用于[直角坐标系](~grid)和[极坐标系](~polar)上。

**Tip:** 设置 [areaStyle](~series-line.areaStyle) 后可以绘制面积图。

**Tip:** 配合分段型 [visualMap](~visualMap-piecewise) 组件可以将折线/面积图通过不同颜色分区间。如下示例

~[600x400](${galleryViewPath}line-aqi&edit=1&reset=1)

<ExampleBaseOption name="cartesian-line" title="基础折线图" title-en="Basic Line Chart">
const option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {},
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
};
</ExampleBaseOption>

<ExampleBaseOption name="cartesian-line-empty-data" title="有空数据的折线图" title-en="Line with Empty Data">
const option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {},
    series: [{
        data: [820, 932, 901, '-', 1290, 1330, 1320],
        type: 'line'
    }]
};
</ExampleBaseOption>

## type(string) = 'line'











## showSymbol(boolean) = true

<ExampleUIControlBoolean default="true" />

是否显示 symbol, 如果 `false` 则只有在 tooltip hover 的时候显示。

## showAllSymbol(boolean) = 'auto'

<ExampleUIControlBoolean />

只在主轴为类目轴（`axis.type` 为 `'category'`）时有效。
可选值：
+ `'auto'`：默认，如果有足够空间则显示标志图形，否则随主轴标签间隔隐藏策略。
+ `true`：显示所有图形。
+ `false`：随主轴标签间隔隐藏策略。



## stack(string) = null

数据堆叠，同个类目轴上系列配置相同的`stack`值后，后一个系列的值会在前一个系列的值上相加。

下面示例可以通过右上角 [toolbox](~toolbox) 中的堆叠切换看效果：

~[600x400](${galleryViewPath}doc-example/line-stack-tiled&edit=1&reset=1)



## connectNulls(boolean) = false

<ExampleUIControlBoolean />

是否连接空数据。



## triggerLineEvent(boolean) = false



线条和区域面积是否触发事件

## step(string|boolean) = false

<ExampleUIControlEnum options='start,middle,end' />

是否是阶梯线图。可以设置为 `true` 显示成阶梯线图，也支持设置成 `'start'`, `'middle'`, `'end'` 分别配置在当前点，当前点与下个点的中间点，下个点拐弯。

不同的配置效果如下：

~[600x400](${galleryViewPath}line-step&edit=1&reset=1)

## label(Object)





## endLabel(Object)



折线端点的标签。



### valueAnimation(boolean)

是否开启标签的数字动画。

## labelLine(Object)





## labelLayout(Object|Function)



## itemStyle(Object)

折线拐点标志的样式。



## lineStyle(Object)

线条样式。

**注：** 修改 `lineStyle` 中的颜色不会影响图例颜色，如果需要图例颜色和折线图颜色一致，需修改 [itemStyle.color](~series-line.itemStyle.color)，线条颜色默认也会取该颜色。



## areaStyle(Object)

区域填充样式。设置后显示成区域面积图。



## emphasis(Object)

折线图的高亮状态。

### scale(boolean) = true

是否开启 hover 在拐点标志上的放大效果。





### label(Object)



### labelLine(Object)





### itemStyle(Object)



### lineStyle(Object)



### areaStyle(Object)







### endLabel(Object)





## blur(Object)



折线图的淡出状态。开启 [emphasis.focus](~series-line.emphasis.focus) 后有效。



### label(Object)



### labelLine(Object)





### itemStyle(Object)



### lineStyle(Object)



### areaStyle(Object)







### endLabel(Object)



## select(Object)



折线图的选中状态。开启 [selectedMode](~series-line.selectedMode) 后有效。



### label(Object)



### labelLine(Object)





### itemStyle(Object)



### lineStyle(Object)



### areaStyle(Object)







### endLabel(Object)





## smooth(boolean|number) = false

是否平滑曲线显示。

如果是 `boolean` 类型，则表示是否开启平滑处理。如果是 `number` 类型（取值范围 0 到 1），表示平滑程度，越小表示越接近折线段，反之则反。设为 `true` 时相当于设为 `0.5`。

如果需要修改平滑算法，请参考 [smoothMonotone](~series-line.smoothMonotone)。

## smoothMonotone(string)

折线平滑后是否在一个维度上保持单调性，可以设置成`'x'`, `'y'`来指明是在 x 轴或者 y 轴上保持单调性。

通常在双数值轴上使用。

下面两张图分别是双数值轴中的折线图`smoothMonotone`不设置以及设置为`'x'`的区别。

+ 不设置`smoothMonotone`:

![300xauto](~smooth-monotone-none.png)

+ 设置为 `'x'`:

![300xauto](~smooth-monotone-x.png)

## sampling(string)

折线图在数据量远大于像素点时候的降采样策略，开启后可以有效的优化图表的绘制效率，默认关闭，也就是全部绘制不过滤数据点。

可选：
+ `'lttb'` 采用 Largest-Triangle-Three-Bucket 算法，可以最大程度保证采样后线条的趋势，形状和极值。
+ `'average'` 取过滤点的平均值
+ `'max'` 取过滤点的最大值
+ `'min'` 取过滤点的最小值
+ `'sum'` 取过滤点的和











## data(Array)



### name(string)

数据项名称。

### value(number)

单个数据项的数值。





### label(Object)

单个拐点文本的样式设置。



### labelLine(Object)





### itemStyle(Object)

单个拐点标志的样式设置。



### emphasis(Object)

单个拐点的高亮样式和标签设置。



#### label(Object)



#### itemStyle(Object)





### blur(Object)

单个拐点的淡出样式和标签设置。



#### label(Object)



#### itemStyle(Object)





### select(Object)

单个拐点的选中样式和标签设置。



#### label(Object)



#### itemStyle(Object)















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
