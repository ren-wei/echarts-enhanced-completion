#${prefix} visualDimension(number) = 0

`treemap` 中支持对数据其他维度进行视觉映射。

首先，treemap的数据格式（参见 [series-treemap.data](~series-treemap.data)）中，每个节点的 `value` 都可以是数组。数组每项是一个『维度』（dimension）。`visualDimension` 指定了额外的『视觉映射』使用的是数组的哪一项。默认为第 `0` 项。



关于视觉设置，详见 [series-treemap.levels](~series-treemap.levels)。







> 注：treemap中 `${name}` 属性可能在多处地方存在：

{{ if: ${name} !== 'color' }}> * 于 [sereis-treemap](~series-treemap) 根下，表示本系列全局的统一设置。{{ /if }}

> * 于 [series-treemap.levels](~series-treemap.levels) 的每个数组元素中，表示树每个层级的统一设置。
> * 于 [series-treemap.data](~series-treemap.data) 的每个节点中，表示每个节点的特定设置。





#${prefix} visualMin(number) = null

<ExampleUIControlNumber default="0" />

当前层级的最小 value 值。如果不设置则自动统计。

手动指定 `visualMin`、`visualMax` ，即手动控制了 visual mapping 的值域（当 [colorMappingBy](~series-treemap.levels.colorMappingBy) 为 `'value'` 时有意义）。

#${prefix} visualMax(number) = null

<ExampleUIControlNumber default="100" />

当前层级的最大 value 值。如果不设置则自动统计。

手动指定 `visualMin`、`visualMax` ，即手动控制了 visual mapping 的值域（当 [colorMappingBy](~series-treemap.levels.colorMappingBy) 为 `'value'` 时有意义）。

{{ if: ${prefix} !== '#' }}
#${prefix} color(Array)

表示同一层级的节点的 颜色 选取列表（选择规则见 [colorMappingBy](~series-treemap.colorMappingBy)）。默认为空时，选取系统color列表。



关于视觉设置，详见 [series-treemap.levels](~series-treemap.levels)。







> 注：treemap中 `${name}` 属性可能在多处地方存在：

{{ if: ${name} !== 'color' }}> * 于 [sereis-treemap](~series-treemap) 根下，表示本系列全局的统一设置。{{ /if }}

> * 于 [series-treemap.levels](~series-treemap.levels) 的每个数组元素中，表示树每个层级的统一设置。
> * 于 [series-treemap.data](~series-treemap.data) 的每个节点中，表示每个节点的特定设置。




{{ /if }}

#${prefix} colorAlpha(Array) = null

{{ if: ${prefix} !== '#' }}
表示同一层级的节点的颜色透明度选取范围。
{{ else }}
本系列默认的颜色透明度选取范围。
{{ /if }}

数值范围 0 ~ 1

例如, `colorAlpha` 可以是 `[0.3, 1]`.



关于视觉设置，详见 [series-treemap.levels](~series-treemap.levels)。







> 注：treemap中 `${name}` 属性可能在多处地方存在：

{{ if: ${name} !== 'color' }}> * 于 [sereis-treemap](~series-treemap) 根下，表示本系列全局的统一设置。{{ /if }}

> * 于 [series-treemap.levels](~series-treemap.levels) 的每个数组元素中，表示树每个层级的统一设置。
> * 于 [series-treemap.data](~series-treemap.data) 的每个节点中，表示每个节点的特定设置。





#${prefix} colorSaturation(number) = null

{{ if: ${prefix} !== '#' }}
表示同一层级的节点的颜色饱和度 选取范围。
{{ else }}
本系列默认的节点的颜色饱和度 选取范围。
{{ /if }}

数值范围 0 ~ 1。

例如, `colorSaturation` 可以是 `[0.3, 1]`.



关于视觉设置，详见 [series-treemap.levels](~series-treemap.levels)。







> 注：treemap中 `${name}` 属性可能在多处地方存在：

{{ if: ${name} !== 'color' }}> * 于 [sereis-treemap](~series-treemap) 根下，表示本系列全局的统一设置。{{ /if }}

> * 于 [series-treemap.levels](~series-treemap.levels) 的每个数组元素中，表示树每个层级的统一设置。
> * 于 [series-treemap.data](~series-treemap.data) 的每个节点中，表示每个节点的特定设置。





#${prefix} colorMappingBy(string) = 'index'

<ExampleUIControlEnum options="index,value,id" />

表示同一层级节点，在颜色列表中（参见 `color` 属性）选择时，按照什么来选择。可选值：

* `'value'`：

将节点的值（即 [series-treemap.data.value](~series-treemap.data.value)）映射到颜色列表中。

这样得到的颜色，反应了节点值的大小。

可以使用 [visualDimension](~series-treemap.levels.visualDimension) 属性来设置，用 [data](~series-treemap.data) 中哪个纬度的值来映射。

* `'index'`：

将节点的 `index`（序号）映射到颜色列表中。即同一层级中，第一个节点取颜色列表中第一个颜色，第二个节点取第二个。

这样得到的颜色，便于区分相邻节点。

* `'id'`：

将节点的 `id`（即 [series-treemap.data.id](~series-treemap.data.id)）映射到颜色列表中。`id` 是用户指定的，这样能够使得，在treemap 通过 setOption 变化数值时，同一 `id` 映射到同一颜色，保持一致性。参见 [例子](${galleryEditorPath}treemap-obama&edit=1&reset=1)。



关于视觉设置，详见 [series-treemap.levels](~series-treemap.levels)。







> 注：treemap中 `${name}` 属性可能在多处地方存在：

{{ if: ${name} !== 'color' }}> * 于 [sereis-treemap](~series-treemap) 根下，表示本系列全局的统一设置。{{ /if }}

> * 于 [series-treemap.levels](~series-treemap.levels) 的每个数组元素中，表示树每个层级的统一设置。
> * 于 [series-treemap.data](~series-treemap.data) 的每个节点中，表示每个节点的特定设置。





#${prefix} visibleMin(number) = 10

<ExampleUIControlNumber default="10" min="0" />

如果某个节点的矩形的面积，小于这个数值（单位：px平方），这个节点就不显示。

如果不加这个限制，很小的节点会影响显示效果。



关于视觉设置，详见 [series-treemap.levels](~series-treemap.levels)。







> 注：treemap中 `${name}` 属性可能在多处地方存在：

{{ if: ${name} !== 'color' }}> * 于 [sereis-treemap](~series-treemap) 根下，表示本系列全局的统一设置。{{ /if }}

> * 于 [series-treemap.levels](~series-treemap.levels) 的每个数组元素中，表示树每个层级的统一设置。
> * 于 [series-treemap.data](~series-treemap.data) 的每个节点中，表示每个节点的特定设置。





#${prefix} childrenVisibleMin(number) = null

<ExampleUIControlNumber default="10" min="0" step="0.5" />

如果某个节点的矩形面积，小于这个数值（单位：px平方），则不显示这个节点的子节点。

这能够在矩形面积不足够大时候，隐藏节点的细节。当用户用鼠标缩放节点时，如果面积大于此阈值，又会显示子节点。



关于视觉设置，详见 [series-treemap.levels](~series-treemap.levels)。







> 注：treemap中 `${name}` 属性可能在多处地方存在：

{{ if: ${name} !== 'color' }}> * 于 [sereis-treemap](~series-treemap) 根下，表示本系列全局的统一设置。{{ /if }}

> * 于 [series-treemap.levels](~series-treemap.levels) 的每个数组元素中，表示树每个层级的统一设置。
> * 于 [series-treemap.data](~series-treemap.data) 的每个节点中，表示每个节点的特定设置。





#${prefix} label(Object)

`label` 描述了每个矩形中，文本标签的样式。



> 注：treemap中 `${name}` 属性可能在多处地方存在：

{{ if: ${name} !== 'color' }}> * 于 [sereis-treemap](~series-treemap) 根下，表示本系列全局的统一设置。{{ /if }}

> * 于 [series-treemap.levels](~series-treemap.levels) 的每个数组元素中，表示树每个层级的统一设置。
> * 于 [series-treemap.data](~series-treemap.data) 的每个节点中，表示每个节点的特定设置。







#${prefix} upperLabel(Object)

`upperLabel` 用于显示矩形的父节点的标签。当 [upperLabel.show](~series-treemap.upperLabel.show) 为 `true` 的时候，『显示父节点标签』功能开启。

同 [series-treemap.label](~series-treemap.label) 一样，`upperLabel` 可以存在于 [series-treemap](~series-treemap) 的根节点，或者 [series-treemap.level](~series-treemap.level) 中，或者 [series-treemap.data](~series-treemap.data) 的每个数据项中。

[series-treemap.label](~series-treemap.label) 描述的是，当前节点为叶节点时标签的样式；`upperLabel` 描述的是，当前节点为非叶节点（即含有子节点）时标签的样式。（此时标签一般会被显示在节点的最上部）

参见：

~[700x500](${galleryViewPath}treemap-show-parent&edit=1&reset=1)



> 注：treemap中 `${name}` 属性可能在多处地方存在：

{{ if: ${name} !== 'color' }}> * 于 [sereis-treemap](~series-treemap) 根下，表示本系列全局的统一设置。{{ /if }}

> * 于 [series-treemap.levels](~series-treemap.levels) 的每个数组元素中，表示树每个层级的统一设置。
> * 于 [series-treemap.data](~series-treemap.data) 的每个节点中，表示每个节点的特定设置。







##${prefix} height(number) = 20

<ExampleUIControlNumber default="20" min="0" step="0.5" />

父节点标签区的高度。

#${prefix} itemStyle(Object)



> 注：treemap中 `${name}` 属性可能在多处地方存在：

{{ if: ${name} !== 'color' }}> * 于 [sereis-treemap](~series-treemap) 根下，表示本系列全局的统一设置。{{ /if }}

> * 于 [series-treemap.levels](~series-treemap.levels) 的每个数组元素中，表示树每个层级的统一设置。
> * 于 [series-treemap.data](~series-treemap.data) 的每个节点中，表示每个节点的特定设置。







#${prefix} color(Color) = null

<ExampleUIControlColor />

矩形的颜色。默认从全局调色盘 [option.color](~color) 获取颜色。

{{ if: ${itemStyleType} === 'normal' }}
#${prefix} colorAlpha(number) = null

<ExampleUIControlNumber step="0.01" min="0" max="1" default="1" />

矩形颜色的透明度。取值范围是 0 ~ 1 之间的浮点数。

#${prefix} colorSaturation(number) = null

<ExampleUIControlNumber step="0.01" min="0" max="1" default="0.5" />

矩形颜色的饱和度。取值范围是 0 ~ 1 之间的浮点数。

#${prefix} borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB" clean="true"  />

矩形圆角。

#${prefix} borderWidth(number) = 0

<ExampleUIControlNumber step="0.5" min="0" />

矩形边框线宽。为 0 时无边框。而矩形的内部子矩形（子节点）的间隔距离是由 [gapWidth](~series-treemap.levels.gapWidth) 指定的。

#${prefix} gapWidth(number) = 0

<ExampleUIControlNumber step="0.5" min="0" />

矩形内部子矩形（子节点）的间隔距离。

![700xauto](~treemap-border-gap.png)

#${prefix} borderColor(Color) = '#fff',

<ExampleUIControlColor default="#fff" />

矩形边框 和 矩形间隔（gap）的颜色。

#${prefix} borderColorSaturation(Color) = null

<ExampleUIControlNumber step="0.01" min="0" max="1" default="0.5" />

矩形边框的颜色的饱和度。取值范围是 0 ~ 1 之间的浮点数。

注意：

如果设置此属性，则 `borderColor` 的设置无效，而是：取当前节点计算出的颜色（比如从父节点遗传而来），在此颜色值上设置 `borderColorSaturation` 得到最终颜色。这种方式，能够做出『不同区块有不同色调的矩形间隔线』的效果，能够便于区分层级。



**矩形边框（border）/缝隙（gap）设置如何避免混淆**

如果统一用一种颜色设置矩形的缝隙（gap），那么当不同层级的矩形同时展示时可能会出现混淆。

参见 [例子](${galleryEditorPath}doc-example/treemap-borderColor&edit=1&reset=1)，注意其中红色的区块中的子矩形其实是更深层级，和其他用白色缝隙区分的矩形不是在一个层级。所以，红色区块中矩形的分割线的颜色，我们在 `borderColorSaturation` 中设置为『加了饱和度变化的红颜色』，以示区别。







#${prefix} decal(Object)




{{ /if }}





#${prefix} emphasis(Object)

高亮状态配置。

{{ if: ${prefix} === '#' }}

{{ /if }}



#${prefix} label(Object)



#${prefix} labelLine(Object)





#${prefix} upperLabel(Object)



#${prefix} itemStyle(Object)



#${prefix} color(Color) = null

<ExampleUIControlColor />

矩形的颜色。默认从全局调色盘 [option.color](~color) 获取颜色。

{{ if: ${itemStyleType} === 'normal' }}
#${prefix} colorAlpha(number) = null

<ExampleUIControlNumber step="0.01" min="0" max="1" default="1" />

矩形颜色的透明度。取值范围是 0 ~ 1 之间的浮点数。

#${prefix} colorSaturation(number) = null

<ExampleUIControlNumber step="0.01" min="0" max="1" default="0.5" />

矩形颜色的饱和度。取值范围是 0 ~ 1 之间的浮点数。

#${prefix} borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB" clean="true"  />

矩形圆角。

#${prefix} borderWidth(number) = 0

<ExampleUIControlNumber step="0.5" min="0" />

矩形边框线宽。为 0 时无边框。而矩形的内部子矩形（子节点）的间隔距离是由 [gapWidth](~series-treemap.levels.gapWidth) 指定的。

#${prefix} gapWidth(number) = 0

<ExampleUIControlNumber step="0.5" min="0" />

矩形内部子矩形（子节点）的间隔距离。

![700xauto](~treemap-border-gap.png)

#${prefix} borderColor(Color) = '#fff',

<ExampleUIControlColor default="#fff" />

矩形边框 和 矩形间隔（gap）的颜色。

#${prefix} borderColorSaturation(Color) = null

<ExampleUIControlNumber step="0.01" min="0" max="1" default="0.5" />

矩形边框的颜色的饱和度。取值范围是 0 ~ 1 之间的浮点数。

注意：

如果设置此属性，则 `borderColor` 的设置无效，而是：取当前节点计算出的颜色（比如从父节点遗传而来），在此颜色值上设置 `borderColorSaturation` 得到最终颜色。这种方式，能够做出『不同区块有不同色调的矩形间隔线』的效果，能够便于区分层级。



**矩形边框（border）/缝隙（gap）设置如何避免混淆**

如果统一用一种颜色设置矩形的缝隙（gap），那么当不同层级的矩形同时展示时可能会出现混淆。

参见 [例子](${galleryEditorPath}doc-example/treemap-borderColor&edit=1&reset=1)，注意其中红色的区块中的子矩形其实是更深层级，和其他用白色缝隙区分的矩形不是在一个层级。所以，红色区块中矩形的分割线的颜色，我们在 `borderColorSaturation` 中设置为『加了饱和度变化的红颜色』，以示区别。







#${prefix} decal(Object)




{{ /if }}







#${prefix} blur(Object)



淡出状态配置。



#${prefix} label(Object)



#${prefix} labelLine(Object)





#${prefix} upperLabel(Object)



#${prefix} itemStyle(Object)



#${prefix} color(Color) = null

<ExampleUIControlColor />

矩形的颜色。默认从全局调色盘 [option.color](~color) 获取颜色。

{{ if: ${itemStyleType} === 'normal' }}
#${prefix} colorAlpha(number) = null

<ExampleUIControlNumber step="0.01" min="0" max="1" default="1" />

矩形颜色的透明度。取值范围是 0 ~ 1 之间的浮点数。

#${prefix} colorSaturation(number) = null

<ExampleUIControlNumber step="0.01" min="0" max="1" default="0.5" />

矩形颜色的饱和度。取值范围是 0 ~ 1 之间的浮点数。

#${prefix} borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB" clean="true"  />

矩形圆角。

#${prefix} borderWidth(number) = 0

<ExampleUIControlNumber step="0.5" min="0" />

矩形边框线宽。为 0 时无边框。而矩形的内部子矩形（子节点）的间隔距离是由 [gapWidth](~series-treemap.levels.gapWidth) 指定的。

#${prefix} gapWidth(number) = 0

<ExampleUIControlNumber step="0.5" min="0" />

矩形内部子矩形（子节点）的间隔距离。

![700xauto](~treemap-border-gap.png)

#${prefix} borderColor(Color) = '#fff',

<ExampleUIControlColor default="#fff" />

矩形边框 和 矩形间隔（gap）的颜色。

#${prefix} borderColorSaturation(Color) = null

<ExampleUIControlNumber step="0.01" min="0" max="1" default="0.5" />

矩形边框的颜色的饱和度。取值范围是 0 ~ 1 之间的浮点数。

注意：

如果设置此属性，则 `borderColor` 的设置无效，而是：取当前节点计算出的颜色（比如从父节点遗传而来），在此颜色值上设置 `borderColorSaturation` 得到最终颜色。这种方式，能够做出『不同区块有不同色调的矩形间隔线』的效果，能够便于区分层级。



**矩形边框（border）/缝隙（gap）设置如何避免混淆**

如果统一用一种颜色设置矩形的缝隙（gap），那么当不同层级的矩形同时展示时可能会出现混淆。

参见 [例子](${galleryEditorPath}doc-example/treemap-borderColor&edit=1&reset=1)，注意其中红色的区块中的子矩形其实是更深层级，和其他用白色缝隙区分的矩形不是在一个层级。所以，红色区块中矩形的分割线的颜色，我们在 `borderColorSaturation` 中设置为『加了饱和度变化的红颜色』，以示区别。







#${prefix} decal(Object)




{{ /if }}







#${prefix} select(Object)



选中状态配置。



#${prefix} label(Object)



#${prefix} labelLine(Object)





#${prefix} upperLabel(Object)



#${prefix} itemStyle(Object)



#${prefix} color(Color) = null

<ExampleUIControlColor />

矩形的颜色。默认从全局调色盘 [option.color](~color) 获取颜色。

{{ if: ${itemStyleType} === 'normal' }}
#${prefix} colorAlpha(number) = null

<ExampleUIControlNumber step="0.01" min="0" max="1" default="1" />

矩形颜色的透明度。取值范围是 0 ~ 1 之间的浮点数。

#${prefix} colorSaturation(number) = null

<ExampleUIControlNumber step="0.01" min="0" max="1" default="0.5" />

矩形颜色的饱和度。取值范围是 0 ~ 1 之间的浮点数。

#${prefix} borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB" clean="true"  />

矩形圆角。

#${prefix} borderWidth(number) = 0

<ExampleUIControlNumber step="0.5" min="0" />

矩形边框线宽。为 0 时无边框。而矩形的内部子矩形（子节点）的间隔距离是由 [gapWidth](~series-treemap.levels.gapWidth) 指定的。

#${prefix} gapWidth(number) = 0

<ExampleUIControlNumber step="0.5" min="0" />

矩形内部子矩形（子节点）的间隔距离。

![700xauto](~treemap-border-gap.png)

#${prefix} borderColor(Color) = '#fff',

<ExampleUIControlColor default="#fff" />

矩形边框 和 矩形间隔（gap）的颜色。

#${prefix} borderColorSaturation(Color) = null

<ExampleUIControlNumber step="0.01" min="0" max="1" default="0.5" />

矩形边框的颜色的饱和度。取值范围是 0 ~ 1 之间的浮点数。

注意：

如果设置此属性，则 `borderColor` 的设置无效，而是：取当前节点计算出的颜色（比如从父节点遗传而来），在此颜色值上设置 `borderColorSaturation` 得到最终颜色。这种方式，能够做出『不同区块有不同色调的矩形间隔线』的效果，能够便于区分层级。



**矩形边框（border）/缝隙（gap）设置如何避免混淆**

如果统一用一种颜色设置矩形的缝隙（gap），那么当不同层级的矩形同时展示时可能会出现混淆。

参见 [例子](${galleryEditorPath}doc-example/treemap-borderColor&edit=1&reset=1)，注意其中红色的区块中的子矩形其实是更深层级，和其他用白色缝隙区分的矩形不是在一个层级。所以，红色区块中矩形的分割线的颜色，我们在 `borderColorSaturation` 中设置为『加了饱和度变化的红颜色』，以示区别。







#${prefix} decal(Object)




{{ /if }}
