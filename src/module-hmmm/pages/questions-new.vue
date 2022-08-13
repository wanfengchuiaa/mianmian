<template>
  <div class="container">
    <el-card>
      试题录入
      <hr />
      <el-form label-width="120px">
        <el-form-item label="学科:">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目录:">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业:">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市:">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="方向:">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型:">
          <el-radio-group v-model="radio">
            <el-radio :label="3">单选</el-radio>
            <el-radio :label="6">多选</el-radio>
            <el-radio :label="9">简答</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度:">
          <el-radio-group v-model="radio">
            <el-radio :label="3">简单</el-radio>
            <el-radio :label="6">一般</el-radio>
            <el-radio :label="9">困难</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="题干:">
          <div style="border: 1px solid #ccc">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
            <Editor
              style="height: 200px; overflow-y: hidden"
              v-model="html"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="onCreated"
            />
          </div>
        </el-form-item>
        <el-form-item label="选项:">
          <el-row type="flex" align="middle">
            <el-radio v-model="radio" label="1" style="margin-right: 10px">A:</el-radio>
            <el-input style="width: 240px"></el-input>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="avatar-uploader-icon" style="width: 100px">上传图片</i>
            </el-upload>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" align="middle">
            <el-radio v-model="radio" label="1" style="margin-right: 10px">B:</el-radio>
            <el-input style="width: 240px"></el-input>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <span class="avatar-uploader-icon" style="width: 1000px">上传图片</span>
              <!-- <i v-else class="avatar-uploader-icon" style="width: 100px">上传图片</i> -->
            </el-upload>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" align="middle">
            <el-radio v-model="radio" label="1" style="margin-right: 10px">C:</el-radio>
            <el-input style="width: 240px"></el-input>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />

              <i v-else class="avatar-uploader-icon" style="width: 100px">上传图片</i>
            </el-upload>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" align="middle">
            <el-radio v-model="radio" label="1" style="margin-right: 10px">D:</el-radio>
            <el-input style="width: 240px"></el-input>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="avatar-uploader-icon" style="width: 100px">上传图片</i>
            </el-upload>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" size="small">+增加选项与答案</el-button>
        </el-form-item>
        <el-form-item label="解析视频:">
          <el-input style="width: 300px"></el-input>
        </el-form-item>

        <!-- <el-form-item label="答案解析:">
          <div style="border: 1px solid #ccc">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
            <Editor
              style="height: 200px; overflow-y: hidden"
              v-model="html"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="onCreated"
            />
          </div>
        </el-form-item> -->
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default {
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      html: '<p>hello</p>',
      toolbarConfig: {},
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default', // or 'simple'

      radio: 3,
      options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
      value: '',
    }
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
      this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
    }, 1500)
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
  },
}
</script>

<style scoped lang="less">
::v-deep.avatar-uploader .el-upload {
  margin-left: 10px;
  border: 1px dotted black;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
::v-deep.avatar-uploader-icon {
  font-size: 12px;
  color: #8c939d;
  width: 100px;
  height: 50px;
  line-height: 60px;
  text-align: center;
}
.avatar {
  width: 100;
  height: 50px;
  display: block;
}
</style>
