<template>
  <div class='container'>
    <el-card>
      <el-row type="flex" style="display:flex;justify-content: space-between;margin-bottom: 15px">
        <el-col>
          <el-link type="danger" disabled>说明：目前只支持学科和关键字条件筛选</el-link>
        </el-col>
        <el-col style="display:flex;justify-content: end">
          <el-button type="success" icon="el-icon-edit" size="small">新增试题</el-button>
        </el-col>
      </el-row>
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="6">
            <el-form-item label="学科">
              <el-select v-model="ruleForm.subjectID" placeholder="请选择" style="width: 100%"
                         @change="changesubjectID">
                <el-option :label="item.label" :value="item.value" v-for="item in subject" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="二级目录">

              <el-select v-model="ruleForm.catalogID" placeholder="请选择" style="width: 100%">
                <el-option :label="item.label" :value="item.value" v-for="item in twosubject"
                           :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="标签">
              <el-select v-model="ruleForm.tags" placeholder="请选择" style="width: 100%">
                <el-option :label="item.label" :value="item.value" v-for="item in threesubject"
                           :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="关键字">
              <el-input v-model="ruleForm.keyword" placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">

            <el-form-item label="试题类型">
              <el-select v-model="ruleForm.questionType" placeholder="请选择" style="width: 100%">
                <el-option :label="item.label" :value="item.value" v-for="item in topictype"
                           :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="难度">
              <el-select v-model="ruleForm.difficulty" placeholder="请选择" style="width: 100%">
                <el-option :label="item.label" :value="item.value" v-for="item in  difficulty"
                           :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="方向">
              <el-select v-model="ruleForm.direction" placeholder="请选择" style="width: 100%">
                <el-option :label="item.label" :value="item.value" v-for="item in  direction"
                           :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="录入人">
              <el-select v-model="ruleForm.creatorID" placeholder="请选择" style="width: 100%">
                <el-option label="超级管理员" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="题目备注">
              <el-input v-model="ruleForm.remarks" placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业简称">
              <el-input v-model="ruleForm.shortName" placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="城市">
              <el-row :gutter="20" style="display:flex;">
                <el-col>
                  <el-select v-model="ruleForm.province" placeholder="请选择" style="width: 100%"
                             @change="changecity">
                    <el-option :label="item" :value="item" v-for="item in city"
                               :key="item"></el-option>
                  </el-select>
                </el-col>
                <el-col>
                  <el-select v-model="ruleForm.city" placeholder="请选择" style="width: 100%">
                    <el-option :label="item" :value="item" v-for="item in province"
                               :key="item"></el-option>
                  </el-select>
                </el-col>
              </el-row>

            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: end">
            <el-button size="small" @click="clearfrom">清除</el-button>
            <el-button type="primary" size="small" @click="list">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-alert
        :title="`数据一共${total}条`"
        type="info"
        :closable="false"
        show-icon
        style="margin-bottom: 15px">
      </el-alert>
      <!--表格-->
      <el-table
        :data="tableData"
        stripe
        style="width: 100%;"
        :header-cell-style="{'text-align': 'center','border-bottom':'2px solid #e8e8e8'}"
        :cell-style="{'text-align': 'center'}">
        <el-table-column
          prop="number"
          label="试题编号">
        </el-table-column>
        <el-table-column
          prop="subject"
          label="学科"
          width="180">
        </el-table-column>
        <el-table-column
          prop="catalog"
          label="目录">
        </el-table-column>
        <el-table-column
          prop="questionType"
          label="题型"
          :formatter="questionTypeformatter"
        >
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="题干">
        </el-table-column>
        <el-table-column
          prop="addDate"
          label="录入时间"
          :formatter="dateFormat">
        </el-table-column>
        <el-table-column
          prop="difficulty"
          label="难度"
          :formatter="difficultyformatter">
        </el-table-column>
        <el-table-column
          prop="creator"
          label="录入人">
        </el-table-column>
        <el-table-column
          label="操作" width="200">
          <template v-slot="{row}">
            <el-button class="button1" size="small" type="success" icon="el-icon-view" circle
                       @click="yanlan(row)"></el-button>
            <el-button class="button2" size="small" type="info" icon="el-icon-edit" circle
                       @click="$router.push({
            path:'new',
            query:{
             id:row.id
            }
            })"></el-button>
            <el-button class="button3" type="warning" size="small" icon="el-icon-delete" circle
                       @click="remove(row)"></el-button>
            <el-button class="button4" type="danger" size="small" icon="el-icon-check" circle
                       @click="choiceAdd(row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="display:flex;justify-content: end;margin-top: 20px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="ruleForm.page"
          :page-sizes="[1, 3, 5, 10]"
          :page-size="ruleForm.pagesize"
          layout="prev, pager, next,sizes, jumper"
          :total="total">
        </el-pagination>
      </el-row>
    </el-card>
    <questions-preview :dialogFormVisible1.sync="dialogFormVisible1" :detail="detail"></questions-preview>
  </div>
</template>

<script>
import { simpleid, simpleid1 } from '@/api/hmmm/subjects'
import { choicePublish, list, remove } from '@/api/hmmm/questions'
import { simple } from '@/api/hmmm/tags'
import { difficulty, direction, questionType } from '@/api/hmmm/constants'
import { citys, provinces } from '@/api/hmmm/citys'
import QuestionsPreview from '@/module-hmmm/components/questions-preview'

export default {
  components: { QuestionsPreview },
  data () {
    return {
      name: '',
      dialogFormVisible1: false,
      detail: {},
      ruleForm: {
        subjectID: '',
        difficulty: '',
        questionType: '',
        tags: '',
        province: '',
        city: '',
        keyword: '',
        remarks: '',
        shortName: '',
        direction: '',
        creatorID: '',
        catalogID: '',
        page: 1, // this.list11.page,
        pagesize: 5// this.list11.pagesize
      },
      subject: [],
      twosubject: [],
      threesubject: [],
      topictype: [],
      difficulty: [],
      direction: [],
      city: [],
      province: [],
      tableData: [],
      total: 0

    }
  },
  created () {
    this.simple()
    this.topictype = questionType
    this.difficulty = difficulty
    this.direction = direction
    this.city = provinces()
    this.list()
  },
  watch: {
    subject: {
      deep: true,
      immediate: true,
      handler (value) {

      }
    }
  },
  methods: {
    yanlan (row) {
      this.dialogFormVisible1 = true
      this.detail = row
    },
    clearfrom () {
      for (const k in this.ruleForm) {
        if (k === 'page' || k === 'pagesize') {
        } else {
          this.ruleForm[k] = ''
        }
      }
    },
    async choiceAdd (row) {
      await this.$confirm('此操作将该题目加入精选, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await choicePublish({
        id: row.id,
        publishState: 1
      })
      this.$message.success('加入精选成功')
    },
    async remove (row) {
      await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      })
      await remove(row)
      this.$message.success('删除成功')
      await this.list()
    },
    handleSizeChange (i) {
      this.ruleForm.pagesize = i
      this.list()
    },
    handleCurrentChange (i) {
      this.ruleForm.page = i
      this.list()
    },
    async simple () {
      const res = await simple()
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
    },
    changecity (id) {
      this.ruleForm.city = ''
      this.province = citys(id)
    },
    dateFormat (row, column, cellValue, index) {
      const daterc = row[column.property]
      if (daterc != null) {
        var date = new Date(daterc)
        var year = date.getFullYear()
        /* 在日期格式中，月份是从0开始，11结束，因此要加0
         * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
         * */
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        // 拼接
        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
      }
    }
  }
}
</script>

<style scoped lang='less'>
.el-card {
  margin: 15px 10px;
}

.button1 {
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
}

.button2 {
  color: #67c23a;
  background: #f0f9eb;
  border-color: #c2e7b0;
}

.button3 {
  color: #f56c6c;
  background: #fef0f0;
  border-color: #fbc4c4;
}

.button4 {
  color: #e6a23c;
  background: #fdf6ec;
  border-color: #f5dab1;
}
</style>
