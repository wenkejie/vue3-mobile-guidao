<script setup lang="ts">
const { t } = useI18n()
const active = ref(0)
const route = useRoute()

const display = computed(() => {
  if (route.meta.level && route.meta.level !== 2)
    return true
  return false
})
</script>

<template>
  <van-tabbar v-show="display" v-model="active" route>
    <!-- <van-tabbar-item replace to="/file">
      {{ t('layouts.file') }}
      <template #icon>
        <div class="i-carbon:document" />
      </template>
    </van-tabbar-item> -->
    <van-tabbar-item replace to="/transform">
      {{ t('layouts.circulate') }}
      <template #icon>
        <div class="i-carbon:ibm-openshift-container-platform-on-vpc-for-regulated-industries" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/profile">
      {{ t('layouts.profile') }}
      <template #icon>
        <div class="i-carbon:user" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
