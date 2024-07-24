<script setup lang="ts">
definePage({
  name: 'file',
  meta: {
    level: 1,
    title: 'file',
    i18n: '文件',
  },
})

import { listDocument } from '@/api'

const list = ref([])
const loading = ref(false)
const finished = ref(false)

const dateInfo = ref('')

const menuRef = ref(null)
const itemRef = ref(null)
const menuValue = ref(0)
const switch1 = ref(false)
const switch2 = ref(false)
const options = [
  { text: '未下发', value: false },
  { text: '已下发', value: true },
]

const state = reactive({
  form: {
    storeType: 1,
  },
  queryParams: {
    Skip: 0,
    isAdmin: false,
    isFinished: false,
    IsCirculation: false,
    Status: 0,
    PageSize: 20,
    SearchQuery: '',
  },
})
const { queryParams, form } = toRefs(state)

const result = ref('')
function dateSelected({ selectedValues }) {
  result.value = selectedValues.join('-')
  menuRef.value?.close()
}

function handelClosed() {
  menuRef.value?.close()
}


function onLoad() {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  loading.value = true
  listDocument(queryParams.value).then((res) => {
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

const date = ref('')
const show = ref(false)

const formatDate = date => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
function onDateConfirm(values) {
  const [start, end] = values
  show.value = false
  date.value = `${formatDate(start)} ~ ${formatDate(end)}`
}

function handelSearch() {
  onLoad()
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
      <van-dropdown-menu ref="menuRef">
        <van-dropdown-item v-model="queryParams.IsCirculation" :options="options" @change="handelSearch" />
      </van-dropdown-menu>
    </div>

    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
      <van-cell v-for="item in list" :key="item" value="内容" is-link :title="item" center :to="`/file/detail?id=${item.id}&name=${item.name}&isCirculation=${item.isCirculation}`">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="w-240">
            <van-image
              width="2.6rem" height="2.6rem" fit="contain" position="left"
              :src="getFileIcon(item.extension)" class="mr-5 inline-block v-middle"
            />
            <div class="inline-block v-middle">
              <span class="block overflow-hidden whitespace-nowrap line-height-none" style="text-overflow: ellipsis;width: 200px;">{{ item.name }}</span>
              <span class="mt-5 block c-gray line-height-none font-size-12">截止日:{{ $formatDate(item.createdDate, 'yyyy-MM-dd HH:mm') }}</span>
            </div>
          </div>
        </template>
      </van-cell>
    </van-list>
    <van-calendar v-model:show="show" type="range" @confirm="onDateConfirm" />
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

.date-btn {
  display: block;
  height: var(--van-dropdown-menu-height);
  line-height: var(--van-dropdown-menu-height);
  background: var(--van-dropdown-menu-background);
  text-align: center;
  color: #666;
  border-right: 1px solid #f5f5ff;
}
</style>
