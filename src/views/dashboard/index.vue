<template>
  <div>
    <div v-if="user.isDashboard" class="app-container">
      <div class="statistics today">
        <div class="header">
          <span>昨日营收</span>
        </div>
        <div class="content">
          <div class="total">
            <span class="title">总收入:</span>
            <span class="money" :style="{'color': theme}">{{ data.ReceivableAndPayableData.TodayTotalMoneys ||0 }}</span>
          </div>
          <div class="total">
            <span class="title">广告主收入:</span>
            <span class="money" :style="{'color': theme}">{{ data.ReceivableAndPayableData.PayMediaMoneys||0 }}</span>
          </div>
          <div class="total">
            <span class="title">媒体收入:</span>
            <span class="money" :style="{'color': theme}">{{ data.ReceivableAndPayableData.MediaReturnMoneys||0 }}</span>
          </div>
          <div class="total">
            <span class="title">总利润:</span>
            <span class="money" :style="{'color': theme}">{{ data.ReceivableAndPayableData.ProfitMoneys ||0 }}</span>
          </div>
          <div class="total">
            <span class="title">利润率:</span>
            <span class="money" :style="{'color': theme}">{{ data.ReceivableAndPayableData.ProfitRate||0 }}%</span>
          </div>
        </div>
      </div>
      <div class="card-panel-main">
        <el-tabs v-model="activeNamePanel" type="card" @tab-click="getResult">
          <el-tab-pane v-for="(item, i) in ReportResults" :key="i" :label="item.name" :name="i.toString()">
            <div v-for="(element, ele) in item.Result" :key="ele" class="card-panel">
              <div class="card-panel-content">
                <div class="card-header">
                  <span>{{ element.CurrentInfo }}</span>
                  <el-tooltip class="tooltip" effect="dark" :content="element.ReportTitle" placement="top">
                    <i class="el-icon-info" />
                  </el-tooltip>
                </div>
                <div class="card-body">
                  <div class="card-item">
                    <count-to :start-val="0" :end-val="element.CurrentData" :duration="540" class="card-panel-num" :style="{'color': theme}" />
                    <div class="card-compare">
                      <span class="card-compare-text">{{ element.LastCycleInfo }}</span>
                      <div class="card-compare-num" :class="element.LastCycleDifferenceData > 0 ? 'increase' : 'lower'">
                        <span>
                          <i v-if="element.LastCycleDifferenceData === 0" class="el-icon-d-caret" />
                          <i v-else-if="element.LastCycleDifferenceData > 0" class="el-icon-caret-top" />
                          <i v-else class="el-icon-caret-bottom" />
                          <count-to :start-val="0" :end-val="element.LastCycleDifferenceData" :duration="540" />
                        </span>
                        <span>
                          <i class="el-icon-s-data" :style="{'color': theme}" />
                          <span :style="{'color': theme}">{{ element.LastCycleData }}</span>
                        </span>
                      </div>
                    </div>
                    <div class="card-compare">
                      <span class="card-compare-text">{{ element.CorrespondingPeriodInfo }}</span>
                      <div class="card-compare-num" :class="element.LastCycleComparisonData > 0 ? 'increase' : 'lower'">
                        <span>
                          <i v-if="element.LastCycleComparisonData === 0" class="el-icon-d-caret" />
                          <i v-else-if="element.LastCycleComparisonData > 0" class="el-icon-caret-top" />
                          <i v-else class="el-icon-caret-bottom" />
                          <count-to :start-val="0" :end-val="element.LastCycleComparisonData" :duration="540" :decimals="2" />
                          <span>%</span>
                        </span>
                        <span>
                          <i class="el-icon-s-data" :style="{'color': theme}" />
                          <span :style="{'color': theme}">{{ element.CorrespondingPeriodData }}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="statistics">
        <el-tabs v-model="activeNameStatistics" type="card" @tab-click="getMainPageAnalysis">
          <el-tab-pane label="年度消耗" name="first">
            <div class="statistics-content">
              <div class="statistics-item">
                <div class="statistics-item-content">
                  <div class="statistics-title">年度消耗</div>
                  <div class="statistics-data" :style="{'color': theme}">{{ data.StatisticsOfYear.ConsumptionMoneys }}</div>
                </div>
              </div>
              <div class="statistics-item">
                <div class="statistics-item-content">
                  <div class="statistics-title">年度服务费</div>
                  <div class="statistics-data" :style="{'color': theme}">{{ data.StatisticsOfYear.ServiceMoneys }}</div>
                </div>
              </div>
              <div class="statistics-item">
                <div class="statistics-item-content">
                  <div class="statistics-title">年度媒体返点金额</div>
                  <div class="statistics-data" :style="{'color': theme}">{{ data.StatisticsOfYear.MediaReturnMoneys }}</div>
                </div>
              </div>
              <div class="statistics-item">
                <div class="statistics-item-content">
                  <div class="statistics-title">年度广告主返点金额</div>
                  <div class="statistics-data" :style="{'color': theme}">{{ data.StatisticsOfYear.AdvertisersReturnMoneys }}</div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="帐期数据" name="second">
            <div class="statistics-content">
              <div class="statistics-item">
                <div class="statistics-item-content">
                  <div class="statistics-title">帐期内应收款客户数</div>
                  <div class="statistics-data" :style="{'color': theme}">{{ data.ReceivableAndPayableData.WithinPaybleCustomerCount }}</div>
                </div>
              </div>
              <div class="statistics-item">
                <div class="statistics-item-content">
                  <div class="statistics-title">帐期内应收款金额</div>
                  <div class="statistics-data" :style="{'color': theme}">{{ data.ReceivableAndPayableData.WithinPaybleCustomerMoneys }}</div>
                </div>
              </div>
              <div class="statistics-item">
                <div class="statistics-item-content">
                  <div class="statistics-title">帐期外应收款客户数</div>
                  <div class="statistics-data" :style="{'color': theme}">{{ data.ReceivableAndPayableData.OutPaybleCustomerCount }}</div>
                </div>
              </div>
              <div class="statistics-item">
                <div class="statistics-item-content">
                  <div class="statistics-title">帐期外应收款金额</div>
                  <div class="statistics-data" :style="{'color': theme}">{{ data.ReceivableAndPayableData.OutPaybleCustomerMoneys }}</div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="帐单数据" name="third">
            <div class="statistics-content">
              <div class="statistics-item">
                <div class="statistics-item-content">
                  <div class="statistics-title">已出帐单应收款客户数</div>
                  <div class="statistics-data" :style="{'color': theme}">{{ data.ReceivableAndPayableData.TotalBillIssuedCustomers }}</div>
                </div>
              </div>
              <div class="statistics-item">
                <div class="statistics-item-content">
                  <div class="statistics-title">已出帐单应收款金额</div>
                  <div class="statistics-data" :style="{'color': theme}">{{ data.ReceivableAndPayableData.TotalBillIssuedMoneys }}</div>
                </div>
              </div>
              <div class="statistics-item">
                <div class="statistics-item-content">
                  <div class="statistics-title">未出帐单应收款客户数</div>
                  <div class="statistics-data" :style="{'color': theme}">{{ data.ReceivableAndPayableData.TotalOutstandingBillCoustmers }}</div>
                </div>
              </div>
              <div class="statistics-item">
                <div class="statistics-item-content">
                  <div class="statistics-title">未出帐单应收款金额</div>
                  <div class="statistics-data" :style="{'color': theme}">{{ data.ReceivableAndPayableData.TotalOutstandingBillMoneys }}</div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-row :gutter="12">
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <!-- 期间饼图 -->
          <!-- <ChartsPie :report="reportPie" /> -->
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <!-- 分媒体（分类）消耗近12个月增长趋势图（独占一行） -->
          <!-- <ChartsLine :report="reportLine" /> -->
        </el-col>
      </el-row>
    </div>
    <div v-else class="Welcome">
      <img :src="logo" class="logo">
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
// import ChartsPie from '@/components/Charts/Pie'
// import ChartsLine from '@/components/Charts/Line'
import { request } from '@/utils/request'
import { Base64 } from 'js-base64'
import { mapState, mapGetters } from 'vuex'

export default {
  name:"Dashboard",
  components: {
    CountTo,
    // ChartsPie,
    // ChartsLine
  },
  data() {
    return {
      // 对比数据
      ReportResults: [],
      // 数据报表
      data: {
        StatisticsOfYear: {
          AdvertisersReturnMoneys: '',
          ConsumptionMoneys: '',
          MediaReturnMoneys: '',
          ServiceMoneys: ''
        },
        ReceivableAndPayableData: {
          OutPaybleCustomerCount: '',
          OutPaybleCustomerMoneys: '',
          TotalBillIssuedCustomers: '',
          TotalBillIssuedMoneys: '',
          TotalOutstandingBillCoustmers: '',
          TotalOutstandingBillMoneys: '',
          WithinPaybleCustomerCount: '',
          WithinPaybleCustomerMoneys: ''
        }
      },
      reportPie: '02120bfd-2f16-4364-b12b-745a0b982d04,644249ea-51cb-4885-b99b-4b70fade60f2,8d68e938-a11a-4ddf-a7b9-21a6fd01a90d,62ba54a8-13ee-4c61-a3a7-04b36efb0671,c62e8e5e-514f-431f-8de0-de88df1a4e1d,41d4b06b-f938-4deb-97b7-90a3ec1a2eac,3b934081-cfdb-4aab-868b-368cccef5971',
      reportLine: 'e0886c5e-3e7a-4dc6-bcca-99439e4ec2f2,983ecb28-be8d-4acb-9f13-dd783ed21380,3036445f-e101-4f3b-84ae-8cbfdbd372e8,732151cd-f12b-44a5-93e4-9cb4226ba6c7',
      activeNamePanel: '0',
      activeNameStatistics: 'first',
      logo: require('../../assets/xl_logo.png')
    }
  },
  computed: {
    ...mapState({
      device: state => state.app.device
    }),
    ...mapGetters([
      'user'
    ]),
    theme() {
      return this.$store.state.settings.theme
    }
  },
  mounted() {
    this.getResult()
    this.getMainPageAnalysis()
  },
  methods: {
    // 获取对比数据
    getResult() {
      let ReportsJsonArray = [{ 'ReportID': '598551b1-6e2e-438e-a11b-5a2f5e6da9df' }, { 'ReportID': '33637cae-7cb3-4df4-ac77-0a7d10160b6f' }, { 'ReportID': '9b91f9b2-8a89-4d0f-aca1-36e9e05000ae' }]
      ReportsJsonArray = JSON.stringify(ReportsJsonArray)
      const data = {
        ReportsJsonArray: ReportsJsonArray
      }
      request('API.Analysis.RetportsListGet', data).then(response => {
        const ReportResults = response.ReportResults
        ReportResults.forEach(item => {
          item.Result = Base64.decode(item.ReportBase64JsonResult)
          item.Result = JSON.parse(item.Result)
        })
        ReportResults[0].name = '消耗数'
        ReportResults[1].name = '在投客户数'
        ReportResults[2].name = '在投账户数'
        this.ReportResults = ReportResults
        console.log(this.ReportResults)
      })
    },
    // 获取数据报表
    getMainPageAnalysis() {
      const data = {}
      request('API.Analysis.MainPageAnalysis', data).then(response => {
        this.data = response
      })
    }
  }
}
</script>

<style lang="scss">
.card-panel-main {
  position: relative;
  .el-tabs__header {
    padding: 0;
    margin: 0;
  }
}
.statistics {
  .el-tabs__header {
    padding: 0;
    margin: 0;
  }
}
</style>

<style lang="scss" scoped>
.app-container {
  background-color: #f5f7f9;
}
.today {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  .content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .header {
    width: 100px;
    font-size: 18px;
    color: #696969;
  }
}
.total {
  padding: 0 10px;
  border-left: 0.0625rem solid #e8e8e8;
  .title {
    font-size: 18px;
    color: #696969;
    vertical-align: middle;
  }
  .money {
    font-size: 28px;
    vertical-align: middle;
    padding: 0 8px;
  }
}
.Welcome {
  text-align: center;
  margin: 200px 0 0 0;
  img {
    width: 30%;
  }
}
</style>
