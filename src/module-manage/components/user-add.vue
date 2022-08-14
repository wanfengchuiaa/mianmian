<template>
  <div class="add-form">
    <el-dialog title="创建用户" :visible="dialogFormVisible" @close="close">
      <el-form
        :rules="ruleInline"
        ref="dataForm"
        :model="formBase"
        label-position="left"
        label-width="120px"
        style="width: 400px; margin-left: 120px"
      >
        <!-- ------------------------- 用户名 ------------------------- -->
        <el-form-item :label="$t('table.username')" prop="username">
          <el-input v-model="formBase.username"></el-input>
        </el-form-item>

        <!-- ------------------------- 邮箱 ------------------------- -->
        <el-form-item :label="$t('table.email')" prop="email">
          <el-input v-model="formBase.email"></el-input>
        </el-form-item>

        <!-- ------------------------- 密码 ------------------------- -->
        <el-form-item :label="$t('table.paddword')" prop="password" v-if="formBase.password != undefined">
          <el-input v-model="formBase.password"></el-input>
        </el-form-item>

        <!-- ------------------------- 角色 ------------------------- -->
        <el-form-item :label="$t('table.role')" prop="role">
          <el-input v-model="formBase.role"></el-input>
        </el-form-item>

        <!-- ------------------------- 权限组 ------------------------- -->
        <el-form-item :label="$t('table.permissionUser')" prop="permission_group_id">
          <el-select class="filter-item" v-model="formBase.permission_group_id">
            <el-option v-for="item in powerList" :value="item.id" :key="item.key" :label="item.title"></el-option>
          </el-select>
        </el-form-item>

        <!-- ------------------------- 联系电话 ------------------------- -->
        <el-form-item :label="$t('table.phone')" prop="phone">
          <el-input v-model="formBase.phone"></el-input>
        </el-form-item>

        <!-- ------------------------- 介绍 ------------------------- -->
        <el-form-item :label="$t('table.introduction')">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="Please input"
            v-model="formBase.introduction"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="createData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { add, detail, update } from '@/api/base/users'
import { simple } from '@/api/base/permissions'

export default {
  name: 'usersAdd',
  data () {
    return {
      userId: false,
      dialogFormVisible: false,
      formBase: {
        avatar: '',
        username: '',
        email: '',
        password: '',
        role: '',
        permission_group_id: '',
        phone: '',
        introduction: ''
      },
      ruleInline: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      powerList: [],
      value: ''
    }
  },
  created () {
    this.simple()
  },
  methods: {
    dialogFormV () {
      this.dialogFormVisible = true
    },

    close () {
      this.userId = false
      this.dialogFormVisible = false
      this.$refs.dataForm.resetFields()
      this.formBase = {
        avatar: '',
        username: '',
        email: '',
        password: '',
        role: '',
        permission_group_id: '',
        phone: '',
        introduction: ''
      }
    },

    async simple () {
      const res = await simple()
      this.powerList = res.data
    },

    async editData (data) {
      this.userId = true
      const obj = Object.keys(this.formBase)
      const res = await detail(data)
      for (const key in res.data) {
        if (obj.includes(key)) {
          this.formBase[key] = res.data[key]
        }
      }
      // this.formBase = res.data

      this.formBase.id = res.data.id
      this.dialogFormVisible = true
    },

    async createData () {
      // await this.$refs.dataForm.vlitate()
      if (this.userId) {
        await update(this.formBase)
        this.$message.success('修改成功')
      } else {
        await add(this.formBase)
        this.$message.success('新增用户成功')
      }
      this.close()
    }
  }
}
</script>

<style>
.el-form--label-left .el-form-item__label {
  text-align: right;
}

.el-form-item--medium {
  margin-bottom: 22px;
}

.el-dialog__footer {
  text-align: center;
}
</style>
