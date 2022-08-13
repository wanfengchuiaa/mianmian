<template>
  <div>
    <el-card>
      <el-row type="flex" justify="end">
        <el-button
          size="small"
          icon="el-icon-edit"
          type="success"
          @click="isShowDialog = true"
          >添加菜单</el-button
        >
      </el-row>

      <el-table
        :data="menusList"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        default-expand-all
        :tree-props="{
          children: 'childs',
        }"
      >
        <el-table-column prop="title" label="标题" sortable width="180">
        </el-table-column>
        <el-table-column prop="code" label="权限点代码" sortable width="1000">
        </el-table-column>
        <el-table-column fixed="right" prop="address" label="操作">
          <template v-slot="{ row }">
            <el-button
              plain
              type="primary"
              icon="el-icon-edit"
              circle
              @click="edit(row.id)"
            ></el-button>
            <el-button
              plain
              type="danger"
              icon="el-icon-delete"
              circle
              @click="dele(row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加和编辑菜单弹层 -->
    <el-dialog title="创建菜单" :visible.sync="isShowDialog">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="权限组名称">
          <el-radio-group v-model="form.resource">
            <el-radio label="菜单"></el-radio>
            <el-radio label="权限点"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { list } from "@/api/base/menus";
export default {
  data() {
    return {
      menusList: [],
      isShowDialog: false,
    };
  },

  created() {
    this.getMenusList();
  },

  methods: {
    async getMenusList() {
      const res = await list();
      console.log(res.data);
      this.menusList = res.data;
    },
  },
};
</script>

<style scoped lang="less"></style>
