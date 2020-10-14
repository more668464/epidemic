<template>
  <div>
    <div class="options">
      <el-button type="primary" @click="toAdd">新增</el-button>
    </div>

    <el-table :data="privilegeData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="name" label="权限名" width="180">
      </el-table-column>

      <el-table-column prop="num" label="序号" width="180"> </el-table-column>
      <el-table-column prop="type" label="类型" width="180"> </el-table-column>
      <el-table-column
        prop="parentId"
        label="父权限"
        width="180"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="text" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="权限名：" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="序号" :label-width="formLabelWidth">
          <el-input v-model="form.num" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="form.type" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  // MVVM
  data() {
    return {
      form: {},
      title: "新增",
      dialogFormVisible: false,
      formLabelWidth: "180px",
    };
  },
  computed: {
    ...mapGetters("privilege", ["privilegeData"]),
  },
  // 方法
  methods: {
    ...mapActions("privilege", ["findAll", "deleteById", "saveOrUpdate"]),
    handleDelete(row) {
      this.deleteById(row.id);
    },
    handleEdit(row) {
      let temp = { ...row };
      this.form = temp;
      this.dialogFormVisible = true;
      this.title = "编辑";
    },
    toAdd() {
      this.form = {};
      this.dialogFormVisible = "true";
      this.title = "新增";
    },
    toSave() {
      this.saveOrUpdate(this.form).then(() => {
        this.dialogFormVisible = false;
        this.$message({
          message: "保存成功",
          type: "success",
        });
      });
    },
  },

  // 钩子函数  在vue实例创建完毕之后调用
  created() {
    this.findAll();
  },
  // 页面渲染完  钩子函数
  mounted() {},
};
</script>

<style scoped>
.options > div {
  float: left;
  width: 200px;
  margin-left: 20px;
}
.options > button {
  float: left;
}
</style>