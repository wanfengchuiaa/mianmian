<template>
  <el-card class="cardContent">
    <el-row>
      <el-col :span="21"
        ><el-input
          v-model="input"
          placeholder="请输入内容"
          style="width: 200px; margin-right: 10px"
        ></el-input>
        <el-button @click="clear">清除</el-button>
        <el-button type="primary" @click="list">搜索</el-button></el-col
      >
      <el-col :span="3">
        <el-button type="success" icon="el-icon-edit" @click="addPermission"
          >新增权限组</el-button
        ></el-col
      ></el-row
    >
    <el-alert
      style="margin-top: 20px"
      :title="`共${total}条记录`"
      type="info"
      show-icon
      :closable="false"
    >
    </el-alert>
    <el-table
      ref="multipleTable"
      :data="lists"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="305"> </el-table-column>
      <el-table-column prop="title" label="用户名" width="320">
      </el-table-column>
      <el-table-column label="日期" sortable width="300">
        <template slot-scope="scope">{{ scope.row.update_date }}</template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="120"
        header-align="center"
        fixed="right"
      >
        <template v-slot="{ row }">
          <el-button
            class="edit"
            type="primary"
            @click="handleClick(row.id)"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            type="danger"
            class="delete"
            icon="el-icon-delete"
            circle
            @click="delPermission(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination></div
    ></el-row>
    <permissionsAdd ref="addper" :title="title" />
  </el-card>
</template>

<script>
import permissionsAdd from "@/module-manage/components/permissions-add";
import { list, remove } from "@/api/base/permissions";
export default {
  name: "permissions",
  components: { permissionsAdd },
  data() {
    return {
      title: "",
      dialogFormVisible: false,
      input: "",
      page: {
        page: 1,
        pageSize: 10,
        keyword: 10,
      },
      total: 10,
      lists: [],
    };
  },

  created() {
    this.list();
  },

  methods: {
    clear() {
      this.input = "";
      this.list();
    },

    addPermission() {
      this.title = "添加权限";
      this.$refs.addper.dialogFormV();
      // this.dialogFormVisible = true;
    },
    async list() {
      const { data } = await list({ ...this.page, title: this.input });
      this.lists = data.list;
      // console.log(this.lists);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page.pageSize = val;
      this.list();
    },
    async handleClick(id) {
      this.title = "编辑权限";
      this.$refs.addper.dialogFormV();
      await this.$refs.addper.hanldeEditForm(id);
      await this.$refs.addper.setupData();
    },
    async delPermission(data) {
      await this.$confirm("确定删除吗?");
      await remove(data);
      await this.$message.success("删除成功");
      this.list();
    },
  },
};
</script>

<style scoped lang="less">
.cardContent {
  // width: 1320px;
  margin-left: 20px;
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
