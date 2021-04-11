const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  user: state => state.user.user,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  headerActived: state => state.permission.headerActived,
  errorLogs: state => state.errorLog.logs,
  showHeader: state => state.settings.showHeader,
  // 媒体平台枚举数据
  MediaPlatform: state => state.global.MediaPlatform,
  // 帐单状态
  AdvStatementStatus: state => state.global.AdvStatementStatus,
  // 广告账户状态
  MediaStatus: state => state.global.MediaStatus,
  // 广告主季度审核状态
  AuditStatus: state => state.global.AuditStatus,
  // 模型数据
  UserDataModels: state => state.user.UserDataModels,
  // 每日投放数据
  DailyReportDataList: state => state.Analysis.DailyReportDataList,
  // 每日投放明细数据
  DataReportDetail: state => state.Analysis.DataReportDetail,
  // 广告主数据
  AdvertisersList: state => state.Advertisers.AdvertisersList,
  // 广告产品数据
  ProductsList: state => state.Advertisers.ProductsList,
  // 广告账户数据
  AccountsList: state => state.Advertisers.AccountsList,
  // 广告主日志列表
  LogsList: state => state.Advertisers.LogsList,
  // 媒体列表
  MediasList: state => state.Medias.MediasList,
  // 广告主月度账户列表
  AdvStatementsList: state => state.Financials.AdvStatementsList,
  // 广告主季度返点列表
  AdvQuarterlyReturnsList: state => state.Financials.AdvQuarterlyReturnsList,
  // 媒体月度账单列表
  MdiStatementsList: state => state.Financials.MdiStatementsList,
  // 媒体月度返点列表
  MdiMonthReturnsList: state => state.Financials.MdiMonthReturnsList,
  // 媒体季度返点列表
  QuarterlyReturnsList: state => state.Financials.QuarterlyReturnsList,
  // 广告主充值列表
  PaysList: state => state.Financials.PaysList,
  // 回款记录列表
  BackMoneysList: state => state.Financials.BackMoneysList,
  // 跟进记录
  TrackingsList: state => state.Financials.TrackingsList,
  // 广告主账单明细
  AccDetails: state => state.Financials.AccDetails,
  // 媒体账单明细
  MdiStatementsAccDetails: state => state.Financials.MdiStatementsAccDetails,
  // 消息数据
  MessageCount: state => state.Platform.MessageCount
}
export default getters
