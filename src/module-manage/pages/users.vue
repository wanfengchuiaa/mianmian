<template>
  <div>
    <el-card style="margin: 20px">
      <!-- ------------------- 搜索新增区域 ------------------- -->
      <el-row type="flex" justify="space-between">
        <el-col>
          <el-input
            style="width: 200px"
            size="small"
            placeholder="根据用户名搜索"
            v-model="userName"
          ></el-input>
          <el-button size="small" style="margin-left: 15px" @click="clearSearch"
            >清空</el-button
          >
          <el-button size="small" type="primary" @click="tableData1"
            >搜索</el-button
          >
        </el-col>
        <el-col> </el-col>
        <el-row>
          <el-col>
            <el-button
              size="small"
              icon="el-icon-edit"
              type="success"
              @click="addUserDialog"
              >新增用户</el-button
            >
          </el-col>
        </el-row>
      </el-row>

      <!-- ------------------- 消息提示 ------------------- -->
      <el-alert
        style="margin: 20px 0"
        title="共xx条记录"
        type="info"
        show-icon
        :closable="false"
      >
      </el-alert>

      <!-- ------------------- 表格数据区域 ------------------- -->
      <el-table :data="tableList" stripe style="width: 100%">
        <el-table-column align="center" prop="id" label="序号" width="180">
        </el-table-column>
        <el-table-column align="center" prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column align="center" prop="phone" label="联系电话">
        </el-table-column>
        <el-table-column align="center" prop="username" label="用户名">
        </el-table-column>
        <el-table-column
          align="center"
          prop="permission_group_title"
          label="权限组名称"
        >
        </el-table-column>
        <el-table-column align="center" prop="role" label="角色">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <el-button
              icon="el-icon-edit"
              type="primary"
              plain
              circle
              @click="handleEdit(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- ------------------- 分页区域 ------------------- -->
      <el-row type="flex" justify="end">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pagesize"
          :total="counts"
          layout=" prev, pager, next,sizes, jumper"
        >
        </el-pagination>
      </el-row>
    </el-card>

    <!-- ------------------- 新增用户弹层 ------------------- -->
    <usersAdd
      :formData="formData"
      :userId="userId"
      :qxTitle="qxTitle"
      :tableList="tableList"
      ref="addUser"
    ></usersAdd>
  </div>
</template>

<script>
import PageTool from "../components/page-tool.vue";
import usersAdd from "../components/user-add.vue";
import { profile } from "@/api/base/frame";
import { list } from "@/api/base/users";
import { simple } from "@/api/base/permissions";
import { detail } from "@/api/base/users";
export default {
  components: {
    PageTool,
    usersAdd,
  },
  data() {
    return {
      formData: {},
      tableList: [],
      userName: "",
      qxTitle: [],
      userId: {},
      page: 1,
      pagesize: 10,
      counts: 0,
    };
  },

  created() {
    this.tableData1();
  },

  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
      this.tableData1();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.tableData1();
    },
    // >>>-------------------> 清空搜索框 <-------------------<<<
    clearSearch() {
      this.userName = "";
      this.tableData1();
    },
    // >>>-------------------> 编辑 <-------------------<<<
    async handleEdit(data) {
      this.userId = data;
      this.$refs.addUser.editData();
    },
    // >>>-------------------> 获取表格数据 <-------------------<<<
    async tableData1() {
      const res = await list({
        username: this.userName,
        page: this.page,
        pagesize: this.pagesize,
      });
      this.counts = res.data.counts;
      this.tableList = res.data.list;
    },
    // >>>-------------------> 新增 <-------------------<<<
    async addUserDialog() {
      const res = await simple();
      this.qxTitle = res.data;
      this.$refs.addUser.dialogFormV();
    },
  },
};
</script>

<style scoped lang="less"></style>
