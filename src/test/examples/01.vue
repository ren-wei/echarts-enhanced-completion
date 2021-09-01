<template>
    <div></div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    computed: {
        options() {
            /** @type EChartsOption */
            return {
                title: {},
            };
            // 操作和预期中位置改为 (12, 27) 和 (12, 25) 其他与 html 相同
        }
    }
});
</script>