<template>

<router-view/>

</template>

<script>

export default {
  name: 'App'
,
mounted() {
  window.addEventListener('offline', ()=>{
   // 网络由正常到异常时才会触发
   console.log('111')
   sessionStorage.locationUrl=window.location.href;
   this.$router.replace('refresh')
  });
  window.addEventListener('online',()=>{
    console.log('111')
    window.location.href=sessionStorage.locationUrl
  });
},


}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
