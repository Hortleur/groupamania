<template>
    <div class="card border-2 bg-pink-100 rounded-3xl md:p-6 lg:p-8 xl:p-10 2xl:p-12 mt-4">
        <h2 class="card_title text-xl font-bold my-4" v-if="mode == 'login'">Connexion</h2>
        <h2 class="card_title text-xl font-bold my-4" v-else>Inscription</h2>
        <p class="card_subtitle" v-if="mode == 'login'">Pas encore de compte ? <span class="card_action text-base text-orangeGroupo hover:text-green-600 cursor-pointer" @click="switchToCreate">Créer un compte</span></p>
        <p class="card_subtitle text-lg" v-else>Déjà un compte ? <span class="card_action text-base text-orangeGroupo hover:text-green-600 cursor-pointer" @click="switchToLogin">Se Connecter</span></p>
        <div class="form-row">
            <input v-model="email" type="text" placeholder=" exemple@email.com" class=" py-2 my-3 rounded-lg placeholder-gray-600 border-2 border-black text-center">
            <div v-if="v$.email.$error">L'email est incorrect</div>
        </div>
        <div class="form-row" v-if="mode == 'create'">
            <input v-model="prenom" type="text" placeholder=" Prenom" class=" py-2 my-6 rounded-lg placeholder-gray-600 border-2 border-black text-center">
            <div v-if="v$.prenom.$error">Le prénom est incorrect</div>
        </div>
        <div class="form-row">
            <input v-model="password" type="password" placeholder=" Mot de passe" class=" py-2 my-3 rounded-lg placeholder-gray-600 border-2 border-black text-center">
            <div v-if="v$.password.$error">Le mot de passe est incorrect</div>
        </div>
        <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
            Adresse mail ou mot de passe invalide
        </div>
        <div class="form-row">
            <button @click="login()" class="border-2 rounded-2xl p-2 my-4 bg-red-600 text-xl shadow-md cursor-pointer hover:text-white font-semibold" v-if="mode == 'login'">
                <span>Connexion</span> 
            </button>
            <button @click="createAccount()" class="border-2 rounded-2xl p-2 my-4 bg-red-600 text-xl shadow-md cursor-pointer hover:text-white font-semibold" v-else>
                S'inscrire
            </button>
        </div>
    </div>
</template>

<script>
//import axios from "axios";
import { mapState } from "vuex";
import useValidate from "@vuelidate/core"
import { required, alphaNum, alpha, email} from '@vuelidate/validators'

export default {
    name: 'Login',
    data: function() {
        return{
            v$: useValidate(),
            mode: 'login',
            email: '',
            prenom: '',
            password: '',
        }
    },
    validations:{  
            email: {required, email},
            prenom: {required, alpha},
            password:{required, alphaNum} 
    },
    computed: {
        ...mapState(['status'])
    },
    methods: {
       switchToCreate: function(){
           this.mode = 'create'
       },
       switchToLogin: function(){
           this.mode = 'login'
       },
       login() {
           this.v$.$validate()
           if (!this.v$.$invalide) { 
               const self = this
           return this.$store.dispatch('login', {
               email: this.email,
               password: this.password
           }).then(function(data) {
               localStorage.setItem('gpc', JSON.stringify(data.data.data))
               self.$router.push('/Post')
           }).catch(function(error) {
               alert('Créer un compte')
               return error
               })
           }
       } ,
       createAccount(){
           this.v$.$validate()
           if (!this.v$.$invalide) {
               const self = this
           return this.$store.dispatch('createAccount', {
               email: this.email,
               name: this.prenom,
               password: this.password
           }).then(function(response) {
               localStorage.setItem('gpc', JSON.stringify(response.data.data))
               /*const instance = axios.create({
                    baseURL: "http://localhost:3000/api",
                    headers: {
                        "Authorization": `Bearer ${response.data.data.token}`,
                    }
                })
                instance.post('/createProfile')
                    .then((res) => {
                    return res
                    })
                    .catch((error) => {
                    return error
                    })*/
               self.$router.push('/Post');
           }).catch(function(error) {
               alert('Compte déjà existant')
               return error
               })
           }
        }           
    }
}

</script>

<style lang="scss" scoped>

</style>