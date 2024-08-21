<script setup lang="ts">
import { listTransformFile, toggleDocumentStarred } from '@/api'
import { showNotify } from 'vant'
definePage({
  name: 'transform',
  meta: {
    level: 1,
    title: 'transform',
    i18n: '我的传阅',
  },
})

const loading = ref(false)
const finished = ref(false)

const dateInfo = ref('')

const menuRef = ref(null)
const itemRef = ref(null)
const menuValue = ref(0)
const switch1 = ref(false)
const switch2 = ref(false)
const options = [
  { text: '未查阅', value: false },
  { text: '已查阅', value: true },
]

const state = reactive({
  form: {
    storeType: 1,
  },
  queryParams: {
    Skip: 0,
    isAdmin: false,
    isFinished: false,
    PageSize: 20,
    SearchQuery: '',
  },
})
const { queryParams, form, rules } = toRefs(state)

const dataList = ref([])

const result = ref('')
function dateSelected({ selectedValues }) {
  result.value = selectedValues.join('-')
  menuRef.value?.close()
}

function handelClosed() {
  menuRef.value?.close()
}

function onLoad() {
  // queryParams.value.Skip = 0
  getFileList()
}

function getFileList() {
  // let rootId = localStorage.getItem('rootId') ? localStorage.getItem('rootId') : 'a4d06132-d76c-49b5-8472-2bf78ac4147e'
  loading.value = true
  listTransformFile(queryParams.value).then((res) => {
    if (res.statusCode === 200) {
      dataList.value = res.data.list
      loading.value = false
      finished.value = true
      if(res.data.totalCount > 0 && queryParams.value.isFinished === false) showNotify({ type: 'danger', message: `当前未阅数：${res.data.totalCount}` })
    }
  })
}

function handelStarred(id) {
  toggleDocumentStarred({documentId: id}).then((res) => {
    console.log(res)
  })
}

function handelCancel() {
  queryParams.value = {
    Skip: 0,
    isAdmin: false,
    isFinished: false,
    PageSize: 20,
    SearchQuery: '',
  },
  getFileList()
}

function handelSearch() {
  getFileList()
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

const baseUrl = ref(`${import.meta.env.VITE_APP_PUBLIC_PATH}`)

function getFileIcon(type) {
  if (type === '.png' || type === '.jpg')
    return `${baseUrl.value}/img/CarbonImage.png`
  else if (type === '.word')
    return `${baseUrl.value}/img/CarbonDocumentWordProcessor.png`
  else
    return `${baseUrl.value}/img/CarbonDocumentPdf.png`
}


getFileList()

onUpdated(() => {
  getFileList()
})
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
        <van-dropdown-item v-model="queryParams.isFinished" :options="options" @change="handelSearch" />
      </van-dropdown-menu>
    </div>

    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
      <van-cell v-for="item in dataList" :key="item" value="内容" is-link :title="item.documentName" center :to="`/transform/detail?documentId=${item.documentId}&id=${item.id}&name=${item.documentName}&isFinished=${Boolean(item.isFinished)}`">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #icon>
          <van-icon name="star-o" style="display: block;padding-right: 5px;" @click.stop="handelStarred(item.documentId)"/>
        </template>
        <template #title>
          <div class="w-240">
            <van-image
              width="2.6rem" height="2.6rem" fit="contain" position="left"
              :src="getFileIcon(item.documentExtension)" class="mr-5 inline-block v-middle"
            />
            <div class="inline-block v-middle">
              <span class="block overflow-hidden whitespace-nowrap line-height-none" style="text-overflow: ellipsis;width: 200px;">{{ item.documentName }}</span>
              <span class="mt-5 block c-gray line-height-none font-size-12">截止日:{{ $formatDate(item.endDate, 'yyyy-MM-dd HH:mm') }}</span>
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
