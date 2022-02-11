/* eslint-disable */
<template>
  <div>
    <div v-if="error">
      {{ error }}
    </div>
    <div
      v-for="post in posts"
      v-else
      :key="post.id"
      class="posts flex flex-row flex-nowrap bg-pink-100 my-10 rounded-2xl sm:mx-4 md:mx-auto lg:mx-auto xl:mx-auto"
    >
      <div
        class="flex flex-col flex-nowrap border-r-4 border-orangeGroupo justify-center"
      >
        <div class="likes mx-2">
          <div v-if="isLiked && Likes.find((item) => item.postId === post.id)">
            <i
              class="fas fa-heart text-red-700 cursor-pointer text-2xl"
              @click="onDislike(post.id)"
            />
          </div>
          <div v-else>
            <i class="fas fa-heart cursor-pointer text-2xl" @click="onLike(post.id)" />
          </div>
          <span>{{ post.Likes.length }}</span>
        </div>
      </div>
      <div class="w-full">
        <div>
          <div
            class="title border-b-4 border-orangeGroupo my-3 flex content-center justify-between p-2"
          >
            <h2 class="text-2xl font-bold">
              {{ post.title }}
            </h2>
            <i
              v-if="isAdmin === 1 || userId == post.user.id"
              class="fas fa-trash self-center text-red-600 cursor-pointer"
              @click="deletePost(post)"
            />
          </div>
        </div>
        <div>
          <div class="content">
            <div v-if="post.image" class="mx-auto p-6 border-b-4 border-orangeGroupo">
              <img
                :src="post.image"
                :alt="post.imageAltText"
                width="400"
                loading="lazy"
                class="mx-auto"
              />
            </div>
            <div v-if="post.content" class="border-b-4 border-orangeGroupo p-3">
              {{ post.content }}
            </div>
          </div>
        </div>

        <div
          class="postFooter flex flex-row flex-nowrap justify-between p-4 sm:flex-col sm items-center"
        >
          <div class="userName flex flex-row">
            <img
              v-if="post.user.profile !== null"
              :src="post.user.profile.image"
              alt="photo de profile"
              class="w-9 h-9 object-cover rounded-full"
            />
            <img
              v-else
              src="../assets/default.jpg"
              alt="photo de profile"
              class="w-9 h-9 object-cover rounded-full"
            />
            <span class="self-center">{{ post.user.name }}</span>
          </div>
          <div class="comments">
            <router-link :to="'/Post/' + post.id">
              <div>
                <p class="hover:text-green-600">
                  {{ post.Commentaire.length }} commentaire<span
                    v-if="post.Commentaire.length > 1"
                    >s</span
                  >
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Post",
  components: {},
  data() {
    return {
      posts: [],
      newPost: null,
      isLiked: false,
      postId: "",
      isAdmin: JSON.parse(localStorage.getItem("gpc")).isAdmin,
      userId: JSON.parse(localStorage.getItem("gpc")).id,
      Likes: [],
      error: "",
    };
  },
  created() {
    this.getPosts();
  },
  methods: {
    getAxios() {
      const instance = axios.create({
        baseURL: "https://back-livid.vercel.app/api",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("gpc")).token}`,
        },
      });
      return instance;
    },
    getPosts() {
      this.getAxios()
        .get("/post")
        .then((res) => {
          this.posts = res.data.data;
          this.userLiked();
        })
        .catch((error) => {
          return (this.error = error);
        });
    },
    deletePost(post) {
      this.getAxios()
        .delete(`/post/delete/${post.id}`, {
          data: {
            post: post,
          },
        })
        .then((res) => {
          this.getPosts();
          return res;
        })
        .catch((error) => {
          return (this.error = error);
        });
    },
    onLike(id) {
      this.getAxios()
        .post("/like", {
          id: Number(id),
        })
        .then((res) => {
          this.getPosts();
          return res;
        })
        .catch((error) => {
          return (this.error = error);
        });
    },
    userLiked() {
      this.getAxios()
        .get("/user/likes")
        .then((res) => {
          const likes = res.data.data.Likes;
          this.Likes = likes;
          likes.forEach((like) => {
            this.posts.forEach((post) => {
              if (like.postId == post.id && like.userId == this.userId) {
                this.isLiked = true;
              }
            });
          });
        })
        .catch((error) => {
          return (this.error = error);
        });
    },
    onDislike(id) {
      const likeId = this.Likes.find((item) => item.postId == id).id;
      this.getAxios()
        .delete(`/like/deletelike/${likeId}`)
        .then((res) => {
          this.getPosts();
          this.isLiked = !this.isLiked;
          return res;
        })
        .catch((error) => {
          return (this.error = error);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
