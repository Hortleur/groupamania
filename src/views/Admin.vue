<template>
    <div class=" flex flex-col flex-nowrap h-screen justify-between text-white" v-if="admin === 1">
        <router-link to="/Post">
            <div>
                <Header />
            </div>
        </router-link>
        <div>
            <h1 class=" text-4xl">Bienvenue {{user}}, sur la page Admin de Groupomania</h1>
        </div>
        <div class=" w-6/12 mx-auto my-4 text-black">
            <div>
                <h2 class="rounded mb-4 text-3xl font-bold text-orangeGroupo">Les Utilisateurs</h2>
                <form action="">
                    <select v-model="selected" @change="userChange($event)" class=" w-32 text-center rounded font-bold p-2">
                        <option v-for="(user, userId) in users" :key="userId" :value="user.id" class=" w-">{{user.name}}</option>
                    </select>
                </form>
                <div v-if="selected" class=" flex flex-row flex-nowrap justify-between">
                    <div class=" bg-orange-300 p-3 rounded-xl overflow-auto">
                        <h2 class=" font-bold text-green-600 text-2xl">POSTS</h2>
                        <div v-for="(post, postId) in selectedUser.posts" :key="postId">
                            <div class=" bg-pink-100 rounded-xl my-4">
                                <h3>{{post.title}}</h3>
                                <img :src="post.image" :alt="post.imageAltText" width="300" class=" mx-auto h-80 object-cover">
                                <p>{{post.content}}</p>
                                <button class=" bg-red-700 p-3 my-3 rounded-xl font-bold hover:bg-yellow-600">Supprimer post</button>
                            </div> 
                        </div>
                    </div>   
                    <div class=" bg-orange-300 p-3 rounded-xl">
                    <h2 class=" font-bold text-green-600 text-2xl">PROFILE</h2>
                    <div class=" bg-pink-100 rounded-xl my-4">
                        <h3>{{selectedUser.name}}</h3>
                        <img :src="selectedUser.profile.image" alt="Photo de profile" width="300" class=" mx-auto h-80 object-cover">
                        <p class=" my-3">Bio: {{selectedUser.profile.bio}}</p>
                    </div>
                    <button class=" bg-red-700 p-3 my-3 rounded-xl font-bold hover:bg-yellow-600">Supprimer l'utilisateur</button>
                </div>  
                </div>
            </div>
        </div>

        <div>
            <Footer />
        </div>
    </div>
    <div v-else class=" flex flex-col justify-center content-center h-screen w-1/2 mx-auto">
        <div class=" bg-red-500 p-3">
            <h1 class=" text-4xl font-bold">Tu t'es perdu l'ami...</h1>
            <button @click="backToPost" class=" font-bold text-2xl bg-red-200 hover:bg-green-400 border-2 border-white rounded-lg p-3">Oui :'(</button>
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
    const admin = JSON.parse(gpc).isAdmin
    export default {
        components: {
            Header,
            Footer
        },
        data() {
            return {
                user: user,
                users: [],
                isClosed: true,
                selected:"",
                userProfile:[],
                selectedUser:"",
                admin: admin
            }

        },
        methods: {
            async getUsers() {
                await instance.get('/user')
                    .then((res) => {
                        this.users = res.data.data
                        this.userProfile = res.data.data[this.selected].profile
                    })
                    .catch((error) => {
                        return error
                    })
            },
            displayPosts(){
                this.isClosed = !this.isClosed
            },
            hidePosts(){
                this.isClosed = !this.isClosed
            },
            userChange(event){
                this.selectedUser = this.users.find(user => user.id === Number(event.target.value))
                console.log(this.selectedUser)
            },
            backToPost(){
                this.$router.push('/Post')
            }
        },
        computed: {

        },
        created() {
            this.getUsers()
        }
    }
</script>
<style lang="">

</style>