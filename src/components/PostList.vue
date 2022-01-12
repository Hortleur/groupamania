<template>
    <div v-if="error">{{error}}</div>
    <div v-else v-for="post in posts" :key="post.id"
        class="posts flex flex-row flex-nowrap bg-pink-100 my-10 rounded-2xl sm:mx-4">
        <div class=" flex flex-col flex-nowrap border-r-4 border-orangeGroupo justify-center">
            <div class="likes sm:mx-2">
                <div v-if="isLiked">
                    <i @click="onDislike" class="fas fa-heart text-red-700 cursor-pointer text-2xl"></i>
                </div>
                <div v-else>
                    <i @click="onLike(post.id)" class="fas fa-heart cursor-pointer text-2xl"></i>
                </div>
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
                posts: [],
                newPost: null,
                isLiked: false,
                postId: ''
                
            }
        },
        watch: {
            posts(){
                return this.posts
            }
        } ,
        components: {

        },
        methods: {
            getPosts(){
                instance.get('/post')
                .then((res) => {
                    this.posts = res.data.data
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
            },
            onLike(id){ 
                instance.post('/like', {
                    id : Number(id)
                })
                .then((res) => {
                    console.log(res) 
                    this.userLiked(res)
                   return res
                    
                })
                .catch((error) => {
                    return error
                })    
                   
            },
            userLiked(){
                instance.get('/like/isLike')
                .then((res) => {
                    if(res.data.data != null){
                        this.isLiked = !this.isLiked  
                    }else{
                        this.isLiked = false
                    }
                    this.getPostItem()
                })
                .catch((error) => {
                    return error
                })
                
            },
            onDislike(){
                instance.delete('/like/deletelike')
                .then((res) => {
                    this.userLiked()
                    return res
                })
                .catch((error) => {
                    return error
                })
                
            },
        },
        created() {
            this.getPosts()
            this.userLiked() 
        }
    }
</script>

<style lang="scss" scoped>

</style>