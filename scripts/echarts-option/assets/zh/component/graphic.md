# graphic(*)

`graphic` 是原生图形元素组件。可以支持的图形元素包括：



[image](~graphic.elements-image),
[text](~graphic.elements-text),
[circle](~graphic.elements-circle),
[sector](~graphic.elements-sector),
[ring](~graphic.elements-ring),
[polygon](~graphic.elements-polygon),
[polyline](~graphic.elements-polyline),
[rect](~graphic.elements-rect),
[line](~graphic.elements-line),
[bezierCurve](~graphic.elements-bezierCurve),
[arc](~graphic.elements-arc),
[group](~graphic.elements-group),





下面示例中，使用图形元素做了水印，和文本块：
~[600x400](https://echarts.apache.org/examples/zh/view.html?c=line-graphic&edit=1&reset=1)

下面示例中，使用隐藏的图形元素实现了拖拽：
~[600x400](https://echarts.apache.org/examples/zh/view.html?c=line-draggable&edit=1&reset=1)



<br>

---

**graphic 设置介绍**

只配一个图形元素时的简写方法：
```javascript
myChart.setOption({
    ...,
    graphic: {
        type: 'image',
        ...
    }
});
```

配多个图形元素：
```javascript
myChart.setOption({
    ...,
    graphic: [
        { // 一个图形元素，类型是 image。
            type: 'image',
            ...
        },
        { // 一个图形元素，类型是 text，指定了 id。
            type: 'text',
            id: 'text1',
            ...
        },
        { // 一个图形元素，类型是 group，可以嵌套子节点。
            type: 'group',
            children: [
                {
                    type: 'rect',
                    id: 'rect1',
                    ...
                },
                {
                    type: 'image',
                    ...
                },
                ...
            ]
        }
        ...
    ]
});

```

使用 setOption 来删除或更换（替代）已有的图形元素：
```javascript
myChart.setOption({
    ...,
    graphic: [
        { // 删除上例中定义的 'text1' 元素。
            id: 'text1',
            $action: 'remove',
            ...
        },
        { // 将上例中定义的 'rect1' 元素换成 circle。
          // 注意尽管 'rect1' 在一个 group 中，但这里并不需要顾忌层级，用id指定就可以了。
            id: 'rect1',
            $action: 'replace',
            type: 'circle',
            ...
        }
    ]
});
```
注意，如果没有指定 id，第二次 setOption 时会按照元素在 option 中出现的顺序和已有的图形元素进行匹配。这有时会产生不易理解的效果。
所以，一般来说，更新 elements 时推荐使用 id 进行准确的指定，而非省略 id。



<br>

---



**图形元素设置介绍**

介绍每个图形元素的配置。不同类型的图形元素的设置有这些共性：

```javascript
{
    // id 用于在更新图形元素时指定更新哪个图形元素，如果不需要用可以忽略。
    id: 'xxx',

    // 这个字段在第一次设置时不能忽略，取值见上方『支持的图形元素』。
    type: 'image',

    // 下面的各个属性如果不需要设置都可以忽略，忽略则取默认值。

    // 指定本次 setOption 对此图形元素进行的操作。默认是 'merge'，还可以 'replace' 或 'remove'。
    $action: 'replace',

    // 这是四个相对于父元素的定位属性，每个属性可取『像素值』或者『百分比』或者 'center'/'middle'。
    left: 10,
    // right: 10,
    top: 'center',
    // bottom: '10%',

    shape: {
        // 定位、形状相关的设置，如 x, y, cx, cy, width, height, r, points 等。
        // 注意，如果设置了 left/right/top/bottom，这里的定位用的 x/y/cx/cy 会失效。
    },

    style: {
        // 样式相关的设置，如 fill, stroke, lineWidth, shadowBlur 等。
    },

    // 表示 z 高度，从而指定了图形元素的覆盖关系。
    z: 10,
    // 表示不响应事件。
    silent: true,
    // 表示节点不显示
    invisible: false,
    // 设置是否整体限制在父节点范围内。可选值：'raw', 'all'。
    bouding: 'raw',
    // 是否可以被拖拽。
    draggable: false,
    // 事件的监听器，还可以是 onmousemove, ondrag 等。支持的事件参见下。
    onclick: function () {...}
}
```


<br>

---

**图形元素的事件**

支持这些事件配置：
`onclick`, `onmouseover`, `onmouseout`, `onmousemove`, `onmousewheel`, `onmousedown`, `onmouseup`, `ondrag`, `ondragstart`, `ondragend`, `ondragenter`, `ondragleave`, `ondragover`, `ondrop`。



<br>

---

**图形元素的层级关系**

只有 `group` 元素可以有子节点，从而以该 `group` 元素为根的元素树可以共同定位（共同移动）。





<br>

---

**图形元素的基本形状设置**

每个图形元素本身有自己的图形基本的位置和尺寸设置，例如：

```javascript
{
    type: 'rect',
    shape: {
        x: 10,
        y: 10,
        width: 100,
        height: 200
    }
},
{
    type: 'circle',
    shape: {
        cx: 20,
        cy: 30,
        r: 100
    }
},
{
    type: 'image',
    style: {
        image: 'http://xxx.xxx.xxx/a.png',
        x: 100,
        y: 200,
        width: 230,
        height: 400
    }
},
{
    type: 'text',
    style: {
        text: 'This text',
        x: 100,
        y: 200
    }

}
```




<br>

---

**图形元素的定位和 transfrom**


除此以外，可以以 transform 的方式对图形进行平移、旋转、缩放，
参见：[position](~graphic.elements.position)、[rotation](~graphic.elements.rotation)、[scale](~graphic.elements.scale)、[origin](~graphic.elements.origin)。

```javascript
{
    type: 'rect',
    position: [100, 200], // 平移，默认值为 [0, 0]。
    scale: [2, 4], // 缩放，默认值为 [1, 1]。表示缩放的倍数。
    rotation: Math.PI / 4, // 旋转，默认值为 0。表示旋转的弧度值。正值表示逆时针旋转。
    origin: [10, 20], // 旋转和缩放的中心点，默认值为 [0, 0]。
    shape: {
        // ...
    }
}
```

+ 每个图形元素在父节点的坐标系中进行 transform，也就是说父子节点的 transform 能『叠加』。
+ 每个图形元素进行 transform 顺序是：
    1. 平移 [-el.origin[0], -el.origin[1]]。
    2. 根据 el.scale 缩放。
    3. 根据 el.rotation 旋转。
    4. 根据 el.origin 平移。
    5. 根据 el.position 平移。
+ 也就是说先缩放旋转后平移，这样平移不会影响缩放旋转的 origin。





<br>

---

**图形元素相对定位**



以上两者是基本的绝对定位，除此之外，在实际应用中，容器尺寸常常是不确定甚至动态变化的，所以需要提供相对定位的机制。graphic 组件使用 [left](~graphic.elements.left) / [right](~graphic.elements.right) / [top](~graphic.elements.top) / [bottom](~graphic.elements.bottom) / [width](~graphic.elements.width) / [height](~graphic.elements.height) 提供了相对定位的机制。

例如：
```javascript
{ // 将图片定位到最下方的中间：
    type: 'image',
    left: 'center', // 水平定位到中间
    bottom: '10%',  // 定位到距离下边界 10% 处
    style: {
        image: 'http://xxx.xxx.xxx/a.png',
        width: 45,
        height: 45
    }
},
{ // 将旋转过的 group 整体定位右下角：
    type: 'group',
    right: 0,  // 定位到右下角
    bottom: 0, // 定位到右下角
    rotation: Math.PI / 4,
    children: [
        {
            type: 'rect',
            left: 'center', // 相对父元素居中
            top: 'middle',  // 相对父元素居中
            shape: {
                width: 190,
                height: 90
            },
            style: {
                fill: '#fff',
                stroke: '#999',
                lineWidth: 2,
                shadowBlur: 8,
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowColor: 'rgba(0,0,0,0.3)'
            }
        },
        {
            type: 'text',
            left: 'center', // 相对父元素居中
            top: 'middle',  // 相对父元素居中
            style: {
                fill: '#777',
                text: [
                    'This is text',
                    '这是一段文字',
                    'Print some text'
                ].join('\n'),
                font: '14px Microsoft YaHei'
            }
        }
    ]
}
```

注意，可以用 [bounding](graphic.elements.bounding) 来设置是否整体限制在父节点范围内。



## id(string)

组件 ID。默认不指定。指定则可用于在 option 或者 API 中引用组件。



## elements(Array)

里面是所有图形元素的集合。

注意：graphic 的标准写法是：

```javascript
{
    graphic: {
        elements: [
            {type: 'rect', ...}, {type: 'circle', ...}, ...
        ]
    }
}
```

但是我们常常可以用简写：

```javascript
{
    graphic: {
        type: 'rect',
        ...
    }
}
```

或者：
```javascript
{
    graphic: [
        {type: 'rect', ...}, {type: 'circle', ...}, ...
    ]
}
```



## elements.group(Object)

group 是唯一的可以有子节点的容器。group 可以用来整体定位一组图形元素。



### type(string) = group

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~graphic.elements-image),
[text](~graphic.elements-text),
[circle](~graphic.elements-circle),
[sector](~graphic.elements-sector),
[ring](~graphic.elements-ring),
[polygon](~graphic.elements-polygon),
[polyline](~graphic.elements-polyline),
[rect](~graphic.elements-rect),
[line](~graphic.elements-line),
[bezierCurve](~graphic.elements-bezierCurve),
[arc](~graphic.elements-arc),
[group](~graphic.elements-group),





### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。


### $action(string) = 'merge'

setOption 时指定本次对该图形元素的操作行为。

可取值：
+ `'merge'`：如果已有元素，则新的配置项和已有的设定进行 merge。如果没有则新建。
+ `'replace'`：如果已有元素，删除之，新建元素替代之。
+ `'remove'`：删除元素。




### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-group.x) 和 [y](~graphic.elements-group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-group.scaleX) 和 [scaleY](~graphic.elements-group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-group.originX) 和 [originY](~graphic.elements-group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-group.x) 和 [y](~graphic.elements-group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-group.scaleX) 和 [scaleY](~graphic.elements-group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-group.originX) 和 [originY](~graphic.elements-group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-group.x) 和 [y](~graphic.elements-group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-group.scaleX) 和 [scaleY](~graphic.elements-group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-group.originX) 和 [originY](~graphic.elements-group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-group.x) 和 [y](~graphic.elements-group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-group.scaleX) 和 [scaleY](~graphic.elements-group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-group.originX) 和 [originY](~graphic.elements-group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-group.x) 和 [y](~graphic.elements-group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-group.scaleX) 和 [scaleY](~graphic.elements-group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-group.originX) 和 [originY](~graphic.elements-group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-group.x) 和 [y](~graphic.elements-group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-group.scaleX) 和 [scaleY](~graphic.elements-group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-group.originX) 和 [originY](~graphic.elements-group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-group.x) 和 [y](~graphic.elements-group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-group.scaleX) 和 [scaleY](~graphic.elements-group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-group.originX) 和 [originY](~graphic.elements-group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。














### left(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-group.left) 和 [right](~graphic.elements-group.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-group.left) 或 [right](~graphic.elements-group.right)，则 [shape](~graphic.elements-group.shape) 里的 `x`、`cx` 等定位属性不再生效。






### right(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-group.left) 和 [right](~graphic.elements-group.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-group.left) 或 [right](~graphic.elements-group.right)，则 [shape](~graphic.elements-group.shape) 里的 `x`、`cx` 等定位属性不再生效。






### top(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-group.top) 和 [bottom](~graphic.elements-group.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-group.top) 或 [bottom](~graphic.elements-group.bottom)，则 [shape](~graphic.elements-group.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bottom(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-group.top) 和 [bottom](~graphic.elements-group.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-group.top) 或 [bottom](~graphic.elements-group.bottom)，则 [shape](~graphic.elements-group.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bounding(string) = 'all'

决定此图形元素在定位时，对自身的包围盒计算方式。

参见例子：
~[500x500](doc-example/graphic-bounding&edit=1&reset=1)

可取值：

+ `'all'`：（默认）
    表示用自身以及子节点整体的经过 transform 后的包围盒进行定位。
    这种方式易于使整体都限制在父元素范围中。

+ `'raw'`：
    表示仅仅用自身（不包括子节点）的没经过 tranform 的包围盒进行定位。
    这种方式易于内容超出父元素范围的定位方式。

### z(number) = 0

z 方向的高度，决定层叠关系。

### zlevel(number) = 0

决定此元素绘制在哪个 canvas 层中。注意，越多 canvas 层会占用越多资源。




### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

### silent(boolean) = false

是否不响应鼠标以及触摸事件。

### invisible(boolean) = false

节点是否可见。

### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#graphic.elements-text)。


### textConfig(Object)

#### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

#### rotation(number)

`textContent` 的旋转弧度。

#### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

#### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

#### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

#### distance(number) = 5

距离 `layoutRect` 的距离。

#### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

#### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

#### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

#### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

#### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

#### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。






### cursor(string) = 'pointer'

<ExampleUIControlEnum options="auto,pointer,move" default="pointer" />

鼠标悬浮时在图形元素上时鼠标的样式是什么。同 CSS 的 `cursor`。



### draggable(boolean) = false

图形元素是否可以被拖拽。

### progressive(boolean) = false

是否渐进式渲染。当图形元素过多时才使用。






### width(number) = 0

用于描述此 `group` 的宽。

这个宽只用于给子节点定位。

即便当宽度为零的时候，子节点也可以使用 `left: 'center'` 相对于父节点水平居中。

### height(number) = 0

用于描述此 `group` 的高。

这个高只用于给子节点定位。

即便当高度为零的时候，子节点也可以使用 `top: 'middle'` 相对于父节点垂直居中。

### diffChildrenByName(boolean) = false

在 [自定义系列](~series-custom) 中，当 `diffChildrenByName: true` 时，对于 [renderItem](~series-custom.renderItem) 返回值中的每一个 [group](~graphic.elements-group)，会根据其 [children](~graphic.elements-group.children) 中每个图形元素的 [name](~graphic.elements-polygon.name) 属性进行 "diff"。在这里，"diff" 的意思是，重绘的时候，在已存在的图形元素和新的图形元素之间建立对应关系（依据 `name` 是否相同），从如果数据有更新，能够形成的过渡动画。

但是注意，这会有性能开销。如果数据量较大，不要开启这个功能。

### children(Array)

子节点列表，其中项都是一个图形元素定义。



### type(string) = group

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~graphic.elements-image),
[text](~graphic.elements-text),
[circle](~graphic.elements-circle),
[sector](~graphic.elements-sector),
[ring](~graphic.elements-ring),
[polygon](~graphic.elements-polygon),
[polyline](~graphic.elements-polyline),
[rect](~graphic.elements-rect),
[line](~graphic.elements-line),
[bezierCurve](~graphic.elements-bezierCurve),
[arc](~graphic.elements-arc),
[group](~graphic.elements-group),





### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。


### $action(string) = 'merge'

setOption 时指定本次对该图形元素的操作行为。

可取值：
+ `'merge'`：如果已有元素，则新的配置项和已有的设定进行 merge。如果没有则新建。
+ `'replace'`：如果已有元素，删除之，新建元素替代之。
+ `'remove'`：删除元素。




### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-group.x) 和 [y](~graphic.elements-group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-group.scaleX) 和 [scaleY](~graphic.elements-group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-group.originX) 和 [originY](~graphic.elements-group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-group.x) 和 [y](~graphic.elements-group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-group.scaleX) 和 [scaleY](~graphic.elements-group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-group.originX) 和 [originY](~graphic.elements-group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-group.x) 和 [y](~graphic.elements-group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-group.scaleX) 和 [scaleY](~graphic.elements-group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-group.originX) 和 [originY](~graphic.elements-group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-group.x) 和 [y](~graphic.elements-group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-group.scaleX) 和 [scaleY](~graphic.elements-group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-group.originX) 和 [originY](~graphic.elements-group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-group.x) 和 [y](~graphic.elements-group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-group.scaleX) 和 [scaleY](~graphic.elements-group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-group.originX) 和 [originY](~graphic.elements-group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-group.x) 和 [y](~graphic.elements-group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-group.scaleX) 和 [scaleY](~graphic.elements-group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-group.originX) 和 [originY](~graphic.elements-group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-group.x) 和 [y](~graphic.elements-group.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-group.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-group.scaleX) 和 [scaleY](~graphic.elements-group.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-group.originX) 和 [originY](~graphic.elements-group.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。














### left(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-group.left) 和 [right](~graphic.elements-group.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-group.left) 或 [right](~graphic.elements-group.right)，则 [shape](~graphic.elements-group.shape) 里的 `x`、`cx` 等定位属性不再生效。






### right(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-group.left) 和 [right](~graphic.elements-group.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-group.left) 或 [right](~graphic.elements-group.right)，则 [shape](~graphic.elements-group.shape) 里的 `x`、`cx` 等定位属性不再生效。






### top(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-group.top) 和 [bottom](~graphic.elements-group.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-group.top) 或 [bottom](~graphic.elements-group.bottom)，则 [shape](~graphic.elements-group.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bottom(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-group.top) 和 [bottom](~graphic.elements-group.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-group.top) 或 [bottom](~graphic.elements-group.bottom)，则 [shape](~graphic.elements-group.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bounding(string) = 'all'

决定此图形元素在定位时，对自身的包围盒计算方式。

参见例子：
~[500x500](doc-example/graphic-bounding&edit=1&reset=1)

可取值：

+ `'all'`：（默认）
    表示用自身以及子节点整体的经过 transform 后的包围盒进行定位。
    这种方式易于使整体都限制在父元素范围中。

+ `'raw'`：
    表示仅仅用自身（不包括子节点）的没经过 tranform 的包围盒进行定位。
    这种方式易于内容超出父元素范围的定位方式。

### z(number) = 0

z 方向的高度，决定层叠关系。

### zlevel(number) = 0

决定此元素绘制在哪个 canvas 层中。注意，越多 canvas 层会占用越多资源。




### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

### silent(boolean) = false

是否不响应鼠标以及触摸事件。

### invisible(boolean) = false

节点是否可见。

### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#graphic.elements-text)。


### textConfig(Object)

#### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

#### rotation(number)

`textContent` 的旋转弧度。

#### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

#### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

#### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

#### distance(number) = 5

距离 `layoutRect` 的距离。

#### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

#### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

#### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

#### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

#### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

#### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。






### cursor(string) = 'pointer'

<ExampleUIControlEnum options="auto,pointer,move" default="pointer" />

鼠标悬浮时在图形元素上时鼠标的样式是什么。同 CSS 的 `cursor`。



### draggable(boolean) = false

图形元素是否可以被拖拽。

### progressive(boolean) = false

是否渐进式渲染。当图形元素过多时才使用。









### onclick(Function)

### onmouseover(Function)

### onmouseout(Function)

### onmousemove(Function)

### onmousewheel(Function)

### onmousedown(Function)

### onmouseup(Function)

### ondrag(Function)

### ondragstart(Function)

### ondragend(Function)

### ondragenter(Function)

### ondragleave(Function)

### ondragover(Function)

### ondrop(Function)








## elements.image(Object)



### type(string) = image

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~graphic.elements-image),
[text](~graphic.elements-text),
[circle](~graphic.elements-circle),
[sector](~graphic.elements-sector),
[ring](~graphic.elements-ring),
[polygon](~graphic.elements-polygon),
[polyline](~graphic.elements-polyline),
[rect](~graphic.elements-rect),
[line](~graphic.elements-line),
[bezierCurve](~graphic.elements-bezierCurve),
[arc](~graphic.elements-arc),
[group](~graphic.elements-group),





### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。


### $action(string) = 'merge'

setOption 时指定本次对该图形元素的操作行为。

可取值：
+ `'merge'`：如果已有元素，则新的配置项和已有的设定进行 merge。如果没有则新建。
+ `'replace'`：如果已有元素，删除之，新建元素替代之。
+ `'remove'`：删除元素。




### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-image.x) 和 [y](~graphic.elements-image.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-image.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-image.scaleX) 和 [scaleY](~graphic.elements-image.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-image.originX) 和 [originY](~graphic.elements-image.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-image.x) 和 [y](~graphic.elements-image.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-image.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-image.scaleX) 和 [scaleY](~graphic.elements-image.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-image.originX) 和 [originY](~graphic.elements-image.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-image.x) 和 [y](~graphic.elements-image.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-image.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-image.scaleX) 和 [scaleY](~graphic.elements-image.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-image.originX) 和 [originY](~graphic.elements-image.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-image.x) 和 [y](~graphic.elements-image.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-image.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-image.scaleX) 和 [scaleY](~graphic.elements-image.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-image.originX) 和 [originY](~graphic.elements-image.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-image.x) 和 [y](~graphic.elements-image.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-image.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-image.scaleX) 和 [scaleY](~graphic.elements-image.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-image.originX) 和 [originY](~graphic.elements-image.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-image.x) 和 [y](~graphic.elements-image.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-image.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-image.scaleX) 和 [scaleY](~graphic.elements-image.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-image.originX) 和 [originY](~graphic.elements-image.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-image.x) 和 [y](~graphic.elements-image.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-image.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-image.scaleX) 和 [scaleY](~graphic.elements-image.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-image.originX) 和 [originY](~graphic.elements-image.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。














### left(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-image.left) 和 [right](~graphic.elements-image.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-image.left) 或 [right](~graphic.elements-image.right)，则 [shape](~graphic.elements-image.shape) 里的 `x`、`cx` 等定位属性不再生效。






### right(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-image.left) 和 [right](~graphic.elements-image.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-image.left) 或 [right](~graphic.elements-image.right)，则 [shape](~graphic.elements-image.shape) 里的 `x`、`cx` 等定位属性不再生效。






### top(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-image.top) 和 [bottom](~graphic.elements-image.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-image.top) 或 [bottom](~graphic.elements-image.bottom)，则 [shape](~graphic.elements-image.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bottom(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-image.top) 和 [bottom](~graphic.elements-image.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-image.top) 或 [bottom](~graphic.elements-image.bottom)，则 [shape](~graphic.elements-image.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bounding(string) = 'all'

决定此图形元素在定位时，对自身的包围盒计算方式。

参见例子：
~[500x500](doc-example/graphic-bounding&edit=1&reset=1)

可取值：

+ `'all'`：（默认）
    表示用自身以及子节点整体的经过 transform 后的包围盒进行定位。
    这种方式易于使整体都限制在父元素范围中。

+ `'raw'`：
    表示仅仅用自身（不包括子节点）的没经过 tranform 的包围盒进行定位。
    这种方式易于内容超出父元素范围的定位方式。

### z(number) = 0

z 方向的高度，决定层叠关系。

### zlevel(number) = 0

决定此元素绘制在哪个 canvas 层中。注意，越多 canvas 层会占用越多资源。




### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

### silent(boolean) = false

是否不响应鼠标以及触摸事件。

### invisible(boolean) = false

节点是否可见。

### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#graphic.elements-text)。


### textConfig(Object)

#### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

#### rotation(number)

`textContent` 的旋转弧度。

#### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

#### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

#### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

#### distance(number) = 5

距离 `layoutRect` 的距离。

#### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

#### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

#### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

#### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

#### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

#### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。






### cursor(string) = 'pointer'

<ExampleUIControlEnum options="auto,pointer,move" default="pointer" />

鼠标悬浮时在图形元素上时鼠标的样式是什么。同 CSS 的 `cursor`。



### draggable(boolean) = false

图形元素是否可以被拖拽。

### progressive(boolean) = false

是否渐进式渲染。当图形元素过多时才使用。






### style(Object)

#### image(string)

图片的内容，可以是图片的 URL，也可以是 [dataURI](https://tools.ietf.org/html/rfc2397).



#### x(number) = 0

图形元素的左上角在父节点坐标系（以父节点左上角为原点）中的横坐标值。

#### y(number) = 0

图形元素的左上角在父节点坐标系（以父节点左上角为原点）中的纵坐标值。







#### width(number) = 0

图形元素的宽度。

#### height(numbr) = 0

图形元素的高度。







注：关于图形元素中更多的样式设置（例如 [富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)），参见 [zrender/graphic/Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable) 中的 style 相关属性。

注意，这里图形元素的样式属性名称直接源于 zrender，和 `echarts label`、`echarts itemStyle` 等处同样含义的样式属性名称或有不同。例如，有如下对应：

+ [itemStyle.color](~series-scatter.label.color) => `style.fill`
+ [itemStyle.borderColor](~series-scatter.label.color) => `style.stroke`
+ [label.color](~series-scatter.label.color) => `style.textFill`
+ [label.textBorderColor](~series-scatter.label.textBorderColor) => `style.textStroke`
+ ...

#### fill(string) = '#000'

填充色。

#### stroke(string) = null

笔画颜色。

#### lineWidth(number) = 0

笔画宽度。

#### shadowBlur(number) = undefined

阴影宽度。

#### shadowOffsetX(number) = undefined

阴影 X 方向偏移。

#### shadowOffsetY(number) = undefined

阴影 Y 方向偏移。

#### shadowColor(number) = undefined

阴影颜色。















### focus(string) = 'none'



> 从 `v5.0.0` 开始支持



在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。支持如下配置：

+ `'none'` 不淡出其它图形，默认使用该配置。
+ `'self'` 只聚焦（不淡出）当前高亮的数据的图形。
+ `'series'` 聚焦当前高亮的数据所在的系列的所有图形。

### blurScope(string) = 'coordinateSystem'



> 从 `v5.0.0` 开始支持



在开启`focus`的时候，可以通过`blurScope`配置淡出的范围。支持如下配置

+ `'coordinateSystem'` 淡出范围为坐标系，默认使用该配置。
+ `'series'` 淡出范围为系列。
+ `'global'` 淡出范围为全局。
















### onclick(Function)

### onmouseover(Function)

### onmouseout(Function)

### onmousemove(Function)

### onmousewheel(Function)

### onmousedown(Function)

### onmouseup(Function)

### ondrag(Function)

### ondragstart(Function)

### ondragend(Function)

### ondragenter(Function)

### ondragleave(Function)

### ondragover(Function)

### ondrop(Function)






## elements.text(Object)

文本块。



### type(string) = text

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~graphic.elements-image),
[text](~graphic.elements-text),
[circle](~graphic.elements-circle),
[sector](~graphic.elements-sector),
[ring](~graphic.elements-ring),
[polygon](~graphic.elements-polygon),
[polyline](~graphic.elements-polyline),
[rect](~graphic.elements-rect),
[line](~graphic.elements-line),
[bezierCurve](~graphic.elements-bezierCurve),
[arc](~graphic.elements-arc),
[group](~graphic.elements-group),





### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。


### $action(string) = 'merge'

setOption 时指定本次对该图形元素的操作行为。

可取值：
+ `'merge'`：如果已有元素，则新的配置项和已有的设定进行 merge。如果没有则新建。
+ `'replace'`：如果已有元素，删除之，新建元素替代之。
+ `'remove'`：删除元素。




### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-text.x) 和 [y](~graphic.elements-text.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-text.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-text.scaleX) 和 [scaleY](~graphic.elements-text.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-text.originX) 和 [originY](~graphic.elements-text.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-text.x) 和 [y](~graphic.elements-text.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-text.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-text.scaleX) 和 [scaleY](~graphic.elements-text.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-text.originX) 和 [originY](~graphic.elements-text.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-text.x) 和 [y](~graphic.elements-text.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-text.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-text.scaleX) 和 [scaleY](~graphic.elements-text.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-text.originX) 和 [originY](~graphic.elements-text.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-text.x) 和 [y](~graphic.elements-text.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-text.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-text.scaleX) 和 [scaleY](~graphic.elements-text.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-text.originX) 和 [originY](~graphic.elements-text.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-text.x) 和 [y](~graphic.elements-text.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-text.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-text.scaleX) 和 [scaleY](~graphic.elements-text.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-text.originX) 和 [originY](~graphic.elements-text.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-text.x) 和 [y](~graphic.elements-text.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-text.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-text.scaleX) 和 [scaleY](~graphic.elements-text.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-text.originX) 和 [originY](~graphic.elements-text.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-text.x) 和 [y](~graphic.elements-text.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-text.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-text.scaleX) 和 [scaleY](~graphic.elements-text.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-text.originX) 和 [originY](~graphic.elements-text.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。














### left(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-text.left) 和 [right](~graphic.elements-text.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-text.left) 或 [right](~graphic.elements-text.right)，则 [shape](~graphic.elements-text.shape) 里的 `x`、`cx` 等定位属性不再生效。






### right(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-text.left) 和 [right](~graphic.elements-text.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-text.left) 或 [right](~graphic.elements-text.right)，则 [shape](~graphic.elements-text.shape) 里的 `x`、`cx` 等定位属性不再生效。






### top(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-text.top) 和 [bottom](~graphic.elements-text.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-text.top) 或 [bottom](~graphic.elements-text.bottom)，则 [shape](~graphic.elements-text.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bottom(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-text.top) 和 [bottom](~graphic.elements-text.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-text.top) 或 [bottom](~graphic.elements-text.bottom)，则 [shape](~graphic.elements-text.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bounding(string) = 'all'

决定此图形元素在定位时，对自身的包围盒计算方式。

参见例子：
~[500x500](doc-example/graphic-bounding&edit=1&reset=1)

可取值：

+ `'all'`：（默认）
    表示用自身以及子节点整体的经过 transform 后的包围盒进行定位。
    这种方式易于使整体都限制在父元素范围中。

+ `'raw'`：
    表示仅仅用自身（不包括子节点）的没经过 tranform 的包围盒进行定位。
    这种方式易于内容超出父元素范围的定位方式。

### z(number) = 0

z 方向的高度，决定层叠关系。

### zlevel(number) = 0

决定此元素绘制在哪个 canvas 层中。注意，越多 canvas 层会占用越多资源。




### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

### silent(boolean) = false

是否不响应鼠标以及触摸事件。

### invisible(boolean) = false

节点是否可见。

### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#graphic.elements-text)。


### textConfig(Object)

#### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

#### rotation(number)

`textContent` 的旋转弧度。

#### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

#### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

#### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

#### distance(number) = 5

距离 `layoutRect` 的距离。

#### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

#### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

#### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

#### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

#### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

#### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。






### cursor(string) = 'pointer'

<ExampleUIControlEnum options="auto,pointer,move" default="pointer" />

鼠标悬浮时在图形元素上时鼠标的样式是什么。同 CSS 的 `cursor`。



### draggable(boolean) = false

图形元素是否可以被拖拽。

### progressive(boolean) = false

是否渐进式渲染。当图形元素过多时才使用。






### style(Object)

#### text(string) = ''

文本块文字。可以使用 `\n` 来换行。



#### x(number) = 0

图形元素的左上角在父节点坐标系（以父节点左上角为原点）中的横坐标值。

#### y(number) = 0

图形元素的左上角在父节点坐标系（以父节点左上角为原点）中的纵坐标值。





#### font(string)

字体大小、字体类型、粗细、字体样式。格式参见 [css font](https://developer.mozilla.org/en-US/docs/Web/CSS/font)。

例如：
```
// size | family
font: '2em "STHeiti", sans-serif'

// style | weight | size | family
font: 'italic bolder 16px cursive'

// weight | size | family
font: 'bolder 2em "Microsoft YaHei", sans-serif'
```

#### textAlign(string) = 'left'

水平对齐方式，取值：`'left'`, `'center'`, `'right'`。

如果为 `'left'`，表示文本最左端在 `x` 值上。如果为 `'right'`，表示文本最右端在 `x` 值上。

#### textVerticalAlign(string)

垂直对齐方式，取值：`'top'`, `'middle'`, `'bottom'`。



注：关于图形元素中更多的样式设置（例如 [富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)），参见 [zrender/graphic/Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable) 中的 style 相关属性。

注意，这里图形元素的样式属性名称直接源于 zrender，和 `echarts label`、`echarts itemStyle` 等处同样含义的样式属性名称或有不同。例如，有如下对应：

+ [itemStyle.color](~series-scatter.label.color) => `style.fill`
+ [itemStyle.borderColor](~series-scatter.label.color) => `style.stroke`
+ [label.color](~series-scatter.label.color) => `style.textFill`
+ [label.textBorderColor](~series-scatter.label.textBorderColor) => `style.textStroke`
+ ...

#### fill(string) = '#000'

填充色。

#### stroke(string) = null

笔画颜色。

#### lineWidth(number) = 0

笔画宽度。

#### shadowBlur(number) = undefined

阴影宽度。

#### shadowOffsetX(number) = undefined

阴影 X 方向偏移。

#### shadowOffsetY(number) = undefined

阴影 Y 方向偏移。

#### shadowColor(number) = undefined

阴影颜色。















### focus(string) = 'none'



> 从 `v5.0.0` 开始支持



在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。支持如下配置：

+ `'none'` 不淡出其它图形，默认使用该配置。
+ `'self'` 只聚焦（不淡出）当前高亮的数据的图形。
+ `'series'` 聚焦当前高亮的数据所在的系列的所有图形。

### blurScope(string) = 'coordinateSystem'



> 从 `v5.0.0` 开始支持



在开启`focus`的时候，可以通过`blurScope`配置淡出的范围。支持如下配置

+ `'coordinateSystem'` 淡出范围为坐标系，默认使用该配置。
+ `'series'` 淡出范围为系列。
+ `'global'` 淡出范围为全局。
















### onclick(Function)

### onmouseover(Function)

### onmouseout(Function)

### onmousemove(Function)

### onmousewheel(Function)

### onmousedown(Function)

### onmouseup(Function)

### ondrag(Function)

### ondragstart(Function)

### ondragend(Function)

### ondragenter(Function)

### ondragleave(Function)

### ondragover(Function)

### ondrop(Function)






## elements.rect(Object)

矩形。



### type(string) = rect

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~graphic.elements-image),
[text](~graphic.elements-text),
[circle](~graphic.elements-circle),
[sector](~graphic.elements-sector),
[ring](~graphic.elements-ring),
[polygon](~graphic.elements-polygon),
[polyline](~graphic.elements-polyline),
[rect](~graphic.elements-rect),
[line](~graphic.elements-line),
[bezierCurve](~graphic.elements-bezierCurve),
[arc](~graphic.elements-arc),
[group](~graphic.elements-group),





### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。


### $action(string) = 'merge'

setOption 时指定本次对该图形元素的操作行为。

可取值：
+ `'merge'`：如果已有元素，则新的配置项和已有的设定进行 merge。如果没有则新建。
+ `'replace'`：如果已有元素，删除之，新建元素替代之。
+ `'remove'`：删除元素。




### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-rect.x) 和 [y](~graphic.elements-rect.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-rect.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-rect.scaleX) 和 [scaleY](~graphic.elements-rect.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-rect.originX) 和 [originY](~graphic.elements-rect.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-rect.x) 和 [y](~graphic.elements-rect.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-rect.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-rect.scaleX) 和 [scaleY](~graphic.elements-rect.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-rect.originX) 和 [originY](~graphic.elements-rect.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-rect.x) 和 [y](~graphic.elements-rect.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-rect.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-rect.scaleX) 和 [scaleY](~graphic.elements-rect.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-rect.originX) 和 [originY](~graphic.elements-rect.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-rect.x) 和 [y](~graphic.elements-rect.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-rect.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-rect.scaleX) 和 [scaleY](~graphic.elements-rect.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-rect.originX) 和 [originY](~graphic.elements-rect.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-rect.x) 和 [y](~graphic.elements-rect.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-rect.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-rect.scaleX) 和 [scaleY](~graphic.elements-rect.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-rect.originX) 和 [originY](~graphic.elements-rect.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-rect.x) 和 [y](~graphic.elements-rect.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-rect.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-rect.scaleX) 和 [scaleY](~graphic.elements-rect.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-rect.originX) 和 [originY](~graphic.elements-rect.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-rect.x) 和 [y](~graphic.elements-rect.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-rect.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-rect.scaleX) 和 [scaleY](~graphic.elements-rect.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-rect.originX) 和 [originY](~graphic.elements-rect.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。














### left(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-rect.left) 和 [right](~graphic.elements-rect.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-rect.left) 或 [right](~graphic.elements-rect.right)，则 [shape](~graphic.elements-rect.shape) 里的 `x`、`cx` 等定位属性不再生效。






### right(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-rect.left) 和 [right](~graphic.elements-rect.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-rect.left) 或 [right](~graphic.elements-rect.right)，则 [shape](~graphic.elements-rect.shape) 里的 `x`、`cx` 等定位属性不再生效。






### top(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-rect.top) 和 [bottom](~graphic.elements-rect.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-rect.top) 或 [bottom](~graphic.elements-rect.bottom)，则 [shape](~graphic.elements-rect.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bottom(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-rect.top) 和 [bottom](~graphic.elements-rect.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-rect.top) 或 [bottom](~graphic.elements-rect.bottom)，则 [shape](~graphic.elements-rect.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bounding(string) = 'all'

决定此图形元素在定位时，对自身的包围盒计算方式。

参见例子：
~[500x500](doc-example/graphic-bounding&edit=1&reset=1)

可取值：

+ `'all'`：（默认）
    表示用自身以及子节点整体的经过 transform 后的包围盒进行定位。
    这种方式易于使整体都限制在父元素范围中。

+ `'raw'`：
    表示仅仅用自身（不包括子节点）的没经过 tranform 的包围盒进行定位。
    这种方式易于内容超出父元素范围的定位方式。

### z(number) = 0

z 方向的高度，决定层叠关系。

### zlevel(number) = 0

决定此元素绘制在哪个 canvas 层中。注意，越多 canvas 层会占用越多资源。




### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

### silent(boolean) = false

是否不响应鼠标以及触摸事件。

### invisible(boolean) = false

节点是否可见。

### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#graphic.elements-text)。


### textConfig(Object)

#### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

#### rotation(number)

`textContent` 的旋转弧度。

#### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

#### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

#### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

#### distance(number) = 5

距离 `layoutRect` 的距离。

#### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

#### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

#### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

#### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

#### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

#### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。






### cursor(string) = 'pointer'

<ExampleUIControlEnum options="auto,pointer,move" default="pointer" />

鼠标悬浮时在图形元素上时鼠标的样式是什么。同 CSS 的 `cursor`。



### draggable(boolean) = false

图形元素是否可以被拖拽。

### progressive(boolean) = false

是否渐进式渲染。当图形元素过多时才使用。






### shape(Object)



#### x(number) = 0

图形元素的左上角在父节点坐标系（以父节点左上角为原点）中的横坐标值。

#### y(number) = 0

图形元素的左上角在父节点坐标系（以父节点左上角为原点）中的纵坐标值。







#### width(number) = 0

图形元素的宽度。

#### height(numbr) = 0

图形元素的高度。





#### r(Array)

可以用于设置圆角矩形。`r: [r1, r2, r3, r4]`，
左上、右上、右下、左下角的半径依次为r1、r2、r3、r4。

可以缩写，例如：
+ `r` 缩写为 `1`         相当于 `[1, 1, 1, 1]`
+ `r` 缩写为 `[1]`       相当于 `[1, 1, 1, 1]`
+ `r` 缩写为 `[1, 2]`    相当于 `[1, 2, 1, 2]`
+ `r` 缩写为 `[1, 2, 3]1 相当于 `[1, 2, 3, 2]`









### style(Object)



注：关于图形元素中更多的样式设置（例如 [富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)），参见 [zrender/graphic/Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable) 中的 style 相关属性。

注意，这里图形元素的样式属性名称直接源于 zrender，和 `echarts label`、`echarts itemStyle` 等处同样含义的样式属性名称或有不同。例如，有如下对应：

+ [itemStyle.color](~series-scatter.label.color) => `style.fill`
+ [itemStyle.borderColor](~series-scatter.label.color) => `style.stroke`
+ [label.color](~series-scatter.label.color) => `style.textFill`
+ [label.textBorderColor](~series-scatter.label.textBorderColor) => `style.textStroke`
+ ...

#### fill(string) = '#000'

填充色。

#### stroke(string) = null

笔画颜色。

#### lineWidth(number) = 0

笔画宽度。

#### shadowBlur(number) = undefined

阴影宽度。

#### shadowOffsetX(number) = undefined

阴影 X 方向偏移。

#### shadowOffsetY(number) = undefined

阴影 Y 方向偏移。

#### shadowColor(number) = undefined

阴影颜色。















### focus(string) = 'none'



> 从 `v5.0.0` 开始支持



在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。支持如下配置：

+ `'none'` 不淡出其它图形，默认使用该配置。
+ `'self'` 只聚焦（不淡出）当前高亮的数据的图形。
+ `'series'` 聚焦当前高亮的数据所在的系列的所有图形。

### blurScope(string) = 'coordinateSystem'



> 从 `v5.0.0` 开始支持



在开启`focus`的时候，可以通过`blurScope`配置淡出的范围。支持如下配置

+ `'coordinateSystem'` 淡出范围为坐标系，默认使用该配置。
+ `'series'` 淡出范围为系列。
+ `'global'` 淡出范围为全局。
















### onclick(Function)

### onmouseover(Function)

### onmouseout(Function)

### onmousemove(Function)

### onmousewheel(Function)

### onmousedown(Function)

### onmouseup(Function)

### ondrag(Function)

### ondragstart(Function)

### ondragend(Function)

### ondragenter(Function)

### ondragleave(Function)

### ondragover(Function)

### ondrop(Function)






## elements.circle(Object)

圆。



### type(string) = circle

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~graphic.elements-image),
[text](~graphic.elements-text),
[circle](~graphic.elements-circle),
[sector](~graphic.elements-sector),
[ring](~graphic.elements-ring),
[polygon](~graphic.elements-polygon),
[polyline](~graphic.elements-polyline),
[rect](~graphic.elements-rect),
[line](~graphic.elements-line),
[bezierCurve](~graphic.elements-bezierCurve),
[arc](~graphic.elements-arc),
[group](~graphic.elements-group),





### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。


### $action(string) = 'merge'

setOption 时指定本次对该图形元素的操作行为。

可取值：
+ `'merge'`：如果已有元素，则新的配置项和已有的设定进行 merge。如果没有则新建。
+ `'replace'`：如果已有元素，删除之，新建元素替代之。
+ `'remove'`：删除元素。




### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-circle.x) 和 [y](~graphic.elements-circle.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-circle.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-circle.scaleX) 和 [scaleY](~graphic.elements-circle.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-circle.originX) 和 [originY](~graphic.elements-circle.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-circle.x) 和 [y](~graphic.elements-circle.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-circle.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-circle.scaleX) 和 [scaleY](~graphic.elements-circle.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-circle.originX) 和 [originY](~graphic.elements-circle.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-circle.x) 和 [y](~graphic.elements-circle.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-circle.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-circle.scaleX) 和 [scaleY](~graphic.elements-circle.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-circle.originX) 和 [originY](~graphic.elements-circle.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-circle.x) 和 [y](~graphic.elements-circle.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-circle.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-circle.scaleX) 和 [scaleY](~graphic.elements-circle.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-circle.originX) 和 [originY](~graphic.elements-circle.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-circle.x) 和 [y](~graphic.elements-circle.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-circle.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-circle.scaleX) 和 [scaleY](~graphic.elements-circle.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-circle.originX) 和 [originY](~graphic.elements-circle.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-circle.x) 和 [y](~graphic.elements-circle.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-circle.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-circle.scaleX) 和 [scaleY](~graphic.elements-circle.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-circle.originX) 和 [originY](~graphic.elements-circle.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-circle.x) 和 [y](~graphic.elements-circle.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-circle.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-circle.scaleX) 和 [scaleY](~graphic.elements-circle.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-circle.originX) 和 [originY](~graphic.elements-circle.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。














### left(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-circle.left) 和 [right](~graphic.elements-circle.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-circle.left) 或 [right](~graphic.elements-circle.right)，则 [shape](~graphic.elements-circle.shape) 里的 `x`、`cx` 等定位属性不再生效。






### right(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-circle.left) 和 [right](~graphic.elements-circle.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-circle.left) 或 [right](~graphic.elements-circle.right)，则 [shape](~graphic.elements-circle.shape) 里的 `x`、`cx` 等定位属性不再生效。






### top(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-circle.top) 和 [bottom](~graphic.elements-circle.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-circle.top) 或 [bottom](~graphic.elements-circle.bottom)，则 [shape](~graphic.elements-circle.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bottom(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-circle.top) 和 [bottom](~graphic.elements-circle.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-circle.top) 或 [bottom](~graphic.elements-circle.bottom)，则 [shape](~graphic.elements-circle.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bounding(string) = 'all'

决定此图形元素在定位时，对自身的包围盒计算方式。

参见例子：
~[500x500](doc-example/graphic-bounding&edit=1&reset=1)

可取值：

+ `'all'`：（默认）
    表示用自身以及子节点整体的经过 transform 后的包围盒进行定位。
    这种方式易于使整体都限制在父元素范围中。

+ `'raw'`：
    表示仅仅用自身（不包括子节点）的没经过 tranform 的包围盒进行定位。
    这种方式易于内容超出父元素范围的定位方式。

### z(number) = 0

z 方向的高度，决定层叠关系。

### zlevel(number) = 0

决定此元素绘制在哪个 canvas 层中。注意，越多 canvas 层会占用越多资源。




### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

### silent(boolean) = false

是否不响应鼠标以及触摸事件。

### invisible(boolean) = false

节点是否可见。

### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#graphic.elements-text)。


### textConfig(Object)

#### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

#### rotation(number)

`textContent` 的旋转弧度。

#### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

#### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

#### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

#### distance(number) = 5

距离 `layoutRect` 的距离。

#### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

#### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

#### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

#### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

#### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

#### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。






### cursor(string) = 'pointer'

<ExampleUIControlEnum options="auto,pointer,move" default="pointer" />

鼠标悬浮时在图形元素上时鼠标的样式是什么。同 CSS 的 `cursor`。



### draggable(boolean) = false

图形元素是否可以被拖拽。

### progressive(boolean) = false

是否渐进式渲染。当图形元素过多时才使用。






### shape(Object)



#### cx(number) = 0

图形元素的中心在父节点坐标系（以父节点左上角为原点）中的横坐标值。

#### cy(numbr) = 0

图形元素的中心在父节点坐标系（以父节点左上角为原点）中的纵坐标值。







#### r(number) = 0

外半径。













### style(Object)



注：关于图形元素中更多的样式设置（例如 [富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)），参见 [zrender/graphic/Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable) 中的 style 相关属性。

注意，这里图形元素的样式属性名称直接源于 zrender，和 `echarts label`、`echarts itemStyle` 等处同样含义的样式属性名称或有不同。例如，有如下对应：

+ [itemStyle.color](~series-scatter.label.color) => `style.fill`
+ [itemStyle.borderColor](~series-scatter.label.color) => `style.stroke`
+ [label.color](~series-scatter.label.color) => `style.textFill`
+ [label.textBorderColor](~series-scatter.label.textBorderColor) => `style.textStroke`
+ ...

#### fill(string) = '#000'

填充色。

#### stroke(string) = null

笔画颜色。

#### lineWidth(number) = 0

笔画宽度。

#### shadowBlur(number) = undefined

阴影宽度。

#### shadowOffsetX(number) = undefined

阴影 X 方向偏移。

#### shadowOffsetY(number) = undefined

阴影 Y 方向偏移。

#### shadowColor(number) = undefined

阴影颜色。















### focus(string) = 'none'



> 从 `v5.0.0` 开始支持



在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。支持如下配置：

+ `'none'` 不淡出其它图形，默认使用该配置。
+ `'self'` 只聚焦（不淡出）当前高亮的数据的图形。
+ `'series'` 聚焦当前高亮的数据所在的系列的所有图形。

### blurScope(string) = 'coordinateSystem'



> 从 `v5.0.0` 开始支持



在开启`focus`的时候，可以通过`blurScope`配置淡出的范围。支持如下配置

+ `'coordinateSystem'` 淡出范围为坐标系，默认使用该配置。
+ `'series'` 淡出范围为系列。
+ `'global'` 淡出范围为全局。
















### onclick(Function)

### onmouseover(Function)

### onmouseout(Function)

### onmousemove(Function)

### onmousewheel(Function)

### onmousedown(Function)

### onmouseup(Function)

### ondrag(Function)

### ondragstart(Function)

### ondragend(Function)

### ondragenter(Function)

### ondragleave(Function)

### ondragover(Function)

### ondrop(Function)






## elements.ring(Object)

圆环。



### type(string) = ring

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~graphic.elements-image),
[text](~graphic.elements-text),
[circle](~graphic.elements-circle),
[sector](~graphic.elements-sector),
[ring](~graphic.elements-ring),
[polygon](~graphic.elements-polygon),
[polyline](~graphic.elements-polyline),
[rect](~graphic.elements-rect),
[line](~graphic.elements-line),
[bezierCurve](~graphic.elements-bezierCurve),
[arc](~graphic.elements-arc),
[group](~graphic.elements-group),





### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。


### $action(string) = 'merge'

setOption 时指定本次对该图形元素的操作行为。

可取值：
+ `'merge'`：如果已有元素，则新的配置项和已有的设定进行 merge。如果没有则新建。
+ `'replace'`：如果已有元素，删除之，新建元素替代之。
+ `'remove'`：删除元素。




### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-ring.x) 和 [y](~graphic.elements-ring.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-ring.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-ring.scaleX) 和 [scaleY](~graphic.elements-ring.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-ring.originX) 和 [originY](~graphic.elements-ring.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-ring.x) 和 [y](~graphic.elements-ring.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-ring.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-ring.scaleX) 和 [scaleY](~graphic.elements-ring.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-ring.originX) 和 [originY](~graphic.elements-ring.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-ring.x) 和 [y](~graphic.elements-ring.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-ring.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-ring.scaleX) 和 [scaleY](~graphic.elements-ring.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-ring.originX) 和 [originY](~graphic.elements-ring.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-ring.x) 和 [y](~graphic.elements-ring.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-ring.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-ring.scaleX) 和 [scaleY](~graphic.elements-ring.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-ring.originX) 和 [originY](~graphic.elements-ring.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-ring.x) 和 [y](~graphic.elements-ring.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-ring.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-ring.scaleX) 和 [scaleY](~graphic.elements-ring.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-ring.originX) 和 [originY](~graphic.elements-ring.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-ring.x) 和 [y](~graphic.elements-ring.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-ring.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-ring.scaleX) 和 [scaleY](~graphic.elements-ring.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-ring.originX) 和 [originY](~graphic.elements-ring.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-ring.x) 和 [y](~graphic.elements-ring.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-ring.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-ring.scaleX) 和 [scaleY](~graphic.elements-ring.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-ring.originX) 和 [originY](~graphic.elements-ring.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。














### left(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-ring.left) 和 [right](~graphic.elements-ring.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-ring.left) 或 [right](~graphic.elements-ring.right)，则 [shape](~graphic.elements-ring.shape) 里的 `x`、`cx` 等定位属性不再生效。






### right(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-ring.left) 和 [right](~graphic.elements-ring.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-ring.left) 或 [right](~graphic.elements-ring.right)，则 [shape](~graphic.elements-ring.shape) 里的 `x`、`cx` 等定位属性不再生效。






### top(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-ring.top) 和 [bottom](~graphic.elements-ring.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-ring.top) 或 [bottom](~graphic.elements-ring.bottom)，则 [shape](~graphic.elements-ring.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bottom(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-ring.top) 和 [bottom](~graphic.elements-ring.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-ring.top) 或 [bottom](~graphic.elements-ring.bottom)，则 [shape](~graphic.elements-ring.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bounding(string) = 'all'

决定此图形元素在定位时，对自身的包围盒计算方式。

参见例子：
~[500x500](doc-example/graphic-bounding&edit=1&reset=1)

可取值：

+ `'all'`：（默认）
    表示用自身以及子节点整体的经过 transform 后的包围盒进行定位。
    这种方式易于使整体都限制在父元素范围中。

+ `'raw'`：
    表示仅仅用自身（不包括子节点）的没经过 tranform 的包围盒进行定位。
    这种方式易于内容超出父元素范围的定位方式。

### z(number) = 0

z 方向的高度，决定层叠关系。

### zlevel(number) = 0

决定此元素绘制在哪个 canvas 层中。注意，越多 canvas 层会占用越多资源。




### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

### silent(boolean) = false

是否不响应鼠标以及触摸事件。

### invisible(boolean) = false

节点是否可见。

### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#graphic.elements-text)。


### textConfig(Object)

#### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

#### rotation(number)

`textContent` 的旋转弧度。

#### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

#### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

#### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

#### distance(number) = 5

距离 `layoutRect` 的距离。

#### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

#### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

#### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

#### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

#### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

#### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。






### cursor(string) = 'pointer'

<ExampleUIControlEnum options="auto,pointer,move" default="pointer" />

鼠标悬浮时在图形元素上时鼠标的样式是什么。同 CSS 的 `cursor`。



### draggable(boolean) = false

图形元素是否可以被拖拽。

### progressive(boolean) = false

是否渐进式渲染。当图形元素过多时才使用。






### shape(Object)



#### cx(number) = 0

图形元素的中心在父节点坐标系（以父节点左上角为原点）中的横坐标值。

#### cy(numbr) = 0

图形元素的中心在父节点坐标系（以父节点左上角为原点）中的纵坐标值。









#### r(number) = 0

外半径。





#### r0(number) = 0

内半径。













### style(Object)



注：关于图形元素中更多的样式设置（例如 [富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)），参见 [zrender/graphic/Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable) 中的 style 相关属性。

注意，这里图形元素的样式属性名称直接源于 zrender，和 `echarts label`、`echarts itemStyle` 等处同样含义的样式属性名称或有不同。例如，有如下对应：

+ [itemStyle.color](~series-scatter.label.color) => `style.fill`
+ [itemStyle.borderColor](~series-scatter.label.color) => `style.stroke`
+ [label.color](~series-scatter.label.color) => `style.textFill`
+ [label.textBorderColor](~series-scatter.label.textBorderColor) => `style.textStroke`
+ ...

#### fill(string) = '#000'

填充色。

#### stroke(string) = null

笔画颜色。

#### lineWidth(number) = 0

笔画宽度。

#### shadowBlur(number) = undefined

阴影宽度。

#### shadowOffsetX(number) = undefined

阴影 X 方向偏移。

#### shadowOffsetY(number) = undefined

阴影 Y 方向偏移。

#### shadowColor(number) = undefined

阴影颜色。















### focus(string) = 'none'



> 从 `v5.0.0` 开始支持



在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。支持如下配置：

+ `'none'` 不淡出其它图形，默认使用该配置。
+ `'self'` 只聚焦（不淡出）当前高亮的数据的图形。
+ `'series'` 聚焦当前高亮的数据所在的系列的所有图形。

### blurScope(string) = 'coordinateSystem'



> 从 `v5.0.0` 开始支持



在开启`focus`的时候，可以通过`blurScope`配置淡出的范围。支持如下配置

+ `'coordinateSystem'` 淡出范围为坐标系，默认使用该配置。
+ `'series'` 淡出范围为系列。
+ `'global'` 淡出范围为全局。
















### onclick(Function)

### onmouseover(Function)

### onmouseout(Function)

### onmousemove(Function)

### onmousewheel(Function)

### onmousedown(Function)

### onmouseup(Function)

### ondrag(Function)

### ondragstart(Function)

### ondragend(Function)

### ondragenter(Function)

### ondragleave(Function)

### ondragover(Function)

### ondrop(Function)






## elements.sector(Object)

扇形。



### type(string) = sector

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~graphic.elements-image),
[text](~graphic.elements-text),
[circle](~graphic.elements-circle),
[sector](~graphic.elements-sector),
[ring](~graphic.elements-ring),
[polygon](~graphic.elements-polygon),
[polyline](~graphic.elements-polyline),
[rect](~graphic.elements-rect),
[line](~graphic.elements-line),
[bezierCurve](~graphic.elements-bezierCurve),
[arc](~graphic.elements-arc),
[group](~graphic.elements-group),





### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。


### $action(string) = 'merge'

setOption 时指定本次对该图形元素的操作行为。

可取值：
+ `'merge'`：如果已有元素，则新的配置项和已有的设定进行 merge。如果没有则新建。
+ `'replace'`：如果已有元素，删除之，新建元素替代之。
+ `'remove'`：删除元素。




### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-sector.x) 和 [y](~graphic.elements-sector.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-sector.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-sector.scaleX) 和 [scaleY](~graphic.elements-sector.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-sector.originX) 和 [originY](~graphic.elements-sector.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-sector.x) 和 [y](~graphic.elements-sector.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-sector.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-sector.scaleX) 和 [scaleY](~graphic.elements-sector.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-sector.originX) 和 [originY](~graphic.elements-sector.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-sector.x) 和 [y](~graphic.elements-sector.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-sector.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-sector.scaleX) 和 [scaleY](~graphic.elements-sector.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-sector.originX) 和 [originY](~graphic.elements-sector.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-sector.x) 和 [y](~graphic.elements-sector.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-sector.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-sector.scaleX) 和 [scaleY](~graphic.elements-sector.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-sector.originX) 和 [originY](~graphic.elements-sector.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-sector.x) 和 [y](~graphic.elements-sector.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-sector.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-sector.scaleX) 和 [scaleY](~graphic.elements-sector.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-sector.originX) 和 [originY](~graphic.elements-sector.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-sector.x) 和 [y](~graphic.elements-sector.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-sector.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-sector.scaleX) 和 [scaleY](~graphic.elements-sector.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-sector.originX) 和 [originY](~graphic.elements-sector.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-sector.x) 和 [y](~graphic.elements-sector.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-sector.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-sector.scaleX) 和 [scaleY](~graphic.elements-sector.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-sector.originX) 和 [originY](~graphic.elements-sector.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。














### left(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-sector.left) 和 [right](~graphic.elements-sector.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-sector.left) 或 [right](~graphic.elements-sector.right)，则 [shape](~graphic.elements-sector.shape) 里的 `x`、`cx` 等定位属性不再生效。






### right(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-sector.left) 和 [right](~graphic.elements-sector.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-sector.left) 或 [right](~graphic.elements-sector.right)，则 [shape](~graphic.elements-sector.shape) 里的 `x`、`cx` 等定位属性不再生效。






### top(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-sector.top) 和 [bottom](~graphic.elements-sector.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-sector.top) 或 [bottom](~graphic.elements-sector.bottom)，则 [shape](~graphic.elements-sector.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bottom(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-sector.top) 和 [bottom](~graphic.elements-sector.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-sector.top) 或 [bottom](~graphic.elements-sector.bottom)，则 [shape](~graphic.elements-sector.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bounding(string) = 'all'

决定此图形元素在定位时，对自身的包围盒计算方式。

参见例子：
~[500x500](doc-example/graphic-bounding&edit=1&reset=1)

可取值：

+ `'all'`：（默认）
    表示用自身以及子节点整体的经过 transform 后的包围盒进行定位。
    这种方式易于使整体都限制在父元素范围中。

+ `'raw'`：
    表示仅仅用自身（不包括子节点）的没经过 tranform 的包围盒进行定位。
    这种方式易于内容超出父元素范围的定位方式。

### z(number) = 0

z 方向的高度，决定层叠关系。

### zlevel(number) = 0

决定此元素绘制在哪个 canvas 层中。注意，越多 canvas 层会占用越多资源。




### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

### silent(boolean) = false

是否不响应鼠标以及触摸事件。

### invisible(boolean) = false

节点是否可见。

### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#graphic.elements-text)。


### textConfig(Object)

#### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

#### rotation(number)

`textContent` 的旋转弧度。

#### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

#### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

#### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

#### distance(number) = 5

距离 `layoutRect` 的距离。

#### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

#### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

#### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

#### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

#### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

#### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。






### cursor(string) = 'pointer'

<ExampleUIControlEnum options="auto,pointer,move" default="pointer" />

鼠标悬浮时在图形元素上时鼠标的样式是什么。同 CSS 的 `cursor`。



### draggable(boolean) = false

图形元素是否可以被拖拽。

### progressive(boolean) = false

是否渐进式渲染。当图形元素过多时才使用。






### shape(Object)



#### cx(number) = 0

图形元素的中心在父节点坐标系（以父节点左上角为原点）中的横坐标值。

#### cy(numbr) = 0

图形元素的中心在父节点坐标系（以父节点左上角为原点）中的纵坐标值。









#### r(number) = 0

外半径。





#### r0(number) = 0

内半径。







#### startAngle(number) = 0

开始弧度。

#### endAngle(number) = Math.PI * 2

结束弧度。

#### clockwise(boolean) = true

是否顺时针。













### style(Object)



注：关于图形元素中更多的样式设置（例如 [富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)），参见 [zrender/graphic/Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable) 中的 style 相关属性。

注意，这里图形元素的样式属性名称直接源于 zrender，和 `echarts label`、`echarts itemStyle` 等处同样含义的样式属性名称或有不同。例如，有如下对应：

+ [itemStyle.color](~series-scatter.label.color) => `style.fill`
+ [itemStyle.borderColor](~series-scatter.label.color) => `style.stroke`
+ [label.color](~series-scatter.label.color) => `style.textFill`
+ [label.textBorderColor](~series-scatter.label.textBorderColor) => `style.textStroke`
+ ...

#### fill(string) = '#000'

填充色。

#### stroke(string) = null

笔画颜色。

#### lineWidth(number) = 0

笔画宽度。

#### shadowBlur(number) = undefined

阴影宽度。

#### shadowOffsetX(number) = undefined

阴影 X 方向偏移。

#### shadowOffsetY(number) = undefined

阴影 Y 方向偏移。

#### shadowColor(number) = undefined

阴影颜色。















### focus(string) = 'none'



> 从 `v5.0.0` 开始支持



在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。支持如下配置：

+ `'none'` 不淡出其它图形，默认使用该配置。
+ `'self'` 只聚焦（不淡出）当前高亮的数据的图形。
+ `'series'` 聚焦当前高亮的数据所在的系列的所有图形。

### blurScope(string) = 'coordinateSystem'



> 从 `v5.0.0` 开始支持



在开启`focus`的时候，可以通过`blurScope`配置淡出的范围。支持如下配置

+ `'coordinateSystem'` 淡出范围为坐标系，默认使用该配置。
+ `'series'` 淡出范围为系列。
+ `'global'` 淡出范围为全局。
















### onclick(Function)

### onmouseover(Function)

### onmouseout(Function)

### onmousemove(Function)

### onmousewheel(Function)

### onmousedown(Function)

### onmouseup(Function)

### ondrag(Function)

### ondragstart(Function)

### ondragend(Function)

### ondragenter(Function)

### ondragleave(Function)

### ondragover(Function)

### ondrop(Function)






## elements.arc(Object)

圆弧。



### type(string) = arc

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~graphic.elements-image),
[text](~graphic.elements-text),
[circle](~graphic.elements-circle),
[sector](~graphic.elements-sector),
[ring](~graphic.elements-ring),
[polygon](~graphic.elements-polygon),
[polyline](~graphic.elements-polyline),
[rect](~graphic.elements-rect),
[line](~graphic.elements-line),
[bezierCurve](~graphic.elements-bezierCurve),
[arc](~graphic.elements-arc),
[group](~graphic.elements-group),





### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。


### $action(string) = 'merge'

setOption 时指定本次对该图形元素的操作行为。

可取值：
+ `'merge'`：如果已有元素，则新的配置项和已有的设定进行 merge。如果没有则新建。
+ `'replace'`：如果已有元素，删除之，新建元素替代之。
+ `'remove'`：删除元素。




### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-arc.x) 和 [y](~graphic.elements-arc.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-arc.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-arc.scaleX) 和 [scaleY](~graphic.elements-arc.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-arc.originX) 和 [originY](~graphic.elements-arc.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-arc.x) 和 [y](~graphic.elements-arc.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-arc.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-arc.scaleX) 和 [scaleY](~graphic.elements-arc.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-arc.originX) 和 [originY](~graphic.elements-arc.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-arc.x) 和 [y](~graphic.elements-arc.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-arc.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-arc.scaleX) 和 [scaleY](~graphic.elements-arc.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-arc.originX) 和 [originY](~graphic.elements-arc.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-arc.x) 和 [y](~graphic.elements-arc.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-arc.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-arc.scaleX) 和 [scaleY](~graphic.elements-arc.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-arc.originX) 和 [originY](~graphic.elements-arc.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-arc.x) 和 [y](~graphic.elements-arc.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-arc.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-arc.scaleX) 和 [scaleY](~graphic.elements-arc.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-arc.originX) 和 [originY](~graphic.elements-arc.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-arc.x) 和 [y](~graphic.elements-arc.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-arc.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-arc.scaleX) 和 [scaleY](~graphic.elements-arc.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-arc.originX) 和 [originY](~graphic.elements-arc.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-arc.x) 和 [y](~graphic.elements-arc.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-arc.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-arc.scaleX) 和 [scaleY](~graphic.elements-arc.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-arc.originX) 和 [originY](~graphic.elements-arc.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。














### left(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-arc.left) 和 [right](~graphic.elements-arc.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-arc.left) 或 [right](~graphic.elements-arc.right)，则 [shape](~graphic.elements-arc.shape) 里的 `x`、`cx` 等定位属性不再生效。






### right(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-arc.left) 和 [right](~graphic.elements-arc.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-arc.left) 或 [right](~graphic.elements-arc.right)，则 [shape](~graphic.elements-arc.shape) 里的 `x`、`cx` 等定位属性不再生效。






### top(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-arc.top) 和 [bottom](~graphic.elements-arc.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-arc.top) 或 [bottom](~graphic.elements-arc.bottom)，则 [shape](~graphic.elements-arc.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bottom(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-arc.top) 和 [bottom](~graphic.elements-arc.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-arc.top) 或 [bottom](~graphic.elements-arc.bottom)，则 [shape](~graphic.elements-arc.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bounding(string) = 'all'

决定此图形元素在定位时，对自身的包围盒计算方式。

参见例子：
~[500x500](doc-example/graphic-bounding&edit=1&reset=1)

可取值：

+ `'all'`：（默认）
    表示用自身以及子节点整体的经过 transform 后的包围盒进行定位。
    这种方式易于使整体都限制在父元素范围中。

+ `'raw'`：
    表示仅仅用自身（不包括子节点）的没经过 tranform 的包围盒进行定位。
    这种方式易于内容超出父元素范围的定位方式。

### z(number) = 0

z 方向的高度，决定层叠关系。

### zlevel(number) = 0

决定此元素绘制在哪个 canvas 层中。注意，越多 canvas 层会占用越多资源。




### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

### silent(boolean) = false

是否不响应鼠标以及触摸事件。

### invisible(boolean) = false

节点是否可见。

### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#graphic.elements-text)。


### textConfig(Object)

#### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

#### rotation(number)

`textContent` 的旋转弧度。

#### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

#### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

#### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

#### distance(number) = 5

距离 `layoutRect` 的距离。

#### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

#### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

#### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

#### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

#### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

#### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。






### cursor(string) = 'pointer'

<ExampleUIControlEnum options="auto,pointer,move" default="pointer" />

鼠标悬浮时在图形元素上时鼠标的样式是什么。同 CSS 的 `cursor`。



### draggable(boolean) = false

图形元素是否可以被拖拽。

### progressive(boolean) = false

是否渐进式渲染。当图形元素过多时才使用。






### shape(Object)



#### cx(number) = 0

图形元素的中心在父节点坐标系（以父节点左上角为原点）中的横坐标值。

#### cy(numbr) = 0

图形元素的中心在父节点坐标系（以父节点左上角为原点）中的纵坐标值。









#### r(number) = 0

外半径。





#### r0(number) = 0

内半径。







#### startAngle(number) = 0

开始弧度。

#### endAngle(number) = Math.PI * 2

结束弧度。

#### clockwise(boolean) = true

是否顺时针。













### style(Object)



注：关于图形元素中更多的样式设置（例如 [富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)），参见 [zrender/graphic/Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable) 中的 style 相关属性。

注意，这里图形元素的样式属性名称直接源于 zrender，和 `echarts label`、`echarts itemStyle` 等处同样含义的样式属性名称或有不同。例如，有如下对应：

+ [itemStyle.color](~series-scatter.label.color) => `style.fill`
+ [itemStyle.borderColor](~series-scatter.label.color) => `style.stroke`
+ [label.color](~series-scatter.label.color) => `style.textFill`
+ [label.textBorderColor](~series-scatter.label.textBorderColor) => `style.textStroke`
+ ...

#### fill(string) = null

填充色。

#### stroke(string) = "#000"

笔画颜色。

#### lineWidth(number) = 1

笔画宽度。

#### shadowBlur(number) = undefined

阴影宽度。

#### shadowOffsetX(number) = undefined

阴影 X 方向偏移。

#### shadowOffsetY(number) = undefined

阴影 Y 方向偏移。

#### shadowColor(number) = undefined

阴影颜色。















### focus(string) = 'none'



> 从 `v5.0.0` 开始支持



在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。支持如下配置：

+ `'none'` 不淡出其它图形，默认使用该配置。
+ `'self'` 只聚焦（不淡出）当前高亮的数据的图形。
+ `'series'` 聚焦当前高亮的数据所在的系列的所有图形。

### blurScope(string) = 'coordinateSystem'



> 从 `v5.0.0` 开始支持



在开启`focus`的时候，可以通过`blurScope`配置淡出的范围。支持如下配置

+ `'coordinateSystem'` 淡出范围为坐标系，默认使用该配置。
+ `'series'` 淡出范围为系列。
+ `'global'` 淡出范围为全局。
















### onclick(Function)

### onmouseover(Function)

### onmouseout(Function)

### onmousemove(Function)

### onmousewheel(Function)

### onmousedown(Function)

### onmouseup(Function)

### ondrag(Function)

### ondragstart(Function)

### ondragend(Function)

### ondragenter(Function)

### ondragleave(Function)

### ondragover(Function)

### ondrop(Function)






## elements.polygon(Object)

多边形。



### type(string) = polygon

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~graphic.elements-image),
[text](~graphic.elements-text),
[circle](~graphic.elements-circle),
[sector](~graphic.elements-sector),
[ring](~graphic.elements-ring),
[polygon](~graphic.elements-polygon),
[polyline](~graphic.elements-polyline),
[rect](~graphic.elements-rect),
[line](~graphic.elements-line),
[bezierCurve](~graphic.elements-bezierCurve),
[arc](~graphic.elements-arc),
[group](~graphic.elements-group),





### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。


### $action(string) = 'merge'

setOption 时指定本次对该图形元素的操作行为。

可取值：
+ `'merge'`：如果已有元素，则新的配置项和已有的设定进行 merge。如果没有则新建。
+ `'replace'`：如果已有元素，删除之，新建元素替代之。
+ `'remove'`：删除元素。




### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-polygon.x) 和 [y](~graphic.elements-polygon.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-polygon.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-polygon.scaleX) 和 [scaleY](~graphic.elements-polygon.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-polygon.originX) 和 [originY](~graphic.elements-polygon.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-polygon.x) 和 [y](~graphic.elements-polygon.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-polygon.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-polygon.scaleX) 和 [scaleY](~graphic.elements-polygon.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-polygon.originX) 和 [originY](~graphic.elements-polygon.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-polygon.x) 和 [y](~graphic.elements-polygon.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-polygon.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-polygon.scaleX) 和 [scaleY](~graphic.elements-polygon.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-polygon.originX) 和 [originY](~graphic.elements-polygon.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-polygon.x) 和 [y](~graphic.elements-polygon.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-polygon.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-polygon.scaleX) 和 [scaleY](~graphic.elements-polygon.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-polygon.originX) 和 [originY](~graphic.elements-polygon.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-polygon.x) 和 [y](~graphic.elements-polygon.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-polygon.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-polygon.scaleX) 和 [scaleY](~graphic.elements-polygon.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-polygon.originX) 和 [originY](~graphic.elements-polygon.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-polygon.x) 和 [y](~graphic.elements-polygon.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-polygon.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-polygon.scaleX) 和 [scaleY](~graphic.elements-polygon.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-polygon.originX) 和 [originY](~graphic.elements-polygon.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-polygon.x) 和 [y](~graphic.elements-polygon.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-polygon.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-polygon.scaleX) 和 [scaleY](~graphic.elements-polygon.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-polygon.originX) 和 [originY](~graphic.elements-polygon.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。














### left(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-polygon.left) 和 [right](~graphic.elements-polygon.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-polygon.left) 或 [right](~graphic.elements-polygon.right)，则 [shape](~graphic.elements-polygon.shape) 里的 `x`、`cx` 等定位属性不再生效。






### right(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-polygon.left) 和 [right](~graphic.elements-polygon.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-polygon.left) 或 [right](~graphic.elements-polygon.right)，则 [shape](~graphic.elements-polygon.shape) 里的 `x`、`cx` 等定位属性不再生效。






### top(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-polygon.top) 和 [bottom](~graphic.elements-polygon.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-polygon.top) 或 [bottom](~graphic.elements-polygon.bottom)，则 [shape](~graphic.elements-polygon.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bottom(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-polygon.top) 和 [bottom](~graphic.elements-polygon.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-polygon.top) 或 [bottom](~graphic.elements-polygon.bottom)，则 [shape](~graphic.elements-polygon.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bounding(string) = 'all'

决定此图形元素在定位时，对自身的包围盒计算方式。

参见例子：
~[500x500](doc-example/graphic-bounding&edit=1&reset=1)

可取值：

+ `'all'`：（默认）
    表示用自身以及子节点整体的经过 transform 后的包围盒进行定位。
    这种方式易于使整体都限制在父元素范围中。

+ `'raw'`：
    表示仅仅用自身（不包括子节点）的没经过 tranform 的包围盒进行定位。
    这种方式易于内容超出父元素范围的定位方式。

### z(number) = 0

z 方向的高度，决定层叠关系。

### zlevel(number) = 0

决定此元素绘制在哪个 canvas 层中。注意，越多 canvas 层会占用越多资源。




### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

### silent(boolean) = false

是否不响应鼠标以及触摸事件。

### invisible(boolean) = false

节点是否可见。

### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#graphic.elements-text)。


### textConfig(Object)

#### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

#### rotation(number)

`textContent` 的旋转弧度。

#### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

#### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

#### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

#### distance(number) = 5

距离 `layoutRect` 的距离。

#### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

#### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

#### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

#### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

#### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

#### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。






### cursor(string) = 'pointer'

<ExampleUIControlEnum options="auto,pointer,move" default="pointer" />

鼠标悬浮时在图形元素上时鼠标的样式是什么。同 CSS 的 `cursor`。



### draggable(boolean) = false

图形元素是否可以被拖拽。

### progressive(boolean) = false

是否渐进式渲染。当图形元素过多时才使用。






### shape(Object)



#### points(Array)

点列表，用于定义形状，如 `[[22, 44], [44, 55], [11, 44], ...]`

#### smooth(number|string) = undefined

是否平滑曲线。

+ 如果为 number：表示贝塞尔 (bezier) 差值平滑，smooth 指定了平滑等级，范围 `[0, 1]`。
+ 如果为 `'spline'`：表示 Catmull-Rom spline 差值平滑。

#### smoothConstraint(boolean) = false

是否将平滑曲线约束在包围盒中。`smooth` 为 `number`（bezier）时生效。













### style(Object)



注：关于图形元素中更多的样式设置（例如 [富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)），参见 [zrender/graphic/Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable) 中的 style 相关属性。

注意，这里图形元素的样式属性名称直接源于 zrender，和 `echarts label`、`echarts itemStyle` 等处同样含义的样式属性名称或有不同。例如，有如下对应：

+ [itemStyle.color](~series-scatter.label.color) => `style.fill`
+ [itemStyle.borderColor](~series-scatter.label.color) => `style.stroke`
+ [label.color](~series-scatter.label.color) => `style.textFill`
+ [label.textBorderColor](~series-scatter.label.textBorderColor) => `style.textStroke`
+ ...

#### fill(string) = '#000'

填充色。

#### stroke(string) = null

笔画颜色。

#### lineWidth(number) = 0

笔画宽度。

#### shadowBlur(number) = undefined

阴影宽度。

#### shadowOffsetX(number) = undefined

阴影 X 方向偏移。

#### shadowOffsetY(number) = undefined

阴影 Y 方向偏移。

#### shadowColor(number) = undefined

阴影颜色。















### focus(string) = 'none'



> 从 `v5.0.0` 开始支持



在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。支持如下配置：

+ `'none'` 不淡出其它图形，默认使用该配置。
+ `'self'` 只聚焦（不淡出）当前高亮的数据的图形。
+ `'series'` 聚焦当前高亮的数据所在的系列的所有图形。

### blurScope(string) = 'coordinateSystem'



> 从 `v5.0.0` 开始支持



在开启`focus`的时候，可以通过`blurScope`配置淡出的范围。支持如下配置

+ `'coordinateSystem'` 淡出范围为坐标系，默认使用该配置。
+ `'series'` 淡出范围为系列。
+ `'global'` 淡出范围为全局。
















### onclick(Function)

### onmouseover(Function)

### onmouseout(Function)

### onmousemove(Function)

### onmousewheel(Function)

### onmousedown(Function)

### onmouseup(Function)

### ondrag(Function)

### ondragstart(Function)

### ondragend(Function)

### ondragenter(Function)

### ondragleave(Function)

### ondragover(Function)

### ondrop(Function)






## elements.polyline(Object)

折线。



### type(string) = polyline

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~graphic.elements-image),
[text](~graphic.elements-text),
[circle](~graphic.elements-circle),
[sector](~graphic.elements-sector),
[ring](~graphic.elements-ring),
[polygon](~graphic.elements-polygon),
[polyline](~graphic.elements-polyline),
[rect](~graphic.elements-rect),
[line](~graphic.elements-line),
[bezierCurve](~graphic.elements-bezierCurve),
[arc](~graphic.elements-arc),
[group](~graphic.elements-group),





### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。


### $action(string) = 'merge'

setOption 时指定本次对该图形元素的操作行为。

可取值：
+ `'merge'`：如果已有元素，则新的配置项和已有的设定进行 merge。如果没有则新建。
+ `'replace'`：如果已有元素，删除之，新建元素替代之。
+ `'remove'`：删除元素。




### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-polyline.x) 和 [y](~graphic.elements-polyline.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-polyline.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-polyline.scaleX) 和 [scaleY](~graphic.elements-polyline.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-polyline.originX) 和 [originY](~graphic.elements-polyline.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-polyline.x) 和 [y](~graphic.elements-polyline.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-polyline.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-polyline.scaleX) 和 [scaleY](~graphic.elements-polyline.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-polyline.originX) 和 [originY](~graphic.elements-polyline.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-polyline.x) 和 [y](~graphic.elements-polyline.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-polyline.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-polyline.scaleX) 和 [scaleY](~graphic.elements-polyline.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-polyline.originX) 和 [originY](~graphic.elements-polyline.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-polyline.x) 和 [y](~graphic.elements-polyline.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-polyline.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-polyline.scaleX) 和 [scaleY](~graphic.elements-polyline.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-polyline.originX) 和 [originY](~graphic.elements-polyline.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-polyline.x) 和 [y](~graphic.elements-polyline.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-polyline.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-polyline.scaleX) 和 [scaleY](~graphic.elements-polyline.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-polyline.originX) 和 [originY](~graphic.elements-polyline.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-polyline.x) 和 [y](~graphic.elements-polyline.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-polyline.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-polyline.scaleX) 和 [scaleY](~graphic.elements-polyline.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-polyline.originX) 和 [originY](~graphic.elements-polyline.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-polyline.x) 和 [y](~graphic.elements-polyline.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-polyline.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-polyline.scaleX) 和 [scaleY](~graphic.elements-polyline.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-polyline.originX) 和 [originY](~graphic.elements-polyline.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。














### left(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-polyline.left) 和 [right](~graphic.elements-polyline.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-polyline.left) 或 [right](~graphic.elements-polyline.right)，则 [shape](~graphic.elements-polyline.shape) 里的 `x`、`cx` 等定位属性不再生效。






### right(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-polyline.left) 和 [right](~graphic.elements-polyline.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-polyline.left) 或 [right](~graphic.elements-polyline.right)，则 [shape](~graphic.elements-polyline.shape) 里的 `x`、`cx` 等定位属性不再生效。






### top(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-polyline.top) 和 [bottom](~graphic.elements-polyline.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-polyline.top) 或 [bottom](~graphic.elements-polyline.bottom)，则 [shape](~graphic.elements-polyline.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bottom(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-polyline.top) 和 [bottom](~graphic.elements-polyline.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-polyline.top) 或 [bottom](~graphic.elements-polyline.bottom)，则 [shape](~graphic.elements-polyline.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bounding(string) = 'all'

决定此图形元素在定位时，对自身的包围盒计算方式。

参见例子：
~[500x500](doc-example/graphic-bounding&edit=1&reset=1)

可取值：

+ `'all'`：（默认）
    表示用自身以及子节点整体的经过 transform 后的包围盒进行定位。
    这种方式易于使整体都限制在父元素范围中。

+ `'raw'`：
    表示仅仅用自身（不包括子节点）的没经过 tranform 的包围盒进行定位。
    这种方式易于内容超出父元素范围的定位方式。

### z(number) = 0

z 方向的高度，决定层叠关系。

### zlevel(number) = 0

决定此元素绘制在哪个 canvas 层中。注意，越多 canvas 层会占用越多资源。




### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

### silent(boolean) = false

是否不响应鼠标以及触摸事件。

### invisible(boolean) = false

节点是否可见。

### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#graphic.elements-text)。


### textConfig(Object)

#### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

#### rotation(number)

`textContent` 的旋转弧度。

#### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

#### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

#### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

#### distance(number) = 5

距离 `layoutRect` 的距离。

#### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

#### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

#### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

#### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

#### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

#### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。






### cursor(string) = 'pointer'

<ExampleUIControlEnum options="auto,pointer,move" default="pointer" />

鼠标悬浮时在图形元素上时鼠标的样式是什么。同 CSS 的 `cursor`。



### draggable(boolean) = false

图形元素是否可以被拖拽。

### progressive(boolean) = false

是否渐进式渲染。当图形元素过多时才使用。






### shape(Object)



#### points(Array)

点列表，用于定义形状，如 `[[22, 44], [44, 55], [11, 44], ...]`

#### smooth(number|string) = undefined

是否平滑曲线。

+ 如果为 number：表示贝塞尔 (bezier) 差值平滑，smooth 指定了平滑等级，范围 `[0, 1]`。
+ 如果为 `'spline'`：表示 Catmull-Rom spline 差值平滑。

#### smoothConstraint(boolean) = false

是否将平滑曲线约束在包围盒中。`smooth` 为 `number`（bezier）时生效。













### style(Object)



注：关于图形元素中更多的样式设置（例如 [富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)），参见 [zrender/graphic/Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable) 中的 style 相关属性。

注意，这里图形元素的样式属性名称直接源于 zrender，和 `echarts label`、`echarts itemStyle` 等处同样含义的样式属性名称或有不同。例如，有如下对应：

+ [itemStyle.color](~series-scatter.label.color) => `style.fill`
+ [itemStyle.borderColor](~series-scatter.label.color) => `style.stroke`
+ [label.color](~series-scatter.label.color) => `style.textFill`
+ [label.textBorderColor](~series-scatter.label.textBorderColor) => `style.textStroke`
+ ...

#### fill(string) = null

填充色。

#### stroke(string) = "#000"

笔画颜色。

#### lineWidth(number) = 5

笔画宽度。

#### shadowBlur(number) = undefined

阴影宽度。

#### shadowOffsetX(number) = undefined

阴影 X 方向偏移。

#### shadowOffsetY(number) = undefined

阴影 Y 方向偏移。

#### shadowColor(number) = undefined

阴影颜色。















### focus(string) = 'none'



> 从 `v5.0.0` 开始支持



在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。支持如下配置：

+ `'none'` 不淡出其它图形，默认使用该配置。
+ `'self'` 只聚焦（不淡出）当前高亮的数据的图形。
+ `'series'` 聚焦当前高亮的数据所在的系列的所有图形。

### blurScope(string) = 'coordinateSystem'



> 从 `v5.0.0` 开始支持



在开启`focus`的时候，可以通过`blurScope`配置淡出的范围。支持如下配置

+ `'coordinateSystem'` 淡出范围为坐标系，默认使用该配置。
+ `'series'` 淡出范围为系列。
+ `'global'` 淡出范围为全局。
















### onclick(Function)

### onmouseover(Function)

### onmouseout(Function)

### onmousemove(Function)

### onmousewheel(Function)

### onmousedown(Function)

### onmouseup(Function)

### ondrag(Function)

### ondragstart(Function)

### ondragend(Function)

### ondragenter(Function)

### ondragleave(Function)

### ondragover(Function)

### ondrop(Function)






## elements.line(Object)

直线。



### type(string) = line

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~graphic.elements-image),
[text](~graphic.elements-text),
[circle](~graphic.elements-circle),
[sector](~graphic.elements-sector),
[ring](~graphic.elements-ring),
[polygon](~graphic.elements-polygon),
[polyline](~graphic.elements-polyline),
[rect](~graphic.elements-rect),
[line](~graphic.elements-line),
[bezierCurve](~graphic.elements-bezierCurve),
[arc](~graphic.elements-arc),
[group](~graphic.elements-group),





### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。


### $action(string) = 'merge'

setOption 时指定本次对该图形元素的操作行为。

可取值：
+ `'merge'`：如果已有元素，则新的配置项和已有的设定进行 merge。如果没有则新建。
+ `'replace'`：如果已有元素，删除之，新建元素替代之。
+ `'remove'`：删除元素。




### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-line.x) 和 [y](~graphic.elements-line.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-line.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-line.scaleX) 和 [scaleY](~graphic.elements-line.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-line.originX) 和 [originY](~graphic.elements-line.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-line.x) 和 [y](~graphic.elements-line.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-line.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-line.scaleX) 和 [scaleY](~graphic.elements-line.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-line.originX) 和 [originY](~graphic.elements-line.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-line.x) 和 [y](~graphic.elements-line.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-line.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-line.scaleX) 和 [scaleY](~graphic.elements-line.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-line.originX) 和 [originY](~graphic.elements-line.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-line.x) 和 [y](~graphic.elements-line.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-line.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-line.scaleX) 和 [scaleY](~graphic.elements-line.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-line.originX) 和 [originY](~graphic.elements-line.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-line.x) 和 [y](~graphic.elements-line.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-line.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-line.scaleX) 和 [scaleY](~graphic.elements-line.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-line.originX) 和 [originY](~graphic.elements-line.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-line.x) 和 [y](~graphic.elements-line.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-line.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-line.scaleX) 和 [scaleY](~graphic.elements-line.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-line.originX) 和 [originY](~graphic.elements-line.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-line.x) 和 [y](~graphic.elements-line.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-line.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-line.scaleX) 和 [scaleY](~graphic.elements-line.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-line.originX) 和 [originY](~graphic.elements-line.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。














### left(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-line.left) 和 [right](~graphic.elements-line.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-line.left) 或 [right](~graphic.elements-line.right)，则 [shape](~graphic.elements-line.shape) 里的 `x`、`cx` 等定位属性不再生效。






### right(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-line.left) 和 [right](~graphic.elements-line.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-line.left) 或 [right](~graphic.elements-line.right)，则 [shape](~graphic.elements-line.shape) 里的 `x`、`cx` 等定位属性不再生效。






### top(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-line.top) 和 [bottom](~graphic.elements-line.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-line.top) 或 [bottom](~graphic.elements-line.bottom)，则 [shape](~graphic.elements-line.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bottom(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-line.top) 和 [bottom](~graphic.elements-line.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-line.top) 或 [bottom](~graphic.elements-line.bottom)，则 [shape](~graphic.elements-line.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bounding(string) = 'all'

决定此图形元素在定位时，对自身的包围盒计算方式。

参见例子：
~[500x500](doc-example/graphic-bounding&edit=1&reset=1)

可取值：

+ `'all'`：（默认）
    表示用自身以及子节点整体的经过 transform 后的包围盒进行定位。
    这种方式易于使整体都限制在父元素范围中。

+ `'raw'`：
    表示仅仅用自身（不包括子节点）的没经过 tranform 的包围盒进行定位。
    这种方式易于内容超出父元素范围的定位方式。

### z(number) = 0

z 方向的高度，决定层叠关系。

### zlevel(number) = 0

决定此元素绘制在哪个 canvas 层中。注意，越多 canvas 层会占用越多资源。




### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

### silent(boolean) = false

是否不响应鼠标以及触摸事件。

### invisible(boolean) = false

节点是否可见。

### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#graphic.elements-text)。


### textConfig(Object)

#### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

#### rotation(number)

`textContent` 的旋转弧度。

#### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

#### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

#### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

#### distance(number) = 5

距离 `layoutRect` 的距离。

#### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

#### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

#### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

#### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

#### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

#### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。






### cursor(string) = 'pointer'

<ExampleUIControlEnum options="auto,pointer,move" default="pointer" />

鼠标悬浮时在图形元素上时鼠标的样式是什么。同 CSS 的 `cursor`。



### draggable(boolean) = false

图形元素是否可以被拖拽。

### progressive(boolean) = false

是否渐进式渲染。当图形元素过多时才使用。






### shape(Object)



#### x1(number) = 0

开始点的 x 值。

#### y1(number) = 0

开始点的 y 值。

#### x2(number) = 0

结束点的 x 值。

#### y2(number) = 0

结束点的 y 值。





#### percent(number) = 1

线画到百分之多少就不画了。值的范围：[0, 1]。









### style(Object)



注：关于图形元素中更多的样式设置（例如 [富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)），参见 [zrender/graphic/Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable) 中的 style 相关属性。

注意，这里图形元素的样式属性名称直接源于 zrender，和 `echarts label`、`echarts itemStyle` 等处同样含义的样式属性名称或有不同。例如，有如下对应：

+ [itemStyle.color](~series-scatter.label.color) => `style.fill`
+ [itemStyle.borderColor](~series-scatter.label.color) => `style.stroke`
+ [label.color](~series-scatter.label.color) => `style.textFill`
+ [label.textBorderColor](~series-scatter.label.textBorderColor) => `style.textStroke`
+ ...

#### fill(string) = null

填充色。

#### stroke(string) = "#000"

笔画颜色。

#### lineWidth(number) = 5

笔画宽度。

#### shadowBlur(number) = undefined

阴影宽度。

#### shadowOffsetX(number) = undefined

阴影 X 方向偏移。

#### shadowOffsetY(number) = undefined

阴影 Y 方向偏移。

#### shadowColor(number) = undefined

阴影颜色。















### focus(string) = 'none'



> 从 `v5.0.0` 开始支持



在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。支持如下配置：

+ `'none'` 不淡出其它图形，默认使用该配置。
+ `'self'` 只聚焦（不淡出）当前高亮的数据的图形。
+ `'series'` 聚焦当前高亮的数据所在的系列的所有图形。

### blurScope(string) = 'coordinateSystem'



> 从 `v5.0.0` 开始支持



在开启`focus`的时候，可以通过`blurScope`配置淡出的范围。支持如下配置

+ `'coordinateSystem'` 淡出范围为坐标系，默认使用该配置。
+ `'series'` 淡出范围为系列。
+ `'global'` 淡出范围为全局。
















### onclick(Function)

### onmouseover(Function)

### onmouseout(Function)

### onmousemove(Function)

### onmousewheel(Function)

### onmousedown(Function)

### onmouseup(Function)

### ondrag(Function)

### ondragstart(Function)

### ondragend(Function)

### ondragenter(Function)

### ondragleave(Function)

### ondragover(Function)

### ondrop(Function)






## elements.bezierCurve(Object)

二次或三次贝塞尔曲线。



### type(string) = bezierCurve

用 setOption 首次设定图形元素时必须指定。
可取值：



[image](~graphic.elements-image),
[text](~graphic.elements-text),
[circle](~graphic.elements-circle),
[sector](~graphic.elements-sector),
[ring](~graphic.elements-ring),
[polygon](~graphic.elements-polygon),
[polyline](~graphic.elements-polyline),
[rect](~graphic.elements-rect),
[line](~graphic.elements-line),
[bezierCurve](~graphic.elements-bezierCurve),
[arc](~graphic.elements-arc),
[group](~graphic.elements-group),





### id(string) = undefined

id 用于在更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。


### $action(string) = 'merge'

setOption 时指定本次对该图形元素的操作行为。

可取值：
+ `'merge'`：如果已有元素，则新的配置项和已有的设定进行 merge。如果没有则新建。
+ `'replace'`：如果已有元素，删除之，新建元素替代之。
+ `'remove'`：删除元素。




### x(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-bezierCurve.x) 和 [y](~graphic.elements-bezierCurve.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-bezierCurve.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-bezierCurve.scaleX) 和 [scaleY](~graphic.elements-bezierCurve.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-bezierCurve.originX) 和 [originY](~graphic.elements-bezierCurve.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### y(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-bezierCurve.x) 和 [y](~graphic.elements-bezierCurve.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-bezierCurve.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-bezierCurve.scaleX) 和 [scaleY](~graphic.elements-bezierCurve.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-bezierCurve.originX) 和 [originY](~graphic.elements-bezierCurve.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### rotation(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-bezierCurve.x) 和 [y](~graphic.elements-bezierCurve.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-bezierCurve.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-bezierCurve.scaleX) 和 [scaleY](~graphic.elements-bezierCurve.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-bezierCurve.originX) 和 [originY](~graphic.elements-bezierCurve.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleX(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-bezierCurve.x) 和 [y](~graphic.elements-bezierCurve.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-bezierCurve.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-bezierCurve.scaleX) 和 [scaleY](~graphic.elements-bezierCurve.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-bezierCurve.originX) 和 [originY](~graphic.elements-bezierCurve.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### scaleY(number) = 1



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-bezierCurve.x) 和 [y](~graphic.elements-bezierCurve.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-bezierCurve.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-bezierCurve.scaleX) 和 [scaleY](~graphic.elements-bezierCurve.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-bezierCurve.originX) 和 [originY](~graphic.elements-bezierCurve.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originX(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-bezierCurve.x) 和 [y](~graphic.elements-bezierCurve.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-bezierCurve.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-bezierCurve.scaleX) 和 [scaleY](~graphic.elements-bezierCurve.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-bezierCurve.originX) 和 [originY](~graphic.elements-bezierCurve.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。





### originY(number) = 0



图形元素可以进行标准的 `2D transform`，其中包含：
+ 平移（依照 [x](~graphic.elements-bezierCurve.x) 和 [y](~graphic.elements-bezierCurve.y)）：默认值都是 `0`。右和下为正值。
+ 旋转（依照 [rotation](~graphic.elements-bezierCurve.rotation)）：默认值是 `0`。表示旋转的弧度值。正值表示逆时针旋转。
+ 缩放（依照 [scaleX](~graphic.elements-bezierCurve.scaleX) 和 [scaleY](~graphic.elements-bezierCurve.scaleY)）：默认值都是 `1`。这个值表示缩放的倍数。

另外，[originX](~graphic.elements-bezierCurve.originX) 和 [originY](~graphic.elements-bezierCurve.originY) 指定了旋转和缩放的中心点，默认值都是 `0`。

注意：
+ transform 中设定的坐标，都是相对于图形元素的父元素的（即 [group](~graphic.elements-group) 元素或者顶层画布）的 `[0, 0]` 点。也就是说，我们可以使用 [group](~graphic.elements-group) 来组织多个图形元素，并且 [group](~graphic.elements-group) 可以嵌套。
+ 对于一个图形元素，`transform` 执行的顺序是：先缩放（依照 `scaleX`，`scaleY`），再旋转（依照 `rotation`），再平移（依照 `x`，`y`）。














### left(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-bezierCurve.left) 和 [right](~graphic.elements-bezierCurve.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-bezierCurve.left) 或 [right](~graphic.elements-bezierCurve.right)，则 [shape](~graphic.elements-bezierCurve.shape) 里的 `x`、`cx` 等定位属性不再生效。






### right(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的高和此百分比计算出最终值。
+ `'center'`：表示自动居中。


[left](~graphic.elements-bezierCurve.left) 和 [right](~graphic.elements-bezierCurve.right) 只有一个可以生效。

如果指定 [left](~graphic.elements-bezierCurve.left) 或 [right](~graphic.elements-bezierCurve.right)，则 [shape](~graphic.elements-bezierCurve.shape) 里的 `x`、`cx` 等定位属性不再生效。






### top(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-bezierCurve.top) 和 [bottom](~graphic.elements-bezierCurve.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-bezierCurve.top) 或 [bottom](~graphic.elements-bezierCurve.bottom)，则 [shape](~graphic.elements-bezierCurve.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bottom(number|string) = undefined



描述怎么根据父元素进行定位。

『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 `group` 的子元素，父元素就是 `group` 元素。

值的类型可以是：

+ `number`：表示像素值。
+ 百分比值：如 '33%'，用父元素的宽和此百分比计算出最终值。
+ `'middle'`：表示自动居中。


[top](~graphic.elements-bezierCurve.top) 和 [bottom](~graphic.elements-bezierCurve.bottom) 只有一个可以生效。

如果指定 [top](~graphic.elements-bezierCurve.top) 或 [bottom](~graphic.elements-bezierCurve.bottom)，则 [shape](~graphic.elements-bezierCurve.shape) 里的 `y`、`cy` 等定位属性不再生效。






### bounding(string) = 'all'

决定此图形元素在定位时，对自身的包围盒计算方式。

参见例子：
~[500x500](doc-example/graphic-bounding&edit=1&reset=1)

可取值：

+ `'all'`：（默认）
    表示用自身以及子节点整体的经过 transform 后的包围盒进行定位。
    这种方式易于使整体都限制在父元素范围中。

+ `'raw'`：
    表示仅仅用自身（不包括子节点）的没经过 tranform 的包围盒进行定位。
    这种方式易于内容超出父元素范围的定位方式。

### z(number) = 0

z 方向的高度，决定层叠关系。

### zlevel(number) = 0

决定此元素绘制在哪个 canvas 层中。注意，越多 canvas 层会占用越多资源。




### info(*)

用户定义的任意数据，可以在 event listener 中访问，如：

```js
chart.on('click', function (params) {
    console.log(params.info);
});
```

### silent(boolean) = false

是否不响应鼠标以及触摸事件。

### invisible(boolean) = false

节点是否可见。

### ignore(boolean) = false

节点是否完全被忽略（既不渲染，也不响应事件）。

### textContent(Object)

这是一个文本定义，附着在一个节点上，会依据 `textConfig` 配置，相对于节点布局。


里面的属性同于 [text](option.html#graphic.elements-text)。


### textConfig(Object)

#### position() = 'inside'

Position of `textContent`.

+ 'left'
+ 'right'
+ 'top'
+ 'bottom'
+ 'inside'
+ 'insideLeft'
+ 'insideRight'
+ 'insideTop'
+ 'insideBottom'
+ 'insideTopLeft'
+ 'insideTopRight'
+ 'insideBottomLeft'
+ 'insideBottomRight'
+ or like `[12, 33]`
+ or like `['50%', '50%']`

#### rotation(number)

`textContent` 的旋转弧度。

#### layoutRect(Object)

`textContent` 根据此矩形来布局位置。
默认是节点的包围盒。

```js
{
    x: number
    y: number
    width: number
    height: number
}
```

#### offset(Array)

`textContent` 的偏移。

`offset` 和 `position` 的区别是，`offset` 是旋转（rotation）后计算。

#### origin

`origin` 相对于节点的包围盒。
可以是百分数。
如果指定为 `'center'`，则定位在包围盒中心。

只有当 `position` and `rotation` 都设置时，生效。

+ 如 `[12, 33]`
+ 或如 `['50%', '50%']`
+ 'center'

#### distance(number) = 5

距离 `layoutRect` 的距离。

#### local(boolean) = false

如果 `true` 的话，会采用节点的 transform。

#### insideFill(string)

`insideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.insideFill` > "auto-calculated-fill"
在绝大多数场景下，"auto-calculated-fill" 是白色。

#### insideStroke(string)

`insideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 `"inside"`，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.insideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会和节点的 `fill` 相同，如果 `fill` 没有的话则为 `null`。

#### outsideFill(string)

`outsideFill` 可以是一个颜色字符串，或者空着。

如果 `textContent` 是 "inside"，它的 `fill` 会按这个优先级来选取：
`textContent.style.fill` > `textConfig.outsideFill` > #000

#### outsideStroke(string)

`outsideStroke` 可以是一个颜色字符串，或者空着。

如果 `textContent` 不是 "inside"，它的 `stroke` 会按这个优先级来选取：
`textContent.style.stroke` > `textConfig.outsideStroke` > "auto-calculated-stroke"

"auto-calculated-stroke" 的规则是：

+ 如果
    + (A) `fill` 在 style 中被指定（无论是在 `textContent.style` 还是 `textContent.style.rich` 里）
    + 或者 (B) 需要画文字的背景（无论是定义在 `textContent.style` 还是 `textContent.style.rich` 里）
    + "auto-calculated-stroke" 都会为 `null`。
+ 否则
    + "auto-calculated-stroke" 会为一个近似于白色的颜色，来区别于背景。

#### inside(boolean)

如果确定文本是在节点中的话，则此可设置为 `true`，避免 echarts 额外猜测。






### cursor(string) = 'pointer'

<ExampleUIControlEnum options="auto,pointer,move" default="pointer" />

鼠标悬浮时在图形元素上时鼠标的样式是什么。同 CSS 的 `cursor`。



### draggable(boolean) = false

图形元素是否可以被拖拽。

### progressive(boolean) = false

是否渐进式渲染。当图形元素过多时才使用。






### shape(Object)



#### x1(number) = 0

开始点的 x 值。

#### y1(number) = 0

开始点的 y 值。

#### x2(number) = 0

结束点的 x 值。

#### y2(number) = 0

结束点的 y 值。





#### cpx1(number) = 0

控制点 x 值。

#### cpy1(number) = 0

控制点 y 值。

#### cpx2(number) = null

第二个控制点 x 值。如果设置则开启三阶贝塞尔曲线。

#### cpy2(number) = null

第二个控制点 y 值。如果设置则开启三阶贝塞尔曲线。

#### percent(number) = 1

画到百分之多少就不画了。值的范围：[0, 1]。









### style(Object)



注：关于图形元素中更多的样式设置（例如 [富文本标签](tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)），参见 [zrender/graphic/Displayable](https://ecomfe.github.io/zrender-doc/public/api.html#zrenderdisplayable) 中的 style 相关属性。

注意，这里图形元素的样式属性名称直接源于 zrender，和 `echarts label`、`echarts itemStyle` 等处同样含义的样式属性名称或有不同。例如，有如下对应：

+ [itemStyle.color](~series-scatter.label.color) => `style.fill`
+ [itemStyle.borderColor](~series-scatter.label.color) => `style.stroke`
+ [label.color](~series-scatter.label.color) => `style.textFill`
+ [label.textBorderColor](~series-scatter.label.textBorderColor) => `style.textStroke`
+ ...

#### fill(string) = '#000'

填充色。

#### stroke(string) = null

笔画颜色。

#### lineWidth(number) = 0

笔画宽度。

#### shadowBlur(number) = undefined

阴影宽度。

#### shadowOffsetX(number) = undefined

阴影 X 方向偏移。

#### shadowOffsetY(number) = undefined

阴影 Y 方向偏移。

#### shadowColor(number) = undefined

阴影颜色。















### focus(string) = 'none'



> 从 `v5.0.0` 开始支持



在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。支持如下配置：

+ `'none'` 不淡出其它图形，默认使用该配置。
+ `'self'` 只聚焦（不淡出）当前高亮的数据的图形。
+ `'series'` 聚焦当前高亮的数据所在的系列的所有图形。

### blurScope(string) = 'coordinateSystem'



> 从 `v5.0.0` 开始支持



在开启`focus`的时候，可以通过`blurScope`配置淡出的范围。支持如下配置

+ `'coordinateSystem'` 淡出范围为坐标系，默认使用该配置。
+ `'series'` 淡出范围为系列。
+ `'global'` 淡出范围为全局。
















### onclick(Function)

### onmouseover(Function)

### onmouseout(Function)

### onmousemove(Function)

### onmousewheel(Function)

### onmousedown(Function)

### onmouseup(Function)

### ondrag(Function)

### ondragstart(Function)

### ondragend(Function)

### ondragenter(Function)

### ondragleave(Function)

### ondragover(Function)

### ondrop(Function)
