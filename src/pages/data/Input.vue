<template>
  <div>
    <br />
    <div class="forms">
      <el-form
        :model="form"
        :ref="form"
        label-width="100px"
        class="demo-ruleForm"
        :inline="true"
      >
        <el-form-item
          label="国家:"
          :label-width="formLabelWidth"
          prop="country"
        >
          <el-input v-model="form.country" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="省份:"
          :label-width="formLabelWidth"
          prop="province"
        >
          <el-input v-model="form.province" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="市:" :label-width="formLabelWidth" prop="city">
          <el-input v-model="form.city" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="区:" :label-width="formLabelWidth" prop="area">
          <el-input v-model="form.area" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="确诊:"
          :label-width="formLabelWidth"
          prop="confirmed"
        >
          <el-input v-model="form.confirmed" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="疑似:"
          :label-width="formLabelWidth"
          prop="suspected"
        >
          <el-input v-model="form.suspected" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="死亡:" :label-width="formLabelWidth" prop="dead">
          <el-input v-model="form.dead" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="治愈:" :label-width="formLabelWidth" prop="cure">
          <el-input v-model="form.cure" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="重症:" :label-width="formLabelWidth" prop="severe">
          <el-input v-model="form.severe" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="境外输入:"
          :label-width="formLabelWidth"
          prop="outside"
        >
          <el-input v-model="form.outside" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="options">
      <el-button type="primary" @click="toAdd">上报</el-button>
    </div>
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
      form: {},
    };
  },
  computed: {
    ...mapGetters("epidemic", ["epidemicData", "total"]),
  },
  // 方法
  methods: {
    ...mapActions("epidemic", ["pageQuery", "deleteById", "saveOrUpdate"]),

    //添加信息
    toAdd() {
      this.saveOrUpdate(this.form).then((res) => {
        this.$message({
          showClose: true,
          message: "上报成功",
          type: "success",
        });
        this.form = {};
      });
    },
  },

  // 钩子函数  在vue实例创建完毕之后调用
  created() {},
  // 页面渲染完  钩子函数
  mounted() {},
};
</script>

<style scoped>
.forms form > div > * {
  width: 200px;
}
</style>
