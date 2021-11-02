# series.funnel(Object)

**漏斗图**

**示例：**
~[600x400](${galleryViewPath}funnel&reset=1&edit=1)

<ExampleBaseOption name="funnel" tilte="基础漏斗图" title-en="Basic Funnel">
option = {
    legend: {
        data: ['Display','Click','Visit','Consulting','Order']
    },
    series: [
        {
            name:'漏斗图',
            type:'funnel',
            data: [
                {value: 60, name: 'Visit'},
                {value: 40, name: 'Consulting'},
                {value: 20, name: 'Order'},
                {value: 80, name: 'Click'},
                {value: 100, name: 'Display'}
            ]
        }
    ]
};

</ExampleBaseOption>

## type(string) = 'funnel'







## min(number) = 0

<ExampleUIControlNumber default="0" step="1" />

指定的数据最小值。

## max(number) = 100

<ExampleUIControlNumber default="100" step="1" />

指定的数据最大值。

## minSize(number|string) = '0%'

<ExampleUIControlPercent default="0%" />

数据最小值 [min](~series-funnel.min) 映射的宽度。

可以是绝对的像素大小，也可以是相对[布局宽度](~series-funnel.width)的百分比，如果需要最小值的图形并不是尖端三角，可通过设置该属性实现。

## maxSize(number|string) = '100%'

<ExampleUIControlPercent default="100%" />

数据最大值 [max](~series-funnel.max) 映射的宽度。

可以是绝对的像素大小，也可以是相对[布局宽度](~series-funnel.width)的百分比。

## orient(string) = 'vertical'

<ExampleUIControlEnum options="vertical,horizontal" />

漏斗图朝向，支持配置为`'vertical'`或者`'horizontal'`。



## sort(string|Function) = 'descending'

<ExampleUIControlEnum options="none,descending,ascending" default="descending" />

数据排序， 可以取 `'ascending'`，`'descending'`，`'none'`（表示按 data 顺序），或者一个函数（即 `Array.prototype.sort(function (a, b) { ... })`）。

## gap(number) = 0

<ExampleUIControlNumber default="0" min="0" step="0.5" />

数据图形间距。



## funnelAlign(string) = 'center'

<ExampleUIControlEnum options="left,center,right" default="center" />

水平方向对齐布局类型，默认居中对齐，可用选项还有：'left' | 'right' | 'center'

## label(Object)





#${prefix} show(boolean) = false

{{ if: ${position} }}
#${prefix} position(string) = 'outside'

标签的位置。

**可选：**
+ `'left'` 漏斗图左侧，[orient](~series-funnel.orient) 为`'vertical'`时有效。
+ `'right'` 漏斗图右侧，[orient](~series-funnel.orient) 为`'vertical'`时有效。
+ `'top'` 漏斗图上侧，[orient](~series-funnel.orient) 为`'horizontal'`时有效。
+ `'bottom'` 漏斗图下侧，[orient](~series-funnel.orient) 为`'horizontal'`时有效。
+ `'inside'` 漏斗图梯形内部。
+ `'insideRight'` 漏斗图梯形内部右侧。
+ `'insideLeft'` 漏斗图梯形内部左侧。
+ `'leftTop'` 漏斗图左侧上部。
+ `'leftBottom'`  漏斗图左侧下部。
+ `'rightTop'`  漏斗图右侧上部。
+ `'rightBottom'`  漏斗图右侧下部。
+ `'inner'` 同 `'inside'`。
+ `'center'` 同 `'inside'`。

在不是配置为内部的时候标签可以通过[视觉引导线](~series-funnel.labelLine)连到相应的梯形。
通过[视觉引导线](~series-funnel.labelLine)连到相应的梯形。
{{ /if }}

{{ if: ${formatter} }}
#${prefix} formatter(string|Function)


{{ /if }}







## labelLine(Object)

标签的视觉引导线样式，在 [label 位置](~series-funnel.label.position) 设置为`'left'`或者`'right'`的时候会显示视觉引导线。



#${prefix} show(boolean)

是否显示视觉引导线。

{{ if: ${length} }}
#${prefix} length(number)

视觉引导线的长度。
{{ /if }}

#${prefix} lineStyle(Object)





## itemStyle(Object)





## labelLayout(Object|Function)



## emphasis(Object)

高亮的标签和图形样式。





#${prefix} label(Object)



#${prefix} show(boolean) = false

{{ if: ${position} }}
#${prefix} position(string) = 'outside'

标签的位置。

**可选：**
+ `'left'` 漏斗图左侧，[orient](~series-funnel.orient) 为`'vertical'`时有效。
+ `'right'` 漏斗图右侧，[orient](~series-funnel.orient) 为`'vertical'`时有效。
+ `'top'` 漏斗图上侧，[orient](~series-funnel.orient) 为`'horizontal'`时有效。
+ `'bottom'` 漏斗图下侧，[orient](~series-funnel.orient) 为`'horizontal'`时有效。
+ `'inside'` 漏斗图梯形内部。
+ `'insideRight'` 漏斗图梯形内部右侧。
+ `'insideLeft'` 漏斗图梯形内部左侧。
+ `'leftTop'` 漏斗图左侧上部。
+ `'leftBottom'`  漏斗图左侧下部。
+ `'rightTop'`  漏斗图右侧上部。
+ `'rightBottom'`  漏斗图右侧下部。
+ `'inner'` 同 `'inside'`。
+ `'center'` 同 `'inside'`。

在不是配置为内部的时候标签可以通过[视觉引导线](~series-funnel.labelLine)连到相应的梯形。
通过[视觉引导线](~series-funnel.labelLine)连到相应的梯形。
{{ /if }}

{{ if: ${formatter} }}
#${prefix} formatter(string|Function)


{{ /if }}







#${prefix} labelLine(Object)



#${prefix} show(boolean)

是否显示视觉引导线。

{{ if: ${length} }}
#${prefix} length(number)

视觉引导线的长度。
{{ /if }}

#${prefix} lineStyle(Object)





#${prefix} itemStyle(Object)







## blur(Object)



淡出时的图形样式和标签样式。开启 [emphasis.focus](~series-funnel.emphasis.focus) 后有效



#${prefix} label(Object)



#${prefix} show(boolean) = false

{{ if: ${position} }}
#${prefix} position(string) = 'outside'

标签的位置。

**可选：**
+ `'left'` 漏斗图左侧，[orient](~series-funnel.orient) 为`'vertical'`时有效。
+ `'right'` 漏斗图右侧，[orient](~series-funnel.orient) 为`'vertical'`时有效。
+ `'top'` 漏斗图上侧，[orient](~series-funnel.orient) 为`'horizontal'`时有效。
+ `'bottom'` 漏斗图下侧，[orient](~series-funnel.orient) 为`'horizontal'`时有效。
+ `'inside'` 漏斗图梯形内部。
+ `'insideRight'` 漏斗图梯形内部右侧。
+ `'insideLeft'` 漏斗图梯形内部左侧。
+ `'leftTop'` 漏斗图左侧上部。
+ `'leftBottom'`  漏斗图左侧下部。
+ `'rightTop'`  漏斗图右侧上部。
+ `'rightBottom'`  漏斗图右侧下部。
+ `'inner'` 同 `'inside'`。
+ `'center'` 同 `'inside'`。

在不是配置为内部的时候标签可以通过[视觉引导线](~series-funnel.labelLine)连到相应的梯形。
通过[视觉引导线](~series-funnel.labelLine)连到相应的梯形。
{{ /if }}

{{ if: ${formatter} }}
#${prefix} formatter(string|Function)


{{ /if }}







#${prefix} labelLine(Object)



#${prefix} show(boolean)

是否显示视觉引导线。

{{ if: ${length} }}
#${prefix} length(number)

视觉引导线的长度。
{{ /if }}

#${prefix} lineStyle(Object)





#${prefix} itemStyle(Object)







## select(Object)



数据选中时的图形样式和标签样式。开启 [selectedMode](~series-funnel.selectedMode) 后有效。



#${prefix} label(Object)



#${prefix} show(boolean) = false

{{ if: ${position} }}
#${prefix} position(string) = 'outside'

标签的位置。

**可选：**
+ `'left'` 漏斗图左侧，[orient](~series-funnel.orient) 为`'vertical'`时有效。
+ `'right'` 漏斗图右侧，[orient](~series-funnel.orient) 为`'vertical'`时有效。
+ `'top'` 漏斗图上侧，[orient](~series-funnel.orient) 为`'horizontal'`时有效。
+ `'bottom'` 漏斗图下侧，[orient](~series-funnel.orient) 为`'horizontal'`时有效。
+ `'inside'` 漏斗图梯形内部。
+ `'insideRight'` 漏斗图梯形内部右侧。
+ `'insideLeft'` 漏斗图梯形内部左侧。
+ `'leftTop'` 漏斗图左侧上部。
+ `'leftBottom'`  漏斗图左侧下部。
+ `'rightTop'`  漏斗图右侧上部。
+ `'rightBottom'`  漏斗图右侧下部。
+ `'inner'` 同 `'inside'`。
+ `'center'` 同 `'inside'`。

在不是配置为内部的时候标签可以通过[视觉引导线](~series-funnel.labelLine)连到相应的梯形。
通过[视觉引导线](~series-funnel.labelLine)连到相应的梯形。
{{ /if }}

{{ if: ${formatter} }}
#${prefix} formatter(string|Function)


{{ /if }}







#${prefix} labelLine(Object)



#${prefix} show(boolean)

是否显示视觉引导线。

{{ if: ${length} }}
#${prefix} length(number)

视觉引导线的长度。
{{ /if }}

#${prefix} lineStyle(Object)





#${prefix} itemStyle(Object)





















## data(Array)



### name(string)

数据项名称。

### value(number)

数据值。

### itemStyle(Object)



#### height(string|number)

该数据项的高度。默认平均分配高度，如果需要修改，可以将其设为百分比（如：`'10%'`）或像素值（如：`20px`）。需要注意总和应为 100%。



### label(Object)

单个数据的标签配置。



#${prefix} show(boolean) = false

{{ if: ${position} }}
#${prefix} position(string) = 'outside'

标签的位置。

**可选：**
+ `'left'` 漏斗图左侧，[orient](~series-funnel.orient) 为`'vertical'`时有效。
+ `'right'` 漏斗图右侧，[orient](~series-funnel.orient) 为`'vertical'`时有效。
+ `'top'` 漏斗图上侧，[orient](~series-funnel.orient) 为`'horizontal'`时有效。
+ `'bottom'` 漏斗图下侧，[orient](~series-funnel.orient) 为`'horizontal'`时有效。
+ `'inside'` 漏斗图梯形内部。
+ `'insideRight'` 漏斗图梯形内部右侧。
+ `'insideLeft'` 漏斗图梯形内部左侧。
+ `'leftTop'` 漏斗图左侧上部。
+ `'leftBottom'`  漏斗图左侧下部。
+ `'rightTop'`  漏斗图右侧上部。
+ `'rightBottom'`  漏斗图右侧下部。
+ `'inner'` 同 `'inside'`。
+ `'center'` 同 `'inside'`。

在不是配置为内部的时候标签可以通过[视觉引导线](~series-funnel.labelLine)连到相应的梯形。
通过[视觉引导线](~series-funnel.labelLine)连到相应的梯形。
{{ /if }}

{{ if: ${formatter} }}
#${prefix} formatter(string|Function)


{{ /if }}







### labelLine(Object)



#${prefix} show(boolean)

是否显示视觉引导线。

{{ if: ${length} }}
#${prefix} length(number)

视觉引导线的长度。
{{ /if }}

#${prefix} lineStyle(Object)





### emphasis(Object)



#${prefix} label(Object)



#${prefix} show(boolean) = false

{{ if: ${position} }}
#${prefix} position(string) = 'outside'

标签的位置。

**可选：**
+ `'left'` 漏斗图左侧，[orient](~series-funnel.orient) 为`'vertical'`时有效。
+ `'right'` 漏斗图右侧，[orient](~series-funnel.orient) 为`'vertical'`时有效。
+ `'top'` 漏斗图上侧，[orient](~series-funnel.orient) 为`'horizontal'`时有效。
+ `'bottom'` 漏斗图下侧，[orient](~series-funnel.orient) 为`'horizontal'`时有效。
+ `'inside'` 漏斗图梯形内部。
+ `'insideRight'` 漏斗图梯形内部右侧。
+ `'insideLeft'` 漏斗图梯形内部左侧。
+ `'leftTop'` 漏斗图左侧上部。
+ `'leftBottom'`  漏斗图左侧下部。
+ `'rightTop'`  漏斗图右侧上部。
+ `'rightBottom'`  漏斗图右侧下部。
+ `'inner'` 同 `'inside'`。
+ `'center'` 同 `'inside'`。

在不是配置为内部的时候标签可以通过[视觉引导线](~series-funnel.labelLine)连到相应的梯形。
通过[视觉引导线](~series-funnel.labelLine)连到相应的梯形。
{{ /if }}

{{ if: ${formatter} }}
#${prefix} formatter(string|Function)


{{ /if }}







#${prefix} labelLine(Object)



#${prefix} show(boolean)

是否显示视觉引导线。

{{ if: ${length} }}
#${prefix} length(number)

视觉引导线的长度。
{{ /if }}

#${prefix} lineStyle(Object)





#${prefix} itemStyle(Object)







### blur(Object)





#${prefix} label(Object)



#${prefix} show(boolean) = false

{{ if: ${position} }}
#${prefix} position(string) = 'outside'

标签的位置。

**可选：**
+ `'left'` 漏斗图左侧，[orient](~series-funnel.orient) 为`'vertical'`时有效。
+ `'right'` 漏斗图右侧，[orient](~series-funnel.orient) 为`'vertical'`时有效。
+ `'top'` 漏斗图上侧，[orient](~series-funnel.orient) 为`'horizontal'`时有效。
+ `'bottom'` 漏斗图下侧，[orient](~series-funnel.orient) 为`'horizontal'`时有效。
+ `'inside'` 漏斗图梯形内部。
+ `'insideRight'` 漏斗图梯形内部右侧。
+ `'insideLeft'` 漏斗图梯形内部左侧。
+ `'leftTop'` 漏斗图左侧上部。
+ `'leftBottom'`  漏斗图左侧下部。
+ `'rightTop'`  漏斗图右侧上部。
+ `'rightBottom'`  漏斗图右侧下部。
+ `'inner'` 同 `'inside'`。
+ `'center'` 同 `'inside'`。

在不是配置为内部的时候标签可以通过[视觉引导线](~series-funnel.labelLine)连到相应的梯形。
通过[视觉引导线](~series-funnel.labelLine)连到相应的梯形。
{{ /if }}

{{ if: ${formatter} }}
#${prefix} formatter(string|Function)


{{ /if }}







#${prefix} labelLine(Object)



#${prefix} show(boolean)

是否显示视觉引导线。

{{ if: ${length} }}
#${prefix} length(number)

视觉引导线的长度。
{{ /if }}

#${prefix} lineStyle(Object)





#${prefix} itemStyle(Object)







### select(Object)





#${prefix} label(Object)



#${prefix} show(boolean) = false

{{ if: ${position} }}
#${prefix} position(string) = 'outside'

标签的位置。

**可选：**
+ `'left'` 漏斗图左侧，[orient](~series-funnel.orient) 为`'vertical'`时有效。
+ `'right'` 漏斗图右侧，[orient](~series-funnel.orient) 为`'vertical'`时有效。
+ `'top'` 漏斗图上侧，[orient](~series-funnel.orient) 为`'horizontal'`时有效。
+ `'bottom'` 漏斗图下侧，[orient](~series-funnel.orient) 为`'horizontal'`时有效。
+ `'inside'` 漏斗图梯形内部。
+ `'insideRight'` 漏斗图梯形内部右侧。
+ `'insideLeft'` 漏斗图梯形内部左侧。
+ `'leftTop'` 漏斗图左侧上部。
+ `'leftBottom'`  漏斗图左侧下部。
+ `'rightTop'`  漏斗图右侧上部。
+ `'rightBottom'`  漏斗图右侧下部。
+ `'inner'` 同 `'inside'`。
+ `'center'` 同 `'inside'`。

在不是配置为内部的时候标签可以通过[视觉引导线](~series-funnel.labelLine)连到相应的梯形。
通过[视觉引导线](~series-funnel.labelLine)连到相应的梯形。
{{ /if }}

{{ if: ${formatter} }}
#${prefix} formatter(string|Function)


{{ /if }}







#${prefix} labelLine(Object)



#${prefix} show(boolean)

是否显示视觉引导线。

{{ if: ${length} }}
#${prefix} length(number)

视觉引导线的长度。
{{ /if }}

#${prefix} lineStyle(Object)





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
