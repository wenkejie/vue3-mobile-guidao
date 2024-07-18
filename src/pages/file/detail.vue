<script setup lang="ts">
import { GetUsers, getDepartments, getDocumentToken } from '@/api'

import { fromByteArray } from 'base64-js'

definePage({
  name: 'fileDetail',
  meta: {
    level: 2,
    title: 'fileDetail',
    i18n: '文件信息',
  },
})

const route = useRoute()

interface Item {
  text: string
  children?: Array<{ text: string, id: number }>
  id?: number
}

const mainActiveIndex = ref(0)
const activeIds = ref<number[]>([])
const selectActiveIds = ref([])
// const activeIds = ref([])
const treeItems = ref<Item[]>([])

const activeNames = ref<string[]>([])

const { t } = useI18n()

const setting = ref({
  src: 'https://m.baidu.com/',
})

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

const viewUrl = ref('')// 预览地址

const showOptions = ref(false)
function showPopup() {
  showOptions.value = true
}

const show = ref(true);

function gotoCreateForm() {

}

function seadFile() {
  console.log('onload')
}

function onSubmit(values) {
  console.log('submit', formInfo)
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

async function loadChildren(id: number) {
  // 模拟异步加载数据
  return new Promise<Item[]>((resolve) => {
    setTimeout(() => {
      GetUsers({ DepartmentId: id, Skip: 1, PageSize: 50 }).then((res) => {
        let _arr = res.data.list
        const userArr = []
        _arr.forEach((element) => {
          userArr.push({ text: element.firstName, id: Number(element.userName) })
        })
        console.log(userArr, 'userArr')
        resolve(userArr)
      })

      // resolve([
      //   { text: `子分类 ${id}-1`, id: id * 10 + 1 },
      //   { text: `子分类 ${id}-2`, id: id * 10 + 2 },
      // ]);
      // resolve(userArr);
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
  const ids = [...selectActiveIds.value]; // 深拷贝 activeIds.value
  const index = ids.indexOf(Number(item.id));
  if (index === -1) {
    ids.push(item.id);
  } else {
    ids.splice(index, 1);
  }

  activeIds.value = ids; // 更新 activeIds.value
  formInfo.value.persons = ids;
}

function handleView() {
  const _id = route.query.id
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

// 问卷区
const formData = ref({
  isHasQuestion: true,
});

const qsForm = ref([
  {
    title: '',
    correctAnswer: '',
    answers: [{ description: '' }],
  },
]);

const addQsItem = () => {
  qsForm.value.push({
    title: '',
    correctAnswer: '',
    answers: [{ description: '' }],
  });
};

const delQsItem = (index) => {
  qsForm.value.splice(index, 1);
};

const addAnsItem = (index) => {
  qsForm.value[index].answers.push({ description: '' });
};

const delAnsItem = (qIndex, aIndex) => {
  qsForm.value[qIndex].answers.splice(aIndex, 1);
};

handleView()
departMentInit()
</script>

<template>
  <Container>
    <div class="mt-20 text-right">
      <van-button type="primary" class="important-mr-10" size="small" @click="showPopup">下发</van-button>
      <van-button type="warning" size="small" to="/file/createFrom">答题</van-button>
    </div>
    <iframe ref="iframe" :src="viewUrl" class="mt-10" width="100%" height="500px" frameborder="0"
      allowfullscreen></iframe>
    <!-- 左侧弹出 -->
    <van-popup v-model:show="showOptions" position="bottom" title="下发设置" :style="{ width: '100%', height: '90%' }">
      <h3 class="text-center">下发设置</h3>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="formInfo.dateTime" is-link readonly name="datePicker" label="时间选择" placeholder="点击选择时间" @click="datePicker = true" />
          <van-field v-model="formInfo.persons" is-link readonly name="persons" label="人员选择" placeholder="点击下发人员" @click="personPicker = true;" />
          <van-field
            v-model="formInfo.browseDuration"
            name="传阅时长"
            label="传阅时长"
            placeholder="传阅时长"
          >
            <template #right-icon>
              <span>秒</span>
            </template>
          </van-field>
          <van-field name="switch1" label="到期推送" label-width="150px">
            <template #input>
              <van-switch v-model="formInfo.isExpirePush" />
            </template>
          </van-field>
          <van-field name="switch2" label="到期后不可查阅" label-width="150px">
            <template #input>
              <van-switch v-model="formInfo.isExpireUnableLook" />
            </template>
          </van-field>
          <van-field name="switch2" label="是否答题" label-width="150px">
            <template #input>
              <van-switch v-model="formInfo.ishasQues" />
            </template>
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
    <van-dialog v-model:show="show" title="标题" show-cancel-button>
      <div class="qs-grid">
        <p class="qs-title">
          <span class="span">题目新增：</span>
          <van-button type="primary" size="mini" @click="addQsItem">添加题目</van-button>
        </p>
        <van-form :model="qsForm" style="font-size: 12px;">
          <van-row gutter="5" v-for="(item, i) in qsForm" :key="i" style="border-bottom: 1px dashed #ddd;">
            <van-col :span="12">
              <van-field
                :name="'title' + i"
                :label="'题目' + (i + 1)"
                label-width="40px"
                v-model="item.title"
                placeholder="请输入题目"
              />
              <van-field
                name="correctAnswer"
                label="答案"
                label-width="40px"
                v-model="item.correctAnswer"
                placeholder="请输入答案"
              />
              <van-cell>
                <van-button type="danger" size="mini" @click="delQsItem(i)">删除问题</van-button>
              </van-cell>
            </van-col>
            <van-col :span="12">
              <div v-for="(cell, j) in item.answers" :key="j">
                <van-field
                  :name="'answer' + i + '_' + j"
                  :label="'选项' + (j + 1)"
                  label-width="40px"
                  v-model="cell.description"
                  placeholder="选项"
                >
                  <template #button>
                    <van-button type="danger" size="mini" icon="cross" @click="delAnsItem(i, j)"></van-button>
                  </template>
                </van-field>
              </div>
              <van-cell>
                <van-button type="primary" size="mini" @click="addAnsItem(i)">添加选项</van-button>
              </van-cell>
            </van-col>
            <van-divider dashed />
          </van-row>
        </van-form>
      </div>
    </van-dialog>
    <van-calendar v-model:show="datePicker" type="range" @confirm="onDateConfirm" />
    <van-popup v-model:show="personPicker" position="bottom">
      <van-tree-select
        v-model:active-id="selectActiveIds" v-model:main-active-index="mainActiveIndex" :items="treeItems"
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

.ans-input-btn {
  color: red;
}

.ans-input {
  display: flex;
  align-items: center;
}

.qs-title{
  padding-left: 20px;
  span{
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
