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
