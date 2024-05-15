<script setup lang="ts">
definePage({
  name: 'circulate',
  meta: {
    level: 1,
    title: 'circulate',
    i18n: '传阅',
  },
})

const list = ref([])
const loading = ref(false)
const finished = ref(false)

const menuRef = ref(null)
const itemRef = ref(null)
const menuValue = ref(0)
const switch1 = ref(false)
const switch2 = ref(false)
const options = [
  { text: '全部商品', value: 0 },
  { text: '新款商品', value: 1 },
  { text: '活动商品', value: 2 },
]

function onLoad() {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 10; i++)
      list.value.push(list.value.length + 1)

    // 加载状态结束
    loading.value = false

    // 数据全部加载完成
    if (list.value.length >= 40)
      finished.value = true
  }, 1000)
}

function onConfirm() {
  itemRef.value.toggle()
  // 或者
  // menuRef.value.close();
}
</script>

<template>
  <Container class="list-grid">
    <van-search v-model="value" placeholder="请输入搜索关键词" />
    <van-dropdown-menu ref="menuRef">
      <van-dropdown-item v-model="menuValue" :options="options" />
      <van-dropdown-item ref="itemRef" title="筛选">
        <van-cell center title="包邮">
          <template #right-icon>
            <van-switch v-model="switch1" />
          </template>
        </van-cell>
        <van-cell center title="团购">
          <template #right-icon>
            <van-switch v-model="switch2" />
          </template>
        </van-cell>
        <div style="padding: 5px 16px;">
          <van-button type="primary" round block @click="onConfirm">
            确认
          </van-button>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </Container>
</template>

<style lang="less" scoped>
.list-grid {
  margin: 15px 0;
}
</style>
