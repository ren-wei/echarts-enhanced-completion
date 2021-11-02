# series.effectScatter(Object)

带有涟漪特效动画的散点（气泡）图。利用动画特效可以将某些想要突出的数据进行视觉突出。

**Tip:** ECharts 2.x 中在地图上通过 markPoint 实现地图特效在 ECharts 3 中建议通过地理坐标系上的 effectScatter 实现。

<ExampleBaseOption name="effectScatter-bubble" title="特效气泡图" title-en="Bubble Chart with Effect">
const option = {
    xAxis: {},
    yAxis: {
        scale: true
    },
    series: [{
        name: '1990',
        type: 'effectScatter',
        data: [[28604,77,17096869,'Australia',1990],[31163,77.4,27662440,'Canada',1990],[1516,68,1154605773,'China',1990],[13670,74.7,10582082,'Cuba',1990],[28599,75,4986705,'Finland',1990],[29476,77.1,56943299,'France',1990],[31476,75.4,78958237,'Germany',1990],[28666,78.1,254830,'Iceland',1990],[1777,57.7,870601776,'India',1990],[29550,79.1,122249285,'Japan',1990],[2076,67.9,20194354,'North Korea',1990],[12087,72,42972254,'South Korea',1990],[24021,75.4,3397534,'New Zealand',1990],[43296,76.8,4240375,'Norway',1990],[10088,70.8,38195258,'Poland',1990],[19349,69.6,147568552,'Russia',1990],[10670,67.3,53994605,'Turkey',1990],[26424,75.7,57110117,'United Kingdom',1990],[37062,75.4,252847810,'United States',1990]],
        symbolSize: function (data) {
            return Math.sqrt(data[2]) / 5e2;
        }
    }]
};
</ExampleBaseOption>

## type(string) = 'effectScatter'









## effectType(string) = 'ripple'

<ExampleUIControlEnum options="ripple" />

特效类型，目前只支持涟漪特效`'ripple'`。

## showEffectOn(string) = 'render'

<ExampleUIControlEnum options="render,emphasis" default="render" />

配置何时显示特效。

**可选：**
+ `'render'` 绘制完成后显示特效。
+ `'emphasis'` 高亮（hover）的时候显示特效。

## rippleEffect(Object)

涟漪特效相关配置。

### color(string)



<ExampleUIControlColor />

涟漪的颜色，默认为散点的颜色。

### number(number) = 3



<ExampleUIControlNumber min="0" default="3" step="1" />

波纹的数量。

### period(number) = 4

<ExampleUIControlNumber min="0" default="4" step="0.1" />

动画的周期，秒数。

### scale(number) = 2.5

<ExampleUIControlNumber min="1" default="2.5" step="0.1" />

动画中波纹的最大缩放比例。

### brushType(string) = 'fill'

<ExampleUIControlEnum options="stroke,fill" default="fill" />

波纹的绘制方式，可选 `'stroke'` 和 `'fill'`。







## label(Object)





## labelLine(Object)





## labelLayout(Object|Function)



## itemStyle(Object)





## emphasis(Object)

高亮的图形和标签样式。

### scale(boolean) = true

<ExampleUIControlBoolean default="true" />

是否开启高亮后的放大效果。





#${prefix} label(Object)



#${prefix} labelLine(Object)





#${prefix} itemStyle(Object)





## blur(Object)



淡出状态的配置。开启 [emphasis.focus](~series-effectScatter.emphasis.focus) 后有效。



#${prefix} label(Object)



#${prefix} labelLine(Object)





#${prefix} itemStyle(Object)





## select(Object)



选中状态的配置。开启 [selectedMode](~series-effectScatter.selectedMode) 后有效。



#${prefix} label(Object)



#${prefix} labelLine(Object)





#${prefix} itemStyle(Object)















## data(Array)





### label(Object)



### labelLine(Object)





### itemStyle(Object)



### emphasis(Object)

单个数据的高亮图形和标签样式。



#${prefix} label(Object)



#${prefix} labelLine(Object)





#${prefix} itemStyle(Object)





### blur(Object)



单个数据的淡出图形和标签样式。



#${prefix} label(Object)



#${prefix} labelLine(Object)





#${prefix} itemStyle(Object)





### select(Object)

单个数据的选中图形和标签样式。



#${prefix} label(Object)



#${prefix} labelLine(Object)





#${prefix} itemStyle(Object)

















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
