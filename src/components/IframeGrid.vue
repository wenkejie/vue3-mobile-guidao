<script setup lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    props: {
        src: {
            type: String,
            required: true
        },
        width: {
            type: [String, Number],
            default: '100%'
        },
        height: {
            type: [String, Number],
            default: '100%'
        }
    },
    setup(props) {
        const iframe = ref(null);

        return {
            iframe
        };
    }
});
</script>

<template>
    <iframe ref="iframe" :src="src" :width="width" :height="height" frameborder="0" allowfullscreen></iframe>
</template>

<style scoped lang="less">
/* Add your component styles here */
iframe {
    width: 100%;
    height: 100%;
}
</style>
