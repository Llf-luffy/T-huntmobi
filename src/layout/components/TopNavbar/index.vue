<template>
  <div class="top-navbar-container">
    <span>{{showHeader}}</span>
    <div v-if="showHeader">
      <div class="top-navbar">
        <router-link key="collapse" class="sidebar-logo-link" to="/">
          <img v-if="logo" :src="logo" class="sidebar-logo">
          <!-- <h1 v-else class="sidebar-title">{{ title }} </h1> -->
        </router-link>

        <!-- 当头部导航大于 1 个的时候才会显示 -->
        <div v-if="addRoutes.length > 1" class="nav">
          <template v-for="(item, index) in addRoutes">
            <!-- <div v-if="item.children && item.children.length !== 0" :key="index" :class="{ -->
            <div v-if="item.children" :key="index" :class="{
              'item': true,
              'active': index == headerActived
            }" @click="$store.commit('permission/switchHeaderActived', index)"
            >
              <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon" />
              <span v-if="item.meta.title">{{ item.meta.title }}</span>
            </div>
          </template>
        </div>

        <user-menu />
      </div>
    </div>


    <!-- <div v-if="!showHeader">
      <div class="main-sidebar-container">
        <img class="logo-icon" :src="logoIcon" alt="">
        <div class="nav">
          <template v-for="(item, index) in $store.state.menu.routes">
            <div v-if="item.children && item.children.length !== 0" :key="index" :class="{
              'item': true,
              'active': index == $store.state.menu.headerActived
            }" :title="item.meta.title"
            >
              <svg-icon v-if="item.meta.icon" :name="item.meta.icon" />
              <span>{{ item.meta.title }}</span>
            </div>
          </template>
        </div>
      </div>
    </div> -->
  </div>

</template>

<script>
import { mapGetters,mapState } from 'vuex'
import variables from '@/styles/variables.scss'
import UserMenu from '@/components/UserMenu'

export default {
  components: { UserMenu },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar',
      'headerActived',
      'addRoutes',
      'showHeader'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    theme() {
      return this.$store.state.settings.theme
    }
  },
  data(){
    return {
      title: 'Huntmobi',
      logo: require('../../../assets/xl_logo.png'),
      logoIcon: require('../../../assets/images/logo.png')
    }
  }
}
</script>

<style lang="scss" scoped>

.top-navbar-container {
  .top-navbar {
    width: 100%;
    height: 80px;
    position: fixed;
    background-color: rgb(48, 65, 86);;
    z-index: 2000;
    top: 0;
    display: flex;
    align-items: center;

    .sidebar-logo-link {
      height: 100%;
      margin-left: 1.5rem;
    }

    .sidebar-logo {
        height: 100%;
        vertical-align: middle;
        margin-right: 12px;
        padding: 4px 0;
    }

    .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }

    .nav {
      height: 100%;
      display: flex;
      margin-left: 1.5rem;
      align-self: flex-start;
      align-items: center;
      color: rgb(191, 203, 217);
      .item {
        margin: 0 10px;
        padding: 10px;
        border-radius: 10px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s;
        &.active,
        &:hover {
          background-color: rgb(99, 116, 158);
        }
        .svg-icon {
          font-size: 20px;
          & + span {
            margin-left: 5px;
          }
        }
      }
    }
  }

  .main-sidebar-container {
    width: 50px;
    background-color: rgb(48, 65, 86);
    color: #fff;
    .logo-icon {
      width: 100%;
      transition: 0.3s;
      background-color: rgb(48, 65, 86);
    }
    .nav {
      width: inherit;
      padding-top: 10px;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 60px;
        padding: 0 5px;
        cursor: pointer;
        transition: 0.3s;
        &.active,
        &:hover {
          background-color: rgb(48, 65, 86);
        }
        .svg-icon {
          margin: 0 auto;
          font-size: 20px;
        }
        span {
          text-align: center;
          font-size: 14px;
          // @include text-overflow;
        }
      }
    }
  }
}

</style>
