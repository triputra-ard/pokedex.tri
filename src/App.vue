<template>
  <navigation></navigation>
  <main-app></main-app>
  <footer-app></footer-app>
</template>
<script>
import Navigation from '@/views/components/Navigation'
import mainApp from '@/views/components/Main'
import footerApp from '@/views/components/Footer'
  export default{
    components:{
      'navigation':Navigation,
      'main-app':mainApp,
      'footer-app':footerApp
    },
    mounted(){
    }
  }
</script>
<style>
</style>
