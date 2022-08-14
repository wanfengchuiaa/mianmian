<template>
  <div class="pages">
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
  </div>
</template>
<script>
export default {
  name: "PageTool",
  props: [
    "total",
    "paginationPage",
    "paginationPagesize",
    "pagesize",
    "page",
    "counts",
  ],
  data() {
    return {};
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page = val;
      console.log(`当前页: ${val}`);
    },
  },
};
</script>
<style>
.blue {
  color: #409eff;
}
</style>
