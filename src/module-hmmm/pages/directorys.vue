<template>
  <div class='container'>
    <el-card>
      <el-form ref="Lists" :inline="true" :model="obj">
        <el-row type="flex">

          <el-form-item label="目录名称">
            <el-input v-model="obj.directoryName" placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="状态">
            <el-select v-model="obj.state" clearable placeholder="请选择">
              <el-option
                label="启用"
                :value="1">
              </el-option>
              <el-option
                label="启用"
                :value="0">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button size="small" @click="resetForm">消除</el-button>
            <el-button size="small" type="primary" @click="list">搜索</el-button>
          </el-form-item>

          <el-form-item style="margin-left: 650px">
            <el-button icon="el-icon-edit" size="small" type="success" @click="EditSubjects">新增用户</el-button>
          </el-form-item>

        </el-row>
      </el-form>
      <el-alert
        :title="`共 ${total} 条记录`"
        show-icon
        type="info">
      </el-alert>

      <el-table
        :data="tableData"
        stripe
        style="width: 100%;"
        :header-cell-style="{'text-align': 'center','border-bottom':'2px solid #e8e8e8'}"
        :cell-style="{'text-align': 'center'}">
        <el-table-column
          type="index"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="subjectName"
          label="所属学科"
        >
        </el-table-column>
        <el-table-column
          prop="directoryName"
          label="目录名称"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="创建者"
        >
        </el-table-column>
        <el-table-column
          prop="addDate"
          label="创建日期"
          :formatter="dateFormat">
        </el-table-column>
        <el-table-column
          prop="totals"
          label="面试题数"
        >
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          :formatter="aaaa"
        >
        </el-table-column>
        <el-table-column
          label="操作" width="200">
          <template v-slot="{row}">
            <el-button size="mini" type="text" @click="editbtn(row)">{{ row.state === 1 ? '启用' : '禁用' }}</el-button>
            <el-button size="mini" type="text" :disabled="row.state===1" @click="EditSubjects(row)">修改</el-button>
            <el-button size="mini" type="text" @click="delbtn(row)" :disabled="row.state===1">删除</el-button>
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

    </el-card>
    <el-dialog title="修改目录" :visible="dialogFormVisible" @close="close" width="400px">
      <el-form :model="form1">
        <el-form-item label="活动区域" label-width="80px">
          <el-select v-model="form1.subjectID" style="width: 100%">
            <el-option :label="item.label" :value="item.value" v-for="(item,index) in subject" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动名称" label-width="80px">
          <el-input v-model="form1.directoryName" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="btnok">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { add, changeState, list, remove, update } from '@/api/hmmm/directorys'
import { status } from '@/api/hmmm/constants'
import { simple1111 } from '@/api/hmmm/subjects'

export default {
  data () {
    return {
      tableData: [],
      aaabb: false,
      form1: {
        directoryName: '',
        subjectID: '',
        id: null
      },
      dialogFormVisible: false,
      subject: [],
      total: '',
      obj: {
        page: 1,
        pagesize: 10,
        directoryName: '',
        state: ''

      }
    }
  },
  created () {
    this.list()
    this.simple1111()
  },
  methods: {
    async btnok () {
      if (this.aaabb) {
        await update(this.form1)
        this.$message.success('修改成功')
        this.close()
      } else {
        await add(this.form1)
        this.$message.success('新增成功')
        this.close()
      }
    },
    EditSubjects (row) {
      this.dialogFormVisible = true
      if (row.id) {
        this.aaabb = true
        this.form1.id = row.id
        this.form1.directoryName = row.directoryName
        this.form1.subjectID = row.subjectID
      }
    },
    close () {
      this.dialogFormVisible = false
      this.aaabb = false
      this.form1 = {
        directoryName: '',
        id: null,
        subjectID: ''
      }
    },
    async simple1111 () {
      const res = await simple1111()
      this.subject = res.data
    },
    async delbtn (row) {
      await this.$confirm('确定删除嘛')
      await remove(row)
      this.$message.success('删除成功')
      await this.list()
    },
    async editbtn (row) {
      await this.$confirm('确定修改嘛')
      row.state = row.state === 1 ? 0 : 1
      await changeState(row)
      this.$message.success('修改成功')
    },
    aaaa (row, column, cellValue) {
      return status.find(item => item.value === cellValue)?.label
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
    },
    handleSizeChange (i) {
      this.obj.pagesize = i
      this.list()
    },
    handleCurrentChange (i) {
      this.obj.page = i
      this.list()
    },
    async list () {
      const newobj = {}
      for (const k in this.obj) {
        if (this.obj[k] === '') {
        } else {
          newobj[k] = this.obj[k]
        }
      }
      const res = await list(newobj)
      this.tableData = res.data.items
      this.total = res.data.counts
    },
    resetForm () {
      this.obj.state = ''
      this.obj.directoryName = ''
    }
  }

}
</script>

<style scoped lang='less'>

.container {
  padding: 20px;
}
</style>
