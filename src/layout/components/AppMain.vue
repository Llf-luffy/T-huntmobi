<template>
  <section class="app-main">
    <!-- https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/tags-view.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9 -->
    <keep-alive :include="cachedViews">
      <router-view :key="key" />
    </keep-alive>
  </section>
</template>

<script>

export default {
  name: 'AppMain',
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  },
  methods: {
    onRefresh() {
      this.$store.dispatch('delAllCachedViews', this.$route)
      const { fullPath } = this.$route
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath
        })
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 100px);
  }

  .fixed-header+.app-main {
    padding-top: 4.25rem;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
