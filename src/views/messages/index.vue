<template>
  <div class="app-container">
    <div class="head-container">
      <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
        <el-row :gutter="10" class="mb8">
          <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
            <el-form-item class="data-form" prop="MessageLevel">
              <el-select v-model="queryParams.MessageLevel" clearable filterable placeholder="请选择消息级别">
                <el-option v-for="item in MessageLevel" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
            <el-form-item class="data-form" prop="MessageType">
              <el-select v-model="queryParams.MessageType" clearable filterable placeholder="请选择消息类型">
                <el-option v-for="item in MessageType" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
            <el-form-item class="data-form" prop="IsRead">
              <el-select v-model="queryParams.IsRead" clearable filterable placeholder="请选择消息状态">
                <el-option v-for="item in IsRead" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
            <el-form-item class="data-form" prop="MessageCustomTag">
              <el-select v-model="queryParams.MessageCustomTag" clearable filterable placeholder="请选择标签">
                <el-option v-for="item in MessageCustomTag" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :xs="24" :sm="16" :md="16" :lg="8" :xl="8">
            <el-form-item class="data-form" prop="CreateTime">
              <date-range-picker v-model="queryParams.CreateTime" />
            </el-form-item>
          </el-col> -->
          <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
            <el-form-item class="data-form" prop="MessageTitle">
              <el-input v-model="queryParams.MessageTitle" placeholder="请输入标题" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2">
            <el-button type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
          </el-col>
          <el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2">
            <el-button type="success" icon="el-icon-refresh" @click="resetQuery">重置</el-button>
          </el-col>
          <el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2">
            <el-button type="success" icon="el-icon-edit" :disabled="hasSetRead" @click="handleSetRead()">已读</el-button>
          </el-col>
          <el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2">
            <el-button type="danger" icon="el-icon-delete" :disabled="hasDelete" @click="handleDelete()">删除</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 表格数据 -->
    <el-table ref="multipleTable" v-loading="listLoading" :data="Messages" stripe border :header-cell-style="{background: theme, color: '#ffffff', opacity: 0.8}" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column label="类型" align="center" width="80px">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.MessageType === 0">通知</el-tag>
          <el-tag v-if="scope.row.MessageType === 1" type="danger">预警</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="80px">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.User.IsRead" type="success">已读</el-tag>
          <el-tag v-else type="danger">未读</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="级别" align="center" width="80px">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.MessageLevel === 0">普通</el-tag>
          <el-tag v-if="scope.row.MessageLevel === 1" type="warning">紧急</el-tag>
          <el-tag v-if="scope.row.MessageLevel === 2" type="danger">加急</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="标签" align="center" width="140px">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.MessageCustomTag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="280px">
        <template slot-scope="scope">
          <span v-if="scope.row.User.IsRead" class="authorization-true" />
          <span v-else class="authorization-false" />
          <span>{{ scope.row.MessageTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="MessageContext" label="内容" />
      <el-table-column prop="Created" label="创建日期" width="140px" />
    </el-table>
    <!--分页组件-->
    <pagination v-show="total>0" :total="total" :page.sync="queryParams.PageID" :limit.sync="queryParams.PageSize" @pagination="getList" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { request } from '@/utils/request'

export default {
  name: 'Messages',
  data() {
    return {
      // 显示搜索条件
      showSearch: true,
      // 加载中
      listLoading: true,
      // 总页数
      total: 0,
      // 查询参数
      queryParams: {
        PageID: 1,
        PageSize: 10,
        MessageLevel: '',
        MessageType: '',
        IsRead: ''
      },
      // 数据列表
      Messages: [],
      MessageLevel: [{
        name: '普通',
        value: 0
      }, {
        name: '紧急',
        value: 1
      }, {
        name: '加急',
        value: 2
      }],
      MessageType: [{
        name: '通知消息',
        value: 0
      }, {
        name: '预警消息',
        value: 1
      }],
      IsRead: [{
        name: '已读',
        value: 0
      }, {
        name: '未读',
        value: 1
      }],
      // 标签列表
      MessageCustomTag: [],
      // 是否有已读权限
      hasSetRead: true,
      // 是否有删除权限
      hasDelete: true
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
  created() {
    this.getList()
    this.getNotifyMessagesCustomTag()
  },
  methods: {
    getList() {
      this.listLoading = true
      if (this.queryParams.CreateTime instanceof Array) {
        this.queryParams.DateRanges = this.queryParams.CreateTime.join(',')
      } else {
        this.queryParams.DateRanges = ''
      }
      const data = {
        PageID: this.queryParams.PageID,
        PageSize: this.queryParams.PageSize,
        DateRanges: this.queryParams.DateRanges ? this.queryParams.DateRanges : '',
        MessageLevel: this.queryParams.MessageLevel === '' ? -1 : this.queryParams.MessageLevel,
        MessageType: this.queryParams.MessageType === '' ? -1 : this.queryParams.MessageType,
        IsRead: this.queryParams.IsRead === '' ? -1 : this.queryParams.IsRead,
        MessageCustomTag: this.queryParams.MessageCustomTag ? this.queryParams.MessageCustomTag : '',
        MessageTitle: this.queryParams.MessageTitle ? this.queryParams.MessageTitle : ''
      }
      this.$store.dispatch('Platform/NotifyMessagesListGet', data).then((response) => {
        this.Messages = response.Messages
        this.total = response.Totals
      }).finally(() => {
        this.listLoading = false
      })
    },
    getNotifyMessagesCustomTag() {
      const data = {}
      this.$store.dispatch('Platform/GetNotifyMessagesCustomTag', data).then((response) => {
        this.MessageCustomTag = response.CustomTag
      })
    },
    // 搜索
    handleQuery() {
      this.queryParams.PageID = 1
      this.getList()
    },
    // 重置
    resetQuery() {
      this.$refs['queryForm'].resetFields()
      this.handleQuery()
    },
    // 标记已读
    handleSetRead() {
      const adsArray = []
      this.$refs.multipleTable.selection.forEach(element => {
        adsArray.push(element.ID)
      })
      const MsgIDs = adsArray.join()
      this.$confirm(`标记已读, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const data = {
          MsgIDs: MsgIDs
        }
        request('API.Platform.NotifyMessagesSetRead', data).then(response => {
          this.getList()
          this.$message({
            type: 'success',
            message: '操作成功'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 删除信息
    handleDelete() {
      const adsArray = []
      this.$refs.multipleTable.selection.forEach(element => {
        adsArray.push(element.ID)
      })
      const MsgIDs = adsArray.join()
      this.$confirm(`删除消息, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const data = {
          MsgIDs: MsgIDs
        }
        request('API.Platform.NotifyMessagesDelete', data).then(response => {
          this.getList()
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          const data = {}
          this.$store.dispatch('Platform/NotifyMessagesStat', data)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 当选择项发生变化时会触发该事件
    handleSelectionChange(val) {
      if (this.$refs.multipleTable.selection.length > 0) {
        this.hasSetRead = false
        this.hasDelete = false
      } else {
        this.hasSetRead = true
        this.hasDelete = true
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.authorization-true {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #13ce66;
  margin: 0 8px;
}
.authorization-false {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ff4949;
  margin: 0 8px;
}
</style>
