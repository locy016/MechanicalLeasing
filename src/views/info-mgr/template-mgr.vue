<template>
  <div class="template-mgr">
      <h1>模板管理</h1>
      <div class="m-4">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-button type="primary" class="w-100" @click="importTemplate">导入安拆告知书（模板文件）</el-button>
            </div>
            <div class="text item">
                <el-table :data="tableData" style="width: 100%" class="text-left">
                    <el-table-column
                        prop="Field"
                        label="录入内容">
                    </el-table-column>
                    <el-table-column
                        prop="value"
                        label="模板对应字段名">
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="130">
                        <template slot-scope="scope">
                        <el-button type="text" size="small" @click="onCopy(scope.row.value)">复制字段名</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        Field: '公司名称',
        value: '{UnitName}'
      },
      {
        Field: '服务电话',
        value: '{Tel}'
      },
      {
        Field: '移动电话',
        value: '{Phone}'
      },
      {
        Field: '设备名称',
        value: '{DeviceName}'
      },
      {
        Field: '设备型号（规格型号）',
        value: '{DeviceModel}'
      },
      {
        Field: '设备编号',
        value: '{DeviceNumber}'
      },
      {
        Field: '备案编号（设备的登记编号）',
        value: '{RecordNumber}'
      },
      {
        Field: '生产单位',
        value: '{ProductionUnit}'
      },
      {
        Field: '产权单位',
        value: '{PropertyUnit}'
      },
      {
        Field: '流 水 号',
        value: '{SerialNumber}'
      },
      {
        Field: '项目名称（工程名称）',
        value: '{ProjectName}'
      },
      {
        Field: '项目地址（工程地址）',
        value: '{ProjectAddress}'
      },
      {
        Field: '使用单位',
        value: '{UserUnit}'
      },
      {
        Field: '安装日期',
        value: '{InstallDate}'
      },
      {
        Field: '安 全 员',
        value: '{SafetyOfficer}'
      },
      {
        Field: '项目日期',
        value: '{ProjectDate}'
      }]
    }
  },
  methods: {
    importTemplate () {
      this.ipcRenderer.send('imptDocx')
      this.ipcRenderer.once('imptDocx', (event, res) => {
        console.log('imptDocx', res)
        this.$notify({
          title: '提示',
          message: res.msg,
          duration: 1000
        })
      })
    },
    onCopy (text) {
      this.$copyText(text).then(() => {
        this.$message.success({ message: '已复制到剪切板。' })
      }).catch(() => {
        this.$message.error({ message: '复制失败。' })
      })
    }
  }
}
</script>

<style>

</style>
