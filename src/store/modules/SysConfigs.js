import { request } from '@/utils/request'

const state = {

}

const mutations = {

}

const actions = {
  // 获取全局键值对参数列表API
  SysParamentsKeyValueListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.SysParamentsKeyValueListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 批量更新键值对配置API
  SysParamentsKeyValueUpdate({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.SysParamentsKeyValueUpdate', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取产品分类列表API
  ProductCategorysListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.ProductCategorysListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增更新产品分类API
  ProductCategorysAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.ProductCategorysAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除产品分类API
  ProductCategorysDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.ProductCategorysDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 更新指定产品分类排序API
  ProductCategorysOrdersSet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.ProductCategorysOrdersSet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取共享文档分类列表API
  DocumentCategorysListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.DocumentCategorysListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增更新共享文档分类API
  DocumentCategorysAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.DocumentCategorysAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除指定共享文档分类API
  DocumentCategorysDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.DocumentCategorysDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 更新共享文档分类排序API
  DocumentCategorysOrderSet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.DocumentCategorysOrderSet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 分页获取额外投放费用项列表API
  AdvOtherCostsListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.AdvOtherCostsListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增更新额外投放费用项API
  AdvOtherCostsAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.AdvOtherCostsAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 根据ID查询投放费用项详情API
  AdvOtherCostsGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.AdvOtherCostsGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除指定投放费用项API
  AdvOtherCostsDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.AdvOtherCostsDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取客户行业树型列表API
  IndustrysListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.IndustrysListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增更新行业信息API
  IndustrysAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.IndustrysAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除行业信息API
  IndustrysDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.IndustrysDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 根据ID获取行业信息API
  IndustrysGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.IndustrysGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取国家地区树型列表API
  CountrysListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.CountrysListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 根据ID查询国家地区信息API
  CountrysGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.CountrysGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增更新国家地区信息API
  CountrysAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.CountrysAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除国家地区信息API
  CountrysDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.CountrysDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取媒体下产品类别默认返点列表API
  MediaDefaultReturnsListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.MediaDefaultReturnsListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增更新媒体下指定产品类别返点API
  MediaDefaultReturnsAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.MediaDefaultReturnsAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除某个媒体的全部默认返点设置API
  MediaDefaultReturnsDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.MediaDefaultReturnsDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增货币
  CurrencyAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.CurrencyAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除货币
  CurrencyDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.CurrencyDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获得货币接口数据
  CurrencyListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.CurrencyListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增广告主公司
  CompanysAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.CompanysAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除公司
  CompanysDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.CompanysDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获得公司列表
  CompanysListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.SysConfigs.CompanysListGet', requestParams).then(response => {
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
