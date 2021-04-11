import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { Notify } from 'vant'
import store from '@/store'
import router from '@/router'
import md5 from 'js-md5'
import { getToken } from '@/utils/auth'
import qs from 'qs'

// 为了实现Class的私有属性
const showMessage = Symbol('showMessage')
/**
 *  重写ElementUI的Message
 *  single默认值true，因为项目需求，默认只弹出一个，可以根据实际需要设置
 */
let messageInstance = null
class DonMessage {
  success(options, single = true) {
    this[showMessage]('success', options, single)
  }
  warning(options, single = true) {
    this[showMessage]('warning', options, single)
  }
  info(options, single = true) {
    this[showMessage]('info', options, single)
  }
  error(options, single = true) {
    this[showMessage]('error', options, single)
  }
  [showMessage](type, options, single) {
    if (messageInstance && single) {
      messageInstance.close() // 先把原来的关闭
    }
    messageInstance = Message[type](options) // 再创建新的消息
  }
}
// Vue.use(ElementUI)
// Vue.prototype.$message = new DonMessage()
const MessageOne = new DonMessage()

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 100000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    if (res.IsError) {
      if (res.ErrCode === '-2000') {
        MessageBox.confirm(res.ErrMsg, '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/logout').then(() => {
            const fullPath = router.app._route.fullPath
            router.push(`/login?redirect=${fullPath}`)
          })
        })
      } else {
        if (store.getters.device === 'mobile') {
          Notify({
            type: 'warning',
            message: res.ErrMsg
          })
        } else {
          MessageOne.error({ message: res.ErrMsg })
        }
      }
    } else {
      if (res.ErrMsg) {
        if (store.getters.device === 'mobile') {
          Notify({
            type: 'success',
            message: res.ErrMsg
          })
        } else {
          MessageOne.success({ message: res.ErrMsg })
        }
      }
      return res
    }
  },
  error => {
    console.log(error) // for debug
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误(400)'
          break
        case 401:
          return history.push('/login')
        case 403:
          error.message = '拒绝访问(403)'
          break
        case 404:
          error.message = '请求出错(404)'
          break
        case 408:
          error.message = '请求超时(408)'
          break
        case 500:
          error.message = '服务器错误(500)'
          break
        case 501:
          error.message = '服务未实现(501)'
          break
        case 502:
          error.message = '网络错误(502)'
          break
        case 503:
          error.message = '服务不可用(503)'
          break
        case 504:
          error.message = '网络超时(504)'
          break
        case 505:
          error.message = 'HTTP版本不受支持(505)'
          break
        default:
          error.message = `连接出错(${error.response.status})!`
      }
    }
    if (store.getters.device === 'mobile') {
      Notify({
        type: 'warning',
        message: error.message
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)
const Appkey = '3292872'
const AppSecert = 'd1317a104081be0189e6b59aacea1739'
// const url = '//sapi.huntmobi.com/rest.ashx'
const url = 'http://192.168.3.200:8899/rest.ashx'
// const url = 'http://192.168.3.64:8899/rest.ashx'
// const url = '/rest.ashx'
export const processing = (api, data) => {
  return new Promise((resolve, reject) => {
    try {
      let SessionKey = ''
      if (getToken()) {
        SessionKey = getToken()
      }
      const paramkey = []
      for (var key in data) {
        paramkey.push(key)
      }
      paramkey.sort((a, b) => {
        if (a.toLowerCase() > b.toLowerCase()) {
          return 1
        } else {
          return -1
        }
      })
      let paramdata = ''
      paramkey.map((item) => {
        paramdata += data[item]
      })
      paramdata = `${AppSecert}${paramdata}${AppSecert}`
      const sign = md5(paramdata).toString()
      const systemdata = {
        Appkey: Appkey,
        V: 1,
        AppVer: 1,
        Format: 'json',
        SessionKey: SessionKey,
        Method: api,
        Sign: sign
      }
      const postdata = {
        ...systemdata,
        ...data
      }
      const handle = {
        url,
        postdata
      }
      resolve(handle)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

export const request = async(api, data) => {
  var handle = await processing(api, data)
  return new Promise((resolve, reject) => {
    service({
      url: handle.url,
      data: qs.stringify(handle.postdata),
      method: 'POST',
      async: true
    }).then((response) => {
      if (response.IsError) {
        reject(response)
      } else {
        resolve(response)
      }
    }).catch((error) => {
      reject(error)
    })
  })
}

// 文件上传处理加密
export const append = (api, data, file) => {
  return new Promise((resolve, reject) => {
    try {
      let SessionKey = ''
      if (getToken()) {
        SessionKey = getToken()
      }
      const paramkey = []
      for (var key in data) {
        paramkey.push(key)
        file.delete(key)
        file.append(key, data[key])
      }
      paramkey.sort((a, b) => {
        if (a.toLowerCase() > b.toLowerCase()) {
          return 1
        } else {
          return -1
        }
      })
      let paramdata = ''
      paramkey.map((item) => {
        paramdata += data[item]
      })
      paramdata = `${AppSecert}${paramdata}${AppSecert}`
      const sign = md5(paramdata).toString()
      file.delete('Appkey')
      file.delete('V')
      file.delete('AppVer')
      file.delete('Format')
      file.delete('SessionKey')
      file.delete('Method')
      file.delete('Sign')
      file.append('Appkey', Appkey)
      file.append('V', 1)
      file.append('AppVer', 1)
      file.append('Format', 'json')
      file.append('SessionKey', SessionKey)
      file.append('Method', api)
      file.append('Sign', sign)
      const handle = {
        url,
        file
      }
      resolve(handle)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

// 文件上传
export const uploadFile = async(api, data, file) => {
  var handle = await append(api, data, file)
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'post',
      data: handle.file,
      headers: { 'Content-Type': 'multipart/form-data' },
      async: true
    }).then((response) => {
      if (response.IsError) {
        reject(response)
      } else {
        resolve(response)
      }
    }).catch((error) => {
      reject(error)
    })
  })
}

export default service
