<script setup lang="ts">
definePage({
  name: 'list',
  meta: {
    level: 2,
    title: 'list',
    i18n: '下发列表',
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
    if (list.value.length >= 15)
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
  <Container class="my-15 pb-52">
    <van-search v-model="value" placeholder="请输入搜索关键词" />
    <van-dropdown-menu ref="menuRef" class="mb-10">
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
      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
      <van-cell v-for="item in list" :key="item" value="内容" :title="item" center>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div>
            <van-image
              width="2.6rem"
              height="2.6rem"
              fit="contain"
              position="left"
              src="../../../public/img/CarbonDocumentWordProcessor.png"
              class="mr-5 inline-block v-middle"
            />
            <div class="inline-block v-middle">
              <span class="block line-height-none">item</span>
              <span class="mt-5 block c-gray line-height-none">2019-09-01</span>
            </div>
          </div>
        </template>
        <template #value>
          <van-button type="primary" size="mini" to="/profile/circulateDetail">
            统计
          </van-button>
        </template>
      </van-cell>
    </van-list>
  </Container>
</template>

<style lang="less" scoped>
</style>
