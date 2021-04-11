import { request } from '@/utils/request'

const state = {

}

const mutations = {

}

const actions = {
  // 获取共享文档分类列表API
  DocumentsTypesListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Documents.DocumentsTypesListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 分页获取共享文档列表API
  DocumentsListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Documents.DocumentsListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 下载指定共享文档API
  DocumentsDownloadUrlGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Documents.DocumentsDownloadUrlGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除指定共享文档API
  DocumentsDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Documents.DocumentsDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 上传/更新指定共享文档API
  DocumentsUpload({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Documents.DocumentsUpload', requestParams).then(response => {
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
