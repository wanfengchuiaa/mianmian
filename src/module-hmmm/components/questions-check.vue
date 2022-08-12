<template>
  <div class='container'>
    <el-dialog title="题目审核" :visible="dialogFormVisible" width="450px" @close="close">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item>
          <el-radio-group v-model="form.chkState">
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="2">拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="chkRemarks">
          <el-input type="textarea" v-model="form.chkRemarks" placeholder="请输入审核意见"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="btnok">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { choiceCheck } from '@/api/hmmm/questions'

export default {
  props: ['dialogFormVisible', 'id'],
  data () {
    return {
      form: {
        chkRemarks: '',
        chkState: ''
      },
      rules: {
        chkRemarks: [{
          required: true,
          message: '请输入审核意见',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    async btnok () {
      this.form.id = this.id
      await this.$refs.form.validate()
      await choiceCheck(this.form)
      this.$message.success('审批完成')
      this.$emit('update:dialogFormVisible', false)
    },
    close () {
      this.$refs.form.resetFields()
      this.$emit('update:dialogFormVisible', false)
      this.form = {
        chkRemarks: '',
        region: ''
      }
    }
  }
}
</script>

<style scoped lang='less'></style>
