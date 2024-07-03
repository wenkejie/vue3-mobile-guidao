<script setup lang="ts">
import { getDepartments, GetUsers } from '@/api'

import createFrom from './createFrom.vue';

definePage({
  name: 'detail',
  meta: {
    level: 2,
    title: 'detail',
    i18n: '文件信息',
  },
})

interface Item {
  text: string;
  children?: Array<{ text: string; id: number }>;
  id?: number;
}


const mainActiveIndex = ref(0);
const activeIds = ref<number[]>([]);
const treeItems = ref<Item[]>([]);

const activeNames = ref<string[]>([]);

const { t } = useI18n()

const setting = ref({
  src: "https://m.baidu.com/"
})

const formInfo = ref({});

const datePicker = ref(false)
const personPicker = ref(false)

const showCreateDialog = ref(true)

const fieldValue = ref('');
const cascaderValue = ref('');
// 选项列表，children 代表子选项，支持多级嵌套

const treeOptions = ref([]);
// const activeIds = ref([]);
const activeIndex = ref(0);


const showOptions = ref(false);
const showPopup = () => {
  showOptions.value = true;
};

const gotoCreateForm = () =>{

}

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
  })
}


// 异步整体调用整个树形结构包括子集，请求过慢
// const departMentInit = async () => {
//   try {
//     const res = await getDepartments({ parentId: "13" });
//     treeItems.value = []; // 初始化treeItems

//     for (const element of res) {
//       const child = await loadChildren(element.id);
//       treeItems.value.push({
//         text: element.fullName,
//         id: element.id,
//         children: child
//       });
//     }
//   } catch (error) {
//     console.error("Error loading departments:", error);
//   }
// };

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

// 点击加载子集事件
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
  const ids = [...activeIds.value]; // 深拷贝 activeIds.value
  // console.log(ids,'ids')
  const index = ids.indexOf(Number(item.id));
  // console.log(index,'index')
  if (index == -1) {
    ids.push(item.id);
    return false
  } else {
    ids.splice(index, 1);
    console.log(activeIds.value,'activeIds.value')
    return false
  }
  activeIds.value = ids; // 更新 activeIds.value
  formInfo.value.persons =  ids
  console.log(activeIds.value,'activeIds.value')
};


departMentInit()
</script>

<template>
  <Container>
    <div class="text-right mt-20">
      <van-button type="primary" class="important-mr-10" size="small" @click="showPopup">下发</van-button>
      <van-button type="warning" size="small" to="/file/createFrom">答题</van-button>
    </div>
    <iframe class="mt-10" ref="iframe"
      src="http://172.20.153.9:8012/onlinePreview?url=aHR0cDovLzE3Mi4xNi43MC41MDo1MDAxL2FwaS9kb2N1bWVudC8yY2FkNmY5MC04YjUzLTQ3MTUtOTlmMS0wNzU3OGE1MTE5NDMvb2ZmaWNldmlld2VyP3Rva2VuPTFiYzFlZjQxLThmYjQtNDJiZC05OTVmLTcxZmJhYzU2MGFkNyZpc1ZlcnNpb249ZmFsc2UmZnVsbGZpbGVuYW1lPea1i+ivlS5qcGc="
      width="100%" height="600px" style="border: 1px solid #ddd;" frameborder="0" allowfullscreen></iframe>
    <!-- 左侧弹出 -->
    <van-popup v-model:show="showOptions" position="bottom" title="下发设置" :style="{ width: '100%', height: '80%' }">
      <h3 class="text-center">下发设置</h3>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="formInfo.dateTime" is-link readonly name="datePicker" label="时间选择" placeholder="点击选择时间"
            @click="datePicker = true" />
          <van-field v-model="activeIds" is-link readonly name="persons" label="人员选择" placeholder="点击下发人员"
            @click="personPicker = true;" />
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
    <van-calendar v-model:show="datePicker" type="range" @confirm="onDateConfirm" />
    <van-popup v-model:show="personPicker" position="bottom">
      <van-tree-select v-model:active-id="activeIds" v-model:main-active-index="mainActiveIndex" :items="treeItems"
        @click-nav="onClickNav" @click-item="onClickItem" />
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
</style>
