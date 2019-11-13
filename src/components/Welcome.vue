<template>
  <div>
    <div class="t1">欢迎回来!</div>
    <div class="t2">{{time}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: ""
    };
  },
  created() {
    this.gettime();
  },
  methods: {
    gettime() {
      var dd = new Date();
      //获取年月日，时分秒
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1;
      var d = dd.getDate();
      var h = dd.getHours();
      var i = dd.getMinutes();
      var s = dd.getSeconds();
      var wkday = dd.getDay();
      this.time =
        y +
        "年" +
        m +
        "月" +
        d +
        "日" +
        "   " +
        h +
        ":" +
        i +
        ":" +
        s +
        " " +
        "星期" +
        "日一二三四五六".charAt(wkday);
    }
  },
  mounted() {
    setInterval(() => {
      this.gettime();
    }, 1000);
  }
};
</script>
<style scoped>
.t1 {
  font-size: 30px;
  padding: 30px 30px 10px 30px;
}
.t2 {
  font-size: 20px;
  padding: 0px 30px 10px 30px;
}
</style>