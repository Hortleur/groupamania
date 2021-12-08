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
        <div class="form-row">
            <button class="button button--disabled" v-if="mode == 'login'">
                Connexion
            </button>
            <button @click="createAccount()" class="button" v-else>
                S'inscrire
            </button>
        </div>
    </div>
</template>

<script>

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

    },
    methods: {
       switchToCreate: function(){
           this.mode = 'create'
       },
       switchToLogin: function(){
           this.mode = 'login'
       },
       createAccount: function(){
           this.$store.dispatch('createAccount', {
               email: this.email,
               name: this.prenom,
               password: this.password
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