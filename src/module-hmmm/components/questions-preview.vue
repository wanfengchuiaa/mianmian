<template>
  <div class='container'>
    <el-dialog
      title="题目预览"
      :visible="dialogFormVisible1"
      width="50%"
      @close="close"
    >
      <div>
        <el-row style="padding: 10px 0">
          <el-col :span="6">【题型】：{{ detail.questionType === '2' ? '多选题' : '单选题' }}</el-col>
          <el-col :span="6">【编号】：{{ detail.id }}</el-col>
          <el-col :span="6">【难度】：{{ detail.difficulty }}</el-col>
          <el-col :span="6">【标签】：{{ detail.tags }}</el-col>
        </el-row>
        <el-row style="padding: 10px 0">
          <el-col :span="6">【学科】：{{ detail.subjectName }}</el-col>
          <el-col :span="6">【目录】：{{ detail.directoryName }}</el-col>
          <el-col :span="6">【方向】：{{ detail.direction }}</el-col>
        </el-row>
        <hr>
        【题干】：
        <div v-html="detail.question" style="color: blue;">
        </div>
        <div>
          <div style="padding-bottom: 5px;">{{ detail.questionType === '1' ? '单选' : '多选' }}选项：（以下选中的选项为正确答案）
          </div>
          <el-row style="margin: 8px 5px">
            <el-radio :label="radio"></el-radio>
          </el-row>
          <el-row style="margin: 5px">
            <el-radio :label="radio"></el-radio>
          </el-row>
          <el-row style="margin: 5px">
            <el-radio :label="radio"></el-radio>
          </el-row>
          <el-row style="margin: 5px">
            <el-radio :label="radio"></el-radio>
          </el-row>
          <div v-for="item in detail.options" :key="item.id">
            <el-checkbox :checked="item.isRight === 1" style="padding: 8px 0px;">{{ item.title }}</el-checkbox>
          </div>
        </div>
        <hr>
        【参考答案】：
        <el-button type="danger" size="mini" @click="show = !show">视频答案预览</el-button>
        <div style="width: 55%" v-show="show">
          <vue-video-player :src="detail" :controls="true" :control="false" :poster="a"
                            :video-data="{}"></vue-video-player>
        </div>
        <hr>
        【答案解析】：
        <div v-html="detail.answer"></div>
        <hr>
        【题目备注】：{{ detail.remarks }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="close">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import VueVideoPlayer from '@/module-hmmm/components/vueVideoPlayer'

export default {
  name: 'QuestionsPreview',
  components: { VueVideoPlayer },
  data () {
    return {
      show: false,
      radio: '',
      videoURL: '',
      a: ''
    }
  },
  created () {
    this.videoURL = this.detail.videoURL
  },
  props: {
    dialogFormVisible1: {
      type: Boolean,
      default: false
    },
    detail: {
      type: Object,
      default: () => {
      }
    }
  },
  methods: {
    close () {
      this.$emit('update:dialogFormVisible1', false)
    }
  }
}
</script>

<style scoped lang='less'></style>
