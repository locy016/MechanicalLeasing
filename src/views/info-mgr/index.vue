<template>
  <div class="info-mgr">
      <h1>信息管理</h1>
      <div class="w-50 m-auto">
          <div class="m-4 p-4">
            <el-form v-if="info" ref="info" :model="info" label-width="80px">
              <el-form-item label="公司名称">
                  <el-input v-model="info.unit_name"></el-input>
              </el-form-item>
              <el-form-item label="办公电话">
                  <el-input v-model="info.tel"></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                  <el-input v-model="info.phone"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" class="w-100" @click="onSubmit">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'info-mgr',
  data () {
    return {
      info: {}
    }
  },
  components: {
  },
  methods: {
    getInformation () {
      this.ipcRenderer.send('getInformation')
      this.ipcRenderer.once('getInformation', (event, res) => {
        console.log('getInformation', res)
        this.info = res
      })
    },
    onSubmit () {
      this.ipcRenderer.send('setInformation', this.info)
      this.ipcRenderer.once('setInformation', (event, res) => {
        console.log('setInformation', res)
      })
    }
  },
  mounted () {
    this.getInformation()
  }
}
</script>

<style>

</style>
