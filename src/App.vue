<template>
  <div id="app">
    <template v-if="$route.meta.topShow">
      <header>
        <el-menu
          :router="true"
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
        >
          <el-menu-item index="/home">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">信息维护</template>
            <el-menu-item index="/info-mgr">信息管理</el-menu-item>
            <el-menu-item index="/template-mgr">模板管理</el-menu-item>
          </el-submenu>
          <el-menu-item index="/devi-mgr">设备管理</el-menu-item>
          <!-- <el-menu-item index="/cust-mgr">客户管理</el-menu-item> -->
          <el-menu-item index="/noti-mgr"><b>项目管理</b></el-menu-item>
          <el-submenu index="5">
            <template slot="title">帮助</template>
            <el-menu-item index="/about">关于</el-menu-item>
            <el-menu-item index="/">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </header>
    </template>
    <template>
      <div class="main">
        <router-view />
      </div>
    </template>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      activeIndex: '1'
    }
  },
  components: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}

.header {
  position: fixed;
  height: 5%;
  width: 100%;
  overflow: hidden;
}

.main {
  position: fixed;
  height: 95%;
  width: 100%;
  overflow-y: auto;
}
</style>
