/* eslint-disable */
<template>
  <div class="flex flex-col flex-nowrap h-screen justify-between">
    <div>
      <router-link to="/Post">
        <Header />
      </router-link>
    </div>
    <div
      v-if="loading"
      class="mx-auto"
    >
      <img
        src="@/assets/loader.png"
        alt="loader"
      >
    </div>
    <div
      v-else
      class="flex flex-row md:w-3/4 lg:w-3/4 xl:w-1/2 bg-white lg:mx-auto xl:mx-auto md:mx-auto border-2 rounded-2xl sm:w-screen"
    >
      <div
        class="flex flex-col flex-nowrap border-r-4 border-orangeGroupo justify-center"
      >
        <div class="likes mx-4">
          <div v-if="isLiked">
            <i
              class="fas fa-heart text-red-700 cursor-pointer text-2xl"
              @click="onDislike(postItem.id)"
            />
          </div>
          <div v-else>
            <i
              class="fas fa-heart cursor-pointer text-2xl"
              @click="onLike"
            />
          </div>
          <span v-if="postItem.Likes.length === 0"> 0 </span>
          <span v-else>{{ postItem.Likes.length }}</span>
        </div>
      </div>
      <div class="w-full">
        <div>
          <div
            class="title border-b-4 border-orangeGroupo my-3 flex content-center justify-start pl-2"
          >
            <h2 class="text-2xl font-bold">
              {{ postItem.title }}
            </h2>
          </div>
        </div>
        <div>
          <div class="content">
            <div
              v-if="postItem.image"
              class="image mx-auto p-6 border-b-4 border-orangeGroupo"
            >
              <div class="mx-auto w-1/2">
                <img
                  :src="postItem.image"
                  :alt="postItem.imageAltText"
                  loading="lazy"
                  class="object-cover"
                >
              </div>
            </div>
            <div
              v-if="postItem.content"
              class="border-b-4 border-orangeGroupo p-3"
            >
              {{ postItem.content }}
            </div>
          </div>
        </div>

        <div
          class="postFooter flex flex-row sm:flex-col sm:items-center flex-nowrap justify-between p-4"
        >
          <div class="userName flex flex-row">
            <img
              v-if="postItem.user.profile !== null"
              :src="postItem.user.profile.image"
              alt="photo de profile"
              class="w-9 h-9 object-cover rounded-full"
            >
            <img
              v-else
              src="../assets/default.jpg"
              alt="photo de profile"
              class="w-9 h-9 object-cover rounded-full"
            >
            <span class="self-center">{{ postItem.user.name }}</span>
          </div>
          <div class="comments flex flex-col justify-center">
            <div>
              <p class="hover:text-green-600">
                {{ commentaires.length }} commentaire<span
                  v-if="commentaires.length > 1"
                >s</span>
              </p>
            </div>
          </div>
        </div>
        <div class="commentaires">
          <div class="border-orangeGroupo border-t-4 py-4">
            <form class="flex justify-center">
              <textarea
                v-model="comment"
                cols="30"
                rows="5"
                class="border-black border-2 p-2 sm:w-1/2"
              />
              <button
                class="bg-gray-500 p-4 rounded-r-lg hover:bg-green-600 font-bold"
                @click="sendComment"
              >
                Commenter
              </button>
            </form>
          </div>
          <div
            v-for="comments in commentaires"
            :key="comments.id"
            class="flex flex-row flex-nowrap justify-center my-3 border-t-2 border-orangeGroupo pt-2"
          >
            <div class="flex flex-col justify-center p-3 bg-orange-400 rounded-bl-lg">
              <img
                v-if="comments.user.profile !== null"
                :src="comments.user.profile.image"
                alt="photo de profile"
                class="w-9 h-9 rounded-full object-cover"
              >
              <img
                v-else
                src="../assets/default.jpg"
                alt="photo de profil par defaut"
                class="w-9 h-9 rounded-full object-cover"
              >
              <p>{{ comments.user.name }}</p>
            </div>
            <div class="bg-orange-400 p-3 rounded-r-lg">
              <div class="flex flex-row flex-nowrap justify-between">
                <div class="flex flex-row flex-nowrap justify-evenly">
                  <p>{{ new Date(comments.createdAt).toLocaleString("fr") }}</p>
                </div>
                <div v-if="isAdmin === 1 || userId == comments.userId">
                  <i
                    class="fas fa-times text-red-700 ml-4 cursor-pointer"
                    @click="deleteComment(comments.id)"
                  />
                </div>
              </div>
              <div>
                <p>{{ comments.comment }}</p>
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
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
let gpc = localStorage.getItem("gpc");
const UserId = JSON.parse(gpc).id;
const admin = JSON.parse(gpc).isAdmin;

const axios = require("axios");
const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("gpc")).token}`,
  },
});

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      id: this.$route.params.id,
      postItem: {},
      loading: true,
      isLiked: false,
      commentaires: [],
      comment: "",
      userId: UserId,
      postId: "",
      isAdmin: admin,
      Likes: "",
    };
  },
  created() {
    this.getPostItem();
  },
  methods: {
    //recupération des posts
    getPostItem() {
      instance
        .get("/post/onePost/" + this.id)
        .then((data) => {
          this.userLiked();
          this.postItem = data.data.data;
          this.loading = false;
          this.commentaires = this.postItem.Commentaire;
          this.postId = this.postItem.id;

          return data;
        })
        .catch((error) => {
          return error;
        });
    },
    //envois de commentaires
    sendComment() {
      instance
        .post("/createComment", {
          comment: this.comment,
          postId: Number(this.postId),
        })
        .then((res) => {
          this.getPostItem();
          return res;
        })
        .catch((error) => {
          return error;
        });
    },
    //like
    onLike() {
      const id = this.postId;
      instance
        .post("/like", {
          id: Number(id),
        })
        .then((res) => {
          this.getPostItem();
          return res;
        })
        .catch((error) => {
          return error;
        });
    },
    //verification du like
    userLiked() {
      instance
        .get("/user/likes")
        .then((res) => {
          const likes = res.data.data.Likes;
          this.Likes = likes;
          for (const like of likes) {
            if (like.postId == this.id && like.userId == this.userId) {
              this.isLiked = true;
            } else {
              return;
            }
          }
        })
        .catch((error) => {
          return error;
        });
    },
    //enlever le like
    onDislike(id) {
      const likeId = this.Likes.find((item) => item.postId === id).id;
      instance
        .delete(`/like/deletelike/${likeId}`)
        .then((res) => {
          this.getPostItem();
          this.isLiked = !this.isLiked;
          return res;
        })
        .catch((error) => {
          return error;
        });
    },
    //suppression du commentaire
    deleteComment(id) {
      instance
        .delete(`/comment/delete/${id}`)
        .then((res) => {
          this.getPostItem();
          return res;
        })
        .catch((error) => {
          return error;
        });
    },
  },
};
</script>
