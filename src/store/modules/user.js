import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { request } from '@/utils/request'

const state = {
  token: getToken(),
  user: {},
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERDATAMODELS: (state, UserDataModels) => {
    state.UserDataModels = UserDataModels
  }
}

const actions = {
  // user login
  login({ commit }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Platform.Login', requestParams).then(response => {
        commit('SET_TOKEN', response.SessionKey)
        setToken(response.SessionKey)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise(resolve => {
      const requestParams = {}
      request('API.Platform.UserDataGet', requestParams).then(response => {
        const roles = ['admin']
        commit('SET_ROLES', roles)
        commit('SET_USER', response.User)
        commit('SET_NAME', response.User.UserRealname)
        resolve(response)
      })
    })
  },

  // 获取用户关联数据模型批量
  UserDataModelsGet({ commit }) {
    return new Promise(resolve => {
      const requestParams = {}
      request('API.Platform.UserDataModelsGet', requestParams).then(response => {
        loop(response.UserDataModels.Industrys)
        commit('SET_USERDATAMODELS', response.UserDataModels)
        resolve(response)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      removeToken()
      commit('SET_ROLES', [])
      resetRouter()
      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

// 遍历处理行业信息
function loop(val) {
  val.forEach(item => {
    if (item.SubIndustrys.length > 0) {
      loop(item.SubIndustrys)
    } else {
      item.SubIndustrys = undefined
    }
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
