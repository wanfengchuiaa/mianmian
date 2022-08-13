<template>
  <div class='container'>
    <el-card style="margin: 25px 16px;">
      <el-form ref="form" :model="formdata" label-width="80px">
        <el-row justify="space-between" type="flex">
          <el-col :span="8" justify="space-between" type="flex">
            <el-form-item label="关键字">
              <el-input style="width: 400px" v-model="formdata.text"></el-input>
            </el-form-item>
          </el-col>
          <el-col justify="end" type="flex">
            <el-button size="small" @click="qingchu">清除</el-button>
            <el-button size="small" type="primary" @click="sousuo">搜索</el-button>
          </el-col>
        </el-row>

        <el-alert
          :title="`数据一共${total}条`"
          type="info"
          show-icon>
        </el-alert>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%;"
          :header-cell-style="{'text-align': 'center','border-bottom':'2px solid #e8e8e8'}"
          :cell-style="{'text-align': 'center'}">
          <el-table-column
            prop="id"
            label="编号">
          </el-table-column>
          <el-table-column
            prop="questionType"
            label="题型"
            :formatter="questionTypeformatter">
          </el-table-column>
          <el-table-column
            prop="questionIDs"
            label="题目编号"
            width="300">
            <template v-slot="{row}">
              <p @click="qwrrr(row)" style="margin: 0" v-for="(item,index) in row.questionIDs" :key="index">
                <el-link type="primary">{{ item.number }}</el-link>
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="addTime"
            label="录入时间"
          >
          </el-table-column>
          <el-table-column
            prop="totalSeconds"
            label="答题时间(s)">
          </el-table-column>
          <el-table-column
            prop="accuracyRate"
            label="正确率(%)"
          >
          </el-table-column>
          <el-table-column
            prop="userName"
            label="录入人"
          >
          </el-table-column>
          <el-table-column
            label="操作" width="200">
            <template v-slot="{row}">
              <el-button class="button3" type="warning" size="small" icon="el-icon-delete" circle
                         @click="remove(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row style="display:flex;justify-content: end;margin-top: 20px;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="obj.page"
            :page-sizes="[1, 3, 5, 10]"
            :page-size="obj.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="+total">
          </el-pagination>
        </el-row>
      </el-form>
    </el-card>
    <questions-preview :dialogFormVisible1.sync="show" :detail="detail"></questions-preview>
  </div>
</template>

<script>

import { randoms, removeRandoms } from '@/api/hmmm/questions'
import { questionType } from '@/api/hmmm/constants'
import QuestionsPreview from '@/module-hmmm/components/questions-preview'

export default {
  components: { QuestionsPreview },
  data () {
    return {
      show: false,
      detail: {},
      tableData: [],
      formdata: {
        text: ''
      },
      obj: {
        page: 1,
        pagesize: 10
      },
      total: ''
    }
  },
  created () {
    this.randoms()
  },

  methods: {
    qwrrr (row) {
      this.detail = row
      this.show = true
    },
    qingchu () {
      this.formdata = {
        text: ''
      }
    },
    sousuo () {

    },
    async remove (row) {
      await this.$confirm('确认删除嘛？')
      await removeRandoms(row)
      this.$message.success('删除成功')
      await this.randoms()
    },
    questionTypeformatter (row, column, cellvalue) {
      return questionType.find(item => item.value === +cellvalue).label || '空'
    },
    async randoms () {
      const res = await randoms(this.obj)
      console.log(res)
      this.total = res.data.counts
      this.tableData = res.data.items
    },
    handleSizeChange (i) {
      this.obj.page = i
    },
    handleCurrentChange (i) {
      this.obj.pagesize = i
    }
  }
}
</script>

<style scoped lang='less'>
.button3 {
  color: #f56c6c;
  background: #fef0f0;
  border-color: #fbc4c4;
}
</style>
