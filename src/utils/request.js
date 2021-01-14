import axios from 'axios'
import { Dialog, Toast } from 'vant'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : '/ecloud/authentication/',
  timeout: 200000
})

service.interceptors.request.use(
  config => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    if (!config.data) {
      config.data = {}
    }
    if (sessionStorage.getItem('tokenId')) {
      config.data['tokenId'] = sessionStorage.getItem('tokenId')
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    Toast.clear()
    const res = response.data
    if (res.code !== '00') {
      Dialog.alert({
        title: '温馨提示',
        message: res.message
      })
      return res
    } else {
      return res
    }
  },
  error => {
    Toast.clear()
    console.log(error)
    const reg1 = /timeout/gi
    let msg = error.message
    if (reg1.test(msg)) {
      msg = '请求超时,请检查网络环境'
      Dialog.alert({
        title: '温馨提示',
        message: msg
      })
    }
    return Promise.reject(error)
  }
)

export default service
