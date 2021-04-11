<template>
    <div class="right-menu" :class="{'header-right-menu':showHeader}">
      <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item" />

        <el-tooltip :content="$t('navbar.refresh')" effect="dark" placement="bottom">
          <div class="header-search right-menu-item hover-effect" @click="refresh()">
            <svg-icon icon-class="refresh" />
          </div>
        </el-tooltip>

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>

        <!-- <lang-select class="right-menu-item hover-effect" /> -->

        <el-tooltip :content="$t('navbar.messages') + `(${MessageCount})`" effect="dark" placement="bottom">
          <div class="header-search right-menu-item">
            <el-badge :is-dot="true" style="line-height: 25px;margin-top: -5px;">
              <router-link to="/messages">
                <svg-icon icon-class="messages" />
              </router-link>
            </el-badge>
          </div>
        </el-tooltip>

      </template>

      <el-dropdown class="user-container right-menu-item hover-effect" trigger="click">
        <div class="user-wrapper">
          <div class="user-name">{{ name }}</div>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <span style="display:block;" @click="show = true">
            <el-dropdown-item>
              {{ $t('navbar.layout') }}
            </el-dropdown-item>
          </span>
          <el-dropdown-item @click.native="modify">
            {{ $t('navbar.profile') }}
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- 修改信息 -->
      <el-dialog v-dialogDrag :title="dialogTitle" :visible.sync="dialogVisible" :width="device==='mobile'?'100%':'40%'" :before-close="cancelDialog" append-to-body>
        <el-form ref="form" :model="form" :rules="rules" :label-width="device==='mobile'?'30%':'20%'">
          <el-form-item label="邮箱" prop="UserEmail">
            <el-input v-model="form.UserEmail" placeholder="请输入邮箱" clearable />
          </el-form-item>
          <el-form-item label="手机号码" prop="UserMobile">
            <el-input v-model="form.UserMobile" placeholder="请输入手机号码" clearable />
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="form.UserPassword" placeholder="请输入新密码" clearable />
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="form.UserPasswordCheck" placeholder="请输入新密码" clearable />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelDialog">取 消</el-button>
          <el-button type="primary" :loading="loading" @click="confirmDialog">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import { request } from '@/utils/request'
import { getCookies, setCookies } from '@/utils/auth'
import { mapGetters,mapState } from 'vuex'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
// import LangSelect from '@/components/LangSelect'
import Search from '@/components/HeaderSearch'

export default {
  components: {
    ErrorLog,
    Screenfull,
    SizeSelect,
    // LangSelect,
    Search
  },
  data() {
    return {
      // 新增Dialog 对话框
      dialogVisible: false,
      // 新增Dialog 对话框标题
      dialogTitle: '',
      // 加载中
      loading: false,
      // 表单
      form: {},
      rules: {
        UserMobile: [{ required: true, trigger: 'blur', message: '请输入手机号码！' }],
        UserEmail: [
          { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ]
      },
      // 定时
      timer: null
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'user',
      'name',
      'device',
      'MessageCount',
      'showHeader'
    ]),
    show: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    }
  },
  created() {
    this.getNotifyMessagesStat()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    // 获取预警消息
    getNotifyMessagesStat() {
      const data = {}
      this.$store.dispatch('Platform/NotifyMessagesStat', data).then(async(response) => {
        const [Messages] = await this.getNotifyMessagesList()
        let title = ''
        let message = ''
        if (Messages) {
          title = Messages.MessageTitle
          message = Messages.MessageContext
        }
        const MessageCount = response.MessageCount
        // 如果消息个数大于缓存个数且先前存在过，则执行下面
        if (MessageCount > Number(getCookies('MessageCount')) && getCookies('MessageCount')) {
          const h = this.$createElement
          this.$notify({
            title: title,
            dangerouslyUseHTMLString: true,
            message: h('p', null, [
              h('span', null, message),
              h('el-button', {
                on: {
                  click: this.clickBtn
                }
              }, '查看')
            ]),
            type: 'warning'
          })
          this.notification(title, message)
        }
        setCookies('MessageCount', MessageCount)
        this.setTime()
      })
    },
    // 获取预警消息列表
    getNotifyMessagesList() {
      return new Promise((resolve, reject) => {
        const data = {
          IsRead: 1,
          PageID: 1,
          PageSize: 1
        }
        this.$store.dispatch('Platform/NotifyMessagesListGet', data).then((response) => {
          resolve(response.Messages)
        })
      })
    },
    setTime() {
      this.timer = setTimeout(() => {
        this.getNotifyMessagesStat()
      }, 1000 * 30)
    },
    // JavaScript 实现 Chrome 桌面通知
    notification(title, message) {
      const n = new Notification(title, {
        body: message,
        tag: 'notification',
        data: {
          url: 'https://sapi.huntmobi.com/#/messages'
        },
        timestamp: 3000
      })
      n.onshow = function() {
        console.log('通知显示了！')
      }
      n.onclick = function(e) {
        // 路由跳转页面
        window.open(n.data.url, '_blank')
        n.close()
      }
      n.onclose = function() {
        console.log('通知关闭了！')
      }
      n.onerror = function(err) {
        console.log('出错了，在检查一下吧')
        throw err
      }
    },
    clickBtn() {
      this.$router.push('/messages')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    // 刷新页面
    refresh() {
      const view = this.$route
      this.$store.dispatch('tagsView/delCachedView', view).then(() => {
        const { fullPath } = view
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    // 表单重置
    async reset() {
      const response = await this.$store.dispatch('user/getInfo')
      this.form = {
        UserPassword: response.User.UserPassword,
        UserPasswordCheck: response.User.UserPassword,
        UserEmail: response.User.UserEmail,
        UserMobile: response.User.UserMobile
      }
      this.$refs['form'].resetFields()
    },
    // 修改信息
    modify() {
      this.dialogVisible = true
      this.dialogTitle = '修改信息'
      this.reset()
    },
    // 取消
    cancelDialog() {
      this.dialogVisible = false
      this.$refs['form'].resetFields()
    },
    // 确定
    confirmDialog() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.UserPassword !== this.form.UserPasswordCheck) {
            this.$message({
              message: '密码不一致，请检查！',
              type: 'warning'
            })
            return
          }
          this.loading = true
          const data = {
            UserPassword: this.form.UserPassword,
            UserEmail: this.form.UserEmail,
            UserMobile: this.form.UserMobile
          }
          request('API.Platform.UserDataUpdate', data).then(response => {
            this.dialogVisible = false
            this.$message({
              message: '编辑成功！',
              type: 'success'
            })
          }).finally(() => {
            setTimeout(() => {
              this.loading = false
            }, 1000)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .right-menu {
    position: fixed;
    right: 0;
    top: 0;

    // height: 100%;
    // line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .user-container {
      margin-right: 30px;

      .user-wrapper {
        position: relative;

        .user-name {
          font-size: 16px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 16px;
          font-size: 12px;
        }
      }
    }
  }

.right-menu.header-right-menu {
    height: 80px;
    line-height: 80px;

    .right-menu-item {
        color: #ccc;
    }

    .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 32px !important;
        font-size: 12px;
    }
}
</style>
