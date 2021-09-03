<template>
  <div class="noti-mgr">
      <h1>项目管理</h1>
      <el-button class="w-100" @click="creaProj">新建项目</el-button>
      <div class="w-100">
        <div class="m-4">
          <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                  prop="serial_number"
                  label="流水号"
                  width="160">
              </el-table-column>
              <el-table-column
                  label="项目名称">
                  <template slot-scope="scope">
                    <span>{{ scope.row.project_name }}</span>
                  </template>
              </el-table-column>
              <!-- <el-table-column
                  prop="project_address"
                  label="项目地址">
              </el-table-column> -->
              <el-table-column
                  prop="user_unit"
                  label="使用单位">
              </el-table-column>
              <el-table-column
                  prop="safety_officer"
                  label="安全员"
                  width="140">
              </el-table-column>
              <el-table-column
                  label="安装日期"
                  width="170">
                  <template slot-scope="scope">
                    <span>{{ formatData(scope.row.install_date) }}</span>
                  </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="130">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="outDocx(scope.row.serial_number)">安拆告知书下载</el-button>
                </template>
              </el-table-column>
          </el-table>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'noti-mgr',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    init () {
      this.getNotices()
    },
    getNotices () {
      this.ipcRenderer.send('getNotices')
      this.ipcRenderer.once('getNotices', (event, res) => {
        console.log('getNotices', res)
        this.tableData = res
      })
    },
    creaProj () {
      this.$router.push('/new-noti')
    },
    formatData (data) {
      var currDate = new Date(data)
      var year = currDate.getFullYear()
      var month = ((currDate.getMonth() + 1).toString().length > 1) ? currDate.getMonth() + 1 : '0' + (currDate.getMonth() + 1)
      var day = (currDate.getDate().toString().length > 1) ? currDate.getDate() : '0' + currDate.getDate()
      return year + '年' + month + '月' + day + '日'
    },
    outDocx (SerialNumber) {
      this.ipcRenderer.send('outDocx', SerialNumber)
    }
  },
  created () {
    this.init()
  }
}
</script>

<style>

</style>
