import { request } from '@/utils/request'

const state = {
  MessageCount: 0
}

const mutations = {
  SET_MESSAGECOUNT: (state, MessageCount) => {
    state.MessageCount = MessageCount
  }
}

const actions = {
  // 文档批量上传API
  UploadDocs({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Platform.UploadDocs', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 普通文件批量上传API
  UploadFiles({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Platform.UploadFiles', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 短信验证码发送API
  SmsVerifyCodeSend({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Platform.SmsVerifyCodeSend', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //  根据文档ID列表批量获取文档详情API
  OnlineDocumentsListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Platform.OnlineDocumentsListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //  获取指定ID的服务器帮助详情API
  HelpContextGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Platform.HelpContextGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //  用户帐号密码登录API
  Login({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Platform.Login', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //  验证码图片获取API
  VerifyImageGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Platform.VerifyImageGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 省份城市列表查询API
  CNRegionsListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Platform.CNRegionsListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取当前用户消息列表API
  NotifyMessagesListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Platform.NotifyMessagesListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 批量删除用户消息API
  NotifyMessagesDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Platform.NotifyMessagesDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 批量标记消息已读API
  NotifyMessagesSetRead({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Platform.NotifyMessagesSetRead', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户关联数据模型批量获取API
  UserDataModelsGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Platform.UserDataModelsGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取当前用户详情API
  UserDataGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Platform.UserDataGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 更新当前用户资料API
  UserDataUpdate({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Platform.UserDataUpdate', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户消息统计服务
  NotifyMessagesStat({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Platform.NotifyMessagesStat', requestParams).then(response => {
        commit('SET_MESSAGECOUNT', response.MessageCount)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获得消息自定义标签
  GetNotifyMessagesCustomTag({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Platform.GetNotifyMessagesCustomTag', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
