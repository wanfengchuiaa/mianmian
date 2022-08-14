<template>
  <div class="container">
    <el-dialog
      title="新增目录"
      :visible="dialogVisible"
      width="30%"
      :before-close="close"
    >
      <el-form
        ref="formRef"
        label-width="80px"
        :model="ruleForm"
        :rules="rules"
      >
        <el-form-item label="所属学科">
          <el-select
            v-model.number="ruleForm.subjectID"
            clearable
            placeholder="请选择"
            style="width: 266px"
            type="number"
          >
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.subjectName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目录名称" prop="tagName">
          <el-input
            v-model="ruleForm.tagName"
            placeholder="请输入目录名称"
          ></el-input>
        </el-form-item
        >
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="isOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { list } from '@/api/hmmm/subjects'
import { add, detail, update } from '@/api/hmmm/tags'

export default {
  name: 'tagAdd',
  props: { dialogVisible: { type: Boolean } },
  data () {
    return {
      ruleForm: { id: null, subjectID: null, tagName: '', isFrontDisplay: 1 },
      rules: {
        tagName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      options: []
    }
  },
  created () {
    this.list()
  },
  methods: {
    close () {
      this.$emit('update:dialogVisible', false)
      // this.dialogVisible = false;
    },
    async detail (row) {
      const res = await detail(row)
      console.log(res)
      this.ruleForm = res.data
      console.log(this.ruleForm)
    },
    async isOk () {
      try {
        await this.$refs.formRef.validate()
        if (this.ruleForm.id) {
          await update(this.ruleForm)
          this.$message.success('修改标签成功')
        } else {
          await add(this.ruleForm)
          this.$message.success('新增标签成功')
        }
        this.ruleForm = { subjectName: '', isFrontDisplay: 1 }
        this.$refs.formRef.resetFields()
        this.close()
        this.$emit('getList')
      } catch (e) {
        console.log(e)
      }
    },

    async list () {
      const res = await list()
      this.options = res.data.items
    }
  }
}
</script>

<style scoped lang="less"></style>
