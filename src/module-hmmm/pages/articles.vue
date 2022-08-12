<template>
  <div class='container'>
    <el-card>
      <el-form ref="Lists" :inline="true" :model="List">
        <el-row type="flex">

          <el-form-item label="关键字">
            <el-input v-model="List.keyword" placeholder="根据文章标题搜索"></el-input>
          </el-form-item>

          <el-form-item label="状态">
            <el-select v-model="List.state" placeholder="请选择" style="width: 94%;">
              <el-option label="启用" value="1"></el-option>
              <el-option label="停用" value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button size="small" @click="resetForm">消除</el-button>
            <el-button size="small" type="primary" @click="getList">搜索</el-button>
          </el-form-item>
          <el-form-item style="margin-left: 400px">
            <el-button icon="el-icon-edit" size="small" type="success">新增用户</el-button>
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
        style="width: 100%">
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column label="文章标题" prop="title"></el-table-column>
        <el-table-column label="阅读人" prop="visits"></el-table-column>
        <el-table-column label="录入人" prop="username"></el-table-column>
        <el-table-column label="录入时间" :formatter="dateFormat" prop="createTime"></el-table-column>
        <el-table-column label="状态" :formatter="formatterState" prop="state"></el-table-column>
        <el-table-column label="操作" prop="shortName">
          <template slot-scope="scope">
            <el-button @click="dialogVisible=true" type="text" size="small">预览</el-button>
            <el-button type="text" size="small">禁用</el-button>
            <el-button type="text" size="small">修改</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    </el-card>
    <articles-preview :dialogVisible="dialogVisible"/>
  </div>
</template>

<script>
import { list } from '@/api/hmmm/articles'
import { statearticles } from '@/api/hmmm/citys'
import ArticlesPreview from '@/module-hmmm/components/articles-preview'

export default {
  components: { ArticlesPreview },
  data () {
    return {
      tableData: [],
      total: null,
      dialogVisible: false,
      List: {
        keyword: '',
        state: null,
        page: 1,
        pagesize: 10
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      const List = {}
      for (const key in this.List) {
        if (this.List[key]) {
          List[key] = this.List[key]
        }
      }
      const res = await list(List)
      // console.log(res)
      this.tableData = res.data.items
      this.total = res.data.counts
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
        keyword: '',
        state: null,
        page: 1,
        pagesize: 10
      }
    },
    // 过滤
    formatterState (a, b, cellValue) {
      const useType = statearticles.find(
        (item) => item.type === cellValue
      )?.value
      return useType || '未知'
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
.container {
  padding: 20px;
}
</style>
