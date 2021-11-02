`${rangeType}` 能定义目标系列（参见 [${visualMapName}.seriesIndex](~${visualMapName}.seriesIndex)）视觉形式，也同时定义了 `${visualMapName}` 本身的视觉样式。通俗来讲就是，假如 `${visualMapName}`控制的是散点图，那么 `${rangeType}` 同时定义了散点图的 `颜色`、`尺寸` 等，也定义了 `${visualMapName}` 本身的 `颜色`、`尺寸` 等。这二者能对应上。

定义方式，例如：

```javascript
visualMap: [
    {
        ...,
        ${rangeType}: {
            color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
            symbolSize: [30, 100]
        }
    }
]
```

如果想分别定义 `${visualMapName}` 本身的视觉样式和 `目标系列` 的视觉样式，则这样定义：

```javascript
visualMap: [
    {
        ...,
        // 表示 目标系列 的视觉样式。
        target: {
            ${rangeType}: {
                color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
                symbolSize: [60, 200]
            }
        },
        // 表示 ${visualMapName} 本身的视觉样式。
        controller: {
            ${rangeType}: {
                symbolSize: [30, 100]
            }
        }
    }
]
```

或者这样定义：
```javascript
visualMap: [
    {
        ...,
        // 表示 目标系列 的视觉样式 和 ${visualMapName} 共有的视觉样式。
        ${rangeType}: {
            color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
            symbolSize: [60, 200]
        },
        // 表示 ${visualMapName} 本身的视觉样式，会覆盖共有的视觉样式。比如，symbolSize 覆盖成为 [30, 100]，而 color 不变。
        controller: {
            ${rangeType}: {
                symbolSize: [30, 100]
            }
        }
    }
]
```

**✦ 关于视觉通道 ✦**

+ ${rangeType} 中，可以有任意几个的『视觉通道』定义（如 `color`、`symbolSize` 等）。这些视觉通道，会被同时采用。

+ 一般来说，建议使用 `透明度（opacity）` ，而非 `颜色透明度（colorAlpha）` （他们细微的差异在于，前者能也同时控制图元中的附属物（如 label）的透明度，而后者只能控制图元本身颜色的透明度）。

+ 视觉映射的方式：支持两种方式：线性映射、查表映射。


**✦ 视觉通道 -- 线性映射 ✦**

`线性映射` 表示 series.data 中的每一个值（dataValue）会经过线性映射计算，从 `[visualMap.min, visualMap.max]` 映射到设定的 `[visual value 1, visual value 2]` 区间中的某一个视觉的值（下称 visual value）。

例如，我们设置了 `[visualMap.min, visualMap.max] 为 [0, 100]`，并且我们有 `series.data: [50, 10, 100]`。我们想将其映射到范围为 `[0.4, 1]` 的 `opacity` 上，从而达到用透明度表达数值大小的目的。那么 visualMap 组件会对 series.data 中的每一个 dataValue 做线性映射计算，得到一个 opacityValue。最终得到的 opacityValues 为 `[0.7, 0.44, 1]`。

visual 范围也可以反向，例如上例，可以设定 `opacity` 范围为 `[1, 0.4]`，则上例得到的 opacityValues 为 `[0.7, 0.96, 0.4]`。

注意，[visualMap.min, visualMap.max] 须手动设置，不设置则默认取 [0, 100]，而非 series.data 中的 `dataMin` 和 `dataMax`。


如何设定为线性映射？以下情况时，会设定为 `线性映射`：

+ 当 `visualMap` 为 [visualMap-continuous](~visualMap-continuous) 时，或者

+ 当 `visualMap` 为 [visualMap-piecewise](~visualMap-piecewise) 且 未设置 [visualMap-piecewise.categories](~visualMap-piecewise.categories) 时。

视觉通道的值（visual value）：

+ 视觉通道的值一般都以 `Array` 形式表示，例如：`color: ['#333', '#777']`。

+ 如果写成 `number` 或 `string`，会转成 `Array`。例如，写成 `opacity: 0.4` 会转成 `opacity: [0.4, 0.4]`，`color: '#333'` 会转成 `color: ['#333', '#333']`。

+ 对于 `图形大小（symbolSize）`、`透明度（opacity）`、`颜色透明度（colorAlpha）`、`颜色明暗度（colorLightness）`、`颜色饱和度（colorSaturation）`、`色调（colorHue）`：形如`Array` 的视觉范围总是表示：`[最小数据值对应的视觉值, 最大数据值对应的视觉值]`。比如：`colorLightness: [0.8, 0.2]`，表示 series.data 中，和 `visualMap.min` 相等的值（如果有的话）映射到 `颜色明暗` 的 `0.8`，和 `visualMap.max` 相等的值（如果有的话）映射到 `颜色明暗` 的 `0.2`，中间其他数据值，按照线性计算出映射结果。

+ 对于 `颜色（color）`，使用数组表示例如：`['#333', '#78ab23', 'blue']`。意思就是以这三个点作为基准，形成一种『渐变』的色带，数据映射到这个色带上。也就是说，与 `visualMap.min` 相等的值会映射到 `'#333'`，与 `visualMap.max` 相等的值会映射到 `'blue'`。对于 `visualMap.min` 和 `visualMap.max` 中间的其他点，以所给定的 `'#333'`, `'#78ab23'`, `'blue'` 这三个颜色作为基准点进行分段线性插值，得到映射结果。

+ 对于 `图形类别（symbol）`：使用数据表示例如：`['circle', 'rect', 'diamond']`。与 `visualMap.min` 相等的值会映射到 `'circle'`，与 `visualMap.max` 相等的值会映射到 `'diamond'`。对于 中间的其他点，会根据他们和 `visualMap.min` 和 `visualMap.max` 的数值距离，映射到 `'circle'`, `'rect'`, `'diamond'` 中某个值上。


visual value 的取值范围：

+ `透明度（opacity）`、`颜色透明度（colorAlpha）`、`颜色明暗度（colorLightness）`、`颜色饱和度（colorSaturation）`、`visual value`

    取值范围是 `[0, 1]`。

+ `色调（colorHue）`：

    取值范围是 `[0, 360]`。

+ `颜色（color）`：

    颜色可以使用 RGB 表示，比如 `'rgb(128, 128, 128)'`，如果想要加上 alpha 通道，可以使用 RGBA，比如 `'rgba(128, 128, 128, 0.5)'`，也可以使用十六进制格式，比如 '#ccc'。

+ `图形类别（symbol）`：



**✦ 视觉通道 -- 查表映射 ✦**

`查表映射` 表示 series.data 中的所有值（dataValue）是可枚举的，会根据给定的映射表查表得到映射结果。

例如，在 [visualMap-piecewise](~visualMap-piecewise) 中，我们设定了 [visualMap-piecewise.categories](~visualMap-piecewise.categories) 为 `['Demon Hunter', 'Blademaster', 'Death Knight', 'Warden', 'Paladin']`。我们有 series.data: `['Demon Hunter', 'Death Knight', 'Warden', 'Paladin']`。然后我们可以定立查表映射规则：`color: {'Warden': 'red', 'Demon Hunter': 'black'}`，于是 `visualMap` 组件会按照表来将 `dataValue` 映射到 `color`。

如何设定为查表映射？当 `visualMap` 为 [visualMap-piecewise](~visualMap-piecewise) 且 设置了 [visualMap-piecewise.categories](~visualMap-piecewise.categories) 时，会进行查表映射。

视觉通道的值（visual value）：一般使用 `Object` 或 `Array` 来表示，例如：

```javascript
visualMap: {
    type: 'piecewise',
    // categories 定义了 visualMap-piecewise 组件显示出来的项。
    categories: [
        'Demon Hunter', 'Blademaster', 'Death Knight', 'Warden', 'Paladin'
    ],
    ${rangeType}: {
        // visual value 可以配成 Object：
        color: {
            'Warden': 'red',
            'Demon Hunter': 'black',
            '': 'green' // 空字串，表示除了'Warden'、'Demon Hunter'外，都对应到 'green'。
        }
        // visual value 也可以只配一个单值，表示所有都映射到一个值，如：
        color: 'green',
        // visual value 也可以配成数组，这个数组须和 categories 数组等长，
        // 每个数组项和 categories 数组项一一对应：
        color: ['red', 'black', 'green', 'yellow', 'white']
    }
}
```

[参见示例](${galleryEditorPath}doc-example/scatter-visualMap-categories&edit=1&reset=1)
