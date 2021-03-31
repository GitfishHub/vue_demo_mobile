<template>
  <div id="app">
     <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {

    }
  },
  created(){
    // 存储用户信息
      var obj ={
        name:'zs',
        age:'19',
        address:'江苏邳州'
      }
     this.$store.dispatch("userinfo",obj)
  }
}
</script>

<style>

</style>
