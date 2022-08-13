<template>
  <div>
    <el-card>
      <el-row type="flex" justify="end">
        <el-button size="small" icon="el-icon-edit" type="success" @click="isShowDialog = true">添加菜单</el-button>
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
        <el-table-column prop="title" label="标题" sortable width="180"> </el-table-column>
        <el-table-column prop="code" label="权限点代码" sortable width="1000"> </el-table-column>
        <el-table-column fixed="right" prop="address" label="操作">
          <template v-slot="{ row }">
            <el-button plain type="primary" icon="el-icon-edit" circle @click="edit(row)"></el-button>
            <el-button plain type="danger" icon="el-icon-delete" circle @click="dele(row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加和编辑菜单弹层 -->
    <el-dialog title="创建菜单" :visible.sync="isShowDialog">
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="权限组名称">
          <el-radio-group v-model="formData.resource">
            <el-radio v-model="radio" label="1">菜单</el-radio>
            <el-radio v-model="radio" label="权限点"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="权限组名称">
          <el-select v-model="value">
            <el-option :value="0" :label="$t('table.powerNav')">主导航</el-option>
            <el-option v-for="item in menusList" :key="item.id" :label="item.title" :value="item.value">
              <!-- <el-tree default-expand-all :data="menusList" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
              <!-- <el-tree default-expand-all :data="chuli" :props="defaultProps"></el-tree> -->
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限代码" prop="code">
          <el-input v-model="formData.code" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="权限标题" prop="title">
          <el-input v-model="formData.title" style="width: 50%"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button>取消</el-button>
        <el-button type="primary" @click="btnOk">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { list, detail, add, update } from '@/api/base/menus'
import { transListToTree } from '@/utils/index.js'
export default {
  data() {
    return {
      radio: '1',
      menusList: [],
      // chuli: [],
      isShowDialog: false,
      formData: {
        code: '',
        title: '',
      },
      rules: {
        code: [{ required: true, message: '权限代码不能为空', trigger: 'blur' }],
        title: [{ required: true, message: '权限标题不能为空', trigger: 'blur' }],
      },
      // defaultProps: {
      //   children: 'childs',
      //   label: 'title',
      // },
      options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
      value: '主导航',
    }
  },

  created() {
    this.getMenusList()
  },

  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    async getMenusList() {
      const res = await list()
      // console.log(res.data)
      this.menusList = res.data
      // this.chuli = transListToTree(res.data.childs, '')
      // console.log(this.chuli)
      // console.log(222)
    },
    // 编辑
    async edit(data) {
      // 编辑状态
      const res = await detail(data)
      console.log(res.data)
      this.formData = res.data
      this.isShowDialog = true
    },
    async btnOk() {
      if (this.formData.id) {
        await update(this.formData)
      } else {
        await add(this.formData)
        this.$message.success('新增成功')
      }
    },
  },
}
</script>

<style scoped lang="less"></style>
