<script setup lang="ts">
import { getCirculationList } from '@/api'
definePage({
  name: 'list',
  meta: {
    level: 1,
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

const state = reactive({
  form: {
    storeType: 1,
  },
  queryParams: {
    Skip: 0,
    isAdmin: true,
    isFinished: true,
    PageSize: 20,
    SearchQuery: '',
  },
})
const { queryParams, form } = toRefs(state)

function onLoad() {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  loading.value = true
  getCirculationList(queryParams.value).then((res) => {
    if (res.statusCode === 200) {
      list.value = res.data.list
      loading.value = false
      finished.value = true
    }
  })
}

const baseUrl = ref(`${import.meta.env.VITE_APP_PUBLIC_PATH}`)

function getFileIcon(type) {
  if (type === '.png' || type === '.jpg')
    return `${baseUrl.value}/img/CarbonImage.png`
  else if (type === '.word')
    return `${baseUrl.value}/img/CarbonDocumentWordProcessor.png`
  else
    return `${baseUrl.value}/img/CarbonDocumentPdf.png`
}

function onConfirm() {
  itemRef.value.toggle()
  // 或者
  // menuRef.value.close();
}
</script>

<template>
  <Container class="my-15 pb-52">
    <div class="search-grid">
      <van-search
        v-model="queryParams.SearchQuery"
        show-action
        label="文件名"
        @cancel="handelCancel"
        @search="handelSearch"
        placeholder="请输入搜索关键词"
      ></van-search>
    </div>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
      <van-cell v-for="item in list" :key="item" value="内容" :title="item" center :to="`/profile/circulateDetail?id=${item.id}`">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="w-240">
            <van-image
              width="2.6rem" height="2.6rem" fit="contain" position="left"
              :src="getFileIcon(item.documentExtension)" class="mr-5 inline-block v-middle"
            />
            <div class="inline-block v-middle">
              <span class="block overflow-hidden whitespace-nowrap line-height-none" style="text-overflow: ellipsis;width: 200px;">{{ item.documentName }}</span>
              <span class="mt-5 block c-gray line-height-none font-size-12">截止日:{{ $formatDate(item.createdDate, 'yyyy-MM-dd HH:mm') }}</span>
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
.search-grid {
  box-shadow: var(--van-dropdown-menu-shadow);
  margin-bottom: 15px;

  & /deep/ .van-dropdown-menu__bar {
    box-shadow: none;
  }

  .van-search {
    border-bottom: 1px solid #f5f5ff;
  }
}
</style>
