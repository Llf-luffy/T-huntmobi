import { request } from '@/utils/request'
import store from '@/store'

const state = {
  // 广告主列表
  AdvertisersList: [],
  // 产品列表
  ProductsList: [],
  // 账户列表
  AccountsList: [],
  // 日志列表
  LogsList: []
}

const mutations = {
  SET_ADVERTISERSLIST: (state, list) => {
    state.AdvertisersList = list
  },
  SET_PRODUCTSLIST: (state, list) => {
    state.ProductsList = list
  },
  SET_ACCOUNTSLIST: (state, list) => {
    state.AccountsList = list
  },
  SET_LOGSLIST: (state, list) => {
    state.LogsList = list
  }
}

const actions = {
  // 添加更新广告主API
  AdvertisersAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 分页获取广告主列表API
  AdvertisersListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersListGet', requestParams).then(response => {
        response.Advertisers.forEach(element => {
          element['AdvertisersServiceRebateValue'] = `${(element.AdvertisersServiceRebate * 100).toFixed(2)}`
          element['IndustryIndustrysTitle'] = element.Industry.IndustrysTitle
          element['BusineseUserUserRealname'] = element.BusineseUser.UserRealname
          element['OperationUserUserRealname'] = element.OperationUser.UserRealname
          element['OperationUserUserRealname'] = element.OperationUser.UserRealname
        })
        if (!requestParams.PageID && !requestParams.PageSize) {
          commit('SET_ADVERTISERSLIST', response.Advertisers)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除广告主API
  AdvertisersDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 更新广告主授信额度API
  AdvertisersCreditMoneysUpdate({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersCreditMoneysUpdate', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 添加广告主备注信息API
  AdvertisersRemarksAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersRemarksAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 分页获取广告主备注列表API
  AdvertisersRemarksListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersRemarksListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 分页获取广告主日志列表API
  AdvertisersLogsListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersLogsListGet', requestParams).then(response => {
        if (!requestParams.PageID && !requestParams.PageSize) {
          commit('SET_LOGSLIST', response.Logs)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 分页获取广告主联系人列表API
  AdvertisersLinkmansListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersLinkmansListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增更新广告主联系人API
  AdvertisersLinkmansAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersLinkmansAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取指定广告主联系人详情API
  AdvertisersLinkmansGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersLinkmansGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除广告主联系人API
  AdvertisersLinkmansDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersLinkmansDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取广告主产品列表API
  AdvertisersProductsListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersProductsListGet', requestParams).then(response => {
        response.Products.forEach(element => {
          element['AdvertisersInfoAdvertisersTitle'] = element.AdvertisersInfo.AdvertisersTitle
          element['CategorysInfoCategoryTitle'] = element.CategorysInfo.CategoryTitle
        })
        if (!requestParams.PageID && !requestParams.PageSize) {
          commit('SET_PRODUCTSLIST', response.Products)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增更新广告主产品信息API
  AdvertisersProductsAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersProductsAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取广告主产品详情API
  AdvertisersProductsGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersProductsGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除广告主产品API
  AdvertisersProductsDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersProductsDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 分页获取广告帐户列表API
  AdvertisersAccountsListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersAccountsListGet', requestParams).then(response => {
        response.Accounts.forEach(element => {
          element['label'] = element.MediaAccountName ? `${element.MediaAccountName}【${element.MediaAccountID}】` : element.MediaAccountID
          element['AdvertisersInfoAdvertisersTitle'] = element.AdvertisersInfo.AdvertisersTitle
          element['MediasInfoMediaTitle'] = element.MediasInfo.MediaTitle
          element['ProductsInfoProductTitle'] = element.ProductsInfo.ProductTitle
          store.getters.MediaStatus.forEach(item => {
            if (element.MediaStatus === item.value) {
              element.MediaStatusValue = item.name
            }
          })
        })
        if (!requestParams.PageID && !requestParams.PageSize) {
          commit('SET_ACCOUNTSLIST', response.Accounts)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取广告帐户详细API
  AdvertisersAccountsGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersAccountsGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 添加更新广告帐户设置API
  AdvertisersAccountsAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersAccountsAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除指定广告帐户API
  AdvertisersAccountsDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersAccountsDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取广告主服务费率设置列表API
  AdvertisersServiceRebatesListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersServiceRebatesListGet', requestParams).then(response => {
        response.ServiceRebates.forEach(element => {
          element.PreServiceRebate = (element.PreServiceRebate * 100).toFixed(2)
          element.Steps.forEach(item => {
            item.ServiceRebateValue = (item.ServiceRebate * 100).toFixed(2)
          })
        })
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增更新广告主服务费率设置API
  AdvertisersServiceRebatesAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersServiceRebatesAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除指定服务费率阶梯规则API
  AdvertisersServiceRebatesDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersServiceRebatesDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 查询单个广告主服务费率阶梯详情API
  AdvertisersServiceRebatesGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersServiceRebatesGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 查询产品返点阶梯明细列表API
  AdvReturnsListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvReturnsListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增更新产品返点阶梯设置API
  AdvReturnsAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvReturnsAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取单个产品返点阶梯明细API
  AdvReturnsGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvReturnsGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除指定产品返点阶梯API
  AdvReturnsDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvReturnsDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 根据媒体获取可新增广告帐户列表API
  AdvertisersAccountsNewsListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersAccountsNewsListGet', requestParams).then(response => {
        response.newAccounts.forEach(item => {
          item['label'] = item.Name ? `${item.Name}【${item.Value}】` : item.Value
        })
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增广告主对应用户账户
  AdvertisersUsersAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersUsersAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 广告账户更新 API 数据报表
  AdvertisersAccountUpdateStat({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersAccountUpdateStat', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 广告主账户批量修改
  AdvertisersAccountsUpdateList({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersAccountsUpdateList', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 广告主账户批量修改
  AdvertisersUpdateList({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersUpdateList', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 广告主账户批量修改
  AdvertisersAccountsOption({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Advertisers.AdvertisersAccountsOption', requestParams).then(response => {
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
