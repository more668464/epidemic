<template>
  <div>
    <div class="options">
      <el-button type="primary" @click="toAdd">新增栏目</el-button>
    </div>

    <el-table :data="categoryAll" style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="name" label="栏目名称" width="180">
      </el-table-column>
      <el-table-column prop="description" label="描述" width="180">
      </el-table-column>
      <el-table-column prop="no" label="序号"> </el-table-column>
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
    <div>
      <el-dialog
        :title="title"
        :visible.sync="dialogFormVisible"
        @close="closeHandler(form)"
      >
        <el-form
          :model="form"
          :ref="form"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="分类名称："
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="分类介绍："
            :label-width="formLabelWidth"
            prop="description"
          >
            <el-input v-model="form.description" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="序号：" :label-width="formLabelWidth" prop="no">
            <el-input v-model="form.no" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="toSave(form)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 模态框结束 -->
  </div>
</template>

<script>
// 引入axios的get方法
// import { findAll } from "@/api/userManage";
import { mapActions, mapGetters } from "vuex";
export default {
  // MVVM
  data() {
    return {
      // 数据模型
      msg: "hello",
      // tableData: [],
      params: {
        page: 1,
        pageSize: 10,
        username: "",
      },
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "100px",
      // rules: {
      //   username: [
      //     { required: true, message: "请输入用户名", trigger: "blur" },
      //   ],
      //   password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      //   telephone: [
      //     {
      //       required: true,
      //       message: "请输入电话号码",
      //       trigger: "blur",
      //     },
      //   ],
      //   gender: [{ required: true, message: "请选择性别", trigger: "change" }],
      // },
      title: "",
    };
  },
  computed: {
    ...mapGetters("category", ["categoryAll"]),
  },
  // 方法
  methods: {
    ...mapActions("category", ["findAll", "deleteById", "saveOrUpdate"]),
    //删除
    handleDelete(row) {
      console.log(JSON.stringify(row));
      console.log(row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteById({
            id: row.id,
            params: this.params,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //分页
    currentChange(page) {
      // console.log(page);
      this.params.page = page;
      this.findAll(this.params);
    },
    //添加信息
    toAdd() {
      this.form = {};
      this.dialogFormVisible = true;
      this.title = "新增栏目";
    },
    //模态框关闭回调函数
    closeHandler(form) {
      this.form = {};
      //清空校验
      this.$refs[form].resetFields();
    },
    //确认
    toSave(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log(form);
          this.saveOrUpdate(form).then((res) => {
            this.findAll(this.params);
            this.dialogFormVisible = false;
            this.$message({
              showClose: true,
              message: "添加成功",
              type: "success",
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //编辑
    handleEdit(row) {
      this.form = { ...row };
      this.title = "编辑栏目";
      this.dialogFormVisible = true;
    },
  },

  // 钩子函数  在vue实例创建完毕之后调用
  created() {
    this.findAll(this.params);
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
