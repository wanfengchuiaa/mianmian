<template>
  <div class='container'>
    <el-card>
      <el-form ref="Lists" :model="List" label-width="80px">
        <el-row type="flex">
          <el-col :span="8" style="display: flex">
            <el-form-item label="学科名称">
              <el-input style="width: 100%" v-model="List.subjectName" placeholder="根据文章标题搜索"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item>
              <el-button size="small" @click="resetForm">消除</el-button>
              <el-button size="small" type="primary" @click="getList">搜索</el-button>
            </el-form-item>
          </el-col>
          <el-col style="display:flex;justify-content: end">
            <el-form-item style="">
              <el-button icon="el-icon-edit" size="small" type="success" @click="EditSubjects({})">新增用户</el-button>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
      <el-alert
        :title="`共 ${total} 条记录`"
        show-icon
        type="info">
      </el-alert>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column label="学科名称" prop="subjectName"></el-table-column>
        <el-table-column label="创建者" prop="username"></el-table-column>
        <el-table-column label="创建日期" :formatter="dateFormat" prop="addDate"></el-table-column>
        <el-table-column label="前台是否显示" :formatter="formatterSubject" prop="isFrontDisplay"
                         width="120"></el-table-column>
        <el-table-column label="二级目录" prop="twoLevelDirectory"></el-table-column>
        <el-table-column label="标签" prop="tags"></el-table-column>
        <el-table-column label="题目数量" prop="totals"></el-table-column>
        <el-table-column label="操作" prop="shortName" width="280">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="$router.push('directorys')">学科分类</el-button>
            <el-button type="text" size="small" @click="$router.push('tags')">学科标签</el-button>
            <el-button type="text" size="small" :disabled="scope.row.state === 1" @click="EditSubjects(scope.row)">修改
            </el-button>
            <el-button type="text" size="small" :disabled="scope.row.state === 1" @click="del(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center">
        <div class="block">
          <el-pagination
            :current-page="List.page"
            :page-size="10"
            :page-sizes="[2, 10, 30, 40]"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </el-row>
    </el-card>
    <el-dialog :visible="dialogVisible" :title="`${EditSubject.id?'修改学科':'增加学科'}`" @close="close">
      <el-form>
        <el-form-item label="学科名称">
          <el-input v-model="EditSubject.subjectName" placeholder="根据文章标题搜索"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch
            v-model="EditSubject.isFrontDisplay"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="close">取消</el-button>
          <el-button size="small" type="primary" @click="btnOk">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { add, list, remove, update } from '@/api/hmmm/subjects'
import { statesubject } from '@/api/hmmm/citys'

export default {
  name: 'Subject',
  data () {
    return {
      tableData: [],
      total: null,
      dialogVisible: false,
      List: {
        subjectName: '',
        page: 1,
        pagesize: 10
      },
      EditSubject: {
        id: null,
        isFrontDisplay: 1,
        subjectName: '学科名称'
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async EditSubjects (row) {
      console.log(row)
      this.EditSubject = row
      this.dialogVisible = true
    },
    async del (id) {
      this.$confirm('此操作将永久删除用户 , 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await remove({ id: id })
        this.getList()
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async getList () {
      const List = {}
      for (const key in this.List) {
        if (this.List[key]) {
          List[key] = this.List[key]
        }
      }
      const res = await list(List)
      console.log(res)
      this.tableData = res.data.items
      this.total = res.data.counts
    },
    async btnOk () {
      if (this.EditSubject.id) {
        await update(this.EditSubject)
        this.$message.success('修改成功')
      } else {
        await add(this.EditSubject)
        this.$message.success('添加成功')
      }
      this.getList()
      this.close()
    },
    // 分页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.List.pagesize = val
      this.getList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.List.page = val
      this.getList()
    },
    // 清除表单
    resetForm () {
      this.$refs.Lists.resetFields()
      this.List = {
        subjectName: '',
        page: 1,
        pagesize: 10
      }
    },
    close () {
      this.dialogVisible = false
    },
    // 过滤
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
    formatterSubject (a, b, cellValue) {
      const useType = statesubject.find(
        (item) => item.type === cellValue
      )?.value
      return useType || '未知'
    }
  }
}

</script>

<style scoped lang='less'>
.container {
  padding: 20px;
}
</style>
