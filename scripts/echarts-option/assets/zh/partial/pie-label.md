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
