<template>
  <div class="flex flex-col justify-between">
    <div>
      <router-link to="/Post">
        <Header />
      </router-link>
    </div>
    <div>
      <iframe
        src="https://giphy.com/embed/czBIi0WnXX8L6"
        width="100%"
        height="100%"
        frameBorder="0"
        class="giphy-embed"
        allowFullScreen
      ></iframe>
    </div>
    <h1>Page 404</h1>
    <p>Tu t'es perdu mon ami ;)</p>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
export default {
  name: "NotFound",
  components: {
    Header,
  },
};
</script>
