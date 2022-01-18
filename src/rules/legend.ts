const legendRules: DependRules = [
    {
        key: 'legend.shadowBlur',
        msg: "此配置项生效的前提是，设置了 show: true 以及值不为 'tranparent' 的背景色 backgroundColor。",
        severity: 0,
        depends: [
            {
                key: 'legend.show',
                defaultValue: true,
                expectedValue: true,
                msg: '不显示图例组件时不生效',
            },
            {
                key: 'legend.backgroundColor',
                defaultValue: 'transparent',
                excludeValue: 'transparent',
                msg: '图例组件背景色透明时无效',
            },
        ],
    },
    {
        key: 'legend.pageButtonPosition',
        options: ['start', 'end'],
        msg: "可选值: ['start', 'end'];\nlegend.type 为 'scroll' 时有效",
        severity: 0,
        depends: [
            {
                key: 'legend.type',
                defaultValue: null,
                expectedValue: 'scroll',
                msg: "legend.type 为 'scroll' 时有效",
            },
        ],
    },

];
export default legendRules;
