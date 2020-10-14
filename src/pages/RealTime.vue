<template>
  <div>
    <div id="attention"></div>
    <div id="cure"></div>
    <div id="newly"></div>
  </div>
</template>
 <script src="https://cdn.staticfile.org/echarts/4.3.0/echarts.min.js"></script>
<script>
import echarts from "echarts";
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {
    attention() {
      var myChart1 = echarts.init(document.getElementById("attention"));
      var option1 = {
        backgroundColor: "#fff",

        title: {
          text: "疫情关注度",
          left: "center",
          top: 20,
          textStyle: {
            color: "#666",
          },
        },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1],
          },
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 274, name: "联盟广告" },
              { value: 235, name: "视频广告" },
              { value: 400, name: "搜索引擎" },
            ].sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
            label: {
              color: "#666",
            },
            labelLine: {
              lineStyle: {
                color: "#666",
              },
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
            itemStyle: {
              color: "#c23531",
              shadowBlur: 200,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },

            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function (idx) {
              return Math.random() * 200;
            },
          },
        ],
      };
      myChart1.setOption(option1);
    },

    rate() {
      var myChart2 = echarts.init(document.getElementById("cure"));
      var option2 = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["治愈率", "感染率", "平均温度"],
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            max: 50,
            interval: 5,
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "月份",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} ",
            },
          },
        ],
        series: [
          {
            name: "治愈率",
            type: "bar",
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              35.6,
              62.2,
              32.6,
              20.0,
              6.4,
              3.3,
            ],
          },
          {
            name: "感染率",
            type: "bar",
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              50.7,
              18.6,
              18.2,
              48.7,
              18.8,
              6.0,
              2.3,
            ],
          },
          {
            name: "平均",
            type: "line",
            yAxisIndex: 1,
            data: [
              2.0,
              2.2,
              3.3,
              4.5,
              6.3,
              10.2,
              20.3,
              23.4,
              23.0,
              16.5,
              12.0,
              6.2,
            ],
          },
        ],
      };
      myChart2.setOption(option2);
    },

    newly() {
      var myChart3 = echarts.init(document.getElementById("newly"));
      var option3 = {
        title: {
          text: "全国新增确诊病例",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["上海", "武汉", "北京", "广州", "江苏"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 100,
          interval: 5,
          axisLabel: {
            formatter: "{value}",
          },
        },
        series: [
          {
            name: "上海",
            type: "line",
            stack: "总量",
            data: [10, 11, 1, 3, 4, 3, 5, 3, 5, 2, 0, 0],
          },
          {
            name: "北京",
            type: "line",
            stack: "总量",
            data: [20, 14, 25, 15, 4, 23, 34, 3, 5, 3, 5, 2],
          },
          {
            name: "武汉",
            type: "line",
            stack: "总量",
            data: [38, 45, 34, 15, 34, 27, 55, 23, 14, 15, 14, 17],
          },
          {
            name: "广州",
            type: "line",
            stack: "总量",
            data: [10, 24, 14, 15, 56, 23, 23, 3, 5, 14, 5, 23],
          },
          {
            name: "江苏",
            type: "line",
            stack: "总量",
            data: [20, 34, 14, 15, 4, 23, 34, 3, 5, 34, 5, 2],
          },
        ],
      };

      myChart3.setOption(option3);
    },
  },
  created() {},
  mounted() {
    this.attention();
    this.rate();
    this.newly();
  },
};
</script>
<style scoped>
#attention {
  width: 400px;
  height: 300px;
  float: left;
  margin-left: 100px;
}
#cure {
  width: 600px;
  height: 300px;
  float: right;
}
#newly {
  clear: both;
  width: 100%;
  height: 300px;
}
</style>