<template>
  <!-- 模板，html -->
  <div class="map">
    <!-- 地图渲染的容器 -->
    <div id="container"></div>
  </div>
</template>
<script>
// 脚本，js
export default {
  methods: {
    GisMapMoveTo(lng, lat) {
      map.setCenter([this.$route.query.longitude, this.$route.query.latitude]);
    },
  },
  // dom追加到网页中
  mounted() {
    var map = new AMap.Map("container");
    console.log(this.$route);
    this.GisMapMoveTo();
  },
};
</script>
<style scoped>
/* 样式，css */
#container {
  height: 600px;
}
</style>