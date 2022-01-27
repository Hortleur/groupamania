<template>
  <div class="card border-2 bg-pink-100 rounded-3xl md:p-6 lg:p-8 xl:p-10 2xl:p-12 mt-4">
    <h2
      v-if="mode == 'login'"
      class="card_title text-xl font-bold my-4"
    >
      Connexion
    </h2>
    <h2
      v-else
      class="card_title text-xl font-bold my-4"
    >
      Inscription
    </h2>
    <p
      v-if="mode == 'login'"
      class="card_subtitle"
    >
      Pas encore de compte ?
      <span
        class="card_action text-base text-redGroupo hover:text-greenGroupo cursor-pointer"
        @click="switchToCreate"
      >Créer un compte</span>
    </p>
    <p
      v-else
      class="card_subtitle text-lg"
    >
      Déjà un compte ?
      <span
        class="card_action text-base text-redGroupo hover:text-greenGroupo cursor-pointer"
        @click="switchToLogin"
      >Se Connecter</span>
    </p>
    <div class="form-row flex flex-col my-3">
      <label for="email"> Email</label>
      <input
        v-model="email"
        name="email"
        type="text"
        placeholder=" exemple@email.com"
        class="py-2 rounded-lg placeholder-gray-600 border-2 border-blackGroupo text-center"
      >
      <div v-if="v$.email.$error">
        {{ v$.email.$errors[0].$message }}
      </div>
    </div>
    <div
      v-if="mode == 'create'"
      class="form-row flex flex-col"
    >
      <label for="prenom"> Prenom</label>
      <input
        v-model="prenom"
        name="prenom"
        type="text"
        placeholder=" Prenom"
        class="py-2 rounded-lg placeholder-gray-600 border-2 border-blackGroupo text-center"
      >
      <div v-if="v$.prenom.$error">
        {{ v$.prenom.$errors[0].$message }}
      </div>
    </div>
    <div class="form-row flex flex-col my-3">
      <label for="password flex flex-col"> Mot de Passe</label>
      <input
        v-model="password"
        name="password"
        type="password"
        placeholder=" Mot de passe"
        class="py-2 rounded-lg placeholder-gray-600 border-2 border-blackGroupo text-center"
      >
      <div v-if="v$.password.$error">
        {{ v$.password.$errors[0].$message }}
      </div>
    </div>
    <div
      v-if="mode == 'login' && status == 'error_login'"
      class="form-row"
    >
      Adresse mail ou mot de passe invalide
    </div>
    <div class="form-row">
      <button
        v-if="mode == 'login'"
        class="border-2 rounded-2xl p-2 my-4 bg-orangeGroupo text-xl shadow-md cursor-pointer hover:text-white font-semibold"
        @click="login()"
      >
        <span>Connexion</span>
      </button>
      <button
        v-else
        class="border-2 rounded-2xl p-2 my-4 bg-orangeGroupo text-xl shadow-md cursor-pointer hover:text-white font-semibold"
        @click="createAccount()"
      >
        <span>S'inscrire</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, alphaNum, alpha, email } from "@vuelidate/validators";

export default {
  name: "Login",
  data() {
    return {
      v$: useVuelidate(),
      mode: "login",
      email: "",
      prenom: "",
      password: "",
    };
  },
  validations() {
    if (this.mode != "login") {
      return {
        email: { required, email },
        prenom: { required, alpha },
        password: { required, alphaNum },
      };
    } else {
      return {
        email: { required, email },
        password: { required, alphaNum },
      };
    }
  },
  computed: {
    ...mapState(["status"]),
  },
  methods: {
    switchToCreate: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
    login() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const self = this;
        return this.$store
          .dispatch("login", {
            email: this.email,
            password: this.password,
          })
          .then(function (data) {
            localStorage.setItem("gpc", JSON.stringify(data.data.data));
            self.$router.push("/Post");
          })
          .catch(function (error) {
            alert("Créer un compte");
            return error;
          });
      }
    },
    createAccount() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const self = this;
        return this.$store
          .dispatch("createAccount", {
            email: this.email,
            name: this.prenom,
            password: this.password,
          })
          .then(function (response) {
            localStorage.setItem("gpc", JSON.stringify(response.data.data));
            self.$router.push("/Post");
          })
          .catch(function (error) {
            alert("Compte déjà existant");
            return error;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
