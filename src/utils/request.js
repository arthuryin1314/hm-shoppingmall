import axios from 'axios'
import { Message, Loading } from 'element-ui'

const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000,
  headers: { platform: 'H5' }
})

// 定义全局 Loading 实例（避免多请求重复创建）
let loadingInstance = null

// 添加请求拦截器：请求发起时显示 Loading
instance.interceptors.request.use(function (config) {
  // 只有当没有 Loading 实例时，才创建（避免重复显示）
  if (!loadingInstance) {
    loadingInstance = Loading.service({
      lock: true,
      text: '加载中...',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }
  return config
}, function (error) {
  // 请求出错时，也要关闭 Loading
  if (loadingInstance) {
    loadingInstance.close()
    loadingInstance = null // 重置实例
  }
  Message({
    message: '请求发送失败',
    type: 'error'
  })
  return Promise.reject(error)
})

// 添加响应拦截器：请求完成（成功/失败）后关闭 Loading
instance.interceptors.response.use(function (response) {
  // 关闭 Loading 并重置实例
  if (loadingInstance) {
    loadingInstance.close()
    loadingInstance = null
  }

  const res = response.data
  // 业务状态码非200时，提示错误
  if (res.status !== 200) {
    Message({
      message: res.message || '请求出错',
      type: 'error'
    })
    return Promise.reject(res.message)
  }

  // 业务成功时，可选提示（也可以去掉，让业务代码自己处理）
  // Message({
  //   message: res.message || '操作成功',
  //   type: 'success'
  // })
  return res
}, function (error) {
  // 响应失败（比如超时、网络错误），关闭 Loading
  if (loadingInstance) {
    loadingInstance.close()
    loadingInstance = null
  }

  // 友好的错误提示
  let errMsg = '请求失败'
  if (error.code === 'ECONNABORTED') {
    errMsg = '请求超时，请稍后重试'
  } else if (error.message.includes('Network Error')) {
    errMsg = '网络错误，请检查网络'
  } else {
    errMsg = error.message || errMsg
  }

  Message({
    message: errMsg,
    type: 'error'
  })
  return Promise.reject(error)
})

export default instance
