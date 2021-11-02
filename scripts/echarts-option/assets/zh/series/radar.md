# series.radar(Object)

**雷达图**

雷达图主要用于表现多变量的数据，例如球员的各个属性分析。依赖 [radar](~radar) 组件。

下面是 AQI 数据用雷达图表现的示例。

~[600x500](${galleryViewPath}radar-aqi&edit=1&reset=1)

<ExampleBaseOption name="radar" title="基础雷达图" title-en="Basic Radar">
const option = {
    title: {
        text: '基础雷达图'
    },
    tooltip: {},
    legend: {
        data: ['Allocated Budget', 'Actual Spending']
    },
    radar: {
        indicator: [
            { name: 'sales', max: 6500},
            { name: 'Administration', max: 16000},
            { name: 'Information Techology', max: 30000},
            { name: 'Customer Support', max: 38000},
            { name: 'Development', max: 52000},
            { name: 'Marketing', max: 25000}
        ]
    },
    series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        data: [
            {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: 'Allocated Budget'
            },
            {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: 'Actual Spending'
            }
        ]
    }]
};
</ExampleBaseOption>

## type(string) = 'radar'







## radarIndex(number)

雷达图所使用的 [radar](~radar) 组件的 index。



## label(Object)





## labelLayout(Object|Function)



## itemStyle(Object)

折线拐点标志的样式。



## lineStyle(Object)

线条样式。



## areaStyle(Object)

区域填充样式。



## emphasis(Object)

高亮状态的配置。





#${prefix} itemStyle(Object)



#${prefix} label(Object)



#${prefix} lineStyle(Object)



#${prefix} areaStyle(Object)





## blur(Object)



淡出状态的配置。开启 [emphasis.focus](~series-radar.emphasis.focus) 后有效。



#${prefix} itemStyle(Object)



#${prefix} label(Object)



#${prefix} lineStyle(Object)



#${prefix} areaStyle(Object)





## select(Object)



选中状态的配置。开启 [selectedMode](~series-radar.selectedMode) 后有效。



#${prefix} itemStyle(Object)



#${prefix} label(Object)



#${prefix} lineStyle(Object)



#${prefix} areaStyle(Object)









## data(Array)

雷达图的数据是多变量（维度）的，如下示例：

```js
data : [
    {
        value : [4300, 10000, 28000, 35000, 50000, 19000],
        name : '预算分配（Allocated Budget）'
    },
    {
        value : [5000, 14000, 28000, 31000, 42000, 21000],
        name : '实际开销（Actual Spending）'
    }
]
```

其中的`value`项数组是具体的数据，每个值跟 [radar.indicator](~radar.indicator) 一一对应。

### name(string)

数据项名称

### value(number)

单个数据项的数值。





### label(Object)

单个拐点文本的样式设置。



### itemStyle(Object)

单个拐点标志的样式设置。



### lineStyle(Object)

单项线条样式。



### areaStyle(Object)

单项区域填充样式。



### emphasis(Object)

单个数据项样式的高亮状态。



#${prefix} itemStyle(Object)



#${prefix} label(Object)



#${prefix} lineStyle(Object)



#${prefix} areaStyle(Object)





### blur(Object)



单个数据项样式的淡出状态。



#${prefix} itemStyle(Object)



#${prefix} label(Object)



#${prefix} lineStyle(Object)



#${prefix} areaStyle(Object)





### select(Object)



单个数据项样式的选中状态。



#${prefix} itemStyle(Object)



#${prefix} label(Object)



#${prefix} lineStyle(Object)



#${prefix} areaStyle(Object)













#${prefix} animation(boolean) = ${defaultAnimation|default(true)}

<ExampleUIControlBoolean default="${defaultAnimation|default(true)}" clean="true" />

是否开启动画。

#${prefix} animationThreshold(number) = ${defaultAnimationThreshold|default(2000)}

是否开启动画的阈值，当单个系列显示的图形数量大于这个阈值时会关闭动画。



#${prefix} animationDuration(number|Function) = ${defaultAnimationDuration|default(1000)}

<ExampleUIControlNumber min="0" default="${defaultAnimationDuration|default(1000)}" step="20" clean="true" />

初始动画的时长，支持回调函数，可以通过每个数据返回不同的时长实现更戏剧的初始动画效果：

```js
animationDuration: function (idx) {
    // 越往后的数据时长越大
    return idx * 100;
}
```

#${prefix} animationEasing(string) = ${defaultAnimationEasing|default('cubicOut')}

<ExampleUIControlEnum options="linear,quadraticIn,quadraticOut,quadraticInOut,cubicIn,cubicOut,cubicInOut,quarticIn,quarticOut,quarticInOut,quinticIn,quinticOut,quinticInOut,sinusoidalIn,sinusoidalOut,sinusoidalInOut,exponentialIn,exponentialOut,exponentialInOut,circularIn,circularOut,circularInOut,elasticIn,elasticOut,elasticInOut,backIn,backOut,backInOut,bounceIn,bounceOut,bounceInOut" clean="true" />

初始动画的缓动效果。不同的缓动效果可以参考 [缓动示例](${galleryEditorPath}line-easing)。

{{ if: !${noAnimationDelay} }}
#${prefix} animationDelay(number|Function) = 0

初始动画的延迟，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更戏剧的初始动画效果。

如下示例：
```js
animationDelay: function (idx) {
    // 越往后的数据延迟越大
    return idx * 100;
}
```

也可以看[该示例](${galleryEditorPath}bar-animation-delay)
{{ /if }}



#${prefix} animationDurationUpdate(number|Function) = ${defaultAnimationDurationUpdate|default(300)}

<ExampleUIControlNumber min="0" default="${defaultAnimationDuration|default(1000)}" step="20" />

数据更新动画的时长。

支持回调函数，可以通过每个数据返回不同的时长实现更戏剧的更新动画效果：

```js
animationDurationUpdate: function (idx) {
    // 越往后的数据时长越大
    return idx * 100;
}
```

#${prefix} animationEasingUpdate(string) = ${defaultAnimationEasingUpdate|default('cubicInOut')}

<ExampleUIControlEnum options="linear,quadraticIn,quadraticOut,quadraticInOut,cubicIn,cubicOut,cubicInOut,quarticIn,quarticOut,quarticInOut,quinticIn,quinticOut,quinticInOut,sinusoidalIn,sinusoidalOut,sinusoidalInOut,exponentialIn,exponentialOut,exponentialInOut,circularIn,circularOut,circularInOut,elasticIn,elasticOut,elasticInOut,backIn,backOut,backInOut,bounceIn,bounceOut,bounceInOut" />

数据更新动画的缓动效果。

{{ if: !${noAnimationDelay} }}
#${prefix} animationDelayUpdate(number|Function) = 0

数据更新动画的延迟，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更戏剧的更新动画效果。

如下示例：
```js
animationDelayUpdate: function (idx) {
    // 越往后的数据延迟越大
    return idx * 100;
}
```

也可以看[该示例](${galleryEditorPath}bar-animation-delay)
{{ /if }}
