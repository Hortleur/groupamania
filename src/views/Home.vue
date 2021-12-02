<template>
  <Header @toggle-signup-form="toggleSignupForm" @toogle-login-form="toogleLoginForm"/>
  <div class="home">
    <div v-show="showSignupForm">
      <signup />
    </div>
    <div v-show="showLoginForm">
      <login />
    </div>
  </div>
  <Footer />
</template>

<script>
import signup from '../components/Signup.vue'
import login from '../components/Login.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
// @ is an alias to /src


export default {
  name: 'Home',
  components: {
    signup,
    login,
    Header,
    Footer
  },

  data(){
    return {
      showSignupForm : false,
      showLoginForm : false
    }
  },
  methods: {
    toggleSignupForm(){
      this.showSignupForm = !this.showSignupForm
    },
    toggleLoginForm(){
      this.showLoginForm = !this.showLoginForm
    }

  }
}



</script>

<style lang="scss" scoped>


</style>
