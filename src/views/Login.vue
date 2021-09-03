<template>
  <div>
    <div class="icon">
      <img src="@/assets/logo.png" width="120px" />
    </div>
    <div class="login-box">
      <div>
        <el-input
          type="text"
          class="mt-2"
          placeholder="请输入登录ID."
          v-model="id"/>
        <el-input
          type="password"
          class="mt-2"
          placeholder="请输入登录密钥."
          v-model="password"/>
      </div>
      <div>
        <el-alert
          title="验证未启用，随机输入内容后登录即可确认。"
          class="mt-4"
          type="info">
        </el-alert>
      </div>
      <div>
        <el-button type="primary" class="w-100 mt-2" v-on:click="onSubmit('loginForm')">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      id: null,
      password: null
    }
  },
  methods: {
    onSubmit (formName) {
      // 验证功能
      if (this.id && this.password) {
        // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
        this.$router.push('/home')
        /* if (this.password === '.') {
          this.$router.push('/home')
        } else {
          this.$message.error('登录密钥验证失败.')
        } */
      } else {
        this.$message.error('登录ID和密钥不能为空。')
        return false
      }
    }
  }
}
</script>

<style scoped>
.icon {
  margin: 70px auto 0 auto;
}

.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 70px auto;
  padding: 15px 15px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>
