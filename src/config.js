import axios from 'axios'

//跨域带上cookie
axios.defaults.withCredentials = true;
// 根据 process.env.NODE_ENV 的值判断当前是什么环境 development:开发环境  production生产环境

const host = process.env.NODE_ENV === 'development' ? '/api' : 'http://www.doudianwang.com'

//baseURL将会自动加入请求路径的前面
const instance = axios.create({
  baseURL: host
})

const config = {
    axios:instance
}

export default config;