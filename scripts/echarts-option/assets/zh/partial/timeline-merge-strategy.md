初始化的时候，对应于当前时间的那个 `switchableOption` 会被合并（merge）到 `baseOption`，形成 `finalOption`。而每当时间变化时，对应于新时间的 `switchableOption` 会被合并（merge）到`finalOption`。

有两种合并（merge）策略：
+ 默认使用 `NORMAL_MERGE`。
+ 如果 [timeline.replaceMerge](~option.html#timeline.replaceMerge) 被指定了，则使用 `REPLACE_MERGE`。如果要知道 `REPLACE_MERGE` 更多信息，可以参见 [setOption](~api.html#echartsInstance.setOption) 中 `REPLACE_MERGE` 一节。
。
