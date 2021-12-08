<template>
  <Header/>
  <div>
    <h1>
      Bienvenue sur le réseau de Groupomania
    </h1>
  </div>
  <div class="login">
    <Login />
  </div>
  <Footer />
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
  h1{
    font-size: 45px
  }
  .login{
    margin: 13vh auto;
    width : 50%;
  }
</style>
