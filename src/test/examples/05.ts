// @ts-nocheck
/** @type EChartsOption */
const options1 = {
    title: {
        id: 1,
        show: true,
        text: 'This is text',
        link: 'https://www.example.com',
    },
    tooltip: {
        textStyle: {
            fontStyle: 'normal',
        },
    },
    series: [
        {
            type: 'line',
            name: 'myline',
            id: 1,
        },
    ],
};

// 操作和预期与html相同
