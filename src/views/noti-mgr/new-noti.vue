<template>
  <div class="m-4">
      <h1>新建项目</h1>
      <div class="m-auto w-50 text-left">
          <el-form ref="form" :model="form" label-width="170px">
            <el-form-item label="流 水 号">
                <el-input v-model="form.serial_number" placeholder="业务流水号，累计到客户账目里，方便查账"></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
                <el-input v-model="form.project_name" placeholder="项目名称（工程名称）信息"></el-input>
            </el-form-item>
            <el-form-item label="项目地址">
                <el-input v-model="form.project_address" placeholder="项目地址（工程地址）信息"></el-input>
            </el-form-item>
            <el-form-item label="使用单位">
                <el-input v-model="form.user_unit" placeholder="使用单位信息"></el-input>
            </el-form-item>
            <el-form-item label="安装日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.install_date" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="安 全 员">
                <el-input v-model="form.safety_officer" placeholder="安全员姓名"></el-input>
            </el-form-item>
            <el-form-item label="项目日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.project_date" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
export default {
  name: 'new-proj',
  data () {
    return {
      form: {}
    }
  },
  methods: {
    onSubmit () {
      this.ipcRenderer.send('setNotices', this.form)
      this.ipcRenderer.once('setNotices', (event, res) => {
        console.log('setNotices', res)
      })
    }
  }
}
</script>

<style>

</style>
