<template>
  <div>
    <div class="options">
      <el-button type="primary" @click="toAdd">新增</el-button>
      <el-input placeholder="标题" v-model="params.title" clearable> </el-input
      ><el-button type="primary" @click="toSearch">查询</el-button>
    </div>

    <el-table :data="articleData" style="width: 100%">
      <el-table-column prop="id" label="编号" width="80"> </el-table-column>
      <el-table-column prop="title" label="新闻标题" width="400">
      </el-table-column>
      <el-table-column prop="category.name" label="新闻分类" width="180">
      </el-table-column>
      <el-table-column prop="publishTime" label="发布时间"> </el-table-column>
      <el-table-column prop="readTimes" label="阅读次数"> </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column prop="thumpUp" label="点赞次数"> </el-table-column>
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
          :ref="form"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="标题："
            :label-width="formLabelWidth"
            prop="title"
          >
            <el-input v-model="form.title" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="所属分类："
            :label-width="formLabelWidth"
            prop="category.name"
          >
            <el-input v-model="form.categoryId" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input type="textarea" v-model="form.content"></el-input>
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
        title: "",
      },
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "100px",
      // rules: {
      //   name: [
      //     { required: true, message: "请输入用户名", trigger: "blur" },
      //   ],
      //   introduce: [{ required: true, message: "请输入密码", trigger: "blur" }],
      //   flags: [
      //     {
      //       required: true,
      //       message: "请输入电话号码",
      //       trigger: "blur",
      //     },
      //   ],

      // },
      title: "编辑",
    };
  },
  computed: {
    ...mapGetters("article", ["articleData", "total"]),
  },
  // 方法
  methods: {
    ...mapActions("article", ["pageQuery", "deleteById", "saveOrUpdate"]),
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
      this.title = "新增";
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
      console.log(row);
      this.title = "编辑";
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
