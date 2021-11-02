#${prefix} show(boolean) = false

{{ if: ${position} }}
#${prefix} position(string) = 'outside'

标签的位置。

**可选：**
+ `'left'` 漏斗图左侧，[orient](~series-funnel.orient) 为`'vertical'`时有效。
+ `'right'` 漏斗图右侧，[orient](~series-funnel.orient) 为`'vertical'`时有效。
+ `'top'` 漏斗图上侧，[orient](~series-funnel.orient) 为`'horizontal'`时有效。
+ `'bottom'` 漏斗图下侧，[orient](~series-funnel.orient) 为`'horizontal'`时有效。
+ `'inside'` 漏斗图梯形内部。
+ `'insideRight'` 漏斗图梯形内部右侧。
+ `'insideLeft'` 漏斗图梯形内部左侧。
+ `'leftTop'` 漏斗图左侧上部。
+ `'leftBottom'`  漏斗图左侧下部。
+ `'rightTop'`  漏斗图右侧上部。
+ `'rightBottom'`  漏斗图右侧下部。
+ `'inner'` 同 `'inside'`。
+ `'center'` 同 `'inside'`。

在不是配置为内部的时候标签可以通过[视觉引导线](~series-funnel.labelLine)连到相应的梯形。
通过[视觉引导线](~series-funnel.labelLine)连到相应的梯形。
{{ /if }}

{{ if: ${formatter} }}
#${prefix} formatter(string|Function)


{{ /if }}
