<template>
  <div class="flex flex-col justify-between h-screen">
    <div>
      <Header />
    </div>
    <div class="mx-auto">
      <img src="../assets/travolta.gif" alt="perdu" />
    </div>
    <h1 class="text-5xl font-bold text-white">Page 404</h1>
    <p class="text-3xl font-bold text-white">Tu t'es perdu mon ami ;)</p>
    <div>
      <router-link to="/Post" class="mr-4">
        <button class="p-4 bg-greenGroupo font-bold text-white rounded-lg">Posts</button>
      </router-link>
      <router-link to="/Profile">
        <button class="p-4 bg-greenGroupo font-bold text-white rounded-lg">
          Profile
        </button>
      </router-link>
    </div>

    <div>
      <Footer />
    </div>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "NotFound",
  components: {
    Header,
    Footer,
  },
};
</script>
