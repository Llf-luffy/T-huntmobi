import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          if (hasToken) {
            await store.dispatch('user/getInfo')
            await store.dispatch('user/UserDataModelsGet')
          }
          const accessRoutes = await store.dispatch('permission/GenerateRoutes', {currentPath: to.path})
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
        } catch (error) {
          console.error(error)
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }

  let regex = /^\/finance.+\/index(?:\/(?=$))?$/i


  // keep-alive 多级路由失效问题
  if (to.matched && to.matched.length > 2) {
    for (let i = 0; i < to.matched.length; i++) {
      const element = to.matched[i]

      if (regex.test(element.path)) {
        to.matched.splice(i, 1)
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
