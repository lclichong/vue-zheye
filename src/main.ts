import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

axios.defaults.baseURL = 'https://apis.imooc.com/api/'
const icode = '5CD9BA5FE320CCAC'
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  // get 请求，添加到 url 中
  config.params = { ...config.params, icode: icode }
  // 其他请求，添加到 body 中
  // 如果是上传文件，添加到 FormData 中
  if (config.data instanceof FormData) {
    config.data.append('icode', icode)
  } else {
    // 普通的 body 对象，添加到 data 中
    config.data = { ...config.data, icode: icode }
  }
  return config
})
axios.interceptors.response.use(
  config => {
    setTimeout(() => {
      store.commit('setLoading', false)
    }, 1000)
    return config
  },
  e => {
    const { error } = e.response.data
    store.commit('setError', { status: true, message: error })
    store.commit('setLoading', false)
    return Promise.reject(error)
  }
)

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
