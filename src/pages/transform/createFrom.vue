<script setup lang="ts">
definePage({
  name: 'createForm',
  meta: {
    level: 2,
    title: 'form',
    i18n: '新增答题',
  },
})


interface Answer {
  answer_id: number;
  description: string;
}

interface LineAnswer {
  line_value: number;
  line_end_value: number;
  line_tag: string;
  line_end_tag: string;
}

interface Content {
  language: string;
  title: string;
  answer: Answer[];
  line_answer: LineAnswer;
  text_answer: string;
}

interface Question {
  question_id: number;
  types: string;
  is_required: boolean;
  content: Content[];
}

interface Name {
  questionnaire_name: string;
  desc: string;
  language: string;
}

interface FormData {
  display_name: string;
  name: Name[];
  repeat_submit: boolean;
  question: Question[];
}

const drag = ref(false);

const auth = ref(false);
const loading = ref(false);
const selectOptions = ref([{ value: '单选题', text: '单选题' }, { value: '多选题', text: '多选题' }, { value: '文本题', text: '文本题' }]);
const langCode = ref(['cn', 'en', 'kr', 'jp', 'fr', 'de', 'ru', 'sp', 'po', 'it', 'nl', 'id', 'tr', 'thai', 'zh', 'fa', 'ro', 'ar']);
const langList = ref(['中文', '英语', '韩语', '日语', '法语', '德语', '俄语', '西班牙语', '葡萄牙语', '意大利语', '荷兰语', '印度语', '土耳其语', '泰语', '繁体中文', '波斯语', '罗马尼亚语', '阿拉伯语']);
const defaultLang = ref('英语');
const tabLang = ref('中文');
const editableTabs = ref(['中文']);
const addLangVisible = ref(false);
const defaultOption = ref('单选题');
const addRadio = ref('添加选项');
const lineOptions = ref([0, 1]);
const lineEndOptions = ref([5, 10]); // 假设 lineEndOptions 初始值为 [5, 10]
const langArray = ref<string[]>([]);
const formData = ref<FormData>({
  display_name: '',
  name: [{
    questionnaire_name: '',
    desc: '',
    language: 'cn'
  }],
  repeat_submit: false,
  question: [{
    question_id: 1,
    types: '单选题',
    is_required: false,
    content: [
      {
        language: 'cn',
        title: '',
        answer: [{
          answer_id: 1,
          description: '选项1'
        }],
        line_answer: {
          line_value: 1,
          line_end_value: 5,
          line_tag: '',
          line_end_tag: ''
        },
        text_answer: ''
      }
    ]
  }]
});
const editable = ref(true);
const focusIndex = ref<number | string>(0);

const showPicker = ref(false);

const onConfirm = ({ selectedOptions }) => {
  selectOptions.value = selectedOptions[0]?.text;
  showPicker.value = false;
};

const onEnd = () => {
  drag.value = false;
};

const onMove = ({ relatedContext, draggedContext }: { relatedContext: any, draggedContext: any }) => {
  const relatedIndex = relatedContext.index;
  const index = draggedContext.index;
  relatedContext.element.question_id = index + 1;
  draggedContext.element.question_id = relatedIndex + 1;
};

const focusTitle = (event: Event) => {
  const classList = (event.target as HTMLElement).classList;
  if (classList.contains('add-list') || classList.contains('el-icon-plus')) return;
  focusIndex.value = 'title';
};

const focusItem = (event: Event, i: number) => {
  const classList = (event.target as HTMLElement).classList;
  if (classList.contains('el-icon-delete') || classList.contains('icon-copy') || focusIndex.value === i) return;
  focusIndex.value = i;
};

const addRadioFn = (i: number, j: number) => {
  const list = formData.value.question[i].content[j].answer;
  addFormFn(list);
};

const deleteRadioFn = (i: number, j: number, k: number) => {
  formData.value.question[i].content[j].answer.splice(k, 1);
};

const addFormFn = (list: Answer[]) => {
  const index = list.length ? parseInt(list[list.length - 1].description.substr(2)) + 1 : 1;
  const text = `选项${index}`;
  list.push({ answer_id: list.length + 1, description: text });
  nextTick(() => {
    const input = document.querySelectorAll<HTMLInputElement>('.radio-input');
    input[input.length - 1].focus();
  });
};

const copyListFn = (index: number) => {
  const question = formData.value.question[index];
  const newQuestion = JSON.parse(JSON.stringify(question));
  formData.value.question.splice(index, 0, newQuestion);
  focusIndex.value = formData.value.question.length - 1;
};

const addListFn = () => {
  const codeList = editableTabs.value.map((i) => {
    return langCode.value[langList.value.indexOf(i)];
  });
  const contentList = codeList.map((i) => ({
    language: i,
    title: '',
    answer: [{
      answer_id: 1,
      description: '选项1'
    }],
    line_answer: {
      line_value: 1,
      line_end_value: 5,
      line_tag: '',
      line_end_tag: ''
    },
    text_answer: ''
  }));
  const list: Question = {
    question_id: formData.value.question.length + 1,
    types: '单选题',
    is_required: false,
    content: contentList
  };
  formData.value.question.push(list);
  focusIndex.value = formData.value.question.length - 1;
};

const deleteListFn = (i: number) => {
  formData.value.question.splice(i, 1);
  focusIndex.value = i === 0 && formData.value.question.length > 0 ? i : i - 1;
};

const saveFn = () => {
  // Save function implementation
};

const onSubmit = (values) => {
  console.log('submit', JSON.stringify(formData.value));
};

const addLangFn = () => {
  const value = defaultLang.value;
  if (editableTabs.value.indexOf(value) > -1) {
    Toast({
      type: 'warning',
      message: `语言：${value}已经添加过了，请检查一下哦！`
    });
  } else {
    editableTabs.value.push(value);
    tabLang.value = value;
    addLangDataFn(value);
  }
  addLangVisible.value = false;
};

const addLangDataFn = (value: string) => {
  const code = langCode.value[langList.value.indexOf(value)];
  formData.value.question.forEach((question) => {
    const content: Content = {
      language: code,
      title: '',
      answer: [{
        answer_id: 1,
        description: '选项1'
      }],
      line_answer: {
        line_value: 1,
        line_end_value: 5,
        line_tag: '',
        line_end_tag: ''
      },
      text_answer: ''
    };
    question.content.push(content);
  });
  formData.value.name.push({
    questionnaire_name: '',
    desc: '',
    language: code
  });
};

const handleTabsEdit = (targetName: string, action: string) => {
  if (action === 'add') {
    addLangVisible.value = true;
  }
  if (action === 'remove') {
    Dialog.confirm({
      title: ' ',
      message: `确定删除语言: ${targetName}的问卷吗？`,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      closeOnClickModal: false,
      beforeClose: (action, instance, done) => {
        const closeFn = () => {
          instance.confirmButtonLoading = false;
          instance.confirmButtonText = '确定';
        };
        if (action === 'confirm') {
          const tabs = editableTabs.value;
          let activeName = tabLang.value;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab === targetName) {
                const nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab;
                }
              }
            });
          }
          tabLang.value = activeName;
          editableTabs.value = tabs.filter(tab => tab !== targetName);
          closeFn();
          done();
        } else {
          closeFn();
          done();
        }
      }
    }).then(() => {
    }).catch(() => {
    });
  }
};

const getLanguageCode = (lang: string): string => {
  const langMap: { [key: string]: string } = {
    en: 'en',
    zh: 'zh',
    cn: 'cn', // Adding more language mappings as required
    kr: 'kr',
    jp: 'jp',
    fr: 'fr',
    de: 'de',
    ru: 'ru',
    sp: 'sp',
    po: 'po',
    it: 'it',
    nl: 'nl',
    id: 'id',
    tr: 'tr',
    thai: 'thai',
    fa: 'fa',
    ro: 'ro',
    ar: 'ar',
  };
  return langMap[lang] || 'cn';
};
</script>

<template>
  <div class="form-create-wrap">
    <van-loading v-if="loading" type="spinner" />
    <div class="wrap">
      <div class="content-wrap">
        <div class="item title" @click="focusTitle" :class="{ 'title-focus': focusIndex === 'title' }">
          <div class="li">
            <textarea class="form-title" placeholder="表单标题" v-model="formData.display_name" @focus="autoText"
              @input="autoText"></textarea>
          </div>
          <div class="add-list" @click="addListFn" v-if="!formData.question[0].length">
            <van-icon name="plus" />
          </div>
        </div>

        <div class="q-wrap">
          <van-form @submit="onSubmit">
            <draggable v-for="(question, index) in formData.question" :key="index" :list="formData.question"
              :move="onMove" @start="drag = true" @end="onEnd">
              <div class="q-li" :class="{ 'q-li-focus': focusIndex === index }" @click="focusItem($event, index)">
                <div class="drap-area">
                  <van-icon name="drag" />
                </div>

                <div v-for="(content, index1) in question.content" :key="index1">
                  <van-cell-group inset>
                    <van-field class="form-cell-group" v-model="content.title" label="问题：" label-width="auto"
                      @focus="autoText" @input="autoText" center clearable placeholder="请输入问题">
                      <template #button>
                        <van-dropdown-menu v-if="focusIndex === index">
                          <van-dropdown-item v-model="question.types" :options="selectOptions" />
                        </van-dropdown-menu>
                      </template>
                    </van-field>
                    <div class="q-item" v-if="['下拉列表', '单选题', '多选题'].includes(question.types)">
                      <div v-for="(item, i) in content.answer" :key="i" class="q-radio">
                        <div v-if="['下拉列表', '优先级'].includes(question.types)" class="icon-radio">{{ i + 1 }}.</div>
                        <div v-else class="icon-radio"
                          :class="{ 'icon-cirle': question.types === '单选题', 'icon-square': question.types === '多选题' }">
                        </div>
                        <input class="radio-input" v-model="item.description" />
                        <van-icon name="cross" v-if="focusIndex === index" @click="deleteRadioFn(index, index1, i)" />
                      </div>

                      <div class="q-radio" v-if="focusIndex === index">
                        <div v-if="['下拉列表', '优先级'].includes(question.types)" class="icon-radio">{{ content.answer.length
      + 1
                          }}.</div>
                        <div v-else class="icon-radio"
                          :class="{ 'icon-cirle': question.types === '单选题', 'icon-square': question.types === '多选题' }">
                        </div>
                        <input class="radio-add" v-model="addRadio" @focus="addRadioFn(index, index1)" />
                      </div>
                    </div>
                    <div class="q-item text-wrap" v-if="question.types === '文本题'">文本回答</div>
                    <div class="q-item option-wrap pt10" v-if="focusIndex === index">
                      <van-icon name="delete" @click="deleteListFn(index)"/>
                    </div>
                  </van-cell-group>
                </div>
              </div>
            </draggable>
            <!-- <div class="form-bottom">
              <van-button round block type="primary" class="submit-btn" native-type="submit">
                提交
              </van-button>
            </div> -->
          </van-form>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.form-create-wrap {
  @green: #4ca2ae;
  @grey: rgba(0, 0, 0, .5);
  position: relative;
  width: 80%;
  min-width: 400px;
  margin: 30px auto;

  @media (min-width: 520px) {
    width: 100%;
  }

  .wrap {
    width: 780px;
    min-height: 100px;
    margin: 0 auto;

    @media (max-width: 920px) {
      width: 100%;
    }

    display: flex;

    .content-wrap {
      flex: 1;
      background-color: #fff;
      box-shadow: 0 0 2px rgba(0, 0, 0, .12), 0 2px 4px rgba(0, 0, 0, .1);
      margin-right: 10px;
    }

    .form-sidebar {
      flex: 1;
      flex-grow: 0;
      align-self: flex-end;
      display: inline-block;
      background-color: #fff;
      box-shadow: 0 0 2px rgba(0, 0, 0, .12), 0 2px 4px rgba(0, 0, 0, .24);

      .sidebar-li {
        cursor: pointer;
        padding: 10px 12px;
      }
    }
  }

  .item {
    padding: 10px 15px;

    .li-right {
      text-align: right;
    }

    .li-left {
      text-align: left;

      .q-select {
        display: inline-block;
        width: 120px;
      }
    }
  }

  .title-focus {
    border-left-color: @green !important;
  }

  .title {
    border-left: 3px solid transparent;
    position: relative;

    .add-list {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #e9e9e9;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -15px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      i {
        color: @green;
        font-size: 22px;
      }
    }
  }

  .q-wrap {
    .q-li-focus {
      border-left-color: @green !important;
      box-shadow: 0 -2px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 6px 0 rgba(0, 0, 0, 0.24);
    }

    .q-li {
      border-left: 3px solid transparent;
    }

    .q-title-wrap {
      display: flex;
      align-items: center;
      margin-bottom: 25px !important;

      .q-index {
        flex: 1;
        flex-grow: 0;
        margin-right: 10px;
      }

      .q-title {
        flex: 1;
        flex-grow: 2;

        .li {
          margin-bottom: 0;
        }
      }

      .q-select {
        flex: 1;
        flex-shrink: 0;
      }
    }

    .drap-area {
      padding: 5px;
      cursor: move;

      .icon-tuozhuai {
        color: lightgray;
        font-size: 20px;
        margin-left: 37px;
      }
    }

    .q-item-wrap {
      padding: 16px 24px 24px 42px;
    }

    .q-item {
      margin-bottom: 10px;

      /*overflow: hidden;*/
      .q-radio {
        margin: 15px auto;
        display: flex;
        align-items: center;

        .icon-radio {
          width: 15px;
          height: 15px;
          border: 2px solid transparent;
          margin-right: 15px;
        }

        .icon-cirle {
          border: 2px solid lightgray;
          border-radius: 50%;
        }

        .icon-square {
          border: 2px solid lightgray;
          border-radius: 0;
        }

        input {
          flex: 2;
          margin-right: 15px;
          border: 1px solid transparent;
          padding-bottom: 3px;

          &:focus {
            border-bottom: 1px solid lightgray;
          }
        }

        i {
          flex: 1;
          flex-grow: 0;
          color: rgba(0, 0, 0, 0.3);
          cursor: pointer;
        }

        .radio-add {
          color: @green;
          font-weight: bold;
          cursor: pointer;
          flex: 0;
        }
      }
    }

    .line-wrap {
      .q-item-line {
        display: flex;
        align-items: center;

        .el-select {
          width: 70px;

          .el-input {
            border: none !important;
          }
        }

        .line-tip {
          padding: 15px;
        }
      }

      .q-radio {
        input {
          border-bottom: 1px solid lightgray !important;
          flex: 0;
        }
      }
    }

    .text-wrap {
      color: @grey;
      border-bottom: 1px dotted lightgray;
      padding-bottom: 5px;
      width: 60%;
      text-align: left;
    }

    .square-wrap {
      display: flex;

      .square-li {
        flex: 1
      }
    }

    .option-wrap {
      overflow: hidden;
      border-top: 1px solid lightgray;

      .option-list {
        float: right;

        li {
          float: left;
          list-style: none;
          margin: 20px 0 0 25px;

          .icon-copy {
            font-size: 20px;
          }

          .el-icon-delete {
            font-size: 21px;
            vertical-align: middle;
          }

          i {
            cursor: pointer;
          }
        }

        .lang-li {
          margin: 15px 8px;
          display: flex;
          align-items: center;

          span {
            margin-left: 10px;
            cursor: pointer;
            color: @green;
            font-weight: bold;
          }

          .el-select {
            width: 120px;
          }
        }
      }
    }

    .lang-wrap {
      border-top: 1px dotted lightgray;
      padding-top: 20px;

      .lang-li-wrap {
        display: flex;

        .li-text {
          margin-right: 15px;

          i {
            display: block;
            margin-top: 20px;
            cursor: pointer;
          }

          .el-icon-delete {
            font-size: 21px;
          }
        }

        .li-content {
          flex: 1;
        }
      }
    }
  }

  .li {
    position: relative;
    margin-bottom: 15px;
    height: 100%;

    &:after {
      content: '';
      width: 100%;
      height: 1px;
      position: absolute;
      bottom: -1px;
      left: 0;
      transform: scaleX(0);
      background-color: @green;
      transition-duration: 0.3s;
      transition-timing-function: ease;
      transition-delay: 0s;
    }

    &:hover:after {
      border-bottom: 1px solid transparent;
      transform: scaleX(1);
    }

    .form-title {
      font-size: 24px;

      &::-webkit-input-placeholder {
        font-size: 24px;
      }
    }

    .title-area {
      font-size: 20px;

      &::-webkit-input-placeholder {
        font-size: 20px;
      }
    }

    .q-area {
      font-size: 18px;

      &::-webkit-input-placeholder {
        font-size: 18px;
      }
    }
  }

  textarea {
    background-color: transparent;
    border: none;
    resize: none;
    display: block;
    width: 100%;
    height: 35px;
  }

  .expand-area {
    position: relative;

    textarea {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      overflow: hidden;
    }

    pre {
      display: block;
      visibility: hidden;
      min-height: 100px;
      margin: 0;
    }
  }

  .add-lang {
    .li-item {
      display: flex;
      align-items: center;

      .label {
        margin-right: 15px;
      }
    }
  }

  input::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder {
    color: @grey;
  }

  .el-tabs__item.is-active,
  .el-tabs__new-tab:hover {
    color: @green;
  }
}


// 个人自定义
.form-create-wrap {
  min-width: 0;
  padding: 20px 15px;
  width: 100%;
  text-align: center;
}

.form-create-wrap .wrap {
  display: block;
}

.form-create-wrap .wrap .content-wrap {
  margin-right: 0;
}

.form-create-wrap .q-wrap .q-li {
  border-left: none;
}

.form-create-wrap .q-wrap .q-li-focus {
  border: 1px dashed #ddd;
  border-left: 2px solid #1989fa;
  box-shadow: none;
}

.form-cell-group {
  padding-left: 3px !important;

  & /deep/ .van-dropdown-menu__bar {
    box-shadow: none;
    height: 25px;
    font-size: 16px;
  }
}

.form-bottom {
  border-top: 1px dashed #ddd;
  padding: 20px;
}

.form-create-wrap .q-wrap .text-wrap{
  width: 100%;
}
</style>
