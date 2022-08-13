<template>
  <div class='container'>
    <el-dialog
      @close="input"
      title="预览文章"
      :visible="dialogVisible"
      width="60%"
    >
      <h2>{{ Looks.title }}</h2>
      <span>{{ Looks.createTime |parseTimeByString }}</span>&nbsp
      <span>{{ Looks.username }}</span>&nbsp
      <i class="el-icon-view"></i>&nbsp
      <span>{{ Looks.visits }}</span>
      <div v-html="Looks.articleBody" class="content"></div>
    </el-dialog>
    <el-dialog
      @close="input"
      title="修改文章"
      :visible="EditdialogVisible"
      width="60%"
    >
      <el-form :model="Looks" :rules="rules" label-width="140px">
        <el-form-item label="文章标题" prop="title" style="width: 80%;">
          <el-input v-model="Looks.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" prop="articleBody">
          <quill-editor
            ref="myQuillEditor"
            v-model="Looks.articleBody"
            :options="editorOption"
          />
        </el-form-item>
        <el-form-item label="视频地址" style="width: 80%;">
          <el-input v-model="Looks.videoURL" placeholder="请输入视频地址"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="EditdialogVisible=false">取消</el-button>
          <el-button type="primary" @click="Editarticle">确定</el-button>
        </el-form-item>
      </el-form>
      <!--      <div v-html="Looks.articleBody" class="content"></div>-->
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { add, update } from '@/api/hmmm/articles'

Vue.use(VueQuillEditor)
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序列表，无序列表
  ['blockquote', 'code-block'], // 引用，代码块
  ['image', 'link'] // 上传图片、上传视频
]
export default {
  name: 'ArticlesPreview',
  data () {
    return {
      rules: {
        title: [{
          required: true,
          message: '文章标题必填'
        }],
        articleBody: [{
          required: true,
          message: '文章内容必填'
        }]
      },
      editorOption: {
        placeholder: '',
        theme: 'snow', // 主题 snow/bubble
        modules: {
          toolbar: {
            container: toolbarOptions
          }
        }
      }
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    Looks: {
      type: Object,
      default: () => {
      }
    },
    EditdialogVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async Editarticle () {
      if (this.Looks.id) {
        await update(this.Looks)
        this.$message.success('修改成功')
      } else {
        await add(this.Looks)
        this.$message.success('新增成功')
      }

      // this.EditdialogVisible = false
      this.$emit('input', false)
    },
    input () {
      this.$emit('input', false)
    }
  }
}
</script>

<style scoped lang='less'>
/deep/ .content {
  border-top: dashed 1px #f5f5f5;
  margin-top: 5px;
  background: #f5f5f5;
  padding: 10px;
}
</style>
