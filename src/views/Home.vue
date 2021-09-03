<template>
  <div class="home">
    <div v-if="conf">
      <h1>{{ conf.software_name }}</h1>
      <h5>{{ conf.version_number }}</h5>
      <h5>{{ conf.contact }}</h5>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data () {
    return {
      conf: null
    }
  },
  components: {
  },
  methods: {
    getConfigure () {
      this.ipcRenderer.send('getConfigure')
      this.ipcRenderer.once('getConfigure', (event, res) => {
        console.log('getConfigure', res)
        this.conf = res
      })
    }
  },
  mounted () {
    this.getConfigure()
  }
}
</script>2
