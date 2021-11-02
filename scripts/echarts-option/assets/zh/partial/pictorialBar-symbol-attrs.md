#${prefix} symbol(string) = 'circle'

<ExampleUIControlIcon >

图形类型。



例子：
~[800x400](${galleryViewPath}doc-example/pictorialBar-graphicType&reset=1&edit=1)



此属性可以被设置在系列的 [根部](~series-pictorialBar.${attrName})，表示对此系列中所有数据都生效；也可以被设置在 [data](series-pictorialBar.data) 中的 [每个数据项中](~series-pictorialBar.data.${attrName})，表示只对此数据项生效。

例如：
```js
series: [{
    ${attrName}: ... // 对 data 中所有数据项生效。
    data: [23, 56]
}]
或者
series: [{
    data: [{
        value: 23
        ${attrName}: ... // 只对此数据项生效
    }, {
        value: 56
        ${attrName}: ... // 只对此数据项生效
    }]
}]
```





#${prefix} symbolSize(number|Array) = ['100%', '100%']

<ExampleUIControlPercent default="100%,100%" dims="W,H" />

图形的大小。

可以用数组分开表示宽和高，例如 `[20, 10]` 表示标记宽为`20`，高为`10`，也可以设置成诸如 `10` 这样单一的数字，表示 `[10, 10]`。

可以设置成绝对值（如 `10`），也可以设置成百分比（如 `'120%'`、`['55%', 23]`）。

当设置为百分比时，图形的大小是基于 [基准柱](~series-pictorialBar) 的尺寸计算出来的。

例如，当基准柱基于 x 轴（即柱子是纵向的），[symbolSize](~series-pictorialBar.symbolSize) 设置为 `['30%', '50%']`，那么最终图形的尺寸是：

+ 宽度：`基准柱的宽度 * 30%`。
+ 高度：
    + 如果 [symbolRepeat](~series-pictorialBar.symbolRepeat) 为 `false`：`基准柱的高度 * 50%`。
    + 如果 [symbolRepeat](~series-pictorialBar.symbolRepeat) 为 `true`：`基准柱的宽度 * 50%`。

基准柱基于 y 轴（即柱子是横向的）的情况类似对调可得出。

例子：
~[800x600](${galleryViewPath}doc-example/pictorialBar-symbolSize&reset=1&edit=1)



此属性可以被设置在系列的 [根部](~series-pictorialBar.${attrName})，表示对此系列中所有数据都生效；也可以被设置在 [data](series-pictorialBar.data) 中的 [每个数据项中](~series-pictorialBar.data.${attrName})，表示只对此数据项生效。

例如：
```js
series: [{
    ${attrName}: ... // 对 data 中所有数据项生效。
    data: [23, 56]
}]
或者
series: [{
    data: [{
        value: 23
        ${attrName}: ... // 只对此数据项生效
    }, {
        value: 56
        ${attrName}: ... // 只对此数据项生效
    }]
}]
```





#${prefix} symbolPosition(string) = 'start'

<ExampleUIControlEnum options="start,end,center" default="start" />

图形的定位位置。可取值：

+ `'start'`：图形边缘与柱子开始的地方内切。
+ `'end'`：图形边缘与柱子结束的地方内切。
+ `'center'`：图形在柱子里居中。

例子：
~[800x600](${galleryViewPath}doc-example/pictorialBar-position&reset=1&edit=1)



此属性可以被设置在系列的 [根部](~series-pictorialBar.${attrName})，表示对此系列中所有数据都生效；也可以被设置在 [data](series-pictorialBar.data) 中的 [每个数据项中](~series-pictorialBar.data.${attrName})，表示只对此数据项生效。

例如：
```js
series: [{
    ${attrName}: ... // 对 data 中所有数据项生效。
    data: [23, 56]
}]
或者
series: [{
    data: [{
        value: 23
        ${attrName}: ... // 只对此数据项生效
    }, {
        value: 56
        ${attrName}: ... // 只对此数据项生效
    }]
}]
```





#${prefix} symbolOffset(Array) = [0, 0]

<ExampleUIControlPercentVector default="0,0" dims="x,y" />

图形相对于原本位置的偏移。`symbolOffset` 是图形定位中最后计算的一个步骤，可以对图形计算出来的位置进行微调。

可以设置成绝对值（如 `10`），也可以设置成百分比（如 `'120%'`、`['55%', 23]`）。

当设置为百分比时，表示相对于自身尺寸 [symbolSize](~series-pictorialBar.symbolSize) 的百分比。

例如 `[0, '-50%']` 就是把图形向上移动了自身尺寸的一半的位置。

例子：
~[800x600](${galleryViewPath}doc-example/pictorialBar-position&reset=1&edit=1)



此属性可以被设置在系列的 [根部](~series-pictorialBar.${attrName})，表示对此系列中所有数据都生效；也可以被设置在 [data](series-pictorialBar.data) 中的 [每个数据项中](~series-pictorialBar.data.${attrName})，表示只对此数据项生效。

例如：
```js
series: [{
    ${attrName}: ... // 对 data 中所有数据项生效。
    data: [23, 56]
}]
或者
series: [{
    data: [{
        value: 23
        ${attrName}: ... // 只对此数据项生效
    }, {
        value: 56
        ${attrName}: ... // 只对此数据项生效
    }]
}]
```





#${prefix} symbolRotate(number)

<ExampleUIControlAngle min="-360" max="360" step="1" />

图形的旋转角度。

注意，`symbolRotate` 并不会影响图形的定位（哪怕超出基准柱的边界），而只是单纯得绕自身中心旋转。



此属性可以被设置在系列的 [根部](~series-pictorialBar.${attrName})，表示对此系列中所有数据都生效；也可以被设置在 [data](series-pictorialBar.data) 中的 [每个数据项中](~series-pictorialBar.data.${attrName})，表示只对此数据项生效。

例如：
```js
series: [{
    ${attrName}: ... // 对 data 中所有数据项生效。
    data: [23, 56]
}]
或者
series: [{
    data: [{
        value: 23
        ${attrName}: ... // 只对此数据项生效
    }, {
        value: 56
        ${attrName}: ... // 只对此数据项生效
    }]
}]
```





#${prefix} symbolRepeat(boolean|number|string)

<ExampleUIControlEnum options="true,false,fixed" />

指定图形元素是否重复。值可为：

+ `false`/`null`/`undefined`：不重复，即每个数据值用一个图形元素表示。
+ `true`：使图形元素重复，即每个数据值用一组重复的图形元素表示。重复的次数依据 [data](~series-pictorialBar.data) 计算得到。
+ a number：使图形元素重复，即每个数据值用一组重复的图形元素表示。重复的次数是给定的定值。
+ `'fixed'`：使图形元素重复，即每个数据值用一组重复的图形元素表示。重复的次数依据 [symbolBoundingData](~series-pictorialBar.symbolBoundingData) 计算得到，即与 [data](~series-pictorialBar.data) 无关。这在此图形被用于做背景时有用。

例子：
~[800x400](${galleryViewPath}doc-example/pictorialBar-repeat&reset=1&edit=1)



此属性可以被设置在系列的 [根部](~series-pictorialBar.${attrName})，表示对此系列中所有数据都生效；也可以被设置在 [data](series-pictorialBar.data) 中的 [每个数据项中](~series-pictorialBar.data.${attrName})，表示只对此数据项生效。

例如：
```js
series: [{
    ${attrName}: ... // 对 data 中所有数据项生效。
    data: [23, 56]
}]
或者
series: [{
    data: [{
        value: 23
        ${attrName}: ... // 只对此数据项生效
    }, {
        value: 56
        ${attrName}: ... // 只对此数据项生效
    }]
}]
```





#${prefix} symbolRepeatDirection(string) = 'start'

<ExampleUIControlEnum options="start,end" default="start" />

指定图形元素重复时，绘制的顺序。这个属性在两种情况下有用处：

+ 当 [symbolMargin](~series-pictorialBar.symbolMargin) 设置为负值时，重复的图形会互相覆盖，这是可以使用 `symbolRepeatDirection` 来指定覆盖顺序。

+ 当 [animationDelay](~series-pictorialBar.animationDelay) 或 [animationDelayUpdate](~series-pictorialBar.animationDelayUpdate) 被使用时，`symbolRepeatDirection` 指定了 index 顺序。

这个属性的值可以是：`'start'` 或 `'end'`。

例子：
~[800x400](${galleryViewPath}doc-example/pictorialBar-repeatDirection&reset=1&edit=1)



此属性可以被设置在系列的 [根部](~series-pictorialBar.${attrName})，表示对此系列中所有数据都生效；也可以被设置在 [data](series-pictorialBar.data) 中的 [每个数据项中](~series-pictorialBar.data.${attrName})，表示只对此数据项生效。

例如：
```js
series: [{
    ${attrName}: ... // 对 data 中所有数据项生效。
    data: [23, 56]
}]
或者
series: [{
    data: [{
        value: 23
        ${attrName}: ... // 只对此数据项生效
    }, {
        value: 56
        ${attrName}: ... // 只对此数据项生效
    }]
}]
```





#${prefix} symbolMargin(number|string)

<ExampleUIControlPercentVector default="0,0" dims="x,y" />

图形的两边间隔（『两边』是指其数值轴方向的两边）。可以是绝对数值（如 `20`），或者百分比值（如 `'-30%'`），表示相对于自身尺寸 [symbolSize](~series-pictorialBar.symbolSize) 的百分比。只有当 [symbolRepeat](~series-pictorialBar.symbolRepeat) 被使用时有意义。

可以是正值，表示间隔大；也可以是负数。当 [symbolRepeat](~series-pictorialBar.symbolRepeat) 被使用时，负数时能使图形重叠。

可以在其值结尾处加一个 `"!"`，如 `"30%!"` 或 `25!`，表示第一个图形的开始和最后一个图形结尾留白，不紧贴边界。默认会紧贴边界。

注意：

+ 当 [symbolRepeat](~series-pictorialBar.symbolRepeat) 为 `true`/`'fixed'` 的时候：
    这里设置的 `symbolMargin` 只是个参考值，真正最后的图形间隔，是根据 [symbolRepeat](~series-pictorialBar.symbolRepeat)、`symbolMargin`、[symbolBoundingData](~series-pictorialBar.symbolBoundingData) 综合计算得到。
+ 当 [symbolRepeat](~series-pictorialBar.symbolRepeat) 为一个固定数值的时候：
    这里设置的 `symbolMargin` 无效。

例子：
~[800x600](${galleryViewPath}doc-example/pictorialBar-repeatLayout&reset=1&edit=1)



此属性可以被设置在系列的 [根部](~series-pictorialBar.${attrName})，表示对此系列中所有数据都生效；也可以被设置在 [data](series-pictorialBar.data) 中的 [每个数据项中](~series-pictorialBar.data.${attrName})，表示只对此数据项生效。

例如：
```js
series: [{
    ${attrName}: ... // 对 data 中所有数据项生效。
    data: [23, 56]
}]
或者
series: [{
    data: [{
        value: 23
        ${attrName}: ... // 只对此数据项生效
    }, {
        value: 56
        ${attrName}: ... // 只对此数据项生效
    }]
}]
```





#${prefix} symbolClip(boolean) = false

<ExampleUIControlBoolean />

是否剪裁图形。

+ `false`/null/undefined：图形本身表示数值大小。
+ `true`：图形被剪裁后剩余的部分表示数值大小。

`symbolClip` 常在这种场景下使用：同时表达『总值』和『当前数值』。在这种场景下，可以使用两个系列，一个系列是完整的图形，当做『背景』来表达总数值，另一个系列是使用 `symbolClip` 进行剪裁过的图形，表达当前数值。

例子：
~[800x600](${galleryViewPath}doc-example/pictorialBar-clip&reset=1&edit=1)

在这个例子中：

+ 『背景系列』和『当前值系列』使用相同的 [symbolBoundingData](~series.pictorialBar.symbolBoundingData)，使得绘制出的图形的大小是一样的。
+ 『当前值系列』设置了比『背景系列』更高的 [z](~series.pictorialBar.z)，使得其覆盖在『背景系列』上。



此属性可以被设置在系列的 [根部](~series-pictorialBar.${attrName})，表示对此系列中所有数据都生效；也可以被设置在 [data](series-pictorialBar.data) 中的 [每个数据项中](~series-pictorialBar.data.${attrName})，表示只对此数据项生效。

例如：
```js
series: [{
    ${attrName}: ... // 对 data 中所有数据项生效。
    data: [23, 56]
}]
或者
series: [{
    data: [{
        value: 23
        ${attrName}: ... // 只对此数据项生效
    }, {
        value: 56
        ${attrName}: ... // 只对此数据项生效
    }]
}]
```





#${prefix} symbolBoundingData(number|Array)

这个属性是『指定图形界限的值』。它指定了一个 data，这个 data 映射在坐标系上的位置，是图形绘制的界限。也就是说，如果设置了 `symbolBoundingData`，图形的尺寸则由 `symbolBoundingData` 决定。

当柱子是水平的，symbolBoundingData 对应到 x 轴上，当柱子是竖直的，symbolBoundingData 对应到 y 轴上。

规则：

+ 没有使用 [symbolRepeat](~series-pictorialBar.symbolRepeat) 时：

    `symbolBoundingData` 缺省情况下和『参考柱』的尺寸一样。图形的尺寸由零点和 `symbolBoundingData` 决定。举例，当柱子是竖直的，柱子对应的 data 为 `24`，`symbolSize` 设置为 `[30, '50%']`，`symbolBoundingData` 设置为 `124`，那么最终图形的高度为 `124 * 50% = 62`。如果 `symbolBoundingData` 不设置，那么最终图形的高度为 `24 * 50% = 12`。

+ 使用了 [symbolRepeat](~series-pictorialBar.symbolRepeat) 时：

    `symbolBoundingData` 缺省情况取当前坐标系所显示出的最值。`symbolBoundingData` 定义了一个 bounding，重复的图形在这个 bounding 中，依据 [symbolMargin](~series-pictorialBar.symbolMargin) 和 [symbolRepeat](~series-pictorialBar.symbolRepeat) 和 [symbolSize](~series-pictorialBar.symbolSize) 进行排布。这几个变量决定了图形的间隔大小。

在这些场景中，你可能会需要设置 `symbolBoundingData`：

+ 使用了 [symbolCilp](~series-pictorialBar.symbolClip) 时：

    使用一个系列表达『总值』，另一个系列表达『当前值』的时候，需要两个系列画出的图形一样大。那么就把两个系列的 `symbolBoundingData` 设为一样大。

例子：
~[800x600](${galleryViewPath}doc-example/pictorialBar-clip&reset=1&edit=1)

+ 使用了 [symbolRepeat](~series-pictorialBar.symbolRepeat) 时：

    如果需要不同柱子中的图形的间隔保持一致，那么可以把 `symbolBoundingData` 设为一致的数值。当然，不设置 `symbolBoundingData` 也是可以的，因为其缺省值就是一个定值（坐标系所显示出的最值）。

例子：
~[800x600](${galleryViewPath}doc-example/pictorialBar-repeatLayout&reset=1&edit=1)

<br>
`symbolBoundingData` 可以是一个数组，例如 `[-40, 60]`，表示同时指定了正值的 `symbolBoundingData` 和负值的 `symbolBoundingData`。

参见例子：
~[800x400](${galleryViewPath}doc-example/pictorialBar-symbolBoundingDataArray&reset=1&edit=1)



此属性可以被设置在系列的 [根部](~series-pictorialBar.${attrName})，表示对此系列中所有数据都生效；也可以被设置在 [data](series-pictorialBar.data) 中的 [每个数据项中](~series-pictorialBar.data.${attrName})，表示只对此数据项生效。

例如：
```js
series: [{
    ${attrName}: ... // 对 data 中所有数据项生效。
    data: [23, 56]
}]
或者
series: [{
    data: [{
        value: 23
        ${attrName}: ... // 只对此数据项生效
    }, {
        value: 56
        ${attrName}: ... // 只对此数据项生效
    }]
}]
```





#${prefix} symbolPatternSize(number) = 400

<ExampleUIControlNumber default="400" step="10" min="0" />

可以使用图片作为图形的 pattern。

```js
var textureImg = new Image();
textureImg.src = 'data:image/jpeg;base64,...'; // dataURI
// 或者
// textureImg.src = 'http://xxx.xxx.xxx/xx.png'; // URL
...
itemStyle: {
    color: {
        image: textureImg,
        repeat: 'repeat'
    }
}
```

这时候，`symbolPatternSize` 指定了 pattern 的缩放尺寸。比如 `symbolPatternSize` 为 400 时表示图片显示为 `400px * 400px` 的尺寸。

例子：
~[800x400](${galleryViewPath}doc-example/pictorialBar-patternSize&reset=1&edit=1)



此属性可以被设置在系列的 [根部](~series-pictorialBar.${attrName})，表示对此系列中所有数据都生效；也可以被设置在 [data](series-pictorialBar.data) 中的 [每个数据项中](~series-pictorialBar.data.${attrName})，表示只对此数据项生效。

例如：
```js
series: [{
    ${attrName}: ... // 对 data 中所有数据项生效。
    data: [23, 56]
}]
或者
series: [{
    data: [{
        value: 23
        ${attrName}: ... // 只对此数据项生效
    }, {
        value: 56
        ${attrName}: ... // 只对此数据项生效
    }]
}]
```





{{ if: ${useZ2} }}
#${prefix} z(number)

指定图形元素间的覆盖关系。数值越大，越在层叠的上方。
{{ /if }}

#${prefix} hoverAnimation(boolean) = false

<ExampleUIControlBoolean />

是否开启 hover 在图形上的提示动画效果。



此属性可以被设置在系列的 [根部](~series-pictorialBar.${attrName})，表示对此系列中所有数据都生效；也可以被设置在 [data](series-pictorialBar.data) 中的 [每个数据项中](~series-pictorialBar.data.${attrName})，表示只对此数据项生效。

例如：
```js
series: [{
    ${attrName}: ... // 对 data 中所有数据项生效。
    data: [23, 56]
}]
或者
series: [{
    data: [{
        value: 23
        ${attrName}: ... // 只对此数据项生效
    }, {
        value: 56
        ${attrName}: ... // 只对此数据项生效
    }]
}]
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







#${prefix} animationDelay(number|Function) = 0

动画开始之前的延迟，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更戏剧的更新动画效果。

如下示例：
```js
animationDelay: function (dataIndex, params) {
    return params.index * 30;
}
或者反向：
animationDelay: function (dataIndex, params) {
    return (params.count - 1 - params.index) * 30;
}
```

例子：
~[800x400](${galleryViewPath}doc-example/pictorialBar-repeatDirection&reset=1&edit=1)

#${prefix} animationDelayUpdate(number|Function) = 0

数据更新动画的延迟，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更戏剧的更新动画效果。

如下示例：
```js
animationDelay: function (dataIndex, params) {
    return params.index * 30;
}
或者反向：
animationDelay: function (dataIndex, params) {
    return (params.count - 1 - params.index) * 30;
}
```

例子：
~[800x400](${galleryViewPath}doc-example/pictorialBar-repeatDirection&reset=1&edit=1)
