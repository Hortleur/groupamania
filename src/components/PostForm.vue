/* eslint-disable */
<template>
  <div class="border-2 border-solid border-black bg-pink-100 p-8 rounded-xl sm:w-screen">
    <div class="my-4">
      <input
        id="postTitle"
        v-model="title"
        type="text"
        name="postTitle"
        placeholder=" Titre"
        class="w-full rounded-2xl border-blackGroupo border-2 py-2 px-5"
      />
      <span v-if="!title" class="text-redGroupo">le titre est requis</span>
    </div>
    <div class="">
      <textarea
        id="content"
        v-model="content"
        name="content"
        cols="60"
        rows="5"
        class="border-2 border-blackGroupo rounded-2xl py-2 px-5 sm:w-4/5"
      />
    </div>
    <div class="my-4">
      <input
        id="imageAltText"
        v-model="imageAltText"
        type="text"
        name="imageAltText"
        placeholder=" Description de l'image"
        class="w-full rounded-2xl border-2 border-black py-2 px-5"
      />
      <span v-if="selectedFile" class="text-redGroupo">La description est requise</span>
      <input id="image" type="file" name="image" class="my-4" @change="onFileSelected" />
      <span v-if="!selectedFile" class="text-redGroupo">l'image est requise</span>
    </div>
    <div class="my-4">
      <button
        :disabled="!title"
        class="button border-2 border-blackGroupo rounded-full w-1/4 p-4 hover:bg-greenGroupo bg-blackGroupo text-white"
        type="submit"
        aria-label=" poster"
        @click="onPost"
      >
        <i class="fas fa-paper-plane text-2xl" />
      </button>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";

export default {
  name: "PostForm",
  data: function () {
    return {
      v$: useVuelidate(),
      title: "",
      content: "",
      imageAltText: "",
      selectedFile: null,
      isDisabled: true,
      userId: JSON.parse(localStorage.getItem("gpc")).id,
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    onPost() {
      const formContent = {
        title: this.title,
        content: this.content,
        image: this.selectedFile,
        imageAltText: this.imageAltText,
        userId: this.userId,
      };
      this.$emit("changement", formContent);
    },
  },
};
</script>

<style lang="scss" scoped></style>
