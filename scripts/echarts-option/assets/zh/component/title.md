# title(Object)

标题组件，包含主标题和副标题。

在 ECharts 2.x 中单个 ECharts 实例最多只能拥有一个标题组件。但是在 ECharts 3 中可以存在任意多个标题组件，这在需要标题进行排版，或者单个实例中的多个图表都需要标题时会比较有用。

**例如下面不同缓动函数效果的示例，每一个缓动效果图都带有一个标题组件：**
~[700x400](${galleryViewPath}line-easing&edit=1&reset=1)

<ExampleBaseOption name="title-only" title="只有标题的实例" title-en="Title">
const option = {
    title: {
        text: 'Main Title',
        subtext: 'Sub Title',
        left: 'center',
        top: 'center',
        textStyle: {
            fontSize: 30
        },
        subtextStyle: {
            fontSize: 20
        }
    }
}
</ExampleBaseOption>



## id(string)

组件 ID。默认不指定。指定则可用于在 option 或者 API 中引用组件。



## show(boolean) = true

<ExampleUIControlBoolean default="true" />

是否显示标题组件。

## text(string) = ''

<ExampleUIControlText />

主标题文本，支持使用 `\n` 换行。

## link(string) = ''

主标题文本超链接。

## target(string) = 'blank'

指定窗口打开主标题超链接。

**可选：**

+ `'self'` 当前窗口打开

+ `'blank'` 新窗口打开

## textStyle(Object)





### color(Color) = '#333'

<ExampleUIControlColor default="'#333'" />

主标题文字的颜色。

{{ if: ${enableAutoColor} }}


如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。




{{ /if }}

### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

主标题文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

### fontWeight(string|number) = 'bolder'

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

主标题文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

主标题文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

### fontSize(number) = 18

<ExampleUIControlNumber default="18" min="1" step="1" />

主标题文字的字体大小。

{{ if: !true }}
### align(string) = ${defaultAlign}

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```


{{ /if }}

{{ if: !true }}
### verticalAlign(string) = ${defaultVerticalAlign}

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```


{{ /if }}

### lineHeight(number) = 

<ExampleUIControlNumber min="0" step="1" default="12" />

行高。



`rich` 中如果没有设置 `lineHeight`，则会取父层级的 `lineHeight`。例如：

```js
{
    lineHeight: 56,
    rich: {
        a: {
            // 没有设置 `lineHeight`，则 `lineHeight` 为 56
        }
    }
}
```



{{ if: !true }}
### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。

{{ if: ${enableAutoColor} }}


如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。




{{ /if }}

### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。

{{ if: ${enableAutoColor} }}


如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。




{{ /if }}

### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。



{{ if: border === 'border' }}
### borderType(string|number|Array) = 'solid'

{{ elif: border === 'text' }}
### textBorderType(string|number|Array) = 'solid'
{{ else }}
### type(string|number|Array) = 'solid'
{{ /if }}

<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />

{{ if: border === 'border' }}
文字块边框描边类型。

{{ elif: border === 'text' }}
文字本身的描边类型。
{{ else }}
线的类型。
{{ /if }}

可选：
+ `'solid'`
+ `'dashed'`
+ `'dotted'`

自 `v5.0.0` 开始，也可以是 `number` 或者 `number` 数组，用以指定线条的 [dash array](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-dasharray)，配合 {{ if: border === 'border' }}
`borderDashOffset`
{{ elif: border === 'text' }}
`textBorderDashOffset`
{{ else }}
`dashOffset`
{{ /if }} 可实现更灵活的虚线效果。

例如：
```js
{

{{ if: border === 'border' }}borderType{{ elif: border === 'text' }}textBorderType{{ else }}type{{ /if }}: [5, 10],

{{ if: border === 'border' }}borderDashOffset{{ elif: border === 'text' }}textBorderDashOffset{{ else }}dashOffset{{ /if }}: 5
}
```

{{ if: border === 'border' }}
### borderDashOffset(number) = 0

{{ elif: border === 'text' }}
### textBorderDashOffset(number) = 0
{{ else }}
### dashOffset(number) = 0
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 {{ if: border === 'border' }}
`borderType`
{{ elif: border === 'text' }}
`textBorderType`
{{ else }}
`type`
{{ /if }} 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。

{{ if: !true }}
{{ if: border === 'border' }}
### borderCap(string) = butt
{{ else }}
### cap(string) = butt
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。
{{ /if }}

{{ if: !true }}
{{ if: border === 'border' }}
### borderJoin(string) = bevel
{{ else }}
### join(string) = bevel
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="bevel" options="bevel,round,miter" />

用于设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）。

可以是：
+ `'bevel'`: 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
+ `'round'`: 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
+ `'miter'`: 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。这个设置可以通过 {{ if: border === 'border' }}
`borderMiterLimit`
{{ else }}
`miterLimit`
{{ /if }} 属性看到效果。

默认值为 `'bevel'`。 更多详情可以参考 MDN [lineJoin](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineJoin)。
{{ /if }}

{{ if: !true }}
{{ if: border === 'border' }}
### borderMiterLimit(number) = 10
{{ else }}
### miterLimit(number) = 10
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 {{ if: border === 'border' }}
`borderJoin`
{{ else }}
`join`
{{ /if }} 为 `miter` 时，{{ if: border === 'border' }}
`borderMiterLimit`
{{ else }}
`miterLimit`
{{ /if }} 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。
{{ /if }}



### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。
{{ /if }}

### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。

{{ if: ${enableAutoColor} }}


如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。




{{ /if }}

### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。



{{ if: text === 'border' }}
### borderType(string|number|Array) = 'solid'

{{ elif: text === 'text' }}
### textBorderType(string|number|Array) = 'solid'
{{ else }}
### type(string|number|Array) = 'solid'
{{ /if }}

<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />

{{ if: text === 'border' }}
文字块边框描边类型。

{{ elif: text === 'text' }}
文字本身的描边类型。
{{ else }}
线的类型。
{{ /if }}

可选：
+ `'solid'`
+ `'dashed'`
+ `'dotted'`

自 `v5.0.0` 开始，也可以是 `number` 或者 `number` 数组，用以指定线条的 [dash array](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-dasharray)，配合 {{ if: text === 'border' }}
`borderDashOffset`
{{ elif: text === 'text' }}
`textBorderDashOffset`
{{ else }}
`dashOffset`
{{ /if }} 可实现更灵活的虚线效果。

例如：
```js
{

{{ if: text === 'border' }}borderType{{ elif: text === 'text' }}textBorderType{{ else }}type{{ /if }}: [5, 10],

{{ if: text === 'border' }}borderDashOffset{{ elif: text === 'text' }}textBorderDashOffset{{ else }}dashOffset{{ /if }}: 5
}
```

{{ if: text === 'border' }}
### borderDashOffset(number) = 0

{{ elif: text === 'text' }}
### textBorderDashOffset(number) = 0
{{ else }}
### dashOffset(number) = 0
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 {{ if: text === 'border' }}
`borderType`
{{ elif: text === 'text' }}
`textBorderType`
{{ else }}
`type`
{{ /if }} 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。

{{ if: !true }}
{{ if: text === 'border' }}
### borderCap(string) = butt
{{ else }}
### cap(string) = butt
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。
{{ /if }}

{{ if: !true }}
{{ if: text === 'border' }}
### borderJoin(string) = bevel
{{ else }}
### join(string) = bevel
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="bevel" options="bevel,round,miter" />

用于设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）。

可以是：
+ `'bevel'`: 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
+ `'round'`: 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
+ `'miter'`: 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。这个设置可以通过 {{ if: text === 'border' }}
`borderMiterLimit`
{{ else }}
`miterLimit`
{{ /if }} 属性看到效果。

默认值为 `'bevel'`。 更多详情可以参考 MDN [lineJoin](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineJoin)。
{{ /if }}

{{ if: !true }}
{{ if: text === 'border' }}
### borderMiterLimit(number) = 10
{{ else }}
### miterLimit(number) = 10
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 {{ if: text === 'border' }}
`borderJoin`
{{ else }}
`join`
{{ /if }} 为 `miter` 时，{{ if: text === 'border' }}
`borderMiterLimit`
{{ else }}
`miterLimit`
{{ /if }} 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。
{{ /if }}



### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。





### width(number)

<ExampleUIControlNumber default="100" min="1" max="500" step="1" />

文本显示宽度。

### height(number)

<ExampleUIControlNumber default="50" min="1" max="500" step="1" />

文本显示高度。

### overflow(string) = 'none'

<ExampleUIControlEnum options="truncate,break,breakAll" />

文字超出宽度是否截断或者换行。配置`width`时有效

+ `'truncate'` 截断，并在末尾显示`ellipsis`配置的文本，默认为`...`
+ `'break'` 换行
+ `'breakAll'` 换行，跟`'break'`不同的是，在英语等拉丁文中，`'breakAll'`还会强制单词内换行

### ellipsis(string) = '...'

在`overflow`配置为`'truncate'`的时候，可以通过该属性配置末尾显示的文本。

### lineOverflow(string) = 'none'

文本超出高度部分是否截断，配置`height`时有效。

+ `'truncate'` 在文本行数超出高度部分截断。

{{ if: !${noRich} }}
### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

#### <style_name>(Object)



### color(Color) = '#333'

<ExampleUIControlColor default="'#333'" />

文字块边框文字的颜色。

{{ if: ${enableAutoColor} }}


如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。




{{ /if }}

### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字块边框文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

### fontWeight(string|number) = 'bolder'

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字块边框文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字块边框文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

### fontSize(number) = 18

<ExampleUIControlNumber default="18" min="1" step="1" />

文字块边框文字的字体大小。

{{ if: !true }}
### align(string) = ${defaultAlign}

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```


{{ /if }}

{{ if: !true }}
### verticalAlign(string) = ${defaultVerticalAlign}

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```


{{ /if }}

### lineHeight(number) = 

<ExampleUIControlNumber min="0" step="1" default="12" />

行高。



`rich` 中如果没有设置 `lineHeight`，则会取父层级的 `lineHeight`。例如：

```js
{
    lineHeight: 56,
    rich: {
        a: {
            // 没有设置 `lineHeight`，则 `lineHeight` 为 56
        }
    }
}
```



{{ if: !true }}
### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。

{{ if: ${enableAutoColor} }}


如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。




{{ /if }}

### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。

{{ if: ${enableAutoColor} }}


如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。




{{ /if }}

### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。



{{ if: border === 'border' }}
### borderType(string|number|Array) = 'solid'

{{ elif: border === 'text' }}
### textBorderType(string|number|Array) = 'solid'
{{ else }}
### type(string|number|Array) = 'solid'
{{ /if }}

<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />

{{ if: border === 'border' }}
文字块边框描边类型。

{{ elif: border === 'text' }}
文字本身的描边类型。
{{ else }}
线的类型。
{{ /if }}

可选：
+ `'solid'`
+ `'dashed'`
+ `'dotted'`

自 `v5.0.0` 开始，也可以是 `number` 或者 `number` 数组，用以指定线条的 [dash array](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-dasharray)，配合 {{ if: border === 'border' }}
`borderDashOffset`
{{ elif: border === 'text' }}
`textBorderDashOffset`
{{ else }}
`dashOffset`
{{ /if }} 可实现更灵活的虚线效果。

例如：
```js
{

{{ if: border === 'border' }}borderType{{ elif: border === 'text' }}textBorderType{{ else }}type{{ /if }}: [5, 10],

{{ if: border === 'border' }}borderDashOffset{{ elif: border === 'text' }}textBorderDashOffset{{ else }}dashOffset{{ /if }}: 5
}
```

{{ if: border === 'border' }}
### borderDashOffset(number) = 0

{{ elif: border === 'text' }}
### textBorderDashOffset(number) = 0
{{ else }}
### dashOffset(number) = 0
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 {{ if: border === 'border' }}
`borderType`
{{ elif: border === 'text' }}
`textBorderType`
{{ else }}
`type`
{{ /if }} 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。

{{ if: !true }}
{{ if: border === 'border' }}
### borderCap(string) = butt
{{ else }}
### cap(string) = butt
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。
{{ /if }}

{{ if: !true }}
{{ if: border === 'border' }}
### borderJoin(string) = bevel
{{ else }}
### join(string) = bevel
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="bevel" options="bevel,round,miter" />

用于设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）。

可以是：
+ `'bevel'`: 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
+ `'round'`: 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
+ `'miter'`: 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。这个设置可以通过 {{ if: border === 'border' }}
`borderMiterLimit`
{{ else }}
`miterLimit`
{{ /if }} 属性看到效果。

默认值为 `'bevel'`。 更多详情可以参考 MDN [lineJoin](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineJoin)。
{{ /if }}

{{ if: !true }}
{{ if: border === 'border' }}
### borderMiterLimit(number) = 10
{{ else }}
### miterLimit(number) = 10
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 {{ if: border === 'border' }}
`borderJoin`
{{ else }}
`join`
{{ /if }} 为 `miter` 时，{{ if: border === 'border' }}
`borderMiterLimit`
{{ else }}
`miterLimit`
{{ /if }} 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。
{{ /if }}



### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。
{{ /if }}

### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。

{{ if: ${enableAutoColor} }}


如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。




{{ /if }}

### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。



{{ if: text === 'border' }}
### borderType(string|number|Array) = 'solid'

{{ elif: text === 'text' }}
### textBorderType(string|number|Array) = 'solid'
{{ else }}
### type(string|number|Array) = 'solid'
{{ /if }}

<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />

{{ if: text === 'border' }}
文字块边框描边类型。

{{ elif: text === 'text' }}
文字本身的描边类型。
{{ else }}
线的类型。
{{ /if }}

可选：
+ `'solid'`
+ `'dashed'`
+ `'dotted'`

自 `v5.0.0` 开始，也可以是 `number` 或者 `number` 数组，用以指定线条的 [dash array](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-dasharray)，配合 {{ if: text === 'border' }}
`borderDashOffset`
{{ elif: text === 'text' }}
`textBorderDashOffset`
{{ else }}
`dashOffset`
{{ /if }} 可实现更灵活的虚线效果。

例如：
```js
{

{{ if: text === 'border' }}borderType{{ elif: text === 'text' }}textBorderType{{ else }}type{{ /if }}: [5, 10],

{{ if: text === 'border' }}borderDashOffset{{ elif: text === 'text' }}textBorderDashOffset{{ else }}dashOffset{{ /if }}: 5
}
```

{{ if: text === 'border' }}
### borderDashOffset(number) = 0

{{ elif: text === 'text' }}
### textBorderDashOffset(number) = 0
{{ else }}
### dashOffset(number) = 0
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 {{ if: text === 'border' }}
`borderType`
{{ elif: text === 'text' }}
`textBorderType`
{{ else }}
`type`
{{ /if }} 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。

{{ if: !true }}
{{ if: text === 'border' }}
### borderCap(string) = butt
{{ else }}
### cap(string) = butt
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。
{{ /if }}

{{ if: !true }}
{{ if: text === 'border' }}
### borderJoin(string) = bevel
{{ else }}
### join(string) = bevel
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="bevel" options="bevel,round,miter" />

用于设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）。

可以是：
+ `'bevel'`: 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
+ `'round'`: 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
+ `'miter'`: 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。这个设置可以通过 {{ if: text === 'border' }}
`borderMiterLimit`
{{ else }}
`miterLimit`
{{ /if }} 属性看到效果。

默认值为 `'bevel'`。 更多详情可以参考 MDN [lineJoin](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineJoin)。
{{ /if }}

{{ if: !true }}
{{ if: text === 'border' }}
### borderMiterLimit(number) = 10
{{ else }}
### miterLimit(number) = 10
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 {{ if: text === 'border' }}
`borderJoin`
{{ else }}
`join`
{{ /if }} 为 `miter` 时，{{ if: text === 'border' }}
`borderMiterLimit`
{{ else }}
`miterLimit`
{{ /if }} 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。
{{ /if }}



### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。




{{ /if }}





## subtext(string) = ''

<ExampleUIControlText />

副标题文本，支持使用 `\n` 换行。

## sublink(string) = ''

副标题文本超链接。

## subtarget(string) = 'blank'

指定窗口打开副标题超链接，可选：

+ `'self'` 当前窗口打开

+ `'blank'` 新窗口打开

## subtextStyle(Object)





### color(Color) = '#aaa'

<ExampleUIControlColor default="'#aaa'" />

副标题文字的颜色。

{{ if: ${enableAutoColor} }}


如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。




{{ /if }}

### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

副标题文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

副标题文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

副标题文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

副标题文字的字体大小。

{{ if: !${noAlign} }}
### align(string) = ${defaultAlign}

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```


{{ /if }}

{{ if: !${noVerticalAlign} }}
### verticalAlign(string) = ${defaultVerticalAlign}

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```


{{ /if }}

### lineHeight(number) = 

<ExampleUIControlNumber min="0" step="1" default="12" />

行高。



`rich` 中如果没有设置 `lineHeight`，则会取父层级的 `lineHeight`。例如：

```js
{
    lineHeight: 56,
    rich: {
        a: {
            // 没有设置 `lineHeight`，则 `lineHeight` 为 56
        }
    }
}
```



{{ if: !true }}
### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。

{{ if: ${enableAutoColor} }}


如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。




{{ /if }}

### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。

{{ if: ${enableAutoColor} }}


如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。




{{ /if }}

### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。



{{ if: border === 'border' }}
### borderType(string|number|Array) = 'solid'

{{ elif: border === 'text' }}
### textBorderType(string|number|Array) = 'solid'
{{ else }}
### type(string|number|Array) = 'solid'
{{ /if }}

<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />

{{ if: border === 'border' }}
文字块边框描边类型。

{{ elif: border === 'text' }}
文字本身的描边类型。
{{ else }}
线的类型。
{{ /if }}

可选：
+ `'solid'`
+ `'dashed'`
+ `'dotted'`

自 `v5.0.0` 开始，也可以是 `number` 或者 `number` 数组，用以指定线条的 [dash array](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-dasharray)，配合 {{ if: border === 'border' }}
`borderDashOffset`
{{ elif: border === 'text' }}
`textBorderDashOffset`
{{ else }}
`dashOffset`
{{ /if }} 可实现更灵活的虚线效果。

例如：
```js
{

{{ if: border === 'border' }}borderType{{ elif: border === 'text' }}textBorderType{{ else }}type{{ /if }}: [5, 10],

{{ if: border === 'border' }}borderDashOffset{{ elif: border === 'text' }}textBorderDashOffset{{ else }}dashOffset{{ /if }}: 5
}
```

{{ if: border === 'border' }}
### borderDashOffset(number) = 0

{{ elif: border === 'text' }}
### textBorderDashOffset(number) = 0
{{ else }}
### dashOffset(number) = 0
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 {{ if: border === 'border' }}
`borderType`
{{ elif: border === 'text' }}
`textBorderType`
{{ else }}
`type`
{{ /if }} 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。

{{ if: !true }}
{{ if: border === 'border' }}
### borderCap(string) = butt
{{ else }}
### cap(string) = butt
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。
{{ /if }}

{{ if: !true }}
{{ if: border === 'border' }}
### borderJoin(string) = bevel
{{ else }}
### join(string) = bevel
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="bevel" options="bevel,round,miter" />

用于设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）。

可以是：
+ `'bevel'`: 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
+ `'round'`: 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
+ `'miter'`: 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。这个设置可以通过 {{ if: border === 'border' }}
`borderMiterLimit`
{{ else }}
`miterLimit`
{{ /if }} 属性看到效果。

默认值为 `'bevel'`。 更多详情可以参考 MDN [lineJoin](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineJoin)。
{{ /if }}

{{ if: !true }}
{{ if: border === 'border' }}
### borderMiterLimit(number) = 10
{{ else }}
### miterLimit(number) = 10
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 {{ if: border === 'border' }}
`borderJoin`
{{ else }}
`join`
{{ /if }} 为 `miter` 时，{{ if: border === 'border' }}
`borderMiterLimit`
{{ else }}
`miterLimit`
{{ /if }} 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。
{{ /if }}



### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。
{{ /if }}

### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。

{{ if: ${enableAutoColor} }}


如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。




{{ /if }}

### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。



{{ if: text === 'border' }}
### borderType(string|number|Array) = 'solid'

{{ elif: text === 'text' }}
### textBorderType(string|number|Array) = 'solid'
{{ else }}
### type(string|number|Array) = 'solid'
{{ /if }}

<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />

{{ if: text === 'border' }}
文字块边框描边类型。

{{ elif: text === 'text' }}
文字本身的描边类型。
{{ else }}
线的类型。
{{ /if }}

可选：
+ `'solid'`
+ `'dashed'`
+ `'dotted'`

自 `v5.0.0` 开始，也可以是 `number` 或者 `number` 数组，用以指定线条的 [dash array](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-dasharray)，配合 {{ if: text === 'border' }}
`borderDashOffset`
{{ elif: text === 'text' }}
`textBorderDashOffset`
{{ else }}
`dashOffset`
{{ /if }} 可实现更灵活的虚线效果。

例如：
```js
{

{{ if: text === 'border' }}borderType{{ elif: text === 'text' }}textBorderType{{ else }}type{{ /if }}: [5, 10],

{{ if: text === 'border' }}borderDashOffset{{ elif: text === 'text' }}textBorderDashOffset{{ else }}dashOffset{{ /if }}: 5
}
```

{{ if: text === 'border' }}
### borderDashOffset(number) = 0

{{ elif: text === 'text' }}
### textBorderDashOffset(number) = 0
{{ else }}
### dashOffset(number) = 0
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 {{ if: text === 'border' }}
`borderType`
{{ elif: text === 'text' }}
`textBorderType`
{{ else }}
`type`
{{ /if }} 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。

{{ if: !true }}
{{ if: text === 'border' }}
### borderCap(string) = butt
{{ else }}
### cap(string) = butt
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。
{{ /if }}

{{ if: !true }}
{{ if: text === 'border' }}
### borderJoin(string) = bevel
{{ else }}
### join(string) = bevel
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="bevel" options="bevel,round,miter" />

用于设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）。

可以是：
+ `'bevel'`: 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
+ `'round'`: 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
+ `'miter'`: 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。这个设置可以通过 {{ if: text === 'border' }}
`borderMiterLimit`
{{ else }}
`miterLimit`
{{ /if }} 属性看到效果。

默认值为 `'bevel'`。 更多详情可以参考 MDN [lineJoin](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineJoin)。
{{ /if }}

{{ if: !true }}
{{ if: text === 'border' }}
### borderMiterLimit(number) = 10
{{ else }}
### miterLimit(number) = 10
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 {{ if: text === 'border' }}
`borderJoin`
{{ else }}
`join`
{{ /if }} 为 `miter` 时，{{ if: text === 'border' }}
`borderMiterLimit`
{{ else }}
`miterLimit`
{{ /if }} 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。
{{ /if }}



### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。





### width(number)

<ExampleUIControlNumber default="100" min="1" max="500" step="1" />

文本显示宽度。

### height(number)

<ExampleUIControlNumber default="50" min="1" max="500" step="1" />

文本显示高度。

### overflow(string) = 'none'

<ExampleUIControlEnum options="truncate,break,breakAll" />

文字超出宽度是否截断或者换行。配置`width`时有效

+ `'truncate'` 截断，并在末尾显示`ellipsis`配置的文本，默认为`...`
+ `'break'` 换行
+ `'breakAll'` 换行，跟`'break'`不同的是，在英语等拉丁文中，`'breakAll'`还会强制单词内换行

### ellipsis(string) = '...'

在`overflow`配置为`'truncate'`的时候，可以通过该属性配置末尾显示的文本。

### lineOverflow(string) = 'none'

文本超出高度部分是否截断，配置`height`时有效。

+ `'truncate'` 在文本行数超出高度部分截断。

{{ if: !${noRich} }}
### rich(Object)

在 `rich` 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。

例如：

```js
label: {
    // 在文本中，可以对部分文本采用 rich 中定义样式。
    // 这里需要在文本中使用标记符号：
    // `{styleName|text content text content}` 标记样式名。
    // 注意，换行仍是使用 '\n'。
    formatter: [
        '{a|这段文本采用样式a}',
        '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
    ].join('\n'),

    rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
        ...
    }
}
```


详情参见教程：[富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

#### <style_name>(Object)



### color(Color) = '#aaa'

<ExampleUIControlColor default="'#aaa'" />

文字块边框文字的颜色。

{{ if: ${enableAutoColor} }}


如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。




{{ /if }}

### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

文字块边框文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

文字块边框文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

文字块边框文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

文字块边框文字的字体大小。

{{ if: !${noAlign} }}
### align(string) = ${defaultAlign}

<ExampleUIControlEnum options="left,center,right" />

文字水平对齐方式，默认自动。

可选：
+ `'left'`
+ `'center'`
+ `'right'`



`rich` 中如果没有设置 `align`，则会取父层级的 `align`。例如：

```js
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```


{{ /if }}

{{ if: !${noVerticalAlign} }}
### verticalAlign(string) = ${defaultVerticalAlign}

<ExampleUIControlEnum options="top,middle,bottom" />

文字垂直对齐方式，默认自动。

可选：
+ `'top'`
+ `'middle'`
+ `'bottom'`



`rich` 中如果没有设置 `verticalAlign`，则会取父层级的 `verticalAlign`。例如：

```js
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```


{{ /if }}

### lineHeight(number) = 

<ExampleUIControlNumber min="0" step="1" default="12" />

行高。



`rich` 中如果没有设置 `lineHeight`，则会取父层级的 `lineHeight`。例如：

```js
{
    lineHeight: 56,
    rich: {
        a: {
            // 没有设置 `lineHeight`，则 `lineHeight` 为 56
        }
    }
}
```



{{ if: !true }}
### backgroundColor(string|Object) = 'transparent'

<ExampleUIControlColor default="#fff" />

文字块背景色。

可以使用颜色值，例如：`'#123234'`, `'red'`, `'rgba(0,23,11,0.3)'`。

也可以直接使用图片，例如：

```js
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 `width` 或 `height` 指定高宽，也可以不指定自适应。

{{ if: ${enableAutoColor} }}


如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。




{{ /if }}

### borderColor(Color)

<ExampleUIControlColor default="#fff" />

文字块边框颜色。

{{ if: ${enableAutoColor} }}


如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。




{{ /if }}

### borderWidth(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块边框宽度。



{{ if: border === 'border' }}
### borderType(string|number|Array) = 'solid'

{{ elif: border === 'text' }}
### textBorderType(string|number|Array) = 'solid'
{{ else }}
### type(string|number|Array) = 'solid'
{{ /if }}

<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />

{{ if: border === 'border' }}
文字块边框描边类型。

{{ elif: border === 'text' }}
文字本身的描边类型。
{{ else }}
线的类型。
{{ /if }}

可选：
+ `'solid'`
+ `'dashed'`
+ `'dotted'`

自 `v5.0.0` 开始，也可以是 `number` 或者 `number` 数组，用以指定线条的 [dash array](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-dasharray)，配合 {{ if: border === 'border' }}
`borderDashOffset`
{{ elif: border === 'text' }}
`textBorderDashOffset`
{{ else }}
`dashOffset`
{{ /if }} 可实现更灵活的虚线效果。

例如：
```js
{

{{ if: border === 'border' }}borderType{{ elif: border === 'text' }}textBorderType{{ else }}type{{ /if }}: [5, 10],

{{ if: border === 'border' }}borderDashOffset{{ elif: border === 'text' }}textBorderDashOffset{{ else }}dashOffset{{ /if }}: 5
}
```

{{ if: border === 'border' }}
### borderDashOffset(number) = 0

{{ elif: border === 'text' }}
### textBorderDashOffset(number) = 0
{{ else }}
### dashOffset(number) = 0
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 {{ if: border === 'border' }}
`borderType`
{{ elif: border === 'text' }}
`textBorderType`
{{ else }}
`type`
{{ /if }} 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。

{{ if: !true }}
{{ if: border === 'border' }}
### borderCap(string) = butt
{{ else }}
### cap(string) = butt
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。
{{ /if }}

{{ if: !true }}
{{ if: border === 'border' }}
### borderJoin(string) = bevel
{{ else }}
### join(string) = bevel
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="bevel" options="bevel,round,miter" />

用于设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）。

可以是：
+ `'bevel'`: 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
+ `'round'`: 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
+ `'miter'`: 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。这个设置可以通过 {{ if: border === 'border' }}
`borderMiterLimit`
{{ else }}
`miterLimit`
{{ /if }} 属性看到效果。

默认值为 `'bevel'`。 更多详情可以参考 MDN [lineJoin](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineJoin)。
{{ /if }}

{{ if: !true }}
{{ if: border === 'border' }}
### borderMiterLimit(number) = 10
{{ else }}
### miterLimit(number) = 10
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 {{ if: border === 'border' }}
`borderJoin`
{{ else }}
`join`
{{ /if }} 为 `miter` 时，{{ if: border === 'border' }}
`borderMiterLimit`
{{ else }}
`miterLimit`
{{ /if }} 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。
{{ /if }}



### borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT, RB, LB"  />

文字块的圆角。

### padding(number|Array) = 0

<ExampleUIControlVector min="0" dims="T,R,B,L"  />

文字块的内边距。例如：

+ `padding: [3, 4, 5, 6]`：表示 `[上, 右, 下, 左]` 的边距。
+ `padding: 4`：表示 `padding: [4, 4, 4, 4]`。
+ `padding: [3, 4]`：表示 `padding: [3, 4, 3, 4]`。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

### shadowColor(Color) = 'transparent'

<ExampleUIControlColor />

文字块的背景阴影颜色。

### shadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字块的背景阴影长度。

### shadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 X 偏移。

### shadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字块的背景阴影 Y 偏移。
{{ /if }}

### width(number|string)

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

`width` 也可以是百分比字符串，如 `'100%'`。表示的是所在文本块的 `contentWidth`（即不包含文本块的 `padding`）的百分之多少。之所以以 `contentWidth` 做基数，因为每个文本片段只能基于 `content box` 布局。如果以 `outerWidth` 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

### height(number|string)

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 `backgroundColor`）时，可能会使用它。

注意，文字块的 `width` 和 `height` 指定的是内容高宽，不包含 `padding`。

注意，如果不定义 `rich` 属性，则不能指定 `width` 和 `height`。

### textBorderColor(Color)

<ExampleUIControlColor />

文字本身的描边颜色。

{{ if: ${enableAutoColor} }}


如果设置为 `'inherit'`，则为视觉映射得到的颜色，如系列色。




{{ /if }}

### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。



{{ if: text === 'border' }}
### borderType(string|number|Array) = 'solid'

{{ elif: text === 'text' }}
### textBorderType(string|number|Array) = 'solid'
{{ else }}
### type(string|number|Array) = 'solid'
{{ /if }}

<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />

{{ if: text === 'border' }}
文字块边框描边类型。

{{ elif: text === 'text' }}
文字本身的描边类型。
{{ else }}
线的类型。
{{ /if }}

可选：
+ `'solid'`
+ `'dashed'`
+ `'dotted'`

自 `v5.0.0` 开始，也可以是 `number` 或者 `number` 数组，用以指定线条的 [dash array](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-dasharray)，配合 {{ if: text === 'border' }}
`borderDashOffset`
{{ elif: text === 'text' }}
`textBorderDashOffset`
{{ else }}
`dashOffset`
{{ /if }} 可实现更灵活的虚线效果。

例如：
```js
{

{{ if: text === 'border' }}borderType{{ elif: text === 'text' }}textBorderType{{ else }}type{{ /if }}: [5, 10],

{{ if: text === 'border' }}borderDashOffset{{ elif: text === 'text' }}textBorderDashOffset{{ else }}dashOffset{{ /if }}: 5
}
```

{{ if: text === 'border' }}
### borderDashOffset(number) = 0

{{ elif: text === 'text' }}
### textBorderDashOffset(number) = 0
{{ else }}
### dashOffset(number) = 0
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 {{ if: text === 'border' }}
`borderType`
{{ elif: text === 'text' }}
`textBorderType`
{{ else }}
`type`
{{ /if }} 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。

{{ if: !true }}
{{ if: text === 'border' }}
### borderCap(string) = butt
{{ else }}
### cap(string) = butt
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。
{{ /if }}

{{ if: !true }}
{{ if: text === 'border' }}
### borderJoin(string) = bevel
{{ else }}
### join(string) = bevel
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="bevel" options="bevel,round,miter" />

用于设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）。

可以是：
+ `'bevel'`: 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
+ `'round'`: 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
+ `'miter'`: 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。这个设置可以通过 {{ if: text === 'border' }}
`borderMiterLimit`
{{ else }}
`miterLimit`
{{ /if }} 属性看到效果。

默认值为 `'bevel'`。 更多详情可以参考 MDN [lineJoin](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineJoin)。
{{ /if }}

{{ if: !true }}
{{ if: text === 'border' }}
### borderMiterLimit(number) = 10
{{ else }}
### miterLimit(number) = 10
{{ /if }}



> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 {{ if: text === 'border' }}
`borderJoin`
{{ else }}
`join`
{{ /if }} 为 `miter` 时，{{ if: text === 'border' }}
`borderMiterLimit`
{{ else }}
`miterLimit`
{{ /if }} 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。
{{ /if }}



### textShadowColor(Color) = 'transparent'

<ExampleUIControlColor default="#000" />

文字本身的阴影颜色。

### textShadowBlur(number) = 0

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的阴影长度。

### textShadowOffsetX(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 X 偏移。

### textShadowOffsetY(number) = 0

<ExampleUIControlNumber step="0.5" />

文字本身的阴影 Y 偏移。




{{ /if }}





## textAlign(string) = 'auto'

<ExampleUIControlEnum options="auto,left,center,right" default="auto" />

整体（包括 text 和 subtext）的水平对齐。

可选值：`'auto'`、`'left'`、`'right'`、`'center'`。

## textVerticalAlign(string) = 'auto'

<ExampleUIControlEnum options="auto,top,middle,bottom" default="auto" />

整体（包括 text 和 subtext）的垂直对齐。

可选值：`'auto'`、`'top'`、`'bottom'`、`'middle'`。

## triggerEvent(boolean) = false

是否触发事件。

## padding(number|Array) = 5



<ExampleUIControlVector min="0" dims="T,R,B,L"  />

标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。

使用示例：
```js
// 设置内边距为 5
padding: 5
// 设置上下的内边距为 5，左右的内边距为 10
padding: [5, 10]
// 分别设置四个方向的内边距
padding: [
    5,  // 上
    10, // 右
    5,  // 下
    10, // 左
]
```



## itemGap(number) = 10

<ExampleUIControlNumber min="0" default="10" step="1" />

主副标题之间的间距。



{{ if: !${noZ} }}


## zlevel(number) = 0

title 所有图形的 zlevel 值。

`zlevel`用于 Canvas 分层，不同`zlevel`值的图形会放置在不同的 Canvas 中，Canvas 分层是一种常见的优化手段。我们可以把一些图形变化频繁（例如有动画）的组件设置成一个单独的`zlevel`。需要注意的是过多的 Canvas 会引起内存开销的增大，在手机端上需要谨慎使用以防崩溃。

`zlevel` 大的 Canvas 会放在 `zlevel` 小的 Canvas 的上面。

## z(number) = 2

title 组件的所有图形的`z`值。控制图形的前后顺序。`z`值小的图形会被`z`值大的图形覆盖。

`z`相比`zlevel`优先级更低，而且不会创建新的 Canvas。


{{ /if }}

## left(string|number) = 'auto'

<ExampleUIControlPercent default="0%"/>

title 组件离容器左侧的距离。

`left` 的值可以是像 `20` 这样的具体像素值，可以是像 `'20%'` 这样相对于容器高宽的百分比，也可以是 `'left'`, `'center'`, `'right'`。

如果 `left` 的值为`'left'`, `'center'`, `'right'`，组件会根据相应的位置自动对齐。

## top(string|number) = 'auto'

<ExampleUIControlPercent default="0%"/>

title 组件离容器上侧的距离。

`top` 的值可以是像 `20` 这样的具体像素值，可以是像 `'20%'` 这样相对于容器高宽的百分比，也可以是 `'top'`, `'middle'`, `'bottom'`。

如果 `top` 的值为`'top'`, `'middle'`, `'bottom'`，组件会根据相应的位置自动对齐。

## right(string|number) = 'auto'

<ExampleUIControlPercent default="0%"/>

title 组件离容器右侧的距离。

`right` 的值可以是像 `20` 这样的具体像素值，可以是像 `'20%'` 这样相对于容器高宽的百分比。

{{ if: !${defaultRight} }}默认自适应。{{ /if }}

## bottom(string|number) = 'auto'

<ExampleUIControlPercent default="0%"/>

title 组件离容器下侧的距离。

bottom 的值可以是像 `20` 这样的具体像素值，可以是像 `'20%'` 这样相对于容器高宽的百分比。

{{ if: !${defaultBottom} }}默认自适应。{{ /if }}





## backgroundColor(Color) = 'transparent'

<ExampleUIControlColor />

标题背景色，默认透明。

> 颜色可以使用 RGB 表示，比如 `'rgb(128, 128, 128)'`   ，如果想要加上 alpha 通道，可以使用 RGBA，比如 `'rgba(128, 128, 128, 0.5)'`，也可以使用十六进制格式，比如 `'#ccc'`

{{ if: ${needShow} }}
**注意**：此配置项生效的前提是，设置了 `show: true`。
{{ /if }}

## borderColor(Color) = '#ccc'

<ExampleUIControlColor default="#ccc" />

标题的边框颜色。支持的颜色格式同 backgroundColor。

{{ if: ${needShow} }}
**注意**：此配置项生效的前提是，设置了 `show: true`。
{{ /if }}

## borderWidth(number) = 0

<ExampleUIControlNumber default="0" min="0" step="0.5" />

标题的边框线宽。

{{ if: ${needShow} }}
**注意**：此配置项生效的前提是，设置了 `show: true`。
{{ /if }}

{{ if: true }}


## borderRadius(number|Array) = 0

<ExampleUIControlVector min="0" dims="LT,RT,RB,LB"  />

圆角半径，单位px，支持传入数组分别指定 4 个圆角半径。
如:
```
borderRadius: 5, // 统一设置四个角的圆角大小
borderRadius: [5, 5, 0, 0] //（顺时针左上，右上，右下，左下）
```


{{ /if }}



## shadowBlur(number) = ${defaultShadowBlur}

<ExampleUIControlNumber default="${defaultShadowBlur}" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```

{{ if: true }}
**注意**：此配置项生效的前提是，设置了 `show: true` 以及值不为 `tranparent` 的背景色 `backgroundColor`。
{{ /if }}

## shadowColor(Color) = ${defaultShadowColor}

<ExampleUIControlColor default="${defaultShadowColor}" />

阴影颜色。支持的格式同`color`。

{{ if: true }}
**注意**：此配置项生效的前提是，设置了 `show: true`。
{{ /if }}

## shadowOffsetX(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影水平方向上的偏移距离。

{{ if: true }}
**注意**：此配置项生效的前提是，设置了 `show: true`。
{{ /if }}

## shadowOffsetY(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影垂直方向上的偏移距离。

{{ if: true }}
**注意**：此配置项生效的前提是，设置了 `show: true`。
{{ /if }}
