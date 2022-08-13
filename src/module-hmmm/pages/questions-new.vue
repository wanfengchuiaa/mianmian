<template>
  <div class='container'>
    <el-card style="margin: 25px 16px;">
      <div style="border-bottom: 1px solid #eee;padding-bottom: 20px">
        试题录入
      </div>
      <div style="padding: 20px 50px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="8">
              <el-form-item label="学科" prop="subjectID">
                <el-select v-model="ruleForm.subjectID" placeholder="请选择" style="width: 100%"
                           @change="changesubjectID">
                  <el-option :label="item.label" :value="item.value" v-for="(item,index) in subject"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="目录" prop="catalogID">
                <el-select v-model="ruleForm.catalogID" placeholder="请选择" style="width: 100%">
                  <el-option :label="item.label" :value="item.value" v-for="item in twosubject"
                             :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="企业" prop="enterpriseID">
                <el-select v-model="ruleForm.enterpriseID" placeholder="请选择" style="width: 100%"
                >
                  <el-option :label="item.label" :value="item.value" v-for="(item,index) in subject"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="城市" prop="province">
                <el-row :gutter="20" style="display:flex;">
                  <el-col>
                    <el-select v-model="ruleForm.province" placeholder="请选择" style="width: 100%"
                               @change="changecity">
                      <el-option :label="item" :value="item" v-for="(item,index) in city"
                                 :key="index"></el-option>
                    </el-select>
                  </el-col>
                  <el-col>
                    <el-select v-model="ruleForm.city" placeholder="请选择" style="width: 100%">
                      <el-option :label="item" :value="item" v-for="(item,index) in province"
                                 :key="index"></el-option>
                    </el-select>
                  </el-col>
                </el-row>

              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="方向" prop="direction">
                <el-select v-model="ruleForm.direction" placeholder="请选择" style="width: 100%">
                  <el-option label="o2o" value="o2o"></el-option>
                  <el-option label="外包服务" value="外包服务"></el-option>
                  <el-option label="企业服务" value="企业服务"></el-option>
                  <el-option label="互联网金融" value="互联网金融"></el-option>
                  <el-option label="企业咨询" value="企业咨询"></el-option>
                  <el-option label="互联网" value="互联网"></el-option>
                  <el-option label="电子商务" value="电子商务"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="题型" prop="questionType">
            <el-radio-group v-model="ruleForm.questionType">
              <el-radio label="1">单选</el-radio>
              <el-radio label="2">多选</el-radio>
              <el-radio label="3">简答</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="难度" prop="difficulty">
            <el-radio-group v-model="ruleForm.difficulty">
              <el-radio label="1">简单</el-radio>
              <el-radio label="2">一般</el-radio>
              <el-radio label="3">困难</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="题干" prop="question" style="margin-bottom: 10px;">
            <rich-text v-model="ruleForm.question"></rich-text>
          </el-form-item>

          <div v-if="ruleForm.questionType !== '3'">
            <el-form-item label="选项:" prop="options">
              <el-row style="margin: 10px 0" v-for="(item,index) in ruleForm.options" :key="index">
                <el-col style="display:flex;align-items: center;">
                  <el-radio v-if="ruleForm.questionType === '1'" v-model="radio" :label="item.code"
                            @change="changeradio">{{
                      item.code
                    }}:
                  </el-radio>
                  <el-checkbox v-else v-model="item.isRight">{{ item.code }}</el-checkbox>
                  <el-input style="width: 260px;margin-right: 5px" v-model="item.title"></el-input>
                  <updataimg></updataimg>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="addlistaaa" :disabled="ruleForm.questionType === '1'">+增加选项与答案
              </el-button>
            </el-form-item>
          </div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="解析视频">
                <el-input v-model="ruleForm.videoURL"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="答案解析" prop="answer" style="margin-bottom: 90px; ">
            <rich-text v-model="ruleForm.answer"></rich-text>
          </el-form-item>
          <el-form-item label="题目备注" prop="remarks">
            <el-row>
              <el-col :span="7">
                <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="ruleForm.remarks">
                </el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label="试题标签">
                <el-select v-model="qqaaa" multiple placeholder="请选择" style="width: 100%"
                >
                  <el-option :label="item.label" :value="item.label" v-for="(item,index) in qweqrqt"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="qurentijiao">确认提交</el-button>
          </el-form-item>

        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>

import RichText from '@/module-hmmm/components/richtext'
import Updataimg from '@/module-hmmm/components/updataimg'
import { difficulty, direction, questionType } from '@/api/hmmm/constants'
import { citys, provinces } from '@/api/hmmm/citys'
import { simple } from '@/api/hmmm/tags'
import { list } from '@/api/hmmm/companys'
import { simple1111, simpleid, simpleid1 } from '@/api/hmmm/subjects'
import { add, detail, update } from '@/api/hmmm/questions'

export default {
  components: { Updataimg, RichText },
  data () {
    return {
      subject: [],
      qweqrqt: '',
      qqaaa: [],
      radio: '',
      twosubject: [],
      threesubject: [],
      topictype: [],
      difficulty: [],
      direction: [],
      companys: [],
      city: [],
      province: [],
      tableData: [],
      arr: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
      ruleForm: {
        answer: '',
        catalogID: '',
        city: '',
        difficulty: '',
        direction: '',
        enterpriseID: '',
        options: [
          { isRight: true, code: 'A', title: 'A', img: '' },
          { isRight: false, code: 'B', title: 'B', img: '' },
          { isRight: false, code: 'C', title: 'C', img: '' },
          { isRight: false, code: 'D', title: 'D', img: '' }
        ],
        province: '',
        question: '',
        questionType: '',
        remarks: '',
        subjectID: '',
        tags: '',
        videoURL: ''
      },
      showbtn: false,
      rules: {
        subjectID: [
          {
            required: true,
            message: '请选择学科'
          }
        ],
        catalogID: [
          {
            required: true,
            message: '请选择目录'
          }
        ],
        enterpriseID: [
          {
            required: true,
            message: '请选择企业'
          }
        ],
        province: [
          {
            required: true,
            message: '请选择城市'
          }
        ],
        direction: [
          {
            required: true,
            message: '请选择方向'
          }
        ],
        answer: [
          {
            required: true,
            message: '请輸入答案解析'
          }
        ],
        question: [
          {
            required: true,
            message: '请輸入题干'
          }
        ],
        questionType: [
          {
            required: true,
            message: '请选择题型'
          }
        ],
        difficulty: [
          {
            required: true,
            message: '请选择難度'
          }
        ]
      }

    }
  },
  created () {
    if (this.$route.query.id) {
      this.update(this.$route.query.id)
    }
    this.simple()
    this.topictype = questionType
    this.difficulty = difficulty
    this.direction = direction
    this.city = provinces()
    this.list()
    this.list1()
  },
  watch: {
    qqaaa: {
      immediate: true,
      deep: true,
      handler (value) {
        this.ruleForm.tags = this.qqaaa.join(',')
      }
    }
  },
  methods: {
    async update (id) {
      const res = await detail({ id })
      this.ruleForm = res.data
    },
    async qurentijiao () {
      if (this.$route.query.id) {
        console.log('id', this.$route.query.id)
        await update(this.ruleForm)
        this.$message.success('成功')
        this.$router.back()
      }
      await add(this.ruleForm)
      this.$message.success('成功')
      await this.$router.push('choice')
    },
    changeradio (i) {
      this.ruleForm.options.forEach(item => {
        item.isRight = item.code === i
      })
    },
    addlistaaa () {
      const index = this.ruleForm.options.length
      this.ruleForm.options.push({ isRight: false, code: this.arr[index], title: '', img: '' })
    },

    async list1 () {
      const res = await list({
        pagesize: 10000
      })
      this.companys = res.data.items
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    async simple () {
      const res = await simple1111()
      this.subject = res.data
    },
    questionTypeformatter (row, column, cellvalue) {
      return questionType.find(item => item.value === +cellvalue).label || '空'
    },
    difficultyformatter (row, column, cellvalue) {
      return difficulty.find(item => item.value === +cellvalue).label || '空'
    },
    async list () {
      const arr = {}
      for (const k in this.ruleForm) {
        if (this.ruleForm[k] !== '') {
          arr[k] = this.ruleForm[k]
        }
      }
      const res = await list(arr)
      this.tableData = res.data.items
      this.total = res.data.counts + 0
    },
    async changesubjectID (id) {
      this.ruleForm.catalogID = ''
      this.ruleForm.tags = ''
      const res = await simpleid({ subjectID: id })
      this.twosubject = res.data
      const a = await simpleid1({ subjectID: id })
      this.threesubject = a.data
      const b = await simple({ subjectID: id })
      this.qweqrqt = b.data
    },
    changecity (id) {
      this.ruleForm.city = ''
      this.province = citys(id)
    }
  }
}
</script>

<style scoped lang='less'>
.showbtn {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}

.el-radio {
  color: #606266;
  font-weight: 500;
  cursor: pointer;
  margin-right: 9px;

}

.el-checkbox {
  color: #606266;
  font-weight: 500;
  cursor: pointer;
  margin-right: 9px;
}
</style>
