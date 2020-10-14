<template>
  <div>
    <div class="options">
      <el-button type="primary" @click="toAdd">上报</el-button>
      <el-input placeholder="标题" v-model="params.province" clearable>
      </el-input
      ><el-button type="primary" @click="toSearch">查询</el-button>
    </div>

    <el-table :data="epidemicData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="80"> </el-table-column>
      <el-table-column prop="country" label="国" width="100"> </el-table-column>
      <el-table-column prop="province" label="省" width="100">
      </el-table-column>
      <el-table-column prop="city" label="市"> </el-table-column>
      <el-table-column prop="area" label="区"> </el-table-column>
      <el-table-column prop="confirmed" label="新增确诊"> </el-table-column>
      <el-table-column prop="suspected" label="疑似"> </el-table-column>
      <el-table-column prop="dead" label="死亡"> </el-table-column>
      <el-table-column prop="cure" label="治愈"> </el-table-column>
      <el-table-column prop="severe" label="重症"> </el-table-column>
      <el-table-column prop="outside" label="境外输入"> </el-table-column>
      <el-table-column prop="inputTime" label="上报时间" width="200">
      </el-table-column>
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
            label="国家"
            :label-width="formLabelWidth"
            prop="country"
          >
            <el-input v-model="form.country" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="省份"
            :label-width="formLabelWidth"
            prop="province"
          >
            <el-input v-model="form.province" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="市" :label-width="formLabelWidth" prop="city">
            <el-input v-model="form.city" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="区" :label-width="formLabelWidth" prop="area">
            <el-input v-model="form.area" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="确诊"
            :label-width="formLabelWidth"
            prop="confirmed"
          >
            <el-input v-model="form.confirmed" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="疑似"
            :label-width="formLabelWidth"
            prop="suspected"
          >
            <el-input v-model="form.suspected" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="死亡" :label-width="formLabelWidth" prop="dead">
            <el-input v-model="form.dead" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="治愈" :label-width="formLabelWidth" prop="cure">
            <el-input v-model="form.cure" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="重症"
            :label-width="formLabelWidth"
            prop="severe"
          >
            <el-input v-model="form.severe" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="境外输入"
            :label-width="formLabelWidth"
            prop="outside"
          >
            <el-input v-model="form.outside" auto-complete="off"></el-input>
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
        province: "",
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
    ...mapGetters("epidemic", ["epidemicData", "total"]),
  },
  // 方法
  methods: {
    ...mapActions("epidemic", ["pageQuery", "deleteById", "saveOrUpdate"]),
    //删除
    handleDelete(row) {
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
      this.$router.push("/data/input");
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
              message: "编辑成功",
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
