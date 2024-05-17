<script setup lang="ts">
import { closeToast, showLoadingToast } from 'vant';

import { getDepartments } from '@/api'

definePage({
  name: 'detail',
  meta: {
    level: 2,
    title: 'detail',
    i18n: '文件信息',
  },
})

const { t } = useI18n()

const setting = ref({
  src: "https://m.baidu.com/"
})

const formInfo = ref({});

const datePicker = ref(false)
const personPicker = ref(false)

const fieldValue = ref('');
const cascaderValue = ref('');
// 选项列表，children 代表子选项，支持多级嵌套
const options = ref([]);
// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }) => {
  personPicker.value = false;
  fieldValue.value = selectedOptions.map((option) => option.text).join('/');
};

const showOptions = ref(false);
const showPopup = () => {
  showOptions.value = true;
};

function seadFile() {
  console.log('onload')
}

const onSubmit = (values) => {
  console.log('submit', values);
};

const formatDate = date => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
function onDateConfirm(values) {
  const [start, end] = values
  datePicker.value = false
  formInfo.value.dateTime = `${formatDate(start)} ~ ${formatDate(end)}`
}

function departMentInit(){
  getDepartments({parentId: "13"}).then((res) => {
    options.value = res
    console.log(options.value)
  })
}

function onChange(value){
  if (
    value === options.value[0].value &&
    options.value[0].children.length === 0
  ) {
    // 模拟数据请求
    showLoadingToast('加载中...');
    setTimeout(() => {
      getDepartments({parentId: options.value[0].id}).then((res) => {
        options.value[0].children = res;
        closeToast();
      })
      
    }, 1000);
  }
};
// function onFinish2(selectedOptions){
//   // show.value = false;
//   fieldValue.value = selectedOptions.map((option) => option.text).join('/');
// };

</script>

<template>
  <Container>
    <div class="text-right mt-20">
      <van-button type="primary" class="mr-5" size="small" @click="showPopup">下发</van-button>
      <van-button type="warning" size="small">答题</van-button>
    </div>
    <iframe class="mt-10" ref="iframe"
      src="http://172.20.153.9:8012/onlinePreview?url=aHR0cDovLzE3Mi4xNi43MC41MDo1MDAxL2FwaS9kb2N1bWVudC9mMmQ3ZjhiNi1iMDEwLTQwZTctODE2OC0yMjY3YmQxMjhjOTgvb2ZmaWNldmlld2VyP3Rva2VuPTE3NjZlMjQ2LTk5Y2UtNDE3OC1iODc2LTc5NWIzMWQ0NDQ3ZCZpc1ZlcnNpb249ZmFsc2UmZnVsbGZpbGVuYW1lPTIwMjTosaHlsbHpqazmi4kyLmRvY3g%3D"
      width="100%" height="600px" style="border: 1px solid #ddd;" frameborder="0" allowfullscreen></iframe>
    <!-- 左侧弹出 -->
    <van-popup v-model:show="showOptions" position="bottom" title="下发设置" :style="{ width: '100%', height: '80%' }">
      <h3 class="text-center">下发设置</h3>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="formInfo.dateTime" is-link readonly name="datePicker" label="时间选择" placeholder="点击选择时间"
            @click="datePicker = true" />
          <van-field v-model="formInfo.person" is-link readonly name="area" label="部门选择" placeholder="点击下发人员"
            @click="personPicker = true;departMentInit()" />
          <van-field v-model="formInfo.person" is-link readonly name="area" label="人员选择" placeholder="点击下发人员"
            @click="personPicker = true" />
        </van-cell-group>
        <div class="m-15">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>

    </van-popup>
    <!-- <van-popup v-model:show="datePicker" position="bottom">
      <van-date-picker @confirm="onConfirm" @cancel="datePicker = false" />
    </van-popup> -->
    <van-calendar v-model:show="datePicker" type="range" @confirm="onDateConfirm" />
    <van-popup v-model:show="personPicker" position="bottom">
      <van-cascader v-model="formInfo.person" title="下发设置" @change="onChange" :options="options" :field-names="{ 'text': 'fullName', 'value': 'id' }" @close="personPicker = false"
        @finish="onFinish" />
    </van-popup>
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
