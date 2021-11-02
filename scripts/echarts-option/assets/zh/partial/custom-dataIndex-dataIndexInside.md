+ `dataIndex` 指的 `dataItem` 在原始数据中的 index。
+ `dataIndexInside` 指的是 `dataItem` 在当前数据窗口（参见 [dataZoom](~dataZoom)）中的 index。

[renderItem.arguments.api](~series-custom.renderItem.arguments.api) 中使用的参数都是 `dataIndexInside` 而非 `dataIndex`，因为从 `dataIndex` 转换成 `dataIndexInside` 需要时间开销。
