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
            // 操作1：在位置 (12, 27) 按下 `Enter` 键
            // 预期1：与 html 文件对应的预期相同
            //
            // 操作2：在位置 (12, 25) 按下 `Enter` 键
            // 预期2：与 html 文件对应的预期相同
        }
    }
});
</script>