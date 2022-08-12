<template>
  <div class='container'>
    <el-dialog
      title="预览文章"
      :visible.sync="dialogVisible"
      width="60%">
      <span>这是一段信息</span>
  </div>
</template>

<script>
export default {
  name: 'articlesPreview',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang='less'></style>
