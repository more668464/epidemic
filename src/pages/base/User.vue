<template>
  <div>
    <div class="options">
      <el-button type="primary" @click="toAdd">新增用户</el-button>
      <el-input placeholder="用户名" v-model="params.username" clearable>
      </el-input
      ><el-button type="primary" @click="toSearch">查询</el-button>
    </div>

    <el-table :data="userData" style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="180">
      </el-table-column>
      <el-table-column prop="password" label="密码"> </el-table-column>
      <el-table-column prop="telephone" label="手机号码"> </el-table-column>
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
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange"
      ></el-pagination>
    </div>
    <!-- 分页结束 -->
    <!-- 模态框 -->
    <div>
      <el-dialog
        :title="title"
        :visible.sync="dialogFormVisible"
        @close="closeHandler(form)"
      >
        <el-form
          :model="form"
          :rules="rules"
          :ref="form"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="用户名："
            :label-width="formLabelWidth"
            prop="username"
          >
            <el-input v-model="form.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="密码："
            :label-width="formLabelWidth"
            prop="password"
          >
            <el-input v-model="form.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="联系方式："
            :label-width="formLabelWidth"
            prop="telephone"
          >
            <el-input v-model="form.telephone" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item
            label="性别:"
            :label-width="formLabelWidth"
            prop="gender"
          >
            <el-radio-group v-model="form.gender">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
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
// import { pageQuery } from "@/api/userManage";
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
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        telephone: [
          {
            required: true,
            message: "请输入电话号码",
            trigger: "blur",
          },
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
      },
    };
  },
  computed: {
    ...mapGetters("userManage", ["userData", "total"]),
  },
  // 方法
  methods: {
    ...mapActions("userManage", ["pageQuery", "deleteById", "saveOrUpdate"]),
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
      this.pageQuery(this.params);
    },
    //添加信息
    toAdd() {
      this.form = {};
      this.dialogFormVisible = true;
      this.title = "新增用户";
    },
    //查询
    toSearch() {
      this.pageQuery(this.params);
    },

    //模态框关闭回调函数
    closeHandler(form) {
      this.form = {};
      //清空校验
      this.$refs[form].resetFields();
    },
    //文件上传成功回调
    // successHandler(response) {
    //   console.log(response);
    //   this.form.userFace = response.data.groupName + "/ " + response.data.id;
    // },

    //确认
    toSave(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log(form);
          this.saveOrUpdate(form).then((res) => {
            this.pageQuery(this.params);
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
      this.title = "编辑用户";
      this.dialogFormVisible = true;
    },
  },

  // 钩子函数  在vue实例创建完毕之后调用
  created() {
    this.pageQuery(this.params);
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
