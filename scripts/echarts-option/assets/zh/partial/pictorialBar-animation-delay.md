#${prefix} animationDelay(number|Function) = 0

动画开始之前的延迟，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更戏剧的更新动画效果。

如下示例：
```js
animationDelay: function (dataIndex, params) {
    return params.index * 30;
}
或者反向：
animationDelay: function (dataIndex, params) {
    return (params.count - 1 - params.index) * 30;
}
```

例子：
~[800x400](${galleryViewPath}doc-example/pictorialBar-repeatDirection&reset=1&edit=1)

#${prefix} animationDelayUpdate(number|Function) = 0

数据更新动画的延迟，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更戏剧的更新动画效果。

如下示例：
```js
animationDelay: function (dataIndex, params) {
    return params.index * 30;
}
或者反向：
animationDelay: function (dataIndex, params) {
    return (params.count - 1 - params.index) * 30;
}
```

例子：
~[800x400](${galleryViewPath}doc-example/pictorialBar-repeatDirection&reset=1&edit=1)
