import { request } from '@/utils/request'
import store from '@/store'

const state = {
  DailyReportDataList: []
}

const mutations = {
  // 投放报告
  SET_DAILYREORTDATALIST: (state, list) => {
    state.DailyReportDataList = list
  },
  // 投放明细
  SET_DATAREPORTDETAIL: (state, list) => {
    state.DataReportDetail = list
  }
}

const actions = {
  // 报表查询控件构建列表API
  ReportSearchControlsListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Analysis.ReportSearchControlsListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 多图表报表批量查询获取API
  RetportsListGet({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Analysis.RetportsListGet', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 综合页面数据报表接口
  MainPageAnalysis({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Analysis.MainPageAnalysis', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 每日投放数据统计信息文字说明
  DailyReport({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Analysis.DailyReport', requestParams).then(response => {
        // 利润率处理
        response.DailyReportDataList.forEach(element => {
          element['AdvertisersTitle'] = element.FieldsNames.AdvertisersTitle
          element['AdvProductCategoryTitle'] = element.FieldsNames.AdvProductCategoryTitle
          element['AdvProductTitle'] = element.FieldsNames.AdvProductTitle
          element['MediaTitle'] = element.FieldsNames.MediaTitle
          if (element.FieldsNames.AccountName) {
            element['AccountName'] = element.FieldsNames.AccountName.split('||')
            // 账户名称
            element['AccountTitle'] = element['AccountName'][0]
            // 账户ID
            element['AccountID'] = element['AccountName'][1]
            // 账户余额
            element['AccountBalance'] = element['AccountName'][2]
          }
          element['BusinessName'] = element.FieldsNames.BusinessName
          element['OptimizeName'] = element.FieldsNames.OptimizeName
          element['OperationsName'] = element.FieldsNames.OperationsName
          store.getters.MediaPlatform.forEach(item => {
            if (Number(element.FieldsNames.MediaPlatform) === item.value) {
              element['MediaPlatform'] = item.name
              element.FieldsNames.MediaPlatform = item.name
            }
          })
          if (element.FieldsNames.AddDate) {
            element['AddDate'] = element.FieldsNames.AddDate.substr(0, element.FieldsNames.AddDate.length - 7)
          }
          element.ProfitRate = `${(element.ProfitRate * 100).toFixed(2)}%`
        })
        if (!requestParams.PageID && !requestParams.PageSize) {
          commit('SET_DAILYREORTDATALIST', response.DailyReportDataList)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 广告主分析页
  AdvertiserAnalysisReport({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Analysis.AdvertiserAnalysisReport', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 商业业绩分析
  BusinessAnalysis({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Analysis.BusinessAnalysis', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 产品类别分析排行表
  ProductCategoryAnalysis({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Analysis.ProductCategoryAnalysis', requestParams).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 每日明细数据报告
  DailyDetailsReport({ commit, state }, requestParams) {
    return new Promise((resolve, reject) => {
      request('API.Analysis.DailyDetailsReport', requestParams).then(response => {
        // 利润率处理
        response.DataReportDetail.forEach(element => {
          element['AdvertisersTitle'] = element.FieldsNames.AdvertisersTitle
          element['AdvProductCategoryTitle'] = element.FieldsNames.AdvProductCategoryTitle
          element['AdvProductTitle'] = element.FieldsNames.AdvProductTitle
          element['RegionName'] = element.FieldsNames.RegionName
          element['CountryName'] = element.FieldsNames.CountryName
          element['MediaTitle'] = element.FieldsNames.MediaTitle
          if (element.FieldsNames.AccountName) {
            element['AccountName'] = element.FieldsNames.AccountName.split('||')
            // 账户名称
            element['AccountTitle'] = element['AccountName'][0]
            // 账户ID
            element['AccountID'] = element['AccountName'][1]
            // 账户余额
            element['AccountBalance'] = element['AccountName'][2]
          }
          element['BusinessName'] = element.FieldsNames.BusinessName
          element['OptimizeName'] = element.FieldsNames.OptimizeName
          element['OperationsName'] = element.FieldsNames.OperationsName
          element['OperationsName'] = element.FieldsNames.OperationsName
          store.getters.MediaPlatform.forEach(item => {
            if (Number(element.FieldsNames.MediaPlatform) === item.value) {
              element['MediaPlatform'] = item.name
              element.FieldsNames.MediaPlatform = item.name
            }
          })
          if (element.FieldsNames.AddDate) {
            element['AddDate'] = element.FieldsNames.AddDate.substr(0, element.FieldsNames.AddDate.length - 7)
          }
          element.ProfitRate = `${(element.ProfitRate * 100).toFixed(2)}%`
        })
        if (!requestParams.PageID && !requestParams.PageSize) {
          commit('SET_DATAREPORTDETAIL', response.DataReportDetail)
        }
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
