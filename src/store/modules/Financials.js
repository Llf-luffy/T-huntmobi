import { request } from '@/utils/request'
import store from '@/store'

const state = {
  // 广告主月度账户列表
  AdvStatementsList: [],
  // 广告主季度返点列表
  AdvQuarterlyReturnsList: [],
  // 媒体月度账单列表
  MdiStatementsList: [],
  // 媒体月度返点列表
  MdiMonthReturnsList: [],
  // 媒体季度返点列表
  QuarterlyReturnsList: [],
  // 广告主充值列表
  PaysList: [],
  // 回款记录列表
  BackMoneysList: [],
  // 跟进记录
  TrackingsList: [],
  // 广告主账单明细
  AccDetails: [],
  // 媒体账单明细
  MdiStatementsAccDetails: []
}

const mutations = {
  SET_ADVSTATEMENTSLIST: (state, list) => {
    state.AdvStatementsList = list
  },
  SET_ADVQUARTERLYRETURNSLIST: (state, list) => {
    state.AdvQuarterlyReturnsList = list
  },
  SET_MDISTATEMENTSLIST: (state, list) => {
    state.MdiStatementsList = list
  },
  SET_MDIMONTHRETURNSLIST: (state, list) => {
    state.MdiMonthReturnsList = list
  },
  SET_QUARTERLYRETURNSLIST: (state, list) => {
    state.QuarterlyReturnsList = list
  },
  SET_PAYSLIST: (state, list) => {
    state.PaysList = list
  },
  SET_BACKMONEYSLIST: (state, list) => {
    state.BackMoneysList = list
  },
  SET_TRACKINGSLIST: (state, list) => {
    state.TrackingsList = list
  },
  SET_ACCDETAILS: (state, list) => {
    state.AccDetails = list
  },
  SET_MIDISTATEMENTSACCDETAILS: (state, list) => {
    state.MdiStatementsAccDetails = list
  }
}

const actions = {
  // 广告主月度帐单分页查询API
  AdvStatementsListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvStatementsListGet', requestParams).then(response => {
        response.AdvStatements.forEach(element => {
          if (element.Adv_Company) {
            element['Adv_CompanyName'] = element.Adv_Company.CompanyName
          }
          if (element.Bis_Company) {
            element['Bis_CompanyName'] = element.Bis_Company.CompanyName
          }
        })
        if (!requestParams.PageID && !requestParams.PageSize) {
          commit('SET_ADVSTATEMENTSLIST', response.AdvStatements)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 广告主帐户充值记录审核API
  AdvPaysAudit({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvPaysAudit', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增更新广告主历史帐户充值API
  AdvPaysAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvPaysAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除待审核的充值记录API
  AdvPaysDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvPaysDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取广告主历史充值列表API
  AdvPaysListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvPaysListGet', requestParams).then(response => {
        response.Pays.forEach(element => {
          if (!element.AuditUser) {
            element.AuditUser = '未审核'
            element.AuditTime = '未审核'
          }
          element.PayMoneys = element.PayMoneys.toFixed(2)
        })
        if (!requestParams.PageID && !requestParams.PageSize) {
          commit('SET_PAYSLIST', response.Pays)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 分页获取月度帐单分帐户明细表API
  AdvStatementsAccListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvStatementsAccListGet', requestParams).then(response => {
        // 数据源处理
        response.AccDetails.forEach(element => {
          element['MediaTitle'] = element.Media.MediaTitle
          element['MediaAccountID'] = element.Account.MediaAccountID
          element['MediaAccountName'] = element.Account.MediaAccountName
          element['YearMonth'] = element.AdvStatement.YearMonth
        })
        if (!requestParams.PageID && !requestParams.PageSize) {
          commit('SET_ACCDETAILS', response.AccDetails)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 添加更新广告主月帐单回款记录API
  AdvStatementsBackMoneysAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvStatementsBackMoneysAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 确认广告主月帐单回款记录API
  AdvStatementsBackMoneysConfirm({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvStatementsBackMoneysConfirm', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除待确认广告主月帐单回款记录API
  AdvStatementsBackMoneysDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvStatementsBackMoneysDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取广告主月帐单回款记录详情API
  AdvStatementsBackMoneysGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvStatementsBackMoneysGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 分页获取广告主帐单回款列表API
  AdvStatementsBackMoneysListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvStatementsBackMoneysListGet', requestParams).then(response => {
        response.BackMoneys.forEach(element => {
          if (element.BusinessCompany) {
            element['BusinessCompanyName'] = element.BusinessCompany.CompanyName
          }
          if (element.AdvCompany) {
            element['AdvCompanyName'] = element.AdvCompany.CompanyName
          }
        })
        if (!requestParams.PageID && !requestParams.PageSize) {
          console.log('response.BackMoneys', response.BackMoneys)
          commit('SET_BACKMONEYSLIST', response.BackMoneys)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 广告主月帐单确认完成对帐API
  AdvStatementsConfirm({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvStatementsConfirm', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取广告主月度帐单详情API
  AdvStatementsGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvStatementsConfirm', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 添加更新广告主月帐单跟进记录API
  AdvStatementsTrackingsAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvStatementsTrackingsAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除广告主月帐单跟进记录API
  AdvStatementsTrackingsDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvStatementsTrackingsDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取跟进记录列表API
  AdvStatementsTrackingsListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvStatementsTrackingsListGet', requestParams).then(response => {
        if (!requestParams.PageID && !requestParams.PageSize) {
          commit('SET_TRACKINGSLIST', response.Trackings)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增更新媒体月度返点记录API
  MdiMonthReturnsAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiMonthReturnsAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增更新媒体月度返点信息
  MdiMonthReturnsUpdate({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiMonthReturnsUpdate', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 批量获取媒体按分类列表API
  MdiMonthReturnsCategorysListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiMonthReturnsCategorysListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 媒体月度返点审核确认API
  MdiMonthReturnsConfirm({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiMonthReturnsConfirm', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除媒体月度返点记录API
  MdiMonthReturnsDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiMonthReturnsDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取媒体月度返点记录详情API
  MdiMonthReturnsGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiMonthReturnsGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 分页获取媒体月度返点记录列表API
  MdiMonthReturnsListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiMonthReturnsListGet', requestParams).then(response => {
        response.MdiMonthReturns.forEach(element => {
          element['MediaTitle'] = element.Media.MediaTitle
          if (element.Mdi_Company) {
            element['Mdi_CompanyName'] = element.Mdi_Company.CompanyName
          }
          if (element.Bis_Company) {
            element['Bis_CompanyName'] = element.Bis_Company.CompanyName
          }
        })
        if (!requestParams.PageID && !requestParams.PageSize) {
          commit('SET_MDIMONTHRETURNSLIST', response.MdiMonthReturns)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 类目月度返点预估统计查询API
  MdiMonthReturnsStatGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiMonthReturnsStatGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增更新媒体季度返点API
  MdiQuarterlyReturnsAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiQuarterlyReturnsAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取季度返点类目数据列表API
  MdiQuarterlyReturnsCategorysListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiQuarterlyReturnsCategorysListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 媒体季度返点新增自定义返点
  MdiQuarterlyReturnsCustomAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiQuarterlyReturnsCustomAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 媒体季度返点记录确认API
  MdiQuarterlyReturnsConfirm({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiQuarterlyReturnsConfirm', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取季度分类消耗数据列表API
  MdiQuarterlyReturnsDatasListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiQuarterlyReturnsDatasListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除媒体季度返点记录API
  MdiQuarterlyReturnsDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiQuarterlyReturnsDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取单个媒体季度返点详情API
  MdiQuarterlyReturnsGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiQuarterlyReturnsGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取媒体季度返点列表API
  MdiQuarterlyReturnsListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiQuarterlyReturnsListGet', requestParams).then(response => {
        response.QuarterlyReturns.forEach(element => {
          element['MediaTitle'] = element.Media.MediaTitle
          if (element.Mdi_Company) {
            element['Mdi_CompanyName'] = element.Mdi_Company.CompanyName
          }
          if (element.Bis_Company) {
            element['Bis_CompanyName'] = element.Bis_Company.CompanyName
          }
        })
        if (!requestParams.PageID && !requestParams.PageSize) {
          commit('SET_QUARTERLYRETURNSLIST', response.QuarterlyReturns)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 根据填写季度返点获取预估返点金额API
  MdiQuarterlyReturnsStatGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiQuarterlyReturnsStatGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 确认媒体月度帐单对帐API
  MdiStatementsConfirm({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiStatementsConfirm', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 更改媒体月度帐单有效消耗金额API
  MdiStatementsEffConsSet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiStatementsEffConsSet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取指定媒体月度帐单详情API
  MdiStatementsGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiStatementsGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 确认媒体月度帐单已收发票API
  MdiStatementsInvoiceConfirm({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiStatementsInvoiceConfirm', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 媒体月度帐单分页查询API
  MdiStatementsListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiStatementsListGet', requestParams).then(response => {
        response.MdiStatements.forEach(element => {
          element['MediaTitle'] = element.Media.MediaTitle
          if (element.Mdi_Company) {
            element['Mdi_CompanyName'] = element.Mdi_Company.CompanyName
          }
          if (element.Bis_Company) {
            element['Bis_CompanyName'] = element.Bis_Company.CompanyName
          }
        })
        if (!requestParams.PageID && !requestParams.PageSize) {
          commit('SET_MDISTATEMENTSLIST', response.MdiStatements)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增更新媒体月度帐单付款记录API
  MdiStatementsPaysAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiStatementsPaysAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 分页获取付款记录列表API
  MdiStatementsPaysListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiStatementsPaysListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 广告主月账单更新数据
  AdvStatementsUpdate({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvStatementsUpdate', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 媒体账单更新
  MdiStatementsUpdate({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiStatementsUpdate', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获得广告主月返点列表
  AdvMonthReturnsListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvMonthReturnsListGet', requestParams).then(response => {
        response.AdvMonthReturns.forEach(element => {
          if (element.Adv_Company) {
            element['Adv_CompanyName'] = element.Adv_Company.CompanyName
          }
          if (element.Bis_Company) {
            element['Bis_CompanyName'] = element.Bis_Company.CompanyName
          }
        })
        if (!requestParams.PageID && !requestParams.PageSize) {
          commit('SET_MDIMONTHRETURNSLIST', response.AdvMonthReturns)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 广告主月度返点更新数据
  AdvMonthReturnsUpdate({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvMonthReturnsUpdate', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获得广告主季度返点信息列表
  AdvQuarterlyReturnsListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvQuarterlyReturnsListGet', requestParams).then(response => {
        response.AdvQuarterlyReturns.forEach(element => {
          // 将审核字段转下文字
          store.getters.AuditStatus.forEach(item => {
            if (element.AuditStatus === item.value) {
              element['AuditStatusTitle'] = item.label
            }
            if (element.Adv_Company) {
              element['Adv_CompanyName'] = element.Adv_Company.CompanyName
            }
            if (element.Bis_Company) {
              element['Bis_CompanyName'] = element.Bis_Company.CompanyName
            }
          })
        })
        if (!requestParams.PageID && !requestParams.PageSize) {
          commit('SET_ADVQUARTERLYRETURNSLIST', response.AdvQuarterlyReturns)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增广告主月账单 - 月账单生成
  AdvStatementsAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvStatementsAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 批量更新广告主月账单账户消耗数据接口
  AdvStatementsAccListUpdate({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvStatementsAccListUpdate', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增媒体月度账单 (手动添加账单)
  MdiStatementsAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiStatementsAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获得媒体月度账单账户明细表
  MdiStatementsAccListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiStatementsAccListGet', requestParams).then(response => {
        // 数据源处理
        response.MdiStatementsAccDetails.forEach(element => {
          element['MediaTitle'] = element.Media.MediaTitle
          element['MediaAccountID'] = element.Account.MediaAccountID
          element['MediaAccountName'] = element.Account.MediaAccountName
          element['YearMonth'] = element.MdiStatement.YearMonth
        })
        if (!requestParams.PageID && !requestParams.PageSize) {
          commit('SET_MIDISTATEMENTSACCDETAILS', response.MdiStatementsAccDetails)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 媒体月度账单账户明细消耗修改
  MdiStatementsAccUpdate({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiStatementsAccUpdate', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 更新账单公司主体
  AdvStatementsCompanyUpdate({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvStatementsCompanyUpdate', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 媒体账单公司主体修改
  MdiStatementsCompanyUpdate({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiStatementsCompanyUpdate', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获得广告主月度返点账户明细
  AdvMonthReturnsAccListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvMonthReturnsAccListGet', requestParams).then(response => {
        if (!requestParams.PageID && !requestParams.PageSize) {
          commit('SET_ACCDETAILS', response.AccDetails)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 媒体月度返点账户详细列表
  MdiMonthReturnsAccListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiMonthReturnsAccListGet', requestParams).then(response => {
        if (!requestParams.PageID && !requestParams.PageSize) {
          commit('SET_ACCDETAILS', response.AccDetails)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获得季度返点记录 账户详细数据
  MdiQuarterlyReturnsAccListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiQuarterlyReturnsAccListGet', requestParams).then(response => {
        if (!requestParams.PageID && !requestParams.PageSize) {
          commit('SET_ACCDETAILS', response.AccDetails)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 媒体季度返点账户详情 账户信息更新
  MdiQuarterlyReturnsAccListUpdate({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiQuarterlyReturnsAccListUpdate', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 媒体账单核对
  MdiStatementsCheck({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiStatementsCheck', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增广告主季度返点可选广告主列表
  AdvQuarterlyReturnsAddGetList({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvQuarterlyReturnsAddGetList', requestParams).then(response => {
        if (!requestParams.PageID && !requestParams.PageSize) {
          commit('SET_ADVQUARTERLYRETURNSLIST', response.AdvQuarterlyReturns)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 广告主月度返点公司主体修改
  AdvMonthReturnsCompanyUpdate({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvMonthReturnsCompanyUpdate', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 媒体月度返点公司主体修改
  MdiMonthReturnsCompanyUpdate({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiMonthReturnsCompanyUpdate', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 操作修改媒体季度返点选项
  MdiQuarterlyReturnsOptionsUpdate({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiQuarterlyReturnsOptionsUpdate', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获得媒体季度返点回款记录列表
  MdiQuarterlyReturnsBackMoneysGetList({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiQuarterlyReturnsBackMoneysGetList', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增媒体季度返点回款记录
  MdiQuarterlyReturnsBackMoneysAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiQuarterlyReturnsBackMoneysAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 媒体季度返点回款记录审核
  MdiQuarterlyReturnsBackMoneysConfirm({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiQuarterlyReturnsBackMoneysConfirm', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除媒体季度返点回款记录
  MdiQuarterlyReturnsBackMoneysDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiQuarterlyReturnsBackMoneysDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获得媒体月度未付款完成账单
  MdiStatementsSeqListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.MdiStatementsSeqListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增广告主季度返点
  AdvQuarterlyReturnsAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvQuarterlyReturnsAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获得广告主季度返点账户明细数据
  AdvQuarterlyReturnsAccListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvQuarterlyReturnsAccListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 更新广告主季度返点选项
  AdvQuarterlyReturnsUpdate({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvQuarterlyReturnsUpdate', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 审核广告主季度返点记录
  AdvQuarterlyReturnsConfirm({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvQuarterlyReturnsConfirm', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增广告主季度返点付款记录
  AdvQuarterlyReturnsPayAdd({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvQuarterlyReturnsPayAdd', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 广告主季度返点付款记录审核
  AdvQuarterlyReturnsPayConfirm({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvQuarterlyReturnsPayConfirm', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获得广告主季度返点付款记录列表
  AdvQuarterlyReturnsPayListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvQuarterlyReturnsPayListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除付款记录
  AdvQuarterlyReturnsPayDelete({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvQuarterlyReturnsPayDelete', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获得广告主未完成账单列表
  AdvStatementsSeqListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Financials.AdvStatementsSeqListGet', requestParams).then(response => {
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
