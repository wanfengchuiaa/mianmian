<template>
  <div class="quill-wrap">
    <quill-editor ref="myQuillEditor" v-model="value" :options="editorOption"/>
  </div>
</template>
<script>
import 'quill/dist/quill.snow.css'
import { Quill, quillEditor } from 'vue-quill-editor'
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'

Quill.register('modules/ImageExtend', ImageExtend)
export default {
  components: { quillEditor },
  // model: {
  //   props: 'content'
  // },
  props: {
    value: {
      type: String
    }
  },
  data () {
    return {
      // content: '',
      editorOption: { // 富文本框参数设置
        modules: {
          ImageExtend: {
            loading: true,
            name: 'img',
            action: 'http://127.0.0.1:7001/yun/upload',
            response: (res) => {
              return `http://127.0.0.1:7001/public/uploadfile/${res.data.filename}`
            }
          },
          toolbar: {
            container: container,
            handlers: {
              image: function () {
                QuillWatch.emit(this.quill.id)
              }
            }
          }
        }
      }
    }
  },
  watch: {
    value: {
      handler (value) {
        this.$emit('input', this.value)
      }
    }
  }
}
</script>
<style>
.ql-container {
  min-height: 300px;
}

.quill-editor {
  width: 100%;
}
</style>
