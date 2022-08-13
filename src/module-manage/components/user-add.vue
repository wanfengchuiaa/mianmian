<template>
  <div class="add-form">
    <!-- :title="text + pageTitle" -->
    <el-dialog title="创建用户" :visible="dialogFormVisible" @close="close">
      <el-form
        :rules="ruleInline"
        ref="dataForm"
        :model="formBase"
        label-position="left"
        label-width="120px"
        style="width: 400px; margin-left: 120px"
      >
        <el-form-item :label="$t('table.username')" prop="username">
          <el-input v-model="formBase.username"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.email')" prop="email">
          <el-input v-model="formBase.email"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('table.paddword')"
          prop="password"
          v-if="formBase.password != undefined"
        >
          <el-input v-model="formBase.password"></el-input>
        </el-form-item>

        <!-- 角色 -->
        <el-form-item :label="$t('table.role')" prop="role">
          <el-input v-model="formBase.role"></el-input>
        </el-form-item>
        <!-- 权限组 -->
        <el-form-item
          :label="$t('table.permissionUser')"
          prop="permission_group_id"
        >
          <el-select class="filter-item" v-model="formBase.permission_group_id">
            <el-option
              v-for="item in qxTitle"
              :value="item.id"
              :key="item.key"
              :label="item.title"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('table.phone')" prop="phone">
          <el-input v-model="formBase.phone"></el-input>
        </el-form-item>

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
        <el-button @click="close">{{ $t("table.cancel") }}</el-button>
        <el-button type="primary" @click="createData">{{
          $t("table.confirm")
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { detail, update, add } from "@/api/base/users";
import { simple } from "@/api/base/permissions";

export default {
  name: "usersAdd",
  props: {
    tableList: {
      type: Array,
    },
    qxTitle: {
      type: Array,
    },
    userId: {
      type: Object,
    },
    formData: {
      type: Object,
    },
  },
  data() {
    return {
      dialogFormVisible: false,
      formBase: {
        username: "",
        email: "",
        password: "",
        role: "",
        permission_group_id: "",
        phone: "",
        introduction: "",
      },
      ruleInline: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        email: [{ required: true, message: "邮箱不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
      List: [],
    };
  },
  methods: {
    // 弹层显示
    dialogFormV() {
      this.dialogFormVisible = true;
    },

    close() {
      this.dialogFormVisible = false;
      this.$refs.dataForm.resetFields();
      this.formBase = {
        username: "",
        email: "",
        password: "",
        role: "",
        permission_group_id: "",
        phone: "",
        introduction: "",
      };
    },

    // 编辑
    async editData() {
      if (this.userId) {
        this.formBase = this.userId;
      }
      this.dialogFormVisible = true;
    },

    // 表单提交
    async createData() {
      await add(this.formBase);
      this.$message.success("新增用户成功");
    },
  },
};
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
