<template>
    <div></div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    computed: {
        options() {
            /** @type EChartsOption */
            return {};
            // 操作1：在位置 (11, 21) 按下 `Enter` 键
            // 预期1：与 html 文件对应的预期相同
        }
    }
});
</script>