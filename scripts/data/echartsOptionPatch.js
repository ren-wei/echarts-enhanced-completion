/* eslint-disable @typescript-eslint/naming-convention */
const positionDesc = `
提示框浮层的位置，默认不设置时位置会跟随鼠标的位置。

可选：

* Array

通过数组表示提示框浮层的位置，支持数字设置绝对位置，百分比设置相对位置。

示例:
\`\`\`javascript
// 绝对位置，相对于容器左侧 10px, 上侧 10 px
position: [10, 10]
// 相对位置，放置在容器正中间
position: ['50%', '50%']
\`\`\`

* Function

回调函数，格式如下：

\`\`\`javascript
(point: Array, params: Object|Array.<Object>, dom: HTMLDomElement, rect: Object, size: Object) => Array
\`\`\`

**参数**
point: 鼠标位置，如 [20, 40]。
params: 同 formatter 的参数相同。
dom: tooltip 的 dom 对象。
rect: 只有鼠标在图形上时有效，是一个用 x , y , width , height四个属性表达的图形包围盒。
size: 包括 dom 的尺寸和 echarts 容器的当前尺寸，例如：{contentSize: [width, height], viewSize: [width, height]}。

**返回值：**
可以是一个表示 tooltip 位置的数组，数组值可以是绝对的像素值，也可以是相 百分比。
也可以是一个对象，如：{left: 10, top: 30}，或者 {right: '20%', bottom: 40}。

如下示例：

\`\`\`javascript
position: function (point, params, dom, rect, size) {
    // 固定在顶部
    return [point[0], '10%'];
}
\`\`\`

或者：

\`\`\`javascript
position: function (pos, params, dom, rect, size) {
    // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
    var obj = {top: 60};
    obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
    return obj;
}
\`\`\`

* 'inside'
    鼠标所在图形的内部中心位置，只在 trigger 为 'item' 的时候有效。

* 'top'
    鼠标所在图形上侧，只在 trigger 为 'item' 的时候有效。

* 'left'
    鼠标所在图形左侧，只在 trigger 为 'item' 的时候有效。

* 'right'
    鼠标所在图形右侧，只在 trigger 为 'item' 的时候有效。

* 'bottom'
    鼠标所在图形底侧，只在 trigger 为 'item' 的时候有效。
`;

const radiusDesc = `
的半径。可以为如下类型：

* number：直接指定外半径值。
* string：例如，'20%'，表示外半径为可视区尺寸（容器高宽中较小一项）的 20% 长度。
* Array.<number|string>：数组的第一项是内半径，第二项是外半径。每一项遵从上述 number string 的描述。
`;

const minOpenDesc = `
当 type 为 piecewise 且使用 min/max/splitNumber 时，此参数有效。当值为 true 时，界面上会额外多出一个『< min』的选块。
`;

const targetDesc = `
意义同 html <a> 标签中的 target，参见 series-treemap.data.link。可选值为：'blank' 或 'self'。
`;

const optionToContentDesc = `
\`\`\`typescript
(option:Object) => HTMLDomElement|string
\`\`\`

自定义 dataView 展现函数，用以取代默认的 textarea 使用更丰富的数据编辑。可以返回 dom 对象或者 html 字符串。

如下示例使用表格展现数据值：

\`\`\`javascript
optionToContent: function(opt) {
    var axisData = opt.xAxis[0].data;
    var series = opt.series;
    var table = '<table style="width:100%;text-align:center"><tbody><tr>'
                 + '<td>时间</td>'
                 + '<td>' + series[0].name + '</td>'
                 + '<td>' + series[1].name + '</td>'
                 + '</tr>';
    for (var i = 0, l = axisData.length; i < l; i++) {
        table += '<tr>'
                 + '<td>' + axisData[i] + '</td>'
                 + '<td>' + series[0].data[i] + '</td>'
                 + '<td>' + series[1].data[i] + '</td>'
                 + '</tr>';
    }
    table += '</tbody></table>';
    return table;
}
\`\`\`
`;

/** 在指定选项后添加选项 */
const appendPatch = {
    'angleAxis': {
        'axisLine.symbolOffset': {
            'axisLine.lineStyle': {
                desc: '坐标轴线的样式',
                uiControl: {
                    type: 'Object',
                },
            },
        },
    },
};

/** 为选项添加内容 */
const contentPatch = {
    // 'title': {
    //     'target': {
    //         uiControl: {
    //             type: 'enum',
    //             options: "'blank','self'",
    //         },
    //     },
    //     'textStyle.fontWeight': {
    //         uiControl: {
    //             options: "'normal','bold','bolder','lighter',100,200,300,400,500,600,700",
    //         },
    //     },
    //     'textStyle.textShadowColor': {
    //         uiControl: {
    //             default: "'transparent'",
    //         },
    //     },
    //     'textStyle.overflow': {
    //         uiControl: {
    //             options: "'none','truncate','break','breakAll'",
    //         },
    //     },
    //     'textStyle.lineOverflow': {
    //         uiControl: {
    //             type: 'enum',
    //             options: "'none','truncate'",
    //         },
    //     },
    //     'textStyle.rich.<style_name>.color': {
    //         uiControl: {
    //             default: "'#fff'",
    //         },
    //     },
    //     'textStyle.rich.<style_name>.fontWeight': {
    //         uiControl: {
    //             options: "'normal','bold','bolder','lighter',100,200,300,400,500,600,700",
    //         },
    //     },
    //     'textStyle.rich.<style_name>.backgroundColor': {
    //         uiControl: {
    //             type: ['color', 'Object'],
    //             default: "'transparent'",
    //         },
    //     },
    //     'textStyle.rich.<style_name>.shadowColor': {
    //         uiControl: {
    //             default: "'transparent'",
    //         },
    //     },
    //     'textStyle.rich.<style_name>.shadowOffsetX': {
    //         uiControl: {
    //             default: '0',
    //         },
    //     },
    //     'textStyle.rich.<style_name>.shadowOffsetY': {
    //         uiControl: {
    //             default: '0',
    //         },
    //     },
    //     'textStyle.rich.<style_name>.textShadowColor': {
    //         uiControl: {
    //             default: "'transparent'",
    //         },
    //     },
    //     'textStyle.rich.<style_name>.textShadowOffsetX': {
    //         uiControl: {
    //             default: '0',
    //         },
    //     },
    //     'textStyle.rich.<style_name>.textShadowOffsetY': {
    //         uiControl: {
    //             default: '0',
    //         },
    //     },
    // },
};

module.exports = {
    positionDesc,
    radiusDesc,
    minOpenDesc,
    targetDesc,
    optionToContentDesc,
    appendPatch,
    contentPatch,
};
