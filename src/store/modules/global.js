
const state = {
  // 广告媒体所属的媒体平台，默认选项【全部媒体平台】默认值为-1，枚举列表为：Google = 0, Facebook = 1, Tiktok = 2, Twitte = 3
  MediaPlatform: [{
    name: 'Google',
    value: 0
  }, {
    name: 'Facebook',
    value: 1
  }, {
    name: 'TikTok',
    value: 2
  },{
    name:'Twitter',
    value:3
  }],
  AccountServiceMode: [{
    label: '自投',
    value: 0
  }, {
    label: '代投',
    value: 1
  }],
  // 0表示帐户信息更新，1表示广告帐户更新，2表示广告产品更新，3表示返点设置更新
  LogsType: [{
    label: '帐户信息更新',
    value: 0
  }, {
    label: '广告帐户更新',
    value: 1
  }, {
    label: '广告产品更新',
    value: 2
  }, {
    label: '返点设置更新',
    value: 3
  }],
  // 帐单状态，前端构建下拉单选，默认【全部帐单】，默认值-1，可选项包括： 等待核对 = 0, 等待对帐 = 1, 待寄发票 = 2, 等待回款 = 3, 部份回款 = 4,帐单完结 = 5
  AdvStatementStatus: [{
    label: '等待核对',
    value: 0
  }, {
    label: '等待对帐',
    value: 1
  }, {
    label: '待寄发票',
    value: 2
  }, {
    label: '等待回款',
    value: 3
  }, {
    label: '部份回款',
    value: 4
  }, {
    label: '帐单完结',
    value: 5
  }],
  // 广告账户管理默认0  表示未知 1 表示不正常  2表示正常
  MediaStatus: [{
    name: '未知',
    value: 0
  }, {
    name: '禁用',
    value: 1
  }, {
    name: '其他',
    value: 2
  }],
  // AuditStatus
  AuditStatus: [{
    label: '确认有效消耗',
    value: 1
  }, {
    label: '填写对账金额',
    value: 2
  }, {
    label: '付款转存',
    value: 3
  }, {
    label: '完成',
    value: 4
  }]
}

const mutations = {

}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
