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
                series: [
                    {
                        type: 'line',
                    },
                ],
            };
        },
        // 操作和预期中位置改为 (14, 38) 其他与 html 相同
    }
});
</script>