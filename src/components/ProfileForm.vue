<template>
  <div class="border-2 border-solid border-black bg-pink-100 p-8 rounded-xl">
    <div class="my-4">
      <label for="bio"> bio:</label>
      <textarea id="bio" v-model="bio" name="bio" cols="30" rows="5" class="px-2" />
    </div>
    <div>
      <input id="image" type="file" name="image" @change="onFileSelected" />
    </div>
    <div>
      <button
        type="submit"
        class="my-4 bg-orange-200 p-4 rounded-xl border-black border-2 shadow-lg"
        @click="createProfile"
      >
        Créer son Profile
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileForm",
  data: function () {
    return {
      bio: "",
      userId: JSON.parse("gpc").id,
      selectedFile: null,
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    createProfile() {
      const formContent = {
        bio: this.bio,
        userId: this.userId,
        image: this.selectedFile,
      };
      this.$emit("changement", formContent);
    },
  },
};
</script>

<style></style>
