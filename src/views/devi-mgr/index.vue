<template>
  <div class="devi-mgr">
    <h1>设备管理</h1>

    <div class="w-100">
      <div class="m-4">
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="device_name"
                label="设备名称">
            </el-table-column>
            <el-table-column
                prop="device_model"
                label="设备型号（规格型号）"
                width="160">
            </el-table-column>
            <el-table-column
                prop="device_number"
                label="设备编号">
            </el-table-column>
            <el-table-column
                prop="record_number"
                label="备案编号（登记编号）">
            </el-table-column>
            <el-table-column
                prop="production_unit"
                label="生产单位"
                width="220">
            </el-table-column>
            <el-table-column
                prop="property_unit"
                label="产权单位"
                width="220">
            </el-table-column>
            <!-- <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template>
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-table-column> -->
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'devi-mgr',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    init () {
      this.getDevices()
    },
    getDevices () {
      this.ipcRenderer.send('getDevices')
      this.ipcRenderer.once('getDevices', (event, res) => {
        console.log('getDevices', res)
        this.tableData = res
      })
    }
  },
  created () {
    this.init()
  },
  beforeDestroy () {}
}
</script>
