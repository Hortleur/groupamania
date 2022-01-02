<template>
    <div class=" flex flex-col flex-nowrap h-screen justify-between text-white">
        <router-link to="/Post">
            <div>
                <Header />
            </div>
        </router-link>
        <div>
            <h1 class=" text-4xl">Bienvenu {{user}}, sur la page Admin de Groupomania</h1>
        </div>
        <div class=" flex flex-row flex-nowrap justify-evenly text-black">
            <div>
                <div class=" bg-pink-100">
                    <h2>Les Posts</h2>
                </div>
            </div>

            <div class=" bg-pink-100">
                <h2>Les Utilisateur</h2>
                <div>
                    <p>Nombre d'utilisateur: {{users.length}}</p>
                </div>
                <div v-for="(user, userId) in users" :key="userId">
                    <div>
                        <h3>{{user.name}}</h3>
                        <p v-if="user.isAdmin > 0"> Admin</p>
                        <p>{{user.email}}</p>
                        <p>Nombre de posts: {{postLength}}</p>
                        <p>Nombre de Commentaires: </p>
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
    import axios from 'axios'
    const instance = axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("gpc")).token}`
        }
    })
    import Header from '../components/Header.vue'
    import Footer from '../components/Footer.vue'
    const gpc = localStorage.getItem('gpc')
    const user = JSON.parse(gpc).name
    export default {
        components: {
            Header,
            Footer
        },
        data() {
            return {
                user: user,
                users: []
            }

        },
        methods: {
            getUsers() {
                instance.get('/user')
                    .then((res) => {
                        this.users = res.data.data
                    })
                    .catch((error) => {
                        return error
                    })
            }
        },
        computed: {
            postLength() {
                const postlength = this.user.posts
                if (!postlength) return '0'
                return postlength
            }
        },
        created() {
            this.getUsers()
        }
    }
</script>
<style lang="">

</style>