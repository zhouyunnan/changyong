<template>
  <div id="main">
    <div class="pub_left" :style="{ width : MenuBox_W+ 'px'}">
      <div class="pub_left_menu">
        <div
          v-for="(menu,index) in Menus"
          :key="index"
          :class="{pub_menu_active:activeMenu.jb == 1 && index == activeMenu.index}"
        >
          <div class="pub_left_menu_li" @click="Menu1(index)">
            <div class="pub_left_menu_li_ico">
              <span :class="menu.icon"></span>
            </div>
            <div class="pub_left_menu_li_msg">{{menu.name}}</div>

            <div
              class="pub_left_menu_li_more"
              v-if="menu.second"
              :class="[menu.isopen?'pub_zt_b':'pub_zt_r']"
            >
              <span class="iconfont icon-shangjiantou"></span>
            </div>
          </div>
          <div class="pub_left_menu_last_menu" :style="{height:menu.height+'px'}">
            <div
              class="pub_left_menu_li_li"
              v-for="(sonM,sonMIndex) in menu.second"
              @click="Menu2(sonM.link,sonMIndex,index)"
              :class="{pub_menu_active:activeMenu.jb == 2 && index == activeMenu.father_index && sonMIndex == activeMenu.index}"
            >{{sonM.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pub_right">
      <div class="pub_right_header">
        <div class="pub_right_header_menu">
          <span @click="changeMenu()" class="iconfont icon-caidan"></span>
        </div>
        <div class="pub_right_header_menu_r">
          <div class="pub_right_header_ty" @click="exitlogin()">
            <span class="iconfont icon-tuichu"></span>退出登陆
          </div>
          <div class="pub_right_header_ty" @click="changgepwd()">
            <span class="iconfont icon-shezhi"></span>修改密码
          </div>
        </div>
      </div>
      <div class="pub_right_content">
        <div class="main">
          <welcome v-if="full == '/'" />
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Welcome from "../../components/Welcome.vue";
export default {
  data() {
    return {
      //菜单栏宽度
      MenuBox_W: 200,
      Menus: this.$pubfn.navs,
      //当前选中的菜单
      activeMenu: {
        index: 0,
        father_index: 0,
        jb: 1
      }
    };
  },
  components: {
    Welcome
  },
  methods: {
    //  以下是事件函数
    //点击父菜单
    Menu1(index) {
      let btn = this.Menus[index];
      if (btn.second) {
        //操作子菜单
        let isopen = btn.isopen;
        if (isopen) {
          //动态设置高度，这样子菜单展开才能有过渡效果
          btn.height = 0;
          btn.isopen = false;
        } else {
          btn.height = btn.second.length * 35;
          btn.isopen = true;
        }
      } else {
        //切换路由
        if (btn.link) {
          this.$router.push({
            name: btn.link
          });
          this.activeMenu = {
            index: index,
            jb: 1
          };
        }
      }
    },
    //点击子菜单
    Menu2(link, i, fatherindex) {
      if (link) {
        this.$router.push({
          name: link
        });
        this.activeMenu = {
          index: i,
          father_index: fatherindex,
          jb: 2
        };
      }
    },
    //开关左侧菜单栏
    changeMenu() {
      if (this.MenuBox_W == 0) {
        this.MenuBox_W = 200;
      } else {
        this.MenuBox_W = 0;
      }
    },
    //退出登陆ajax
    doexit() {
      this.$http
        .get("/app.php/home/login/Api_exit")
        .then(response => {
          let re = response.data;
          if (re.result) {
            this.$message({
              message: "安全退出",
              type: "success"
            });
            setTimeout(() => {
              window.location.href = "";
            }, 1500);
          } else {
            this.$message.error("退出失败");
            return;
          }
        })
        .catch(() => {
          this.$message.error("网络错误");
          return;
        });
    },
    //退出登陆
    exitlogin() {
      this.$confirm("是否退出登陆?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.doexit();
        })
        .catch(() => {
          return;
        });
    },
    //修改密码
    changgepwd() {
      this.$prompt("请输入新密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "password"
      })
        .then(({ value }) => {
          if (!/\S/.test(value) || value == null) {
            this.$notify.error({
              title: "错误",
              message: "请输入新密码"
            });
            return;
          }
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          this.$http
            .post(
              "/app.php/home/login/Api_changepwd",
              this.$qs.stringify({
                pwd: value
              })
            )
            .then(resou => {
              loading.close();
              let data = resou.data;
              if (data.result) {
                this.dialogFormVisible = false;
                this.$notify({
                  title: "成功",
                  type: "success",
                  message: data.msg
                });
                setTimeout(() => {
                  this.doexit();
                }, 1500);
              } else {
                this.$notify.error({
                  title: "错误",
                  message: data.msg
                });
              }
            })
            .catch(() => {
              loading.close();
              this.$message.error("网络错误");
            });
          return;
        })
        .catch(() => {
          return;
        });
    }
  },
  mounted() {
    let querypath = this.$route.name;
    for (let i = 0, j = this.Menus.length; i < j; i++) {
      if (this.Menus[i].link == querypath) {
        this.activeMenu = {
          index: i,
          father_index: 0,
          jb: 1
        };
        break;
      }
      if (this.Menus[i].second != undefined) {
        let second = this.Menus[i].second;
        for (let k = 0, m = second.length; k < m; k++) {
          if (querypath == second[k].link) {
            this.activeMenu = {
              index: k,
              father_index: i,
              jb: 2
            };
            this.Menu1(i);
            break;
          }
        }
      }
    }
  },
  computed: {
    full() {
      return this.$route.fullPath;
    }
  }
};
</script>
<style scoped lang="scss" >
#main {
  width: 100%;
  height: 100%;
  display: flex;
}
.pub_left {
  overflow: hidden;
  background: #213242;
  transition: width 0.3s;
  -moz-transition: width 0.3s;
  -webkit-transition: width 0.3s;
  -o-transition: width 0.3s;
  transition-timing-function: ease;
}
.pub_right {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.pub_right_header {
  position: relative;
  width: 100%;
  height: 60px;
  background: white;
  border-bottom: 1px solid #dcdfe6;
  line-height: 60px;
}
.pub_right_content {
  flex: 1;
  width: 100%;
  overflow-y: auto;
}
.main {
  width: calc(100% - 40px);
  height: calc(100% - 50px);
  margin: 0 auto;
  margin-top: 10px;
  background: white;
  padding: 0px 10px 30px 10px;
  overflow-y: auto;
}
.pub_right_header_menu {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 15px;
}
.pub_right_header_menu span {
  font-size: 26px;
  cursor: pointer;
}
.pub_right_header_menu_r {
  width: 100%;
  height: 100%;
}
.pub_right_header_ty {
  height: 100%;
  float: right;
  cursor: pointer;
  margin-right: 20px;
  font-size: 16px;
}
.pub_right_header_ty span {
  padding-right: 4px;
}

.icon-tuichu {
  float: left;
  font-size: 20px;
  margin-right: -5px;
}

.pub_left_menu {
  width: 200px;
  margin-top: 60px;
  color: #d9dadb;
  // border-top:1px solid #495764;
}
.pub_left_menu_li {
  width: 100%;
  line-height: 40px;
  font-size: 15px;
  // border-bottom: 1px solid #485b6d;
  display: flex;
  height: 40px;
  cursor: pointer;
}
.pub_left_menu_li_ico {
  margin-left: 24px;
  margin-right: 15px;
}
.pub_left_menu_li_ico span {
  font-size: 16px;
  color: #d9dadb;
}
.pub_left_menu_li_msg {
  flex: 1;
}
.pub_left_menu_li_more {
  margin-right: 30px;
  color: #d9dadb;
}
.pub_left_menu_li_more span {
  font-size: 8px;
  color: #d9dadb;
}
.pub_zt_r {
  transform: rotate(90deg);
}
.pub_zt_b {
  transform: rotate(180deg);
}
.pub_left_menu_li_li {
  height: 35px;
  color: #d0d1d3;
  text-indent: 55px;
  font-size: 13px;
  line-height: 35px;
  cursor: pointer;
}
.pub_left_menu_li_li:hover {
  background: rgba(105, 105, 105, 0.137);
}
.pub_menu_active,
.pub_menu_active:hover {
  color: white;
  background: rgb(42, 117, 192);
}
.pub_left_menu_last_menu {
  width: 100%;
  transition: height 0.2s;
  -moz-transition: height 0.2s;
  -webkit-transition: height 0.2s;
  -o-transition: height 0.2s;
  transition-timing-function: ease;
  height: 0px;
  overflow: hidden;
}
</style>
