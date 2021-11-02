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
