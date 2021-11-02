默认情况，刷选或者移动选区的时候，会不断得发 `brushSelected` 事件，从而告诉外界选中的内容。

但是频繁的事件可能导致性能问题，或者动画效果很差。所以 brush 组件提供了 [brush.throttleType](~brush.throttleType)，[brush.throttleDelay](~brush.throttleDelay) 来解决这个问题。

throttleType 取值可以是：
+ `'debounce'`：表示只有停止动作了（即一段时间没有操作了），才会触发事件。时间阈值由 [brush.throttleDelay](~brush.throttleDelay) 指定。
+ `'fixRate'`：表示按照一定的频率触发事件，时间间隔由 [brush.throttleDelay](~brush.throttleDelay) 指定。
