<script setup lang="ts">
import { fromByteArray } from 'base64-js'

import { showNotify } from 'vant'
import { GetUsers, getDepartments, getDocumentToken, getTransFormDetail, updateCirculationDocStudy } from '@/api'

definePage({
  name: 'detail2',
  meta: {
    level: 2,
    title: 'detail',
    i18n: '文件信息',
  },
})

interface Item {
  text: string
  children?: Array<{ text: string, id: number }>
  id?: number
}

const mainActiveIndex = ref(0)
const activeIds = ref<number[]>([])
const treeItems = ref<Item[]>([])

const activeNames = ref<string[]>([])

const { t } = useI18n()

const setting = ref({
  src: 'https://m.baidu.com/',
})

const route = useRoute()

const formInfo = ref({})

const datePicker = ref(false)
const personPicker = ref(false)

const showCreateDialog = ref(true)

const fieldValue = ref('')
const cascaderValue = ref('')
// 选项列表，children 代表子选项，支持多级嵌套

const treeOptions = ref([])
// const activeIds = ref([]);
const activeIndex = ref(0)

const timeLimit = ref(0)

const showOptions = ref(false)
function showPopup() {
  showOptions.value = true
}

const showQuestions = ref(false)
function showQuestionPopup() {
  showQuestions.value = true
}

const viewUrl = ref('')

function gotoCreateForm() {

}

function seadFile() {
  console.log('onload')
}

function onSubmit(values) {
  console.log('submit', formData.value)
}

const formatDate = date => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
function onDateConfirm(values) {
  const [start, end] = values
  datePicker.value = false
  formInfo.value.dateTime = `${formatDate(start)} ~ ${formatDate(end)}`
}

function departMentInit() {
  getDepartments({ parentId: '13' }).then((res) => {
    // treeOptions.value = res
    res.forEach((element) => {
      treeItems.value.push({
        text: element.fullName,
        id: element.id,
      })
    })
  })
}

async function loadChildren(id: number) {
  // 模拟异步加载数据
  return new Promise<Item[]>((resolve) => {
    setTimeout(() => {
      GetUsers({ DepartmentId: id, Skip: 1, PageSize: 50 }).then((res) => {
        const userArr = []
        res.forEach((element) => {
          userArr.push({ text: element.firstName, id: Number(element.userName) })
        })
        console.log(userArr, 'userArr')
        resolve(userArr)
      })
    }, 1000)
  })
}

// 点击加载子集事件
async function onClickNav(index: number) {
  mainActiveIndex.value = index
  const item = treeItems.value[index]
  if (!item.children) {
    // 只有在没有加载过 children 时才进行加载
    const children = await loadChildren(item.id!)
    item.children = children
  }
}

function onClickItem(item: { id: number }) {
  const ids = [...activeIds.value] // 深拷贝 activeIds.value
  // console.log(ids,'ids')
  const index = ids.indexOf(Number(item.id))
  // console.log(index,'index')
  if (index == -1) {
    ids.push(item.id)
    return false
  }
  else {
    ids.splice(index, 1)
    console.log(activeIds.value, 'activeIds.value')
    return false
  }
  activeIds.value = ids // 更新 activeIds.value
  formInfo.value.persons = ids
  console.log(activeIds.value, 'activeIds.value')
}

function handleView() {
  const _id = route.query.documentId
  const _documentName = route.query.name
  getDocumentToken(_id).then((res) => {
    // console.log(res, 'res')
    const fileToken = res.result

    const host = location.host
    const protocol = location.protocol
    const apiUrl = 'http://172.16.70.50:5001/'
    const url = apiUrl === '/' ? `${protocol}//${host}/` : apiUrl
    // let originalString = `http://127.0.0.1:8887/api/document/${row.id}/download?token=${fileToken}&isVersion=true&fullfilename=${row.name}`;
    const newUrl = `${url}api/document/${_id}/officeviewer?token=${fileToken}&isVersion=false&fullfilename=${_documentName}`
    // console.log(newUrl)
    const byteArray = new TextEncoder().encode(newUrl) // 将字符串转换为字节数组
    // console.log(byteArray, 'byteArray')
    const stringData = fromByteArray(byteArray)
    // console.log(stringData, 'stringData')

    // let encodedString = window.btoa(stringData);
    // window.open('http://172.20.153.9:8012/onlinePreview?url=' + stringData)
    viewUrl.value = `http://172.20.153.9:8012/onlinePreview?url=${stringData}`
  })
}

const formData = ref({
  circulationDocId: '',
  userAnswers: [],
})
const activeInfo = ref(1)

// 是否需要答题
const hasquestion = ref(false)

const studyInfo = ref({
  circulationDocId: '',
  studyDuration: 0,
})

const quesTitleArr = ref([])
const questions = ref([])
const curQuestion = ref([])
const curIndex = ref(0)// 当前选中的答案索引
const curSelectLabel = ref([])

const showPicker = ref(false)

function handelSelect(id, index) {
  curIndex.value = index
  showPicker.value = true
  curQuestion.value = getOptions(id)
}

function getOptions(questionId) {
  const question = questions.value.find(q => q.questionId === questionId)
  return question ? question.options : []
}

// let startTime = 0;
// let interval = null;
// 阅读计时器
// function startTracking(){
//   startTime = Date.now();
//   interval = setInterval(() => {
//     studyInfo.value.studyDuration = Date.now() - startTime;
//   }, 100);
//   console.log(studyInfo.value.studyDuration,'开始')
// };

// const stopTracking = () => {
//   clearInterval(interval);
//   studyInfo.value.studyDuration = Date.now() - startTime;
//   console.log(studyInfo.value.studyDuration,'结束')
// };
const startTime = ref(0)
function startTracking() {
  if (!startTime.value) { // 确保只有在未开始计时时才记录开始时间
    startTime.value = Date.now()
    console.log(studyInfo.value.studyDuration, 'startTime')
  }
}
function stopTracking() {
  if (startTime.value) {
    const endTime = Date.now()
    const duration = (endTime - startTime.value) / 1000 // 转换为秒
    studyInfo.value.studyDuration += duration
    startTime.value = 0 // 重置开始时间
    console.log(studyInfo.value.studyDuration, 'endTime')
  }
}

function onConfirm({ selectedOptions }) {
  curSelectLabel.value[curIndex.value] = selectedOptions[0]?.description
  formData.value.userAnswers[curIndex.value].answerId = selectedOptions[0]?.id
  showPicker.value = false
}

const customFieldName = {
  text: 'description',
  value: 'id',
}

// 重置数据表单
function resetInfo() {
  formData.value = {
    circulationDocId: '',
    userAnswers: [],
  }

  studyInfo.value = {
    circulationDocId: '',
    studyDuration: 0,
  }
  timeLimit.value = 0
  quesTitleArr.value = []
  questions.value = []
  proxy.resetForm('formRef')
  handelQuery()
}

function getDetailInfo() {
  const _id = route.query.id
  getTransFormDetail({ id: _id }).then((res) => {
    // questionsForm.value = res.data.circulationQuestions
    // 处理响应数据
    formData.value.circulationDocId = res.data.id
    studyInfo.value.circulationDocId = res.data.id
    hasquestion.value = res.data.isHasQuestion
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
      })
      quesTitleArr.value.push(field.title)
    })
    timeLimit.value = res.data.browseDuration
    // console.log(formData.value, 'formData.value')
    // console.log(questions.value, 'questions')
    // console.log(quesTitleArr.value, 'quesTitleArr.value')
    // openFileView.value = true
  })
}
getDetailInfo()

function gotoAnsQues() {
  // console.log(studyInfo.value.studyDuration,'studyInfo.value.studyDuration')
  if (studyInfo.value.studyDuration > timeLimit.value) {
    handelActiveInfo(2)
    showQuestionPopup()
  }
  else {
    showNotify({ type: 'danger', message: `学习时间不足${timeLimit.value}秒` })
  }
}

function handelActiveInfo(info) {
  // clearInterval(interval);
  studyInfo.value.studyDuration = Math.round(studyInfo.value.studyDuration) * 1000
  // console.log(studyInfo.value.studyDuration,'studyInfo.value.studyDuration')
  updateCirculationDocStudy(studyInfo.value).then((res) => {
    if (res.statusCode == 200)
      activeInfo.value = info
      // resetInfo()

    else
      console.log(res.msg)
      // resetInfo()
  })
}

function ansFormSubmit() {
  if (activeInfo.value == 1) {
    handelActiveInfo(1)
    resetInfo()
    openFileView.value = false
  }
  else {
    updateCirculationDocAnswer(formData.value).then((res) => {
      if (res.statusCode == 200) {
        ElMessage({
          message: '提交成功',
          type: 'success',
        })
        resetInfo()
        openFileView.value = false
      }
      else {
        ElMessage({
          message: res.msg,
          type: 'error',
        })
        activeInfo.value = 1
      }
    })
  }
}

handleView()
// departMentInit()
</script>

<template>
  <Container>
    <van-steps :active="active" class="mt10">
      <van-step>查看</van-step>
      <van-step v-if="hasquestion == true">答题</van-step>
      <van-step>确认</van-step>
    </van-steps>
    <div class="iframe-grid mt-10" @touchstart="startTracking" @touchend="stopTracking">
      <iframe
        ref="iframe" :src="viewUrl" width="100%" height="500px"
        frameborder="0" allowfullscreen
      ></iframe>
    </div>
    <div class="mt-20 text-right">
      <!-- <van-button type="primary" class="important-mr-10" size="small" @click="showPopup">下发</van-button> -->
      <van-button v-if="hasquestion == true && activeInfo == 1" type="primary" size="small" block @click="gotoAnsQues">答题</van-button>
      <van-button v-else type="primary" size="small" block @click="ansFormSubmit">确认</van-button>
    </div>
    <!-- 左侧弹出 -->
    <van-popup v-model:show="showOptions" position="bottom" title="下发设置" :style="{ width: '100%', height: '80%' }">
      <h3 class="text-center">下发设置</h3>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="formInfo.dateTime" is-link readonly name="datePicker" label="时间选择" placeholder="点击选择时间"
            @click="datePicker = true"
          />
          <van-field
            v-model="activeIds" is-link readonly name="persons" label="人员选择" placeholder="点击下发人员"
            @click="personPicker = true;"
          />
          <!-- <van-field v-model="formInfo.person" is-link readonly name="area" label="人员选择" placeholder="点击下发人员"
            @click="personPicker = true; personInit()" /> -->
        </van-cell-group>
        <div class="m-15">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </van-popup>
    <van-popup v-model:show="showQuestions" position="bottom" title="答题" :style="{ width: '100%', height: '80%' }">
      <h3 class="text-center">请根据文件内容答题</h3>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-for="(answer, index) in formData.userAnswers" :key="answer.questionId" v-model="curSelectLabel[index]" disabled="true" :label="`${quesTitleArr[index]}:`"
            label-width="120px" label-align="right" @click="handelSelect(answer.questionId, index)"
          >
          </van-field>
          <!-- <van-field v-model="formInfo.person" is-link readonly name="area" label="人员选择" placeholder="点击下发人员"
            @click="personPicker = true; personInit()" /> -->
        </van-cell-group>
        <div class="m-15">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </van-popup>
    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker
        :columns="curQuestion"
        :columns-field-names="customFieldName"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
    <van-calendar v-model:show="datePicker" type="range" @confirm="onDateConfirm" />
    <van-popup v-model:show="personPicker" position="bottom">
      <van-tree-select
        v-model:active-id="activeIds" v-model:main-active-index="mainActiveIndex" :items="treeItems"
        @click-nav="onClickNav" @click-item="onClickItem"
      />
    </van-popup>
    <!-- 动态组件 -->
    <!-- <van-dialog v-model:show="showCreateDialog">
      <component :is="createFrom"></component>
    </van-dialog> -->
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

.iframe-grid {
  position: relative;
  width: 100%;
  height: 500px;
  iframe {
    // position: absolute;left: 0;top: 0;bottom: 0;right: 0;z-index: 1;
    width: 100%;
    height: 100%;
    border: none;
    pointer-events: none; /* 确保 iframe 内部不会拦截触摸事件 */
  }
}

.van-field--disabled .van-field__label {
  color: #666 !important;
}
.van-field__control:disabled {
  color: #666 !important;
}
</style>
