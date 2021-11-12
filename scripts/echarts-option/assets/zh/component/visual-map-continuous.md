# visualMap.continuous(Object)

**连续型视觉映射组件（visualMapContinuous）**

（参考[视觉映射组件（visualMap）的介绍](~visualMap)）


`visualMapContinuous`中，可以通过 [visualMap.calculable](~visualMap.calculable) 来显示或隐藏手柄（手柄能拖拽改变值域）。

<ExampleBaseOption name="visual-map-heatmap" title="热力图颜色线性映射" title-en="Heatmap - Linear Map">
// https://echarts.apache.org/examples/zh/editor.html?c=heatmap-large
option = {"tooltip":{},"xAxis":{"type":"category","data":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},"yAxis":{"type":"category","data":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]},"visualMap":{"min":0,"max":100,"calculable":true,"realtime":false,"inRange":{"color":["#313695","#4575b4","#74add1","#abd9e9","#e0f3f8","#ffffbf","#fee090","#fdae61","#f46d43","#d73027","#a50026"]}},"series":[{"name":"Gaussian","type":"heatmap","data":[[0,0,50],[0,1,50],[0,2,50],[0,3,50],[0,4,50],[0,5,50],[0,6,50],[0,7,50],[0,8,50],[0,9,50],[0,10,50],[0,11,50],[0,12,50],[0,13,50],[0,14,50],[0,15,50],[0,16,50],[0,17,50],[0,18,50],[0,19,50],[0,20,50],[1,0,54.994209375000004],[1,1,54.98855287535156],[1,2,54.983669047750006],[1,3,54.980227686550776],[1,4,54.978760914000006],[1,5,54.97964233398438],[1,6,54.983074003125],[1,7,54.98908121921484],[1,8,54.997515127],[1,9,55.00806314130469],[1,10,55.020267187500004],[1,11,55.0335497593164],[1,12,55.047247794],[1,13,55.0606543648125],[1,14,55.073068190875],[1,15,55.08385096435546],[1,16,55.092492495],[1,17,55.09868367200781],[1,18,55.10239724325],[1,19,55.103976411832036],[1,20,55.104231250000005],[2,0,59.9144],[2,1,59.87254178725],[2,2,59.83612736],[2,3,59.80991875325],[2,4,59.797737472],[2,5,59.80230078125],[2,6,59.825115776000004],[2,7,59.866431231250004],[2,8,59.925247232000004],[2,9,59.999382583250004],[2,10,60.08560000000001],[2,11,60.17978907725],[2,12,60.27720704],[2,13,60.37277727325],[2,14,60.461445632],[2,15,60.53859453125],[2,16,60.60051481600001],[2,17,60.64493541125],[2,18,60.67161075200001],[2,19,60.68296599325001],[2,20,60.6848],[3,0,64.60082187500001],[3,1,64.4705362889961],[3,2,64.35634390175],[3,3,64.27246293910156],[3,4,64.230427154],[3,5,64.23854693603516],[3,6,64.301550051125],[3,7,64.42040201135937],[3,8,64.592306075],[3,9,64.81088287663673],[3,10,65.0665296875],[3,11,65.34695930592969],[3,12,65.637918578],[3,13,65.92408654830078],[3,14,66.190152240875],[3,15,66.4220720703125],[3,16,66.60850688299999],[3,17,66.74243862852734],[3,18,66.82296666124999],[3,19,66.85728367200781],[3,20,66.86283125],[4,0,68.8416],[4,1,68.557701681],[4,2,68.30702156800001],[4,3,68.11922918100001],[4,4,68.01867264],[4,5,68.023140625],[4,6,68.143015296],[4,7,68.380816173],[4,8,68.731134976],[4,9,69.180961425],[4,10,69.7104],[4,11,70.29377766100001],[4,12,70.90114252800001],[4,13,71.50015352100002],[4,14,72.05836096],[4,15,72.545878125],[4,16,72.938443776],[4,17,73.22087563299999],[4,18,73.39091481599999],[4,19,73.46346124499999],[4,20,73.4752],[5,0,72.412109375],[5,1,71.90412197265626],[5,2,71.45227109375],[5,3,71.10730203857422],[5,4,70.91138125],[5,5,70.89576721191406],[5,6,71.07918007812499],[5,7,71.46687003173828],[5,8,72.050384375],[5,9,72.80803334960937],[5,10,73.7060546875],[5,11,74.70047689208985],[5,12,75.73968125],[5,13,76.76766257324219],[5,14,77.72798867187501],[5,15,78.5684585571289],[5,16,79.246459375],[5,17,79.73502207031248],[5,18,80.02957578124999],[5,19,80.15540096435545],[5,20,80.17578125],[6,0,75.10759999999999],[6,1,74.306365026875],[6,2,73.588477184],[6,3,73.030288488875],[6,4,72.69610342399999],[6,5,72.634326171875],[6,6,72.87470864],[6,7,73.426699275875],[6,8,74.278892672],[6,9,75.399579960875],[6,10,76.7384],[6,11,78.229091346875],[6,12,79.79334502399999],[6,13,81.345758073875],[6,14,82.79988790399999],[6,15,84.075407421875],[6,16,85.10636096],[6,17,85.85052099087498],[6,18,86.299845632],[6,19,86.49203694087497],[6,20,86.5232],[7,0,76.769071875],[7,1,75.61228988726954],[7,2,74.56835686375],[7,3,73.74219509090625],[7,4,73.223470242],[7,5,73.08077093505861],[7,6,73.357375684125],[7,7,74.06860724378906],[7,8,75.20077434699999],[7,9,76.71170083616016],[7,10,78.53284218750001],[7,11,80.57298942873437],[7,12,82.72356045],[7,13,84.86547870807422],[7,14,86.877639323875],[7,15,88.64696257324218],[7,16,90.080034771],[7,17,91.11633654830075],[7,18,91.74305852324999],[7,19,92.01150436481247],[7,20,92.05508124999999],[8,0,77.30239999999999],[8,1,75.739096288],[8,2,74.318210048],[8,3,73.17437552],[8,4,72.42448998399999],[8,5,72.1595],[8,6,72.43833036800001],[8,7,73.283955808],[8,8,74.68161536],[8,9,76.579169504],[8,10,78.8896],[8,11,81.495652448],[8,12,84.256621568],[8,13,87.0172792],[8,14,89.618945024],[8,15,91.9127],[8,16,93.774742528],[8,17,95.12388732799997],[8,18,95.94120704],[8,19,96.29181654399996],[8,20,96.3488],[9,0,76.690709375],[9,1,74.68461634627343],[9,2,72.84836233175],[9,3,71.34554847203516],[9,4,70.32070372999999],[9,5,69.88829931640626],[9,6,70.124509509125],[9,7,71.06171886594922],[9,8,72.685775831],[9,9,74.93599273472657],[9,10,77.70789218750001],[9,11,80.85869986680079],[9,12,84.21558369799999],[9,13,87.58663942873439],[9,14,90.774622596875],[9,15,93.59342689208985],[9,16,95.88730891100002],[9,17,97.55285930592964],[9,18,98.56372032724998],[9,19,98.99804975931636],[9,20,99.06873125],[10,0,75],[10,1,72.5318484375],[10,2,70.25680000000001],[10,3,68.36488593749999],[10,4,67.0272],[10,5,66.3818359375],[10,6,66.5232],[10,7,67.4946984375],[10,8,69.2848],[10,9,71.8264734375],[10,10,75],[10,11,78.63916093750001],[10,12,82.5408],[10,13,86.47776093750001],[10,14,90.2152],[10,15,93.5302734375],[10,16,96.2352],[10,17,98.20369843749995],[10,18,99.40079999999998],[10,19,99.91603593749994],[10,20,100],[11,0,72.378021875],[11,1,69.44673325310546],[11,2,66.72599725775],[11,3,64.42817184539844],[11,4,62.748488433999995],[11,5,61.847702941894525],[11,6,61.838750433125],[11,7,62.77740336915625],[11,8,64.656933467],[11,9,67.40677716374609],[11,10,70.89520468749998],[11,11,74.93599273472657],[11,12,79.299100754],[11,13,83.72535083616017],[11,14,87.94511121087498],[11,15,91.70098334960937],[11,16,94.774492675],[11,17,97.01678287663667],[11,18,98.38331383324999],[11,19,98.9725631413046],[11,20,99.06873125],[12,0,69.04639999999999],[12,1,65.669172041],[12,2,62.51293567999999],[12,3,59.807031077],[12,4,57.767232512],[12,5,56.57501562499999],[12,6,56.361431935999995],[12,7,57.195590644999996],[12,8,59.077747712],[12,9,61.937002217],[12,10,65.6336],[12,11,69.965844581],[12,12,74.68161536],[12,13,79.49449309700002],[12,14,84.10449267199999],[12,15,88.223403125],[12,16,91.60473497600002],[12,17,94.07827482499994],[12,18,95.58924723199998],[12,19,96.24208387699991],[12,20,96.3488],[13,0,65.28600937499999],[13,1,61.497287028703106],[13,2,57.932315881749986],[13,3,54.83122884943358],[13,4,52.425841313999975],[13,5,50.91555895996092],[13,6,50.44844821612499],[13,7,51.10746930434764],[13,8,52.901871894999985],[13,9,55.763753369156234],[13,10,59.549779687499985],[13,11,64.0480688659492],[13,12,68.99023705799999],[13,13,74.06860724378906],[13,14,78.95858052587498],[13,15,83.34617003173828],[13,16,86.96069742300001],[13,17,89.6126520113593],[13,18,91.23671248124997],[13,19,91.93993121921474],[13,20,92.05508124999999],[14,0,61.415600000000005],[14,1,57.264924029125005],[14,2,53.33296140800001],[14,3,49.86404046912501],[14,4,47.100920320000014],[14,5,45.257486328125005],[14,6,44.497094816000015],[14,7,44.91656696612501],[14,8,46.535831936000015],[14,9,49.29321918312502],[14,10,53.04640000000001],[14,11,57.578978259125016],[14,12,62.612730368000015],[14,13,67.82549443412502],[14,14,72.87470864000001],[14,15,77.42659882812501],[14,16,81.19101529600002],[14,17,83.96191880112494],[14,18,85.66351577599998],[14,19,86.40204275312492],[14,20,86.52320000000002],[15,0,57.763671875],[15,1,53.312397229003906],[15,2,49.06741484375],[15,3,45.27069145507813],[15,4,42.17058125],[15,5,39.99156951904297],[15,6,38.910067578125],[15,7,39.03625895996093],[15,8,40.401996875],[15,9,42.95475294189453],[15,10,46.5576171875],[15,11,50.995349316406255],[15,12,55.98648125000001],[15,13,61.20147093505861],[15,14,66.286907421875],[15,15,70.89576721191406],[15,16,74.72372187500001],[15,17,77.55149693603508],[15,18,79.29328203124997],[15,19,80.05119233398428],[15,20,80.17578125],[16,0,54.633599999999994],[16,1,49.950476159999994],[16,2,45.45472614399999],[16,3,41.37986803199999],[16,4,37.974610943999984],[16,5,35.469999999999985],[16,6,34.052920319999984],[16,7,33.84596006399998],[16,8,34.89363251199998],[16,9,37.15495718399999],[16,10,40.50239999999998],[16,11,44.727172479999986],[16,12,49.550889983999994],[16,13,54.643588992000005],[16,14,59.64810342399998],[16,15,64.21079999999999],[16,16,68.01867264],[16,17,70.84279590399991],[16,18,72.58813747199996],[16,19,73.34972966399988],[16,20,73.47519999999999],[17,0,52.26200937500006],[17,1,47.417614852445375],[17,2,42.73643318375007],[17,3,38.43829799326961],[17,4,34.767499282000074],[17,5,31.957741455078203],[17,6,30.20367171912508],[17,7,29.638978849433673],[17,8,30.32106232700008],[17,9,32.222271845398524],[17,10,35.227717187500076],[17,11,39.13964847203523],[17,12,43.68840677000008],[17,13,48.549945090906334],[17,14,53.36991973887506],[17,15,57.79435203857428],[17,16,61.506860431000064],[17,17,64.27246293910154],[17,18,65.98795000325003],[17,19,66.73882768655074],[17,20,66.86283125000006],[18,0,50.770400000000016],[18,1,45.83042317175002],[18,2,41.02573452800002],[18,3,36.55840193375003],[18,4,32.66432614400002],[18,5,29.57643359375003],[18,6,27.494561408000028],[18,7,26.56203463175002],[18,8,26.84893568000003],[18,9,28.342066007750034],[18,10,30.941600000000026],[18,11,34.46443108175002],[18,12,38.654210048000024],[18,13,43.198075613750035],[18,14,47.75007718400001],[18,15,51.961289843750016],[18,16,55.51662156800003],[18,17,58.178312651749955],[18,18,59.83612735999999],[18,19,60.56423779774992],[18,20,60.68480000000002],[19,0,50.110021875000086],[19,1,45.127380337464935],[19,2,40.24985442175009],[19,3,35.65901485244542],[19,4,31.5795074100001],[19,5,28.24084722900401],[19,6,25.84595527912511],[19,7,24.546437028703227],[19,8,24.424603291000114],[19,9,25.482233253105584],[19,10,27.636079687500104],[19,11,30.720116346273546],[19,12,34.494527538000106],[19,13,38.661439887269644],[19,14,42.88739627687509],[19,15,46.832571972656346],[19,16,50.1867329310001],[19,17,52.71193628899612],[19,18,54.29197303725006],[19,19,54.98855287535156],[19,20,55.10423125000008],[20,0,50],[20,1,45.005790624999996],[20,2,40.0856],[20,3,35.399178125],[20,4,31.158399999999997],[20,5,27.587890625],[20,6,24.892400000000002],[20,7,23.230928125],[20,8,22.6976],[20,9,23.309290625000003],[20,10,25],[20,11,27.621978125000002],[20,12,30.9536],[20,13,34.713990625000015],[20,14,38.58439999999999],[20,15,42.236328125],[20,16,45.36640000000001],[20,17,47.73799062499994],[20,18,49.22959999999998],[20,19,49.889978124999914],[20,20,50]],"emphasis":{"itemStyle":{"borderColor":"#333","borderWidth":1}},"progressive":1000,"animation":false}]};
</ExampleBaseOption>

## type(string) = continuous

类型为连续型。



## id(string)

组件 ID。默认不指定。指定则可用于在 option 或者 API 中引用组件。



## min(number)

<ExampleUIControlNumber />

指定 visualMapContinuous 组件的允许的最小值。`'min'` 必须用户指定。`[visualMap.min, visualMax.max]` 形成了视觉映射的『定义域』。

## max(number)

<ExampleUIControlNumber />

指定 visualMapContinuous 组件的允许的最大值。`'max'` 必须用户指定。`[visualMap.min, visualMax.max]` 形成了视觉映射的『定义域』。

## range(Array)

<ExampleUIControVector dims="min,max" />

指定手柄对应数值的位置。`range` 应在 `min` `max` 范围内。例如：

```javascript
chart.setOption({
    visualMap: {
        min: 0,
        max: 100,
        // 两个手柄对应的数值是 4 和 15
        range: [4, 15],
        ...
    }
});
```

**setOption 改变 min、max 时 range 的自适应**

+ 如果 `range` 不设置（或设置为 null）

```javascript
例如：
chart.setOption({visualMap: {min: 10, max: 300}}); // 不设置 range，则 range 默认为 [min, max]，即 [10, 300]。

chart.setOption({visualMap: {min: 0, max: 400}}); // 再次使用 setOption 改变 min、max。
// 此时 range 也自然会更新成改变过后的 [min, max]，即 [0, 400]。
```

+ 如果 `range` 被以具体值设置了（例如设置为 [10, 300]）

```javascript
例如：
chart.setOption({visualMap: {min: 10, max: 300, range: [20, 80]}}); // 设置了 range

chart.setOption({visualMap: {min: 0, max: 400}}); // 再次使用 setOption 改变 min、max。
// 此时 range 不会改变而仍维持本来的数值，仍为 [20, 80]。

chart.setOption({visualMap: {range: null}}); // 再把 range 设为 null。
// 则 range 恢复为 [min, max]，即 [0, 400]，同时也恢复了自动随 min max 而改变的能力。

```

`getOption` 得到的 `range` 总是 `Array`，不会为 `null` 或 `undefined`。

## calculable(boolean) = false

<ExampleUIControlBoolean />

是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。

（注：为兼容 ECharts2，当 [visualMap.type](~visualMap.type) 未指定时，假如设置了 `'calculable'`，则`type`自动被设置为`'continuous'`，无视 [visualMap-piecewise.splitNumber](~visualMap-piecewise.splitNumber) 等设置。所以，建议使用者不要不指定 [visualMap.type](~visualMap.type)，否则表意不清晰。）

## realtime(boolean) = true

<ExampleUIControlBoolean default="true" />

拖拽时，是否实时更新。

+ 如果为`ture`则拖拽手柄过程中实时更新图表视图。

+ 如果为`false`则拖拽结束时，才更新视图。

## inverse(boolean) = false

<ExampleUIControlBoolean />

是否反转 visualMap 组件。

当`inverse`为`false`时，数据大小的位置规则，和直角坐标系相同，即：

+ 当 [visualMap.orient](~visualMap.orient) 为`'vertical'`时，数据上大下小。
+ 当 [visualMap.orient](~visualMap.orient) 为`'horizontal'`时，数据右大左小。

当`inverse`为`true`时，相反。

## precision(number) = 0

<ExampleUIControlNumber min="0" step="1" />

数据展示的小数精度，默认为0，无小数点。

## itemWidth(number) = 20

<ExampleUIControlNumber default="20" min="0" />

图形的宽度，即长条的宽度。

## itemHeight(number) = 140

<ExampleUIControlNumber default="140" min="0" />

图形的高度，即长条的高度。

## align(string) = 'auto'

<ExampleUIControlEnum options="auto,left,right,top,bottom" />

指定组件中手柄和文字的摆放位置，可选值为：

+ `'auto'` 自动决定。
+ `'left'` 手柄和label在右，orient 为 horizontal 时有效。
+ `'right'` 手柄和label在左，orient 为 horizontal 时有效。
+ `'top'` 手柄和label在下，orient 为 vertical 时有效。
+ `'bottom'` 手柄和label在上，orient 为 vertical 时有效。

## text(Array) = null

两端的文本，如 `['High', 'Low']`。[参见例子](doc-example/map-visualMap-continuous-text&edit=1&reset=1)。

`text` 中的顺序，其实试试就知道。若要看详细的规则，参见 [visualMap.inverse](~visualMap.inverse)。

## textGap(number) = 10

<ExampleUIControlNumber default="10" step="0.5" />

两端文字主体之间的距离，单位为px。参见 [visualMap-continuous.text](~visualMap-continuous.text)



## show(boolean) = true

是否显示 visualMap-continuous 组件。如果设置为 `false`，不会显示，但是数据映射的功能还存在。

## dimension(number)

指定用数据的『哪个维度』，映射到视觉元素上。『数据』即 [series.data](~series.data)。
可以把 [series.data](~series.data) 理解成一个二维数组，例如：

```javascript
[
    [12, 23, 43],
    [12, 23, 43],
    [43, 545, 65],
    [92, 23, 33]
]
```

其中每个列是一个维度，即 `dimension`。
例如 `dimension` 为 1 时，取第二列（即 23，23，545，23），映射到视觉元素上。

默认取 `data` 中最后一个维度。

## seriesIndex(number|Array)

指定取哪个系列的数据，即哪个系列的 [series.data](~series.data)。

默认取所有系列。

## hoverLink(boolean) = true

打开 `hoverLink` 功能时，鼠标悬浮到 `visualMap` 组件上时，鼠标位置对应的数值 在 图表中对应的图形元素，会高亮。

反之，鼠标悬浮到图表中的图形元素上时，在 `visualMap` 组件的相应位置会有三角提示其所对应的数值。

## inRange(Object)

定义 **在选中范围中** 的视觉元素。（用户可以和 visualMap 组件交互，用鼠标或触摸选择范围）

可选的视觉元素有：



+ `symbol`: 图元的图形类别。
+ `symbolSize`: 图元的大小。
+ `color`: 图元的颜色。
+ `colorAlpha`: 图元的颜色的透明度。
+ `opacity`: 图元以及其附属物（如文字标签）的透明度。
+ `colorLightness`: 颜色的明暗度，参见 [HSL](https://en.wikipedia.org/wiki/HSL_and_HSV)。
+ `colorSaturation`: 颜色的饱和度，参见 [HSL](https://en.wikipedia.org/wiki/HSL_and_HSV)。
+ `colorHue`: 颜色的色调，参见 [HSL](https://en.wikipedia.org/wiki/HSL_and_HSV)。





`inRange` 能定义目标系列（参见 [visualMap-continuous.seriesIndex](~visualMap-continuous.seriesIndex)）视觉形式，也同时定义了 `visualMap-continuous` 本身的视觉样式。通俗来讲就是，假如 `visualMap-continuous`控制的是散点图，那么 `inRange` 同时定义了散点图的 `颜色`、`尺寸` 等，也定义了 `visualMap-continuous` 本身的 `颜色`、`尺寸` 等。这二者能对应上。

定义方式，例如：

```javascript
visualMap: [
    {
        ...,
        inRange: {
            color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
            symbolSize: [30, 100]
        }
    }
]
```

如果想分别定义 `visualMap-continuous` 本身的视觉样式和 `目标系列` 的视觉样式，则这样定义：

```javascript
visualMap: [
    {
        ...,
        // 表示 目标系列 的视觉样式。
        target: {
            inRange: {
                color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
                symbolSize: [60, 200]
            }
        },
        // 表示 visualMap-continuous 本身的视觉样式。
        controller: {
            inRange: {
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
        // 表示 目标系列 的视觉样式 和 visualMap-continuous 共有的视觉样式。
        inRange: {
            color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
            symbolSize: [60, 200]
        },
        // 表示 visualMap-continuous 本身的视觉样式，会覆盖共有的视觉样式。比如，symbolSize 覆盖成为 [30, 100]，而 color 不变。
        controller: {
            inRange: {
                symbolSize: [30, 100]
            }
        }
    }
]
```

**✦ 关于视觉通道 ✦**

+ inRange 中，可以有任意几个的『视觉通道』定义（如 `color`、`symbolSize` 等）。这些视觉通道，会被同时采用。

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



ECharts 提供的标记类型包括



`'circle'`, `'rect'`, `'roundRect'`, `'triangle'`, `'diamond'`, `'pin'`, `'arrow'`, `'none'`







可以通过 `'image://url'` 设置为图片，其中 URL 为图片的链接，或者 `dataURI`。

URL 为图片链接例如：
```
'image://http://xxx.xxx.xxx/a/b.png'
```

URL 为 `dataURI` 例如：
```
'image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7'
```



可以通过 `'path://'` 将图标设置为任意的矢量路径。这种方式相比于使用图片的方式，不用担心因为缩放而产生锯齿或模糊，而且可以设置为任意颜色。路径图形会自适应调整为合适的大小。路径的格式参见 [SVG PathData](http://www.w3.org/TR/SVG/paths.html#PathData)。可以从 Adobe Illustrator 等工具编辑导出。

例如：
```
'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z'
```











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
    inRange: {
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

[参见示例](doc-example/scatter-visualMap-categories&edit=1&reset=1)







**✦ 修改视觉编码 ✦**

如果在图表被渲染后（即已经使用 `setOption` 设置了初始 `option` 之后），想修改 visualMap 的各种 `视觉编码`，按照惯例，再次使用 `setOption` 即可。例如：

```javascript
chart.setOption({
    visualMap: {
        inRange: {color: ['red', 'blue']}
    }
});
```

但请注意：

+ visualMap option 中的这几个属性，`inRange`, `outOfRange`, `target`, `controller`，在 setOption 时不支持 merge。否则会带来过于复杂的 merge 逻辑。也就是说，`setOption` 时，一旦修改了以上几个属性中的一项，其他项也会被清空，而非保留当前状态。所以，设置 visual 值时，请一次性全部设置，而非只设置一部分。

+ **不推荐使用 `getOption -> 修改option -> setOption` 的方式：**

```javascript
// 不推荐这样做（尽管也能达到和上面的例子相同的结果）：
var option = chart.getOption(); // 获取所有option。
option.visualMap.inRange.color = ['red', 'blue']; // 改动color（我想要改变 color）。

// 如下两处也要进行同步改动，否则可能达不到期望效果。
option.visualMap.target.inRange.color = ['red', 'blue'];
option.visualMap.controller.inRange.color = ['red', 'blue'];

chart.setOption(option); // option设置回 visualMap
```





**注意**，inRange 没有指定，则会默认会设置 color: `['#f6efa6', '#d88273', '#bf444c']`，如果你不想要这个color，可以
`inRange: {color: null}` 来去除。

## outOfRange(Object)

定义 **在选中范围外** 的视觉元素。（用户可以和 visualMap 组件交互，用鼠标或触摸选择范围）

配置参考 [visualMap-continuous.inRange](~visualMap-continuous.inRange)

## controller(Object)

visualMap 组件中，`控制器` 的 `inRange` `outOfRange` 设置。如果没有这个 `controller` 设置，`控制器` 会使用外层的 `inRange` `outOfRange` 设置；如果有这个 `controller` 设置，则会采用这个设置。适用于一些控制器视觉效果需要特殊定制或调整的场景。

### inRange(Object)

定义 **在选中范围中** 的视觉元素。（用户可以和 visualMap 组件交互，用鼠标或触摸选择范围）

配置参考 [visualMap-continuous.inRange](~visualMap-continuous.inRange)

### outOfRange(Object)

定义 **在选中范围外** 的视觉元素。（用户可以和 visualMap 组件交互，用鼠标或触摸选择范围）

配置参考 [visualMap-continuous.inRange](~visualMap-continuous.inRange)






## zlevel(number) = 0

所有图形的 zlevel 值。

`zlevel`用于 Canvas 分层，不同`zlevel`值的图形会放置在不同的 Canvas 中，Canvas 分层是一种常见的优化手段。我们可以把一些图形变化频繁（例如有动画）的组件设置成一个单独的`zlevel`。需要注意的是过多的 Canvas 会引起内存开销的增大，在手机端上需要谨慎使用以防崩溃。

`zlevel` 大的 Canvas 会放在 `zlevel` 小的 Canvas 的上面。

## z(number) = 4

组件的所有图形的`z`值。控制图形的前后顺序。`z`值小的图形会被`z`值大的图形覆盖。

`z`相比`zlevel`优先级更低，而且不会创建新的 Canvas。




## left(string|number) = 0

<ExampleUIControlPercent default="0%"/>

visualMap 组件离容器左侧的距离。

`left` 的值可以是像 `20` 这样的具体像素值，可以是像 `'20%'` 这样相对于容器高宽的百分比，也可以是 `'left'`, `'center'`, `'right'`。

如果 `left` 的值为`'left'`, `'center'`, `'right'`，组件会根据相应的位置自动对齐。

## top(string|number) = auto

<ExampleUIControlPercent default="0%"/>

visualMap 组件离容器上侧的距离。

`top` 的值可以是像 `20` 这样的具体像素值，可以是像 `'20%'` 这样相对于容器高宽的百分比，也可以是 `'top'`, `'middle'`, `'bottom'`。

如果 `top` 的值为`'top'`, `'middle'`, `'bottom'`，组件会根据相应的位置自动对齐。

## right(string|number) = auto

<ExampleUIControlPercent default="0%"/>

visualMap 组件离容器右侧的距离。

`right` 的值可以是像 `20` 这样的具体像素值，可以是像 `'20%'` 这样相对于容器高宽的百分比。



## bottom(string|number) = 0

<ExampleUIControlPercent default="0%"/>

visualMap 组件离容器下侧的距离。

bottom 的值可以是像 `20` 这样的具体像素值，可以是像 `'20%'` 这样相对于容器高宽的百分比。





## orient(string) = 'vertical'

如何放置 visualMap 组件，水平（`'horizontal'`）或者竖直（`'vertical'`）。

## padding(number|Array) = 5



<ExampleUIControlVector min="0" dims="T,R,B,L"  />

visualMap-continuous内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。

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



## backgroundColor(Color) = 'rgba(0,0,0,0)'

背景色。

## borderColor(Color) = '#ccc'

边框颜色。

## borderWidth(number) = 0

边框线宽，单位px。

## color(Array) = ['#bf444c', '#d88273', '#f6efa6']

这个配置项，是为了兼容 ECharts2 而存在，ECharts3 中已经不推荐使用。它的功能已经移到了 [visualMap-continuous.inRange](~visualMap-continuous.inRange) 和 [visualMap-continuous.outOfRange](~visualMap-continuous.outOfRange) 中。

如果要使用，则须注意，`color`属性中的顺序是由数值 `大` 到 `小`，但是 [visualMap-continuous.inRange](~visualMap-continuous.inRange) 或 [visualMap-continuous.outOfRange](~visualMap-continuous.outOfRange) 中 `color` 的顺序，总是由数值 `小` 到 `大`。二者不一致。

## textStyle(Object)







### color(Color) = #333

<ExampleUIControlColor default="#333" />

visualMap 文字的颜色。



### fontStyle(string) = 'normal'

<ExampleUIControlEnum default="normal" options="normal,italic,oblique" />

visualMap 文字字体的风格。

可选：
+ `'normal'`
+ `'italic'`
+ `'oblique'`

### fontWeight(string|number) = normal

<ExampleUIControlEnum default="normal" options="normal,bold,bolder,lighter" />

visualMap 文字字体的粗细。

可选：
+ `'normal'`
+ `'bold'`
+ `'bolder'`
+ `'lighter'`
+ 100 | 200 | 300 | 400...

### fontFamily(string) = 'sans-serif'

<ExampleUIControlEnum default="sans-serif" options="sans-serif,serif,monospace,Arial,Courier New" />

visualMap 文字的字体系列。

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

### fontSize(number) = 12

<ExampleUIControlNumber default="12" min="1" step="1" />

visualMap 文字的字体大小。





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



### textBorderWidth(number)

<ExampleUIControlNumber min="0" step="0.5" />

文字本身的描边宽度。




### textBorderType(string|number|Array) = 'solid'


<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


文字本身的描边类型。


可选：
+ `'solid'`
+ `'dashed'`
+ `'dotted'`

自 `v5.0.0` 开始，也可以是 `number` 或者 `number` 数组，用以指定线条的 [dash array](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-dasharray)，配合 
`textBorderDashOffset`
 可实现更灵活的虚线效果。

例如：
```js
{

textBorderType: [5, 10],

textBorderDashOffset: 5
}
```


### textBorderDashOffset(number) = 0




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`textBorderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。









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













## formatter(string|Function)

标签的格式化工具。

+ 如果为`string`，表示模板，例如：`aaaa{value}`。其中 `{value}` 是当前的范围边界值。
+ 如果为 `Function`，表示回调函数，形如：

```javascript
formatter: function (value) {
    return 'aaaa' + value; // 范围标签显示内容。
}
```

## handleIcon(string)



> 从 `v5.0.0` 开始支持



<ExampleUIControlIcon />

两端手柄的形状。默认为
```js
'M-11.39,9.77h0a3.5,3.5,0,0,1-3.5,3.5h-22a3.5,3.5,0,0,1-3.5-3.5h0a3.5,3.5,0,0,1,3.5-3.5h22A3.5,3.5,0,0,1-11.39,9.77Z'
```



可以通过 `'image://url'` 设置为图片，其中 URL 为图片的链接，或者 `dataURI`。

URL 为图片链接例如：
```
'image://http://xxx.xxx.xxx/a/b.png'
```

URL 为 `dataURI` 例如：
```
'image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7'
```



可以通过 `'path://'` 将图标设置为任意的矢量路径。这种方式相比于使用图片的方式，不用担心因为缩放而产生锯齿或模糊，而且可以设置为任意颜色。路径图形会自适应调整为合适的大小。路径的格式参见 [SVG PathData](http://www.w3.org/TR/SVG/paths.html#PathData)。可以从 Adobe Illustrator 等工具编辑导出。

例如：
```
'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z'
```







## handleSize(number|string) = '120%'



> 从 `v5.0.0` 开始支持



手柄的大小。可以是相对于组件尺寸的百分比大小。

## handleStyle(Object)



> 从 `v5.0.0` 开始支持



手柄的样式配置。



### color(Color) = 自适应

<ExampleUIControlColor />

图形的颜色。



> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)



### borderColor(Color) = #fff

<ExampleUIControlColor />

图形的描边颜色。支持的颜色格式同 `color`，不支持回调函数。

### borderWidth(number) = 1

<ExampleUIControlNumber value="1" min="0" step="0.5" />

(${name} ? ${name} : "") + "描边线宽。为 0 时无描边。"




### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


描边类型。



可选：
+ `'solid'`
+ `'dashed'`
+ `'dotted'`

自 `v5.0.0` 开始，也可以是 `number` 或者 `number` 数组，用以指定线条的 [dash array](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-dasharray)，配合 
`borderDashOffset`
 可实现更灵活的虚线效果。

例如：
```js
{

borderType: [5, 10],

borderDashOffset: 5
}
```


### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



### borderCap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




### borderJoin(string) = bevel




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="bevel" options="bevel,round,miter" />

用于设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）。

可以是：
+ `'bevel'`: 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
+ `'round'`: 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
+ `'miter'`: 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。这个设置可以通过 
`borderMiterLimit`
 属性看到效果。

默认值为 `'bevel'`。 更多详情可以参考 MDN [lineJoin](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineJoin)。




### borderMiterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`borderJoin`
 为 `miter` 时，
`borderMiterLimit`
 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。








### shadowBlur(number) = 

<ExampleUIControlNumber default="" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```



### shadowColor(Color) = 

<ExampleUIControlColor default="" />

阴影颜色。支持的格式同`color`。



### shadowOffsetX(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影水平方向上的偏移距离。



### shadowOffsetY(number) = 0

<ExampleUIControlNumber default="0" step="0.5" />

阴影垂直方向上的偏移距离。









### opacity(number) = 1

<ExampleUIControlNumber default="1" min="0" max="1" step="0.01" />

图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。











## indicatorIcon(string) = 'circle'

指示器的形状，默认为圆形。指示器在鼠标移到组件上，或者在移到系列图形上联动高亮的时候出现。



> 从 `v5.0.0` 开始支持



<ExampleUIControlIcon />

## indicatorSize(number|string) = '50%'



> 从 `v5.0.0` 开始支持



指示器的大小。可以是相对于组件尺寸的百分比大小。

## indicatorStyle(Object)

指示器样式。



### color(Color) = 自适应

<ExampleUIControlColor />

图形的颜色。



> 支持使用`rgb(255,255,255)`，`rgba(255,255,255,1)`，`#fff`等方式设置为纯色，也支持设置为渐变色和纹理填充，具体见[option.color](~color)



### borderColor(Color) = #fff

<ExampleUIControlColor />

图形的描边颜色。支持的颜色格式同 `color`，不支持回调函数。

### borderWidth(number) = 2

<ExampleUIControlNumber value="2" min="0" step="0.5" />

(${name} ? ${name} : "") + "描边线宽。为 0 时无描边。"




### borderType(string|number|Array) = 'solid'



<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />


描边类型。



可选：
+ `'solid'`
+ `'dashed'`
+ `'dotted'`

自 `v5.0.0` 开始，也可以是 `number` 或者 `number` 数组，用以指定线条的 [dash array](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-dasharray)，配合 
`borderDashOffset`
 可实现更灵活的虚线效果。

例如：
```js
{

borderType: [5, 10],

borderDashOffset: 5
}
```


### borderDashOffset(number) = 0





> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="0" />

用于设置虚线的偏移量，可搭配 
`borderType`
 指定 dash array 实现灵活的虚线效果。

更多详情可以参考 MDN [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)。



### borderCap(string) = butt




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="butt" options="butt,round,square" />

用于指定线段末端的绘制方式，可以是：
+ `'butt'`: 线段末端以方形结束。
+ `'round'`: 线段末端以圆形结束。
+ `'square'`: 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

默认值为 `'butt'`。 更多详情可以参考 MDN [lineCap](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)。




### borderJoin(string) = bevel




> 从 `v5.0.0` 开始支持



<ExampleUIControlEnum default="bevel" options="bevel,round,miter" />

用于设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）。

可以是：
+ `'bevel'`: 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
+ `'round'`: 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
+ `'miter'`: 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。这个设置可以通过 
`borderMiterLimit`
 属性看到效果。

默认值为 `'bevel'`。 更多详情可以参考 MDN [lineJoin](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineJoin)。




### borderMiterLimit(number) = 10




> 从 `v5.0.0` 开始支持



<ExampleUIControlNumber min="0" step="1" default="10" />

用于设置斜接面限制比例。只有当 
`borderJoin`
 为 `miter` 时，
`borderMiterLimit`
 才有效。

默认值为 `10`。负数、`0`、`Infinity` 和 `NaN` 均会被忽略。

更多详情可以参考 MDN [miterLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)。








### shadowBlur(number) = 2

<ExampleUIControlNumber default="2" min="0" step="0.5" />

图形阴影的模糊大小。该属性配合 `shadowColor`,`shadowOffsetX`, `shadowOffsetY` 一起设置图形的阴影效果。

示例：
```js
{
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10
}
```



### shadowColor(Color) = rgba(0,0,0,0.2)

<ExampleUIControlColor default="rgba(0,0,0,0.2)" />

阴影颜色。支持的格式同`color`。



### shadowOffsetX(number) = 1

<ExampleUIControlNumber default="1" step="0.5" />

阴影水平方向上的偏移距离。



### shadowOffsetY(number) = 1

<ExampleUIControlNumber default="1" step="0.5" />

阴影垂直方向上的偏移距离。









### opacity(number) = 1

<ExampleUIControlNumber default="1" min="0" max="1" step="0.01" />

图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
