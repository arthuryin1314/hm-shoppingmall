<template>
  <div id="app">
    <router-view />
    <tabBar></tabBar>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="less"></style>
