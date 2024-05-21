<script setup lang="ts">
import { closeToast, showLoadingToast } from 'vant';

import { getDepartments, GetUsers } from '@/api'

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
const userOptions = ref([]);

const items = [
  {
    text: '浙江',
    children: [
      { text: '杭州', id: 1 },
      { text: '温州', id: 2 },
      { text: '宁波', id: 3, disabled: true },
    ],
  },
  {
    text: '江苏',
    children: [
      { text: '南京', id: 4 },
      { text: '无锡', id: 5 },
      { text: '徐州', id: 6 },
    ],
  },
  { text: '福建', disabled: true },
];

const treeOptions = ref([]);
// const activeIds = ref([]);
const activeIndex = ref(0);


// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }) => {
  // console.log(selectedOptions[0].id,'id')
  personInit(selectedOptions[0].id)
  // personPicker.value = false;
  // fieldValue.value = selectedOptions.map((option) => option.text).join('/');
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

function departMentInit() {
  getDepartments({ parentId: "13" }).then((res) => {
    // treeOptions.value = res
    res.forEach(element => {
      treeItems.value.push({
        text: element.fullName,
        id: element.id,
      })
    });
    // personPicker.value = true;
    console.log(treeItems.value, 'treeOptions.value')
  })
}

function personInit(id) {
  if (id) {
    GetUsers({ DepartmentId: id, Skip: 1, PageSize: 50 }).then((res) => {
      userOptions.value = res
      console.log(options.value)
    })
  }

}

function onChange(value) {
  if (
    value === options.value[0].value &&
    options.value[0].children.length === 0
  ) {
    // 模拟数据请求
    showLoadingToast('加载中...');
    setTimeout(() => {
      GetUsers({ parentId: options.value[0].id }).then((res) => {
        options.value[0].children = res;
      })
      closeToast();
    }, 1000);
  }
};
function onFinish2(selectedOptions) {
  // show.value = false;
  fieldValue.value = selectedOptions.map((option) => option.text).join('/');
};


interface Item {
  text: string;
  children?: Array<{ text: string; id: number }>;
  id?: number;
}


const mainActiveIndex = ref(0);
const activeIds = ref<number[]>([]);
const treeItems = ref<Item[]>([]);

const loadChildren = async (id: number) => {
  // 模拟异步加载数据
  return new Promise<Item[]>(resolve => {
    setTimeout(() => {
      GetUsers({ DepartmentId: id, Skip: 1, PageSize: 50 }).then((res) => {
        let userArr = []
        res.forEach(element => {
          userArr.push({ text: element.firstName, id: Number(element.userName) })
        });
        console.log(userArr, 'userArr')
        resolve(userArr);
      })

      // resolve([
      //   { text: `子分类 ${id}-1`, id: id * 10 + 1 },
      //   { text: `子分类 ${id}-2`, id: id * 10 + 2 },
      // ]);
      // resolve(userArr);
    }, 1000);
  });
};

const onClickNav = async (index: number) => {
  mainActiveIndex.value = index;
  const item = treeItems.value[index];
  if (!item.children) {
    // 只有在没有加载过 children 时才进行加载
    const children = await loadChildren(item.id!);
    item.children = children;
  }
};

const onClickItem = (item: { id: number }) => {
  // activeIds.value = [...activeIds.value].push(item.id)
  // console.log(item.id,'item.id')
  const ids = [...activeIds.value]; // 深拷贝 activeIds.value
  // console.log(ids,'ids')
  const index = ids.indexOf(Number(item.id));
  // console.log(index,'index')
  if (index == -1) {
    ids.push(item.id);
  } else {
    ids.splice(index, 1);
    console.log(activeIds.value,'activeIds.value')
    return false
  }
  activeIds.value = ids; // 更新 activeIds.value
  console.log(activeIds.value,'activeIds.value')
};


departMentInit()
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
          <van-field v-model="formInfo.depart" is-link readonly name="area" label="部门选择" placeholder="点击下发人员"
            @click="personPicker = true;" />
          <van-field v-model="formInfo.person" is-link readonly name="area" label="人员选择" placeholder="点击下发人员"
            @click="personPicker = true; personInit()" />
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
      <!-- <van-cascader v-model="formInfo.person" title="下发设置" @change="onChange" :options="options" :field-names="{ 'text': 'fullName', 'value': 'id' }" @close="personPicker = false"
        @finish="onFinish" /> -->
      <!-- <van-picker-group title="预约时间" :tabs="['选择部门', '选择人员']" @confirm="onConfirm" @cancel="onCancel">
        <van-cascader v-model="formInfo.person" @change="onFinish" :options="options"
          :field-names="{ 'text': 'fullName', 'value': 'id' }" />
        <van-cascader :options="userOptions" :field-names="{ 'text': 'firstName', 'value': 'userName' }" @finish="onFinish2" />
      </van-picker-group> -->
      <van-tree-select v-model:active-id="activeIds" v-model:main-active-index="mainActiveIndex" :items="treeItems"
        @click-nav="onClickNav" @click-item="onClickItem" />
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
