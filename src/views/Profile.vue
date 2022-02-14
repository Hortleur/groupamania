/* eslint-disable */
<template>
  <div class="flex flex-col justify-between h-screen">
    <div class="sm:mb-4 md:flex-row md:justify-between md:items-center md:mx-24">
      <router-link to="/Post">
        <Header />
      </router-link>
      <router-link to="/">
        <button
          class="bg-pink-100 p-4 rounded-tl-xl rounded-br-xl font-semibold hover:bg-pink-500"
          @click="logOut"
        >
          DECONNEXION
        </button>
      </router-link>
    </div>
    <div>
      <div class="bg-white md:w-1/2 w-1/3 mx-auto rounded-xl p-3 sm:w-screen sm:p-4">
        <div class="flex flex-row sm:flex-col flex-nowrap items-center">
          <div class="flex flex-col items-center">
            <div class="cursor-pointer" @click="$refs.fileInput.click()">
              <img
                v-if="profile.image"
                :src="profile.image"
                alt="Photo de Profile"
                class="rounded-2xl object-cover w-36 h-36"
              />
              <img
                v-else
                src="../assets/default.jpg"
                alt="photo de profile"
                class="rounded-2xl object-cover w-36 h-36"
              />
              <input ref="fileInput" class="hidden" type="file" @change="changePic" />
            </div>
            <div
              v-if="updatePic"
              class="mt-6 bg-red-400 p-2 rounded-lg border-2 border-gray-400"
            >
              <button type="submit" @click="updateProfilePic">Enregistrer l'image</button>
            </div>
          </div>

          <div class="mx-auto">
            <div class="w-1/2 mb-2">
              <h1 class="font-bold text-5xl underline">
                {{ userName }}
              </h1>
            </div>
            <div
              class="mt-2 text-lg cursor-pointer hover:bg-orange-200 w-3/4 mx-auto"
              @click="changeBio"
            >
              <h2 class="font-bold">Bio :</h2>
              <p>{{ profile.bio }}</p>
            </div>
            <div v-show="bioForm">
              <form class="flex flex-col ml-3">
                <textarea
                  v-model="bio"
                  cols="20"
                  rows="5"
                  class="border-2 border-gray-400 rounded-lg p-2"
                />
                <div v-if="v$.bio.$error">
                  {{ v$.bio.$errors[0].$message }}
                </div>
                <button
                  type="submit"
                  class="bg-pink-100 mt-2 p-2 rounded-lg font-semibold border-2 border-gray-400"
                  @click="updateBio"
                >
                  Enregistrer
                </button>
              </form>
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-evenly mt-3">
          <button
            class="bg-gray-500 p-3 rounded-lg text-white font-bold hover:text-black hover:bg-red-700 sm:bg-red-700"
            @click="deleteAccount"
          >
            Supprimer mon compte
          </button>
        </div>
      </div>
    </div>
    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import axios from "axios";

export default {
  name: "Profile",

  components: {
    Header,
    Footer,
  },
  data() {
    return {
      v$: useVuelidate(),
      userId: JSON.parse(localStorage.getItem("gpc")).id,
      profileTrue: false,
      profile: "",
      userName: JSON.parse(localStorage.getItem("gpc")).name,
      openUpdateModal: false,
      selectedFile: null,
      bio: "",
      bioForm: false,
      updatePic: false,
    };
  },
  //validation du formulaire
  validations() {
    return {
      bio: { required },
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    //deconnextion et vidange du localStorage
    logOut() {
      localStorage.clear();
    },
    //mise a jour de la bio
    updateBio() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const instance = axios.create({
          baseURL: "http://localhost:3000/api",
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("gpc")).token}`,
          },
        });
        instance
          .put("/editProfileBio", {
            bio: this.bio,
          })
          .then((res) => {
            this.bioForm = !this.bioForm;
            return res;
          })
          .catch((error) => {
            return error;
          });
      }
    },
    //recuperation du profile
    getProfile() {
      const instance = axios.create({
        baseURL: "https://back-livid.vercel.app/api",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("gpc")).token}`,
        },
      });
      instance
        .get("/user/Profile")
        .then((res) => {
          let profileData = res.data.data.profile;
          if (profileData != null) {
            this.profileTrue = !this.profileTrue;
            this.profile = profileData;
          }
        })
        .catch((error) => {
          return error;
        });
    },
    //suppression du compte
    deleteAccount() {
      let self = this;
      const instance = axios.create({
        baseURL: "https://back-livid.vercel.app/api",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("gpc")).token}`,
        },
      });
      instance
        .delete("/user/delete")
        .then((res) => {
          this.logOut();
          self.$router.push("/");
          return res;
        })
        .catch((error) => {
          return error;
        });
    },
    //evenement de selection du fichier
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    //mise à jour de la photo de profil
    updateProfilePic() {
      const instance = axios.create({
        baseURL: "https://back-livid.vercel.app/api",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("gpc")).token}`,
        },
      });
      let fd = new FormData();
      fd.append("image", this.selectedFile);
      instance
        .put("/editProfilePic", fd)
        .then((res) => {
          this.getProfile();
          this.updatePic = false;
          return res;
        })
        .catch((error) => {
          return error;
        });
    },
    //event de choix d'image de profil - affichage du bouton d'envoi
    changePic(event) {
      this.selectedFile = event.target.files[0];
      this.updatePic = true;
    },
    //affichage du formulaire
    changeBio() {
      if (this.bioForm === false) {
        this.bioForm = true;
      } else if (this.bioForm === true) {
        this.bioform = false;
      }
    },
  },
};
</script>
