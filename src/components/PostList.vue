<template>
    <div v-if="error">{{error}}</div>
    <div v-else v-for="post in posts" :key="post.id"
        class="posts flex flex-row flex-nowrap flex-shrink-0 flex-grow-0 bg-pink-100 my-10 rounded-2xl mx-auto w-1/3">
        <div class=" flex flex-col flex-nowrap border-r-4 border-orangeGroupo justify-center">
            <div class="likes mx-4">
                <i class="fas fa-heart"></i>
                <span>{{post.Likes.length}}</span>
            </div>
        </div>
        <div class=" w-full">
            <div>
                <div class="title border-b-4 border-orangeGroupo my-3 flex content-center justify-between p-2">
                    <h2 class=" text-2xl font-bold">{{post.title}}</h2>
                    <i @click="deletePost(post.id, post.image)" class="fas fa-trash self-center text-red-600" v-if=" isAdmin === 1 || userId == post.user.id"></i>
                </div>
            </div>
            <div>
                <div class="content">
                    <div v-if="post.image" class="image mx-auto p-6 border-b-4 border-orangeGroupo">
                        <img :src="post.image" :alt="post.imageAltText" loading="lazy">
                    </div>
                    <div v-if="post.content" class=" border-b-4 border-orangeGroupo p-3">
                        {{post.content}}
                    </div>
                </div>
            </div>

            <div class="postFooter flex flex-row flex-nowrap justify-between p-4">
                <div class="userName flex flex-row">                    
                    <img :src="post.user.profile.image" alt="photo de profile" class=" w-9 h-9 object-cover rounded-full">
                    <span>{{post.user.name}}</span>
                </div>
                <div class="comments">
                    <router-link :to="'/Post/' + post.id">
                        <div>
                            <p class=" hover:text-green-600">commentaire(s) : {{post.Commentaire.length}} commentaire(s)
                            </p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    const instance = axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("gpc")).token}`
        }
    })
    let gpc = localStorage.getItem('gpc')
    const admin = JSON.parse(gpc).isAdmin
    const UserId = JSON.parse(gpc).id
    export default {
        name: "Post",
        data() {
            return {
                userId : UserId,
                isAdmin: admin,
                posts: []
            }
        },
        computed: {

        } ,
        components: {

        },
        methods: {
            getPosts(){
                instance.get('/post')
                .then((res) => {
                    console.log(res.data.data)
                    this.posts = res.data.data
                    console.log(this.posts)
                })
                .catch((error) => {
                    return error
                })
            },
            deletePost(id, image){
                instance.delete(`/post/delete/${id}`, image)
                .then((res) => {
                    this.posts = this.posts.filter(item => item.id !== id)
                     return res
                })
                .catch((error) => {
                    return error
                })
            }
        },
        created() {
            this.getPosts()
        }
    }
</script>

<style lang="scss" scoped>

</style>