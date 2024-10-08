<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { showNotify } from 'vant'
import { fromByteArray } from 'base64-js'
import { GetUsers, getDepartments, getDocumentToken, getTransFormDetail, updateCirculationDocAnswer, updateCirculationDocStudy, downFile, fileDownload } from '@/api'
import router from '@/router/index'

import { showConfirmDialog } from 'vant'

definePage({
  name: 'detail',
  meta: {
    level: 2,
    title: 'detail',
    i18n: '文件信息',
  },
})

const mainActiveIndex = ref(0)
const activeIds = ref<number[]>([])
const treeItems = ref([])
const setting = ref({ src: 'https://m.baidu.com/' })
const route = useRoute()
const formInfo = ref({})
const datePicker = ref(false)
const personPicker = ref(false)
const showOptions = ref(false)
const showQuestions = ref(false)
const viewUrl = ref('')
const showPicker = ref(false)

const isFinished = ref(null)

const { proxy } = getCurrentInstance()

const formData = ref({
  circulationDocId: '',
  userAnswers: [],
})
const activeInfo = ref(1)
const hasQuestion = ref(false)
const studyInfo = ref({
  circulationDocId: '',
  studyDuration: 0,
})
const timeLimit = ref(0)


const quesTitleArr = ref([])
const questions = ref([])
const curQuestion = ref([])
const curIndex = ref(0)
const curSelectLabel = ref([])
const startTime = ref(0)
const readingTime = ref(0)
const timer = ref<number | null>(null)

const roundedReadingTime = computed(() => Math.round(readingTime.value))

function onSubmit(values) {
  // console.log('submit', formData.value)
  // handleActiveInfo(2)
  updateCirculationDocAnswer(formData.value).then((res) => {
    if (res.statusCode === 200) {
      showNotify({ type: 'success', message: '提交成功' })
      // handleActiveInfo(2)
      // route.histroy('-1')
      router.go(-1)
    }
    else {
      showNotify({ type: 'danger', message: res.msg })
      activeInfo.value = 1
    }
  })
}

const formatDate = date => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

function onDateConfirm(values) {
  const [start, end] = values
  datePicker.value = false
  formInfo.value.dateTime = `${formatDate(start)} ~ ${formatDate(end)}`
}

function loadDepartments() {
  getDepartments({ parentId: '13' }).then((res) => {
    res.forEach((element) => {
      treeItems.value.push({ text: element.fullName, id: element.id })
    })
  })
}

async function loadChildren(id: number) {
  return GetUsers({ DepartmentId: id, Skip: 1, PageSize: 50 }).then((res) => {
    return res.map(element => ({ text: element.firstName, id: Number(element.userName) }))
  })
}

async function onClickNav(index) {
  mainActiveIndex.value = index
  const item = treeItems.value[index]
  if (!item.children) {
    const children = await loadChildren(item.id)
    item.children = children
  }
}

function onClickItem(item) {
  const ids = [...activeIds.value]
  const index = ids.indexOf(item.id)
  if (index === -1)
    ids.push(item.id)
  else
    ids.splice(index, 1)

  activeIds.value = ids
  formInfo.value.persons = ids
}

function handleView() {
  const _id = route.query.documentId
  const _documentName = route.query.name
  // isFinished.value = route.query.isFinished;
  getDocumentToken(_id).then((res) => {
    const fileToken = res.result
    const host = location.host
    const protocol = location.protocol
    const apiUrl = import.meta.env.VITE_APP_API_HOST
    const url = apiUrl === '/' ? `${protocol}//${host}/` : apiUrl
    const newUrl = `${url}api/document/${_id}/officeviewer?token=${fileToken}&isVersion=false&fullfilename=${_documentName}`
    const byteArray = new TextEncoder().encode(newUrl)
    const stringData = fromByteArray(byteArray)
    viewUrl.value = `http://172.20.153.9:8012/onlinePreview?url=${stringData}`
  })
}

function startTracking() {
  if (timer.value === null) {
    startTime.value = Date.now()
    timer.value = window.setInterval(updateReadingTime, 1000)
  }
}

function stopTracking() {
  if (timer.value !== null) {
    clearInterval(timer.value)
    timer.value = null
    updateReadingTime()
  }
}

function updateReadingTime() {
  const currentTime = Date.now()
  readingTime.value += Math.floor((currentTime - startTime.value) / 1000)
  startTime.value = currentTime
  console.log(readingTime.value, 'readingTime')
}

function handleVisibilityChange() {
  if (document.visibilityState === 'hidden')
    stopTracking()
  else if (document.visibilityState === 'visible')
    startTracking()
}

function onConfirm({ selectedOptions }) {
  curSelectLabel.value[curIndex.value] = selectedOptions.map(option => option.description).join('/')
  formData.value.userAnswers[curIndex.value].answer = selectedOptions[0]?.description
  showPicker.value = false
}

function handleSelect(id, index) {
  // console.log(questions.value.find(ques => ques.questionId === id).options,'questions.value.find(ques => ques.questionId === id)')
  curQuestion.value = questions.value.find(ques => ques.questionId === id).options
  curIndex.value = index
  showPicker.value = true
}

function handleActiveInfo(num) {
  if (num === 2) {
    studyInfo.value.studyDuration = Math.round(readingTime.value)
    updateCirculationDocStudy(studyInfo.value).then((res) => {
      if (res.statusCode === 200) {
        activeInfo.value = num
        // router.back(-1)
      }
      else {
        showNotify({ type: 'danger', message: res.msg })
        activeInfo.value = 0
      }
    })
  }
  else {
    activeInfo.value = num
  }
}

function gotoConfirm() {
  stopTracking()
  // console.log(readingTime.value > timeLimit.value, readingTime.value,timeLimit.value,'readingTime.value > timeLimit.value')
  if (readingTime.value > (timeLimit.value)) {
    handleActiveInfo(2)
    router.back(-1)
  } else {
    showNotify({ type: 'warning', message: `学习时间不足${timeLimit.value}秒` })
    startTracking()
  }
}

function gotoAnsQues() {
  stopTracking()
  if (readingTime.value > timeLimit.value) {
    handleActiveInfo(2)
    showQuestions.value = true
  } else {
    showNotify({ type: 'warning', message: `学习时间不足${timeLimit.value}秒` })
    startTracking()
  }
}

function handelConfirm() {
  handleActiveInfo(2)
  router.back(-1)
}

function copyText(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      copySuccess.value = true
      ElMessage({
        message: '文本已复制到剪贴板',
        type: 'success',
      })
    }).catch(err => {
      console.error('复制失败: ', err)
      ElMessage({
        message: '复制失败，请重试',
        type: 'error',
      })
    })
  } else {
    console.log('浏览器不支持 Clipboard API')
    fallbackCopyText(text)
  }
}

function fallbackCopyText(text) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'  // 防止页面滚动
  textarea.style.opacity = '0'  // 隐藏文本框
  document.body.appendChild(textarea)
  textarea.select()
  try {
    document.execCommand('copy')
    copySuccess.value = true
    ElMessage({
      message: '文本已复制到剪贴板',
      type: 'success',
    })
  } catch (err) {
    console.error('传统方法复制失败: ', err)
    ElMessage({
      message: '复制失败，请手动复制',
      type: 'error',
    })
  } finally {
    document.body.removeChild(textarea)
  }
}

async function handelDownLoad() {
  // await fileDownload(route.query.documentId).then((res) => {
  //   console.log(res, 'res')
  // })
  let downFileUrl = import.meta.env.VITE_APP_API_HOST + `api/Document/${route.query.documentId}/downloadAnon`
  showConfirmDialog({
    title: '复制当前下载地址去浏览器下载',
    confirmButtonText: '复制',
    message: downFileUrl
  })
    .then(() => {
      console.log(downFileUrl,'downFileUrl')
      copyText(downFileUrl)
      // on confirm
    })
    .catch(() => {
      // on cancel
    });
}

onBeforeMount(() => {
  isFinished.value = route.query.isFinished
  // console.log(typeof (isFinished.value), 'isFinished')
})

onMounted(() => {
  // isFinished.value = route.query.isFinished ? route.query.isFinished : false
  // console.log(isFinished.value,'isFinished')
  startTracking()
  handleView()
  getTransFormDetail({ id: route.query.id }).then((res) => {
    formData.value.circulationDocId = res.data.id
    studyInfo.value.circulationDocId = res.data.id
    // quesTitleArr.value = res.data.circulationQuestions.map(ele => ele.title);
    // questions.value = res.data.circulationQuestions.map(ele => ele);
    hasQuestion.value = res.data.isHasQuestion
    timeLimit.value = Number(res.data.browseDuration)
    res.data.circulationQuestions.forEach((field) => {
      questions.value.push(
        {
          questionId: field.circulationQuestionAnswers[0].circulationQuestionId,
          options: field.circulationQuestionAnswers,
        },
      )
      formData.value.userAnswers.push({
        questionId: field.circulationQuestionAnswers[0].circulationQuestionId,
        answerId: '',
        type: field.type,
      })
      quesTitleArr.value.push(field.title)
    })
  })

  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onBeforeUnmount(() => {
  stopTracking()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})

const customFieldName = {
  text: 'description',
  value: 'id',
}
</script>

<template>
  <Container>
    <van-steps v-if="isFinished == 'false'" :active="active" class="mt10">
      <van-step>查看</van-step>
      <van-step v-if="hasQuestion">答题</van-step>
      <van-step>确认</van-step>
    </van-steps>
    <!-- <div>
      阅读时间: {{ roundedReadingTime }} 秒
    </div> -->
    <div class="iframe-grid mt-10">
      <iframe ref="iframe" :src="viewUrl" width="100%" height="500px" frameborder="0" allowfullscreen></iframe>
    </div>
    <div v-if="isFinished == 'false'" class="mt-20 text-right">
      <div v-if="hasQuestion">
        <van-button v-if="activeInfo === 1" type="primary" size="small" block @click="gotoAnsQues">答题</van-button>
        <van-button v-if="activeInfo === 2" type="primary" size="small" block @click="handelConfirm">确认</van-button>
      </div>
      <van-button v-else type="primary" size="small" block @click="gotoConfirm(2)">确认</van-button>
      <van-button type="default" style="margin-top: 5px;" size="small" block @click="handelDownLoad">下载</van-button>
    </div>
    <!-- <van-popup v-model:show="showOptions" position="bottom" title="下发设置" :style="{ width: '100%', height: '80%' }">
      <h3 class="text-center">下发设置</h3>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="formInfo.dateTime" is-link readonly name="datePicker" label="时间选择" placeholder="点击选择时间" @click="datePicker = true" />
          <van-field v-model="activeIds" is-link readonly name="persons" label="人员选择" placeholder="点击下发人员" @click="personPicker = true" />
        </van-cell-group>
        <div class="m-15">
          <van-button round block type="primary" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </van-popup> -->
    <van-popup v-model:show="showQuestions" position="bottom" title="答题" :style="{ width: '100%', height: '80%' }" @click-overlay="activeInfo = 1">
      <h3 class="text-center">请根据文件内容答题</h3>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <div v-for="(item, index) in formData.userAnswers">
            <van-field v-if="item.type === 0" placeholder="请选择答案" :key="item.questionId" v-model="curSelectLabel[index]" disabled label-width="160px" label-align="right" @click="handleSelect(item.questionId, index)" >
              <template #label>
                <span style="color: #333;">
                  {{ quesTitleArr[index] }}:
                </span>
              </template>
            </van-field>
            <van-field v-else placeholder="请输入答案" :key="item.questionId" v-model="item.answer" :label="`${quesTitleArr[index]}:`" label-width="160px" label-align="right"></van-field>
          </div>
        </van-cell-group>
        <div class="m-15">
          <van-button round block type="primary" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </van-popup>
    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker :columns="curQuestion" :columns-field-names="customFieldName" @confirm="onConfirm" @cancel="() => showPicker = false" />
    </van-popup>
    <van-calendar v-model:show="datePicker" type="range" @confirm="onDateConfirm" />
    <van-popup v-model:show="personPicker" position="bottom">
      <van-tree-select v-model:active-id="activeIds" v-model:main-active-index="mainActiveIndex" :items="treeItems" @click-nav="onClickNav" @click-item="onClickItem" />
    </van-popup>
  </Container>
</template>

<style scoped>
.iframe-grid {
  display: grid;
  gap: 10px;
}

.mt10 {
  margin-top: 10px;
}

.mt-20 {
  margin-top: 20px;
}

.text-right {
  text-align: right;
}

.m-15 {
  margin: 15px;
}

.text-center {
  text-align: center;
}
</style>
