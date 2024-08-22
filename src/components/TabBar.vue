<script setup lang="ts">
const { t } = useI18n()
const active = ref(0)
const route = useRoute()

const display = computed(() => {
  if (route.meta.level && route.meta.level !== 2)
    return true
  return false
})

const curNumber = ref(null)

const claimTypes = ref('')
onUpdated(() => {
  // claimTypes.value = JSON.parse(localStorage.getItem('userInfo')).claimTypes
  // console.log(claimTypes.value.includes('*:*'))
  // console.log(display, 'display')
  console.log(localStorage.getItem('ufNumber'), 'ufNumber')
  curNumber.value = localStorage.getItem('ufNumber')
})
</script>

<template>
  <van-tabbar v-show="display" v-model="active" style="padding-top: 5px;" route>
    <!-- <van-tabbar-item replace to="/file">
      {{ t('layouts.file') }}
      <template #icon>
        <div class="i-carbon:document" />
      </template>
    </van-tabbar-item> -->
    <van-tabbar-item replace to="/transform">
      {{ t('layouts.circulate') }}
      <template #icon>
        <van-badge :content="curNumber">
          <div class="i-carbon:ibm-openshift-container-platform-on-vpc-for-regulated-industries" />
        </van-badge>
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
