#${prefix} iconStyle(Object)

${name} icon 样式设置。由于 icon 的文本信息只在 icon hover 时候才显示，所以文字相关的配置项请在 `emphasis` 下设置。



#${prefix} emphasis(Object)

##${prefix} iconStyle(Object)



###${prefix} textPosition(string) = 'bottom'

文本位置，`'left'` / `'right'` / `'top'` / `'bottom'`。

###${prefix} textFill(string) = '#000'

<ExampleUIControlColor />

文本颜色，如果未设定，则依次取图标 emphasis 时候的填充色、描边色，如果都不存在，则为 `'#000'`。

###${prefix} textAlign(string) = 'center'

<ExampleUIControlEnum options="left,center,right" />

文本对齐方式，`'left'` / `'center'` / `'right'`。

###${prefix} textBackgroundColor(string)

<ExampleUIControlColor />

文本区域填充色。

###${prefix} textBorderRadius(number)

<ExampleUIControlVector min="0" dims="LT,RT,RB,LB"  />

文本区域圆角大小。

###${prefix} textPadding(number)

<ExampleUIControlVector min="0" dims="T,R,B,L" />

文本区域内边距。
