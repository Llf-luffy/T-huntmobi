<template>
  <div class="app-container">
    <div class="head-container">
      <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
        <el-row :gutter="10" class="mb8">
          <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
            <el-form-item class="data-form" prop="DocumentTypeID">
              <el-select v-model="queryParams.DocumentTypeID" clearable filterable placeholder="请选择文档分类">
                <el-option v-for="item in DocumentsTypes" :key="item.ID" :label="item.DocumentTypeTitle" :value="item.ID" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
            <el-form-item class="data-form" prop="AttachmentsFileName">
              <el-input v-model="queryParams.AttachmentsFileName" placeholder="请输入文档名称" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2">
            <el-button type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
          </el-col>
          <el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2">
            <el-button type="success" icon="el-icon-refresh" @click="resetQuery">重置</el-button>
          </el-col>
          <el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2">
            <el-button type="primary" icon="el-icon-upload" @click="handleUpload">上传</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 表格数据 -->
    <el-table v-loading="listLoading" :data="Documents" stripe border>
      <el-table-column label="文件名称">
        <template slot-scope="scope">
          <el-link type="primary" :underline="true" @click.native.prevent="getDownload(scope.$index, scope.row)">
            <svg-icon v-if="scope.row.Image" icon-class="pic" />
            <svg-icon v-else icon-class="documentation" />
            {{ scope.row.Attachments.AttachmentsFileName }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="DocumentType.DocumentTypeTitle" label="文档类别名称" />
      <el-table-column prop="User.UserRealname" label="上传用户" />
      <el-table-column prop="Attachments.Downloads" label="下载次数" width="80px" />
      <el-table-column label="操作" width="160" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" />
          <el-button type="danger" icon="el-icon-delete" style="margin-left: 10px;" @click="handleDelete(scope.$index, scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 图片预览组件 -->
    <!-- <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="[url]" /> -->
    <!--分页组件-->
    <pagination v-show="total>0" :total="total" :page.sync="queryParams.PageID" :limit.sync="queryParams.PageSize" @pagination="getList" />
    <!-- 新增角色 -->
    <el-dialog v-dialogDrag :title="dialogTitle" :visible.sync="dialogVisible" :width="device==='mobile'?'100%':'50%'" :before-close="cancelDialog">
      <el-form ref="from" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="文档分类" prop="DocumentTypeID">
          <el-select v-model="form.DocumentTypeID" clearable filterable placeholder="请选择文档分类">
            <el-option v-for="item in DocumentsTypes" :key="item.ID" :label="item.DocumentTypeTitle" :value="item.ID" />
          </el-select>
        </el-form-item>
        <!--   上传文件   -->
        <el-form-item label="上传">
          <el-upload
            ref="upload"
            multiple
            action
            drag
            :limit="limit"
            :on-exceed="uploadLimit"
            :http-request="uploadFileHttp"
            :file-list="fileList"
            :auto-upload="false"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :on-change="uploadChange"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div slot="tip" class="el-upload__tip">可上传任意格式文件，且不超过100M</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="confirmDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import { request, uploadFile } from '@/utils/request'
import { mapState } from 'vuex'
import { isImage } from '@/utils/validate'

export default {
  name: 'ShareDocumentation',
  // components: { ElImageViewer },
  data() {
    return {
      // 显示搜索条件
      showSearch: true,
      // 新增Dialog 对话框
      dialogVisible: false,
      // 新增Dialog 对话框标题
      dialogTitle: '',
      // 加载中
      listLoading: true,
      // 总页数
      total: 0,
      // 查询参数
      queryParams: {
        PageID: 1,
        PageSize: 10,
        DocumentTypeID: undefined,
        AttachmentsFileName: ''
      },
      // 数据列表
      Documents: [],
      // 共享文档分类列表
      DocumentsTypes: [],
      // 表单
      form: {},
      // 菜单规则
      rules: {
        DocumentTypeID: [{ required: true, trigger: 'blur', message: '请选择文档分类！' }]
      },
      // 最大允许上传个数
      limit: 1,
      // 上传的文件
      fileList: [],
      // 上传文件主要参数
      param: {},
      // 显示查看器
      showViewer: false,
      // 查看器url
      url: ''
    }
  },
  computed: {
    ...mapState({
      device: state => state.app.device,
      headerActived: state => state.permission.headerActived,
    })
  },
  created() {
    this.getList()
    this.getDocumentsTypesList()
  },
  methods: {
    // 获取列表
    getList() {
      this.listLoading = true
      const data = {
        DocumentTypeID: this.queryParams.DocumentTypeID ? this.queryParams.DocumentTypeID : 0,
        AttachmentsFileName: this.queryParams.AttachmentsFileName,
        PageID: this.queryParams.PageID,
        PageSize: this.queryParams.PageSize
      }
      request('API.Documents.DocumentsListGet', data).then(response => {
        this.Documents = response.Documents
        this.Documents.forEach(element => {
          if (isImage(element.Attachments.AttachmentsExtends)) {
            element.Image = true
          } else {
            element.Image = false
          }
        })
        this.total = response.Totals
      }).finally(() => {
        this.listLoading = false
      })
    },
    // 获取共享文档分类列表
    getDocumentsTypesList() {
      return new Promise((resolve, reject) => {
        const data = {}
        request('API.Documents.DocumentsTypesListGet', data).then(response => {
          this.DocumentsTypes = response.DocumentsTypes
          resolve(response)
        })
      })
    },
    // 表单重置
    reset() {
      this.form = {
        DocumentID: 0
      }
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
    // 上传
    handleUpload() {
      this.dialogVisible = true
      this.dialogTitle = '文件上传'
      // this.$refs['upload'].clearFiles()
      this.reset()
    },
    // 编辑
    handleEdit(val, row) {
      this.dialogVisible = true
      this.dialogTitle = '编辑共享文档'
      this.form = row
      this.form.DocumentID = row.DocumentID
      this.fileList = []
    },
    // 删除
    handleDelete(val, row) {
      this.$confirm(`确定删除“${row.Attachments.AttachmentsFileName}”吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          DocumentID: row.DocumentID
        }
        request('API.Documents.DocumentsDelete', data).then(response => {
          this.getList()
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 取消
    cancelDialog() {
      this.dialogVisible = false
      this.$refs['from'].resetFields()
    },
    // 确定
    confirmDialog() {
      this.$refs['from'].validate(valid => {
        if (valid) {
          if (this.fileList.length > 0) {
            this.submitUpload()
          } else {
            this.$message.warning('文件为空，请上传')
          }
        } else {
          return false
        }
      })
    },
    // 下载文件
    getDownload(val, row) {
      const data = {
        DocumentID: row.DocumentID
      }
      request('API.Documents.DocumentsDownloadUrlGet', data).then(response => {
        if (isImage(row.Attachments.AttachmentsExtends)) {
          this.showViewer = true
          this.url = response.DownloadUrl
        } else {
          if (window.location.protocol === 'https:') {
            window.open(response.DownloadUrl.replace('http://', 'https://'), '_blank')
          } else {
            window.open(response.DownloadUrl.replace('https://', 'http://'), '_blank')
          }
        }
        this.getList()
      })
    },
    // 关闭查看器
    closeViewer() {
      this.showViewer = false
    },
    // 覆盖默认的上传行为
    uploadFileHttp(params) {},
    // 上传到服务器
    submitUpload() {
      if (this.param instanceof FormData) {
        const DocumentTypeID = this.form.DocumentTypeID
        const AttachmentsType = 0
        const UnionDataID = 0
        const DocumentID = this.form.DocumentID ? this.form.DocumentID : 0
        const data = {
          DocumentTypeID: DocumentTypeID,
          AttachmentsType: AttachmentsType,
          UnionDataID: UnionDataID,
          DocumentID: DocumentID
        }
        uploadFile('API.Documents.DocumentsUpload', data, this.param).then(response => {
          this.getList()
          this.dialogVisible = false
          this.$message({
            message: '上传成功！',
            type: 'success'
          })
        })
      } else {
        console.log(this.param instanceof FormData)
        this.$message.warning('文件类型错误，请检查')
      }
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeUpload(file) {
      let isLt2M = true
      isLt2M = file.size / 1024 / 1024 < 100
      if (!isLt2M) {
        this.loading = false
        this.$message.error('上传文件大小不能超过 100MB!')
      }
      this.form.name = file.name
      return isLt2M
    },
    // 监听上传成功
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList)
    },
    // 监听上传失败
    handleError(e, file, fileList) {
      console.log(e, file, fileList)
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      this.$message.warning(`已移除文件:  ${file.name}!`)
      // 每移除一个文件,param重新赋值
      this.param = new FormData()
      this.fileList = [...fileList]
      this.fileList.forEach((item, i) => {
        this.param.append(`file${i}`, item.raw) // 把单个或多个文件重命名，存储起来（给后台）
      })
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    uploadChange(file, fileList) {
      this.param = new FormData()
      this.fileList = [...fileList]
      console.log(fileList)
      this.fileList.forEach((item, i) => {
        this.param.append(`file${i}`, item.raw) // 把单个或多个文件重命名，存储起来（给后台）
      })
    },
    // 超出上传个数时调用
    uploadLimit(files, fileList) {
      this.$message.error(`最多允许同时上传${this.limit}个文件!`)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
