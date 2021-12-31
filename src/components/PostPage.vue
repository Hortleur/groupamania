<template>
    <div class=" flex flex-col flex-nowrap h-screen justify-between">
        <div>
            <router-link to="/Post">
            <Header />
            </router-link>
        </div>
        <div v-if="loading" class=" mx-auto">
            <img src="@/assets/loader.png" alt="loader">
        </div>
        <div v-else class=" flex flex-row w-1/2 bg-white mx-auto border-2 rounded-2xl">
            <div class=" flex flex-col flex-nowrap border-r-4 border-orangeGroupo justify-center">
                <div class="likes mx-4">
                    <i class="fas fa-heart"></i>
                    <span>{{postItem.Likes.length}}</span>
                </div>
            </div>
            <div class=" w-full">
                <div>
                    <div class="title border-b-4 border-orangeGroupo my-3 flex content-center justify-start pl-2">
                        <h2 class=" text-2xl font-bold">{{postItem.title}}</h2>
                    </div>
                </div>
                <div>
                    <div class="content">
                        <div v-if="postItem.image" class="image mx-auto p-6 border-b-4 border-orangeGroupo">
                            <img :src="postItem.image" :alt="postItem.imageAltText" loading="lazy">
                        </div>
                        <div v-if="postItem.content" class=" border-b-4 border-orangeGroupo p-3">
                            {{postItem.content}}
                        </div>
                    </div>
                </div>

                <div class="postFooter flex flex-row flex-nowrap justify-between p-4">
                    <div class="userName">
                        <span>
                            <!--Ajouter photo de profil-->{{postItem.user.name}}</span>
                    </div>
                    <div class="comments">
                        <div>
                            <p class=" hover:text-green-600">commentaire(s) : {{postItem.Commentaire.length}}
                                commentaire(s)
                            </p>
                        </div>
                    </div>
                </div>
                <div class="commentaires">
                    <div class=" border-orangeGroupo border-t-4 border-b-4 py-4">
                        <form class=" flex justify-center">
                            <textarea v-model="comment" cols="30" rows="5" class=" border-black border-2 p-2"></textarea>
                            <button @click="sendComment" class=" bg-gray-500 p-4 rounded-r-lg hover:bg-green-600 font-bold">Commenter</button>
                        </form>
                    </div>
                    <div v-for="comment in commentaires" :key="comment.id" class=" flex flex-row flex-nowrap">
                        <div>
                            <div>
                                <div>
                                    <img src="" alt="">
                                </div>
                                <div>
                                    <span>{{comment.userId}}</span>
                                </div>
                                <div>
                                    <span>il y a :{{comment.createdAt}}h</span>
                                </div>
                            </div>
                            <div>
                                <p>{{ comment.comment }}</p>
                            </div>
                        </div>
                        
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
    import Header from "../components/Header.vue";
    import Footer from "../components/Footer.vue";
    let gpc = localStorage.getItem('gpc')
    const UserId = JSON.parse(gpc).id
    const axios = require('axios')
    const instance = axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("gpc")).token}`
        }
    })

    export default {
        components: {
            Header,
            Footer
        },
        data() {
            return {
                id: this.$route.params.id,
                postItem: {},
                loading: true,
                commentaires: [],
                comment: '',
                userId: UserId,
                postId: this.$route.params.id,
                user:''
                
            }
        },
        methods: {
            getPostItem() {
                instance.get('/post/onePost/' + this.id)
                    .then((data) => {
                        this.postItem = data.data.data
                        this.loading = !this.loading
                        this.commentaires = this.postItem.Commentaire
                    })
            },
            sendComment(){
                instance.post('/createComment', {
                    comment: this.comment,
                    
                    userId: this.userId,
                    
                    postId: Number(this.postId)
                    
                })
                .then((res) => {
                   return res
                })
                .catch((error) => {
                    return error
                })
            },
            getUser(){
                instance.get('/user/profile',{
                    id: this.comment.userId
                })
                .then((res) => {
                  console.log(res)
                })
                .catch((error) => {
                    return error
                })
            }
        },
        created() {
            this.getPostItem(),
            this.getUser()
        }
    }
</script>

<style lang="scss" scoped>

</style>