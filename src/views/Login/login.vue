<template>
  <div class="login">
    <div class="login-wrap">
      <h3></h3>
      <h3>后台登陆</h3>
      <el-form ref="form" label-width="0px">
        <el-form-item prop="j_username">
          <el-input :placeholder="('用户名')" v-model="username"></el-input>
        </el-form-item>
        <el-form-item prop="j_password">
          <el-input :placeholder="('密码')" type="password" v-model="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="space-between">
            <el-checkbox style="color:#eee">{{('记住密码')}}</el-checkbox>
            <a href style="color:#eee">{{('忘记密码')}}</a>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="dologin()">{{('登录')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
      <vue-particles
        color="#fff"
        :particleOpacity="0.7"
        :particlesNumber="60"
        shapeType="circle"
        :particleSize="4"
        linesColor="#fff"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi"
      ></vue-particles>
   
  </div>
</template>
<script>
export default {
  created() {},
  data() {
    return {
      username: "",
      password: "",
      dnzt: false,
      showmsg: "登陆"
    };
  },
  watch: {
    dnzt(val) {
      if (val) {
        this.showmsg = "登陆中";
      } else {
        this.showmsg = "登陆";
      }
    }
  },
  methods: {
    dologin() {
      if (this.dnzt) {
        return;
      }
      let { username, password } = this;
      if (!/\S/.test(username)) {
        this.$message({
          message: "请输入账号",
          type: "warning"
        });
        return;
      }
      if (!/\S/.test(password)) {
        this.$message({
          message: "请输入密码",
          type: "warning"
        });
        return;
      }
      this.dnzt = true;
      this.$http
        .post(
          "/app.php/home/login/Api_LandingVerification",
          this.$qs.stringify({
            username,
            password
          })
        )
        .then(response => {
          this.dnzt = false;
          let re = response.data;
          if (re.result) {
            this.$message({
              message: re.msg,
              type: "success"
            });
            let thiz = this;
            setTimeout(function() {
              let querypath = thiz.$route.query;
              //如果有上一页，则返回上一页，反之跳转到首页
              if (Object.keys(querypath).length > 0) {
                thiz.$router.replace({
                  path: querypath.redirect
                });
              } else {
                thiz.$router.replace({
                  name: "home"
                });
              }
            }, 1500);
          } else {
            this.$message.error(re.msg);
            return;
          }
        })
        .catch(() => {
          this.dnzt = false;
          this.$message.error("网络错误");
          return;
        });
    }
  }
};
</script>
<style scoped lang="scss">
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../assets/Login/login-bj.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.login-wrap {
  position: absolute;
  right: 5%;
  width: 330px;
  border-radius: 10px;
  padding: 20px;
  z-index: 3;
  bottom: 20%;
  padding-bottom: 100px;
  background: rgba(70, 70, 70, 0.3);
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 10px;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(70, 70, 70, 0.3);
    filter: blur(6px);
    z-index: -1;
  }
  .el-form-item {
    margin-bottom: 25px !important;
  }
  h3 {
    text-align: center;
    color: #ebedef;
    margin-top: 0px;
    margin-bottom: 5px;
    span {
      color: #20a0ff;
    }
  }
  form {
    margin-top: 25px;
    .el-form-item {
      margin-bottom: 15px;
    }
  }
  a {
    text-decoration: none;
    color: #1f2d3d;
  }
  button {
    width: 100%;
    font-weight: 600;
  }
}
</style>