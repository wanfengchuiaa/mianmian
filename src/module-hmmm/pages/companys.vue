<template>
  <div class="companys">
    <el-card>
      <el-form ref="Lists" :inline="true" :model="List">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="标签名称">
              <el-input v-model="List.tags" placeholder="标签名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="城市">
              <el-select v-model="List.province" placeholder="活动区域" @change="changeProvince">
                <el-option v-for="item in provinces" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="地区">
              <el-select v-model="List.city" placeholder="活动区域">
                <el-option v-for="item in citys" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业简称">
              <el-input v-model="List.shortName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row justify="space-between" type="flex">
          <el-col :span="6" style="margin-left: 28px">
            <el-form-item label="状态">
              <el-select v-model="List.state" placeholder="请选择" style="width: 94%;">
                <el-option label="启用" value="1"></el-option>
                <el-option label="停用" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item style="margin-left: -13px">
              <el-button size="small" @click="resetForm">消除</el-button>
              <el-button size="small" type="primary" @click="getList">搜索</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-right: -90px">
            <el-button icon="el-icon-edit" size="small" type="success" @click="handleClick">新增用户</el-button>
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
        <el-table-column label="序号" prop="id" width="80"></el-table-column>
        <el-table-column label="企业编号" prop="number"></el-table-column>
        <el-table-column label="企业简称" prop="shortName"></el-table-column>
        <el-table-column label="标签" prop="tags"></el-table-column>
        <el-table-column label="创建者" prop="creatorID"></el-table-column>
        <el-table-column :formatter="dateFormat" label="创建日期" prop="addDate"></el-table-column>
        <el-table-column label="备注" prop="remarks"></el-table-column>
        <el-table-column :formatter="formatterState" label="状态" prop="state"></el-table-column>
        <el-table-column label="操作" prop="shortName">
          <template slot-scope="scope">
            <el-button size="mini" circle icon="el-icon-edit" plain type="primary"
                       @click="handleClick(scope.row)"></el-button>
            <el-button size="mini" :icon="scope.row.state===0?'el-icon-check':'el-icon-close'"
                       :type="scope.row.state===0?'success':'warning'"
                       circle plain
                       @click="chengeState(scope.row)"></el-button>
            <el-button size="mini" circle icon="el-icon-delete" plain type="danger"
                       @click="del(scope.row.id)"></el-button>
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
    <!--    创建用户-->
    <el-dialog
      :visible="dialogVisible"
      title="创建用户"
      width="50%"
      @close="close">
      <el-form ref="formDatas" :model="formData" :rules="rules" label-width="140px">
        <el-form-item label="企业名称" prop="shortName" style="width: 80%;">
          <el-input v-model="formData.shortName"></el-input>
        </el-form-item>
        <el-form-item label="所属公司" prop="company" style="width: 80%;">
          <el-input v-model="formData.company"></el-input>
        </el-form-item>
        <el-row type="flex">
          <el-col :span="10">
            <el-form-item label="城市地区" prop="province">
              <el-select v-model="formData.province" placeholder="请选择" @change="changeProvince">
                <el-option v-for="item in provinces" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item p>
              <el-select v-model="formData.city" placeholder="请选择">
                <el-option v-for="item in citys" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="方向（企业标签）" prop="tags" style="width: 80%;">
          <el-input v-model="formData.tags"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks" style="width: 80%;">
          <el-input v-model="formData.remarks" placeholder="请输入" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="addcity">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { add, detail, disabled, list, remove } from '@/api/hmmm/companys'
import { citys, provinces, state } from '@/api/hmmm/citys'

export default {
  data () {
    return {
      List: {
        page: 1,
        pagesize: 5,
        tags: '',
        province: '',
        city: '',
        shortName: '',
        state: null
      },
      formData: {
        city: '',
        company: '',
        isFamous: true,
        province: '',
        remarks: '',
        shortName: '',
        tags: ''
      },
      provinces: [],
      citys: [],
      tableData: [],
      total: null,
      dialogVisible: false,
      // 校验
      rules: {
        shortName: [
          {
            required: true,
            message: '请输入仓库名称',
            trigger: 'blur'
          }
        ],
        company: [
          {
            required: true,
            message: '请输入仓库名称',
            trigger: 'blur'
          }
        ],
        province: [
          {
            required: true,
            message: '请输入仓库名称',
            trigger: 'blur'
          }
        ],
        tags: [
          {
            required: true,
            message: '请输入仓库名称',
            trigger: 'blur'
          }
        ],
        remarks: [
          {
            required: true,
            message: '请输入仓库名称',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async addcity () {
      await this.$refs.formDatas.validate()
      await add(this.formData)
      await this.close()
      await this.getList()
    },
    // 城市列表
    async getList () {
      const List = {}
      for (const key in this.List) {
        if (this.List[key]) {
          List[key] = this.List[key]
        }
      }
      const res = await list(List)
      this.provinces = provinces()
      // console.log(res)
      this.tableData = res.data.items
      this.total = res.data.counts
    },
    // 清除表单
    resetForm () {
      this.$refs.Lists.resetFields()
      this.List = {
        page: 1,
        pagesize: 5,
        tags: '',
        province: '',
        city: '',
        shortName: '',
        state: null
      }
    },
    async close () {
      console.log(111)
      this.$refs.formDatas.resetFields()
      this.formData = {
        city: '',
        company: '',
        isFamous: true,
        province: '',
        remarks: '',
        shortName: '',
        tags: ''
      }
      this.dialogVisible = false
    },
    async handleClick (row) {
      this.dialogVisible = true
      if (row.addDate) {
        const res = await detail({ id: row.id })
        this.formData = res.data
      }
    },
    async chengeState (row) {
      console.log(row)
      this.$confirm('已成功启用, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const state = row.state === 0 ? 1 : 0
        await disabled({ id: row.id, state: state })
        this.getList()
        this.$message({
          type: 'success',
          message: `${state === 0 ? '启用成功!' : '禁用成功!'}`
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
    // 地区
    changeProvince (province) {
      console.log(province)
      this.List.city = ''
      this.formData.city = ''
      this.citys = citys(province)
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
    // 过滤
    formatterState (a, b, cellValue) {
      const useType = state.find(
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

<style lang='less' scoped>
.companys {
  padding: 20px;

  .el-form--inline .el-form-item {
    margin-right: unset;
  }
}
</style>
