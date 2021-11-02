#${prefix} borderRadius(number|string|Array)

<ExampleUIControlPercentVector min="0" dims="Inner,Outer" default="0,0" />



用于指定饼图扇形区块的内外圆角半径，支持设置固定数值或者相对于扇形区块的半径的百分比值。例如：

+ `borderRadius: 10`：表示内圆角半径和外圆角半径都是 `10px`。
+ `borderRadius: '20%'`：表示内圆角半径和外圆角半径都是饼图扇形区块半径的 `20%`。
+ `borderRadius: [10, 20]`：表示当饼图为环形图时，表示内圆角半径是 `10px`、外圆角半径是 `20px`。
+ `borderRadius: ['20%', '50%']`：表示当饼图为环形图时，内圆角半径是内圆半径的 `20%`、外圆角半径是外圆半径的 `50%`。
