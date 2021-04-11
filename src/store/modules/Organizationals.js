import { request } from '@/utils/request'

const state = {

}

const mutations = {

}

const actions = {
  // 添加更新部门API
  DepartmentsAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Organizationals.DepartmentsAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取部门列表API
  DepartmentsListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Organizationals.DepartmentsListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除部门API
  DepartmentsDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Organizationals.DepartmentsDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 将用户添加到指定部门API
  DepartmentsUserAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Organizationals.DepartmentsUserAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 将用户从某个部门移除API
  DepartmentsUserRemove({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Organizationals.DepartmentsUserRemove', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 调整部门同级排序API
  DepartmentsOrderSet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Organizationals.DepartmentsOrderSet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 分页获取系统角色列表API
  RolesListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Organizationals.RolesListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 添加更新角色信息API
  RolesAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Organizationals.RolesAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除某个指定角色API
  RoleDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Organizationals.RoleDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取菜单列表API
  MenusAndPowersListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Organizationals.MenusAndPowersListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 更新菜单和权限列表API
  MenusAndPowersUpdate({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Organizationals.MenusAndPowersUpdate', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取用户列表API
  UsersListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Organizationals.UsersListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增更新用户信息API
  UsersAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Organizationals.UsersAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除用户信息API
  UsersDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Organizationals.UsersDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取用户详情API
  UserGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Organizationals.UserGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取登录用户有权限的菜单列表API
  UserMenusListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Organizationals.UserMenusListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取同部门中非主管成员
  UserGroupGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Organizationals.UserGroupGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 更新用户下级成员
  UserGroupAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Organizationals.UserGroupAdd', requestParams).then(response => {
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
