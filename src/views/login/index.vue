<template>
  <div class="container">
    <vue-particles
      class="particles-js"
      color="#dedede"
      :particle-opacity="0.7"
      :particles-number="80"
      shape-type="polygon"
      :particle-size="4"
      lines-color="#dedede"
      :lines-width="1"
      :line-linked="true"
      :line-opacity="0.4"
      :lines-distance="150"
      :move-speed="3"
      :hover-effect="true"
      hover-mode="grab"
      :click-effect="true"
      click-mode="push"
    />
    <div class="login">
      <div class="login-form">
        <div class="login-logo">
          <img :src="logo" class="sidebar-logo">
        </div>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" type="text" auto-complete="off" :placeholder="$t('login.account')" clearable>
              <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" auto-complete="off" :placeholder="$t('login.password')" show-password @keyup.enter.native="handleLogin">
              <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input v-model="loginForm.code" auto-complete="off" :placeholder="$t('login.veCificationCode')" style="width: 63%" clearable @keyup.enter.native="handleLogin">
              <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
            </el-input>
            <div class="login-code">
              <img :src="codeUrl" @click="getCode">
            </div>
          </el-form-item>
          <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;">{{ $t('login.remember') }}</el-checkbox>
          <el-form-item style="width:100%;">
            <el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
              <span v-if="!loading">{{ $t('login.login') }}</span>
              <span v-else>{{ $t('login.loginIn') }}</span>
            </el-button>
          </el-form-item>
        </el-form>
        <!-- <lang-select class="set-language" /> -->
        <!-- <div class="reserved">Copyright © 2020 HuntMabi All Rights Reserved</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Config from '@/settings'
import { getCookies, setCookies, removeCookies } from '@/utils/auth'
// import LangSelect from '@/components/LangSelect'
import { request } from '@/utils/request'
export default {
  name: 'Login',
  components: {
    // LangSelect
  },
  data() {
    return {
      codeUrl: '',
      cookiePass: '',
      loginForm: {
        username: '',
        password: '',
        rememberMe: false,
        code: '',
        uuid: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: this.$t('login.notAccount') }],
        password: [{ required: true, trigger: 'blur', message: this.$t('login.notPassword') }],
        code: [{ required: true, trigger: 'change', message: this.$t('login.notVeCificationCode') }]
      },
      loading: false,
      redirect: undefined,
      logo: require('../../assets/xl_logo.png')
    }
  },
  computed: {
    ...mapState({
      device: state => state.app.device
    }),
    theme() {
      return this.$store.state.settings.theme
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // 获取验证码
    this.getCode()
    // 获取用户名密码等Cookie
    this.getCookie()
  },
  methods: {
    getCode() {
      const data = {}
      // 提供给前端登录页面获取用户登录验证码和关联验证串的API接口，该接口返回验证码和验证串，登录时必须一并提供
      request('API.Platform.VerifyImageGet', data).then((res) => {
        // 验证码图片的Base64编码
        this.codeUrl = res.VerifyImageBase64
        // 验证串，在登录时和帐号、密码、验证码一并提交
        this.loginForm.uuid = res.VerifyData
      })
    },
    getCookie() {
      const username = getCookies('username')
      let password = getCookies('password')
      const rememberMe = getCookies('rememberMe')
      // 保存cookie里面的加密后的密码
      this.cookiePass = password === undefined ? '' : password
      password = password === undefined ? this.loginForm.password : password
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
        code: ''
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        const user = {
          username: this.loginForm.username,
          password: this.loginForm.password,
          rememberMe: this.loginForm.rememberMe,
          code: this.loginForm.code,
          uuid: this.loginForm.uuid
        }
        if (valid) {
          this.loading = true
          if (user.rememberMe) {
            setCookies('username', user.username, { expires: Config.passCookieExpires })
            setCookies('password', user.password, { expires: Config.passCookieExpires })
            setCookies('rememberMe', user.rememberMe, { expires: Config.passCookieExpires })
          } else {
            removeCookies('username')
            removeCookies('password')
            removeCookies('rememberMe')
          }
          const data = {
            // 用户登录帐号
            UserAccount: user.username,
            // 用户登录密码
            UserPassword: user.password,
            // 用户填写的验证码
            VerifyCode: user.code,
            // 验证码验证数据，由验证码API返回的验证码图片关联的加密验证串，前端必须正确提供给服务器进行验证。
            VerifyData: user.uuid
          }
          // 提供给用户使用帐号和密码登录的API接口，该API需要提供验证码和验证码对应的安全码，服务端将进行校验。
          this.$store.dispatch('user/login', data).then((response) => {
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.getCode()
          }).finally(() => {
            setTimeout(() => {
              this.loading = false
            }, 1000)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  height: 100%;
}
.particles-js {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/images/background.jpg');
  background-size: cover;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0 60px 0 60px;
  .login-logo {
    text-align: center;
    z-index: 999;
    .sidebar-logo {
      width: 300px;
      height: 100%;
    }
  }
}
.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  float: right;
  img{
    height: 38px;
    cursor: pointer;
    vertical-align:middle
  }
}
.set-language {
  color: #fff;
  position: absolute !important;
  right: 40px;
  top: 40px;
  font-size: 18px;
  cursor: pointer;
  z-index: 999;
}
.reserved {
  position: absolute;
  bottom: 30px;
  font-size: 14px;
  line-height: 1.6;
  color: #ffffff;
  z-index: 999;
}
@media only screen and (max-width: 768px) {
  .particles-js {
    background-image: url('../../assets/images/login-bg.jpg');
  }
  .login-form {
    width: 800px;
    border-radius: 6px;
    z-index: 999;
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .input-icon{
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }
  }
  .sidebar-logo {
    padding: 0 10px 30px 10px;
  }
}
@media only screen and (min-width: 768px) {
  .particles-js {
    background-image: url('../../assets/images/login-bg.jpg');
  }
  .login-form {
    width: 800px;
    border-radius: 6px;
    z-index: 999;
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .input-icon{
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }
  }
  .sidebar-logo {
    padding: 0 10px 30px 10px;
  }
}
@media only screen and (min-width: 992px) {
  .particles-js {
    background-image: url('../../assets/images/background.jpg');
  }
  .login-form {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 800px;
    border-radius: 6px;
    background: #ffffff;
    box-shadow: 0px 20px 40px 0px rgba(0,0,0,0.08);
    padding: 60px 60px 40px 60px;
    z-index: 999;
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .input-icon{
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }
  }
  .login-logo {
    margin: 10px 60px 10px 0px;
  }
  .sidebar-logo {
    padding: 0;
  }
}
@media only screen and (min-width: 1200px) {
  .particles-js {
    background-image: url('../../assets/images/background.jpg');
  }
  .login-form {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 800px;
    border-radius: 6px;
    background: #ffffff;
    box-shadow: 0px 20px 40px 0px rgba(0,0,0,0.08);
    padding: 60px 60px 40px 60px;
    z-index: 999;
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .input-icon{
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }
  }
  .login-logo {
    margin: 10px 60px 10px 0px;
  }
  .sidebar-logo {
    padding: 0;
  }
}
@media only screen and (min-width: 1920px) {
  .particles-js {
    background-image: url('../../assets/images/background.jpg');
  }
  .login-form {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 800px;
    border-radius: 6px;
    background: #ffffff;
    box-shadow: 0px 20px 40px 0px rgba(0,0,0,0.08);
    padding: 60px 60px 40px 60px;
    z-index: 999;
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .input-icon{
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }
  }
  .login-logo {
    margin: 10px 60px 10px 0px;
  }
  .sidebar-logo {
    padding: 0;
  }
}

</style>
