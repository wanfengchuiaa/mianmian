<template>
  <el-card class="cardContent">
    <el-alert
      style="margin: 10px 20px 0"
      :title="`共${total}条记录`"
      type="info"
      show-icon
      :closable="false"
    >
    </el-alert>
    <el-table
      :header-cell-style="{'text-align': 'center','border-bottom':'2px solid #e8e8e8',  'background': '#FaFaFa'}"
      :cell-style="{'text-align': 'center'}"
      :data="tableData"
      style="width: 100%; margin-top: 10px"
      :loading="loading"
    >
      <el-table-column fixed prop="type" label="操作类型">
      </el-table-column>
      <el-table-column prop="name" label="操作人">
      </el-table-column>
      <el-table-column prop="result" label="执行结果">
      </el-table-column>
      <el-table-column prop="data" label="操作时间">
      </el-table-column>
      <el-table-column prop="disprice" label="描述">
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end">
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.page"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="page.pageSize"
          :total="total"
          layout="  prev, pager, next ,sizes,jumper"
        >
        </el-pagination>
      </div
      >
    </el-row>
  </el-card>
</template>

<script>

export default {
  name: 'permissions',

  data () {
    return {
      loading: false,
      page: {
        page: 1,
        pageSize: 10,
        keyword: 10
      },
      total: 100,
      tableData: [
        {
          type: 'us',
          name: '曹霞',
          result: '必持标包质好内么器复交看持厂确却计造好',
          data: '普陀区',
          address: '1988-02-29 07:34:49',
          disprice: '20.38'
        },
        {
          type: 'us',
          name: '胡霞',
          result: '必持标包质好内么器复交看持厂确却计造好',
          data: '普陀区',
          address: '1988-02-29 07:34:49',
          disprice: '20.38'
        },
        {
          type: 'us',
          name: '彦军',
          result: '必持标包质好内么器复交看持厂确却计造好',
          data: '普陀区',
          address: '1988-02-29 07:34:49',
          disprice: '20.38'
        },
        {
          type: 'us',
          name: '赵杰',
          result: '必持标包质好内么器复交看持厂确却计造好',
          data: '普陀区',
          address: '1988-02-29 07:34:49',
          disprice: '20.38'
        },
        {
          type: 'us',
          name: '秦娜',
          result: '必持标包质好内么器复交看持厂确却计造好',
          data: '普陀区',
          address: '1988-02-29 07:34:49',
          disprice: '20.38'
        },
        {
          type: 'us',
          name: '胡洋',
          result: '必持标包质好内么器复交看持厂确却计造好',
          data: '普陀区',
          address: '1988-02-29 07:34:49',
          disprice: '20.38'
        },
        {
          type: 'us',
          name: '嘉敏',
          result: '必持标包质好内么器复交看持厂确却计造好',
          data: '普陀区',
          address: '1988-02-29 07:34:49',
          disprice: '20.38'
        },
        {
          type: 'us',
          name: '徐刚',
          result: '必持标包质好内么器复交看持厂确却计造好',
          data: '普陀区',
          address: '1988-02-29 07:34:49',
          disprice: '20.38'
        }
      ]
    }
  },
  methods: {
    handleCurrentChange (value) {
      this.loading = true
      this.page.page = value
    },
    handleSizeChange (value) {
      this.page.pageSize = value
    }
  }
}
</script>

<style scoped lang="less">
.cardContent {
  // width: 1320px;
  margin-left: 20px;
  margin-right: 10px;
  margin-top: 20px;

  .el-table__body .el-table__cell {
    text-align: center;
  }

  .edit {
    color: #409eff;
    background: #ecf5ff;
    border-color: #b3d8ff;
  }

  .delete {
    color: #f56c6c;
    background: #fef0f0;
    border-color: #fbc4c4;
  }
}
</style>
