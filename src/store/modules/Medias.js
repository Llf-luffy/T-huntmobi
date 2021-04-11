import { request } from '@/utils/request'

const state = {
  MediasList: []
}

const mutations = {
  SET_MEDIASLIST: (state, list) => {
    state.MediasList = list
  }
}

const actions = {
  // 获取媒体列表API
  MediasListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Medias.MediasListGet', requestParams).then(response => {
        if (!requestParams.PageID && !requestParams.PageSize) {
          commit('SET_MEDIASLIST', response.Medias)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增更新广告媒体信息API
  MediasAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Medias.MediasAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取指定广告媒体信息API
  MediasGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Medias.MediasGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除指定广告媒体API
  MediasDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Medias.MediasDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增更新广告媒体联系人信息API
  MediasLinkmansAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Medias.MediasLinkmansAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除广告媒体联系人信息API
  MediasLinkmansDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Medias.MediasLinkmansDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取广告媒体配置列表API
  MediasApiConfigsListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Medias.MediasApiConfigsListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增更新广告媒体API配置
  MediasApiConfigsAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Medias.MediasApiConfigsAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取指定广告媒体配置API
  ApiConfigsGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Medias.ApiConfigsGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除指定媒体配置API
  ApiConfigsDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Medias.ApiConfigsDelete', requestParams).then(response => {
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
