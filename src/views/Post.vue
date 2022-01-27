/* eslint-disable */
<template>
  <div class="flex flex-col justify-between h-screen relative">
    <div class="header flex flex-col flex-nowrap fixed bg-blackGroupo w-full">
      <div>
        <Header />
      </div>
      <div class="flex flex-row flex-nowrap justify-center">
        <router-link to="/Profile">
          <i
            class="fas fa-user-astronaut text-3xl text-orangeGroupo"
            @click="goToProfile"
          />
        </router-link>
        <button
          class="mx-2"
          @click="toggleModal = !toggleModal"
        >
          <i class="fas fa-plus-circle text-orangeGroupo text-3xl mx-8" />
        </button>
        <router-link
          v-if="admin"
          to="/Admin"
        >
          <i class="fas fa-users-cog text-orangeGroupo text-3xl" />
        </router-link>
      </div>
    </div>
    <router-view />
    <div
      v-if="toggleModal"
      class="fixed z-50 overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center"
    >
      <div class="relative mx-auto w-auto">
        <button @click="toggleModal = !toggleModal">
          <i class="fas fa-times-circle text-4xl text-orangeGroupo" />
        </button>
        <PostForm @changement="logChangement" />
      </div>
    </div>
    <div
      v-if="toggleModal"
      class="absolute inset-0 z-40 opacity-90 bg-blackGroupo sm:fixed"
    />
    <div
      class="mx-auto sm:flex sm:flex-row-reverse sm:flex-nowrap my-8 sm:justify-around mt-80"
    >
      <div class="">
        <PostList :key="listKey" />
      </div>
    </div>

    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import PostList from "../components/PostList.vue";
import Footer from "../components/Footer.vue";
import PostForm from "../components/PostForm.vue";
let gpc = localStorage.getItem("gpc");
const token = JSON.parse(gpc).token;
const axios = require("axios");

export default {
  name: "Post",
  components: {
    Header,
    PostList,
    Footer,
    PostForm,
  },
  data() {
    return {
      toggleModal: false,
      admin: false,
      Posts: [],
      listKey: 0,
    };
  },
  created() {
    this.isAdmin();
  },
  methods: {
    isAdmin() {
      const gpc = localStorage.getItem("gpc");
      const gpcAdmin = JSON.parse(gpc).isAdmin;
      if (gpcAdmin > 0) {
        this.admin = !this.admin;
      }
    },

    logChangement(event) {
      const instance = axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      let fd = new FormData();
      if (event.image != null) {
        fd.append("image", event.image);
      }
      const formContent = {
        title: event.title,
        content: event.content,
        imageAltText: event.imageAltText,
      };
      fd.append("formContent", JSON.stringify(formContent));

      instance
        .post("/createPost", fd)
        .then((res) => {
          this.toggleModal = !this.toggleModal;
          this.listKey += 1;
          return res;
        })
        .catch((error) => {
          return error;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
