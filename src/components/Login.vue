<template>
    <div class="card">
        <h2 class="card_title" v-if="mode == 'login'">Connexion</h2>
        <h2 class="card_title" v-else>Inscription</h2>
        <p class="card_subtitle" v-if="mode == 'login'">Pas encore de compte ? <span class="card_action" @click="switchToCreate">Créer un compte</span></p>
        <p class="card_subtitle" v-else>Déjà un compte ? <span class="card_action" @click="switchToLogin">Se Connecter</span></p>
        <div class="form-row">
            <input v-model="email" type="text" placeholder="exemple@email.com" class="form-row__input">
        </div>
        <div class="form-row" v-if="mode == 'create'">
            <input v-model="prenom" type="text" placeholder="Prenom" class="form-row__input">
        </div>
        <div class="form-row">
            <input v-model="password" type="password" placeholder="Mot de passe" class="form-row__input">
        </div>
        <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
            Adresse mail ou mot de passe invalide
        </div>
        <div class="form-row">
            <button @click="login()" class="button" v-if="mode == 'login'">
                <span v-if="status == loading">Connexion en cours</span>
                <span v-else>Connexion</span> 
            </button>
            <button @click="createAccount()" class="button" v-else>
                S'inscrire
            </button>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: 'Login',
    data: function() {
        return{
            mode: 'login',
            email: '',
            prenom: '',
            password: ''
        }
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
       login: function() {
           const self = this
           this.$store.dispatch('login', {
               email: this.email,
               password: this.password
           }).then(function(data) {
               localStorage.setItem('gpc', JSON.stringify(data.data.data))
               self.$router.push('/Post')
           }, function(error) {
               console.log(error)
               alert("Veuillez créer un compte")
           })
       } ,
       createAccount: function(){
           const self = this
           this.$store.dispatch('createAccount', {
               email: this.email,
               name: this.prenom,
               password: this.password
           }).then(function(response) {
               localStorage.setItem('gpc', JSON.stringify(response.data.data))
               self.$router.push('/Post');
           }, function(error) {
               console.log(error)
               alert('Compte déjà existant')
           })
       }
    }
}

</script>

<style lang="scss" scoped>
    .card{
        background-color: lighten(#f52c09, 45);
        border: 2px solid black;
        width: 50%;
        margin: 20px auto;
        padding: 20px 0;
        span{
            color: #f52c09;
            &:hover{
                cursor: pointer;
            }
        }
        h2{
            font-weight: bold
        }
        .form-row{
            margin: 10px auto;
            input{
                width: 200px;
                height: 30px;
                border-radius: 15px;
                border: 2px solid black;
            }
            button{
                width: 150px;
                height: 30px;
                border-radius: 15px;
                border: 2px solid black;
                font-weight: bold;
            }
        }
    }
</style>