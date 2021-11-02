#${prefix} itemStyle(Object)

旭日图扇形块的样式。

可以在 [series.itemStyle](~series-sunburst.itemStyle) 定义所有扇形块的样式，也可以在 [series.levels.itemStyle](~series-sunburst.levels.itemStyle) 定义每一层扇形块的样式，还可以在 [series.data.itemStyle](~series-sunburst.data.itemStyle) 定义每个扇形块单独的样式，这三者的优先级从低到高。也就是说，如果定义了 [series.data.itemStyle](~series-sunburst.data.itemStyle)，将会覆盖 [series.itemStyle](~series-sunburst.itemStyle) 和 [series.levels.itemStyle](~series-sunburst.levels.itemStyle)。

**优先级：[series.data.itemStyle](~series-sunburst.data.itemStyle) > [series.levels.itemStyle](~series-sunburst.levels.itemStyle) > [series.itemStyle](~series-sunburst.itemStyle)。**
