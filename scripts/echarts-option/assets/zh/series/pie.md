# series.pie(Object)

**饼图**

饼图主要用于表现不同类目的数据在总和中的占比。每个的弧度表示数据数量的比例。

从 ECharts v4.6.0 版本起，我们提供了 `'labelLine'` 与 `'edge'` 两种新的布局方式。详情参见 [label.alignTo](~series-pie.label.alignTo)。

~[900x250](${galleryViewPath}pie-alignTo&reset=1&edit=1)

对于一个图表中有多个饼图的场景，可以使用 [left](~series-pie.left)、[right](~series-pie.right)、[top](~series-pie.top)、[bottom](~series-pie.bottom)、[width](~series-pie.width)、[height](~series-pie.height) 配置每个饼图系列的位置和视口大小。[radius](~series-pie.radius)、[label.edgeDistance](~series-pie.label.edgeDistance) 等支持百分比的配置项，是相对于该配置项决定的矩形的大小而言的。

**Tip:** 饼图更适合表现数据相对于总数的百分比等关系。如果只是表示不同类目数据间的大小，建议使用 [柱状图](bar)，人们对于微小的弧度差别相比于微小的长度差别更不敏感，或者也可以通过配置 [roseType](~series-pie.roseType) 显示成南丁格尔图，通过半径大小区分数据的大小。

**下面是自定义南丁格尔图的示例：**
~[500x400](${galleryViewPath}pie-custom&edit=1&reset=1)

<ExampleBaseOption name="pie" title="基础饼图" title-en="Basic Pie">
const option = {
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Apple', 'Grapes', 'Pineapples', 'Oranges', 'Bananas']
    },
    series: [
        {
            type: 'pie',
            data: [
                {value: 335, name: 'Apple'},
                {value: 310, name: 'Grapes'},
                {value: 234, name: 'Pineapples'},
                {value: 135, name: 'Oranges'},
                {value: 1548, name: 'Bananas'}
            ]
        }
    ]
};

</ExampleBaseOption>

## type(string) = 'pie'











## selectedOffset(number) = 10

<ExampleUIControlNumber min="0" default="10" />

选中扇区的偏移距离。

## clockwise(boolean) = true

<ExampleUIControlBoolean default="true" />

饼图的扇区是否是顺时针排布。

## startAngle(number) = 90

<ExampleUIControlAngle step="1" min="0" max="360" default="90" />

起始角度，支持范围[0, 360]。

## minAngle(number) = 0

<ExampleUIControlAngle step="1" min="0" max="360" default="0" />

最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互。

## minShowLabelAngle(number) = 0

<ExampleUIControlAngle step="1" min="0" max="360" default="0" />

小于这个角度（0 ~ 360）的扇区，不显示标签（label 和 labelLine）。

## roseType(boolean|string) = false

<ExampleUIControlEnum options="radius,area" />

是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：

+ `'radius'` 扇区圆心角展现数据的百分比，半径展现数据的大小。
+ `'area'` 所有扇区圆心角相同，仅通过半径展现数据大小。

## avoidLabelOverlap(boolean) = true

<ExampleUIControlBoolean default="true" />

是否启用防止标签重叠策略，默认开启，在标签拥挤重叠的情况下会挪动各个标签的位置，防止标签间的重叠。

如果不需要开启该策略，例如[圆环图](${galleryEditorPath}pie-doughnut)这个例子中需要强制所有标签放在中心位置，可以将该值设为 `false`。

## stillShowZeroSum(boolean) = true

<ExampleUIControlBoolean default="true" />

是否在数据和为`0`（一般情况下所有数据为`0`） 的时候仍显示扇区。





## showEmptyCircle(boolean) = true

<ExampleUIControlBoolean default="true" />

是否在无数据的时候显示一个占位圆。

## emptyCircleStyle(Object)

占位圆样式。

<ExampleUIControlBoolean default="true" />




## label(Object)





#${prefix} show(boolean) = false

{{ if: ${position} }}
#${prefix} position(string) = 'outside'

标签的位置。

**可选：**
+ `'outside'`

    饼图扇区外侧，通过[视觉引导线](~series-pie.labelLine)连到相应的扇区。

+ `'inside'`

    饼图扇区内部。

+ `'inner'` 同 `'inside'`。
+ `'center'`

    在饼图中心位置。见[圆环图示例](${galleryEditorPath}pie-doughnut)
{{ /if }}

{{ if: ${formatter} }}
#${prefix} formatter(string|Function)


{{ /if }}

#${prefix} rotate(boolean|number) = null

标签旋转：

+ 如果为 `true`，则为径向排布。
+ 如果为 `number` ，旋转指定角度，从 -90 度到 90 度。正值是逆时针。







### alignTo(string) = 'none'

<ExampleUIControlEnum options="labelLine,edge" />

标签的对齐方式，仅当 `position` 值为 `'outer'` 时有效。

从 ECharts v4.6.0 版本起，我们提供了 `'labelLine'` 与 `'edge'` 两种新的布局方式。

+ `'none'`（默认值）：label line 的长度为固定值，分别为 [labelLine.length](~series-pie.labelLine.length) 及 [labelLine.length2](~series-pie.labelLine.length2)。
+ `'labelLine'`：label line 的末端对齐，其中最短的长度由 [labelLine.length2](~series-pie.labelLine.length2) 决定。
+ `'edge'`：文字对齐，文字的边距由 [label.edgeDistance](~series-pie.label.edgeDistance) 决定。

~[900x250](${galleryViewPath}pie-alignTo&reset=1&edit=1)

### edgeDistance(string|number) = '25%'

<ExampleUIControlPercent default="20%" />

文字边距，仅当 [label.position](~series-pie.label.position) 为 `'outer'` 并且 [label.alignTo](~series-pie.label.alignTo) 为 `'edge'` 时有效。

~[900x250](${galleryViewPath}doc-example/pie-label-margin&edit=1&reset=1)

通常来说，对于移动端等分辨率较小的情况，`edgeDistance` 值设为比较小的值（比如 `10`）能在有限的空间内显示更多文字，而不是被裁剪为 `...`。但是对于分辨率更大的场景，百分比的值可以避免 label line 过长。如果你需要在不同分辨率下使用，建议使用[响应式图表设计](tutorial.html#移动端自适应)为不同的分辨率设置不同的 `edgeDistance` 值。

### bleedMargin(number) = 10

<ExampleUIControlNumber default="10" min="0" step="1" />

文字的出血线大小，超过出血线的文字将被裁剪为 `'...'`。仅当 [label.position](~series-pie.label.position) 为 `'outer'` 并且 [label.alignTo](~series-pie.label.alignTo) 为 `'none'` 或 `'labelLine'` 的情况有效。

~[800x250](${galleryViewPath}doc-example/pie-label-bleedMargin&edit=1&reset=1)

### distanceToLabelLine(number) = 5

<ExampleUIControlNumber default="5" min="0" step="0.5" />

文字与 label line 之间的距离。

~[800x250](${galleryViewPath}doc-example/pie-label-distanceToLabelLine&edit=1&reset=1)

## labelLine(Object)

标签的视觉引导线配置。在 [label 位置](~series-pie.label.position) 设置为`'outside'`的时候会显示视觉引导线。



### maxSurfaceAngle(number)

通过调整第二段线的长度，限制引导线与扇区法线的最大夹角。设置为小于 90 度的值保证引导线不会和扇区交叉。

可以设置为 0 - 180 度。

## labelLayout(Object|Function)



## itemStyle(Object)







#${prefix} borderRadius(number|string|Array)

<ExampleUIControlPercentVector min="0" dims="Inner,Outer" default="0,0" />



用于指定饼图扇形区块的内外圆角半径，支持设置固定数值或者相对于扇形区块的半径的百分比值。例如：

+ `borderRadius: 10`：表示内圆角半径和外圆角半径都是 `10px`。
+ `borderRadius: '20%'`：表示内圆角半径和外圆角半径都是饼图扇形区块半径的 `20%`。
+ `borderRadius: [10, 20]`：表示当饼图为环形图时，表示内圆角半径是 `10px`、外圆角半径是 `20px`。
+ `borderRadius: ['20%', '50%']`：表示当饼图为环形图时，内圆角半径是内圆半径的 `20%`、外圆角半径是外圆半径的 `50%`。



## emphasis(Object)

高亮状态的扇区和标签样式。

### scale(boolean) = true

<ExampleUIControlBoolean default="true" />

是否开启高亮后扇区的放大效果。

### scaleSize(number) = 10

<ExampleUIControlNumber min="0" default="10" />

高亮后扇区的放大尺寸, 在开启 [emphasis.scale](~series-pie.emphasis.scale) 后有效。





#${prefix} label(Object)



#${prefix} show(boolean) = false

{{ if: ${position} }}
#${prefix} position(string) = 'outside'

标签的位置。

**可选：**
+ `'outside'`

    饼图扇区外侧，通过[视觉引导线](~series-pie.labelLine)连到相应的扇区。

+ `'inside'`

    饼图扇区内部。

+ `'inner'` 同 `'inside'`。
+ `'center'`

    在饼图中心位置。见[圆环图示例](${galleryEditorPath}pie-doughnut)
{{ /if }}

{{ if: ${formatter} }}
#${prefix} formatter(string|Function)


{{ /if }}

#${prefix} rotate(boolean|number) = null

标签旋转：

+ 如果为 `true`，则为径向排布。
+ 如果为 `number` ，旋转指定角度，从 -90 度到 90 度。正值是逆时针。







#${prefix} labelLine(Object)



#${prefix} itemStyle(Object)





#${prefix} borderRadius(number|string|Array)

<ExampleUIControlPercentVector min="0" dims="Inner,Outer" default="0,0" />



用于指定饼图扇形区块的内外圆角半径，支持设置固定数值或者相对于扇形区块的半径的百分比值。例如：

+ `borderRadius: 10`：表示内圆角半径和外圆角半径都是 `10px`。
+ `borderRadius: '20%'`：表示内圆角半径和外圆角半径都是饼图扇形区块半径的 `20%`。
+ `borderRadius: [10, 20]`：表示当饼图为环形图时，表示内圆角半径是 `10px`、外圆角半径是 `20px`。
+ `borderRadius: ['20%', '50%']`：表示当饼图为环形图时，内圆角半径是内圆半径的 `20%`、外圆角半径是外圆半径的 `50%`。







## blur(Object)



淡出状态的扇区和标签样式。开启 [emphasis.focus](~series-pie.emphasis.focus) 后有效。



#${prefix} label(Object)



#${prefix} show(boolean) = false

{{ if: ${position} }}
#${prefix} position(string) = 'outside'

标签的位置。

**可选：**
+ `'outside'`

    饼图扇区外侧，通过[视觉引导线](~series-pie.labelLine)连到相应的扇区。

+ `'inside'`

    饼图扇区内部。

+ `'inner'` 同 `'inside'`。
+ `'center'`

    在饼图中心位置。见[圆环图示例](${galleryEditorPath}pie-doughnut)
{{ /if }}

{{ if: ${formatter} }}
#${prefix} formatter(string|Function)


{{ /if }}

#${prefix} rotate(boolean|number) = null

标签旋转：

+ 如果为 `true`，则为径向排布。
+ 如果为 `number` ，旋转指定角度，从 -90 度到 90 度。正值是逆时针。







#${prefix} labelLine(Object)



#${prefix} itemStyle(Object)





#${prefix} borderRadius(number|string|Array)

<ExampleUIControlPercentVector min="0" dims="Inner,Outer" default="0,0" />



用于指定饼图扇形区块的内外圆角半径，支持设置固定数值或者相对于扇形区块的半径的百分比值。例如：

+ `borderRadius: 10`：表示内圆角半径和外圆角半径都是 `10px`。
+ `borderRadius: '20%'`：表示内圆角半径和外圆角半径都是饼图扇形区块半径的 `20%`。
+ `borderRadius: [10, 20]`：表示当饼图为环形图时，表示内圆角半径是 `10px`、外圆角半径是 `20px`。
+ `borderRadius: ['20%', '50%']`：表示当饼图为环形图时，内圆角半径是内圆半径的 `20%`、外圆角半径是外圆半径的 `50%`。







## select(Object)



选中状态的扇区和标签样式。开启 [selectedMode](~series-pie.selectedMode) 后有效。



#${prefix} label(Object)



#${prefix} show(boolean) = false

{{ if: ${position} }}
#${prefix} position(string) = 'outside'

标签的位置。

**可选：**
+ `'outside'`

    饼图扇区外侧，通过[视觉引导线](~series-pie.labelLine)连到相应的扇区。

+ `'inside'`

    饼图扇区内部。

+ `'inner'` 同 `'inside'`。
+ `'center'`

    在饼图中心位置。见[圆环图示例](${galleryEditorPath}pie-doughnut)
{{ /if }}

{{ if: ${formatter} }}
#${prefix} formatter(string|Function)


{{ /if }}

#${prefix} rotate(boolean|number) = null

标签旋转：

+ 如果为 `true`，则为径向排布。
+ 如果为 `number` ，旋转指定角度，从 -90 度到 90 度。正值是逆时针。







#${prefix} labelLine(Object)



#${prefix} itemStyle(Object)





#${prefix} borderRadius(number|string|Array)

<ExampleUIControlPercentVector min="0" dims="Inner,Outer" default="0,0" />



用于指定饼图扇形区块的内外圆角半径，支持设置固定数值或者相对于扇形区块的半径的百分比值。例如：

+ `borderRadius: 10`：表示内圆角半径和外圆角半径都是 `10px`。
+ `borderRadius: '20%'`：表示内圆角半径和外圆角半径都是饼图扇形区块半径的 `20%`。
+ `borderRadius: [10, 20]`：表示当饼图为环形图时，表示内圆角半径是 `10px`、外圆角半径是 `20px`。
+ `borderRadius: ['20%', '50%']`：表示当饼图为环形图时，内圆角半径是内圆半径的 `20%`、外圆角半径是外圆半径的 `50%`。









可以将内半径设大显示成圆环图（Donut chart）。











## data(Array)



### name(string)

数据项名称。

### value(number)

数据值。



### selected(boolean) = false

该数据项是否被选中。

### label(Object)

单个扇区的标签配置。



#${prefix} show(boolean) = false

{{ if: ${position} }}
#${prefix} position(string) = 'outside'

标签的位置。

**可选：**
+ `'outside'`

    饼图扇区外侧，通过[视觉引导线](~series-pie.labelLine)连到相应的扇区。

+ `'inside'`

    饼图扇区内部。

+ `'inner'` 同 `'inside'`。
+ `'center'`

    在饼图中心位置。见[圆环图示例](${galleryEditorPath}pie-doughnut)
{{ /if }}

{{ if: ${formatter} }}
#${prefix} formatter(string|Function)


{{ /if }}

#${prefix} rotate(boolean|number) = null

标签旋转：

+ 如果为 `true`，则为径向排布。
+ 如果为 `number` ，旋转指定角度，从 -90 度到 90 度。正值是逆时针。







### labelLine(Object)



### itemStyle(Object)







#${prefix} borderRadius(number|string|Array)

<ExampleUIControlPercentVector min="0" dims="Inner,Outer" default="0,0" />



用于指定饼图扇形区块的内外圆角半径，支持设置固定数值或者相对于扇形区块的半径的百分比值。例如：

+ `borderRadius: 10`：表示内圆角半径和外圆角半径都是 `10px`。
+ `borderRadius: '20%'`：表示内圆角半径和外圆角半径都是饼图扇形区块半径的 `20%`。
+ `borderRadius: [10, 20]`：表示当饼图为环形图时，表示内圆角半径是 `10px`、外圆角半径是 `20px`。
+ `borderRadius: ['20%', '50%']`：表示当饼图为环形图时，内圆角半径是内圆半径的 `20%`、外圆角半径是外圆半径的 `50%`。



### emphasis(Object)



#${prefix} label(Object)



#${prefix} show(boolean) = false

{{ if: ${position} }}
#${prefix} position(string) = 'outside'

标签的位置。

**可选：**
+ `'outside'`

    饼图扇区外侧，通过[视觉引导线](~series-pie.labelLine)连到相应的扇区。

+ `'inside'`

    饼图扇区内部。

+ `'inner'` 同 `'inside'`。
+ `'center'`

    在饼图中心位置。见[圆环图示例](${galleryEditorPath}pie-doughnut)
{{ /if }}

{{ if: ${formatter} }}
#${prefix} formatter(string|Function)


{{ /if }}

#${prefix} rotate(boolean|number) = null

标签旋转：

+ 如果为 `true`，则为径向排布。
+ 如果为 `number` ，旋转指定角度，从 -90 度到 90 度。正值是逆时针。







#${prefix} labelLine(Object)



#${prefix} itemStyle(Object)





#${prefix} borderRadius(number|string|Array)

<ExampleUIControlPercentVector min="0" dims="Inner,Outer" default="0,0" />



用于指定饼图扇形区块的内外圆角半径，支持设置固定数值或者相对于扇形区块的半径的百分比值。例如：

+ `borderRadius: 10`：表示内圆角半径和外圆角半径都是 `10px`。
+ `borderRadius: '20%'`：表示内圆角半径和外圆角半径都是饼图扇形区块半径的 `20%`。
+ `borderRadius: [10, 20]`：表示当饼图为环形图时，表示内圆角半径是 `10px`、外圆角半径是 `20px`。
+ `borderRadius: ['20%', '50%']`：表示当饼图为环形图时，内圆角半径是内圆半径的 `20%`、外圆角半径是外圆半径的 `50%`。







### blur(Object)





#${prefix} label(Object)



#${prefix} show(boolean) = false

{{ if: ${position} }}
#${prefix} position(string) = 'outside'

标签的位置。

**可选：**
+ `'outside'`

    饼图扇区外侧，通过[视觉引导线](~series-pie.labelLine)连到相应的扇区。

+ `'inside'`

    饼图扇区内部。

+ `'inner'` 同 `'inside'`。
+ `'center'`

    在饼图中心位置。见[圆环图示例](${galleryEditorPath}pie-doughnut)
{{ /if }}

{{ if: ${formatter} }}
#${prefix} formatter(string|Function)


{{ /if }}

#${prefix} rotate(boolean|number) = null

标签旋转：

+ 如果为 `true`，则为径向排布。
+ 如果为 `number` ，旋转指定角度，从 -90 度到 90 度。正值是逆时针。







#${prefix} labelLine(Object)



#${prefix} itemStyle(Object)





#${prefix} borderRadius(number|string|Array)

<ExampleUIControlPercentVector min="0" dims="Inner,Outer" default="0,0" />



用于指定饼图扇形区块的内外圆角半径，支持设置固定数值或者相对于扇形区块的半径的百分比值。例如：

+ `borderRadius: 10`：表示内圆角半径和外圆角半径都是 `10px`。
+ `borderRadius: '20%'`：表示内圆角半径和外圆角半径都是饼图扇形区块半径的 `20%`。
+ `borderRadius: [10, 20]`：表示当饼图为环形图时，表示内圆角半径是 `10px`、外圆角半径是 `20px`。
+ `borderRadius: ['20%', '50%']`：表示当饼图为环形图时，内圆角半径是内圆半径的 `20%`、外圆角半径是外圆半径的 `50%`。







### select(Object)





#${prefix} label(Object)



#${prefix} show(boolean) = false

{{ if: ${position} }}
#${prefix} position(string) = 'outside'

标签的位置。

**可选：**
+ `'outside'`

    饼图扇区外侧，通过[视觉引导线](~series-pie.labelLine)连到相应的扇区。

+ `'inside'`

    饼图扇区内部。

+ `'inner'` 同 `'inside'`。
+ `'center'`

    在饼图中心位置。见[圆环图示例](${galleryEditorPath}pie-doughnut)
{{ /if }}

{{ if: ${formatter} }}
#${prefix} formatter(string|Function)


{{ /if }}

#${prefix} rotate(boolean|number) = null

标签旋转：

+ 如果为 `true`，则为径向排布。
+ 如果为 `number` ，旋转指定角度，从 -90 度到 90 度。正值是逆时针。







#${prefix} labelLine(Object)



#${prefix} itemStyle(Object)





#${prefix} borderRadius(number|string|Array)

<ExampleUIControlPercentVector min="0" dims="Inner,Outer" default="0,0" />



用于指定饼图扇形区块的内外圆角半径，支持设置固定数值或者相对于扇形区块的半径的百分比值。例如：

+ `borderRadius: 10`：表示内圆角半径和外圆角半径都是 `10px`。
+ `borderRadius: '20%'`：表示内圆角半径和外圆角半径都是饼图扇形区块半径的 `20%`。
+ `borderRadius: [10, 20]`：表示当饼图为环形图时，表示内圆角半径是 `10px`、外圆角半径是 `20px`。
+ `borderRadius: ['20%', '50%']`：表示当饼图为环形图时，内圆角半径是内圆半径的 `20%`、外圆角半径是外圆半径的 `50%`。













## animationType(string) = 'expansion'

<ExampleUIControlEnum options="expansion,scale" />

初始动画效果，可选
+ `'expansion'` 默认沿圆弧展开的效果。
+ `'scale'` 缩放效果，配合设置 `animationEasing='elasticOut'` 可以做成 popup 的效果。

## animationTypeUpdate(string) = 'transition'

<ExampleUIControlEnum options="expansion,transition" />



更新数据时的动画效果，可选：
+ `'transition'` 通过改变起始和终止角度，从之前的数据过渡到新的数据。
+ `'expansion'` 数据将整体重新沿圆弧展开。



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
