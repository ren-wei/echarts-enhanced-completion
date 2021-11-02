可以设置 `brush` 是『全局的』还是『属于坐标系的』。

**全局 brush**

在 echarts 实例中任意地方刷选。这是默认情况。如果没有指定为『坐标系 brush』，就是『全局 brush』。

**坐标系 brush**

在 指定的坐标系中刷选。选框可以跟随坐标系的缩放和平移（roam 和 dataZoom）而移动。

坐标系 brush 实际更为常用，尤其是在 geo 中。

通过指定 [brush.geoIndex](~brush.geoIndex) 或 [brush.xAxisIndex](~brush.xAxisIndex) 或 [brush.yAxisIndex](~brush.yAxisIndex) 来规定可以在哪些坐标系中进行刷选。

这几个配置项的取值可以是：

+ `'all'`，表示所有
+ `number`，如 `0`，表示这个 index 所对应的坐标系。
+ `Array`，如 `[0, 4, 2]`，表示指定这些 index 所对应的坐标系。
+ `'none'` 或 `null` 或 `undefined`，表示不指定。

例如：
```javascript
option = {
    geo: {
        ...
    },
    brush: {
        geoIndex: 'all', // 只可以在所有 geo 坐标系中刷选，也就是上面定义的 geo 组件中。
        ...
    }
};
```

例如：
```javascript
option = {
    grid: [
        {...}, // grid 0
        {...}  // grid 1
    ],
    xAxis: [
        {gridIndex: 1, ...}, // xAxis 0，属于 grid 1。
        {gridIndex: 0, ...}  // xAxis 1，属于 grid 0。
    ],
    yAxis: [
        {gridIndex: 1, ...}, // yAxis 0，属于 grid 1。
        {gridIndex: 0, ...}  // yAxis 1，属于 grid 0。
    ],
    brush: {
        xAxisIndex: [0, 1], // 只可以在 xAxisIndex 为 `0` 和 `1` 的 xAxis 所在的直角坐标系中刷选。
        ...
    }
};
```
