<template>
<div class=" flex flex-col flex-nowrap h-screen justify-between">
    <Header/>
  <div>
    <h1 class="font-bold text-3xl text-white">
      Bienvenue sur le réseau de Groupomania
    </h1>
  </div>
  <div class="login">
    <Login />
  </div>
  <Footer />
</div>

</template>

<script>
import Login from '../components/Login.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
// @ is an alias to /src


export default {
  name: 'Home',
  components: {
    Login,
    Header,
    Footer
  },
  methods: {
  }
}



</script>

<style lang="scss" scoped>

</style>
