<template>
  <div>
    demo1
    <br />
    <br />
    <br />
    <br />
    <div @click="open()" v-if="!disa">
      <el-button type="primary">
        <div>打开子组件</div>
      </el-button>
    </div>
    <div @click="open()" v-if="disa">
      <el-button type="primary">
        <div>关闭子组件</div>
      </el-button>
    </div>
    <br />
    <br />
    <br />
    <br />
    <div @click="qh()" v-if="com=='a'">
      <el-button type="primary">
        <div>显示第二个组件</div>
      </el-button>
    </div>
    <div @click="qh()" v-else>
      <el-button type="primary">
        <div>显示第一个组件</div>
      </el-button>
    </div>
    <br />
    <br />
    <br />
    <br />
    <router-view :name="com"></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      disa: false,
      disb: false,
      com: "a"
    };
  },
  methods: {
    open() {
      if (this.disa) {
        this.$router.push({ name: "demo1" });
        this.disa = false;
      } else {
        this.$router.push({ name: "demo4" });
        this.disa = true;
      }
    },
    qh() {
        if(this.com == 'a'){
            this.com = "b"
        }else{
            this.com = "a" 
        }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>