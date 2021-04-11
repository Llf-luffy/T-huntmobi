import i18n from '@/lang'
import Date from './datetime.js'

export const calendarBaseShortcuts = [{
  text: i18n.t('shortcuts.one'),
  onClick(picker) {
    const start = new Date()
    picker.$emit('pick', [start, start])
  }
}, {
  text: i18n.t('shortcuts.two'),
  onClick(picker) {
    const start = new Date().daysAgo(1)
    picker.$emit('pick', [start, start])
  }
}, {
  text: i18n.t('shortcuts.three'),
  onClick(picker) {
    const start = new Date().daysAgo(7)
    picker.$emit('pick', [start, new Date()])
  }
}, {
  text: i18n.t('shortcuts.four'),
  onClick(picker) {
    const start = new Date().daysAgo(30)
    picker.$emit('pick', [start, new Date()])
  }
}, {
  text: i18n.t('shortcuts.five'),
  onClick(picker) {
    const start = new Date().monthBegin()
    picker.$emit('pick', [start, new Date()])
  }
}, {
  text: i18n.t('shortcuts.six'),
  onClick(picker) {
    const start = new Date().quarterBegin()
    picker.$emit('pick', [start, new Date()])
  }
}]

export const calendarMoveShortcuts = [{
  text: i18n.t('shortcuts.seven'),
  onClick(picker) {
    if (!picker.value) {
      picker.value = [new Date(), new Date()]
    }
    const start = picker.value[0].daysAgo(1)
    const end = picker.value[1].daysAgo(1)
    picker.$emit('pick', [start, end])
  }
}, {
  text: i18n.t('shortcuts.eight'),
  onClick(picker) {
    let start = new Date()
    let end = new Date()
    if (!picker.value) {
      start = new Date()
      end = new Date()
    } else if (picker.value.length > 0) {
      if (end - picker.value[1] > 8.64E7) {
        start = picker.value[0].daysAgo(-1)
        end = picker.value[1].daysAgo(-1)
      } else {
        start = picker.value[0]
      }
    }
    picker.$emit('pick', [start, end])
  }
}, {
  text: i18n.t('shortcuts.nine'),
  onClick(picker) {
    if (!picker.value) {
      picker.value = [new Date().daysAgo(7), new Date()]
    }
    const start = picker.value[0].daysAgo(7)
    const end = picker.value[1].daysAgo(7)
    picker.$emit('pick', [start, end])
  }
}, {
  text: i18n.t('shortcuts.ten'),
  onClick(picker) {
    let start = new Date().daysAgo(7)
    let end = new Date()
    if (!picker.value) {
      start = new Date().daysAgo(7)
      end = new Date()
    } else if (picker.value.length > 0) {
      if (end - picker.value[1] > 8.64E7) {
        start = picker.value[0].daysAgo(-7)
        end = picker.value[1].daysAgo(-7)
      } else {
        start = picker.value[0]
      }
    }
    picker.$emit('pick', [start, end])
  }
}]

export const calendarShortcuts = [
  ...calendarBaseShortcuts,
  ...calendarMoveShortcuts
]
