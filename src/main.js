import App from './App.vue'
import router from './router'
import instance from './config'
import Qs from 'qs';
//粒子特效
import VueParticles from 'vue-particles'  
Vue.use(VueParticles)  
//阻止启动生产消息，常用作指令
Vue.config.productionTip = false
//定义请求
Vue.prototype.$http = instance.axios;
//QS
Vue.prototype.$qs = Qs;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
