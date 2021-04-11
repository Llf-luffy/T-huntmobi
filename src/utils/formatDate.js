// 日期格式化
export const formatDate = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export const formatDateMonth = (date) => {
  let value = ''
  if (date.getMonth() < 10) {
    value = `${date.getFullYear()}-0${date.getMonth() + 1}`
  } else {
    value = `${date.getFullYear()}-${date.getMonth() + 1}`
  }
  return value
}

export const formatDateLastMonth = (date) => {
  let value = ''
  if (!date.getMonth()) {
    value = `${date.getFullYear() - 1}-12`
  } else {
    value = `${date.getFullYear()}-0${date.getMonth()}`
  }
  return value
}

// 获取当前季度
export const formatDateQuarterly = (date) => {
  let value = ''
  var month = date.getMonth() + 1 // getMonth返回0-11
  // 下面是几个if
  if (month >= 1 && month <= 3) {
    value = `${date.getFullYear()}1`
  } else if (month >= 4 && month <= 6) {
    value = `${date.getFullYear()}2`
  } else if (month >= 7 && month <= 9) {
    value = `${date.getFullYear()}3`
  } else {
    value = `${date.getFullYear()}4`
  }
  return value
}
