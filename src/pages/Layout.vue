<template>
  <div>
    <!-- 汇总 -->
    <div class="deadline">今日</div>
    <el-row :gutter="12">
      <el-col :span="8" class="today_card">
        <el-card shadow="never">
          <div class="data">8</div>
          新增确诊</el-card
        >
      </el-col>
      <el-col :span="8" class="today_card">
        <el-card shadow="never"
          ><div class="data">0</div>
          本土新增</el-card
        >
      </el-col>
      <el-col :span="8" class="today_card">
        <el-card shadow="never"
          ><div class="data">8</div>
          境外输入</el-card
        >
      </el-col>
    </el-row>
    <!-- 截止汇总 -->
    <div class="deadline">截止今日00：00：00</div>
    <el-row :gutter="12">
      <el-col :span="8" class="deadline-all">
        <el-card shadow="never"
          ><div class="deadline-data">324</div>
          现有确诊</el-card
        >
      </el-col>
      <el-col :span="8" class="deadline-all">
        <el-card shadow="never"
          ><div class="deadline-data">4</div>
          现有重症</el-card
        >
      </el-col>
      <el-col :span="8" class="deadline-all">
        <el-card shadow="never"
          ><div class="deadline-data">2455</div>
          累积境外输入</el-card
        >
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="8" class="deadline-all">
        <el-card shadow="never"
          ><div class="deadline-data">85004</div>
          累积确诊</el-card
        >
      </el-col>
      <el-col :span="8" class="deadline-all">
        <el-card shadow="never"
          ><div class="deadline-data">80046</div>
          累积出院</el-card
        >
      </el-col>
      <el-col :span="8" class="deadline-all">
        <el-card shadow="never">
          <div class="deadline-data">4634</div>
          累积死亡</el-card
        >
      </el-col>
    </el-row>
    <!-- 国内疫情 -->
    <div>
      <div class="deadline">国内病例</div>
      <el-table
        :data="epidemicData"
        style="width: 100%"
        max-height="400px"
        :header-cell-style="{
          background: ' #fbf5ef',
          color: '#ff6900',
          fontSize: '20px',
          height: '80px',
        }"
      >
        <el-table-column
          prop="province"
          label="地区"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="confirmed"
          label="新增确诊"
          width="180"
        ></el-table-column>
        <el-table-column prop="suspected" label="新增疑似"></el-table-column>
        <el-table-column prop="dead" label="新增死亡"></el-table-column>
        <el-table-column prop="cure" label="新增治愈"></el-table-column>
        <el-table-column prop="outside" label="境外输入"></el-table-column>
      </el-table>
    </div>
    <!-- 最新进展 -->
    <div class="deadline">最新进展</div>
    <div class="block news_block">
      <el-timeline>
        <el-timeline-item
          class="publishTime"
          v-for="index in newsData"
          :key="index.id"
          :timestamp="index.publishTime"
          placement="top"
          color="blue"
        >
          <el-card shadow="never" class="news_card">{{ index.title }}</el-card>
        </el-timeline-item>
      </el-timeline>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageParam.page"
          :page-size="pageParam.pageSize"
          layout="prev, pager, next"
          :total="epidemicTotal"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "@/utils/request";
import moment from "moment";
export default {
  data() {
    return {
      newsData: [],
      epidemicData: [],
      epidemicTotal: 0,
      pageParam: {
        page: 1,
        pageSize: 10,
      },
    };
  },
  computed: {},
  methods: {
    getNews() {
      get("/article/findAllRecommend", this.pageParam).then((res) => {
        this.newsData = res.data.list;
        this.newsData.forEach((item) => {
          item.publishTime = moment(item.publishTime).format(
            "YYYY-mm-DD hh:mm:ss"
          );
        });
      });
    },
    getEpidemic() {
      get("/epidemic/pageQuery", this.pageParam).then((res) => {
        this.epidemicData = res.data.list;
        this.epidemicTotal = res.data.total;
      });
    },
    handleCurrentChange(val) {
      this.pageParam.page = val;
      this.getEpidemic();
    },
  },
  created() {
    this.getNews();
    this.getEpidemic();
  },
  mounted() {},
};
</script>
<style scoped>
.news_block {
  background: #f8f8f8;
}
.news_card {
  box-sizing: border-box;
  border: 1px solid transparent;
  background-color: #fff;
  color: #666;

  line-height: 30px;
  font-size: 14px;
  border-radius: 8px;
}
.deadline {
  line-height: 32px;
  height: 32px;
  color: #999;
  font-size: 20px;
  margin: 10px;
}
.today_card > .el-card {
  height: 150px;
  text-align: center;
  background-color: #eefaff;
  font-size: 20px;
  font-weight: 500;
  color: black;
}
.data,
.deadline-data {
  color: #ff6900;
  font-weight: 700;
  line-height: 45px;
}
.deadline-all > .el-card {
  height: 150px;
  text-align: center;
  background-color: #fbf5ef;
  font-size: 20px;
  font-weight: 500;
  color: black;
  margin-top: 10px;
}
.el-table {
  margin: 20px 0;
}
</style>
