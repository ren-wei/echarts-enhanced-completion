> 注：treemap中 `${name}` 属性可能在多处地方存在：

{{ if: ${name} !== 'color' }}> * 于 [sereis-treemap](~series-treemap) 根下，表示本系列全局的统一设置。{{ /if }}

> * 于 [series-treemap.levels](~series-treemap.levels) 的每个数组元素中，表示树每个层级的统一设置。
> * 于 [series-treemap.data](~series-treemap.data) 的每个节点中，表示每个节点的特定设置。
