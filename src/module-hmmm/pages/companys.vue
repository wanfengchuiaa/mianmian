<template>
  <div class="companys">
    <el-card>
      <el-form :inline="true" :model="List" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="标签名称">
              <el-input v-model="List.tags" placeholder="标签名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="城市">
              <el-select v-model="List.province" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="地区">
              <el-input v-model="List.city" placeholder="标签名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业简称">
              <el-input v-model="List.shortName" placeholder="标签名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row justify="space-between" type="flex">
          <el-col :span="6" style="margin-left: 28px">
            <el-form-item label="状态">
              <el-input v-model="List.state" placeholder="标签名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item>
              <el-button size="small">消除</el-button>
              <el-button size="small" type="primary">搜索</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-right: -21px">
            <el-button icon="el-icon-edit" size="small" type="success">新增用户</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-alert
        show-icon
        title="消息提示的文案"
        type="info">
      </el-alert>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="日期"
          prop="date"
          width="180">
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="name"
          width="180">
        </el-table-column>
        <el-table-column
          label="地址"
          prop="address">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { list } from '@/api/hmmm/companys'

export default {
  data () {
    return {
      List: {
        page: 1,
        pagesize: 10,
        tags: '标签名称',
        province: '北京市',
        city: '朝阳区',
        shortName: '企业简称',
        state: 1
      },
      tableData: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      const res = await list(this.List)
      console.log(res)
    },
    onSubmit () {
      console.log(111)
    }
  }

}
</script>

<style lang='less' scoped>
.companys {
  padding: 20px;
}
</style>
