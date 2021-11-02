不同系列间，选中的项可以联动。

参见如下效果（刷选一个 `scatter`，其他 `scatter` 以及 `parallel` 图都会有选中效果）：
~[800x550](${galleryViewPath}scatter-matrix&edit=1&reset=1)

`brushLink` 配置项是一个数组，内容是 seriesIndex，指定了哪些 series 可以被联动。例如可以是：

+ `[3, 4, 5]` 表示 seriesIndex 为 `3`, `4`, `5` 的 series 可以被联动。
+ `'all'` 表示所有 series 都进行 brushLink。
+ `'none'` 或 `null` 或 `undefined` 表示不启用 brushLink 功能。

**注意**

brushLink 是通过 dataIndex 进行映射，所以需要保证，**联动的每个系列的 `data` 都是 `index` 对应的**。*

例如：
```javascript
option = {
    brush: {
        brushLink: [0, 1]
    },
    series: [
        {
            type: 'bar'
            data: [232,    4434,    545,      654]     // data 有四个项
        },
        {
            type: 'parallel',
            data: [[4, 5], [3, 5], [66, 33], [99, 66]] // data 同样有四个项，两个系列的 data 是对应的。
        }
    ]
};
```
