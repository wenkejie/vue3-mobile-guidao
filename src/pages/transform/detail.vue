<template>
  <Container>
    <van-steps :active="active" class="mt10" v-if="isFinished == false">
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
    <div class="text-right mt-20" v-if="isFinished == false">
      <van-button type="primary" size="small" block @click="gotoAnsQues" v-if="hasQuestion && activeInfo === 1">答题</van-button>
      <van-button type="primary" size="small" block @click="ansFormSubmit" v-else>确认</van-button>
    </div>
    <van-popup v-model:show="showOptions" position="bottom" title="下发设置" :style="{ width: '100%', height: '80%' }">
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
    </van-popup>
    <van-popup v-model:show="showQuestions" position="bottom" title="答题" :style="{ width: '100%', height: '80%' }">
      <h3 class="text-center">请根据文件内容答题</h3>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-for="(answer, index) in formData.userAnswers" :key="answer.questionId" disabled :label="quesTitleArr[index] + ':'" label-width="120px" label-align="right" @click="handleSelect(answer.questionId, index)" v-model="curSelectLabel[index]" />
        </van-cell-group>
        <div class="m-15">
          <van-button round block type="primary" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </van-popup>
    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker :columns="curQuestion" @confirm="onConfirm" @cancel="() => showPicker = false" :columns-field-names="customFieldName" />
    </van-popup>
    <van-calendar v-model:show="datePicker" type="range" @confirm="onDateConfirm" />
    <van-popup v-model:show="personPicker" position="bottom">
      <van-tree-select v-model:active-id="activeIds" v-model:main-active-index="mainActiveIndex" :items="treeItems" @click-nav="onClickNav" @click-item="onClickItem" />
    </van-popup>
  </Container>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRoute } from 'vue-router';
import { showNotify } from 'vant';
import { getDepartments, GetUsers, getDocumentToken, getTransFormDetail, updateCirculationDocStudy, updateCirculationDocAnswer } from '@/api';
import { fromByteArray } from 'base64-js';
import router from '@/router/index';

definePage({
  name: 'detail',
  meta: {
    level: 2,
    title: 'detail',
    i18n: '文件信息',
  },
})

const mainActiveIndex = ref(0);
const activeIds = ref<number[]>([]);
const treeItems = ref([]);
const setting = ref({ src: "https://m.baidu.com/" });
const route = useRoute();
const formInfo = ref({});
const datePicker = ref(false);
const personPicker = ref(false);
const showOptions = ref(false);
const showQuestions = ref(false);
const viewUrl = ref('');
const showPicker = ref(false);

const isFinished = ref(false)

const formData = ref({
  circulationDocId: "",
  userAnswers: []
});
const activeInfo = ref(1);
const hasQuestion = ref(false);
const studyInfo = ref({
  circulationDocId: '',
  studyDuration: 0
});
const quesTitleArr = ref([]);
const questions = ref([]);
const curQuestion = ref([]);
const curIndex = ref(0);
const curSelectLabel = ref([]);
const startTime = ref(0);
const readingTime = ref(0);
const timer = ref<number | null>(null);

const roundedReadingTime = computed(() => Math.round(readingTime.value));

const onSubmit = (values) => {
  console.log('submit', formData.value);
  handleActiveInfo(2);
  updateCirculationDocAnswer(formData.value).then(res => {
    if (res.statusCode === 200) {
      showNotify({ type: 'success', message: '提交成功' });
      handleActiveInfo(2);
      // route.histroy('-1')
      router.go(-1)
    } else {
      showNotify({ type: 'danger', message: res.msg });
      activeInfo.value = 1;
    }
  });
};

const formatDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const onDateConfirm = (values) => {
  const [start, end] = values;
  datePicker.value = false;
  formInfo.value.dateTime = `${formatDate(start)} ~ ${formatDate(end)}`;
};

const loadDepartments = () => {
  getDepartments({ parentId: "13" }).then((res) => {
    res.forEach(element => {
      treeItems.value.push({ text: element.fullName, id: element.id });
    });
  });
};

const loadChildren = async (id: number) => {
  return GetUsers({ DepartmentId: id, Skip: 1, PageSize: 50 }).then((res) => {
    return res.map(element => ({ text: element.firstName, id: Number(element.userName) }));
  });
};

const onClickNav = async (index) => {
  mainActiveIndex.value = index;
  const item = treeItems.value[index];
  if (!item.children) {
    const children = await loadChildren(item.id);
    item.children = children;
  }
};

const onClickItem = (item) => {
  const ids = [...activeIds.value];
  const index = ids.indexOf(item.id);
  if (index === -1) {
    ids.push(item.id);
  } else {
    ids.splice(index, 1);
  }
  activeIds.value = ids;
  formInfo.value.persons = ids;
};

const handleView = () => {
  const _id = route.query.documentId;
  const _documentName = route.query.name;
  isFinished.value = route.query.isFinished;
  getDocumentToken(_id).then((res) => {
    const fileToken = res.result;
    const apiUrl = 'http://172.16.70.50:5001/';
    const newUrl = `${apiUrl}api/document/${_id}/officeviewer?token=${fileToken}&isVersion=false&fullfilename=${_documentName}`;
    const byteArray = new TextEncoder().encode(newUrl);
    const stringData = fromByteArray(byteArray);
    viewUrl.value = 'http://172.20.153.9:8012/onlinePreview?url=' + stringData;
  });
};

const startTracking = () => {
  if (timer.value === null) {
    startTime.value = Date.now();
    timer.value = window.setInterval(updateReadingTime, 1000);
  }
};

const stopTracking = () => {
  if (timer.value !== null) {
    clearInterval(timer.value);
    timer.value = null;
    updateReadingTime();
  }
};

const updateReadingTime = () => {
  const currentTime = Date.now();
  readingTime.value += (currentTime - startTime.value) / 1000;
  startTime.value = currentTime;
};

const handleVisibilityChange = () => {
  if (document.visibilityState === 'hidden') {
    stopTracking();
  } else if (document.visibilityState === 'visible') {
    startTracking();
  }
};

const onConfirm = ({ selectedOptions }) => {
  curSelectLabel.value[curIndex.value] = selectedOptions.map(option => option.description).join('/');
  formData.value.userAnswers[curIndex.value].answerId = selectedOptions[0]?.id;
  showPicker.value = false;
};

const handleSelect = (id, index) => {
  // console.log(questions.value.find(ques => ques.questionId === id).options,'questions.value.find(ques => ques.questionId === id)')
  curQuestion.value = questions.value.find(ques => ques.questionId === id).options;
  curIndex.value = index;
  showPicker.value = true;
};

const handleActiveInfo = (num) => {
  if (num === 2) {
    studyInfo.value.studyDuration = Math.round(readingTime.value);
    updateCirculationDocStudy(studyInfo.value).then(res => {
      if (res.statusCode === 200) {
        activeInfo.value = num;
      } else {
        showNotify({ type: 'danger', message: res.msg });
        activeInfo.value = 0;
      }
    });
  } else {
    activeInfo.value = num;
  }
};

const gotoAnsQues = () => {
  handleActiveInfo(2);
  showQuestions.value = true;
};

onMounted(() => {
  startTracking();
  handleView();
  getTransFormDetail({ id: route.query.id }).then(res => {
    formData.value.circulationDocId = res.data.id
    studyInfo.value.circulationDocId = res.data.id
    // quesTitleArr.value = res.data.circulationQuestions.map(ele => ele.title);
    // questions.value = res.data.circulationQuestions.map(ele => ele);
    hasQuestion.value = res.data.isHasQuestion
    res.data.circulationQuestions.forEach(field => {
        questions.value.push(
          {
              questionId: field.circulationQuestionAnswers[0].circulationQuestionId,
              options: field.circulationQuestionAnswers
          })
          formData.value.userAnswers.push({
                questionId: field.circulationQuestionAnswers[0].circulationQuestionId,
                answerId: ""
              });
          quesTitleArr.value.push(field.title)
      });
  });

  document.addEventListener('visibilitychange', handleVisibilityChange);
});

onBeforeUnmount(() => {
  stopTracking();
  document.removeEventListener('visibilitychange', handleVisibilityChange);
});

const customFieldName = {
  text: 'description',
  value: 'id',
};
</script>

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
