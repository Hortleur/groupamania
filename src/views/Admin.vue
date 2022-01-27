/* eslint-disable */
<template>
  <div
    v-if="admin == '1'"
    class="flex flex-col flex-nowrap h-screen justify-between text-white"
  >
    <router-link to="/Post">
      <div>
        <Header />
      </div>
    </router-link>
    <div>
      <h1 class="text-4xl">Bienvenue {{ user }}, sur la page Admin de Groupomania</h1>
    </div>
    <div class="sm:w-auto sm:mx-auto md:w-1/2 md:mx-auto my-4 text-black">
      <div>
        <h2 class="rounded mb-4 text-3xl font-bold text-orangeGroupo">
          Les Utilisateurs
        </h2>
        <form action="">
          <select
            v-model="selected"
            class="w-32 text-center rounded font-bold p-2"
            @change="userChange($event)"
          >
            <option
              v-for="(ceuser, userId) in users"
              :key="userId"
              :value="ceuser.id"
              class="w-"
            >
              {{ ceuser.name }}
            </option>
          </select>
        </form>
        <div
          v-if="selected"
          class="sm:flex-col sm:my-6 md:flex-col mt-6 flex justify-around sm:w-screen items-start"
        >
          <div class="bg-orange-300 p-3 rounded-xl sm:mb-6 md:mb-6">
            <h2 class="font-bold text-green-600 text-2xl">PROFILE</h2>
            <div class="bg-pink-100 rounded-xl my-4">
              <h3>{{ selectedUser.name }}</h3>
              <img
                v-if="selectedUser.profile.image"
                :src="selectedUser.profile.image"
                alt="Photo de profile"
                loading="lazy"
                width="320"
                class="h-80 object-cover mx-auto"
              />
              <img
                v-else
                src="../assets/default.jpg"
                alt="photo de profil par defaut"
                width="320"
                class="h-80 object-cover mx-auto"
              />
              <p class="my-3">Bio: {{ selectedUser.profile.bio }}</p>
            </div>
            <button
              class="bg-red-700 p-3 my-3 rounded-xl font-bold hover:bg-yellow-600"
              @click="delUser()"
            >
              Supprimer l'utilisateur
            </button>
          </div>

          <div class="bg-orange-300 p-3 rounded-xl">
            <h2 class="font-bold text-green-600 text-2xl">POSTS</h2>
            <div v-for="(post, postId) in selectedUser.posts" :key="postId">
              <div class="bg-pink-100 rounded-xl my-4">
                <h3>{{ post.title }}</h3>
                <img
                  v-if="post.image"
                  :src="post.image"
                  :alt="post.imageAltText"
                  width="320"
                  loading="lazy"
                  class="h-80 object-cover mx-auto"
                />
                <p v-if="post.content">
                  {{ post.content }}
                </p>
                <button
                  class="bg-red-700 p-3 my-3 rounded-xl font-bold hover:bg-yellow-600"
                  @click="supprPost(post.id, post.image)"
                >
                  Supprimer post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <Footer />
    </div>
  </div>
  <div v-else>
    <NotFoundComponent />
  </div>
</template>
<script>
import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("gpc")).token}`,
    "Content-Type": "application/json",
  },
});
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import NotFoundComponent from "../components/NotFoundComponent.vue";
export default {
  components: {
    Header,
    Footer,
    NotFoundComponent,
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("gpc")).name,
      users: [],
      selected: "",
      userProfile: [],
      selectedUser: "",
      admin: JSON.parse(localStorage.getItem("gpc")).isAdmin,
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    //recupération des utilisateurs
    getUsers() {
      instance
        .get("/user")
        .then((res) => {
          this.users = res.data.data;
          this.userProfile = res.data.data[this.selected].profile;
        })
        .catch((error) => {
          return error;
        });
    },
    userChange(event) {
      this.selectedUser = this.users.find(
        (user) => user.id === Number(event.target.value)
      );
    },
    backToPost() {
      this.$router.push("/Post");
    },
    //suppression post
    supprPost(id, image) {
      instance
        .delete(`/post/delete/${id}`, {
          data: {
            image: image,
          },
        })
        .then((res) => {
          this.selectedUser.posts = this.selectedUser.posts.filter(
            (post) => post.id !== id
          );
          return res;
        })
        .catch((error) => {
          return error;
        });
    },
    //suppression utilisateur
    delUser() {
      const id = this.selectedUser.id;
      instance
        .delete(`/user/delete/${id}`)
        .then((res) => {
          this.selected = 0;
          this.getUsers();
          alert("Utilisateur correctement supprimer");
          return res;
        })
        .catch((error) => {
          return error;
        });
    },
  },
};
</script>
<style lang=""></style>
