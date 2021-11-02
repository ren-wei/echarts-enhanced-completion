#${prefix} label(Object)

`label` 描述了每个扇形块中，文本标签的样式。

**优先级：[series.data.label](~series-sunburst.data.label) > [series.levels.label](~series-sunburst.levels.label) > [series.label](~series-sunburst.label)。**





#${prefix} rotate(string|number) = 'radial'

<ExampleUIControlEnum options="radial,tangential" default="radial" />

{{ if: ${prefix} === '##' }}
如果是 `number` 类型，则表示标签的旋转角，从 -90 度到 90 度，正值是逆时针。

除此之外，还可以是字符串 `'radial'` 表示径向旋转、`'tangential'` 表示切向旋转。

默认径向旋转，如果不需要文字旋转，可以将其设为 `0`。

下面的例子展示了不同的 `rotate` 设置方法：

~[700x400](${galleryViewPath}sunburst-label-rotate&edit=1&reset=1)
{{ else }}
同 [label.rotate](~sunburst.label.rotate)
{{ /if }}

#${prefix} align(string) = 'center'

<ExampleUIControlEnum options="left,center,right" default="center" />

文字对齐方式，可取值为：`'left'`、 `'center'`、 `'right'`。注意，`'left'` 是指靠近内圈，而 `'right'` 是指靠近外圈。

{{ if: ${prefix} === '##' }}
~[700x400](${galleryViewPath}doc-example/sunburst-label-align&edit=1&reset=1)
{{ else }}
同 [label.align](~sunburst.label.align)
{{ /if }}

#${prefix} minAngle(number) = null

<ExampleUIControlAngle min="0" step="1" max="360" />

当某个扇形块的角度小于该值（角度制）时，扇形块对应的文字不显示。该值用以隐藏过小扇形块中的文字。







#${prefix} labelLine(Object)
