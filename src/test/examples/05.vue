<template>
    <div></div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    computed: {
        options1() {
            /** @type EChartsOption */
            return {
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
        },
        // 操作和预期与 html 相同
    }
});
</script>