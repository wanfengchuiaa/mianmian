<template>
  <div class="container">
    <el-card>
      <el-form label-width="120px">
        <el-row type="flex">
          <el-col :span="6" style="text-align: start">
            <el-form-item label="标签名称">
              <el-input v-model="tagName"></el-input> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select v-model="value" placeholder="请选择">
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
              </el-select>
              <el-button style="margin-left: 10px" @click="clear"
                >清除</el-button
              ><el-button type="primary" @click="sousuo"
                >搜索</el-button
              ></el-form-item
            ></el-col
          >
          <el-col :span="6">
            <el-form-item>
              <el-button type="success" icon="el-icon-edit" @click="addTage"
                >新增标签</el-button
              >
            </el-form-item></el-col
          ></el-row
        ></el-form
      >
      <el-alert
        :title="`数据一共${total}条`"
        type="info"
        show-icon
        :closable="false"
      >
      </el-alert>
      <el-table
        :header-cell-style="{
          'border-bottom': '2px solid #e8e8e8',
          background: '#FaFaFa',
        }"
        :data="lists"
        style="width: 100%; margin-top: 10px"
      >
        <el-table-column fixed type="index" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="subjectName" label="所属学科" width="180">
        </el-table-column>
        <el-table-column prop="tagName" label="标签名称" width="180">
        </el-table-column>
        <el-table-column prop="username" label="创建者" width="180">
        </el-table-column>
        <el-table-column prop="addDate" label="创建日期" width="180">
        </el-table-column>
        <el-table-column prop="state" label="状态" width="180">
        </el-table-column>
        <el-table-column prop="disprice" label="操作" width="180">
          <template v-slot="{ row }">
            <el-button @click="handleClick(row)" type="text" size="small">{{
              row.state === 0 ? "启用" : "禁用"
            }}</el-button>
            <el-button
              type="text"
              size="small"
              :disabled="row.state === 1 ? true : false"
              @click="editTags(row)"
              >修改</el-button
            >
            <el-button
              type="text"
              size="small"
              :disabled="row.state === 1 ? true : false"
              @click="remove(row)"
              >删除</el-button
            >
          </template></el-table-column
        >
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
            layout="prev, pager, next ,sizes,jumper"
          >
          </el-pagination></div
      ></el-row>
    </el-card>
    <tagAdd ref="child" @getList="list" :dialogVisible.sync="dialogVisible" />
  </div>
</template>

<script>
import tagAdd from "../components/tags-add.vue";
import { list, changeState, remove } from "@/api/hmmm/tags";
export default {
  name: "tags",
  components: { tagAdd },
  data(id) {
    return {
      isDisabled: false,
      dialogVisible: false,
      value: "",
      lists: [],
      tagName: "",
      page: {
        page: 1,
        pageSize: 10,
      },
      total: 100,
    };
  },
  created() {
    this.list();
  },
  methods: {
    async remove(data) {
      await remove(data);
      await this.list();
      this.$message.success("删除成功");
    },
    async editTags(row) {
      this.dialogVisible = true;
      this.$refs.child.detail(row);
    },
    async handleClick(row) {
      row.state = row.state === 1 ? 0 : 1;
      console.log(row.state);
      await changeState(row);
      this.$message.success("操作成功");
    },
    clear() {
      this.tagName = "";
    },
    async sousuo() {
      const res = await this.list();
      console.log(res);
    },
    addTage() {
      this.dialogVisible = true;
    },
    async list() {
      const res = await list({ ...this.page, tagName: this.tagName });
      this.lists = res.data.items;
      // console.log(res);
      this.total = res.data.counts;
      // this.page.page = res.data.pages;
      // this.page.pageSize = res.data.pagesize;
      // console.log(this.lists);
    },
    handleSizeChange() {},
    async handleCurrentChange(value) {
      this.page.page = value;
      this.list();
    },
  },
};
</script>

<style scoped lang="less"></style>
