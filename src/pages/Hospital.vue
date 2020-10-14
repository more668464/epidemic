<template>
  <div>
    <div class="options">
      <el-button type="primary" @click="toSearch">查询</el-button
      ><el-input placeholder="医院名称" v-model="params.name" clearable>
      </el-input>
    </div>

    <el-table
      :data="hospitalData"
      style="width: 100%"
      max-height="calc(100vh - 200px)"
    >
      <el-table-column fixed prop="name" label="医院" width="400">
      </el-table-column>
      <el-table-column prop="flags" label=" " width="200"> </el-table-column>
      <el-table-column prop="province" label="省份" width="120">
      </el-table-column>
      <el-table-column prop="city" label="市区" width="120"> </el-table-column>
      <el-table-column prop="introduce" label="描述" width="320">
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="toSee(scope.row)" type="text" size="small">
            查看位置
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      params: {
        page: 1,
        pageSize: 10,
        name: "",
      },
      // latitude: this.hospitalData.latitude,
      // longitude: this.hospitalData.longitude,
    };
  },
  computed: {
    ...mapGetters("hospital", ["hospitalData", "total"]),
  },
  methods: {
    ...mapActions("hospital", ["pageQuery", "deleteById", "saveOrUpdate"]),
    toSee(row) {
      console.log(row);

      this.$router.push({
        path: "/map/index",
        query: { longitude: row.longitude, latitude: row.latitude },
      });
    },
    toSearch() {},
  },
  created() {
    this.pageQuery(this.params);
  },
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