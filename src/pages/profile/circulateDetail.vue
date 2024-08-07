<script setup lang="ts">
import EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'
import { getCirculationDetail } from '@/api'

definePage({
  name: 'circulateDetail',
  meta: {
    level: 1,
    title: 'circulateDetail',
    i18n: '统计数据',
  },
})

const route = useRoute()

const { t } = useI18n()

const info = ref({})
const loading = ref(false)
const finished = ref(false)


const headers: Header[] = [
  { text: '用户名', value: 'fullName' },
  { text: '学习情况', value: 'isStudyOver' },
  { text: '学习时间(秒)', value: 'studyDuration'},
  { text: '答题情况', value: 'answerStatus', width: 80 },
]

const items = ref([])

function onLoad() {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  loading.value = true
  let curId = route.query.id ? route.query.id : ''
  getCirculationDetail(curId).then((res) => {
    if (res.statusCode === 200) {
      info.value = res.data
      items.value = res.data.circulationDocUsers
      loading.value = false
      finished.value = true
    }
  })
}

onUpdated(() => {
  onLoad()
})

onMounted(() => {
  onLoad()
})
</script>

<template>
  <Container>
    <div class="ui-grid">
      <h3 class="m-0 pb-15 pt-10">
        文件名
      </h3>
      <van-row>
        <!-- <van-col span="8">
          <p class="m-0 pb-5">
            12009
          </p>
          <p class="m-0">
            查阅总次数
          </p>
        </van-col> -->
        <van-col span="12">
          <p class="m-0 pb-5">
            {{ info.studyOverCount }}/{{ info.totalCount }}
          </p>
          <p class="m-0">
            查阅人数
          </p>
        </van-col>
        <van-col span="12">
          <p class="m-0 pb-5">
            {{ info.answeringRate * 100 }}<em class="font-size-5">%</em>
          </p>
          <p class="m-0">
            答题完成率
          </p>
        </van-col>
      </van-row>
    </div>
    <div>
      <EasyDataTable :headers="headers" :items="items" :hide-footer="true"
        class="mt-15">
        <template #item-isStudyOver="{ isStudyOver }">
          <span v-if="isStudyOver === true">已学习</span>
          <span v-else>未学习</span>
        </template>
        <template #item-answerStatus="{ answerStatus }">
          <span v-if="answerStatus === 0">未作答</span>
          <span v-if="answerStatus === 1">未通过</span>
          <span v-if="answerStatus === 2">通过</span>
        </template>
      </EasyDataTable>
    </div>
  </Container>
</template>

<style lang="less">
.ui-grid {
  margin-top: 20px;
  padding-bottom: 20px;
  background-color: #fff;
  box-shadow: 2px 2px 3px #ddd;
  border-radius: 5px;
  text-align: center;
  color: #666;
}
</style>
