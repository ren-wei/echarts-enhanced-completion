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
