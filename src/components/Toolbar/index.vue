<template>
  <div class="top-right-btn">
    <el-row>
      <el-button-group class="crud-opts-right">
        <el-tooltip class="item" effect="dark" :content="show ? '隐藏搜索' : '显示搜索'" placement="top">
          <el-button
            icon="el-icon-search"
            @click="toggleSearch()"
          />
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="筛选" placement="top">
          <el-popover
            placement="bottom-end"
            width="150"
            trigger="click"
          >
            <el-button
              slot="reference"
              icon="el-icon-s-grid"
            >
              <i
                class="fa fa-caret-down"
                aria-hidden="true"
              />
            </el-button>
            <el-checkbox
              v-model="allColumnsSelected"
              :indeterminate="allColumnsSelectedIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <el-checkbox
              v-for="item in tableColumns"
              :key="item.property"
              v-model="item.visible"
              @change="handleCheckedTableColumnsChange(item)"
            >
              {{ item.label }}
            </el-checkbox>
          </el-popover>
        </el-tooltip>
      </el-button-group>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'Toolbar',
  props: {
    show: {
      type: Boolean,
      default: true
    },
    tableColumns: {
      type: Array,
      default: () => { return [] }
    }
  },
  data() {
    return {
      allColumnsSelectedIndeterminate: false,
      allColumnsSelected: true
    }
  },
  methods: {
    // 初始化
    init() {
      this.$nextTick(() => {
        console.log('初始化', this.tableColumns)
        this.tableColumns.forEach(column => {
          if (!column.visible) {
            this.updateColumnVisible(column)
          }
        })
      })
    },
    // 搜索
    toggleSearch() {
      this.$emit('update:showSearch', !this.show)
    },
    // 全选
    handleCheckAllChange(val) {
      if (val === false) {
        this.allColumnsSelected = true
        return
      }
      console.log('this.tableColumns', this.tableColumns)
      this.tableColumns.forEach(column => {
        if (!column.visible) {
          column.visible = true
          this.updateColumnVisible(column)
        }
      })
    },
    handleCheckedTableColumnsChange(item) {
      this.updateColumnVisible(item)
    },
    updateColumnVisible(item) {
      const table = this.$parent.$refs['table']
      const vm = table.$children.find(e => e.prop === item.property)
      const columnConfig = vm.columnConfig
      console.log('table', table, vm)
      if (item.visible) {
        // 找出合适的插入点
        const columnIndex = this.tableColumns.indexOf(item)
        vm.owner.store.commit('insertColumn', columnConfig, columnIndex, null)
      } else {
        // 移除选中的点
        vm.owner.store.commit('removeColumn', columnConfig, null)
      }
      this.$parent.setCookiesItem(this.tableColumns)
    }
  }
}
</script>

<style lang="scss" scoped>
.crud-opts-right {
  display: flex;
}
</style>
