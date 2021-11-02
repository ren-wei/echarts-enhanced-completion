# series.bar(Object)

**柱状图**

柱状图（或称条形图）是一种通过柱形的高度（横向的情况下则是宽度）来表现数据大小的一种常用图表类型。


<ExampleBaseOption name="cartesian-bar" title="直角坐标系上的柱状图" title-en="Bar on Cartesian">
const option = {
    tooltip: {},
    legend: {},
    xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {},
    series: [{
        name: 'Sale',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20, 4]
    }]
};
</ExampleBaseOption>

<ExampleBaseOption name="polar-bar" title="极坐标系上的柱状图" title-en="Bar on Polar">
const option = {
    angleAxis: {
        max: 30
    },
    radiusAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        z: 10
    },
    polar: {},
    series: [{
        name: 'Sale',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20, 4],
        coordinateSystem: 'polar'
    }],
    legend: {},
};
</ExampleBaseOption>

<ExampleBaseOption name="cartesian-bar-multiple-series" title="多系列柱状图" title-en="Multiple Series">
option = {
    legend: {
        data: ['Food', 'Cloth', 'Book']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: 'Food',
            type: 'bar',
            data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
            name: 'Cloth',
            type: 'bar',
            data: [150, 212, 201, 154, 190, 330, 410]
        },
        {
            name: 'Book',
            type: 'bar',
            data: [820, 832, 901, 934, 1290, 1330, 1320]
        }
    ]
};
</ExampleBaseOption>

## type(string) = 'bar'











## roundCap(boolean) = false

<ExampleUIControlBoolean default="${defaultRoundCap|default(false)}" />



<ExampleUIControlBoolean clean="true" />

是否在环形柱条两侧使用圆弧效果。

仅对极坐标系柱状图有效。

~[800x500](${galleryViewPath}polar-roundCap&reset=1&edit=1)

## showBackground(boolean) = false



<ExampleUIControlBoolean clean="true" />

是否显示柱条的背景色。通过 [backgroundStyle](~series-bar.backgroundStyle) 配置背景样式。

~[800x400](${galleryViewPath}bar-background&reset=1&edit=1)

## backgroundStyle(Object)



每一个柱条的背景样式。需要将 [showBackground](~series-bar.showBackground) 设置为 `true` 时才有效。

~[800x400](${galleryViewPath}bar-background&reset=1&edit=1)



#${prefix} color(Color) = ${defaultColor|default('自适应')}

<ExampleUIControlColor />

柱条的颜色。{{ if: ${useColorPalatte} }} 默认从全局调色盘 [option.color](~color) 获取颜色。 {{ /if }} {{ if: ${hasInherit} }} 在`emphasis`状态中支持设置为`'inherit'`取消高亮。 {{ /if }}



#${prefix} borderColor(Color) = '#000'

<ExampleUIControlColor value="#000" />

柱条的描边颜色。

#${prefix} borderWidth(number) = 0

<ExampleUIControlNumber value="0" min="0" step="0.5" />

柱条的描边宽度，默认不描边。

#${prefix} borderType(string) = 'solid'

<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />

柱条的描边类型，默认为实线，支持 `'dashed'`, `'dotted'`。





{{ if: ${useDecal} }}
#${prefix} decal(Object)




{{ /if }}





#${prefix} label(Object)

{{ if: ${topLevel} }}

{{ else }}
单个数据的文本配置。
{{ /if }}



##${prefix} position(string|Array) = 'inside'

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />

标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`。

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](${galleryViewPath}doc-example/label-position)。

+ 极坐标系柱状图除了上述取值之外，还支持：`start` / `insideStart` / `middle` / `insideEnd` / `end`。



~[800x500](${galleryViewPath}doc-example/bar-polar-label-radial-multiple&reset=1&edit=1)

~[800x500](${galleryViewPath}doc-example/bar-polar-label-tangential-multiple&reset=1&edit=1)

{{ if: ${topLevel && isNormal} }}
##${prefix} valueAnimation(boolean)

是否开启标签的数字动画。

参考这个 [示例](${galleryEditorPath}doc-example/value-animation-simple&edit=1&reset=1)。
{{ /if }}

#${prefix} labelLine(Object)





#${prefix} itemStyle(Object)

{{ if: ${topLevel} }}

{{ else }}
单个数据的图形样式设置。
{{ /if }}



#${prefix} color(Color) = ${defaultColor|default('自适应')}

<ExampleUIControlColor />

柱条的颜色。{{ if: ${useColorPalatte} }} 默认从全局调色盘 [option.color](~color) 获取颜色。 {{ /if }} {{ if: ${hasInherit} }} 在`emphasis`状态中支持设置为`'inherit'`取消高亮。 {{ /if }}



#${prefix} borderColor(Color) = '#000'

<ExampleUIControlColor value="#000" />

柱条的描边颜色。

#${prefix} borderWidth(number) = 0

<ExampleUIControlNumber value="0" min="0" step="0.5" />

柱条的描边宽度，默认不描边。

#${prefix} borderType(string) = 'solid'

<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />

柱条的描边类型，默认为实线，支持 `'dashed'`, `'dotted'`。





{{ if: ${useDecal} }}
#${prefix} decal(Object)




{{ /if }}







## labelLayout(Object|Function)



## emphasis(Object)

高亮的图形样式和标签样式。





#${prefix} label(Object)

{{ if: ${topLevel} }}

{{ else }}
单个数据的文本配置。
{{ /if }}



##${prefix} position(string|Array) = 'inside'

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />

标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`。

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](${galleryViewPath}doc-example/label-position)。

+ 极坐标系柱状图除了上述取值之外，还支持：`start` / `insideStart` / `middle` / `insideEnd` / `end`。



~[800x500](${galleryViewPath}doc-example/bar-polar-label-radial-multiple&reset=1&edit=1)

~[800x500](${galleryViewPath}doc-example/bar-polar-label-tangential-multiple&reset=1&edit=1)

{{ if: ${topLevel && isNormal} }}
##${prefix} valueAnimation(boolean)

是否开启标签的数字动画。

参考这个 [示例](${galleryEditorPath}doc-example/value-animation-simple&edit=1&reset=1)。
{{ /if }}

#${prefix} labelLine(Object)





#${prefix} itemStyle(Object)

{{ if: ${topLevel} }}

{{ else }}
单个数据的图形样式设置。
{{ /if }}



#${prefix} color(Color) = ${defaultColor|default('自适应')}

<ExampleUIControlColor />

柱条的颜色。{{ if: ${useColorPalatte} }} 默认从全局调色盘 [option.color](~color) 获取颜色。 {{ /if }} {{ if: ${hasInherit} }} 在`emphasis`状态中支持设置为`'inherit'`取消高亮。 {{ /if }}



#${prefix} borderColor(Color) = '#000'

<ExampleUIControlColor value="#000" />

柱条的描边颜色。

#${prefix} borderWidth(number) = 0

<ExampleUIControlNumber value="0" min="0" step="0.5" />

柱条的描边宽度，默认不描边。

#${prefix} borderType(string) = 'solid'

<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />

柱条的描边类型，默认为实线，支持 `'dashed'`, `'dotted'`。





{{ if: ${useDecal} }}
#${prefix} decal(Object)




{{ /if }}







## blur(Object)

淡出时的图形样式和标签样式。开启 [emphasis.focus](~series-bar.emphasis.focus) 后有效。



#${prefix} label(Object)

{{ if: ${topLevel} }}

{{ else }}
单个数据的文本配置。
{{ /if }}



##${prefix} position(string|Array) = 'inside'

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />

标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`。

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](${galleryViewPath}doc-example/label-position)。

+ 极坐标系柱状图除了上述取值之外，还支持：`start` / `insideStart` / `middle` / `insideEnd` / `end`。



~[800x500](${galleryViewPath}doc-example/bar-polar-label-radial-multiple&reset=1&edit=1)

~[800x500](${galleryViewPath}doc-example/bar-polar-label-tangential-multiple&reset=1&edit=1)

{{ if: ${topLevel && isNormal} }}
##${prefix} valueAnimation(boolean)

是否开启标签的数字动画。

参考这个 [示例](${galleryEditorPath}doc-example/value-animation-simple&edit=1&reset=1)。
{{ /if }}

#${prefix} labelLine(Object)





#${prefix} itemStyle(Object)

{{ if: ${topLevel} }}

{{ else }}
单个数据的图形样式设置。
{{ /if }}



#${prefix} color(Color) = ${defaultColor|default('自适应')}

<ExampleUIControlColor />

柱条的颜色。{{ if: ${useColorPalatte} }} 默认从全局调色盘 [option.color](~color) 获取颜色。 {{ /if }} {{ if: ${hasInherit} }} 在`emphasis`状态中支持设置为`'inherit'`取消高亮。 {{ /if }}



#${prefix} borderColor(Color) = '#000'

<ExampleUIControlColor value="#000" />

柱条的描边颜色。

#${prefix} borderWidth(number) = 0

<ExampleUIControlNumber value="0" min="0" step="0.5" />

柱条的描边宽度，默认不描边。

#${prefix} borderType(string) = 'solid'

<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />

柱条的描边类型，默认为实线，支持 `'dashed'`, `'dotted'`。





{{ if: ${useDecal} }}
#${prefix} decal(Object)




{{ /if }}







## select(Object)

数据选中时的图形样式和标签样式。开启 [selectedMode](~series-bar.selectedMode) 后有效。



#${prefix} label(Object)

{{ if: ${topLevel} }}

{{ else }}
单个数据的文本配置。
{{ /if }}



##${prefix} position(string|Array) = 'inside'

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />

标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`。

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](${galleryViewPath}doc-example/label-position)。

+ 极坐标系柱状图除了上述取值之外，还支持：`start` / `insideStart` / `middle` / `insideEnd` / `end`。



~[800x500](${galleryViewPath}doc-example/bar-polar-label-radial-multiple&reset=1&edit=1)

~[800x500](${galleryViewPath}doc-example/bar-polar-label-tangential-multiple&reset=1&edit=1)

{{ if: ${topLevel && isNormal} }}
##${prefix} valueAnimation(boolean)

是否开启标签的数字动画。

参考这个 [示例](${galleryEditorPath}doc-example/value-animation-simple&edit=1&reset=1)。
{{ /if }}

#${prefix} labelLine(Object)





#${prefix} itemStyle(Object)

{{ if: ${topLevel} }}

{{ else }}
单个数据的图形样式设置。
{{ /if }}



#${prefix} color(Color) = ${defaultColor|default('自适应')}

<ExampleUIControlColor />

柱条的颜色。{{ if: ${useColorPalatte} }} 默认从全局调色盘 [option.color](~color) 获取颜色。 {{ /if }} {{ if: ${hasInherit} }} 在`emphasis`状态中支持设置为`'inherit'`取消高亮。 {{ /if }}



#${prefix} borderColor(Color) = '#000'

<ExampleUIControlColor value="#000" />

柱条的描边颜色。

#${prefix} borderWidth(number) = 0

<ExampleUIControlNumber value="0" min="0" step="0.5" />

柱条的描边宽度，默认不描边。

#${prefix} borderType(string) = 'solid'

<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />

柱条的描边类型，默认为实线，支持 `'dashed'`, `'dotted'`。





{{ if: ${useDecal} }}
#${prefix} decal(Object)




{{ /if }}









## stack(string) = null

数据堆叠，同个类目轴上系列配置相同的`stack`值可以堆叠放置。

## sampling(string)

柱状图在数据量远大于像素点时候的降采样策略，开启后可以有效的优化图表的绘制效率，默认关闭，也就是全部绘制不过滤数据点。

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





#${prefix} label(Object)

{{ if: ${topLevel} }}

{{ else }}
单个数据的文本配置。
{{ /if }}



##${prefix} position(string|Array) = 'inside'

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />

标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`。

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](${galleryViewPath}doc-example/label-position)。

+ 极坐标系柱状图除了上述取值之外，还支持：`start` / `insideStart` / `middle` / `insideEnd` / `end`。



~[800x500](${galleryViewPath}doc-example/bar-polar-label-radial-multiple&reset=1&edit=1)

~[800x500](${galleryViewPath}doc-example/bar-polar-label-tangential-multiple&reset=1&edit=1)

{{ if: ${topLevel && isNormal} }}
##${prefix} valueAnimation(boolean)

是否开启标签的数字动画。

参考这个 [示例](${galleryEditorPath}doc-example/value-animation-simple&edit=1&reset=1)。
{{ /if }}

#${prefix} labelLine(Object)





#${prefix} itemStyle(Object)

{{ if: ${topLevel} }}

{{ else }}
单个数据的图形样式设置。
{{ /if }}



#${prefix} color(Color) = ${defaultColor|default('自适应')}

<ExampleUIControlColor />

柱条的颜色。{{ if: ${useColorPalatte} }} 默认从全局调色盘 [option.color](~color) 获取颜色。 {{ /if }} {{ if: ${hasInherit} }} 在`emphasis`状态中支持设置为`'inherit'`取消高亮。 {{ /if }}



#${prefix} borderColor(Color) = '#000'

<ExampleUIControlColor value="#000" />

柱条的描边颜色。

#${prefix} borderWidth(number) = 0

<ExampleUIControlNumber value="0" min="0" step="0.5" />

柱条的描边宽度，默认不描边。

#${prefix} borderType(string) = 'solid'

<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />

柱条的描边类型，默认为实线，支持 `'dashed'`, `'dotted'`。





{{ if: ${useDecal} }}
#${prefix} decal(Object)




{{ /if }}







### emphasis(Object)

单个数据的高亮状态配置。



#${prefix} label(Object)

{{ if: ${topLevel} }}

{{ else }}
单个数据的文本配置。
{{ /if }}



##${prefix} position(string|Array) = 'inside'

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />

标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`。

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](${galleryViewPath}doc-example/label-position)。

+ 极坐标系柱状图除了上述取值之外，还支持：`start` / `insideStart` / `middle` / `insideEnd` / `end`。



~[800x500](${galleryViewPath}doc-example/bar-polar-label-radial-multiple&reset=1&edit=1)

~[800x500](${galleryViewPath}doc-example/bar-polar-label-tangential-multiple&reset=1&edit=1)

{{ if: ${topLevel && isNormal} }}
##${prefix} valueAnimation(boolean)

是否开启标签的数字动画。

参考这个 [示例](${galleryEditorPath}doc-example/value-animation-simple&edit=1&reset=1)。
{{ /if }}

#${prefix} labelLine(Object)





#${prefix} itemStyle(Object)

{{ if: ${topLevel} }}

{{ else }}
单个数据的图形样式设置。
{{ /if }}



#${prefix} color(Color) = ${defaultColor|default('自适应')}

<ExampleUIControlColor />

柱条的颜色。{{ if: ${useColorPalatte} }} 默认从全局调色盘 [option.color](~color) 获取颜色。 {{ /if }} {{ if: ${hasInherit} }} 在`emphasis`状态中支持设置为`'inherit'`取消高亮。 {{ /if }}



#${prefix} borderColor(Color) = '#000'

<ExampleUIControlColor value="#000" />

柱条的描边颜色。

#${prefix} borderWidth(number) = 0

<ExampleUIControlNumber value="0" min="0" step="0.5" />

柱条的描边宽度，默认不描边。

#${prefix} borderType(string) = 'solid'

<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />

柱条的描边类型，默认为实线，支持 `'dashed'`, `'dotted'`。





{{ if: ${useDecal} }}
#${prefix} decal(Object)




{{ /if }}







### blur(Object)



单个数据的淡出状态配置。



#${prefix} label(Object)

{{ if: ${topLevel} }}

{{ else }}
单个数据的文本配置。
{{ /if }}



##${prefix} position(string|Array) = 'inside'

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />

标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`。

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](${galleryViewPath}doc-example/label-position)。

+ 极坐标系柱状图除了上述取值之外，还支持：`start` / `insideStart` / `middle` / `insideEnd` / `end`。



~[800x500](${galleryViewPath}doc-example/bar-polar-label-radial-multiple&reset=1&edit=1)

~[800x500](${galleryViewPath}doc-example/bar-polar-label-tangential-multiple&reset=1&edit=1)

{{ if: ${topLevel && isNormal} }}
##${prefix} valueAnimation(boolean)

是否开启标签的数字动画。

参考这个 [示例](${galleryEditorPath}doc-example/value-animation-simple&edit=1&reset=1)。
{{ /if }}

#${prefix} labelLine(Object)





#${prefix} itemStyle(Object)

{{ if: ${topLevel} }}

{{ else }}
单个数据的图形样式设置。
{{ /if }}



#${prefix} color(Color) = ${defaultColor|default('自适应')}

<ExampleUIControlColor />

柱条的颜色。{{ if: ${useColorPalatte} }} 默认从全局调色盘 [option.color](~color) 获取颜色。 {{ /if }} {{ if: ${hasInherit} }} 在`emphasis`状态中支持设置为`'inherit'`取消高亮。 {{ /if }}



#${prefix} borderColor(Color) = '#000'

<ExampleUIControlColor value="#000" />

柱条的描边颜色。

#${prefix} borderWidth(number) = 0

<ExampleUIControlNumber value="0" min="0" step="0.5" />

柱条的描边宽度，默认不描边。

#${prefix} borderType(string) = 'solid'

<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />

柱条的描边类型，默认为实线，支持 `'dashed'`, `'dotted'`。





{{ if: ${useDecal} }}
#${prefix} decal(Object)




{{ /if }}







### select(Object)



单个数据的选中状态配置。



#${prefix} label(Object)

{{ if: ${topLevel} }}

{{ else }}
单个数据的文本配置。
{{ /if }}



##${prefix} position(string|Array) = 'inside'

<ExampleUIControlEnum options="top,left,right,bottom,inside,insideLeft,insideRight,insideTop,insideBottom,insideTopLeft,insideBottomLeft,insideTopRight,insideBottomRight,outside" />

标签的位置。

+ 可以通过内置的语义声明位置：

    示例：
    ```js
    position: 'top'
    ```

    支持：`top` / `left` / `right` / `bottom` / `inside` / `insideLeft` / `insideRight` / `insideTop` / `insideBottom` / `insideTopLeft` / `insideBottomLeft` / `insideTopRight` / `insideBottomRight`。

+ 也可以用一个数组表示相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置。

    示例：
    ```js
    // 绝对的像素值
    position: [10, 10],
    // 相对的百分比
    position: ['50%', '50%']
    ```

参见：[label position](${galleryViewPath}doc-example/label-position)。

+ 极坐标系柱状图除了上述取值之外，还支持：`start` / `insideStart` / `middle` / `insideEnd` / `end`。



~[800x500](${galleryViewPath}doc-example/bar-polar-label-radial-multiple&reset=1&edit=1)

~[800x500](${galleryViewPath}doc-example/bar-polar-label-tangential-multiple&reset=1&edit=1)

{{ if: ${topLevel && isNormal} }}
##${prefix} valueAnimation(boolean)

是否开启标签的数字动画。

参考这个 [示例](${galleryEditorPath}doc-example/value-animation-simple&edit=1&reset=1)。
{{ /if }}

#${prefix} labelLine(Object)





#${prefix} itemStyle(Object)

{{ if: ${topLevel} }}

{{ else }}
单个数据的图形样式设置。
{{ /if }}



#${prefix} color(Color) = ${defaultColor|default('自适应')}

<ExampleUIControlColor />

柱条的颜色。{{ if: ${useColorPalatte} }} 默认从全局调色盘 [option.color](~color) 获取颜色。 {{ /if }} {{ if: ${hasInherit} }} 在`emphasis`状态中支持设置为`'inherit'`取消高亮。 {{ /if }}



#${prefix} borderColor(Color) = '#000'

<ExampleUIControlColor value="#000" />

柱条的描边颜色。

#${prefix} borderWidth(number) = 0

<ExampleUIControlNumber value="0" min="0" step="0.5" />

柱条的描边宽度，默认不描边。

#${prefix} borderType(string) = 'solid'

<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />

柱条的描边类型，默认为实线，支持 `'dashed'`, `'dotted'`。





{{ if: ${useDecal} }}
#${prefix} decal(Object)




{{ /if }}















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
