import { constantRoutes } from '@/router'
import Layout from '@/layout/index'
import { request } from '@/utils/request'

// const permission = {
const state= {
    routes: [],
    addRoutes: [],
    headerActived: 0
  }
const mutations= {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
    // 根据路由判断属于哪个头部导航
  SET_HEADER_ACTIVED: (state, path)=>{
    state.addRoutes.map((item, index) => {
      if (
        item.children.some(r => {
          return path.indexOf(r.path + '/') === 0 || path == r.path
        })
      ) {
        state.headerActived = index
      }
    })
  },
  // 切换头部导航
  switchHeaderActived(state, index) {
    state.headerActived = index
  }
}
const actions= {
  // 生成路由
  GenerateRoutes({ commit },toPath) {
    return new Promise(resolve => {
      // 向后端请求路由数据
      const data = {}
      request('API.Organizationals.UserMenusListGet', data).then(response => {
        response.Menus.forEach(element => {
          element.component = 'Layout'
        })
        const accessedRoutes = filterAsyncRouter(response.Menus)          
        commit('SET_ROUTES', accessedRoutes)
        commit('SET_HEADER_ACTIVED', toPath.currentPath)
        resolve(accessedRoutes)
      })
    })
  }
}
// }

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(item => {
    item.path = item.MenuLink
    item.children = item.SubMenus
    item.name = item.MenuName
    item.meta = { title: item.MenuTitle, icon: item.MenuIcon, noCache: false }
    item.hidden = false
    // Layout组件特殊处理
    if (item.component === 'Layout') {
      item.component = Layout
    } else {
      item.component = loadView(item.MenuLink)
    }
    if (item.SubMenus.length > 0) {
      filterAsyncRouter(item.children)
    }
    return true
  })
}

export const loadView = (view) => { // 路由懒加载
  return (resolve) => require([`@/views${view}`], resolve)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
