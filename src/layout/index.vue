<template>
  <div :class="classObj" class="app-wrapper">
    <!--  -->
    <div :class="{'show-top-navbar': showHeader}">
      <top-navbar />
      <div v-show="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
      <sidebar class="sidebar-container" />
      <div :class="{hasTagsView:needTagsView}" class="main-container">
        <div class="fixed-header-border" :class="{'fixed-header':fixedHeader}">
          <navbar />
          <tags-view v-if="needTagsView" />
        </div>
        <app-main />
        <right-panel v-if="showSettings">
          <settings />
        </right-panel>
      </div>
    </div>

    <el-button v-if="device!=='mobile'" icon="el-icon-arrow-left" circle class="is-circle" @click="toggleSideBar" />
    <!--  防止刷新后主题丢失  -->
    <Theme v-show="false" ref="theme" />
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView, TopNavbar} from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import Theme from '@/components/ThemePicker'
import { getCookies } from '@/utils/auth'
export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
    Theme,
    TopNavbar
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader,
      showHeader: state => state.settings.showHeader,
      addRoutes: state => state.permission.addRoutes,
      headerActived: state => state.permission.headerActived,
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted() {
    if (getCookies('theme')) {
      this.$refs.theme.theme = getCookies('theme')
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: getCookies('theme')
      })
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/mixin.scss";
  @import "~@/assets/styles/variables.scss";
  @import "~@/assets/styles/header.scss";

  header {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: $g-header-height;
  background-color: $g-header-bg;
  color: $g-header-menu-color;
  .header-container {
    width: $g-header-width;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .main {
      display: flex;
      align-items: center;
    }
  }
  @media screen and (max-width: $g-header-width) {
    .header-container {
      width: 100%;
    }
  }
  ::v-deep .title {
    position: relative;
    width: inherit;
    height: inherit;
    padding: inherit;
    background-color: inherit;
    .logo {
      width: 50px;
      height: 50px;
    }
    span {
      font-size: 24px;
      letter-spacing: 1px;
    }
  }
  .nav {
    display: flex;
    margin-left: 50px;
    .item {
      margin: 0 10px;
      padding: 10px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s;
      &.active,
      &:hover {
        background-color: $g-header-menu-active-bg;
      }
      .svg-icon {
        font-size: 20px;
        & + span {
          margin-left: 5px;
        }
      }
    }
  }
  ::v-deep .user {
    padding: 0;
    .user-container {
      color: #fff;
      font-size: 16px;
    }
  }
}

  .main-container {
    background-color: #ffffff;
  }

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
    background-color: #fff;
    padding: 0;
  }

  .fixed-header-border {
    border-bottom: 1px solid #d8dce5;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .data-select {
    width: 100%;
    input {
      height: 32px;
      line-height: 32px;
    }
  }

  .mobile .fixed-header {
    width: 100%;
  }

  .is-circle {
    position: fixed;
    left: 194px;
    top: 50%;
    z-index: 1002;
  }
  .hideSidebar .is-circle {
    left: 40px;
    transform: rotate(180deg);
    transition: all 0.2s linear;
  }

  .show-top-navbar {
    .fixed-header {
      top: 80px;
    }

    .sidebar-container {
      top: 80px !important;
    }

    .app-main {
      padding-top: 9.25rem !important;
    }

    
  }
</style>
