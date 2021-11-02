**✦ 修改视觉编码 ✦**

如果在图表被渲染后（即已经使用 `setOption` 设置了初始 `option` 之后），想修改 ${componentMainType} 的各种 `视觉编码`，按照惯例，再次使用 `setOption` 即可。例如：

```javascript
chart.setOption({
    ${componentMainType}: {
        inRange: {color: ['red', 'blue']}
    }
});
```

但请注意：

+ ${componentMainType} option 中的这几个属性，`inRange`, `outOfRange`, `target`, `controller`，在 setOption 时不支持 merge。否则会带来过于复杂的 merge 逻辑。也就是说，`setOption` 时，一旦修改了以上几个属性中的一项，其他项也会被清空，而非保留当前状态。所以，设置 visual 值时，请一次性全部设置，而非只设置一部分。

+ **不推荐使用 `getOption -> 修改option -> setOption` 的方式：**

```javascript
// 不推荐这样做（尽管也能达到和上面的例子相同的结果）：
var option = chart.getOption(); // 获取所有option。
option.${componentMainType}.inRange.color = ['red', 'blue']; // 改动color（我想要改变 color）。

// 如下两处也要进行同步改动，否则可能达不到期望效果。
option.${componentMainType}.target.inRange.color = ['red', 'blue'];
option.${componentMainType}.controller.inRange.color = ['red', 'blue'];

chart.setOption(option); // option设置回 ${componentMainType}
```
