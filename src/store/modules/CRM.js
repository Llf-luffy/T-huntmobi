import { request } from '@/utils/request'

const state = {

}

const mutations = {

}

const actions = {
  // 新建更新客户资料API
  ClientsAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.CRM.ClientsAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 分页获取客户列表API
  ClientsListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.CRM.ClientsListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除指定客户资料API
  ClientsDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.CRM.ClientsDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 分页获取指定客户的跟进记录列表API
  ClientsFollowupsListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.CRM.ClientsFollowupsListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增更新指定客户的跟进记录API
  ClientsFollowupsAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.CRM.ClientsFollowupsAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除特定的跟进记录API
  ClientsFollowupsDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.CRM.ClientsFollowupsDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 为指定客户添加自定义标签API
  ClientsTagsAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.CRM.ClientsTagsAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除指定客户的指定标签API
  ClientsTagsDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.CRM.ClientsTagsDelete', requestParams).then(response => {
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
