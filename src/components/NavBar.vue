<script setup lang="ts">
const route = useRoute()
const router = useRouter()

function onBack() {
  if (window.history.state.back)
    history.back()
  else
    router.replace('/login')
}

const { t } = useI18n()

const isHasArrow = ref(false)

const title = computed(() => {
  if (!route.meta)
    return ''
  return route.meta.i18n ? t(route.meta.i18n) : (route.meta.title || '')
})
</script>

<template>
  <VanNavBar
    v-show="title"
    :title="title"
    :fixed="true"
    clickable :left-arrow="title === '登录' ? false : true"
    @click-left="onBack"
  />
</template>
